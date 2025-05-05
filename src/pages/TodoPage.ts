import { TodoComponent, TodoBoostrapTheme } from '../components/todo';
import { BackendTodoStorage } from '../storage/BackendTodoStorage';
 import { IndexedDbTodoStorage } from '../storage/IndexedDbTodoStorage';
 import { LocalTodoStorage } from '../storage/LocalTodoStorage';
import { IPage } from './IPage';
import StartPage from './StartPage';

export default class TodoPage implements IPage {
    #rootElement: HTMLElement;
    #todoComponent: TodoComponent;

    constructor() {
        this.#rootElement = document.createElement('div');
        this.#rootElement.classList.add('d-flex', 'flex-column', 'vh-100', 'bg-light');

        const storageType = StartPage.getStorageType();

        let storage;
        switch (storageType) {
            case 'backend':
                storage = new BackendTodoStorage();
                break;
            case 'indexedDb':
                storage = new IndexedDbTodoStorage();
                break;
            case 'localStorage':
                storage = new LocalTodoStorage();
                break;
        }

        this.#todoComponent = new TodoComponent({
            theme: TodoBoostrapTheme,
            storage: storage
        });
    }

    mount(parentElement: HTMLElement): HTMLElement {
        // Create header
        const header = document.createElement('header');
        header.classList.add('p-3', 'bg-primary', 'text-white', 'shadow-sm');
        header.innerHTML = '<h1 class="m-0 fs-4">My Todo List</h1>';

        // Create main content area
        const mainContent = document.createElement('main');
        mainContent.classList.add('flex-grow-1', 'overflow-auto', 'p-3');

        // Mount todo component
        const todoWrapper = document.createElement('div');
        todoWrapper.setAttribute('id', 'todo-list');
        todoWrapper.classList.add('h-100', 'mx-auto', 'bg-white', 'rounded', 'shadow-sm');
        todoWrapper.style.maxWidth = '800px';
        this.#todoComponent.mount(todoWrapper);

        // Assemble the page
        this.#rootElement.appendChild(header);
        mainContent.appendChild(todoWrapper);
        this.#rootElement.appendChild(mainContent);

        // Mount to parent
        parentElement.appendChild(this.#rootElement);

        return this.#rootElement;
    }

    unmount(): void {
        // Clean up todo component
        // TODO implement better todo component disposal
        const todoWrapper = document.getElementById('todo-list');
        if (todoWrapper) {
            todoWrapper.innerHTML = '';
        }

        // Remove the root element
        if (this.#rootElement && this.#rootElement.parentElement) {
            this.#rootElement.parentElement.removeChild(this.#rootElement);
        }
    }
} 