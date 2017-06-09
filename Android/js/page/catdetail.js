'use strict';

import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,ScrollView,Dimensions,TouchableNativeFeedback,Platform,TouchableOpacity} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import Tabbar from 'react-native-tabbar'

class CatDetailPage extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        };
    }

    onTabSelect(tab) {
    this.setState({ tab })
  }
  
    goBack () {
        this.props.navigator.pop();
    }

    goDetailPage () {
        
    }
    render(){
        return(
            <View style={styles.headercontainer}>
                <NavigationBar title="现代言情"
                    barStyle={styles.navBar}
                    backHidden={false}
                    barTintColor='white'
                    statusbarPadding = {(Platform.OS === 'android' ? false : true)}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}/>
        <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('item1')}>
          <View>
            <Text>综合</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem,styles.tabItemActive] }  onPress={() => this.onTabSelect('item2')}>
          <View>
            <Text style={styles.tabTextActive}>字数</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item3')}>
          <View>
            <Text>点击</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('item4')}>
          <View>
            <Text>时间</Text>
          </View>
        </TouchableOpacity>      
        </View>
            <ListView
                    style={styles.content}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
    _renderRow(rowData,rowId) {
        return (
            <View style={styles.listContainer}>
                <View style={styles.info}>
                    {rowData.records.map((item, index) => {
                        return(

                            <View key={index}>
                                <View onPress={this.goDetailPage()} style={styles.infoitem}>
                                    <Image style={styles.infoimg} source={{uri:'https://qidian.qpic.cn/qdbimg/349573/c_' + item.bid + '/150'}} />
                                    <View style={styles.infoword}>
                                        <Text style={styles.infoname}>{item.bName}</Text>
                                        <Text numberOfLines={2} style={styles.desc}>{item.desc}</Text>
                                        <View style={styles.infometa}>
                                            <Text style={styles.infoauth}>{item.bAuth}</Text>
                                                <View style={styles.infocategory}>
                                                    <Text style={styles.infocategorytxt}>{item.cat}</Text>
                                                </View>
                                                <View style={styles.infostatus}>
                                                    <Text style={styles.infostatustxt}>{item.state}</Text>
                                                </View>
                                                <View style={styles.infowordscnt}>
                                                    <Text style={styles.infowordscnttxt}>{item.cnt}</Text>
                                                </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )})
                    }
                </View>

            </View>
        );
    }

}

const DATA = [
    {
    "pageCat":"现代言情",
    "records":[{
                "bid": "22156065000230002",
                "bName": "拒嫁豪门：少夫人99次出逃",
                "cid": "3004536500428801",
                "bAuth": "西门龙霆",
                "desc": "她惹上豪门恶霸，“少爷，少奶奶又跑了…”该死，她竟敢嫁给别人！“教堂外有99架大炮，你敢答应他就试试。”他是暗夜黑帝，世界只分他要的，他不要的。“男人，你是我不要的！”她带球逃离，几年后领着“迷你版”归来：“怪叔叔，不准欺负我妈咪！”“欺负她才有你这个坏东西，不想添个弟弟？”\n【出版名《我要我们一直爱下去》，求珍藏~当当网购买独家签名版】\n推荐我另一本文：《傲娇总裁，你好！》",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30028",
                "subCat": "豪门世家",
                "state": "连载",
                "cnt": "941.23万"
            }, {
                "bid": "3756282604501801",
                "bName": "强制宠爱，染上惹火甜妻",
                "cid": "5329697904801001",
                "bAuth": "律儿",
                "desc": "她玩笑似的开口：“我们结婚吧。” \r\n　　结果，对面的男子却真的回应：“好，刚好户口本我正带着。” \r\n　　于是，两个相见次数五个手指头数的过来的人，结婚了… \r\n　　☆☆☆ \r\n　　顾念兮这一辈子最为悲惨的，便是被自己的好友给撬了墙角，拐走了自己的异地恋男友。 \r\n　　看着打的如火如荼的他们，一个邪恶的念头出现在她的脑子里：老娘一定会出现在你家的户口本上。 \r\n　　既然当不了你老婆，那当你嫂嫂何妨？ \r\n　　谈逸泽，城里头位高权重的爷，S区人人景仰的谈少。 \r\n　　他的生活，可谓是顺风顺水。 \r\n　　只是，平顺的日子过多了，也会觉得腻味的。 \r\n　　于是，当顾念兮这个有着利爪一样的女人向自己“求婚”的时候，他准备接下这个神圣的“任务”。 \r\n　　说好的，我们的婚姻没有爱，所以，我们从来都是只做不爱。 \r\n　　只是，为什么当看到她的身边，有着其他出色的男子频频献殷勤的时候，一向稳如泰山的他，开始按耐不住了呢？ \r\n　　☆片段☆： \r\n　　【能抢走的，不叫爱人】： \r\n　　某高级咖啡厅里，对桌的女子歉意的抬头：“你恨我吗，念兮？” \r\n　　“我，为什么恨你？”念兮浅笑抬眸。 \r\n　　“因为我抢了你的爱人！”诡异女子的脸上带着愧疚，但内心却无比的骄傲。犹如斗胜的公鸡。 \r\n　　“不恨，能抢走的不叫爱人！” \r\n　　顾念兮一句话，让本来嘴角挂起胜利笑容的女子，瞬间错愕… \r\n",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30021",
                "subCat": "都市生活",
                "state": "完结",
                "cnt": "780.67万"
            }, {
                "bid": "22160488000580102",
                "bName": "誓不为妻：全球豪娶少夫人",
                "cid": "3004770101106301",
                "bAuth": "妃子一笑",
                "desc": "（正文已完结）身怀六甲，丈夫带别的女人回家，还要赶她出门！惨死重生，她誓要逃离，他又纠缠不放：“竟敢逃走，全城搜寻，48小时内找出那女人！”他狂妄不可一世，翻手她是一根草，覆手她又是他手心里的宝。她不屑：“离我远点，我们已经离婚了！”（正文已完结，请放心阅读，更新的都是配角番外~）",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30028",
                "subCat": "豪门世家",
                "state": "连载",
                "cnt": "632.92万"
            }, {
                "bid": "22165330000681402",
                "bName": "误惹豪门：爵少的迷糊新娘",
                "cid": "3004943801256301",
                "bAuth": "沐笙箫",
                "desc": "她潜进他的家，只想用他手指盖个指纹印，没想到偷鸡不成蚀把米。某次party，被人问到莫南爵哪点好，童染吃得正欢，忽略了身后的身影，随口回道：“财大气粗！”回家后刚准备开门，被人直接堵在门口：“听说，你喜欢我财大……器粗？”童染脸一红：“莫南爵，你不要脸！”【正文已完结，番外更新中，放心入坑~】",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30028",
                "subCat": "豪门世家",
                "state": "连载",
                "cnt": "613.35万"
            }, {
                "bid": "22278647000143902",
                "bName": "重生之妆点美丽",
                "cid": "3635297004816201",
                "bAuth": "桂雪葉",
                "desc": "　　苏伊水前世老公出轨，被老公的新欢所杀害。\r\n　　重生回到十八岁的年华。前世所犯下的错误决不能再犯，人生要好好的弥补一下。\r\n　　斗渣男败小三争权益自是份内之事。前男友一脸的巴结贴到了她的身旁，她面色阴冷狠狠的一巴掌掴在了他的脸上；前小三满脸的谄媚凑到了她的身边，她冷冷的一笑，伸手抓过一瓶卸妆油泼到了前小三的脸上。\r\n　　在妹妹苏依柔的影响和鼓励下，她搭乘时尚快车，开创了自己的化妆品品牌雪莱.以其独特的化妆品配方，显著的效果，产品的多样性很快步入了市场的主流行列。\r\n　　时尚女人我最大护肤美容不在话下。\r\n　　妆点美丽的首选是什么，是雪莱！\r\n　　",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30021",
                "subCat": "都市生活",
                "state": "不限",
                "cnt": "569.16万"
            }, {
                "bid": "3737853603076301",
                "bName": "大人物的小萌妻",
                "cid": "5331055003297801",
                "bAuth": "秋如意",
                "desc": "　　18岁的她：平凡如路边最不起眼的小石头。在学校，被师长同学视做平庸无奇的眼镜妹；在家族里，被亲戚朋友笑做没人要的书呆子。事实是空有一身才华却光芒内敛。\r\n　　28岁的他：耀眼强大，是这个国家最神秘的大人物。商界大佬对他俯首称臣，帝国上将奉他为座上宾，甚至连一国首相都要谄媚讨好他。\r\n　　本该是在平行线上、永不相交的两人，因缘际会结为秘密夫妻，开始了一段鲜为人知、刺激又甜蜜的隐婚生活。\r\n　　——这不仅是个超暖心萌萌爱宠婚后恋故事，更是一个女孩自立自强自爱的励志成长史！\r\n　　【做人要低调】\r\n　　同学：萌萌她家没关系没后台更没钱，想进一本热门专业根本就是痴人说梦。\r\n　　二姨：我们帅帅警校三年出来就是皇家公差了！比萌萌读那什么三流大学好太多了。\r\n　　三姨：我们幼蓉最会交朋友，全是高干子弟。哪像萌萌只知道读死书，连个像样的学校都没考上。\r\n　　小姨：女孩子书读得越多越难嫁。还不如娉婷当个护士，嫁个好男人才靠谱儿！\r\n　　好吧，她家是草根，没钱没关系；她是书呆子，朋友少，没貌没身材，成绩一般般。她是没能拿到一流大学的录取通知书，却被一张红果果的“结婚证”砸到！九月开学时，在一堆人惊爆的眼神里，姚萌萌托着行李箱，藏着结婚证，踏进了帝国最高学府的大门。\r\n　　★呆萌呆语：人家低调，那是有可以高调的基础。\r\n　　【生活要简约】\r\n　　“大，大了点儿。”指年龄。\r\n　　“大点儿，才有内涵。”\r\n　　“呃，真的好大啊！”指手掌。\r\n　　“够大，更有包容力。”\r\n　　女孩垂着小脑袋，食指对对戮，已经红成虾咪状，心里万分纠结当前的境况：浴室的水为什么不再深一点啊，呜呜呜！\r\n　　大男人已身置火焰山，却不动声色，“萌萌，你要这样做石雕似的，消费一晚上三千美刀的温泉海景房吗？”\r\n　　一万RMB一晚啊，她只是跟显摆四处旅游见多识广的表弟表妹们说了一句，他太忙还没空带她旅游，一觉醒来她就飞了半个地球。这男人也太“小心眼儿”了！\r\n　　★呆萌呆语：生活要简约，前题是能随时玩转奢华，不然就是真寒酸！\r\n　　【偶尔要扮猪】\r\n　　女孩千年不变的齐眉流海和黑眼镜，埋首各种数据分析报表资料堆里。\r\n　　棒子明星说，“又丑又呆，穿衣毫无品位，居然还不化妆，锦琛欧巴怎么能带她出场啊！”\r\n　　报纸评说，“帝国第一钻石情人的厉少竟然娶了个黑丑呆做老婆，全国九成人认为他们的婚姻不会超过三个月。”\r\n　　某妞怒了，不需要神仙教母，红地毯上变身为纯天然性感小萌妞儿，美绝人寰，惊倒一片。\r\n　　呀呀个呸，他们已经是婚龄整四年的“老夫老妻”了好不好！\r\n　　★呆萌呆语：咱扮猪，那是为了能随时吃老虎，不然就真是猪了\r\n　　【极品小萌包儿】\r\n　　某人：你是谁？\r\n　　宝宝：小萌包儿。\r\n　　某人：那你妈咪呢？\r\n　　宝宝：鲜肉包儿。\r\n　　某人：爹地呢？\r\n　　宝宝：大黑狗。\r\n　　某人：为什么爹地是狗啊？\r\n　　宝宝：肉包子打狗，一去不回。\r\n　　某人：（黑线）知道自己是从哪里来的吗？\r\n　　宝宝：爹地的肚子里。\r\n　　某人：（这家教做得忒不负责了）怎么不是妈咪？\r\n　　宝宝：因为大黑狗吃下了鲜肉包，才拉出了小萌包儿！\r\n　　某人：＝_＝\r\n　　\r\n",
                "catId": "30020",
                "cat": "现代言情",
                "subCatId": "30021",
                "subCat": "都市生活",
                "state": "完结",
                "cnt": "525.96万"
            }
        ]
        }
];

const styles = StyleSheet.create({
    tabsContainer: {
        // height: 1000,
        // flex: 1,
        marginTop:5,
        flexDirection: 'row',
        borderColor: "#f0f1f2",
        justifyContent: "flex-start",
        marginLeft:20,
        flexWrap: 'wrap', 
        alignItems: 'flex-start'
      },
      scrollView: {
        backgroundColor: 'yellow'
      },
      tabItem: {
        // flex: 1,
        marginRight:10,
        height:15,
        marginTop:10,
        // borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      tabItemActive:{
        marginRight:10,
        marginTop:8,
        height:19,
        alignItems: 'center',
        justifyContent: 'center',    
        borderBottomWidth:1,
        borderBottomColor:'#ff3955',
      },
      tabTextActive:{
        color:'#ff3955',
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:0,
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    headercontainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    header: {
        height:44,
        borderWidth: 1,
        borderColor: "#f0f1f2",
        justifyContent: "center"
    },
    headertext: {
        marginLeft:10,
        color: "#33373d"
    },
    navBar: {
        // height:20
    },
    content: {
        marginTop: 10,
        marginBottom: 10
    },
    listContainer:{
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        flex:1,
        marginBottom: 5,
        marginRight:20,
        justifyContent:'center',
        flexDirection:'row'
    },
    green: {
        color: "#65c541"
    },
    blue: {
        color: "#3988ff"
    },
    title: {
        flexDirection: "row",
        marginBottom: 5
    },
    titlefontsize: {
        fontSize: 16,
        color: "#33373e"
    },
    info : {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    infowrapper: {
        height:80,
    },
    infowrapperbc: {
    },
    infoitem: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        marginLeft:10,
        marginRight:10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f1f2',
    },
    infoimg: {
        width:60,
        height:80,
        marginRight:5,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    infometa:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    infoword: {
        justifyContent: "center"
    },
    infocategory:{
        borderColor:'#ffa100',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "center",
        padding:2,
        marginRight:5,
    },
    infocategorytxt:{
        color:'#ffa100',
        fontSize:8
    },
    infostatus:{
        borderColor:'#ff3955',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "center",
        padding:2,
        marginRight:5,
    },
    infostatustxt:{
        color:'#ff3955',
        fontSize:8,

    },
    infowordscnt:{
        borderColor:'#4284ee',
        borderWidth: 1,
        padding:2,
        flexDirection: 'row',
        justifyContent: "center",
        marginLeft:5,
    },
    infowordscnttxt:{
        color:'#4284ee',
        fontSize:8
    },
    infoauth:{
        flex:1,
        flexDirection: 'row',
        justifyContent: "center",
        color:'#969ba3',
        marginLeft:5,
    },
    desc:{
        flex:1, //height (according to its parent),
        flexDirection: 'row',
        padding:5,
        marginRight:10,
        color:'#969ba3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoname: {
        fontWeight:"bold",
        fontSize:16,
        color:"#000"
    },
    infonum: {
        color:"#969ba3"
    }
});

export default CatDetailPage
