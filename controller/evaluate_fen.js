import { spawn } from 'child_process'
import {PositionReport} from '../models/position_report.js'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { DEFAULT_DEPTH } from '../constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const stockfishPath = resolve(__dirname, '../chess_engine/stockfish');

export function EvaluateFen(fen, depth = DEFAULT_DEPTH) {
	return new Promise((resolve, reject) => {
		// const sfPath = path.resolve(__dirname, )
		const stockfish = spawn(stockfishPath)

		depth = Math.max(5, Math.min(depth, 25)) // 5 <= depth <= 25
		let evaluation, bestmove, bestline

		stockfish.stdout.on("data", data => {
			const lines = data.toString().split("\n")
			lines.forEach(line => {
				if (line.includes('info depth') && line.includes('score') && line.includes('pv')) {
					const match = line.match(/score (cp|mate) (-?\d+)/)
					const moves = line.match(/\bpv\b (\S+)((?: \S+){0,5})/)

					if (match)
						evaluation = { type: match[1], value: parseInt(match[2], 10) }
					if (moves) {
						bestmove = moves[1]
						bestline = moves[2].trim()
					}
				} else if (line.startsWith("bestmove")) {
					stockfish.kill()
					try {
						resolve(new PositionReport({
							depth: depth,
							evalReport: evaluation,
							bestmove: bestmove,
							bestmoveLine: bestline
						}))
					} catch (error) {
						reject(error)
					}
				}
			})
		})

		stockfish.stderr.on("data", data => reject(data))
		stockfish.on("error", err => reject(err))

		stockfish.stdin.write('uci\n');
		stockfish.stdin.write('isready\n');
		stockfish.stdin.write('ucinewgame\n');
		stockfish.stdin.write(`position fen ${fen}\n`);
		stockfish.stdin.write(`go depth ${depth}\n`);
	})
}