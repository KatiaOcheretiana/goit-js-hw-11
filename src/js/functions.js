import { searchApiData } from './api-func';
import Notiflix from 'notiflix';
import { makeMarkup } from './markup';
import { selectors } from './selectors';
import { smoothlyScroll } from './smoothly-scroll';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a');



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
         lightbox.refresh()

       
        if (page > 0) {
            selectors.loadMore.classList.remove('hidden')
      }
      
      Notiflix.Notify.success(`Hooray! We found ${searchData.totalHits} images.`);


            if ( searchData.totalHits < limit) {
         selectors.loadMore.classList.add('hidden')
      }
      
    } catch (error) {
      console.log(error);
Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
}


export async function onLoadMore() {
    const searchItem = selectors.input.value
        page += 1;
    try {
        const loadMoreData = await searchApiData(searchItem, page)
           totalPages = loadMoreData.totalHits / limit;
      
      if ((page * limit) === loadMoreData.totalHits) {
         selectors.loadMore.classList.add('hidden')
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
       

       const loadMoreMarkup = await makeMarkup(loadMoreData.hits)
      selectors.galleryList.insertAdjacentHTML('beforeend', loadMoreMarkup)
      
             if ( Math.ceil(totalPages) === page ) {
         selectors.loadMore.classList.add('hidden')
      }

         lightbox.refresh()

      smoothlyScroll()

    } catch (error) {
        console.log(error);
     Notiflix.Notify.failure('Failed to load more images. Please try again.');
   }
}