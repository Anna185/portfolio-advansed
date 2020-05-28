import login from './Login.vue';
import {shallowMount} from "@vue/test-utils";


describe('На странице есть кнопка  Авторизоваться', () => {
  it ('Ищем кнопку авторизации по классу', () => {

    const wrapper = shallowMount(login);
    const button = wrapper.find(".login__send-data");

    expect(button.element).toMatchSnapshot();


  });

  it ('Ищем кнопку авторизации по слову  Авторизоваться', () => {

    const wrapper = shallowMount(login);
    const button = wrapper.findAll("button").at(2);

    expect(button.text()).toBe('Авторизоваться');

  });
});

