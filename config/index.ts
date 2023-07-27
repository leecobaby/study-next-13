export const sessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export const EXCEPTION_USER = {

}

export const EXCEPTION_ARTICLE = {
  PUBLIC_FAIL: {
    code: 2001,
    msg: '发布文章失败'
  },
  UPDATE_FAIL: {
    code: 2002,
    msg: '更新文章失败'
  },
  NOT_FOUND: {
    code: 2003,
    msg: '文章不存在'
  }
}

export const EXCEPTION_COMMENT = {
  PUBLIC_FAIL: {
    code: 4001,
    msg: '发布评论失败'
  }
}