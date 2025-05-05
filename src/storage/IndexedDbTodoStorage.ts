import Dexie, { Table } from 'dexie'
import { TodoItem, TodoStorageProvider } from '../components/todo'

export class IndexedDbTodoStorage extends Dexie implements TodoStorageProvider {
    todos!: Table<TodoItem, number>

    constructor() {
        super('TodoDatabase')
        this.version(1).stores({
            todos: '++id,text'
        })
    }

    onItemsLoad() {
        console.log("db loaded")
        return this.todos.toArray()
    }
    onItemAdd(item: TodoItem) {
        console.log("adding record to db");
        return this.todos.add(item).then(() => Promise.resolve(item))
    }
    onItemUpdate(item: TodoItem) {
        console.log("indexed db updating record");
        return this.todos.update(item.id!, item).then(() => Promise.resolve(item))
    }
    onItemDelete(id: number) {
        console.log("deleting record");
        return this.todos.delete(id)
    }
}