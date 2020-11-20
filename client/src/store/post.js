/* eslint-disable */
import axios from 'axios'

export default {
  actions: {
    async fetchPosts ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/posts'
        const res = await axios.get(url)
        const data = res.data
        console.log(data)
        return data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}

/*
const url = 'http://localhost:3000/posts'

class Post {
  // Get Posts
  static getPosts () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(post => ({
            ...post,
            date: new Date(post.date)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  // Create Post
  static insertPost (title, description) {
    return axios.post(url, {
      title: title,
      description: description
    })
  }

  // Delete Post
  static deletePost (id) {
    return axios.delete(`${url}${id}`)
  }
}

export default Post

*/
