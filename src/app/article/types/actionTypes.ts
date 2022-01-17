export enum ActionTypes {
  GET_ARTICLE = '[Feed] Get Article',
  GET_ARTICLE_SUCCESS = '[Feed] Get Article Success',
  GET_ARTICLE_FAILURE = '[Feed] Get Article Failure',
  DELETE_ARTICLE = '[Feed] Delete Article',
  DELETE_ARTICLE_SUCCESS = '[Feed] Delete Article Success',
  DELETE_ARTICLE_FAILURE = '[Feed] Delete Article Failure',
}

export enum CreateCommentTypes {
  CREATE_COMMENT = '[Feed] Create Comment',
  CREATE_COMMENT_SUCCESS = '[Feed] Create Comment Success',
  CREATE_COMMENT_FAILURE = '[Feed] Create Comment Failure',
}

export enum GetArticleFavoritedStatus {
  GET_ARTICLE_FAV_STATUS = '[Feed] Get Article Favorited Status',
  GET_ARTICLE_FAV_STATUS_SUCCESS = '[Feed] Get Article Favorited Status Success',
  GET_ARTICLE_FAV_STATUS_FAILURE = '[Feed] Get Article Favorited Status Failure',
}
