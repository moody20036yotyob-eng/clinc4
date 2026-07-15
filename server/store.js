import { readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA = join(__dir, 'data')
const locks = {}

export async function withLock(key, fn) {
  while (locks[key]) await locks[key]
  let resolve
  locks[key] = new Promise(r => { resolve = r })
  try {
    return await fn()
  } finally {
    delete locks[key]
    resolve()
  }
}

async function readJSON(file) {
  try {
    const raw = await readFile(join(DATA, file), 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function writeJSON(file, data) {
  await writeFile(join(DATA, file), JSON.stringify(data, null, 2), 'utf8')
}

function isBilingual(v) {
  return v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'ar' in v)
}

function validateBilingual(v) {
  if (!isBilingual(v)) return false
  if (typeof v.en !== 'string' || typeof v.ar !== 'string') return false
  return true
}

// Doctors
export const Doctors = {
  async list() { return (await readJSON('doctors.json')) || [] },
  async create(data) {
    return withLock('doctors', async () => {
      const list = await Doctors.list()
      const item = { ...data, id: randomUUID() }
      list.push(item)
      await writeJSON('doctors.json', list)
      return item
    })
  },
  async update(id, data) {
    return withLock('doctors', async () => {
      const list = await Doctors.list()
      const idx = list.findIndex(d => d.id === id)
      if (idx === -1) return null
      list[idx] = { ...list[idx], ...data, id }
      await writeJSON('doctors.json', list)
      return list[idx]
    })
  },
  async delete(id) {
    return withLock('doctors', async () => {
      const list = await Doctors.list()
      const next = list.filter(d => d.id !== id)
      await writeJSON('doctors.json', next)
      return next.length < list.length
    })
  },
}

// Services
export const Services = {
  async list() { return (await readJSON('services.json')) || [] },
  async create(data) {
    return withLock('services', async () => {
      const list = await Services.list()
      const item = { ...data, id: randomUUID() }
      list.push(item)
      await writeJSON('services.json', list)
      return item
    })
  },
  async update(id, data) {
    return withLock('services', async () => {
      const list = await Services.list()
      const idx = list.findIndex(s => s.id === id)
      if (idx === -1) return null
      list[idx] = { ...list[idx], ...data, id }
      await writeJSON('services.json', list)
      return list[idx]
    })
  },
  async delete(id) {
    return withLock('services', async () => {
      const list = await Services.list()
      const next = list.filter(s => s.id !== id)
      await writeJSON('services.json', next)
      return next.length < list.length
    })
  },
}

// Content
export const Content = {
  async get() { return (await readJSON('content.json')) || {} },
  async updateSection(section, data) {
    return withLock('content', async () => {
      const all = await Content.get()
      // Guard: never allow about.team.members to be overwritten
      if (section === 'about' && all.about?.team?.members) {
        if (!data.team) data.team = {}
        data.team.members = all.about.team.members
      }
      // Guard: never allow services.list to be overwritten via content
      if (section === 'services' && all.services?.list) {
        data.list = all.services.list
      }
      all[section] = data
      await writeJSON('content.json', all)
      return all[section]
    })
  },
}
