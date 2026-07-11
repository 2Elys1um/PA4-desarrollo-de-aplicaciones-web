import fs from 'fs-extra';
import path from 'path';

const filePath = path.resolve('data/participantes.json');

export const participanteRepository = {
    async getAll() {
        return await fs.readJson(filePath);
    },
    async saveAll(data) {
        await fs.writeJson(filePath, data, { spaces: 2 });
    }
};