/*
 * Copyright (C) Unpublished JiuDaoTech Software, Inc. All rights reserved.
 * JiuDaoTech Software, Inc., Confidential and Proprietary.
 *
 * This software is subject to copyright protection
 *   under the laws of the Public of China and other countries.
 *
 * Unless otherwise explicitly stated, this software is provided
 *   by JiuDaoTech "AS IS".
 */

import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import news from './modules/news'
import carousel from './modules/carousel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar,
    news,
    carousel
  }
})
