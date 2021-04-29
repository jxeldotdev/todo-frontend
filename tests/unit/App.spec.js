// import mount
import { mount } from "@vue/test-utils"
import App from '@/App.vue';


describe('App.vue', () => {

  // mount component
  const wrapper = mount(App);

  it('Creates a Todo item', () => {

    const todoList = [
      {
        'notes': 'Example notes',
        'completed': false,
        'title': 'Example title',
      }
    ];


    // NOT WORKING CURRENTLY
    console.log(wrapper.find("[todos]"));
    wrapper.find("[todos]").setValue(todoList)
    wrapper.find("[data-todos][0].notes").setValue("Example notes")
    wrapper.find("[data-todos][0].completed").setValue(false)

    // create the todo item
    wrapper.find("form").trigger("submit.prevent")

    

    expect(wrapper.find(".todo-title").text())
    .toBe("Example Title");
  });
});
