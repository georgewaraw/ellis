
function init( ) {

  canvas = document.getElementById( 'canvas' )
  renderer = new THREE.WebGLRenderer( {
    canvas : canvas } )
  renderer.setSize(
      window.innerWidth / 5 , window.innerHeight / 5 , false )

  camera = new THREE.PerspectiveCamera(
      90 , window.innerWidth / window.innerHeight , 1 , 100000 )

  // d ( 2 )
  // controls = new THREE.FlyControls( camera )
  // clock = new THREE.Clock( )

  scene = new THREE.Scene( )
  scene.fog = new THREE.Fog(
      0x000000 , 1 , 100000 ) // Black

  // d ( 2 )
  // stats = new Stats( )
  // document.body.appendChild( stats.dom )

  window.addEventListener(
      'resize' , resize )
  // r ( 2 )
  window.addEventListener(
      'keydown' , keydown )


  number = 1
  sequence( number )

  geometries( )
  materials( )
  meshAll = [ ]

  floor( )
  pool( )
  lamp( )
  tree( )
  building( )
  fence( )
  eye( )
  snow( )

  meshes( )

  lighting( )
  postprocessing( )

  start = 0
  animate( )

}

function resize( ) {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix( )

  renderer.setSize(
      window.innerWidth / 5 , window.innerHeight / 5 , false )

  composer.reset( )

}

function keydown( e ) {

  if ( e.code === 'ArrowLeft' ) {

    number--
    if ( number < 1 ) { number = 5 }

  } else if ( e.code === 'ArrowRight' ) {

    number++
    if ( number > 5 ) { number = 1 }

  } else if ( e.code === 'Space' ) {

    start++
    if ( start > 1 ) { start = 0 }
    videos( )

  }
  sequence( number )

}


function sequence( number ) {

  switch ( number ) {

    case 1 :

      camera.rotation.set(
          330 * Math.PI / 180 , Math.PI , 0 )
      camera.position.set(
          0 , 500 , -3000 )

      break

    case 2 :

      camera.rotation.set(
          210 * Math.PI / 180 ,  330 * Math.PI / 180 , 210 * Math.PI / 180 )
      camera.position.set(
          -2500 , 6000 , -2500 )

      break

    case 3 :

      camera.rotation.set(
          240 * Math.PI / 180 , 330 * Math.PI / 180 , 210 * Math.PI / 180 )
      camera.position.set(
          -17500 , 6000 , -2500 )

      break

    case 4 :

      camera.rotation.set(
          60 * Math.PI / 180 , 150 * Math.PI / 180 , 330 * Math.PI / 180 )
      camera.position.set(
          17500 , 6000 , -2500 )

      break

    case 5 :

      camera.rotation.set(
          30 * Math.PI / 180 , 150 * Math.PI / 180 , 330 * Math.PI / 180 )
      camera.position.set(
          2500 , 6000 , -2500 )

      break

  }

}

function animate( ) {

  if ( start ) {

    meshEye.rotation.y = Date.now( ) * .0005
    meshEye.position.y = Math.sin( Date.now( ) * .001 ) * 1000 + 2000

    meshSnow.position.set(
        camera.position.x - 2500 , camera.position.y - 2500 , camera.position.z - 2500 )
    meshSnow.rotation.z = Math.sin( Date.now( ) * .00001 ) / 5

  }

  // d ( 2 )
  // controls.update(
  //     clock.getDelta( ) * 100 )

  composer.render( )

  // d ( 1 )
  // stats.update( )

  requestAnimationFrame( animate )

}


function geometries( ) {

  geometryFloor = new THREE.PlaneGeometry(
      1000 , 1000 )

  geometryPoolBase = new THREE.BoxGeometry(
      3000 , 3000 , 150 )
  geometryPoolWater = new THREE.PlaneGeometry(
      2850 , 2850 )

  geometryLampBody = new THREE.BoxGeometry(
      150 , 4000 , 150 )
  geometryLampHead = new THREE.BoxGeometry(
      150 , 200 , 150 )

  geometryTree = new THREE.PlaneGeometry(
      500 , 4000 )

  geometryBuilding = new THREE.PlaneGeometry(
      10000 , 10000 )

  geometryFence = new THREE.PlaneGeometry(
      32000 , 3000 )

  geometryEye = new THREE.CylinderGeometry(
      25 , 250 , 250 , 4 )

  geometryAll = new THREE.Geometry( )

}

function materials( ) {

  videoFloor = document.getElementById( 'videoFloor' )
  textureFloor = new THREE.VideoTexture( videoFloor )
  textureFloor.minFilter = THREE.LinearFilter
  materialFloor = new THREE.MeshLambertMaterial( {
    map : textureFloor } )


  materialPoolBase = new THREE.MeshLambertMaterial( {
    color : 0x212121 } ) // Gray 900
  videoPoolWater = document.getElementById( 'videoPoolWater' )

  texturePoolWater = new THREE.VideoTexture( videoPoolWater )
  texturePoolWater.minFilter = THREE.LinearFilter
  materialPoolWater = new THREE.MeshLambertMaterial( {
    map : texturePoolWater } )


  materialLampBody = new THREE.MeshLambertMaterial( {
    color : 0x212121 } ) // Gray 900

  materialLampHead = new THREE.MeshLambertMaterial( {
    color : 0xCFD8DC } ) // Blue Gray 100


  videoTree = document.getElementById( 'videoTree' )
  textureTree = new THREE.VideoTexture( videoTree )
  textureTree.minFilter = THREE.LinearFilter
  materialTree = new THREE.MeshLambertMaterial( {
    map : textureTree , side : THREE.DoubleSide } )

  videoTree2 = document.getElementById( 'videoTree2' )
  textureTree2 = new THREE.VideoTexture( videoTree2 )
  textureTree2.minFilter = THREE.LinearFilter
  materialTree2 = new THREE.MeshLambertMaterial( {
    map : textureTree2 , side : THREE.DoubleSide } )


  videoBuilding = document.getElementById( 'videoBuilding' )
  textureBuilding = new THREE.VideoTexture( videoBuilding )
  textureBuilding.minFilter = THREE.LinearFilter
  materialBuilding = new THREE.MeshLambertMaterial( {
    map : textureBuilding } )

  videoBuilding2 = document.getElementById( 'videoBuilding2' )
  textureBuilding2 = new THREE.VideoTexture( videoBuilding2 )
  textureBuilding2.minFilter = THREE.LinearFilter
  materialBuilding2 = new THREE.MeshLambertMaterial( {
    map : textureBuilding2 } )

  videoBuilding3 = document.getElementById( 'videoBuilding3' )
  textureBuilding3 = new THREE.VideoTexture( videoBuilding3 )
  textureBuilding3.minFilter = THREE.LinearFilter
  materialBuilding3 = new THREE.MeshLambertMaterial( {
    map : textureBuilding3 } )


  materialFence = new THREE.MeshLambertMaterial( {
    map : textureTree } )


  videoEye = document.getElementById( 'videoEye' )
  textureEye = new THREE.VideoTexture( videoEye )
  textureEye.minFilter = THREE.LinearFilter
  materialEye = new THREE.MeshLambertMaterial( {
    map : textureEye } )


  materialAll = [
    // 0
    materialFloor ,
    // 1
    materialPoolWater ,
    // 2 , 3
    materialTree , materialTree2 ,
    // 4 , 5 , 6
    materialBuilding , materialBuilding2 , materialBuilding3 ,
    // 7
    materialFence ]

}

function videos( ) {

  if ( start ) {

    videoFloor.play( )
    videoPoolWater.play( )
    videoTree.play( )
    videoTree2.play( )
    videoBuilding.play( )
    videoBuilding2.play( )
    videoBuilding3.play( )
    videoEye.play( )

  } else {

    videoFloor.pause( )
    videoPoolWater.pause( )
    videoTree.pause( )
    videoTree2.pause( )
    videoBuilding.pause( )
    videoBuilding2.pause( )
    videoBuilding3.pause( )
    videoEye.pause( )

  }

}

function meshes( ) {

  for ( i = meshAll.length ; i-- ; ) {

    meshAll[ i ].mesh.updateMatrix( )
    geometryAll.merge(
        meshAll[ i ].mesh.geometry , meshAll[ i ].mesh.matrix , meshAll[ i ].materialIndex )

  }

  meshAll = new THREE.Mesh(
      geometryAll , materialAll )
  scene.add( meshAll )

}


function floor( ) {

  for ( i = -20000 ; i <= 20000 ; i += 1000 ) {

    for ( j = -10000 ; j <= 20000 ; j += 1000 ) {

      mesh = new THREE.Mesh( geometryFloor )
      mesh.rotation.set(
          270 * Math.PI / 180 , 0 , 0 )
      mesh.position.set(
          i , 0 , j )
      meshAll.push( {
        mesh : mesh , materialIndex : 0 } )

    }

  }

}

function pool( ) {

  mesh = new THREE.Mesh(
      geometryPoolBase , materialPoolBase )
  mesh.rotation.set(
      270 * Math.PI / 180 , 0 , 0 )
  mesh.position.set(
      0 , 75 , 0 )
  scene.add( mesh )

  mesh = new THREE.Mesh( geometryPoolWater )
  mesh.rotation.set(
      270 * Math.PI / 180 , 0 , 0 )
  mesh.position.set(
      0 , 160 , 0 )
  meshAll.push( {
    mesh : mesh , materialIndex : 1 } )

}

function lamp( ) {

  worker = new Worker( 'worker.js' )
  worker.onmessage = function( e ) {

    for ( i = e.data.length ; i-- ; ) {

      mesh = new THREE.Mesh(
          geometryLampBody , materialLampBody )
      mesh.position.set(
          e.data[ i ].x , 2000 , e.data[ i ].z )
      scene.add( mesh )

      mesh = new THREE.Mesh(
          geometryLampHead , materialLampHead )
      mesh.position.set(
          e.data[ i ].x , 4100 , e.data[ i ].z )
      scene.add( mesh )

    }

  }
  worker.postMessage( 'lamp' )

}

function tree( ) {

  for ( i = -17500 ; i <= 17500 ; i += 1000 ) {

    if ( i < -3000 || i > 3000 ) {

      for ( j = -7500 ; j <= 17500 ; j += 1000 ) {

        if ( Math.random( ) > .925 ) {

          if ( Math.random( ) < .5 ) {

            mesh = new THREE.Mesh( geometryTree )
            mesh2 = new THREE.Mesh( geometryTree )
            n = 2

          } else {

            mesh = new THREE.Mesh( geometryTree )
            mesh2 = new THREE.Mesh( geometryTree )
            n = 3

          }

          mesh.rotation.set(
              0 , 45 * Math.PI / 180 , 0 )
          mesh.position.set(
              i , 2000 , j )
          meshAll.push( {
            mesh : mesh , materialIndex : n } )
          mesh2.rotation.set(
              0 , 135 * Math.PI / 180 , 0 )
          mesh2.position.set(
              i , 2000 , j )
          meshAll.push( {
            mesh : mesh2 , materialIndex : n } )

        }

      }

    }

  }

}

function building( ) {

  for ( i = 5000 ; i <= 15000 ; i += 10000 ) {

    for ( j = 5000 ; j <= 50000 ; j += 10000 ) {

      mesh = new THREE.Mesh( geometryBuilding )
      mesh.rotation.set(
          0 , Math.PI , 0 )
      mesh.position.set(
          i , j , 20400 )
      meshAll.push( {
        mesh : mesh , materialIndex : 5 } )

    }

  }

  for ( i = -14750 ; i <= -4750 ; i += 10000 ) {

    for ( j = 5000 ; j <= 15000 ; j += 10000 ) {

      mesh = new THREE.Mesh( geometryBuilding )
      mesh.rotation.set(
          0 , Math.PI , 0 )
      mesh.position.set(
          i , j , 20300 )
      meshAll.push( {
        mesh : mesh , materialIndex : 4 } )

    }

  }

  for ( j = 19750 ; j <= 49750 ; j += 10000 ) {

    mesh = new THREE.Mesh( geometryBuilding )
    mesh.rotation.set(
        0 , Math.PI , 0 )
    mesh.position.set(
        -4750 , j , 20500 )
    meshAll.push( {
      mesh : mesh , materialIndex: 6 } )

  }

}

function fence( ) {

  mesh = new THREE.Mesh(
      geometryFence , materialFence )
  mesh.rotation.set(
      0 , 270 * Math.PI / 180 , 0 )
  mesh.position.set(
      20500 , 1500 , 5000 )
  meshAll.push( {
    mesh : mesh , materialIndex: 7 } )

  mesh2 = new THREE.Mesh(
      geometryFence , materialFence )
  mesh2.rotation.set(
      0 , 90 * Math.PI / 180 , 0 )
  mesh2.position.set(
      -20500 , 1500 , 5000 )
  meshAll.push( {
    mesh : mesh2 , materialIndex: 7 } )

}

function eye( ) {

  meshEye = new THREE.Mesh(
      geometryEye , materialEye )
  meshEye.rotation.set(
      Math.PI , 0 , 0 )
  meshEye.position.set(
      0 , 1000 , 0 )
  scene.add( meshEye )

}

function snow( ) {

  geometrySnow = new THREE.Geometry( )
  for ( i = 0 ; i < 5000 ; i++ ) {

    vertex = new THREE.Vector3(
        10000 * Math.random() - 1000 , 10000 * Math.random() - 1000 , 10000 * Math.random() - 1000 )
    geometrySnow.vertices.push( vertex )

  }

  materialSnow = new THREE.PointsMaterial( {
    size : 10 , map : textureEye } )

  meshSnow = new THREE.Points(
      geometrySnow , materialSnow )
  scene.add( meshSnow )

}


function lighting( ) {

  lightAmbient = new THREE.AmbientLight(
      0x607D8B , .25 ) // Blue Gray 500
  scene.add( lightAmbient )

  worker = new Worker( 'worker.js' )
  worker.onmessage = function( e ) {

    for ( i = e.data.length ; i-- ; ) {

      lightPoint = new THREE.PointLight(
          0xCFD8DC , 1 , 5250 ) // Blue Gray 100
      lightPoint.position.set(
          e.data[ i ].x , 4100 , e.data[ i ].z )
      scene.add( lightPoint )

    }

  }
  worker.postMessage( 'lighting' )

  lightSpot = new THREE.SpotLight( 0xCFD8DC ) // Blue Gray 100
  lightSpot.position.set(
      0 , 25000 , 5000 )
  lightSpot.target.position.set(
      0 , 25000 , 20000 )
  scene.add( lightSpot.target )
  scene.add( lightSpot )

}

function postprocessing( ) {

  composer = new THREE.EffectComposer( renderer )
  composer.addPass( new THREE.RenderPass(
      scene , camera ) )

  postTechnicolor = new THREE.ShaderPass( THREE.TechnicolorShader )
  composer.addPass( postTechnicolor )
  postFilm = new THREE.FilmPass(
      1 , .01 , 4096 , false )
  postFilm.renderToScreen = true
  composer.addPass( postFilm )

}
