import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/Login/Login'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/bench',
      name: 'bench',
      component: resolve => require(['../pages/Bench/Bench'], resolve),
      meta: {
        keepAlive: true,
      },
      children: [
        {
          path: 'position',
          component: resolve => require(['../pages/Position/Position'], resolve),
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../pages/Project/index'], resolve),
      meta: {
        keepAlive: true
      },
      redirect: '/index/project',
      children: [
        {
          path: 'project',
          component: resolve => require(['../pages/Project/Project'], resolve),
          meta: {
            keepAlive: true
          },
        }, {
          path: 'supplier',
          component: resolve => require(['../pages/Project/ProjectSupplier'], resolve),
          meta: {
            keepAlive: true
          },
        }, {
          path: 'operation',
          component: resolve => require(['../pages/Project/ProjectOperation'], resolve),
          meta: {
            keepAlive: true
          },
          redirect: '/index/operation/create',
          children: [{
            path: 'create',
            component: resolve => require(['../pages/Project/ProjectCreate'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'approval',
            component: resolve => require(['../pages/Project/ProjectApproval'], resolve),
            meta: {
              keepAlive: true
            },
          }, {
            path: 'bidding',
            component: resolve => require(['../pages/Project/ProjectBidding'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'procurement',
            component: resolve => require(['../pages/Project/ProjectProcurement'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'contract',
            component: resolve => require(['../pages/Project/ProjectContract'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'payment',
            component: resolve => require(['../pages/Project/ProjectPayment'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'collection',
            component: resolve => require(['../pages/Project/ProjectCollection'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'acceptance',
            component: resolve => require(['../pages/Project/ProjectAcceptance'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'end',
            component: resolve => require(['../pages/Project/ProjectEnd'], resolve),
            meta: {
              keepAlive: true
            },
          },{
            path: 'practice',
            component: resolve => require(['../pages/Project/ProjectPractice'], resolve),
            meta: {
              keepAlive: true
            },
          }, {
            path: 'details',
            component: resolve => require(['../pages/Project/ProjectDetails'], resolve),
            meta: {
              keepAlive: true
            },
          },]
        },
      ]
    }, {
      path: '/practiceIndex',
      name: 'practiceIndex',
      component: resolve => require(['../pages/Practice/PracticeIndex'], resolve),
      meta: {
        keepAlive: true
      },
      redirect: '/practiceIndex/practice',
      children: [
    {
      path: 'practice',
      component: resolve => require(['../pages/Practice/Practice'], resolve),
      meta: {
        keepAlive: true
      }},

    {
      path: 'practiceImplementationStage',
      component: resolve => require(['../pages/Practice/practiceImplementationStage'], resolve),
      meta: {
        keepAlive: true
      }},

    {
      path: 'practiceMissionManagement',
      component: resolve => require(['../pages/Practice/PracticeMissionManagement'], resolve),
      meta: {
        keepAlive: true
      }}]},
    {
      path: '/allIndex',
      name: 'allIndex',
      component: resolve => require(['../pages/AllProject/AllIndex'], resolve),
      meta: {
        keepAlive: true
      },
      redirect: '/allIndex/allProject',
      children:[
    {
      path: 'allProject',
      component: resolve => require(['../pages/AllProject/AllProject'], resolve),
      meta: {
        keepAlive: true
      }},
    {
      path: 'operation',
      component: resolve => require(['../pages/AllProject/AllProjectOperation'], resolve),
      meta: {
        keepAlive: true
      },
      redirect: '/allIndex/operation/create',
      children: [{
        path: 'create',
        component: resolve => require(['../pages/AllProject/AllProjectCreate'], resolve),
        meta: {
          keepAlive: true
        },
      },{
        path: 'approval',
        component: resolve => require(['../pages/AllProject/AllProjectApproval'], resolve),
        meta: {
          keepAlive: true
        },
      }, {
        path: 'practice',
        component: resolve => require(['../pages/AllProject/AllProjectPractice'], resolve),
        meta: {
          keepAlive: true
        },


      }, {
        path: 'details',
        component: resolve => require(['../pages/AllProject/AllProjectDetails'], resolve),
        meta: {
          keepAlive: true
        },
      },]}]},
    {
      path: '/customerManagement',
      component: resolve => require(['../pages/CustomerManagement/CustomerManagement'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/customerDetails',
      component: resolve => require(['../pages/CustomerManagement/CustomerDetails'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/createCustomer',
      component: resolve => require(['../pages/CustomerManagement/CustomerCreate'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/userManagement',
      component: resolve => require(['../pages/UserManagement/UserManagement'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/setting',
      component: resolve => require(['../pages/Setting/Setting'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/customerManagement',
      component: resolve => require(['../pages/CustomerManagement/CustomerManagement'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/createCustomer',
      component: resolve => require(['../pages/CustomerManagement/CustomerCreate'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/userManagement',
      component: resolve => require(['../pages/UserManagement/UserManagement'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setting',
      component: resolve => require(['../pages/Setting/Setting'], resolve),
      meta: {
        keepAlive: true
      },
    },
  ]
})
