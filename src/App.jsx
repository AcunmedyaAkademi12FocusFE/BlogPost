import './App.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { BlogProvider } from "./context/BlogContext";

export default function App() {

  return (
    <>
      <BlogProvider>
        <div className="app">
          <h1>Blog Uygulaması</h1>
          <BlogForm />
          <BlogList />
        </div>
      </BlogProvider>
    </>
  )
}