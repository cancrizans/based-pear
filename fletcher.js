class Fletcher{

}


function mod(n, m) {
	return ((n % m) + m) % m;
}

const toneCodes = ["RO","O","OY","Y","YG","G","BG","B","BV","V","VR","R"];


			//const fletch_h = [331-360,19, 37, 45, 63, 83, 102, 122, 137, 170, 263, 302, 331, 19 + 360, 
//37 + 360, 45 + 360, 63 + 360];
 			//const Fvals = [-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13];

 			var calibration = JSON.parse('{"h0":[45,57.75,83,97.5,122.25,137,170,263,307.75,318.75,18.5,37],"h1":[0,0,-0.06,0,-0.115,0.02,-0.11,0,-0.11,-0.035,-0.175,-0.255]}');

 			h0 = [];
 			h1 = [];
 			var Fvals = [];
 			var oldh0t=-360;
 			for(var F=-3; F<=13; F++){
 				var h0t = calibration.h0[mod(F,12)]-360;
 				while(h0t < oldh0t){
 					h0t += 360;
 				}

 				h0.push(h0t);

 				h1.push(calibration.h1[mod(F,12)]);

 				oldh0t = h0t;
 				Fvals.push(F);
 			}




 			var linearinterp = everpolate.linear;

 			function hdata(L){
 				var hdata = []
 				for(var i=0; i<h0.length; i++){
 					hdata.push(h0[i] + (L-50)*h1[i]);
 				}
 				return hdata;
 			}

 			function Ftoh(F,L){
 				return linearinterp(F,Fvals,hdata(L));
 			}
 			function htoF(h,L){
 				var out = linearinterp(h,hdata(L),Fvals)%12;
 				if(out < 0)
 					out+=12;
 				return out;
 			}



 			function xytoFC(x,y){
 				var angle = (-Math.atan2(y,x)+2*Math.PI)%(2*Math.PI);
 				var out = {};
 				out.F = angle /(2*Math.PI) * 12;

 				out.C = Math.sqrt(y*y +  x*x);

 				return out;
 			}

 			function FCtoxy(F,C){
 				var out = {};
 				var angle = F/12 * (2*Math.PI);
 				out.x = C * Math.cos(angle) ;
 				out.y = -C * Math.sin(angle) ;
 				return out;
 			}

 			function FCLtoxyL(fcl){
 				var xy = FCtoxy(fcl.F,fcl.C);
 				var out = {
 					L : fcl.L,
 					x : xy.x,
 					y : xy.y
 				};
 				return out;
 			}

 			function FCLtoRGB(F,C,L) {
 				h = Ftoh(F,L);
 				return chroma.lch(L,C,h)
 			}

 			function RGBtoFCL(r,g,b){
 				var lch = chroma.gl(r,g,b).lch();
 				var out = {};
 				out.L = lch[0];
 				out.C = lch[1];
 				out.F = htoF(lch[2],lch[0]);
 				return out;

 			}



		function maxChromaColourFL(F,L) {
			var C = 150.0;
			var step = 150.0;
			var clipd = true;
			var colour;
			for(var i=0; i<10; i++){
				step = step/2;
				C = C + (clipd ? -step : step);

				colour = FCLtoRGB(F,C,L); 
				//lch = chroma.lch(L,C,h);
				clipd = colour.clipped();

				

			}
			
			if(clipd)
				C -= step;
			


			return { 
				maxC : C,
				col : colour
			}
		}
