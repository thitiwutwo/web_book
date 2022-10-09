import { defineStore } from 'pinia'
import axios from "axios";
import router from '@/router';
export const useBooksStore = defineStore({
  id: 'counter',
  state: () => ({
    books: [],
  }),
  
  actions: {
    async getBook(){
      try{ 
        let myBook = await axios.get('http://localhost:8000/data/books/getAll/11120');
        if(myBook.status == 200){
          this.$patch({
            books: myBook.data.data
          });
          
        }
      }catch(e){
        console.log(e);
      }
    },
    async insertBook(
      title,
      isbn13,
      language_id,
      num_pages,
      publication_date,
      publisher_id){
        let myBook = await axios.post("http://localhost:8000/data/books", {
          title: title,
          isbn13: isbn13,
          language_id: language_id,
          num_pages: num_pages,
          publication_date: publication_date,
          publisher_id: publisher_id,
        });
        if(myBook.status == 200){
          router.push("/books");
        }
    }
  }
});

export const useBookLanguageStore = defineStore({
  id: 'bookLanguage',
  state: () => ({
    bookLanguage: [],
  }),
  actions: {
    async getBookLanguage(){
      let myData = await axios.get('http://localhost:8000/data/book_languages');
      if(myData.status == 200){
        this.$patch({
          bookLanguage: myData.data.data
        });
      }
    },
    
  }
});

export const usePublisherStore = defineStore({
  id: 'publisher',
  state: () => ({
    publisher: [],
  }),
  actions: {
    async getPublisher(){
      let myData = await axios.get('http://localhost:8000/data/publishers');
      if(myData.status == 200){
        this.$patch({
          publisher: myData.data.data
        });
      }
    }
  }
});
