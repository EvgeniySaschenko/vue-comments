import CommentsForm from "./comments-form.vue";
import CommentsItem from "./comments-item.vue";
import iconFile from "./img/icon-file.svg";
import regExp from "./reg-exp.js";

export default {
  name: "CommentsItem",
  components: {
    CommentsForm,
    CommentsItem,
  },
  inject: [
    "options",
    "emitMessage",
    "addCommentVote",
    "preparationRequestData",
    "deleteCommentToList",
    "showComments",
    "setMapItemLinkComponent",
    "scrollToComment",
  ],
  provide() {
    return {
      toggleForm: this.toggleForm,
    };
  },
  watch: {
    // При изменении размеров окна
    widthResizeWindow: {
      handler() {
        this.checkIsShowBntTextMore();
      },
    },
    // Указывает на то отображён ли комментарий
    isShow: {
      handler() {
        this.$nextTick(() => {
          this.checkIsShowBntTextMore();
        });
      },
    },
  },
  computed: {
    isShow() {
      return this.mapItems[this.comment.parentId].show[this.comment.id];
    },
  },
  props: {
    comments: {
      type: Object,
      default() {
        return {};
      },
    },
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
    mapItems: {
      type: Object,
      default() {
        return {};
      },
    },
    userNameAnswer: {
      type: String,
      default: "",
    },
    widthResizeWindow: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // Отображаемый текст
      text: {
        brief: "",
        all: "",
      },
      // Показать кнопку Еще
      isTextBrief: false,
      // Переключатель кнопок Еще / Свернуть
      isTextBriefЕxpand: true,
      // Показать / скрыть форму добавления вопроса
      isFormShow: false,
      iconFile,
      files: [],
      // Номер текущего слайда
      slideNum: 0,
      // Открыть галлерею
      isOpenGallery: false,
      // Cписок ссылок в тексте
      listLinks: {},
      // Слушетели событий
      listeners: {},
      // Указывает на то что на сервер в данный ммомент отправляется лайк
      isVoteSending: false,
      // Указывает на то что на сервер отправляется запрос на удаление комментария
      isDeleteSending: false,
      // Указывает на то что в данный момент комментарий находится в состояниии редактирования
      isEdited: false,
      // Показать список настроек: Редактировать / удалить
      isShowSettings: false,
      error: "",
    };
  },

  created() {
    this.init();
  },

  mounted() {
    this.setMapItemLinkComponent(this.comment.id, this);
    this.checkIsShowBntTextMore();
  },
  methods: {
    init() {
      this.preparationDataFiles();
      let { text: textComment } = this.comment;
      let { briefMaxLength } = this.options.text;
      this.preparationText(textComment, briefMaxLength, regExp);
    },
    preparationDataFiles() {
      this.files = [];
      for (let file of this.comment.files) {
        let partsStr = file.preview.split("?");
        let extension;

        if (partsStr.length > 1) {
          // file-name.jpg?reset=v1
          extension = partsStr[partsStr.length - 2].match(/[^.]+$/i)[0];
        } else {
          // file-name.jpg
          extension = file.preview.match(/[^.]+$/i)[0];
        }

        let item = { ...file, extension };
        if (this.options.imgExtensions[extension]) {
          item.type = "img";
        } else {
          item.type = "icon";
        }
        item.src = file.src;
        this.files.push(item);
      }
    },
    // Плдготовка текста
    preparationText(text, maxLength, regExp) {
      let listLinks = this.createTextListLinks(text, regExp.link);
      let isTextBriefLength = this.checkTextBriefMaxLength(text, maxLength);
      let textBrief = this.cropText(text, maxLength);
      // isTextBrief - на этапе монтирования будет checkTextBriefMaxLine
      this.isTextBrief = isTextBriefLength;
      this.text.all = this.convertTxtToHtml(text, listLinks, regExp.link);
      this.text.brief = this.convertTxtToHtml(textBrief, listLinks, regExp.link);

      return {
        text: {
          all: this.text.all,
          brief: this.text.brief,
        },
        isTextBrief: this.isTextBrief,
      };
    },
    // Проверяем нужно ли скрывать текст по длине строки
    checkTextBriefMaxLength(text, maxLength) {
      if (maxLength === "none") return false;
      return text.length > maxLength;
    },
    // Проверяем высоту после того как элемент примоттирован
    checkTextBriefMaxLine(maxLine, scrollHeight, clientHeight) {
      if (maxLine === "none") return false;
      return scrollHeight > clientHeight;
    },
    // Проверка нужно ли отображать кнопку "Показать больше" для текста
    checkIsShowBntTextMore() {
      let { briefMaxLength, briefMaxLine } = this.options.text;
      let { text: textComment } = this.comment;
      let isBriefMaxLength = this.checkTextBriefMaxLength(textComment, briefMaxLength);
      let isBriefMaxLine;

      if (this.$refs.text) {
        let { scrollHeight, clientHeight } = this.$refs.text;
        isBriefMaxLine = this.checkTextBriefMaxLine(briefMaxLine, scrollHeight, clientHeight);
      }

      this.isTextBrief = isBriefMaxLength || isBriefMaxLine;
      return this.isTextBrief;
    },

    // Создать список ссылок которые есть в тексте
    createTextListLinks(text, regExp) {
      let counerLinks = 0;
      let listLinks = {};
      text.replace(regExp, (result) => {
        counerLinks++;
        listLinks[counerLinks] = result;
      });
      return { count: counerLinks, items: listLinks };
    },
    // Преобразовать текст в HTML
    convertTxtToHtml(text, listLinks, regExp) {
      let counter = 0;
      if (listLinks.count) {
        text = text.replace(regExp, (result) => {
          counter++;
          return `<a href="${listLinks.items[counter]}" target="_blank">${result}</a>`;
        });
      }
      return text.replace(/\n/g, "<br/>");
    },
    // Обрезаем текст
    cropText(text, maxLength) {
      if (text === "" || maxLength === "none" || text.length <= maxLength) return text;
      return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
    },
    // Свернуть / развернуть текст
    toggleTextBrief() {
      this.isTextBriefЕxpand = !this.isTextBriefЕxpand;
    },
    // Сочитать количество лайков / дизлайков
    calculateVoteCount(comment, voteValue) {
      let isLike, isDislike, like, dislike;
      voteValue = +voteValue;

      isLike = voteValue == 1;
      isDislike = voteValue == -1;

      if (!comment.voteValue && voteValue) {
        like = isLike ? comment.like + 1 : comment.like;
        dislike = isDislike ? comment.dislike + 1 : comment.dislike;
      } else if (comment.voteValue == 1) {
        like = comment.like - 1;
        dislike = isDislike ? comment.dislike + 1 : comment.dislike;
      } else if (comment.voteValue == -1) {
        like = isLike ? comment.like + 1 : comment.like;
        dislike = comment.dislike - 1;
      }
      return { like, dislike, voteValue };
    },
    // Отправка лайка на сервер
    sendVote(voteValue, comment) {
      if (this.isVoteSending) return;
      this.error = "";
      let sourceType = "btn-vote";

      if (this.options.user.auth) {
        this.isVoteSending = true;

        let { url, params, send, typeData } = this.options.dataApi.vote;

        let data = this.preparationRequestData({
          data: {
            commentId: comment.id,
            voteValue,
          },
          url,
          params,
          typeData,
        });

        send({ url: data.url, params: data.params })
          .then(({ voteValue }) => {
            try {
              let voteData = this.calculateVoteCount(comment, voteValue);
              Object.assign(voteData, {
                parentId: comment.parentId,
                id: comment.id,
              });
              comment = this.addCommentVote(voteData);
            } catch (error) {
              this.error = this.options.translation.errorUnexpected;
              console.error(error);
            }
          })
          .catch((error) => {
            this.error = this.options.translation.errorVoteSend;
            console.error(error);
          })
          .finally(() => {
            this.emitMessage({
              type: "vote",
              component: this,
              sourceType,
              сurentItem: comment,
              error: this.error,
            });
            this.isVoteSending = false;
          });
      } else {
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType,
          сurentItem: comment,
        });
      }
    },
    // Удалить комментарий
    deleteMessage(comment) {
      if (!comment.isManageDelete && this.isDeleteSending) return;

      this.isDeleteSending = true;
      this.error = "";
      let { url, params, send, typeData } = this.options.dataApi.commentDelete;

      let data = this.preparationRequestData({
        data: {
          commentId: comment.id,
        },
        url,
        params,
        typeData,
      });

      send({ url: data.url, params: data.params })
        .then(() => {
          this.toggleSettings();
          try {
            this.deleteCommentToList({
              commentId: comment.id,
              parentId: comment.parentId,
            });
          } catch (error) {
            this.error = this.options.translation.errorUnexpected;
            console.error(error);
          }
        })
        .catch((error) => {
          this.error = this.options.translation.errorFormSend || error;
          console.error(error);
        })
        .finally(() => {
          this.emitMessage({
            type: "comment-delete",
            component: this,
            sourceType: "form",
            сurentItem: comment,
            error: this.error,
          });
          this.isDeleteSending = false;
        });
    },
    // Листть слайдер
    leafSlide(direction) {
      // next
      if (direction === 1) {
        if (this.files.length - 1 > this.slideNum) {
          this.slideNum = this.slideNum + 1;
        } else {
          this.slideNum = 0;
        }
      }
      // prev
      if (direction === -1) {
        if (this.slideNum - 1 >= 0) {
          this.slideNum = this.slideNum - 1;
        } else {
          this.slideNum = this.files.length - 1;
        }
      }
    },
    // Открыть / Закрыть галлерею
    toggleGallery(isOpenGallery = !this.isOpenGallery) {
      this.isOpenGallery = isOpenGallery;
      this.toggleScroll(isOpenGallery);
    },
    // Блокировать / разблокировать скролл
    toggleScroll(isLock) {
      let overflow = "auto";
      if (isLock) {
        overflow = "hidden";
      }
      document.querySelector("body").style.overflow = overflow;
    },
    // Форматировать дату
    formatDate(commentTimestamp) {
      let { translation } = this.options;
      let commentMs = commentTimestamp * 1000;
      const dayMs = 86400000;
      let commentDate = new Date(commentMs);
      let curentMs = Date.now();
      let year = commentDate.getYear();
      let month = commentDate.getMonth() + 1;
      let day = commentDate.getDate();
      let commentHours = commentDate.getHours();
      let commentMinutes = commentDate.getMinutes();
      let curentHours = new Date(curentMs).getHours();
      let strTime = `${("0" + commentHours).slice(-2)}:${("0" + commentMinutes).slice(-2)}`;
      let strDate = `${("0" + day).slice(-2)}.${("0" + month).slice(-2)}.${("0" + year).slice(-2)}`;

      if (curentMs - commentMs < dayMs) {
        // Сегодня | Вчера
        if (curentHours >= commentHours) {
          return `${translation.dateToday} ${strTime}`;
        } else {
          return `${translation.dateYesterday} ${strTime}`;
        }
      } else if (curentMs - commentMs < dayMs * 2) {
        // Вчера | позавчера
        if (curentHours >= commentHours) {
          return `${translation.dateYesterday} ${strTime}`;
        } else {
          return strDate;
        }
      } else {
        // Раньше
        return strDate;
      }
    },
    // Список настроек: показать / скрыть
    toggleSettings(isShowSettings = !this.isShowSettings) {
      this.isShowSettings = isShowSettings;
    },
    // Переключить форму в режим для редактирования комментраия
    toggleEdited(isEdited = !this.isEdited) {
      this.isEdited = isEdited;
      this.$nextTick(() => {
        this.checkIsShowBntTextMore();
      });
    },
    // Показать / скрыть форму для добавления вопрса
    toggleForm(isFormShow = !this.isFormShow) {
      if (this.options.user.auth) {
        this.isFormShow = isFormShow;
        // При скрытии формы
        if (!isFormShow) {
          // Нужно потому что на "settings" срабатывает "click" и "mouseleave"
          this.toggleSettings(false);
          if (this.isEdited) {
            this.init();
          }
          this.toggleEdited(false);
        }
      } else {
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType: "btn-toggle-form",
        });
      }
    },
    // Отменить редактирование
    cancelEditing() {
      this.toggleForm();
    },
  },
};
