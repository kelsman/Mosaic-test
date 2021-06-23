const axios = require('axios');
const async = require('async')



async function httpPing(req, res) {
  return res.status(200).json({ success: true })

}

async function httpGetPosts(req, res) {
  const config = { headers: { 'Content-Type': 'application/json' } }
  const { tag, sortBy, direction } = req.query;

  try {
    //validate query paramters
    if (!tag) {
      return res.status(400).json({ "error": "Tags parameter is required" })
    }
    if (sortBy && sortBy === '') {
      return res.status(400).json({ error: "sortBy parameter is invalid" })
    }
    if (direction && direction === '') {
      return res.status(400).json({ error: "direction parameter is invalid" })
    }
    //  fetch posts 

    const tags = tag.split(',')

    const requests = tags.map((tag) => {
      return async function () {
        const { data } = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`, config)
        return data
      }
    })

    async.parallel(requests, (err, result) => {
      res.status(200).json({ posts: result.map((result) => result.posts)[0] })
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'server error' })

  }
}


module.exports = {
  httpPing,
  httpGetPosts
}