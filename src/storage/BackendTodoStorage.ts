import { backend } from "../app";
import { TodoItem, TodoStorageProvider } from "../components/todo";
import { ListItemDTO } from "../backend/TodoApiBase";

export class BackendTodoStorage implements TodoStorageProvider {
    onItemsLoad() {
        console.log("baceknd todo storage loaded")
        return backend.getAllItems().then(items => { return items as TodoItem[] })
    }
    onItemAdd(item: TodoItem) {
        
        return backend.saveItem(item).then(item => {return item as TodoItem})
    }
    async onItemUpdate(item: TodoItem) {
        
        if (!item.id) { return Promise.reject("missing ID for update"); }

        const existingItemResponse  = await backend.getItem(item.id);
        const existingItem: ListItemDTO = existingItemResponse;
        
        const itemToSendToBackend : ListItemDTO = {
            id: item.id,
            listItemGroupId: existingItem.listItemGroupId,
            text: item.text,
            isChecked: item.isChecked
        };
        // console.log('original item:', item);
        // console.log('existing item:', existingItem);
        // console.log('itemToSendToBackend:', itemToSendToBackend);

        return backend.saveItem(itemToSendToBackend).then(item => {return item as TodoItem})
    }

    onItemDelete(id: number) {
        console.log(id)
        return backend.deleteItem(id)
    }

}
