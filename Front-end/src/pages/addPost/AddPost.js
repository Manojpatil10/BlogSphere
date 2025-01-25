import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar"
import "./AddPost.css";
import axios from "axios";

export default function AddPost() {
  const [postData, setPostData] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [updateAutor, setUpdateAuthor] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updatePostImg, setUpdatePostImg] = useState('');
  const [updatePostId, setUpdatePostId] = useState('');

  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [blogUrl, setBlogUrl] = useState();
  const token = localStorage.getItem('token');


  const handleBlogDataSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blogImg", blogUrl);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("ID", token);

    axios.post(
      'http://localhost:8080/blogDataSave',
      formData, // Send the FormData object directly
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
    ).then((success) => {
      // console.log(success)
      alert(success.data.msg);
      setShowPost(!showPost)
      setAuthor('')
      setBlogUrl('')
      setCategory('')
      setDate('')
      setDescription('')
      setTitle('')
    }).catch((error) => {
      // console.log(error)
      console.log(error.response.data.msg)
    })

  }


  useEffect(() => {
    axios.post('http://localhost:8080/getMyPost', { ID: token }).then((success) => {
      setPostData(success.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [showPost]);

  const getUpdatePostData = (id) => {
    // console.log(id);

    axios.get(`http://localhost:8080/getUpdatePostData/${id}`).then((success) => {
      console.log(success.data)
      setUpdateAuthor(success.data.Author);
      setUpdateTitle(success.data.Title);
      setUpdateDate(success.data.Date);
      setUpdateDescription(success.data.Description);
      setUpdateCategory(success.data.Category);
      setUpdatePostImg(success.data.BlogImg);
      setUpdatePostId(success.data._id);
      setUpdateForm(!updateForm);
    }).catch((error) => {
      alert(error.response.data.msg)
    })
  }

  const updatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("author", updateAutor);
    formData.append("title", updateTitle);
    formData.append("date", updateDate);
    formData.append("description", updateDescription);
    formData.append("category", updateCategory);
    formData.append("id", updatePostId);

    console.log(updatePostImg);

    if (updatePostImg) {
      formData.append("blogImg", updatePostImg);
    }

    axios
      .post("http://localhost:8080/updatePost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        alert(success.data.msg);
        setUpdateForm(false);
        setShowPost(!showPost);
      })
      .catch((error) => {
        // console.log(error);
        alert('Error, please try again');
      });
  };


  const deletePost = (id) => {

    if (window.confirm("Are you sure you want to delete this post")) {
      axios
        .delete(`http://localhost:8080/deletePost/${id}`)
        .then((success) => {
          // alert("Post deleted successfully!");
          // setPostData((prevPosts) => prevPosts.filter((post) => post._id !== id));
          setShowPost(!showPost)
        })
        .catch((error) => {
          // console.error(error);
          alert("An error occurred while deleting the post. Please try again.");
        });
    }
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div className="container mb-5 position-relative">
        <div className="row">
          <div className="col-7">
            {postData.map((post, index) => {
              return (
                <div class="blog-post mt-4" key={index}>
                  <img src={post.BlogImg}
                    alt={post.Title} class="blog-post-image" />
                  <div class="blog-post-content">
                    <h3 class="blog-post-title">{post.Title}</h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <p class="blog-post-author">Author: <span>{post.Author}</span></p>
                      <p class="blog-post-date">Date: <span>{post.Date}</span></p>
                    </div>
                    <p class="blog-post-description">
                      {post.description}
                    </p>
                    <div class="blog-post-actions">
                      <button class="btn btn-update" onClick={() => (getUpdatePostData(post._id))}>Update</button>
                      <button class="btn btn-delete" onClick={() => (deletePost(post._id))}>Delete</button>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
          <div className="col-5">
            {updateForm ?
              <div class="post-container mt-4">
                <h2>Update Post</h2>
                <form onSubmit={updatePost}>
                  <div class="mb-2">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title"
                      onChange={(e) => { setUpdateTitle(e.target.value) }}
                      placeholder="Enter the title" value={updateTitle} required />
                  </div>
                  <div class="mb-2">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author"
                      onChange={(e) => { setUpdateAuthor(e.target.value) }}
                      placeholder="Enter the author's name" value={updateAutor} required />
                  </div>
                  <div class="mb-2">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" class="form-control" value={updateDate}
                      onChange={(e) => { setUpdateDate(e.target.value) }}
                      id="date" required />
                  </div>
                  <div class="mb-2">
                    <label for="category" class="form-label">Category</label>
                    <input type="text" class="form-control" id="category"
                      onChange={(e) => { setUpdateCategory(e.target.value) }}
                      placeholder="Nature" value={updateCategory} required />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">Upload Image</label>
                    <input type="file" class="form-control" id="image"
                      onChange={(e) => { setUpdatePostImg(e.target.files[0]) }}
                      accept="image/*" required />
                  </div>
                  <div class="mb-2">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="4"
                      onChange={(e) => { setUpdateDescription(e.target.value); }}
                      placeholder="Enter a description"
                      value={updateDescription}
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
              :
              <div class="post-container mt-4">
                <h2>Add Post</h2>
                <form onSubmit={handleBlogDataSave}>
                  <div class="mb-2">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the title" required />
                  </div>
                  <div class="mb-2">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author"
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Enter the author's name" required />
                  </div>
                  <div class="mb-2">
                    <label for="date" class="form-label">Date</label>
                    <input type="date" class="form-control"
                      onChange={(e) => setDate(e.target.value)}
                      id="date" required />
                  </div>
                  <div class="mb-2">
                    <label for="category" class="form-label">Category</label>
                    <input type="text" class="form-control" id="category"
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Nature" required />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">Upload Image</label>
                    <input type="file" class="form-control" id="image"
                      onChange={(e) => setBlogUrl(e.target.files[0])}
                      accept="image/*" required />
                  </div>
                  <div class="mb-2">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="4"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter a description" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}
