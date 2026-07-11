import fs from 'fs-extra';
import path from 'path';

const filePath = path.resolve('data/eventos.json');

export const eventoRepository = {
    async getAll() {
        return await fs.readJson(filePath);
    },
    async saveAll(data) {
        await fs.writeJson(filePath, data, { spaces: 2 });
    }
};