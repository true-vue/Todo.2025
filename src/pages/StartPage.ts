import { router } from "../app";
import { IPage } from "./IPage";

type StorageType = 'localStorage' | 'indexedDb' | 'backend';

export default class StartPage implements IPage {
    #rootEl: HTMLDivElement | undefined;
    static #selectedStorage: StorageType | undefined;

    mount(parentEl?: HTMLElement) {
        this.#rootEl = document.createElement('div');
        this.#rootEl.classList.add('start-container', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'h-100');

        const titleEl = document.createElement('h1');
        titleEl.textContent = 'Select Storage Type';
        titleEl.classList.add('text-center', 'mb-4');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-grid', 'gap-3', 'col-md-6', 'mx-auto');

        const localStorageBtn = document.createElement('button');
        localStorageBtn.textContent = 'LocalStorage';
        localStorageBtn.classList.add('btn', 'btn-primary', 'btn-lg');
        localStorageBtn.addEventListener('click', () => {
            StartPage.setStorageType('localStorage');
            router.goto('Todo');
        });

        const indexedDbBtn = document.createElement('button');
        indexedDbBtn.textContent = 'IndexedDB';
        indexedDbBtn.classList.add('btn', 'btn-primary', 'btn-lg');
        indexedDbBtn.addEventListener('click', () => {
            StartPage.setStorageType('indexedDb');
            router.goto('Todo');
        });

        const backendBtn = document.createElement('button');
        backendBtn.textContent = 'Backend';
        backendBtn.classList.add('btn', 'btn-primary', 'btn-lg');
        backendBtn.addEventListener('click', () => {
            StartPage.setStorageType('backend');
            router.goto('Login');
        });

        buttonContainer.appendChild(localStorageBtn);
        buttonContainer.appendChild(indexedDbBtn);
        buttonContainer.appendChild(backendBtn);

        this.#rootEl.appendChild(titleEl);
        this.#rootEl.appendChild(buttonContainer);

        if (parentEl) {
            parentEl.appendChild(this.#rootEl);
        }

        return this.#rootEl;
    }

    unmount(): void {

        if (this.#rootEl) {
            this.#rootEl.remove();
        }
        this.#rootEl = undefined;
    }

    public static setStorageType(type: StorageType): void {
        this.#selectedStorage = type;
        localStorage.setItem('preferred storage', this.#selectedStorage)
        console.log('selected storage', this.#selectedStorage)
    }

    public static getStorageType(): 'localStorage' | 'indexedDb' | 'backend' | null {
        let str = localStorage.getItem('preferred storage') as StorageType
        return str;
    }

}