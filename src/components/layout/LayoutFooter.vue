/**
* 파일명 : LayoutFooter.vue
* 설명 : footer 의 대한 레이아웃 재사용 컴포넌트
* 작성자 : 최원웅
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <footer class="footer">
    <div class="container">
      <div class="left">
        <div class="segment">
          <p>
            <span class="company_name">행복한 친구들</span>
          </p>
          <p>
            <span>대표자명: 이정현</span>
            <span>E-mail: happystamp@naver.com</span>
            <span>Tel: 033-000-0000</span>
          </p>
          <p>
            <span>사업자등록번호: 477-64-00575</span>
            <span>통신판매업신고번호: 0000-0000-00000</span>
          </p>
          <p>
            <span>주소: 강원특별자치도 춘천시 공지로 69-9, 201동 1405호</span>
          </p>
          <p>
            <span class="copyright">COPYRIGHT ⓒ 2023 BY WWW.HAPPINESS-STAMP.COM ALL RIGHTS RESERVED.</span>
          </p>
        </div>

      </div>
      <div class="right">
        <a><img src="/src/assets/images/appstore.png"></a>
        <a><img src="/src/assets/images/googleplay.png"></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

.footer {

  color: $black;
  background-color: $background_gray;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3.125rem 15rem;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .segment {
        margin-top: 1.25rem;

        p {
          margin-bottom: 0.313rem;

          span {
            font-size: 0.875rem;
            margin-right: 16px;
          }

          &:last-child {
            margin-top: 30px;
          }
        }

        .copyright {
          margin-top: 10px;
          color: #999999;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      gap: 10px;

      a {
        display: flex;
        justify-content: center;

        img {
          cursor: pointer;

        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .footer {
    height: auto;

    .container {
      padding: 80px;

      .left {

        .segment {
          p {
            span {
              letter-spacing: -.2px;
            }
          }
        }
      }

      .right {
        a {
          img {
            width: 130px;

          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .footer {
    height: auto;

    .container {
      flex-direction: column-reverse;
      align-items: flex-start;
      padding: 48px;

      .left {
        margin-top: 30px;

        .segment {
          p {
            span {
              font-size: 12px;
              letter-spacing: -.8px;
            }
          }
        }
      }

      .right {
        flex-direction: row;
        justify-content: center;
        gap: 10px;

        a {
          img {
            width: 120px;

          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .footer {

    .container {
      padding: 48px 12px;

      .left {
        margin-top: 10px;

        .segment {
          p {
            span {
              margin-right: 6px;
            }
          }
        }
      }

      .right {

        a {
          img {
            width: 100px;

          }
        }
      }
    }
  }
}


</style>
