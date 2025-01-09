export class Component extends HTMLElement {

    #componentStyle;
    #componentEventListeners;
    #is_create;
  
    constructor(componentStyle = ":host { display: block; }") {
      super();
      this.#componentStyle = componentStyle;
      this.#componentEventListeners = [];
      this.#is_create = false;
    }
  
    connectedCallback()
    {
      if (!this.#is_create) 
      {
        const style = document.createElement('style');
        style.innerHTML = this.#componentStyle;
        this.innerHTML = this.render();
        this.appendChild(style);
        this.#is_create = true;
      }
      this.postCreate();
    }
  
    addComponentEventListener(element, event, callback, callbackInstance=this) {
      if (!element) {
        return;
      }
      if (!this.#componentEventListeners[event]) {
        this.#componentEventListeners[event] = [];
      }
      const eventCallback = callback.bind(callbackInstance);
      this.#componentEventListeners[event].push({element, eventCallback});
      element.addEventListener(event, eventCallback);
    }
  
    removeComponentEventListener(element, event) {
      const eventListeners = this.#componentEventListeners[event];
  
      if (eventListeners) {
        for (const eventListener of eventListeners) {
          if (eventListener.element === element) {
            element.removeEventListener(event, eventListener.eventCallback);
            eventListeners.splice(eventListeners.indexOf(eventListener), 1);
          }
        }
      }
    }
  
    removeAllComponentEventListeners() {
      for (const event in this.#componentEventListeners) {
        if (this.#componentEventListeners.hasOwnProperty(event)) {
          const eventListeners = this.#componentEventListeners[event];
          for (const eventListener of eventListeners) {
            eventListener.element.removeEventListener(event,
                eventListener.eventCallback);
          }
        }
      }
      this.#componentEventListeners = [];
    }

    disconnectedCallback() {
      this.removeAllComponentEventListeners();
    }
  
    postCreate() {

    }

    render() {
      return document.createDocumentFragment();;
    }
  }