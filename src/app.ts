import { TodoApi } from './backend/TodoApi';
import { Router } from './router';


const appEl = document.getElementById('app')!;
const router: Router = new Router(appEl);
const backend: TodoApi = new TodoApi('https://todo-back.runasp.net')

// start page
router.goto('Start');

if (!appEl) {
    throw new Error('App element not found');
}

export { router, backend }