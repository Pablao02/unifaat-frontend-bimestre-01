import dotenv from 'dotenv'
import { Command } from 'commander'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import loadCommands from './utils/loadCommands.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carrega o .env que está na raiz do projeto
dotenv.config({
    path: path.join(__dirname, '..', '.env')
})

const program = new Command()

program
    .name('command')
    .description('CLI da aplicação')
    .version('1.0.0')

const commandsPath = path.join(__dirname, 'app', 'Commands')

await loadCommands(commandsPath, program)

program.parse(process.argv)