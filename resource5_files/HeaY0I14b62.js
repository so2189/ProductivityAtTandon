;/*FB_PKG_DELIM*/

__d("polarisFBConnectSelectors",["PolarisFBConnectStatus"],(function(a,b,c,d,e,f,g){"use strict";function a(a){return a.fb.status!==d("PolarisFBConnectStatus").STATUS.ineligible}function b(a){return a.fb.status===d("PolarisFBConnectStatus").STATUS.connected}function c(a){return a.fb.igLinked===!0||a.fb.igSSODisabled===!0}g.isFBConnectEligible=a;g.isConnected=b;g.isIGLinked=c}),98);
__d("polarisSuggestedUserSelectors",["PolarisReactRedux","nullthrows","polarisFBConnectSelectors","polarisUserSelectors","reselect"],(function(a,b,c,d,e,f,g){"use strict";var h;function a(a){return!a.suggestedUsers.viewerHasFBConnect}a=(h=d("reselect")).createSelector(a,d("polarisFBConnectSelectors").isFBConnectEligible,function(a,b){return a?!1:b});var i=h.createSelector(function(a){return a.suggestedUsers.ids},function(a){return a.suggestedUsers.dismissedAysfIds},function(a,b){return a.filter(function(a){return!b.includes(a)})});function b(a,b){return!!a.suggestedUsers.profileChainingFailures[b]}function j(a,b){return a.suggestedUsers.profileChainingSuggestions[b]}function e(a){return d("PolarisReactRedux").useSelector(function(b){return d("polarisUserSelectors").getUsersByIds(b,j(b,a))})}var k=h.createSelector(function(a){return a.suggestedUsers.dismissedAysfIds},function(a,b){return c("nullthrows")(b.userIds).map(function(b){return d("polarisUserSelectors").getUserById(a,b)})},function(a,b){return b.filter(function(b){return!a.includes(b.id)})});h=h.createSelector(function(a){return a.suggestedUsers.ids},function(a){return a});function f(a){return a.suggestedUsers.isLoadingSuggestions&&a.suggestedUsers.ids.length===0}g.shouldDisplayFacebookConnect=a;g.getNonDismissedAysfIds=i;g.getProfileChainingFailure=b;g.getProfileChainingSuggestions=j;g.usePolarisProfileChainingSuggestions=e;g.getFeedAysfUsers=k;g.getSuggestions=h;g.isInitialLoad=f}),98);
__d("PolarisUserList.react",["IGDSBox.react","IGDSListItemPlaceholder","IGDSSpinner.react","PolarisErrorBoundary.react","PolarisIGVirtualList.react","PolarisUserListItem.react","react"],(function(a,b,c,d,e,f,g){"use strict";var h,i=h||d("react");a=10;var j=65;b=function(a){babelHelpers.inheritsLoose(b,a);function b(){var b,d;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(b=d=a.call.apply(a,[this].concat(f))||this,d.$1=i.createRef(),d.$2=function(a){var b=d.props.onFollowClick;b&&b(a)},d.$3=function(a){var b=a.index;a=a.isVisible;var e=d.props,f=e.analyticsContext,g=e.avatarSize,h=e.avatarTriggerAnalyticsContext,j=e.borderlessFollowButton,k=e.entryPoint,l=e.hideName,m=e.hoverPositionType,n=e.isLoading,o=e.likers,p=e.primaryActionButton,q=e.secondaryActionButton,r=e.showFollowerCount,s=e.topComponent,t=e.userIds;e=e.usernameTriggerAnalyticsContext;return t.length===0?n?i.jsx(c("IGDSListItemPlaceholder"),{size:g},b):null:i.jsxs(c("PolarisErrorBoundary.react"),{children:[b===0&&s!=null&&s,i.jsx(c("PolarisUserListItem.react"),{analyticsContext:f,avatarSize:g,avatarTriggerAnalyticsContext:h,borderlessFollowButton:j,entryPoint:k,hasLiked:o==null?void 0:o.has(t[b]),hideFollowButton:d.props.hideFollowButton,hideName:l,hideStoryRings:d.props.hideStoryRings,hoverPositionType:m||"absolute",id:t[b],isVisible:a,onDismiss:d.props.onDismiss,onFollowClick:d.$2,onScrollEnter:d.$4,onUsernameClick:d.$5,position:b,primaryActionButton:p,secondaryActionButton:q,showFollowerCount:r,usernameTriggerAnalyticsContext:e})]},t[b])},d.$4=function(a){var b=d.props.onScrollChange;b&&b(a)},d.$5=function(a){var b=d.props.onUsernameClick;b&&b(a)},b)||babelHelpers.assertThisInitialized(d)}var d=b.prototype;d.componentDidUpdate=function(a){this.$1.current!=null&&this.props.userIds.length===this.props.initialRenderCount&&a.userIds.length===0&&this.$1.current.forceUpdate()};d.render=function(){var a=this.props,b=a.containerSize,d=a["data-testid"];d=a.initialRenderCount;var e=a.isLoading,f=a.onScroll;a=a.userIds;return i.jsxs(i.Fragment,{children:[i.jsx(c("PolarisIGVirtualList.react"),{containerSize:b,"data-testid":void 0,estimatedItemSize:j,initialRenderCount:d,itemCount:a.length||d,onScroll:f,pageletName:"user_list",ref:this.$1,renderer:this.$3,skipChildMeasurement:!this.props.adjustScrollAfterRender,style:e&&a.length===0?{overflowY:"hidden"}:{}}),a.length>0&&e&&i.jsx(c("IGDSBox.react"),{alignItems:"center",marginTop:4,children:i.jsx(c("IGDSSpinner.react"),{size:"medium"})})]})};return b}(i.PureComponent);b.defaultProps={adjustScrollAfterRender:!0,avatarTriggerAnalyticsContext:null,borderlessFollowButton:!1,containerSize:"auto",entryPoint:"unknown",hideFollowButton:!1,hideName:!1,hideStoryRings:!1,hoverPositionType:null,initialRenderCount:a,isLoading:!1,showFollowerCount:!1,usernameTriggerAnalyticsContext:null};g["default"]=b}),98);