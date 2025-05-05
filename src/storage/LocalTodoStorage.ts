import { TodoItem, TodoStorageProvider } from "../components/todo";


export class LocalTodoStorage implements TodoStorageProvider {

    onItemsLoad() {
        const data = localStorage.getItem("todo-items");
        console.log("items loaded from local storage");
        if (data === null) {
            const emptyTodo: TodoItem[] = [];
            return Promise.resolve(emptyTodo) 
        }
        let todoData = JSON.parse(data!) as TodoItem[];
        return Promise.resolve(todoData);
    } 

    onItemAdd(item: TodoItem) {
        return this.onItemsLoad().then(existing => {
            const maxId = Math.max(0, ...existing.map(item => item.id ?? -Infinity).filter(Number.isFinite))
            const newItem = {
                ...item,
                id: maxId + 1 ,                
            };
            //console.log("new Todo item created", newItem)
            const newItemsList = [...existing, newItem]
            localStorage.setItem("todo-items", JSON.stringify(newItemsList));
            //console.log("array after update", newItemsList)
            return newItem as TodoItem
        });
        
    }

    onItemUpdate(item: TodoItem){
        return this.onItemsLoad().then(existing => {
            const index = existing.findIndex(i => i.id === item.id);
            const updatedItems = [...existing];
            updatedItems[index] = item;
            //console.log("index of updated item: ", index);
            //console.log(updatedItems);
            localStorage.setItem("todo-items", JSON.stringify(updatedItems));

            return item;
        })
    }

    onItemDelete(id: number) {
        return this.onItemsLoad().then(items => {
            const filteredItems = items.filter(item => item.id !== id);
            //console.log("new array after deletion", filteredItems)
            localStorage.setItem("todo-items", JSON.stringify(filteredItems));
            return;
        });
    } 

}