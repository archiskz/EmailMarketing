import repository from './baseRepository';

const resource = '/subcriber';

export default {
    createSubcriber(data) {
        return repository.post(`${resource}/createV2`, data);
    },
    getAllSubcriber() {
        return repository.get(`${resource}s`)
    }
}
