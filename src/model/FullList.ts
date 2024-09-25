import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

/*
    FullList represents the the whole todo list.
*/

/*
    This FullList class demonstrates a design pattern called the Singleton Pattern.

    **Key Concepts**:

    1. Singleton Pattern:
    => The Singleton Pattern ensures that a class has only one instance and provides a global point of access to that instance.
    In this case, the FullList class is designed to have only one instance across the entire application. The single instance is stored in the static instance property, and it can be accessed globally.
    
    2. Static instance property:
    => static instance: FullList = new FullList();
    This line ensures that a single instance of the FullList class is created when the class is first loaded. Since the instance property is static, it belongs to the class itself, not to any specific object of the class.
    => The new FullList() creates the instance and assigns it to the instance property, which can be accessed via FullList.instance.
    
    3. Private Constructor:
    => private constructor(private _list: List[] = []) {}
    The constructor is marked as private, which prevents any other code from using new FullList() to create additional instances of the class. This restriction ensures that only the single instance stored in FullList.instance can exist.
    => The constructor also initializes the private _list array (which presumably stores a list of items of type List).

    **Explanation of How It Works**:

    1. Single instance creation:
    => The FullList class creates an instance of itself using the static instance property. The constructor is private, so no other instances can be created. This ensures that the FullList class can only have one instance across the application.

    2. Global access:
    => You can access the single instance of FullList through FullList.instance. This allows you to maintain a centralized, global instance of the class and prevents multiple instances from being created accidentally.

    **Benefits of Singleton Pattern**:

    1. Controlled access: Only one instance of the class exists, which ensures consistency in state across the application.

    2. Global point of access: Since the single instance is static, you can access it globally across different parts of the application.

    3. Lazy initialization: The instance is created only when it is needed.
*/

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") {
      return;
    }

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newItemListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );

      FullList.instance.addItem(newItemListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
