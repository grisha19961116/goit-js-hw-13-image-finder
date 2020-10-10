
export default {
  API_KEY :`18650753-c8867d24a687d3baeda70b1dc`,
  getFullRequest(searchWord,searchPage){
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchWord}&page=${searchPage}&per_page=12&key=${this.API_KEY}`)
.then(res => {
  return res.json()
    })
  },
}
