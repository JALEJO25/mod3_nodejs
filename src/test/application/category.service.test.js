import { CategoryService } from '../../application/use-cases/category.service.js';
import { jest } from '@jest/globals';
// REVISA ESTA RUTA: debe llegar desde la carpeta 'test' hasta tu 'category.service.js'

describe('CategoryService', () => {
    let categoryService;
    let mockRepo;

    beforeEach(() => {
        mockRepo = { save: jest.fn() };
        categoryService = new CategoryService(mockRepo);
    });

    test('Debería crear una categoría (Happy Path)', async () => {
        mockRepo.save.mockResolvedValue({ id: 1, name: 'Test' });
        const res = await categoryService.createCategory({ name: 'Test' });
        expect(res.name).toBe('Test');
    });

    test('Debería fallar sin nombre', async () => {
        await expect(categoryService.createCategory({ name: '' }))
            .rejects
            .toThrow("El nombre es obligatorio");
    });
});