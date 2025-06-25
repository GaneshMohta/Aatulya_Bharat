import Blog from '../model/blogSchema.js';
import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

export const createBlog=async(req,res)=>{
    try{
      const {Title,QuillContent,selectedCategories} = req.body;
      // console.log("titlefile,")
      const image = req.file.filename;

      console.log('Request Body:', req.body);
      console.log("data",selectedCategories)
      if (!Title || !QuillContent || !selectedCategories.length) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const blogs = new Blog({
        Titleid:uuid(),
        Title,
        image,
        QuillContent,
        selectedCategories,
      })
      await blogs.save();
      res.status(200).json({message:'Blog created Successfully'});
    }
    catch(e){
      console.log(e)
      res.status(500).json({message:"server error could not able to create blog"})
    }
}

export const getBlog= async(req,res)=>{
  const Blogs = await Blog.find();
  res.send(Blogs);
}

export const getBlogId = async (req, res) => {
  //console.log(req.params.id);
  try {
    const blogId = await Blog.findOne({ Titleid: req.params.id })
    if (!blogId) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blogId);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};



export const filterBlog = async (req, res) => {
  const { category } = req.query;
  console.log(category);
  try {
    const blogs = await Blog.find({
      selectedCategories: { $in: [category] }
    });
    res.status(200).json(blogs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
};
