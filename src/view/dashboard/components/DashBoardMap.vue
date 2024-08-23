<template>
  <div ref="map" id="map">

  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  setup() {
    const map = ref()


    const markers = ref([])
    const store = useStore()
    const infowindow = ref(null)
    onMounted(async () => {
      await dashboardShop()
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&libraries=services,clusterer`
        /* eslint를 사용한다면 kakao 변수가 선언되지 않았다고
         * 오류를 내기 때문에 아래 줄과 같이 전역변수임을
         * 알려주어야 한다. */
        /* global kakao */
        script.addEventListener('load', () => {
          kakao.maps.load(() => {
            // 카카오맵 API가 로딩이 완료된 후 지도의 기본적인 세팅을 시작해야 한다.
            initMap()
          })
        })
        document.head.appendChild(script)
      } else {

        // 이미 카카오맵 API가 로딩되어 있다면 바로 지도를 생성한다.
        initMap()
      }
    })
    const dashboardShop = async () =>{
     markers.value = await store.dispatch('dashboardStore/DASHBOARD_SHOP')
    }
    const initMap = () => {
      const container = document.getElementById('map')

      const options = {
        // 처음 지도의 위치를 lat, lng(위도, 경도) 값으로 설정한다.
        center: new kakao.maps.LatLng(36.3504119, 127.3845475),
        level: 17
      }

      const map = new kakao.maps.Map(container, options)

      // makeMarkers(map)
      makeClusterer(map)
    }


    const makeMarkers = async (map) => {

      const geocoder = new kakao.maps.services.Geocoder()
      const positions = await Promise.all(markers.value.map(async (item) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(item.shop_address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result[0]);
            } else {

              resolve(null);
            }
          });
        });
      }));
      const filteredPositions = positions.map((obj,index) =>{

        const { shop_name, shop_phone } = markers.value[index];
        return {
          ...obj,
          shop_name ,
          shop_phone
        }
      })
      const filteraddress = filteredPositions.filter((result) => result !== null);
      return filteraddress.map((position) => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(position.y, position.x),
          clickable: true,
        });
        let content = '<div class="overlay_info">';
        content += `    <a><strong>${position.shop_name}</strong></a>`;
        content += '    <div class="desc">';
        content += `       <span class="address">매장 주소:${position.address_name}</span>`;
        content += `       <p class="address">매장 연락처:${position.shop_phone}</p>`;
        content += '    </div>';
        content += '</div>';
        const infoWindow = new kakao.maps.InfoWindow({
          content: content,
          removable: true,
          // xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
          // yAnchor: 1.1,
          position: new kakao.maps.LatLng(position.y, position.x)// 인포 윈도우에 표시할 내용
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker); // 마커 클릭 시 인포 윈도우 열기
        });
        return marker
        // 마커와 인포 윈도우 객체를 함께 반환
      });
    }

    const makeClusterer = async (map) => {
      await new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        disableClickZoom: false,
        markers: await makeMarkers(map)
      });
    }
    return {
      initMap,
      map
    }
  }
}
// import.meta.env.VITE_KAKAO_MAP_KEY
</script>

<style lang="scss">
@import "@/assets/globalStyle.scss";
#map {
  width: 100%;
  height: 100%;
  border-radius: 1rem;

  div {
    border: 0 !important;

  }

  .overlay_info:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }

  .overlay_info a {
    display: block;
    background: $primary;
    text-decoration: none;
    color: $white;
    padding: 10px 36px 10px 14px;
    font-size: 14px;
  }

  .overlay_info .desc {
    padding: 14px;
    position: relative;
    min-width: 190px;
    background-color: #fff;
  }

  .overlay_info .address {
    font-size: 12px;
    color: #333;
    white-space: normal
  }
}

</style>
