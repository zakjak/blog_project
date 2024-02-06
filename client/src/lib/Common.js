export const postViews = async (postId) => {
    const res = await fetch(`/api/post/views/${postId}/view`, {
      method: 'POST',
    })
  }