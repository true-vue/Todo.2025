import { IPage } from "./pages/IPage";

export class Router {
    #currentPage: string = '';
    #appEl: HTMLElement;
    #currentPageInstance: IPage | undefined;

    constructor(appEl: HTMLElement) {
        this.#appEl = appEl;
    }

    public goto(page: "Start" | "Login" | "Todo" ): void {
        if (this.#currentPageInstance) {
            this.#currentPageInstance.unmount();
        }

        this.#currentPage = page;
        const pageEl = document.createElement('div');
        pageEl.id = page;

        console.log(`Navigating to ${page} page`);
        import(`./pages/${page}Page`).then(module => {
            const page = new module.default() as IPage;
            this.#currentPageInstance = page;
            page.mount(this.#appEl);

        });
    }

    currentPage(): string {
        return this.#currentPage;
    }
}