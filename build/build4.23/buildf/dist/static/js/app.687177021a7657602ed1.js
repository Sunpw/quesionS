webpackJsonp([1], {
	0: function(t, e, i) {
		i("j1ja"), t.exports = i("NHnr")
	},
	"1hNv": function(t, e) {},
	LuZG: function(t, e) {
		window.getQuestion = function(t) {
			var e = t;
			window.parm = e
		}, window.sendmgs = function(t) {
			var e = document.createElement("iframe");
			e.setAttribute("src", "webview:#mgs#" + t), document.documentElement.appendChild(e), e.parentNode.removeChild(e), e = null
		}
	},
	NHnr: function(t, e, i) {
		"use strict";
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		i("j1ja");
		var s = i("7+uW"),
			n = {
				render: function() {
					var t = this.$createElement,
						e = this._self._c || t;
					return e("div", {
						attrs: {
							id: "app"
						}
					}, [e("router-view")], 1)
				},
				staticRenderFns: []
			};
		var a = i("VU/8")({
				name: "App"
			}, n, !1, function(t) {
				i("gsu9")
			}, null, null).exports,
			o = i("/ocq"),
			l = i("mvHQ"),
			r = i.n(l),
			c = i("mtWM"),
			u = i.n(c),
			d = (i("Q5rI"), i("LuZG"), {
				data: function() {
					return {
						isSubmitFlag: !1,
						isCancle: !1,
						isContinue: !1,
						isExit: !1,
						centerDialogVisible: !1,
						tip: "",
						sendAppType: 0,
						token: "",
						Ttime: "",
						qtitle: "",
						completedNum: 0,
						completedEleList: [],
						textAreaList: [],
						submitInfo: [],
						submitInfoValArr: [],
						quesList: {},
						userinfo: {},
						getParam: {},
						postParam: {},
						isDisabled: !1,
						showModel: !1,
						modelTextAreaVal: "",
						modelIndex: "",
						modelInputLength: "",
						focusFlag: !0,
						checkinputlist: {}
					}
				},
				created: function() {
					window.sendmgs("msg:hybrid&callback=getQuestion"), this.getAppParms(), this.openFullScreen2()
				},
				methods: {
					modelConfirmBtn: function() {
						return 5 == this.quesList[this.modelIndex + 4].type && this.submitInfo[this.modelIndex].val.length > 500 ? (this.openAlert("您输入的字符个数超过500，输入1-500之间的字符个数！", 3e3), !1) : 5 != this.quesList[this.modelIndex + 4].type && this.textAreaList[this.modelIndex].length > 50 ? (this.openAlert("您输入的字符个数超过50，输入1-50之间的字符个数！", 3e3), !1) : void(this.showModel = !1)
					},
					focusModel: function(t) {
						this.modelIndex = t, this.$nextTick(function() {
							this.focusFlag = !0
						}), 5 == this.quesList[t + 4].type ? this.modelInputLength = 500 : this.modelInputLength = 50, this.showModel = !0
					},
					openFullScreen2: function() {
						this.$loading({
							lock: !0,
							text: "Loading",
							spinner: "el-icon-loading",
							background: "rgba(0, 0, 0, 0.7)"
						})
					},
					cancleClick: function() {
						this.centerDialogVisible = !1, this.isCancle = !1, this.isContinue = !1
					},
					continueClick: function() {
						this.centerDialogVisible = !1, this.isCancle = !1, this.isContinue = !1, window.sendmgs("msg:hybrid&success=false")
					},
					isClose: function() {
						this.isCancle || (this.isCancle = !0, this.isContinue = !0), this.centerDialogVisible = !0, this.tip = "您还未完成答题，是否选择离开？"
					},
					closeDialog: function() {
						1 === this.sendAppType ? (this.centerDialogVisible = !1, this.isCancle = !1, this.isContinue = !1, window.sendmgs("msg:hybrid&success=true"), this.isExit ? this.isExit = !1 : this.isExit = !0) : 0 === this.sendAppType && (this.centerDialogVisible = !1, this.isCancle = !1, this.isContinue = !1, window.sendmgs("msg:hybrid&success=false"), this.isExit ? this.isExit = !1 : this.isExit = !0)
					},
					requestHeader: function(t, e) {
						u.a.defaults.headers["Content-Type"] = "application/json", u.a.defaults.headers.Authorization = t, u.a.defaults.headers.Ttime = e
					},
					openAlert: function(t, e) {
						var i = this;
						this.$message({
							message: t,
							center: !0,
							onClose: function() {
								i.isDisabled = !1
							},
							duration: e
						})
					},
					getAppParms: function() {
						var t, e = this,
							i = window.parm;
						i = JSON.parse(i), this.token = i.token, this.Ttime = i.Ttime, delete i.token, delete i.Ttime, this.userinfo = i, this.requestHeader(this.token, this.Ttime), (t = i, u.a.get("http://apicustomer.topjoy.com/v1/questions", {
							params: t
						}).then(function(t) {
							return t.data
						}).catch(function(t) {
							return t.data
						})).then(function(t) {
							e.$loading().close(), 200 == t.code && 0 === t.status ? (e.qtitle = t.titleHeader, e.quesList = t.questions, e.processingData()) : (t.name = "-31007" == t.code) ? (e.qtitle = t.titleHeader, e.isDisabled = !0, e.centerDialogVisible = !0, e.tip = t.message, e.isExit = !0, e.sendAppType = 0) : (t.name = "-31005" == t.code) ? (e.isDisabled = !0, e.centerDialogVisible = !0, e.tip = t.message, e.isExit = !0, e.sendAppType = 0) : 400 == t.code && 1 === t.status && (e.qtitle = t.titleHeader, e.isDisabled = !0, e.centerDialogVisible = !0, e.tip = t.message, e.isExit = !0, e.sendAppType = 1)
						}).catch(function(t) {
							return e.isDisabled = !1, e.openAlert("请求异常", 0), !1
						})
					},
					postAnswer: function(t) {
						var e = this;
						for(var i in this.userinfo) this.postParam[i] = this.userinfo[i];
						var s, n = new Date;
						n = n.getTime(), this.postParam.create_time = n, t = this.postParam, (s = t, u.a.post("http://apicustomer.topjoy.com/v1/questionnaire", s).then(function(t) {
							return t.data
						}).catch(function(t) {
							return t.data
						})).then(function(t) {
							200 == t.code ? (e.centerDialogVisible = !0, e.tip = t.message, e.sendAppType = 1, e.isDisabled = !0, e.isExit = !0) : "fail" == t.name ? (e.centerDialogVisible = !0, e.tip = t.message, e.sendAppType = 0, e.isExit = !0) : "-31008" == t.code ? (e.centerDialogVisible = !0, e.tip = t.message, e.sendAppType = 1, e.isExit = !0) : 400 == t.code && e.openAlert(t.message, 3e3)
						}).catch(function(t) {
							return e.isDisabled = !1, e.openAlert("提交异常", 3e3), !1
						})
					},
					inputOther: function(t) {
						var e = this.completedEleList,
							i = 0,
							s = this.quesList,
							n = this.submitInfo,
							a = this.textAreaList;
						3 == s[t + 4].type ? a[t].length >= 1 ? this.completedEleList[t] = !0 : this.completedEleList[t] = !1 : 4 == s[t + 4].type ? n[t].val.length > s[t + 4].NeedDiamond[0] ? this.completedEleList[t] = !0 : n[t].val.length == s[t + 4].NeedDiamond[0] ? a[t].length >= 1 ? this.completedEleList[t] = !0 : this.completedEleList[t] = !1 : n[t].val.length < s[t + 4].NeedDiamond[0] && (this.completedEleList[t] = !1) : 5 == s[t + 4].type && (n[t].val.length >= 5 ? this.completedEleList[t] = !0 : this.completedEleList[t] = !1);
						for(var o = 0; o < e.length; o++) e[o] && i++;
						this.completedNum = i, this.completedEleList = e
					},
					valueChange: function(t, e, i) {
						var s = this.submitInfo,
							n = this.quesList,
							a = this.textAreaList,
							o = (i = i + 4, t = t, !1),
							l = this.completedEleList,
							r = 0;
						if(3 == e.type) 0 == t.length ? (a[i - 4] = "", l[i - 4] = !1, s[i - 4].val = []) : 1 == t.length ? "其他" == n[i].data.val[t[0]] ? l[i - 4] = !1 : l[i - 4] = !0 : (s[i - 4].val = [t[t.length - 1]], "其他" == n[i].data.val[t[t.length - 1]] ? l[i - 4] = !1 : l[i - 4] = !0);
						else if(4 == e.type)
							if(t.length > 0) {
								for(var c = 0; c < t.length; c++) "其他" == n[i].data.val[t[c]] && (o = !0, this.checkinputlist[i]);
								if(o || (a[i - 4] = ""), t.length >= n[i].NeedDiamond[0]) {
									var u = !0;
									if(t.length == n[i].NeedDiamond[0])
										for(var d = 0; d < t.length; d++) "其他" == n[i].data.val[t[d]] && a[i - 4].length < 1 && (u = !1);
									l[i - 4] = u
								} else l[i - 4] = !1
							} else a[i - 4] = "", l[i - 4] = !1;
						else 5 == e.type && (t.length >= 5 ? l[i - 4] = !0 : l[i - 4] = !1);
						for(var p = 0; p < l.length; p++) l[p] && r++;
						this.completedEleList = l, this.completedNum = r, this.quesList = n, this.submitInfo = s, this.textAreaList = a
					},
					submitData: function() {
						this.isDisabled = !0;
						var t = this.quesList,
							e = this.submitInfo,
							i = this.textAreaList,
							s = !0;
						for(var n in t) {
							var a = e[parseInt(n) - 4],
								o = t[n];
							if("3" == o.type) {
								if("" == a.val) return s = !1, this.openAlert("第" + (n - 3) + "题单选题未选择", 3e3), !1;
								if("其他" == o.data.val[a.val]) {
									if("" == i[parseInt(n) - 4]) return s = !1, this.openAlert("第" + (n - 3) + "题未填写其他选择", 3e3), !1;
									if(i[parseInt(n) - 4].length < 1) return s = !1, this.openAlert("第" + (n - 3) + "题其他信息太短", 3e3), !1;
									a[a.val] = i[parseInt(n) - 4]
								}
							} else if("4" == o.type) {
								var l = o.NeedDiamond[0];
								o.NeedDiamond[1];
								if(0 == a.val.length) return this.openAlert("第" + (n - 3) + "题多选题未选择选项", 3e3), !1;
								if(a.val.length < l) return this.openAlert("第" + (n - 3) + "题多选题选的太少", 3e3), !1;
								for(var c = 0; c < a.val.length; c++)
									if("其他" == o.data.val[a.val[c]]) {
										if("" == i[parseInt(n) - 4]) return s = !1, this.openAlert("第" + (n - 3) + "题未填写其他选择", 3e3), !1;
										if(i[parseInt(n) - 4].length < 1) return s = !1, this.openAlert("第" + (n - 3) + "题其他信息太短", 3e3), !1;
										a[a.val[c]] = i[parseInt(n) - 4]
									}
							} else if("5" == o.type) {
								if(a.val.length < 5) return this.openAlert("第" + (n - 3) + "题简答题答题小于5个字符", 3e3), !1;
								if(a.val.length > 500) return this.openAlert("第" + (n - 3) + "题简答题答题大于500个字符", 3e3), !1
							}
							"5" != o.type && (e[parseInt(n) - 4] = a)
						}
						this.isSubmitFlag = s, s && (e = r()(e), this.postParam.questions = e, this.postAnswer(this.postParam))
					},
					processingData: function() {
						var t = this.quesList,
							e = this.submitInfo,
							i = [],
							s = [];
						for(var n in t) {
							var a = {};
							i.push(""), s.push(!1), a.type = t[n].type, a.id = n, 5 != t[n].type ? a.val = [] : a.val = "", e.push(a)
						}
						this.completedEleList = s, this.submitinfo = e, this.quesList = t, this.textAreaList = i
					}
				},
				mounted: function() {}
			}),
			p = {
				render: function() {
					var t = this,
						e = t.$createElement,
						i = t._self._c || e;
					return i("div", {
						staticClass: "pageQ"
					}, [t.showModel ? i("div", {
						staticClass: "el-loading-mask custoMask"
					}, [i("div", {
						staticClass: "inputDialog"
					}, [5 != t.quesList[t.modelIndex + 4].type ? i("el-input", {
						attrs: {
							autofocus: t.focusFlag,
							type: "textarea",
							maxLength: "50"
						},
						on: {
							input: function(e) {
								t.inputOther(t.modelIndex)
							}
						},
						model: {
							value: t.textAreaList[t.modelIndex],
							callback: function(e) {
								t.$set(t.textAreaList, t.modelIndex, e)
							},
							expression: "textAreaList[modelIndex]"
						}
					}) : t._e(), t._v(" "), 5 == t.quesList[t.modelIndex + 4].type ? i("el-input", {
						attrs: {
							autofocus: t.focusFlag,
							type: "textarea",
							maxLength: "500"
						},
						on: {
							input: function(e) {
								t.inputOther(t.modelIndex)
							}
						},
						model: {
							value: t.submitInfo[t.modelIndex].val,
							callback: function(e) {
								t.$set(t.submitInfo[t.modelIndex], "val", e)
							},
							expression: "submitInfo[modelIndex].val"
						}
					}) : t._e(), t._v(" "), i("div", {
						staticClass: "modelCountSignBox"
					}, [5 != t.quesList[t.modelIndex + 4].type ? i("span", {
						staticClass: "demonstration"
					}, [t._v(t._s(t.textAreaList[t.modelIndex].length) + "/50")]) : t._e(), t._v(" "), 5 == t.quesList[t.modelIndex + 4].type ? i("span", {
						staticClass: "demonstration"
					}, [t._v(t._s(t.submitInfo[t.modelIndex].val.length) + "/500")]) : t._e()]), t._v(" "), i("div", {
						staticClass: "maskConfirmBtnBox"
					}, [i("span", {
						staticClass: "maskConfirmBtn",
						on: {
							click: t.modelConfirmBtn
						}
					}, [t._v("确定")])])], 1)]) : t._e(), t._v(" "), i("div", {
						staticClass: "header"
					}, [i("header", [i("span", [t._v(t._s(t.qtitle))]), t._v(" "), i("span", {
						staticClass: "anwser-progress"
					}, [t._v("(" + t._s(t.completedNum) + "/" + t._s(t.submitInfo.length) + ")")]), t._v(" "), i("i", {
						staticClass: "el-icon-circle-close-outline",
						staticStyle: {
							float: "right",
							"margin-top": "10px",
							"padding-right": "10px"
						},
						on: {
							click: t.isClose
						}
					})])]), t._v(" "), i("div", {
						staticClass: "section-q"
					}, t._l(t.quesList, function(e, s, n) {
						return i("div", {
							staticClass: "contentBox"
						}, [i("div", {
							staticClass: "query-tit"
						}, [i("span", {
							staticClass: "tit-num"
						}, [t._v(t._s(n + 1) + ".")]), t._v(" "), 4 == e.type || 4 != e.type ? i("span", {
							staticClass: "demonstration"
						}, [i("span", [t._v(t._s(e.data.title))]), t._v(" "), i("i", {
							directives: [{
								name: "show",
								rawName: "v-show",
								value: t.completedEleList[n],
								expression: "completedEleList[index]"
							}],
							staticClass: "el-icon-check"
						})]) : t._e(), t._v(" "), 4 == e.type ? i("i", {
							staticClass: "required-check-text"
						}, [t._v("(必选" + t._s(e.NeedDiamond[0]) + "-" + t._s(e.NeedDiamond[1]) + "个选项)")]) : t._e()]), t._v(" "), i("div", {
							staticClass: "radio-check",
							attrs: {
								id: "radio-check"
							}
						}, ["3" == e.type ? i("el-checkbox-group", {
							staticClass: "font-size-com",
							on: {
								change: function(i) {
									t.valueChange(i, e, n)
								}
							},
							model: {
								value: t.submitInfo[n].val,
								callback: function(e) {
									t.$set(t.submitInfo[n], "val", e)
								},
								expression: "submitInfo[index].val"
							}
						}, [t._l(e.data.val, function(e, s) {
							return [i("el-checkbox", {
								attrs: {
									label: s
								}
							}, [t._v(t._s(e))]), t._v(" "), t._l(t.submitInfo[n].val, function(a) {
								return "其他" == e && a == s ? i("span", {
									staticClass: "other-check",
									on: {
										click: function(e) {
											t.focusModel(n)
										}
									}
								}, [t._v("\n\t\t\t\t    \t\t\t" + t._s(t.textAreaList[n]) + "\n\t\t\t\t    \t\t\t"), "" == t.textAreaList[n] ? i("span", {
									staticClass: "other-check-prompt"
								}, [t._v("\n\t\t\t\t\t\t\t\t请输入内容（1-50个字符）\n\t\t\t\t\t\t\t")]) : t._e()]) : t._e()
							})]
						})], 2) : t._e()], 1), t._v(" "), "4" == e.type ? i("el-checkbox-group", {
							staticClass: "font-size-com",
							attrs: {
								max: e.NeedDiamond[1]
							},
							on: {
								change: function(i) {
									t.valueChange(i, e, n)
								}
							},
							model: {
								value: t.submitInfo[n].val,
								callback: function(e) {
									t.$set(t.submitInfo[n], "val", e)
								},
								expression: "submitInfo[index].val"
							}
						}, [t._l(e.data.val, function(e, s) {
							return [i("el-checkbox", {
								attrs: {
									label: s
								}
							}, [t._v(t._s(e))]), t._v(" "), t._l(t.submitInfo[n].val, function(a) {
								return "其他" == e && a == s ? i("span", {
									staticClass: "other-check",
									on: {
										click: function(e) {
											t.focusModel(n)
										}
									}
								}, [t._v("\n\t\t\t\t\t\t" + t._s(t.textAreaList[n]) + "\n\t\t\t\t\t\t"), "" == t.textAreaList[n] ? i("span", {
									staticClass: "other-check-prompt"
								}, [t._v("\n\t\t\t\t\t\t\t请输入内容（1-50个字符）\n\t\t\t\t\t\t")]) : t._e()]) : t._e()
							})]
						})], 2) : t._e(), t._v(" "), "5" == e.type ? i("div", {
							staticClass: "textAreaBox",
							on: {
								click: function(e) {
									t.focusModel(n)
								}
							}
						}, [t._v("\n\t\t\t\t" + t._s(t.submitInfo[n].val) + "\n\t\t\t\t"), "" == t.submitInfo[n].val ? i("span", {
							staticClass: "other-check-prompt"
						}, [t._v("\n\t\t\t\t\t请输入内容（1-500个字符）\n\t\t\t\t")]) : t._e()]) : t._e(), t._v(" "), 5 == e.type ? i("span", {
							staticClass: "demonstration fr"
						}, [t._v(t._s(t.submitInfo[n].val.length) + "/500")]) : t._e()], 1)
					})), t._v(" "), i("div", {
						staticClass: "footer-q"
					}, [i("el-button", {
						staticClass: "btn-icon",
						attrs: {
							disabled: t.isDisabled,
							type: "primary"
						},
						on: {
							click: t.submitData
						}
					}, [t._v("提交")])], 1), t._v(" "), i("div", {}, [i("el-dialog", {
						staticStyle: {
							"margin-top": "15vh",
							"border-radius": "5px"
						},
						attrs: {
							visible: t.centerDialogVisible,
							width: "40%",
							center: "",
							"close-on-click-modal": !1
						},
						on: {
							"update:visible": function(e) {
								t.centerDialogVisible = e
							}
						}
					}, [i("span", [t._v(t._s(t.tip))]), t._v(" "), i("span", {
						staticClass: "dialog-footer",
						attrs: {
							slot: "footer"
						},
						slot: "footer"
					}, [t.isCancle ? i("el-button", {
						staticClass: "comfirmBtn",
						attrs: {
							type: "primary"
						},
						on: {
							click: t.continueClick
						}
					}, [t._v("确 定")]) : t._e(), t._v(" "), t.isContinue ? i("el-button", {
						staticClass: "cancleBtn",
						on: {
							click: t.cancleClick
						}
					}, [t._v("取 消")]) : t._e(), t._v(" "), t.isExit ? i("el-button", {
						staticClass: "comfirmBtn",
						attrs: {
							type: "primary"
						},
						on: {
							click: t.closeDialog
						}
					}, [t._v("确 定")]) : t._e()], 1)])], 1)])
				},
				staticRenderFns: []
			};
		var h = {
				name: "index",
				data: function() {
					return {}
				},
				mounted: function() {},
				components: {
					QuestionnaireSurvey: i("VU/8")(d, p, !1, function(t) {
						i("1hNv"), i("eeum")
					}, null, null).exports
				}
			},
			m = {
				render: function() {
					var t = this.$createElement,
						e = this._self._c || t;
					return e("div", {
						staticClass: "index"
					}, [e("questionnaire-survey")], 1)
				},
				staticRenderFns: []
			};
		var f = i("VU/8")(h, m, !1, function(t) {
			i("pQN8")
		}, "data-v-2d16b8ba", null).exports;
		s.default.use(o.a);
		var v = new o.a({
				routes: [{
					path: "/",
					name: "Index",
					component: f
				}]
			}),
			g = i("zL8q"),
			_ = i.n(g),
			b = (i("tvR6"), i("hKoQ")),
			x = i.n(b);
		i("hKoQ").polyfill(), x.a.polyfill(), s.default.config.debug = !0, s.default.use(_.a), s.default.prototype.$ELEMENT = {
			size: "small"
		}, s.default.config.productionTip = !1;
		new s.default({
			el: "#app",
			router: v,
			components: {
				App: a
			},
			template: "<App/>"
		})
	},
	Q5rI: function(t, e) {
		(function() {
			return {
				initRem: function() {
					var t = 625 / (750 / window.innerWidth);
					t > 345 && (t = 345);
					var e = "html{font-size:" + t + "%}",
						i = document.createElement("style");
					i.setAttribute("type", "text/css"), i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i)
				}
			}
		})().initRem()
	},
	eeum: function(t, e) {},
	gsu9: function(t, e) {},
	pQN8: function(t, e) {},
	tvR6: function(t, e) {}
}, [0]);
//# sourceMappingURL=app.687177021a7657602ed1.js.map