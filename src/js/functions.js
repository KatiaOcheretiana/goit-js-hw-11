import { searchApiData } from './api-func';
import Notiflix from 'notiflix';
import { makeMarkup } from './markup';
import { selectors } from './selectors';

let page = 0;
let limit = 40;
let totalPages = 0;



export async function onSubmitSearch(evt) {
    evt.preventDefault()
    page = 1
    selectors.galleryList.innerHTML = ""
    const searchItem = selectors.input.value
            selectors.loadMore.classList.add('hidden')

    if (searchItem.trim() === "") {
        Notiflix.Notify.info("Please write search query and try again.")
        return
    }

    try {
        const searchData = await searchApiData(searchItem, page)
        
        if (searchData.hits.length === 0) {
            throw new Error()
        }

        const markup = await makeMarkup(searchData.hits)
        selectors.galleryList.innerHTML = markup;
       
        if (page > 0) {
            selectors.loadMore.classList.remove('hidden')
        }
  } catch (error) {
Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
}


export async function onLoadMore() {
    const searchItem = selectors.input.value
        page += 1;
    try {
        const loadMoreData = await searchApiData(searchItem, page)
        totalPages = Math.ceil(loadMoreData.totalHits / limit);
           if (page === totalPages) {
         selectors.loadMore.classList.add('hidden')
               Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
               return
    }
       const loadMoreMarkup = await makeMarkup(loadMoreData.hits)
selectors.galleryList.insertAdjacentHTML('beforeend',loadMoreMarkup)
    
   } catch (error) {
     Notiflix.Notify.failure('Failed to load more images. Please try again.');
   }
}