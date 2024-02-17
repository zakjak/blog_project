export const postViews = async (postId) => {
    const res = await fetch(`https://blog-site-dhug.onrender.com/api/post/views/${postId}/view`, {
      method: 'POST',
    })
  }

 export const formatCount = (count) => {
    if(count >= 1000000){
        return (count / 1000000).toFixed(1) + 'M'
    }else if (count >= 1000){
        return (count / 1000).toFixed(1) + 'K'
    }else{
        return count?.toString()
    }
}