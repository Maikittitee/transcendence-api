export class APIs {
    constructor(names = [], apis = []) {
        this.apiMap = new Map();
        this.add_apis(names, apis);
    }

    add_api(name, api) {
        this.apiMap.set(name, api);
    }

    add_apis(names = [], apis = []) {
        names.forEach((name, index) => {
            this.apiMap.set(name, apis[index]);
        });
    }

    async fetch_api(name) {
        try {
            const api = this.apiMap.get(name);
            if (!api) {
                throw new Error(`API with name "${name}" not found.`);
            }
            return await api.fetch_data(); // Await the result
        } catch (error) {
            console.error(`Error in "${name}" API:`, error);
            throw error;
        }
    }

    has_api(name) {
        return this.apiMap.has(name);
    }

    get_api(name) {
        return this.apiMap.get(name);
    }

    remove_api(name) {
        this.apiMap.delete(name);
    }

    clear_apis() {
        this.apiMap.clear();
    }
}
