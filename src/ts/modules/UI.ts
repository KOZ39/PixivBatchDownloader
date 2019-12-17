// 用户界面
import { lang } from './Lang'
import { EVT } from './EVT'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { XzForm, XzTipArg } from './UI.d'

// 提供中间面板和右侧下载按钮
class UI {
  constructor() {
    // 创建 UI
    this.addUI()
  }

  public form!: XzForm // 表单元素，包含各个选项

  private tipEl: HTMLDivElement = document.createElement('div') // tip 元素

  private rightBtn: HTMLDivElement = document.createElement('div') // 右侧按钮

  private centerPanel: HTMLDivElement = document.createElement('div') // 中间面板

  private reserveArea: HTMLDivElement = document.createElement('div') // 下载区域容器

  // 向预留区域追加元素
  public insertHTML(html: string) {
    this.reserveArea.insertAdjacentHTML('beforeend', html)
  }

  // 添加右侧下载按钮
  private addRightButton() {
    this.rightBtn = document.createElement('div')
    this.rightBtn.textContent = '↓'
    this.rightBtn.id = 'rightButton'
    document.body.appendChild(this.rightBtn) // 绑定切换右侧按钮显示的事件

    this.rightBtn.addEventListener(
      'click',
      () => {
        this.showCenterPanel()
      },
      false
    )
  }

  // 显示中间面板上的提示。参数 arg 指示鼠标是移入还是移出，并包含鼠标位置
  private showTip(text: string | undefined, arg: XzTipArg) {
    if (!text) {
      throw new Error('No tip text.')
    }

    if (arg.type === 1) {
      this.tipEl.innerHTML = text
      this.tipEl.style.left = arg.x + 30 + 'px'
      this.tipEl.style.top = arg.y - 30 + 'px'
      this.tipEl.style.display = 'block'
    } else if (arg.type === 0) {
      this.tipEl.style.display = 'none'
    }
  }

  // 添加中间面板
  private addCenterPanel() {
    const centerPanelHTML = `
      <div class="centerWrap">
      <div class="centerWrap_head">
      <span class="centerWrap_title blue"> ${lang.transl('_下载设置')}</span>
      <div class="btns">
      <a class="has_tip centerWrap_top_btn update" data-tip="${lang.transl(
        '_newver'
      )}" href="https://github.com/xuejianxianzun/PixivBatchDownloader/releases/latest" target="_blank">
      <svg t="1574401457339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4736" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><defs><style type="text/css"></style></defs><path d="M894.72 795.477333l-85.418667-85.418667c0.128-0.170667 0.170667-0.341333 0.298667-0.512l-158.890667-158.890667c0.042667-0.597333 37.248-37.248 37.248-37.248l178.773333 0 1.706667-1.493333c-0.853333-196.736-160.426667-356.053333-357.418667-356.053333-72.704 0-140.202667 22.016-196.650667 59.306667L228.949333 129.664C307.968 71.466667 405.333333 36.650667 511.018667 36.650667c263.296 0 476.757333 213.461333 476.757333 476.714667C987.776 619.093333 952.96 716.416 894.72 795.477333zM369.493333 476.117333c-0.042667 0.597333-37.248 37.248-37.248 37.248l-178.773333 0c0 197.461333 160.085333 357.546667 357.546667 357.546667 72.192 0 139.093333-21.76 195.285333-58.538667l85.589333 85.589333c-78.848 57.685333-175.701333 92.117333-280.874667 92.117333-263.296 0-476.757333-213.461333-476.757333-476.757333 0-105.173333 34.474667-202.069333 92.16-280.874667l85.589333 85.589333C211.925333 318.208 211.882667 318.336 211.797333 318.464L369.493333 476.117333z" p-id="4737"></path></svg>
      </a>
      <a class="has_tip centerWrap_top_btn wiki_url" data-tip="${lang.transl(
        '_wiki'
      )}" href="https://github.com/xuejianxianzun/PixivBatchDownloader/wiki" target="_blank">
      <svg t="1574400169015" class="icon" widht="16" height="16" viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1872" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="16"><defs><style type="text/css"></style></defs><path d="M1044.286732 3.51978A1138.616836 1138.616836 0 0 0 618.841322 58.172364a198.963565 198.963565 0 0 0-26.814324 10.815324V1023.936004l0.895944-0.383976a979.52278 979.52278 0 0 1 443.236298-68.411724 47.741016 47.741016 0 0 0 51.580776-43.261296V50.172864a47.165052 47.165052 0 0 0-43.453284-46.653084z m-74.299356 632.15249h-224.369977V541.470158h224.369977v94.202112z m0-231.921504h-224.369977V309.484657h224.369977v94.266109zM469.154678 58.172364A1138.296856 1138.296856 0 0 0 43.645272 3.455784 47.421036 47.421036 0 0 0 0 50.172864V908.103244a46.653084 46.653084 0 0 0 15.35904 34.493844 48.060996 48.060996 0 0 0 36.285732 12.415224 980.610712 980.610712 0 0 1 443.300294 68.347728l0.895944 0.575964V68.7957a202.099369 202.099369 0 0 0-26.686332-10.751328zM351.146053 635.800262H126.776076V541.59815h224.369977v94.202112z m0-231.921504H126.776076V309.612649h224.369977v94.266109z" p-id="1873"></path></svg>
      </a>
      <a class="has_tip centerWrap_top_btn" data-tip="${lang.transl(
        '_github'
      )}" href="https://github.com/xuejianxianzun/PixivBatchDownloader" target="_blank">
      <svg t="1574401005111" class="icon" widht="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" xmlns:xlink="http://www.w3.org/1999/xlink><defs><style type="text/css"></style></defs><path d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z" p-id="2595"></path></svg>
      </a>
        <div class="has_tip centerWrap_top_btn centerWrap_toogle_option" data-tip="${lang.transl(
          '_收起展开设置项'
        )}">▲</div>
        <div class="has_tip centerWrap_top_btn centerWrap_close" data-tip="${lang.transl(
          '_快捷键切换显示隐藏'
        )}">
        <svg t="1574392276519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1123" data-spm-anchor-id="a313x.7781069.0.i0" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M521.693867 449.297067L111.4112 39.0144a51.2 51.2 0 1 0-72.430933 72.362667l410.282666 410.3168-410.282666 410.3168a51.2 51.2 0 1 0 72.3968 72.3968l410.3168-410.282667 410.3168 410.282667a51.2 51.2 0 1 0 72.3968-72.362667l-410.282667-410.350933 410.282667-410.282667a51.2 51.2 0 1 0-72.3968-72.3968l-410.282667 410.282667z" p-id="1124"></path></svg>
        </div>
      </div>
      </div>
      <div class="centerWrap_con">
      <form class="settingForm">
      <div class="option_area1">
      <p class="formOption1">
      <span class="setWantPageWrap">
      <span class="has_tip settingNameStyle1 setWantPageTip1" data-tip="${lang.transl(
        '_页数'
      )}" style="margin-right: 0px;">${lang.transl(
      '_页数'
    )}</span><span class="gray1" style="margin-right: 10px;"> ? </span>
      <input type="text" name="setWantPage" class="setinput_style1 blue setWantPage"
      value = '-1'
      >
      &nbsp;&nbsp;&nbsp;
      <span class="setWantPageTip2 gray1">-1 或者大于 0 的数字</span>
      </span>
      </p>
      <p class="formOption3">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_多p下载前几张提示'
      )}">${lang.transl('_多p下载前几张')}<span class="gray1"> ? </span></span>
      <input type="text" name="imgNumberPerWork" class="setinput_style1 blue" value="0">
      </p>
      <p class="formOption5">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_下载作品类型的提示Center'
      )}">${lang.transl('_下载作品类型')}<span class="gray1"> ? </span></span>
      <label for="setWorkType0"><input type="checkbox" name="setWorkType0" id="setWorkType0" checked> ${lang.transl(
        '_插画'
      )}&nbsp;</label>
      <label for="setWorkType1"><input type="checkbox" name="setWorkType1" id="setWorkType1" checked> ${lang.transl(
        '_漫画'
      )}&nbsp;</label>
      <label for="setWorkType2"><input type="checkbox" name="setWorkType2" id="setWorkType2" checked> ${lang.transl(
        '_动图'
      )}&nbsp;</label>
      </p>
      <p class="formOption12">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_动图保存格式title'
      )}">${lang.transl('_动图保存格式')}<span class="gray1"> ? </span></span>
      <label for="ugoiraSaveAs1"><input type="radio" name="ugoiraSaveAs" id="ugoiraSaveAs1" value="webm" checked> ${lang.transl(
        '_webmVideo'
      )} &nbsp;</label>
      <label for="ugoiraSaveAs3"><input type="radio" name="ugoiraSaveAs" id="ugoiraSaveAs3" value="gif"> ${lang.transl(
        '_gif'
      )} &nbsp;</label>
      <label for="ugoiraSaveAs2"><input type="radio" name="ugoiraSaveAs" id="ugoiraSaveAs2" value="zip"> ${lang.transl(
        '_zipFile'
      )} &nbsp;</label>
      </p>
      <p class="formOption2">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_筛选收藏数的提示Center'
      )}">${lang.transl(
      '_筛选收藏数Center'
    )}<span class="gray1"> ? </span></span>
      <input type="text" name="setFavNum" class="setinput_style1 blue" value="0">&nbsp;&nbsp;&nbsp;&nbsp;
      </p>
      <p class="formOption11">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_只下载已收藏的提示'
      )}">${lang.transl('_只下载已收藏')}<span class="gray1"> ? </span></span>
      <label for="setOnlyBmk"><input type="checkbox" name="setOnlyBmk" id="setOnlyBmk"> ${lang.transl(
        '_启用'
      )}</label>
      </p>
      <p class="formOption4">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_筛选宽高的按钮Title'
      )} ${lang.transl('_筛选宽高的提示文字')}">${lang.transl(
      '_筛选宽高的按钮文字'
    )}<span class="gray1"> ? </span></span>
      <input type="text" name="setWidth" class="setinput_style1 blue" value="0">
      <input type="radio" name="setWidthAndOr" id="setWidth_AndOr1" value="&" checked> <label for="setWidth_AndOr1">and&nbsp;</label>
      <input type="radio" name="setWidthAndOr" id="setWidth_AndOr2" value="|"> <label for="setWidth_AndOr2">or&nbsp;</label>
      <input type="text" name="setHeight" class="setinput_style1 blue" value="0">
      </p>
      <p class="formOption13">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置宽高比例Title'
      )}">${lang.transl('_设置宽高比例')}<span class="gray1"> ? </span></span>
      <input type="radio" name="ratio" id="ratio0" value="0" checked> <label for="ratio0"> ${lang.transl(
        '_不限制'
      )}&nbsp; </label>
      <input type="radio" name="ratio" id="ratio1" value="1"> <label for="ratio1"> ${lang.transl(
        '_横图'
      )}&nbsp; </label>
      <input type="radio" name="ratio" id="ratio2" value="2"> <label for="ratio2"> ${lang.transl(
        '_竖图'
      )}&nbsp; </label>
      <input type="radio" name="ratio" id="ratio3" value="3"> <label for="ratio3"> ${lang.transl(
        '_输入宽高比'
      )}<input type="text" name="userRatio" class="setinput_style1 blue" value="1.4"></label>
      </p>
      <p class="formOption6">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_必须tag的提示文字'
      )}">${lang.transl('_必须含有tag')}<span class="gray1"> ? </span></span>
      <input type="text" name="needTag" class="setinput_style1 blue setinput_tag">
      </p>
      <p class="formOption7">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_排除tag的提示文字'
      )}">${lang.transl('_不能含有tag')}<span class="gray1"> ? </span></span>
      <input type="text" name="notNeedTag" class="setinput_style1 blue setinput_tag">
      </p>
      <p class="formOption8">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_快速下载的提示'
      )}">${lang.transl('_是否自动下载')}<span class="gray1"> ? </span></span>
      <label for="setQuietDownload"><input type="checkbox" name="quietDownload" id="setQuietDownload" checked> ${lang.transl(
        '_启用'
      )}</label>
      </p>
      <input type="hidden" name="debut" value="0">
      </div>
      <div class="centerWrap_btns centerWrap_btns_free" id="centerWrap_btns_free">
  
      </div>
      <p> ${lang.transl(
        '_设置命名规则3',
        '<span class="fwb blue imgNum">0</span>'
      )}</p>
      <p>
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_线程数字'
      )}">${lang.transl('_设置下载线程')}<span class="gray1"> ? </span></span>
      <input type="text" name="downloadThread" class="setinput_style1 blue" value="5">
      </p>
      <p>
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_设置文件夹名的提示'
      )}">${lang.transl('_设置文件名')}<span class="gray1"> ? </span></span>
      <input type="text" name="userSetName" class="setinput_style1 blue fileNameRule" value="{id}">
      &nbsp;
      <select name="pageInfoSelect" id="pageInfoSelect">
      </select>
      &nbsp;
      <select name="fileNameSelect">
        <option value="default">…</option>
        <option value="{id}">{id}</option>
        <option value="{title}">{title}</option>
        <option value="{tags}">{tags}</option>
        <option value="{tags_translate}">{tags_translate}</option>
        <option value="{user}">{user}</option>
        <option value="{userid}">{userid}</option>
        <option value="{type}">{type}</option>
        <option value="{date}">{date}</option>
        <option value="{bmk}">{bmk}</option>
        <option value="{px}">{px}</option>
        <option value="{rank}">{rank}</option>
        <option value="{id_num}">{id_num}</option>
        <option value="{p_num}">{p_num}</option>
        </select>
      &nbsp;&nbsp;
      <span class="gray1 showFileNameTip">？</span>
      </p>
      <p class="fileNameTip tip">
      <strong>${lang
        .transl('_设置文件夹名的提示')
        .replace('<br>', '. ')}</strong>
      <br>
      <span class="blue">{p_user}</span>
      ${lang.transl('_文件夹标记PUser')}
      <br>
      <span class="blue">{p_uid}</span>
      ${lang.transl('_文件夹标记PUid')}
      <br>
      <span class="blue">{p_tag}</span>
      ${lang.transl('_文件夹标记PTag')}
      <br>
      <span class="blue">{p_title}</span>
      ${lang.transl('_文件夹标记PTitle')}
      <br>
      <span class="blue">{id}</span>
      ${lang.transl('_命名标记1')}
      <br>
      <span class="blue">{title}</span>
      ${lang.transl('_命名标记2')}
      <br>
      <span class="blue">{tags}</span>
      ${lang.transl('_命名标记3')}
      <br>
      <span class="blue">{tags_translate}</span>
      ${lang.transl('_命名标记11')}
      <br>
      <span class="blue">{user}</span>
      ${lang.transl('_命名标记4')}
      <br>
      <span class="blue">{userid}</span>
      ${lang.transl('_命名标记6')}
      <br>
      <span class="blue">{date}</span>
      ${lang.transl('_命名标记12')}
      <br>
      <span class="blue">{type}</span>
      ${lang.transl('_命名标记14')}
      <br>
      <span class="blue">{bmk}</span>
      ${lang.transl('_命名标记8')}
      <br>
      <span class="blue">{px}</span>
      ${lang.transl('_命名标记7')}
      <br>
      <span class="blue">{id_num}</span>
      ${lang.transl('_命名标记9')}
      <br>
      <span class="blue">{p_num}</span>
      ${lang.transl('_命名标记10')}
      <br>
      <span class="blue">{rank}</span>
      ${lang.transl('_命名标记13')}
      <br>
      ${lang.transl('_命名标记提醒')}
      </p>
      <p class="formOption10">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_添加字段名称提示'
      )}">${lang.transl('_添加字段名称')}<span class="gray1"> ? </span></span>
      <label for="setTagNameToFileName"><input type="checkbox" name="tagNameToFileName" id="setTagNameToFileName" checked> ${lang.transl(
        '_启用'
      )}</label>
      &nbsp;&nbsp;&nbsp;
      <span class="gray1 showFileNameResult"> ${lang.transl(
        '_预览文件名'
      )}</span>
      </p>
      <p class="formOption14">
      <span class="has_tip settingNameStyle1" data-tip="${lang.transl(
        '_快速下载建立文件夹提示'
      )}">${lang.transl(
      '_快速下载建立文件夹'
    )}<span class="gray1"> ? </span></span>
      <label for="setAlwaysFolder"><input type="checkbox" name="alwaysFolder" id="setAlwaysFolder" > ${lang.transl(
        '_启用'
      )}</label>
      </p>
      </form>
      <div class="reserve_area"></div>
      <p class="gray1 bottom_help_bar"> 
      <span class="showDownTip">${lang.transl('_常见问题')}</span>
      <a class="wiki2" href="https://github.com/xuejianxianzun/PixivBatchDownloader/wiki" target="_blank"> ${lang.transl(
        '_wiki'
      )}</a>
      <span id="resetOption">${lang.transl('_重置设置')}</span>
      </p>
      <p class="downTip tip"> ${lang.transl('_下载说明')}</p>
      </div>
      </div>
      `
    document.body.insertAdjacentHTML('beforeend', centerPanelHTML)

    this.centerPanel = document.querySelector('.centerWrap')! as HTMLDivElement

    this.reserveArea = document.querySelector('.reserve_area') as HTMLDivElement
  }

  // 显示提示
  private addTipEl() {
    const tipHTML = `<div id="tip"></div>`
    document.body.insertAdjacentHTML('beforeend', tipHTML)
    this.tipEl = document.getElementById('tip') as HTMLDivElement

    const tips = this.centerPanel.querySelectorAll('.has_tip') as NodeListOf<
      HTMLElement
    >
    for (const el of tips) {
      for (const ev of ['mouseenter', 'mouseleave']) {
        el.addEventListener(ev, event => {
          const e = (event || window.event) as MouseEvent
          const text = el.dataset.tip
          this.showTip(text, {
            type: ev === 'mouseenter' ? 1 : 0,
            x: e.clientX,
            y: e.clientY
          })
        })
      }
    }
  }

  // 绑定中间面板上的事件
  private bindEvents() {
    // 监听点击扩展图标的消息，开关中间面板
    chrome.runtime.onMessage.addListener(msg => {
      if (msg.msg === 'click_icon') {
        if (this.centerPanel.style.display === 'block') {
          this.hideCenterPanel()
        } else {
          this.showCenterPanel()
        }
      }
    })

    // 关闭按钮
    document
      .querySelector('.centerWrap_close')!
      .addEventListener('click', () => {
        this.hideCenterPanel()
      })

    // 使用快捷键 Alt + x 切换中间面板显示隐藏
    window.addEventListener(
      'keydown',
      ev => {
        if (ev.altKey && ev.keyCode === 88) {
          const nowDisplay = this.centerPanel.style.display
          if (nowDisplay === 'block') {
            this.hideCenterPanel()
          } else {
            this.showCenterPanel()
          }
        }
      },
      false
    )

    // 预览文件名
    document
      .querySelector('.showFileNameResult')!
      .addEventListener('click', () => {
        EVT.fire(EVT.events.previewFileName)
      })

    // 显示命名字段提示
    document
      .querySelector('.showFileNameTip')!
      .addEventListener('click', () =>
        DOM.toggleEl(document.querySelector('.fileNameTip')! as HTMLDivElement)
      )

    // 显示下载说明
    document
      .querySelector('.showDownTip')!
      .addEventListener('click', () =>
        DOM.toggleEl(document.querySelector('.downTip')! as HTMLDivElement)
      )

    this.form = this.centerPanel.querySelector('.settingForm')! as XzForm

    // 输入框获得焦点时自动选择文本（文件名输入框例外）
    const centerInputs: NodeListOf<HTMLInputElement> = this.form.querySelectorAll(
      'input[type=text]'
    )
    for (const el of centerInputs) {
      if (el.name !== 'userSetName') {
        el.addEventListener('focus', function() {
          this.select()
        })
      }
    }

    // 把下拉框的选择项插入到文本框里
    this.insertValueToInput(this.form.pageInfoSelect, this.form.userSetName)
    this.insertValueToInput(this.form.fileNameSelect, this.form.userSetName)

    // 重置设置
    document.getElementById('resetOption')!.addEventListener('click', () => {
      const result = window.confirm(lang.transl('_是否重置设置'))
      if (result) {
        EVT.fire(EVT.events.resetOption)
      }
    })
  }

  // 添加 UI
  private async addUI() {
    this.addRightButton()
    this.addCenterPanel()
    this.addTipEl()
    this.bindEvents()
  }

  // 收起展开选项设置区域
  public toggleOptionArea(bool: boolean) {
    const OptionArea = <HTMLDivElement>(
      this.centerPanel.querySelector('.option_area1')!
    )
    OptionArea.style.display = bool ? 'block' : 'none'
    this.centerPanel.querySelector(
      '.centerWrap_toogle_option'
    )!.innerHTML = bool ? '▲' : '▼'
  }

  // 把下拉框的选择项插入到文本框里
  private insertValueToInput(from: HTMLSelectElement, to: HTMLInputElement) {
    from.addEventListener('change', () => {
      if (from.value !== 'default') {
        // 把选择项插入到光标位置,并设置新的光标位置
        const position = to.selectionStart!
        to.value =
          to.value.substr(0, position) +
          from.value +
          to.value.substr(position, to.value.length)
        to.selectionStart = position + from.value.length
        to.selectionEnd = position + from.value.length
        to.focus()
      }
    })
  }

  // 显示中间区域
  public showCenterPanel() {
    this.centerPanel.style.display = 'block'
    this.rightBtn.style.display = 'none'
  }

  // 隐藏中间区域
  public hideCenterPanel() {
    this.centerPanel.style.display = 'none'
    this.rightBtn.style.display = 'block'
  }

  // 向中间面板添加按钮
  public addCenterButton(
    bg: string = Colors.blue,
    text: string = '',
    attr: string[][] = []
  ) {
    const e = document.createElement('button')
    e.type = 'button'
    e.style.backgroundColor = bg
    e.textContent = text

    for (const [key, value] of attr) {
      e.setAttribute(key, value)
    }

    let centerBtnWrap = document.getElementById(
      'centerWrap_btns_free'
    )! as HTMLDivElement
    centerBtnWrap.appendChild(e)
    return e
  }

  // 获取排除类型
  public getNotDownType(): string {
    let result = Array.from(
      this.form.querySelectorAll('.formOption5 input')
    ).reduce((result, el, index) => {
      const thisElement = el as HTMLInputElement
      if (thisElement.checked === false) {
        return (result += index)
      } else {
        return result
      }
    }, '')
    return result
  }
}

const ui = new UI()
export { ui }
