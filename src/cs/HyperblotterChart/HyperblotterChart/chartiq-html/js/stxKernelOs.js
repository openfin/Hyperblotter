/* File generated on Mon Jan 04 2016 16:24:07 GMT-0500 (EST) */
/* Version 2015-12-08.1 */
/* Expires on 2016/12/30 */
/*
Copyright 2014-2015-2016 ChartIQ LLC
*/

(function(){
	var trialExpiration =  "undefined";
	if (trialExpiration != "undefined") {
		var expiration = new Date(trialExpiration);
		var now = new Date();
		if (now.getTime() > expiration.getTime()) {
			alert("This license has expired!");
			console.log("This license has expired!");
		} else {
			var diffDays = (expiration.getTime() - now.getTime());
			diffDays = Math.round(Math.abs(diffDays/(1000*60*60*24)));
			if ( diffDays < 3) {
				alert("This license expires in " + diffDays + " days!");
				console.log("This license expires in " + diffDays + " days!");
			}
		}
	}
	var version=["Version 2015-12-08.1"];
	if(version.length>0 && window.STXChart && STXChart.version.length>0){
		if(version[0]!=STXChart.version[0])
		console.log("Mismatched kernel version stxChart:" + STXChart.version[0] + " stxKernel:" + version[0]);
	}

	var domains=[/*<domains>*/];
	if(domains.length){
		var href=document.location.href;
		var foundOne=false;
		for(var i=0;i<domains.length;i++){
			var domain=domains[i];
			if(href.indexOf(domain)!=-1){
				foundOne=true;
			}
		}
		if(!foundOne){
			console.log("!!!! Not licensed for domain " + document.location.href);
		}
	}
})();
var v4W={'J6G':function(c6G,R6G){return c6G*R6G;}
,'a6w':function(v6w,B6w){return v6w-B6w;}
,'Q6Y':function(g6Y,f6Y){return g6Y===f6Y;}
,'K65':function(s65,I65){return s65!==I65;}
,'S5E':function(D5E,Q5E){return D5E<Q5E;}
,'l0':function(j0,A0){return j0<A0;}
,'K8':function(s8,I8){return s8-I8;}
,'f7h':function(t7h,x7h){return t7h===x7h;}
,'J8G':function(c8G,R8G){return c8G*R8G;}
,'u2E':function(N2E,X2E){return N2E*X2E;}
,'d6Y':function(q6Y,Z6Y){return q6Y==Z6Y;}
,'k7a':function(P7a,r7a){return P7a==r7a;}
,'P68':function(r68,n68){return r68*n68;}
,'g8':function(f8,t8){return f8-t8;}
,'W7Y':function(O7Y,M7Y){return O7Y<M7Y;}
,'y1E':function(K1E,s1E){return K1E<=s1E;}
,'a1y':function(v1y,B1y){return v1y/B1y;}
,'S69':function(D69,Q69){return D69===Q69;}
,'x9h':function(H9h,E9h){return H9h==E9h;}
,'T9Z':function(i9Z,w9Z){return i9Z<=w9Z;}
,'h3Y':function(C3Y,k3Y){return C3Y*k3Y;}
,'H7a':function(E7a,Y7a){return E7a==Y7a;}
,'J59':function(c59,R59){return c59==R59;}
,'l1E':function(j1E,A1E){return j1E<A1E;}
,'E8y':function(Y8y,G8y){return Y8y/G8y;}
,'A2Y':function(d2Y,q2Y){return d2Y<q2Y;}
,'X48':function(J48,c48){return J48==c48;}
,'l0h':function(j0h,A0h){return j0h==A0h;}
,'U2y':function(a2y,v2y){return a2y==v2y;}
,'M3E':function(b3E,m3E){return b3E>=m3E;}
,'Z1Y':function(y1Y,K1Y){return y1Y<K1Y;}
,'K1a':function(s1a,I1a){return s1a in I1a;}
,'b3y':function(m3y,h3y){return m3y-h3y;}
,'l75':function(j75,A75){return j75-A75;}
,'G4G':function(z4G,e4G){return z4G/e4G;}
,'X2G':function(J2G,c2G){return J2G==c2G;}
,'N0Y':function(X0Y,J0Y){return X0Y==J0Y;}
,'b58':function(m58,h58){return m58<h58;}
,'p85':function(U85,a85){return U85*a85;}
,'Z45':function(y45,K45){return y45<K45;}
,'U4G':function(a4G,v4G){return a4G/v4G;}
,'A7h':function(d7h,q7h){return d7h===q7h;}
,'A8h':function(d8h,q8h){return d8h==q8h;}
,'d0':function(q0,Z0,K0){return q0*Z0*K0;}
,'e39':function(o39,l39){return o39<l39;}
,'M8w':function(b8w,m8w){return b8w/m8w;}
,'D9Z':function(Q9Z,g9Z){return Q9Z<=g9Z;}
,'o55':function(l55,j55){return l55==j55;}
,'C19':function(k19,P19){return k19>P19;}
,'P29':function(r29,n29){return r29==n29;}
,'E8Y':function(Y8Y,G8Y){return Y8Y>=G8Y;}
,'D3':function(Q3,g3){return Q3<g3;}
,'A9Y':function(d9Y,q9Y){return d9Y>q9Y;}
,'Z15':function(y15,K15){return y15===K15;}
,'t75':function(x75,H75){return x75>H75;}
,'v3a':function(B3a,L3a){return B3a<L3a;}
,'i45':function(w45,V45){return w45-V45;}
,'a8Y':function(v8Y,B8Y){return v8Y-B8Y;}
,'U9Z':function(a9Z,v9Z){return a9Z>v9Z;}
,'l8Y':function(j8Y,A8Y){return j8Y-A8Y;}
,'y1G':function(K1G,s1G){return K1G<s1G;}
,'E95':function(Y95,G95){return Y95<G95;}
,'J1':function(R1,W4){return R1-W4;}
,'M18':function(b18,m18){return b18-m18;}
,'N6':function(X6,J6){return X6>J6;}
,'q6a':function(Z6a,y6a){return Z6a==y6a;}
,'p58':function(U58,a58){return U58>a58;}
,'z0Y':function(e0Y,o0Y){return e0Y>=o0Y;}
,'y6Y':function(K6Y,s6Y){return K6Y!=s6Y;}
,'r3w':function(n3w,F3w){return n3w>=F3w;}
,'c1y':function(R1y,W4y){return R1y/W4y;}
,'l29':function(j29,A29){return j29<A29;}
,'F3E':function(p3E,U3E){return p3E<U3E;}
,'i7E':function(w7E,V7E){return w7E!=V7E;}
,'x5a':function(H5a,E5a){return H5a===E5a;}
,'m28':function(h28,C28){return h28<C28;}
,'R5a':function(W6a,O6a,M6a){return W6a/O6a*M6a;}
,'O28':function(M28,b28){return M28>=b28;}
,'f79':function(t79,x79){return t79===x79;}
,'R48':function(W78,O78){return W78==O78;}
,'J0a':function(c0a,R0a){return c0a in R0a;}
,'M3Y':function(b3Y,m3Y){return b3Y<m3Y;}
,'q85':function(Z85,y85){return Z85===y85;}
,'R3a':function(W8a,O8a){return W8a<O8a;}
,'Z98':function(y98,K98){return y98-K98;}
,'a68':function(v68,B68){return v68<B68;}
,'n6h':function(F6h,p6h){return F6h<p6h;}
,'z88':function(e88,o88){return e88*o88;}
,'i9y':function(w9y,V9y){return w9y<V9y;}
,'k1Z':function(P1Z,r1Z){return P1Z>r1Z;}
,'R3w':function(W8w,O8w){return W8w==O8w;}
,'Z05':function(y05,K05){return y05>=K05;}
,'y5':function(K5,s5){return K5>s5;}
,'f15':function(t15,x15){return t15<x15;}
,'e7G':function(o7G,l7G){return o7G===l7G;}
,'c3E':function(R3E,W8E){return R3E-W8E;}
,'e0Z':function(o0Z,l0Z){return o0Z<=l0Z;}
,'G2E':function(z2E,e2E){return z2E>e2E;}
,'r5w':function(n5w,F5w){return n5w-F5w;}
,'W3a':function(O3a,M3a){return O3a<M3a;}
,'B1Z':function(L1Z,S1Z){return L1Z!=S1Z;}
,'D8E':function(Q8E,g8E){return Q8E-g8E;}
,'O35':function(M35,b35){return M35-b35;}
,'l4Z':function(j4Z,A4Z){return j4Z==A4Z;}
,'L1E':function(S1E,D1E){return S1E<D1E;}
,'K2h':function(s2h,I2h){return s2h*I2h;}
,'z3h':function(e3h,o3h){return e3h<o3h;}
,'s0a':function(I0a,T0a){return I0a>=T0a;}
,'K7Z':function(s7Z,I7Z){return s7Z/I7Z;}
,'q3y':function(Z3y,y3y){return Z3y>y3y;}
,'r59':function(n59,F59){return n59*F59;}
,'s3Z':function(I3Z,T3Z){return I3Z>T3Z;}
,'c4a':function(R4a,W7a){return R4a*W7a;}
,'z8w':function(e8w,o8w){return e8w>o8w;}
,'M4Z':function(b4Z,m4Z){return b4Z==m4Z;}
,'t5':function(x5,H5){return x5==H5;}
,'J55':function(c55,R55){return c55|R55;}
,'n7h':function(F7h,p7h){return F7h===p7h;}
,'r1a':function(n1a,F1a){return n1a*F1a;}
,'w0Y':function(V0Y,u0Y){return V0Y==u0Y;}
,'W7E':function(O7E,M7E){return O7E/M7E;}
,'r39':function(n39,F39){return n39-F39;}
,'m7a':function(h7a,C7a){return h7a==C7a;}
,'b15':function(m15,h15){return m15<h15;}
,'A35':function(d35,q35){return d35<q35;}
,'b3a':function(m3a,h3a){return m3a/h3a;}
,'m6h':function(h6h,C6h){return h6h<C6h;}
,'Q0G':function(g0G,f0G){return g0G/f0G;}
,'k8h':function(P8h,r8h){return P8h>r8h;}
,'j5y':function(A5y,d5y){return A5y>=d5y;}
,'F1h':function(p1h,U1h){return p1h-U1h;}
,'F4Z':function(p4Z,U4Z){return p4Z>U4Z;}
,'y1h':function(K1h,s1h){return K1h-s1h;}
,'k4h':function(P4h,r4h,n4h,F4h,p4h){return P4h/r4h/n4h/F4h/p4h;}
,'e5E':function(o5E,l5E){return o5E==l5E;}
,'k55':function(P55,r55){return P55==r55;}
,'P3G':function(r3G,n3G){return r3G<n3G;}
,'V9Z':function(u9Z,N9Z){return u9Z/N9Z;}
,'q38':function(Z38,y38){return Z38*y38;}
,'E5Z':function(Y5Z,G5Z){return Y5Z&G5Z;}
,'S1a':function(D1a,Q1a){return D1a in Q1a;}
,'j9G':function(A9G,d9G){return A9G/d9G;}
,'r7':function(n7,F7){return n7==F7;}
,'t95':function(x95,H95){return x95<H95;}
,'o9a':function(l9a,j9a){return l9a==j9a;}
,'e3y':function(o3y,l3y){return o3y!==l3y;}
,'i28':function(w28,V28){return w28!=V28;}
,'J4G':function(c4G,R4G){return c4G!==R4G;}
,'X6w':function(J6w,c6w){return J6w!=c6w;}
,'T1a':function(i1a,w1a){return i1a>w1a;}
,'z5':function(e5,o5){return e5==o5;}
,'e7y':function(o7y,l7y){return o7y<l7y;}
,'F1G':function(p1G,U1G){return p1G-U1G;}
,'d9H':1,'s59':function(I59,T59){return I59==T59;}
,'V2h':function(u2h,N2h){return u2h<N2h;}
,'M25':function(b25,m25){return b25!==m25;}
,'X0h':function(J0h,c0h){return J0h>c0h;}
,'y2w':function(K2w,s2w){return K2w-s2w;}
,'z3G':function(e3G,o3G){return e3G==o3G;}
,'c6Y':function(R6Y,W2Y){return R6Y==W2Y;}
,'d1y':function(q1y,Z1y){return q1y>=Z1y;}
,'E88':function(Y88,G88){return Y88*G88;}
,'T0w':function(i0w,w0w){return i0w<w0w;}
,'H09':function(E09,Y09){return E09==Y09;}
,'M1E':function(b1E,m1E){return b1E===m1E;}
,'Y0E':function(G0E,z0E){return G0E<z0E;}
,'k9Z':function(P9Z,r9Z){return P9Z<r9Z;}
,'R5':function(W6,O6){return W6/O6;}
,'F3H':function(p3H,U3H){return p3H>U3H;}
,'I1w':function(T1w,i1w){return T1w<i1w;}
,'t8a':function(x8a,H8a){return x8a>=H8a;}
,'h1w':function(C1w,k1w){return C1w<k1w;}
,'K5w':function(s5w,I5w){return s5w<I5w;}
,'L1G':function(S1G,D1G){return S1G===D1G;}
,'x85':function(H85,E85){return H85==E85;}
,'v1a':function(B1a,L1a){return B1a*L1a;}
,'m9w':function(h9w,C9w){return h9w<C9w;}
,'V6a':function(u6a,N6a){return u6a/N6a;}
,'O9Y':function(M9Y,b9Y){return M9Y-b9Y;}
,'u45':function(N45,X45,J45){return N45-X45-J45;}
,'M6y':function(b6y,m6y){return b6y-m6y;}
,'a3H':function(v3H,B3H){return v3H>=B3H;}
,'V3y':function(u3y,N3y){return u3y==N3y;}
,'w7Y':function(V7Y,u7Y){return V7Y&u7Y;}
,'V0w':function(u0w,N0w){return u0w/N0w;}
,'O8E':function(M8E,b8E){return M8E>b8E;}
,'Y1a':function(G1a,z1a){return G1a==z1a;}
,'I6':function(T6,i6){return T6/i6;}
,'W0E':function(O0E,M0E){return O0E<M0E;}
,'f45':function(t45,x45){return t45==x45;}
,'R6a':function(W2a,O2a){return W2a<O2a;}
,'u59':function(N59,X59){return N59==X59;}
,'m0Z':function(h0Z,C0Z){return h0Z>=C0Z;}
,'q7G':function(Z7G,y7G){return Z7G==y7G;}
,'j1a':function(A1a,d1a){return A1a>d1a;}
,'Q9':function(g9,f9){return g9===f9;}
,'h6y':function(C6y,k6y){return C6y<k6y;}
,'s7E':function(I7E,T7E){return I7E>=T7E;}
,'d1E':function(q1E,Z1E){return q1E<Z1E;}
,'C58':function(k58,P58){return k58<P58;}
,'C7':function(k7,P7){return k7==P7;}
,'E4a':function(Y4a,G4a){return Y4a!=G4a;}
,'i05':function(w05,V05){return w05>=V05;}
,'a2Z':function(v2Z,B2Z){return v2Z-B2Z;}
,'x38':function(H38,E38){return H38<E38;}
,'r7y':function(n7y,F7y){return n7y<F7y;}
,'G4Y':function(z4Y,e4Y){return z4Y<e4Y;}
,'z6Y':function(e6Y,o6Y){return e6Y===o6Y;}
,'W1a':function(O1a,M1a){return O1a*M1a;}
,'v2G':function(B2G,L2G){return B2G==L2G;}
,'f1Z':function(t1Z,x1Z){return t1Z>x1Z;}
,'k9Y':function(P9Y,r9Y){return P9Y>=r9Y;}
,'c15':function(R15,W45){return R15===W45;}
,'V9h':function(u9h,N9h){return u9h<N9h;}
,'N1w':function(X1w,J1w){return X1w*J1w;}
,'x5E':function(H5E,E5E){return H5E*E5E;}
,'q7y':function(Z7y,y7y){return Z7y<y7y;}
,'X5a':function(J5a,c5a){return J5a<c5a;}
,'q1':function(Z1,K1){return Z1<K1;}
,'I78':function(T78,i78){return T78>i78;}
,'O4G':function(M4G,b4G){return M4G/b4G;}
,'L4h':function(S4h,D4h){return S4h/D4h;}
,'I6Y':function(T6Y,i6Y){return T6Y<i6Y;}
,'N89':function(X89,J89){return X89==J89;}
,'Z0a':function(y0a,K0a){return y0a==K0a;}
,'W7y':function(O7y,M7y){return O7y>=M7y;}
,'j5E':function(A5E,d5E){return A5E!=d5E;}
,'C5w':function(k5w,P5w){return k5w==P5w;}
,'P6':function(r6,n6){return r6/n6;}
,'O8G':function(M8G,b8G){return M8G<b8G;}
,'k9a':function(P9a,r9a){return P9a*r9a;}
,'O2Y':function(M2Y,b2Y){return M2Y-b2Y;}
,'Z4E':function(y4E,K4E){return y4E==K4E;}
,'D3Z':function(Q3Z,g3Z){return Q3Z>g3Z;}
,'b5a':function(m5a,h5a){return m5a==h5a;}
,'K5E':function(s5E,I5E){return s5E>I5E;}
,'K2G':function(s2G,I2G){return s2G<I2G;}
,'d8w':function(q8w,Z8w){return q8w-Z8w;}
,'m3h':function(h3h,C3h){return h3h<C3h;}
,'t4a':function(x4a,H4a){return x4a===H4a;}
,'j9H':2,'a78':function(v78,B78){return v78==B78;}
,'d3H':function(q3H,Z3H){return q3H!=Z3H;}
,'U7h':function(a7h,v7h){return a7h===v7h;}
,'v7':function(B7,L7){return B7/L7;}
,'T65':function(i65,w65){return i65==w65;}
,'X85':function(J85,c85){return J85>=c85;}
,'L6Y':function(S6Y,D6Y){return S6Y/D6Y;}
,'e0E':function(o0E,l0E){return o0E>l0E;}
,'L5':function(S5,D5){return S5!=D5;}
,'A4':function(d4,q4){return d4>q4;}
,'O4':function(M4,b4){return M4-b4;}
,'h68':function(C68,k68){return C68*k68;}
,'q0y':function(Z0y,y0y){return Z0y/y0y;}
,'s25':function(I25,T25){return I25-T25;}
,'O0a':function(M0a,b0a){return M0a<b0a;}
,'V8':function(u8,N8){return u8*N8;}
,'Z18':function(y18,K18){return y18!==K18;}
,'a75':function(v75,B75){return v75===B75;}
,'V08':function(u08,N08){return u08>N08;}
,'U8E':function(a8E,v8E){return a8E<v8E;}
,'R6w':function(W2w,O2w){return W2w===O2w;}
,'b19':function(m19,h19){return m19<h19;}
,'s35':function(I35,T35){return I35 in T35;}
,'c5Z':function(R5Z,W6Z){return R5Z<W6Z;}
,'Y3w':function(G3w,z3w){return G3w-z3w;}
,'B4G':function(L4G,S4G){return L4G<S4G;}
,'b5E':function(m5E,h5E){return m5E/h5E;}
,'V58':function(u58,N58){return u58==N58;}
,'t29':function(x29,H29){return x29-H29;}
,'n35':function(F35,p35){return F35-p35;}
,'S7E':function(D7E,Q7E,g7E){return D7E-Q7E-g7E;}
,'f98':function(t98,x98){return t98===x98;}
,'w6':function(V6,u6){return V6/u6;}
,'d4w':function(q4w,Z4w){return q4w<Z4w;}
,'I2w':function(T2w,i2w){return T2w-i2w;}
,'F3Y':function(p3Y,U3Y,a3Y){return p3Y-U3Y-a3Y;}
,'H35':function(E35,Y35){return E35-Y35;}
,'R5E':function(W6E,O6E){return W6E==O6E;}
,'a8a':function(v8a,B8a){return v8a<=B8a;}
,'E2a':function(Y2a,G2a){return Y2a-G2a;}
,'T5Y':function(i5Y,w5Y){return i5Y<w5Y;}
,'V7y':function(u7y,N7y){return u7y!=N7y;}
,'p1a':function(U1a,a1a){return U1a in a1a;}
,'y6w':function(K6w,s6w,I6w){return K6w-s6w-I6w;}
,'s8G':function(I8G,T8G){return I8G==T8G;}
,'w6Y':function(V6Y,u6Y){return V6Y===u6Y;}
,'L0G':function(S0G,D0G){return S0G-D0G;}
,'H2Y':function(E2Y,Y2Y){return E2Y==Y2Y;}
,'F6Y':function(p6Y,U6Y){return p6Y==U6Y;}
,'E3h':function(Y3h,G3h){return Y3h>G3h;}
,'n75':function(F75,p75,U75){return F75-p75+U75;}
,'M29':function(b29,m29){return b29<m29;}
,'H4Y':function(E4Y,Y4Y){return E4Y/Y4Y;}
,'u4y':function(N4y,X4y){return N4y<=X4y;}
,'g0y':function(f0y,t0y){return f0y===t0y;}
,'J2E':function(c2E,R2E){return c2E/R2E;}
,'f4G':function(t4G,x4G){return t4G<x4G;}
,'O2E':function(M2E,b2E){return M2E<b2E;}
,'Q95':function(g95,f95){return g95>f95;}
,'w8Y':function(V8Y,u8Y){return V8Y>u8Y;}
,'m9Z':function(h9Z,C9Z){return h9Z<C9Z;}
,'y6':function(K6,s6){return K6*s6;}
,'J05':function(c05,R05){return c05==R05;}
,'c1G':function(R1G,W4G){return R1G/W4G;}
,'S05':function(D05,Q05){return D05>Q05;}
,'h89':function(C89,k89){return C89!==k89;}
,'e85':function(o85,l85){return o85!=l85;}
,'V1Z':function(u1Z,N1Z){return u1Z<N1Z;}
,'U55':function(a55,v55){return a55==v55;}
,'z0G':function(e0G,o0G){return e0G*o0G;}
,'J6h':function(c6h,R6h){return c6h==R6h;}
,'r9G':function(n9G,F9G){return n9G-F9G;}
,'P6E':function(r6E,n6E){return r6E==n6E;}
,'w95':function(V95,u95){return V95<u95;}
,'h0h':function(C0h,k0h){return C0h!=k0h;}
,'C59':function(k59,P59){return k59-P59;}
,'E9':function(Y9,G9,z9){return Y9*G9/z9;}
,'G05':function(z05,e05){return z05<e05;}
,'u6G':function(N6G,X6G){return N6G/X6G;}
,'K58':function(s58,I58){return s58===I58;}
,'C5a':function(k5a,P5a){return k5a==P5a;}
,'n6G':function(F6G,p6G){return F6G!=p6G;}
,'t1G':function(x1G,H1G){return x1G*H1G;}
,'Z7h':function(y7h,K7h){return y7h===K7h;}
,'w5G':function(V5G,u5G){return V5G==u5G;}
,'N2w':function(X2w,J2w,c2w){return X2w-J2w+c2w;}
,'a6E':function(v6E,B6E){return v6E<=B6E;}
,'u2y':function(N2y,X2y){return N2y<=X2y;}
,'J79':function(c79,R79){return c79<R79;}
,'E0Y':function(Y0Y,G0Y){return Y0Y<G0Y;}
,'m2E':function(h2E,C2E){return h2E>C2E;}
,'X39':function(J39,c39){return J39-c39;}
,'E1h':function(Y1h,G1h){return Y1h==G1h;}
,'F1':function(p1,U1){return p1/U1;}
,'K38':function(s38,I38){return s38!==I38;}
,'I8Z':function(T8Z,i8Z){return T8Z<i8Z;}
,'w2Z':function(V2Z,u2Z){return V2Z/u2Z;}
,'E6w':function(Y6w,G6w){return Y6w>G6w;}
,'G55':function(z55,e55){return z55==e55;}
,'R0h':function(W1h,O1h){return W1h<O1h;}
,'F1w':function(p1w,U1w){return p1w<U1w;}
,'G6h':function(z6h,e6h){return z6h/e6h;}
,'L49':function(S49,D49){return S49>=D49;}
,'B2E':function(L2E,S2E){return L2E!=S2E;}
,'z1':function(e1,o1){return e1<o1;}
,'K7G':function(s7G,I7G){return s7G==I7G;}
,'Q5G':function(g5G,f5G){return g5G<f5G;}
,'F1y':function(p1y,U1y){return p1y!==U1y;}
,'m0a':function(h0a,C0a){return h0a!=C0a;}
,'H0':function(E0,Y0,G0){return E0/Y0/G0;}
,'d5Z':function(q5Z,Z5Z){return q5Z>Z5Z;}
,'a5h':function(v5h,B5h){return v5h>=B5h;}
,'l88':function(j88,A88){return j88==A88;}
,'q3w':function(Z3w,y3w){return Z3w>y3w;}
,'A45':function(d45,q45){return d45-q45;}
,'M9':function(b9,m9){return b9==m9;}
,'b6a':function(m6a,h6a){return m6a<h6a;}
,'p48':function(U48,a48){return U48!==a48;}
,'J7h':function(c7h,R7h){return c7h<R7h;}
,'V0E':function(u0E,N0E){return u0E==N0E;}
,'r08':function(n08,F08){return n08===F08;}
,'N4w':function(X4w,J4w){return X4w===J4w;}
,'p5w':function(U5w,a5w){return U5w-a5w;}
,'d0G':function(q0G,Z0G,y0G){return q0G-Z0G+y0G;}
,'x3w':function(H3w,E3w){return H3w-E3w;}
,'G7w':function(z7w,e7w){return z7w-e7w;}
,'i2':function(V2,u2){return V2==u2;}
,'l8a':function(j8a,A8a){return j8a!==A8a;}
,'h0Y':function(C0Y,k0Y){return C0Y-k0Y;}
,'m9a':function(h9a,C9a){return h9a==C9a;}
,'G9y':function(z9y,e9y){return z9y==e9y;}
,'W7G':function(O7G,M7G){return O7G<M7G;}
,'t9':function(x9,H9){return x9==H9;}
,'y0Y':function(K0Y,s0Y){return K0Y-s0Y;}
,'A55':function(d55,q55){return d55|q55;}
,'K08':function(s08,I08){return s08!==I08;}
,'w2a':function(V2a,u2a){return V2a/u2a;}
,'B6G':function(L6G,S6G){return L6G*S6G;}
,'O4y':function(M4y,b4y){return M4y>=b4y;}
,'z3H':function(e3H,o3H){return e3H!==o3H;}
,'W48':function(O48,M48){return O48!=M48;}
,'U7a':function(a7a,v7a){return a7a==v7a;}
,'U7w':function(a7w,v7w){return a7w==v7w;}
,'U0a':function(a0a,v0a){return a0a==v0a;}
,'U1Y':function(a1Y,v1Y){return a1Y-v1Y;}
,'V5Y':function(u5Y,N5Y){return u5Y-N5Y;}
,'e38':function(o38,l38){return o38*l38;}
,'A6G':function(d6G,q6G){return d6G==q6G;}
,'d1G':function(q1G,Z1G){return q1G/Z1G;}
,'W15':function(O15,M15){return O15<M15;}
,'C7G':function(k7G,P7G){return k7G==P7G;}
,'N8Y':function(X8Y,J8Y){return X8Y>J8Y;}
,'t7Y':function(x7Y,H7Y){return x7Y/H7Y;}
,'z9E':function(e9E,o9E){return e9E>o9E;}
,'C2G':function(k2G,P2G){return k2G/P2G;}
,'H4y':function(E4y,Y4y){return E4y===Y4y;}
,'R9':function(W5,O5){return W5-O5;}
,'t5Z':function(x5Z,H5Z){return x5Z>=H5Z;}
,'T8':function(i8,w8){return i8!=w8;}
,'Y5Y':function(G5Y,z5Y){return G5Y==z5Y;}
,'n1Y':function(F1Y,p1Y){return F1Y>p1Y;}
,'B6h':function(L6h,S6h){return L6h>=S6h;}
,'f2E':function(t2E,x2E){return t2E-x2E;}
,'D45':function(Q45,g45){return Q45==g45;}
,'L8Y':function(S8Y,D8Y){return S8Y>D8Y;}
,'a5Z':function(v5Z,B5Z){return v5Z&B5Z;}
,'U4h':function(a4h,v4h,B4h){return a4h*v4h/B4h;}
,'b0y':function(m0y,h0y){return m0y<h0y;}
,'Z4y':function(y4y,K4y){return y4y-K4y;}
,'V39':function(u39,N39){return u39>=N39;}
,'p0y':function(U0y,a0y){return U0y===a0y;}
,'Z9w':function(y9w,K9w){return y9w*K9w;}
,'C7y':function(k7y,P7y){return k7y>P7y;}
,'U9w':function(a9w,v9w){return a9w<=v9w;}
,'e69':function(o69,l69){return o69-l69;}
,'P0G':function(r0G,n0G){return r0G==n0G;}
,'S5a':function(D5a,Q5a){return D5a==Q5a;}
,'N5':function(X5,J5,c5){return X5*J5/c5;}
,'p7G':function(U7G,a7G){return U7G-a7G;}
,'I49':function(T49,i49){return T49-i49;}
,'d6y':function(q6y,Z6y){return q6y>Z6y;}
,'d6':function(q6,Z6){return q6==Z6;}
,'X7':function(J7,c7){return J7<c7;}
,'g3a':function(f3a,t3a){return f3a-t3a;}
,'C3y':function(k3y,P3y){return k3y-P3y;}
,'S3w':function(D3w,Q3w){return D3w<=Q3w;}
,'t9E':function(x9E,H9E){return x9E>H9E;}
,'A79':function(d79,q79){return d79<q79;}
,'s79':function(I79,T79){return I79-T79;}
,'Q8Y':function(g8Y,f8Y){return g8Y==f8Y;}
,'D9Y':function(Q9Y,g9Y){return Q9Y!==g9Y;}
,'H99':function(E99,Y99){return E99<=Y99;}
,'t5h':function(x5h,H5h){return x5h<H5h;}
,'O09':function(M09,b09){return M09!=b09;}
,'l8w':function(j8w,A8w){return j8w-A8w;}
,'B8h':function(L8h,S8h){return L8h<=S8h;}
,'b7Z':function(m7Z,h7Z,C7Z){return m7Z-h7Z+C7Z;}
,'N78':function(X78,J78){return X78-J78;}
,'A7w':function(d7w,q7w){return d7w-q7w;}
,'R5Y':function(W6Y,O6Y){return W6Y/O6Y;}
,'i99':function(w99,V99){return w99-V99;}
,'P3H':function(r3H,n3H){return r3H<=n3H;}
,'n9y':function(F9y,p9y){return F9y!=p9y;}
,'f6Z':function(t6Z,x6Z){return t6Z-x6Z;}
,'y78':function(K78,s78){return K78-s78;}
,'t68':function(x68,H68){return x68!==H68;}
,'u3Z':function(N3Z,X3Z){return N3Z<=X3Z;}
,'o6G':function(l6G,j6G){return l6G>j6G;}
,'G99':function(z99,e99){return z99==e99;}
,'K3Y':function(s3Y,I3Y){return s3Y===I3Y;}
,'n9Z':function(F9Z,p9Z){return F9Z-p9Z;}
,'C4Y':function(k4Y,P4Y){return k4Y-P4Y;}
,'x59':function(H59,E59,Y59){return H59-E59+Y59;}
,'h95':function(C95,k95){return C95<=k95;}
,'k7w':function(P7w,r7w){return P7w==r7w;}
,'W65':function(O65,M65){return O65==M65;}
,'B2Y':function(L2Y,S2Y){return L2Y>S2Y;}
,'M6E':function(b6E,m6E){return b6E===m6E;}
,'h4Z':function(C4Z,k4Z){return C4Z<k4Z;}
,'h5Z':function(C5Z,k5Z){return C5Z>=k5Z;}
,'x19':function(H19,E19){return H19<E19;}
,'G09':function(z09,e09){return z09!=e09;}
,'Q5Z':function(g5Z,f5Z){return g5Z&f5Z;}
,'E6y':function(Y6y,G6y){return Y6y==G6y;}
,'z2a':function(e2a,o2a){return e2a>=o2a;}
,'l3G':function(j3G,A3G){return j3G<A3G;}
,'x0y':function(H0y,E0y){return H0y/E0y;}
,'P88':function(r88,n88){return r88<n88;}
,'f1Y':function(t1Y,x1Y){return t1Y>x1Y;}
,'L75':function(S75,D75){return S75==D75;}
,'I88':function(T88,i88){return T88<i88;}
,'r58':function(n58,F58){return n58>F58;}
,'i09':function(w09,V09){return w09<V09;}
,'B3':function(L3,S3){return L3<S3;}
,'n99':function(F99,p99){return F99==p99;}
,'I4h':function(T4h,i4h){return T4h<i4h;}
,'C2h':function(k2h,P2h){return k2h/P2h;}
,'s9Y':function(I9Y,T9Y){return I9Y-T9Y;}
,'S39':function(D39,Q39){return D39>Q39;}
,'a1G':function(v1G,B1G){return v1G/B1G;}
,'t8w':function(x8w,H8w){return x8w*H8w;}
,'C9h':function(k9h,P9h){return k9h===P9h;}
,'O3h':function(M3h,b3h){return M3h<b3h;}
,'N29':function(X29,J29){return X29<J29;}
,'y9E':function(K9E,s9E){return K9E>s9E;}
,'i7w':function(w7w,V7w){return w7w==V7w;}
,'H8G':function(E8G,Y8G){return E8G*Y8G;}
,'o4y':function(l4y,j4y){return l4y==j4y;}
,'z2':function(e2,o2){return e2<=o2;}
,'l49':function(j49,A49){return j49*A49;}
,'G7E':function(z7E,e7E){return z7E!=e7E;}
,'D2y':function(Q2y,g2y){return Q2y!==g2y;}
,'V6w':function(u6w,N6w){return u6w-N6w;}
,'D1Z':function(Q1Z,g1Z){return Q1Z>g1Z;}
,'c6y':function(R6y,W2y){return R6y*W2y;}
,'P3E':function(r3E,n3E){return r3E!=n3E;}
,'F95':function(p95,U95){return p95!=U95;}
,'C48':function(k48,P48){return k48==P48;}
,'u8G':function(N8G,X8G){return N8G>X8G;}
,'w1E':function(V1E,u1E){return V1E<=u1E;}
,'h88':function(C88,k88){return C88>k88;}
,'y2Z':function(K2Z,s2Z){return K2Z!==s2Z;}
,'M3G':function(b3G,m3G){return b3G<m3G;}
,'P8y':function(r8y,n8y){return r8y<n8y;}
,'L8Z':function(S8Z,D8Z){return S8Z<=D8Z;}
,'F4a':function(p4a,U4a){return p4a==U4a;}
,'S5y':function(D5y,Q5y){return D5y-Q5y;}
,'K9':function(s9,I9){return s9==I9;}
,'H28':function(E28,Y28){return E28-Y28;}
,'m55':function(h55,C55){return h55==C55;}
,'k6G':function(P6G,r6G){return P6G==r6G;}
,'B9a':function(L9a,S9a){return L9a<=S9a;}
,'u9a':function(N9a,X9a){return N9a*X9a;}
,'r2h':function(n2h,F2h){return n2h/F2h;}
,'c7Y':function(R7Y,W3Z){return R7Y&W3Z;}
,'V7G':function(u7G,N7G){return u7G-N7G;}
,'Y48':function(G48,z48){return G48-z48;}
,'R19':function(W49,O49){return W49<O49;}
,'m98':function(h98,C98){return h98*C98;}
,'x05':function(H05,E05,Y05){return H05-E05-Y05;}
,'P0Y':function(r0Y,n0Y){return r0Y<n0Y;}
,'l8y':function(j8y,A8y){return j8y-A8y;}
,'U6G':function(a6G,v6G){return a6G<=v6G;}
,'B45':function(L45,S45){return L45-S45;}
,'f55':function(t55,x55){return t55<x55;}
,'C0E':function(k0E,P0E){return k0E>P0E;}
,'U7Z':function(a7Z,v7Z){return a7Z/v7Z;}
,'w68':function(V68,u68){return V68!==u68;}
,'Y2G':function(G2G,z2G){return G2G-z2G;}
,'v48':function(B48,L48){return B48!=L48;}
,'b1a':function(m1a,h1a){return m1a in h1a;}
,'q39':function(Z39,y39){return Z39 in y39;}
,'P4a':function(r4a,n4a){return r4a==n4a;}
,'c5h':function(R5h,W6h){return R5h==W6h;}
,'R0w':function(W1w,O1w){return W1w-O1w;}
,'T7Z':function(i7Z,w7Z){return i7Z<=w7Z;}
,'q5a':function(Z5a,y5a){return Z5a/y5a;}
,'g2G':function(f2G,t2G){return f2G==t2G;}
,'Q6':function(g6,f6){return g6==f6;}
,'n6Z':function(F6Z,p6Z){return F6Z<=p6Z;}
,'x65':function(H65,E65){return H65==E65;}
,'K69':function(s69,I69){return s69-I69;}
,'D28':function(Q28,g28){return Q28!==g28;}
,'k2y':function(P2y,r2y){return P2y==r2y;}
,'z2Z':function(e2Z,o2Z){return e2Z>=o2Z;}
,'O6h':function(M6h,b6h){return M6h-b6h;}
,'o45':function(l45,j45){return l45>j45;}
,'C05':function(k05,P05){return k05-P05;}
,'o7h':function(l7h,j7h){return l7h<j7h;}
,'z1y':function(e1y,o1y){return e1y>=o1y;}
,'D2E':function(Q2E,g2E){return Q2E<=g2E;}
,'j3a':function(A3a,d3a){return A3a/d3a;}
,'k3h':function(P3h,r3h,n3h){return P3h*r3h/n3h;}
,'O3Z':function(M3Z,b3Z){return M3Z<=b3Z;}
,'T38':function(i38,w38){return i38!==w38;}
,'P95':function(r95,n95){return r95<n95;}
,'N8w':function(X8w,J8w){return X8w!=J8w;}
,'Y85':function(G85,z85){return G85!=z85;}
,'M1w':function(b1w,m1w){return b1w<m1w;}
,'W19':function(O19,M19){return O19>M19;}
,'p39':function(U39,a39){return U39-a39;}
,'e3Y':function(o3Y,l3Y){return o3Y===l3Y;}
,'C7Y':function(k7Y,P7Y){return k7Y-P7Y;}
,'z4w':function(e4w,o4w){return e4w*o4w;}
,'r38':function(n38,F38){return n38<F38;}
,'B7w':function(L7w,S7w){return L7w-S7w;}
,'v2h':function(B2h,L2h){return B2h==L2h;}
,'I2a':function(T2a,i2a){return T2a<=i2a;}
,'I8a':function(T8a,i8a){return T8a-i8a;}
,'h2Z':function(C2Z,k2Z){return C2Z>k2Z;}
,'n3':function(F3,p3){return F3<p3;}
,'k3Z':function(P3Z,r3Z){return P3Z>=r3Z;}
,'p05':function(U05,a05){return U05<a05;}
,'N6y':function(X6y,J6y){return X6y==J6y;}
,'b3w':function(m3w,h3w){return m3w>=h3w;}
,'L6w':function(S6w,D6w){return S6w>D6w;}
,'H18':function(E18,Y18){return E18<Y18;}
,'v0w':function(B0w,L0w){return B0w/L0w;}
,'m99':function(h99,C99){return h99/C99;}
,'t3E':function(x3E,H3E){return x3E-H3E;}
,'l2':function(j2,A2){return j2==A2;}
,'a1w':function(v1w,B1w){return v1w>=B1w;}
,'Z2Y':function(y2Y,K2Y){return y2Y==K2Y;}
,'g5Y':function(f5Y,t5Y){return f5Y>t5Y;}
,'G7Z':function(z7Z,e7Z){return z7Z-e7Z;}
,'Y5w':function(G5w,z5w){return G5w<z5w;}
,'Y38':function(G38,z38){return G38*z38;}
,'t5G':function(x5G,H5G){return x5G/H5G;}
,'d8y':function(q8y,Z8y){return q8y-Z8y;}
,'H9Y':function(E9Y,Y9Y){return E9Y<Y9Y;}
,'b8Z':function(m8Z,h8Z){return m8Z!=h8Z;}
,'e0y':function(o0y,l0y){return o0y/l0y;}
,'k2Y':function(P2Y,r2Y){return P2Y-r2Y;}
,'z6':function(e6,o6){return e6/o6;}
,'I5h':function(T5h,i5h){return T5h-i5h;}
,'M8y':function(b8y,m8y){return b8y*m8y;}
,'s7w':function(I7w,T7w){return I7w-T7w;}
,'O6Z':function(M6Z,b6Z){return M6Z-b6Z;}
,'p4Y':function(U4Y,a4Y){return U4Y===a4Y;}
,'e1a':function(o1a,l1a){return o1a==l1a;}
,'U2':function(a2,v2){return a2<v2;}
,'M2w':function(b2w,m2w){return b2w/m2w;}
,'u28':function(N28,X28){return N28<X28;}
,'w9E':function(V9E,u9E){return V9E-u9E;}
,'A9Z':function(d9Z,q9Z){return d9Z-q9Z;}
,'K85':function(s85,I85){return s85===I85;}
,'L3G':function(S3G,D3G){return S3G<D3G;}
,'Z25':function(y25,K25){return y25/K25;}
,'J0':function(c0,R0){return c0*R0;}
,'L3E':function(S3E,D3E){return S3E*D3E;}
,'w2w':function(V2w,u2w){return V2w-u2w;}
,'h4a':function(C4a,k4a){return C4a==k4a;}
,'u0':function(N0,X0){return N0*X0;}
,'z68':function(e68,o68){return e68>=o68;}
,'y2a':function(K2a,s2a){return K2a==s2a;}
,'f6h':function(t6h,x6h){return t6h-x6h;}
,'P8Y':function(r8Y,n8Y){return r8Y*n8Y;}
,'r6a':function(n6a,F6a){return n6a/F6a;}
,'V1a':function(u1a,N1a){return u1a in N1a;}
,'F0G':function(p0G,U0G){return p0G-U0G;}
,'G7h':function(z7h,e7h){return z7h==e7h;}
,'g08':function(f08,t08){return f08==t08;}
,'d1w':function(q1w,Z1w){return q1w-Z1w;}
,'j65':function(A65,d65){return A65<d65;}
,'d2Z':function(q2Z,Z2Z){return q2Z==Z2Z;}
,'E8a':function(Y8a,G8a){return Y8a<=G8a;}
,'P5G':function(r5G,n5G){return r5G==n5G;}
,'S7G':function(D7G,Q7G){return D7G/Q7G;}
,'D6Z':function(Q6Z,g6Z){return Q6Z/g6Z;}
,'D9w':function(Q9w,g9w){return Q9w===g9w;}
,'B7Z':function(L7Z,S7Z){return L7Z-S7Z;}
,'G3Z':function(z3Z,e3Z){return z3Z-e3Z;}
,'L68':function(S68,D68){return S68>D68;}
,'D0a':function(Q0a,g0a){return Q0a*g0a;}
,'W2G':function(O2G,M2G){return O2G<M2G;}
,'d88':function(q88,Z88){return q88===Z88;}
,'V85':function(u85,N85){return u85===N85;}
,'X5Y':function(J5Y,c5Y){return J5Y<c5Y;}
,'R65':function(W25,O25){return W25*O25;}
,'r9h':function(n9h,F9h){return n9h===F9h;}
,'X7G':function(J7G,c7G){return J7G-c7G;}
,'J3Z':function(c3Z,R3Z){return c3Z-R3Z;}
,'d7Y':function(q7Y,Z7Y){return q7Y==Z7Y;}
,'W85':function(O85,M85){return O85<M85;}
,'k4y':function(P4y,r4y){return P4y>=r4y;}
,'H9a':function(E9a,Y9a){return E9a<Y9a;}
,'s55':function(I55,T55){return I55|T55;}
,'t6y':function(x6y,H6y){return x6y==H6y;}
,'Q1h':function(g1h,f1h){return g1h==f1h;}
,'T8E':function(i8E,w8E){return i8E/w8E;}
,'W8':function(O8,M8){return O8==M8;}
,'k75':function(P75,r75){return P75==r75;}
,'k79':function(P79,r79){return P79<r79;}
,'l5G':function(j5G,A5G){return j5G==A5G;}
,'l6w':function(j6w,A6w){return j6w<A6w;}
,'L95':function(S95,D95){return S95!=D95;}
,'T0E':function(i0E,w0E){return i0E<=w0E;}
,'v3w':function(B3w,L3w){return B3w>=L3w;}
,'y0h':function(K0h,s0h){return K0h-s0h;}
,'z7Y':function(e7Y,o7Y){return e7Y==o7Y;}
,'g3w':function(f3w,t3w){return f3w>t3w;}
,'C1a':function(k1a,P1a){return k1a!==P1a;}
,'Z09':function(y09,K09){return y09<K09;}
,'a6':function(v6,B6){return v6==B6;}
,'O79':function(M79,b79){return M79>b79;}
,'h3E':function(C3E,k3E){return C3E&k3E;}
,'R8E':function(W9E,O9E){return W9E-O9E;}
,'A9a':function(d9a,q9a){return d9a-q9a;}
,'o59':function(l59,j59){return l59==j59;}
,'T08':function(i08,w08){return i08-w08;}
,'x3Y':function(H3Y,E3Y){return H3Y==E3Y;}
,'Q5':function(g5,f5){return g5*f5;}
,'L4w':function(S4w,D4w){return S4w/D4w;}
,'Q1w':function(g1w,f1w,t1w){return g1w-f1w+t1w;}
,'o7a':function(l7a,j7a){return l7a<=j7a;}
,'J4y':function(c4y,R4y){return c4y>R4y;}
,'m7h':function(h7h,C7h){return h7h<C7h;}
,'Q4w':function(g4w,f4w){return g4w-f4w;}
,'B15':function(L15,S15){return L15/S15;}
,'l1y':function(j1y,A1y){return j1y/A1y;}
,'J99':function(c99,R99){return c99>R99;}
,'m3':function(h3,C3){return h3==C3;}
,'J4Y':function(c4Y,R4Y){return c4Y-R4Y;}
,'H15':function(E15,Y15){return E15<Y15;}
,'g6a':function(f6a,t6a){return f6a<=t6a;}
,'E4w':function(Y4w,G4w){return Y4w<G4w;}
,'e48':function(o48,l48){return o48>=l48;}
,'J09':function(c09,R09){return c09<R09;}
,'f8G':function(t8G,x8G){return t8G/x8G;}
,'m2Y':function(h2Y,C2Y){return h2Y-C2Y;}
,'R7y':function(W3H,O3H){return W3H-O3H;}
,'U6h':function(a6h,v6h){return a6h>=v6h;}
,'k9w':function(P9w,r9w){return P9w>=r9w;}
,'b08':function(m08,h08){return m08<h08;}
,'O9w':function(M9w,b9w){return M9w-b9w;}
,'v5Y':function(B5Y,L5Y){return B5Y>L5Y;}
,'I7Y':function(T7Y,i7Y){return T7Y>=i7Y;}
,'L1w':function(S1w,D1w){return S1w/D1w;}
,'v5E':function(B5E,L5E){return B5E!==L5E;}
,'N5Z':function(X5Z,J5Z){return X5Z<J5Z;}
,'o09':function(l09,j09){return l09-j09;}
,'Y39':function(G39,z39){return G39/z39;}
,'M2a':function(b2a,m2a){return b2a>m2a;}
,'n8h':function(F8h,p8h){return F8h/p8h;}
,'e8':function(o8,l8){return o8-l8;}
,'l8Z':function(j8Z,A8Z){return j8Z/A8Z;}
,'N1y':function(X1y,J1y){return X1y>=J1y;}
,'p7y':function(U7y,a7y){return U7y>a7y;}
,'c5G':function(R5G,W6G){return R5G/W6G;}
,'v08':function(B08,L08){return B08==L08;}
,'X69':function(J69,c69){return J69==c69;}
,'q5w':function(Z5w,y5w){return Z5w==y5w;}
,'s1':function(I1,T1){return I1*T1;}
,'C5Y':function(k5Y,P5Y){return k5Y<P5Y;}
,'w49':function(V49,u49){return V49<u49;}
,'M49':function(b49,m49){return b49==m49;}
,'z0h':function(e0h,o0h){return e0h==o0h;}
,'c2a':function(R2a,W0a){return R2a==W0a;}
,'i9Y':function(w9Y,V9Y){return w9Y!==V9Y;}
,'Y2h':function(G2h,z2h){return G2h==z2h;}
,'e5a':function(o5a,l5a){return o5a/l5a;}
,'v05':function(B05,L05){return B05<L05;}
,'D8h':function(Q8h,g8h){return Q8h/g8h;}
,'w89':function(V89,u89){return V89==u89;}
,'l9E':function(j9E,A9E){return j9E<A9E;}
,'G2Y':function(z2Y,e2Y){return z2Y<e2Y;}
,'a2w':function(v2w,B2w){return v2w>B2w;}
,'Z59':function(y59,K59){return y59==K59;}
,'D6h':function(Q6h,g6h){return Q6h<g6h;}
,'r19':function(n19,F19){return n19==F19;}
,'i3':function(w3,V3){return w3<V3;}
,'S7y':function(D7y,Q7y){return D7y<Q7y;}
,'C85':function(k85,P85){return k85 in P85;}
,'z5G':function(e5G,o5G){return e5G==o5G;}
,'I2Z':function(T2Z,i2Z){return T2Z==i2Z;}
,'t6':function(x6,H6){return x6>H6;}
,'r5E':function(n5E,F5E){return n5E/F5E;}
,'p0Z':function(U0Z,a0Z){return U0Z<=a0Z;}
,'y68':function(K68,s68){return K68<s68;}
,'S85':function(D85,Q85){return D85==Q85;}
,'I3h':function(T3h,i3h){return T3h-i3h;}
,'v69':function(B69,L69){return B69<L69;}
,'m7w':function(h7w,C7w){return h7w<C7w;}
,'g38':function(f38,t38){return f38<t38;}
,'x5y':function(H5y,E5y){return H5y-E5y;}
,'t3G':function(x3G,H3G){return x3G>H3G;}
,'a8y':function(v8y,B8y){return v8y*B8y;}
,'G3':function(z3,e3){return z3<e3;}
,'Q18':function(g18,f18,t18,x18){return g18-f18+t18-x18;}
,'i4G':function(w4G,V4G){return w4G-V4G;}
,'R7Z':function(W3E,O3E){return W3E&O3E;}
,'W59':function(O59,M59){return O59/M59;}
,'F3h':function(p3h,U3h){return p3h*U3h;}
,'n09':function(F09,p09){return F09*p09;}
,'S4Y':function(D4Y,Q4Y){return D4Y*Q4Y;}
,'m1Z':function(h1Z,C1Z){return h1Z*C1Z;}
,'D7w':function(Q7w,g7w){return Q7w-g7w;}
,'H9y':function(E9y,Y9y){return E9y==Y9y;}
,'W08':function(O08,M08){return O08==M08;}
,'z49':function(e49,o49){return e49==o49;}
,'s6h':function(I6h,T6h){return I6h>T6h;}
,'Q7Y':function(g7Y,f7Y){return g7Y/f7Y;}
,'d3G':function(q3G,Z3G){return q3G<Z3G;}
,'i4Y':function(w4Y,V4Y){return w4Y-V4Y;}
,'d6E':function(q6E,Z6E){return q6E===Z6E;}
,'h1E':function(C1E,k1E){return C1E<k1E;}
,'S0Z':function(D0Z,Q0Z){return D0Z<Q0Z;}
,'C7E':function(k7E,P7E){return k7E-P7E;}
,'n9w':function(F9w,p9w){return F9w-p9w;}
,'X2h':function(J2h,c2h){return J2h<=c2h;}
,'j3Y':function(A3Y,d3Y){return A3Y-d3Y;}
,'s4y':function(I4y,T4y){return I4y<T4y;}
,'Z35':function(y35,K35){return y35/K35;}
,'z78':function(e78,o78){return e78!=o78;}
,'Y58':function(G58,z58){return G58*z58;}
,'B79':function(L79,S79){return L79>S79;}
,'a4w':function(v4w,B4w){return v4w*B4w;}
,'Y0Z':function(G0Z,z0Z){return G0Z-z0Z;}
,'F8w':function(p8w,U8w){return p8w/U8w;}
,'a0h':function(v0h,B0h){return v0h==B0h;}
,'x08':function(H08,E08){return H08!==E08;}
,'y8Z':function(K8Z,s8Z){return K8Z==s8Z;}
,'I95':function(T95,i95){return T95<i95;}
,'z0':function(e0,o0){return e0/o0;}
,'b5w':function(m5w,h5w){return m5w==h5w;}
,'n9Y':function(F9Y,p9Y){return F9Y<p9Y;}
,'w3G':function(V3G,u3G){return V3G-u3G;}
,'j38':function(A38,d38){return A38*d38;}
,'X7y':function(J7y,c7y){return J7y==c7y;}
,'M4a':function(b4a,m4a){return b4a==m4a;}
,'e9':function(o9,l9){return o9/l9;}
,'B9Z':function(L9Z,S9Z){return L9Z>=S9Z;}
,'t0G':function(x0G,H0G){return x0G-H0G;}
,'f6G':function(t6G,x6G){return t6G==x6G;}
,'R6Z':function(W2Z,O2Z){return W2Z/O2Z;}
,'R8':function(W9,O9){return W9<O9;}
,'d8a':function(q8a,Z8a){return q8a==Z8a;}
,'B9Y':function(L9Y,S9Y){return L9Y!==S9Y;}
,'v0E':function(B0E,L0E){return B0E>L0E;}
,'U2E':function(a2E,v2E){return a2E!=v2E;}
,'h1y':function(C1y,k1y){return C1y<k1y;}
,'S6a':function(D6a,Q6a){return D6a>Q6a;}
,'b7':function(m7,h7){return m7===h7;}
,'U25':function(a25,v25){return a25==v25;}
,'M8Y':function(b8Y,m8Y){return b8Y==m8Y;}
,'i1':function(w1,V1){return w1!==V1;}
,'u9w':function(N9w,X9w){return N9w-X9w;}
,'R3Y':function(W8Y,O8Y){return W8Y==O8Y;}
,'n4':function(F4,p4){return F4/p4;}
,'C39':function(k39,P39){return k39-P39;}
,'S7':function(D7,Q7){return D7<Q7;}
,'f9y':function(t9y,x9y){return t9y==x9y;}
,'Q4Z':function(g4Z,f4Z){return g4Z/f4Z;}
,'T85':function(i85,w85){return i85%w85;}
,'G1Z':function(z1Z,e1Z){return z1Z===e1Z;}
,'b85':function(m85,h85){return m85*h85;}
,'P1':function(r1,n1){return r1<n1;}
,'W9G':function(O9G,M9G){return O9G/M9G;}
,'i18':function(w18,V18){return w18/V18;}
,'l2Z':function(j2Z,A2Z){return j2Z<=A2Z;}
,'z75':function(e75,o75){return e75>=o75;}
,'J9Y':function(c9Y,R9Y){return c9Y>=R9Y;}
,'w1h':function(V1h,u1h){return V1h-u1h;}
,'f7w':function(t7w,x7w){return t7w<x7w;}
,'j48':function(A48,d48){return A48-d48;}
,'h8y':function(C8y,k8y){return C8y>k8y;}
,'I8Y':function(T8Y,i8Y){return T8Y*i8Y;}
,'x7':function(H7,E7){return H7-E7;}
,'G25':function(z25,e25){return z25-e25;}
,'B98':function(L98,S98){return L98-S98;}
,'V19':function(u19,N19){return u19*N19;}
,'U98':function(a98,v98){return a98-v98;}
,'w3E':function(V3E,u3E){return V3E<u3E;}
,'E8Z':function(Y8Z,G8Z){return Y8Z/G8Z;}
,'q69':function(Z69,y69){return Z69>y69;}
,'c2Y':function(R2Y,W0Y){return R2Y<=W0Y;}
,'G4y':function(z4y,e4y){return z4y<e4y;}
,'s7a':function(I7a,T7a){return I7a/T7a;}
,'N75':function(X75,J75){return X75<J75;}
,'u9y':function(N9y,X9y){return N9y==X9y;}
,'B25':function(L25,S25){return L25<S25;}
,'t6w':function(x6w,H6w){return x6w<H6w;}
,'g69':function(f69,t69){return f69==t69;}
,'l9H':3,'E89':function(Y89,G89){return Y89==G89;}
,'E3G':function(Y3G,G3G){return Y3G<=G3G;}
,'P1h':function(r1h,n1h){return r1h==n1h;}
,'h1h':function(C1h,k1h){return C1h-k1h;}
,'u8h':function(N8h,X8h){return N8h===X8h;}
,'l4a':function(j4a,A4a){return j4a!=A4a;}
,'y7Y':function(K7Y,s7Y){return K7Y&s7Y;}
,'E5':function(Y5,G5){return Y5<G5;}
,'G8G':function(z8G,e8G){return z8G*e8G;}
,'p6a':function(U6a,a6a){return U6a<a6a;}
,'q5E':function(Z5E,y5E){return Z5E<=y5E;}
,'e7':function(o7,l7){return o7/l7;}
,'E6E':function(Y6E,G6E){return Y6E*G6E;}
,'o99':function(l99,j99){return l99==j99;}
,'F29':function(p29,U29){return p29/U29;}
,'N4Z':function(X4Z,J4Z,c4Z,R4Z){return X4Z-J4Z+c4Z+R4Z;}
,'x1w':function(H1w,E1w){return H1w==E1w;}
,'P6Y':function(r6Y,n6Y){return r6Y*n6Y;}
,'K48':function(s48,I48){return s48<=I48;}
,'F6':function(p6,U6){return p6==U6;}
,'m4h':function(h4h,C4h){return h4h-C4h;}
,'R0G':function(W1G,O1G){return W1G!=O1G;}
,'B8G':function(L8G,S8G){return L8G*S8G;}
,'J':function(R,W3){return R==W3;}
,'U8h':function(a8h,v8h){return a8h<v8h;}
,'Q4a':function(g4a,f4a){return g4a<f4a;}
,'E5h':function(Y5h,G5h){return Y5h>G5h;}
,'T2h':function(i2h,w2h){return i2h-w2h;}
,'m8G':function(h8G,C8G){return h8G<C8G;}
,'G45':function(z45,e45){return z45*e45;}
,'O99':function(M99,b99){return M99-b99;}
,'b2h':function(m2h,h2h){return m2h==h2h;}
,'l2w':function(j2w,A2w){return j2w!=A2w;}
,'P0h':function(r0h,n0h){return r0h!=n0h;}
,'H9w':function(E9w,Y9w){return E9w-Y9w;}
,'j0w':function(A0w,d0w){return A0w===d0w;}
,'f9a':function(t9a,x9a){return t9a-x9a;}
,'c6':function(R6,W2){return R6!==W2;}
,'w5Z':function(V5Z,u5Z){return V5Z-u5Z;}
,'g85':function(f85,t85){return f85<t85;}
,'B9y':function(L9y,S9y){return L9y!=S9y;}
,'L5G':function(S5G,D5G){return S5G<D5G;}
,'d4Z':function(q4Z,Z4Z,y4Z){return q4Z-Z4Z+y4Z;}
,'R39':function(W89,O89){return W89>=O89;}
,'h5':function(C5,k5){return C5==k5;}
,'t2w':function(x2w,H2w){return x2w/H2w;}
,'d5h':function(q5h,Z5h){return q5h-Z5h;}
,'V5a':function(u5a,N5a){return u5a<N5a;}
,'X1Z':function(J1Z,c1Z){return J1Z==c1Z;}
,'k98':function(P98,r98){return P98*r98;}
,'u15':function(N15,X15,J15){return N15-X15+J15;}
,'Q4h':function(g4h,f4h){return g4h<f4h;}
,'t88':function(x88,H88){return x88==H88;}
,'F9E':function(p9E,U9E){return p9E<U9E;}
,'G28':function(z28,e28){return z28<e28;}
,'H25':function(E25,Y25){return E25-Y25;}
,'M9E':function(b9E,m9E){return b9E*m9E;}
,'P89':function(r89,n89){return r89-n89;}
,'I8y':function(T8y,i8y){return T8y-i8y;}
,'l3E':function(j3E,A3E){return j3E<A3E;}
,'p3y':function(U3y,a3y){return U3y-a3y;}
,'E29':function(Y29,G29){return Y29==G29;}
,'Q0':function(g0,f0){return g0==f0;}
,'K0y':function(s0y,I0y){return s0y<I0y;}
,'K8E':function(s8E,I8E){return s8E/I8E;}
,'L8a':function(S8a,D8a){return S8a>=D8a;}
,'j8E':function(A8E,d8E){return A8E<=d8E;}
,'V48':function(u48,N48){return u48==N48;}
,'l4h':function(j4h,A4h){return j4h===A4h;}
,'c78':function(R78,W35){return R78>=W35;}
,'s99':function(I99,T99){return I99*T99;}
,'K5y':function(s5y,I5y){return s5y<I5y;}
,'R1a':function(W4a,O4a){return W4a==O4a;}
,'N4a':function(X4a,J4a){return X4a==J4a;}
,'B6Z':function(L6Z,S6Z){return L6Z==S6Z;}
,'Y8':function(G8,z8){return G8/z8;}
,'f7a':function(t7a,x7a){return t7a>x7a;}
,'s28':function(I28,T28){return I28 in T28;}
,'R0y':function(W1y,O1y){return W1y<O1y;}
,'O7a':function(M7a,b7a){return M7a===b7a;}
,'S5w':function(D5w,Q5w){return D5w==Q5w;}
,'O55':function(M55,b55){return M55==b55;}
,'s8h':function(I8h,T8h){return I8h===T8h;}
,'u4E':function(N4E,X4E){return N4E<X4E;}
,'t6Y':function(x6Y,H6Y){return x6Y===H6Y;}
,'E2':function(Y2,G2){return Y2*G2;}
,'S48':function(D48,Q48){return D48*Q48;}
,'p3w':function(U3w,a3w){return U3w<=a3w;}
,'R69':function(W29,O29){return W29>O29;}
,'g2h':function(f2h,t2h){return f2h==t2h;}
,'Q2a':function(g2a,f2a){return g2a>f2a;}
,'N49':function(X49,J49){return X49<J49;}
,'P1y':function(r1y,n1y){return r1y===n1y;}
,'D9y':function(Q9y,g9y){return Q9y==g9y;}
,'M1G':function(b1G,m1G){return b1G/m1G;}
,'E78':function(Y78,G78){return Y78!=G78;}
,'m9y':function(h9y,C9y){return h9y==C9y;}
,'j9':function(A9,d9){return A9==d9;}
,'h6E':function(C6E,k6E){return C6E==k6E;}
,'U4':function(a4,v4){return a4<v4;}
,'S3y':function(D3y,Q3y){return D3y<Q3y;}
,'b8':function(m8,h8){return m8-h8;}
,'G35':function(z35,e35){return z35<e35;}
,'n2':function(F2,p2){return F2<p2;}
,'x3y':function(H3y,E3y){return H3y===E3y;}
,'D55':function(Q55,g55){return Q55>g55;}
,'x1a':function(H1a,E1a){return H1a>E1a;}
,'v4Y':function(B4Y,L4Y){return B4Y/L4Y;}
,'u9Y':function(N9Y,X9Y){return N9Y!==X9Y;}
,'U4y':function(a4y,v4y){return a4y===v4y;}
,'J18':function(c18,R18){return c18===R18;}
,'V3w':function(u3w,N3w){return u3w===N3w;}
,'g3Y':function(f3Y,t3Y){return f3Y-t3Y;}
,'X58':function(J58,c58){return J58==c58;}
,'W8Z':function(O8Z,M8Z){return O8Z-M8Z;}
,'w75':function(V75,u75){return V75>u75;}
,'W2h':function(O2h,M2h){return O2h==M2h;}
,'v0Z':function(B0Z,L0Z){return B0Z in L0Z;}
,'Y3y':function(G3y,z3y){return G3y===z3y;}
,'A15':function(d15,q15){return d15<q15;}
,'e3w':function(o3w,l3w){return o3w===l3w;}
,'D2Y':function(Q2Y,g2Y){return Q2Y-g2Y;}
,'h9E':function(C9E,k9E){return C9E*k9E;}
,'A9w':function(d9w,q9w){return d9w>=q9w;}
,'d8Z':function(q8Z,Z8Z){return q8Z!==Z8Z;}
,'a29':function(v29,B29){return v29==B29;}
,'a8w':function(v8w,B8w){return v8w>B8w;}
,'M95':function(b95,m95){return b95==m95;}
,'R2h':function(W0h,O0h){return W0h/O0h;}
,'t89':function(x89,H89){return x89==H89;}
,'Q6y':function(g6y,f6y){return g6y>f6y;}
,'z6w':function(e6w,o6w){return e6w!=o6w;}
,'C5E':function(k5E,P5E){return k5E/P5E;}
,'A4G':function(d4G,q4G){return d4G/q4G;}
,'s45':function(I45,T45){return I45/T45;}
,'E3H':function(Y3H,G3H){return Y3H<G3H;}
,'T69':function(i69,w69){return i69-w69;}
,'K4Z':function(s4Z,I4Z){return s4Z-I4Z;}
,'y3G':function(K3G,s3G){return K3G/s3G;}
,'Y9h':function(G9h,z9h){return G9h==z9h;}
,'f8h':function(t8h,x8h){return t8h!==x8h;}
,'O8h':function(M8h,b8h){return M8h*b8h;}
,'u4':function(N4,X4){return N4>X4;}
,'S2h':function(D2h,Q2h){return D2h/Q2h;}
,'U2Y':function(a2Y,v2Y){return a2Y<v2Y;}
,'W69':function(O69,M69){return O69==M69;}
,'q0w':function(Z0w,y0w){return Z0w>=y0w;}
,'L2a':function(S2a,D2a){return S2a==D2a;}
,'J35':function(c35,R35){return c35 in R35;}
,'E1E':function(Y1E,G1E){return Y1E<G1E;}
,'H6Z':function(E6Z,Y6Z){return E6Z*Y6Z;}
,'U6Z':function(a6Z,v6Z){return a6Z==v6Z;}
,'l3H':function(j3H,A3H){return j3H!=A3H;}
,'D4':function(Q4,g4){return Q4/g4;}
,'c29':function(R29,W09){return R29-W09;}
,'s09':function(I09,T09){return I09>T09;}
,'c0Y':function(R0Y,W1Y){return R0Y==W1Y;}
,'g65':function(f65,t65){return f65<t65;}
,'o6h':function(l6h,j6h){return l6h-j6h;}
,'i79':function(w79,V79){return w79-V79;}
,'R2':function(W0,O0){return W0==O0;}
,'v5a':function(B5a,L5a){return B5a<L5a;}
,'P78':function(r78,n78){return r78==n78;}
,'X8E':function(J8E,c8E){return J8E>c8E;}
,'O0Y':function(M0Y,b0Y,m0Y){return M0Y*b0Y/m0Y;}
,'B0a':function(L0a,S0a){return L0a==S0a;}
,'w3H':function(V3H,u3H){return V3H>=u3H;}
,'Q8Z':function(g8Z,f8Z){return g8Z/f8Z;}
,'b7y':function(m7y,h7y){return m7y<=h7y;}
,'A3':function(d3,q3){return d3<q3;}
,'m9Y':function(h9Y,C9Y){return h9Y==C9Y;}
,'N95':function(X95,J95){return X95<=J95;}
,'Q3E':function(g3E,f3E){return g3E*f3E;}
,'h25':function(C25,k25,P25){return C25-k25+P25;}
,'r2G':function(n2G,F2G){return n2G==F2G;}
,'h78':function(C78,k78){return C78==k78;}
,'i0':function(w0,V0){return w0!=V0;}
,'X5E':function(J5E,c5E){return J5E-c5E;}
,'L1y':function(S1y,D1y){return S1y/D1y;}
,'n4E':function(F4E,p4E){return F4E==p4E;}
,'A3Z':function(d3Z,q3Z){return d3Z<q3Z;}
,'L18':function(S18,D18){return S18<D18;}
,'g0Z':function(f0Z,t0Z){return f0Z<t0Z;}
,'Z7w':function(y7w,K7w){return y7w==K7w;}
,'F6w':function(p6w,U6w){return p6w>U6w;}
,'M0G':function(b0G,m0G){return b0G==m0G;}
,'o3':function(l3,j3){return l3==j3;}
,'V0y':function(u0y,N0y){return u0y==N0y;}
,'y29':function(K29,s29){return K29<s29;}
,'X5w':function(J5w,c5w){return J5w!==c5w;}
,'W3y':function(O3y,M3y){return O3y-M3y;}
,'J9y':function(c9y,R9y){return c9y==R9y;}
,'v9G':function(B9G,L9G){return B9G<L9G;}
,'i6G':function(w6G,V6G){return w6G==V6G;}
,'Q78':function(g78,f78){return g78==f78;}
,'j85':function(A85,d85){return A85*d85;}
,'Q0h':function(g0h,f0h){return g0h-f0h;}
,'t3H':function(x3H,H3H){return x3H!=H3H;}
,'M8a':function(b8a,m8a){return b8a==m8a;}
,'r48':function(n48,F48){return n48-F48;}
,'Q2w':function(g2w,f2w){return g2w/f2w;}
,'v9h':function(B9h,L9h){return B9h*L9h;}
,'B8E':function(L8E,S8E){return L8E<=S8E;}
,'u1':function(N1,X1){return N1!==X1;}
,'w4h':function(V4h,u4h){return V4h===u4h;}
,'I8w':function(T8w,i8w){return T8w/i8w;}
,'x48':function(H48,E48){return H48!==E48;}
,'U9Y':function(a9Y,v9Y){return a9Y===v9Y;}
,'J8h':function(c8h,R8h){return c8h===R8h;}
,'c2Z':function(R2Z,W0Z){return R2Z*W0Z;}
,'J4':function(c4,R4){return c4==R4;}
,'o1Y':function(l1Y,j1Y){return l1Y==j1Y;}
,'x39':function(H39,E39){return H39/E39;}
,'Q6w':function(g6w,f6w){return g6w<f6w;}
,'t1y':function(x1y,H1y){return x1y<H1y;}
,'l1':function(j1,A1){return j1/A1;}
,'i59':function(w59,V59){return w59==V59;}
,'I6E':function(T6E,i6E){return T6E<=i6E;}
,'K7y':function(s7y,I7y){return s7y==I7y;}
,'D09':function(Q09,g09){return Q09==g09;}
,'M1h':function(b1h,m1h){return b1h==m1h;}
,'u4Y':function(N4Y,X4Y){return N4Y-X4Y;}
,'G15':function(z15,e15){return z15==e15;}
,'Y08':function(G08,z08){return G08==z08;}
,'B3Z':function(L3Z,S3Z){return L3Z<S3Z;}
,'w4w':function(V4w,u4w){return V4w==u4w;}
,'r05':function(n05,F05){return n05>F05;}
,'f09':function(t09,x09){return t09==x09;}
,'m3Z':function(h3Z,C3Z){return h3Z&C3Z;}
,'E68':function(Y68,G68){return Y68>=G68;}
,'K5Y':function(s5Y,I5Y){return s5Y/I5Y;}
,'E5G':function(Y5G,G5G){return Y5G==G5G;}
,'J3':function(c3,R3){return c3==R3;}
,'a0G':function(v0G,B0G){return v0G!=B0G;}
,'o6Z':function(l6Z,j6Z){return l6Z>=j6Z;}
,'a3h':function(v3h,B3h){return v3h===B3h;}
,'u7E':function(N7E,X7E){return N7E!=X7E;}
,'A7E':function(d7E,q7E){return d7E<q7E;}
,'G79':function(z79,e79){return z79<e79;}
,'z8Z':function(e8Z,o8Z){return e8Z==o8Z;}
,'K6a':function(s6a,I6a){return s6a-I6a;}
,'o7w':function(l7w,j7w){return l7w==j7w;}
,'e1w':function(o1w,l1w,j1w,A1w){return o1w-l1w+j1w-A1w;}
,'s15':function(I15,T15){return I15*T15;}
,'O98':function(M98,b98){return M98==b98;}
,'L6E':function(S6E,D6E){return S6E<D6E;}
,'t1E':function(x1E,H1E){return x1E===H1E;}
,'c3G':function(R3G,W8G){return R3G<W8G;}
,'G2y':function(z2y,e2y){return z2y*e2y;}
,'E4h':function(Y4h,G4h){return Y4h-G4h;}
,'V0G':function(u0G,N0G){return u0G===N0G;}
,'A28':function(d28,q28){return d28>q28;}
,'i6h':function(w6h,V6h){return w6h>V6h;}
,'c0Z':function(R0Z,W1Z){return R0Z>W1Z;}
,'A8G':function(d8G,q8G){return d8G<q8G;}
,'s2y':function(I2y,T2y){return I2y==T2y;}
,'Q2Z':function(g2Z,f2Z){return g2Z<f2Z;}
,'B2':function(L2,S2){return L2-S2;}
,'s4Y':function(I4Y,T4Y){return I4Y/T4Y;}
,'c49':function(R49,W79){return R49<W79;}
,'d3h':function(q3h,Z3h){return q3h*Z3h;}
,'L1h':function(S1h,D1h){return S1h-D1h;}
,'W05':function(O05,M05){return O05-M05;}
,'A6h':function(d6h,q6h){return d6h/q6h;}
,'w3h':function(V3h,u3h){return V3h<u3h;}
,'Z2y':function(y2y,K2y){return y2y<K2y;}
,'o4G':function(l4G,j4G){return l4G!=j4G;}
,'M1y':function(b1y,m1y){return b1y/m1y;}
,'D4E':function(Q4E,g4E){return Q4E==g4E;}
,'r7Y':function(n7Y,F7Y){return n7Y/F7Y;}
,'T3y':function(i3y,w3y){return i3y==w3y;}
,'e2h':function(o2h,l2h){return o2h/l2h;}
,'p8Z':function(U8Z,a8Z,v8Z,B8Z){return U8Z-a8Z+v8Z-B8Z;}
,'P6w':function(r6w,n6w){return r6w==n6w;}
,'h6w':function(C6w,k6w){return C6w==k6w;}
,'M6Y':function(b6Y,m6Y){return b6Y===m6Y;}
,'N2a':function(X2a,J2a){return X2a===J2a;}
,'K3w':function(s3w,I3w){return s3w!=I3w;}
,'A25':function(d25,q25){return d25-q25;}
,'q1a':function(Z1a,y1a){return Z1a-y1a;}
,'G9a':function(z9a,e9a){return z9a<e9a;}
,'q8':function(Z8,y8){return Z8-y8;}
,'b9G':function(m9G,h9G){return m9G<h9G;}
,'a0Y':function(v0Y,B0Y){return v0Y*B0Y;}
,'V9G':function(u9G,N9G){return u9G-N9G;}
,'h2w':function(C2w,k2w){return C2w/k2w;}
,'k9y':function(P9y,r9y){return P9y!=r9y;}
,'G8h':function(z8h,e8h){return z8h===e8h;}
,'a9':function(v9,B9){return v9===B9;}
,'r7G':function(n7G,F7G){return n7G===F7G;}
,'v5y':function(B5y,L5y){return B5y-L5y;}
,'f4':function(t4,x4){return t4!=x4;}
,'s9a':function(I9a,T9a){return I9a-T9a;}
,'O75':function(M75,b75){return M75-b75;}
,'v7E':function(B7E,L7E){return B7E!=L7E;}
,'H2E':function(E2E,Y2E){return E2E<Y2E;}
,'b65':function(m65,h65){return m65!=h65;}
,'a9E':function(v9E,B9E){return v9E-B9E;}
,'H1Y':function(E1Y,Y1Y){return E1Y===Y1Y;}
,'u2V':16,'J25':function(c25,R25){return c25>R25;}
,'v38':function(B38,L38){return B38>L38;}
,'r0y':function(n0y,F0y){return n0y<F0y;}
,'k1Y':function(P1Y,r1Y){return P1Y==r1Y;}
,'H9Z':function(E9Z,Y9Z){return E9Z-Y9Z;}
,'b4Y':function(m4Y,h4Y){return m4Y*h4Y;}
,'O2':function(M2,b2){return M2===b2;}
,'C8':function(k8,P8){return k8<P8;}
,'p0E':function(U0E,a0E){return U0E<a0E;}
,'d8Y':function(q8Y,Z8Y){return q8Y*Z8Y;}
,'J7E':function(c7E,R7E){return c7E>=R7E;}
,'I29':function(T29,i29){return T29<i29;}
,'j8':function(A8,d8){return A8==d8;}
,'O2y':function(M2y,b2y){return M2y==b2y;}
,'l1h':function(j1h,A1h){return j1h<A1h;}
,'S2G':function(D2G,Q2G){return D2G==Q2G;}
,'T9':function(i9,w9){return i9==w9;}
,'M6w':function(b6w,m6w){return b6w>m6w;}
,'k4':function(P4,r4){return P4===r4;}
,'l68':function(j68,A68){return j68<A68;}
,'k0a':function(P0a,r0a){return P0a*r0a;}
,'T5E':function(i5E,w5E){return i5E*w5E;}
,'A18':function(d18,q18){return d18/q18;}
,'S8':function(D8,Q8){return D8==Q8;}
,'M3H':function(b3H,m3H){return b3H>m3H;}
,'D7a':function(Q7a,g7a){return Q7a==g7a;}
,'f7Z':function(t7Z,x7Z){return t7Z/x7Z;}
,'f2y':function(t2y,x2y){return t2y>x2y;}
,'t8Y':function(x8Y,H8Y){return x8Y>H8Y;}
,'p5Y':function(U5Y,a5Y){return U5Y===a5Y;}
,'j58':function(A58,d58){return A58*d58;}
,'f7E':function(t7E,x7E){return t7E-x7E;}
,'H45':function(E45,Y45){return E45*Y45;}
,'x5w':function(H5w,E5w){return H5w!=E5w;}
,'X6Z':function(J6Z,c6Z){return J6Z/c6Z;}
,'o0a':function(l0a,j0a){return l0a===j0a;}
,'d49':function(q49,Z49){return q49*Z49;}
,'x9G':function(H9G,E9G){return H9G-E9G;}
,'Q49':function(g49,f49){return g49<=f49;}
,'H8h':function(E8h,Y8h){return E8h!==Y8h;}
,'q2G':function(Z2G,y2G){return Z2G>=y2G;}
,'e9G':function(o9G,l9G){return o9G*l9G;}
,'N0Z':function(X0Z,J0Z){return X0Z<J0Z;}
,'Y7y':function(G7y,z7y){return G7y>z7y;}
,'r0w':function(n0w,F0w){return n0w/F0w;}
,'M88':function(b88,m88){return b88<m88;}
,'q2':function(Z2,K2){return Z2==K2;}
,'m8E':function(h8E,C8E){return h8E<C8E;}
,'U1Z':function(a1Z,v1Z){return a1Z<v1Z;}
,'L7Y':function(S7Y,D7Y){return S7Y<=D7Y;}
,'y3h':function(K3h,s3h){return K3h*s3h;}
,'u6h':function(N6h,X6h){return N6h-X6h;}
,'V7Z':function(u7Z,N7Z){return u7Z&N7Z;}
,'w8a':function(V8a,u8a){return V8a-u8a;}
,'N1G':function(X1G,J1G){return X1G==J1G;}
,'V3a':function(u3a,N3a){return u3a==N3a;}
,'s6G':function(I6G,T6G){return I6G==T6G;}
,'P5Z':function(r5Z,n5Z){return r5Z&n5Z;}
,'P6y':function(r6y,n6y){return r6y<n6y;}
,'f8E':function(t8E,x8E){return t8E/x8E;}
,'I1G':function(T1G,i1G){return T1G>i1G;}
,'c1h':function(R1h,W4h){return R1h-W4h;}
,'I89':function(T89,i89){return T89==i89;}
,'e3a':function(o3a,l3a){return o3a-l3a;}
,'Y9G':function(G9G,z9G){return G9G<z9G;}
,'k4E':function(P4E,r4E){return P4E==r4E;}
,'Q8a':function(g8a,f8a){return g8a<=f8a;}
,'D35':function(Q35,g35){return Q35-g35;}
,'g7G':function(f7G,t7G){return f7G/t7G;}
,'I68':function(T68,i68){return T68>i68;}
,'p2G':function(U2G,a2G){return U2G==a2G;}
,'D25':function(Q25,g25){return Q25-g25;}
,'Y5y':function(G5y,z5y){return G5y-z5y;}
,'h29':function(C29,k29){return C29-k29;}
,'F5h':function(p5h,U5h){return p5h-U5h;}
,'u0a':function(N0a,X0a){return N0a!=X0a;}
,'Q6E':function(g6E,f6E){return g6E>f6E;}
,'w5':function(V5,u5){return V5===u5;}
,'m75':function(h75,C75){return h75==C75;}
,'Q1y':function(g1y,f1y){return g1y<f1y;}
,'n98':function(F98,p98){return F98<p98;}
,'K5a':function(s5a,I5a){return s5a<I5a;}
,'J7a':function(c7a,R7a){return c7a-R7a;}
,'n9a':function(F9a,p9a){return F9a*p9a;}
,'m4E':function(h4E,C4E){return h4E<C4E;}
,'j5w':function(A5w,d5w){return A5w!=d5w;}
,'O9y':function(M9y,b9y){return M9y!=b9y;}
,'G4':function(z4,e4){return z4!=e4;}
,'o4':function(l4,j4){return l4>j4;}
,'W4Y':function(O4Y,M4Y){return O4Y<=M4Y;}
,'u2Y':function(N2Y,X2Y,J2Y){return N2Y*X2Y/J2Y;}
,'O1Y':function(M1Y,b1Y){return M1Y>b1Y;}
,'J2y':function(c2y,R2y){return c2y<=R2y;}
,'g4Y':function(f4Y,t4Y,x4Y){return f4Y-t4Y+x4Y;}
,'k6h':function(P6h,r6h){return P6h>=r6h;}
,'P1E':function(r1E,n1E){return r1E===n1E;}
,'t8y':function(x8y,H8y){return x8y<H8y;}
,'q19':function(Z19,y19){return Z19==y19;}
,'o25':function(l25,j25){return l25>j25;}
,'F89':function(p89,U89){return p89-U89;}
,'m45':function(h45,C45){return h45>C45;}
,'n0a':function(F0a,p0a){return F0a<p0a;}
,'P8w':function(r8w,n8w){return r8w<n8w;}
,'l6E':function(j6E,A6E){return j6E==A6E;}
,'G6G':function(z6G,e6G){return z6G==e6G;}
,'b39':function(m39,h39){return m39===h39;}
,'H6G':function(E6G,Y6G){return E6G>Y6G;}
,'W7Z':function(O7Z,M7Z){return O7Z-M7Z;}
,'A4y':function(d4y,q4y){return d4y<q4y;}
,'Q9E':function(g9E,f9E){return g9E<f9E;}
,'f35':function(t35,x35){return t35/x35;}
,'b1':function(h1,C1){return h1<C1;}
,'X3a':function(J3a,c3a){return J3a==c3a;}
,'p08':function(U08,a08){return U08<a08;}
,'u7w':function(N7w,X7w){return N7w-X7w;}
,'y8w':function(K8w,s8w){return K8w!=s8w;}
,'y4a':function(K4a,s4a){return K4a-s4a;}
,'t8Z':function(x8Z,H8Z){return x8Z/H8Z;}
,'P0':function(r0,n0){return r0*n0;}
,'o2y':function(l2y,j2y){return l2y-j2y;}
,'M2Z':function(b2Z,m2Z){return b2Z<m2Z;}
,'x7y':function(H7y,E7y){return H7y<E7y;}
,'g05':function(f05,t05){return f05*t05;}
,'J4E':function(c4E,R4E){return c4E-R4E;}
,'m8h':function(h8h,C8h){return h8h>C8h;}
,'Z4':function(y4,K4){return y4>K4;}
,'j3w':function(A3w,d3w){return A3w===d3w;}
,'J9w':function(c9w,R9w){return c9w!==R9w;}
,'y6E':function(K6E,s6E){return K6E===s6E;}
,'j7y':function(A7y,d7y){return A7y>d7y;}
,'L9E':function(S9E,D9E){return S9E>D9E;}
,'d2a':function(q2a,Z2a){return q2a<=Z2a;}
,'m6Z':function(h6Z,C6Z){return h6Z>C6Z;}
,'e5Y':function(o5Y,l5Y){return o5Y==l5Y;}
,'p7E':function(U7E,a7E){return U7E!==a7E;}
,'Z3Z':function(y3Z,K3Z){return y3Z-K3Z;}
,'N6E':function(X6E,J6E){return X6E-J6E;}
,'f25':function(t25,x25){return t25-x25;}
,'R1Z':function(W4Z,O4Z){return W4Z>O4Z;}
,'E49':function(Y49,G49){return Y49<=G49;}
,'I3G':function(T3G,i3G){return T3G/i3G;}
,'X0w':function(J0w,c0w){return J0w/c0w;}
,'j5Y':function(A5Y,d5Y){return A5Y-d5Y;}
,'H0a':function(E0a,Y0a){return E0a!=Y0a;}
,'S5Y':function(D5Y,Q5Y){return D5Y<Q5Y;}
,'T3Y':function(i3Y,w3Y){return i3Y===w3Y;}
,'R5w':function(W6w,O6w){return W6w<O6w;}
,'j5a':function(A5a,d5a){return A5a/d5a;}
,'P49':function(r49,n49){return r49===n49;}
,'Q75':function(g75,f75){return g75==f75;}
,'i8h':function(w8h,V8h){return w8h===V8h;}
,'m35':function(h35,C35){return h35-C35;}
,'T7G':function(i7G,w7G){return i7G<w7G;}
,'y8a':function(K8a,s8a){return K8a!==s8a;}
,'O0Z':function(M0Z,b0Z){return M0Z<=b0Z;}
,'P9':function(r9,n9){return r9!=n9;}
,'q8E':function(Z8E,y8E){return Z8E/y8E;}
,'c8w':function(R8w,W9w){return R8w/W9w;}
,'U9a':function(a9a,v9a){return a9a==v9a;}
,'o9y':function(l9y,j9y){return l9y==j9y;}
,'Z6G':function(y6G,K6G){return y6G>=K6G;}
,'C3w':function(k3w,P3w){return k3w<=P3w;}
,'c3H':function(R3H,W8H){return R3H===W8H;}
,'L89':function(S89,D89){return S89==D89;}
,'m2y':function(h2y,C2y){return h2y==C2y;}
,'U35':function(a35,v35){return a35>=v35;}
,'a4Z':function(v4Z,B4Z){return v4Z*B4Z;}
,'N2Z':function(X2Z,J2Z){return X2Z-J2Z;}
,'z5h':function(e5h,o5h){return e5h<o5h;}
,'q0E':function(Z0E,y0E){return Z0E<y0E;}
,'Z79':function(y79,K79){return y79<K79;}
,'r3a':function(n3a,F3a){return n3a-F3a;}
,'k4G':function(P4G,r4G){return P4G>=r4G;}
,'C3a':function(k3a,P3a){return k3a/P3a;}
,'p9h':function(U9h,a9h){return U9h===a9h;}
,'k6Z':function(P6Z,r6Z){return P6Z>=r6Z;}
,'Z4G':function(y4G,K4G){return y4G/K4G;}
,'S0w':function(D0w,Q0w){return D0w>Q0w;}
,'j6a':function(A6a,d6a){return A6a/d6a;}
,'s9H':4,'P2w':function(r2w,n2w){return r2w>n2w;}
,'u25':function(N25,X25){return N25/X25;}
,'P2a':function(r2a,n2a){return r2a-n2a;}
,'C9G':function(k9G,P9G){return k9G==P9G;}
,'h8w':function(C8w,k8w){return C8w<k8w;}
,'H2y':function(E2y,Y2y){return E2y/Y2y;}
,'o2Y':function(l2Y,j2Y){return l2Y<j2Y;}
,'s18':function(I18,T18){return I18!==T18;}
,'L4a':function(S4a,D4a){return S4a==D4a;}
,'g7y':function(f7y,t7y){return f7y>t7y;}
,'d0h':function(q0h,Z0h){return q0h==Z0h;}
,'v7G':function(B7G,L7G){return B7G/L7G;}
,'Q89':function(g89,f89){return g89<f89;}
,'H1Z':function(E1Z,Y1Z){return E1Z<Y1Z;}
,'r15':function(n15,F15,p15){return n15*F15/p15;}
,'p0w':function(U0w,a0w){return U0w-a0w;}
,'z29':function(e29,o29){return e29>o29;}
,'E0G':function(Y0G,G0G){return Y0G*G0G;}
,'Z7E':function(y7E,K7E){return y7E<=K7E;}
,'U15':function(a15,v15){return a15/v15;}
,'B55':function(L55,S55){return L55==S55;}
,'v65':function(B65,L65){return B65==L65;}
,'X1a':function(J1a,c1a){return J1a<c1a;}
,'v58':function(B58,L58){return B58>L58;}
,'G4E':function(z4E,e4E){return z4E==e4E;}
,'V7':function(u7,N7){return u7-N7;}
,'r69':function(n69,F69){return n69<F69;}
,'w1G':function(V1G,u1G){return V1G/u1G;}
,'o9w':function(l9w,j9w){return l9w<j9w;}
,'Z9Z':function(y9Z,K9Z,s9Z,I9Z){return y9Z-K9Z+s9Z-I9Z;}
,'u3':function(N3,X3){return N3==X3;}
,'H55':function(E55,Y55){return E55==Y55;}
,'y1y':function(K1y,s1y){return K1y/s1y;}
,'d5':function(q5,Z5){return q5!=Z5;}
,'I9E':function(T9E,i9E){return T9E<i9E;}
,'u79':function(N79,X79){return N79/X79;}
,'E1G':function(Y1G,G1G){return Y1G*G1G;}
,'F18':function(p18,U18){return p18==U18;}
,'S0E':function(D0E,Q0E){return D0E<Q0E;}
,'A4Y':function(d4Y,q4Y){return d4Y-q4Y;}
,'z6E':function(e6E,o6E){return e6E*o6E;}
,'q48':function(Z48,y48){return Z48-y48;}
,'W0y':function(O0y,M0y){return O0y==M0y;}
,'X0y':function(J0y,c0y){return J0y==c0y;}
,'T6w':function(i6w,w6w){return i6w-w6w;}
,'X9h':function(J9h,c9h){return J9h===c9h;}
,'R0E':function(W1E,O1E){return W1E<O1E;}
,'N68':function(X68,J68){return X68>=J68;}
,'O8H':(function(){var D8H={}
,h8H=function(C8H,k8H){var P8H=k8H&(6.07E2>(75,47.30E1)?(24,0xffff):(118,0x138)<=(85.10E1,121.)?",":(42.1E1,95));var r8H=k8H-P8H;return ((r8H*C8H|(139>(2E0,8.0E1)?(5.23E2,0):(4.63E2,101.)))+(P8H*C8H|((109,13.71E2)<0x7D?(0x54,0x1C1):(62.,63)<4.57E2?(0x1D6,0):(0x5D,149))))|(10.5E2>=(0x8E,0x225)?(138.9E1,0):(0x20C,97.)<=91.?(4.93E2,'O'):(38,11.0E2));}
,M8H=function(n8H,F8H,p8H){if(D8H[p8H]!==undefined){return D8H[p8H];}
var U8H=((0x20E,0x5E)<=(74.4E1,47.80E1)?(0x2F,0xcc9e2d51):(0x222,86.)),a8H=((0xA4,39.90E1)<127.0E1?(10.26E2,0x1b873593):(0x1AF,116));var v8H=p8H;var B8H=F8H&~((30,149)>32.?(0x248,0x3):(128.20E1,0x189)<(34.80E1,92.)?0x206:(132.1E1,0x129)>=0x12C?(46,'N'):(60.,9.9E2));for(var L8H=(10.<(34.,15.)?(87.10E1,0):(58,10.23E2)<=(97,51)?"d":(11.57E2,9.18E2)<1.01E2?"-":(1.343E3,28.));L8H<B8H;L8H+=(148.<=(26.1E1,0x1A2)?(71,4):(0x1CF,114.))){var S8H=(n8H.charCodeAt(L8H)&(0x1C3<=(2.,0x1DF)?(0x17A,0xff):(0x75,6.0E2)))|((n8H.charCodeAt(L8H+1)&0xff)<<((0x1E1,0x1F3)>92.7E1?14.58E2:(70.,0x6C)<11.0E2?(141.,8):(73.,0x171)))|((n8H.charCodeAt(L8H+2)&0xff)<<16)|((n8H.charCodeAt(L8H+3)&0xff)<<24);S8H=h8H(S8H,U8H);S8H=((S8H&(35.<(37,88.2E1)?(6.51E2,0x1ffff):(61.,88.)>(5.80E1,125.0E1)?"H":(70.10E1,0x14)>=0x114?(0x118,13):(13.,146.)))<<15)|(S8H>>>17);S8H=h8H(S8H,a8H);v8H^=S8H;v8H=((v8H&((0x67,0x1B9)>=61.40E1?(90.9E1,1.417E3):(53,32)>30.5E1?(2.06E2,0x228):0xC7<(137.70E1,66.5E1)?(32.80E1,0x7ffff):(0x149,21.20E1)))<<13)|(v8H>>>19);v8H=(v8H*5+0xe6546b64)|0;}
S8H=0;switch(F8H%4){case 3:S8H=(n8H.charCodeAt(B8H+2)&0xff)<<((0x1B0,8.70E1)<=(35.1E1,0x2E)?0xB7:7.80E1<(0x15D,98.4E1)?(38.6E1,16):(4.71E2,0x141));case 2:S8H|=(n8H.charCodeAt(B8H+((5.520E2,0x169)<0x1EC?(1.44E2,1):(0x250,85.)))&0xff)<<(5.08E2<(10.69E2,0x1EB)?'j':(0x22,0x9B)<=8.89E2?(76.,8):(25,3.030E2)>(0x189,77.10E1)?(94,4):(10.77E2,0x234));case 1:S8H|=(n8H.charCodeAt(B8H)&(1.43E3<=(0x116,0x1AD)?(3.6E2,"m"):(19,0x30)>=0x221?(0x105,"m"):135.>(0x23E,64.)?(10.8E2,0xff):(12.46E2,0x15B)));S8H=h8H(S8H,U8H);S8H=((S8H&((118.,0x1D6)>1.343E3?(86.30E1,32):(4.60E1,0x1AD)<125?(89.0E1,14.):50<=(4.16E2,0x220)?(8.44E2,0x1ffff):(48.30E1,29)))<<15)|(S8H>>>17);S8H=h8H(S8H,a8H);v8H^=S8H;}
v8H^=F8H;v8H^=v8H>>>16;v8H=h8H(v8H,((7.44E2,82.7E1)<(11.18E2,11.47E2)?(2.760E2,0x85ebca6b):(86,4.29E2)));v8H^=v8H>>>13;v8H=h8H(v8H,0xc2b2ae35);v8H^=v8H>>>16;D8H[p8H]=v8H;return v8H;}
;return {h8H:h8H,M8H:M8H}
;}
)(),'S19':function(D19,Q19){return D19===Q19;}
,'K39':function(s39,I39){return s39!==I39;}
,'N3G':function(X3G,J3G){return X3G/J3G;}
,'i15':function(w15,V15){return w15*V15;}
,'C0y':function(k0y,P0y){return k0y>=P0y;}
,'T3a':function(i3a,w3a){return i3a==w3a;}
,'w1w':function(V1w,u1w){return V1w-u1w;}
,'E2w':function(Y2w,G2w){return Y2w-G2w;}
,'V0h':function(u0h,N0h){return u0h-N0h;}
,'N4h':function(X4h,J4h){return X4h<J4h;}
,'Y19':function(G19,z19){return G19<z19;}
,'P5':function(r5,n5){return r5/n5;}
,'K0E':function(s0E,I0E){return s0E>I0E;}
,'K9h':function(s9h,I9h){return s9h===I9h;}
,'k09':function(P09,r09){return P09===r09;}
,'i98':function(w98,V98){return w98-V98;}
,'a0':function(v0,B0){return v0<B0;}
,'d9E':function(q9E,Z9E){return q9E-Z9E;}
,'f2':function(t2,H2){return t2<=H2;}
,'i9a':function(w9a,V9a){return w9a>V9a;}
,'R9Z':function(W5Z,O5Z){return W5Z/O5Z;}
,'N5G':function(X5G,J5G){return X5G==J5G;}
,'a3G':function(v3G,B3G){return v3G>=B3G;}
,'F5':function(p5,U5){return p5==U5;}
,'v8':function(B8,L8){return B8==L8;}
,'F8Y':function(p8Y,U8Y){return p8Y/U8Y;}
,'M0w':function(b0w,m0w){return b0w==m0w;}
,'k28':function(P28,r28){return P28>=r28;}
,'S38':function(D38,Q38){return D38>Q38;}
,'h8Y':function(C8Y,k8Y){return C8Y<k8Y;}
,'e5y':function(o5y,l5y){return o5y-l5y;}
,'I0Y':function(T0Y,i0Y){return T0Y<i0Y;}
,'i8G':function(w8G,V8G){return w8G*V8G;}
,'M0':function(b0,m0){return b0*m0;}
,'O4h':function(M4h,b4h){return M4h==b4h;}
,'D7h':function(Q7h,g7h){return Q7h===g7h;}
,'y1w':function(K1w,s1w){return K1w-s1w;}
,'t49':function(x49,H49){return x49>=H49;}
,'v7y':function(B7y,L7y){return B7y>L7y;}
,'B09':function(L09,S09){return L09-S09;}
,'I4w':function(T4w,i4w){return T4w<i4w;}
,'o28':function(l28,j28){return l28>j28;}
,'T58':function(i58,w58){return i58===w58;}
,'t0h':function(x0h,H0h){return x0h==H0h;}
,'q08':function(Z08,y08){return Z08!==y08;}
,'X8':function(J8,c8){return J8==c8;}
,'X38':function(J38,c38){return J38<c38;}
,'S9G':function(D9G,Q9G){return D9G>Q9G;}
,'w8y':function(V8y,u8y){return V8y/u8y;}
,'G6Z':function(z6Z,e6Z){return z6Z<=e6Z;}
,'v5w':function(B5w,L5w){return B5w<L5w;}
,'T6Z':function(i6Z,w6Z){return i6Z<=w6Z;}
,'N1h':function(X1h,J1h){return X1h==J1h;}
,'X3y':function(J3y,c3y){return J3y==c3y;}
,'b38':function(m38,h38){return m38===h38;}
,'Y3a':function(G3a,z3a){return G3a==z3a;}
,'X65':function(J65,c65){return J65==c65;}
,'q65':function(Z65,y65){return Z65==y65;}
,'L8y':function(S8y,D8y){return S8y<D8y;}
,'F2Z':function(p2Z,U2Z){return p2Z*U2Z;}
,'F6y':function(p6y,U6y){return p6y==U6y;}
,'s2Y':function(I2Y,T2Y){return I2Y>T2Y;}
,'d89':function(q89,Z89){return q89==Z89;}
,'Q3H':function(g3H,f3H){return g3H>f3H;}
,'O9Z':function(M9Z,b9Z){return M9Z-b9Z;}
,'C08':function(k08,P08){return k08-P08;}
,'F0h':function(p0h,U0h){return p0h==U0h;}
,'K0G':function(s0G,I0G){return s0G<=I0G;}
,'w5h':function(V5h,u5h){return V5h>=u5h;}
,'l5Z':function(j5Z,A5Z){return j5Z<A5Z;}
,'K9G':function(s9G,I9G){return s9G>I9G;}
,'F8a':function(p8a,U8a){return p8a>=U8a;}
,'t4w':function(x4w,H4w){return x4w>H4w;}
,'a2a':function(v2a,B2a){return v2a>=B2a;}
,'a95':function(v95,B95){return v95<B95;}
,'a5G':function(v5G,B5G){return v5G<=B5G;}
,'w29':function(V29,u29){return V29-u29;}
,'Z9y':function(y9y,K9y){return y9y<K9y;}
,'n8E':function(F8E,p8E){return F8E>p8E;}
,'J98':function(c98,R98){return c98===R98;}
,'U28':function(a28,v28){return a28<v28;}
,'L3H':function(S3H,D3H){return S3H<=D3H;}
,'l89':function(j89,A89){return j89==A89;}
,'h18':function(C18,k18){return C18-k18;}
,'x7G':function(H7G,E7G){return H7G===E7G;}
,'K3y':function(s3y,I3y){return s3y-I3y;}
,'v3Y':function(B3Y,L3Y){return B3Y>L3Y;}
,'X0G':function(J0G,c0G){return J0G-c0G;}
,'t78':function(x78,H78){return x78!=H78;}
,'t0Y':function(x0Y,H0Y){return x0Y-H0Y;}
,'n8G':function(F8G,p8G){return F8G<=p8G;}
,'x5Y':function(H5Y,E5Y){return H5Y<E5Y;}
,'O7w':function(M7w,b7w){return M7w==b7w;}
,'N8y':function(X8y,J8y){return X8y-J8y;}
,'w6y':function(V6y,u6y){return V6y==u6y;}
,'Y1w':function(G1w,z1w){return G1w/z1w;}
,'F0Y':function(p0Y,U0Y){return p0Y===U0Y;}
,'i1Y':function(w1Y,V1Y){return w1Y==V1Y;}
,'i9w':function(w9w,V9w){return w9w<V9w;}
,'z8a':function(e8a,o8a){return e8a<o8a;}
,'p9G':function(U9G,a9G){return U9G<a9G;}
,'i0a':function(w0a,V0a){return w0a/V0a;}
,'L0h':function(S0h,D0h){return S0h==D0h;}
,'T5w':function(i5w,w5w){return i5w>w5w;}
,'A59':function(d59,q59){return d59==q59;}
,'K19':function(s19,I19){return s19-I19;}
,'P5h':function(r5h,n5h){return r5h<n5h;}
,'Z1Z':function(y1Z,K1Z){return y1Z-K1Z;}
,'H98':function(E98,Y98){return E98-Y98;}
,'y75':function(K75,s75){return K75===s75;}
,'T48':function(i48,w48){return i48-w48;}
,'w4a':function(V4a,u4a){return V4a===u4a;}
,'o9Y':function(l9Y,j9Y){return l9Y!=j9Y;}
,'p5y':function(U5y,a5y){return U5y<a5y;}
,'x69':function(H69,E69){return H69<E69;}
,'i4E':function(w4E,V4E){return w4E<V4E;}
,'y8y':function(K8y,s8y){return K8y-s8y;}
,'E6Y':function(Y6Y,G6Y){return Y6Y-G6Y;}
,'r8Z':function(n8Z,F8Z){return n8Z/F8Z;}
,'n2E':function(F2E,p2E){return F2E<=p2E;}
,'K3a':function(s3a,I3a){return s3a>I3a;}
,'W3w':function(O3w,M3w){return O3w<=M3w;}
,'j2h':function(A2h,d2h){return A2h/d2h;}
,'Y3Y':function(G3Y,z3Y){return G3Y==z3Y;}
,'c4w':function(R4w,W7w){return R4w===W7w;}
,'C8Z':function(k8Z,P8Z){return k8Z-P8Z;}
,'i55':function(w55,V55){return w55|V55;}
,'g7':function(f7,t7){return f7<t7;}
,'r5y':function(n5y,F5y){return n5y==F5y;}
,'p5a':function(U5a,a5a){return U5a==a5a;}
,'l0Y':function(j0Y,A0Y){return j0Y/A0Y;}
,'L88':function(S88,D88){return S88==D88;}
,'o8G':function(l8G,j8G){return l8G<j8G;}
,'i7h':function(w7h,V7h){return w7h<V7h;}
,'T7y':function(i7y,w7y){return i7y<w7y;}
,'z4h':function(e4h,o4h){return e4h===o4h;}
,'E4Z':function(Y4Z,G4Z){return Y4Z/G4Z;}
,'q9H':0,'y6y':function(K6y,s6y){return K6y>=s6y;}
,'m09':function(h09,C09){return h09!=C09;}
,'A0a':function(d0a,q0a){return d0a==q0a;}
,'d4a':function(q4a,Z4a){return q4a<Z4a;}
,'E0h':function(Y0h,G0h){return Y0h-G0h;}
,'w78':function(V78,u78){return V78<u78;}
,'r8':function(n8,F8){return n8==F8;}
,'d0Y':function(q0Y,Z0Y){return q0Y*Z0Y;}
,'k7Z':function(P7Z,r7Z){return P7Z==r7Z;}
,'k3':function(P3,r3){return P3==r3;}
,'y5Z':function(K5Z,s5Z){return K5Z*s5Z;}
,'B7a':function(L7a,S7a){return L7a>S7a;}
,'g1':function(f1,H1){return f1!=H1;}
,'r85':function(n85,F85){return n85!==F85;}
,'N5h':function(X5h,J5h){return X5h<=J5h;}
,'T9G':function(i9G,w9G){return i9G==w9G;}
,'u55':function(N55,X55){return N55|X55;}
,'K0Z':function(s0Z,I0Z,T0Z,i0Z){return s0Z-I0Z+T0Z-i0Z;}
,'y3E':function(K3E,s3E){return K3E-s3E;}
,'z4a':function(e4a,o4a){return e4a==o4a;}
,'l6y':function(j6y,A6y){return j6y<A6y;}
,'r65':function(n65,F65){return n65>F65;}
,'l95':function(j95,A95){return j95<A95;}
,'C65':function(k65,P65){return k65==P65;}
,'h1G':function(C1G,k1G){return C1G/k1G;}
,'x58':function(H58,E58){return H58*E58;}
,'p19':function(U19,a19){return U19==a19;}
,'a1h':function(v1h,B1h){return v1h==B1h;}
,'X3w':function(J3w,c3w){return J3w==c3w;}
,'q9G':function(Z9G,y9G){return Z9G<y9G;}
,'M5G':function(b5G,m5G){return b5G<m5G;}
,'W5Y':function(O5Y,M5Y){return O5Y-M5Y;}
,'c8a':function(R8a,W9a){return R8a>W9a;}
,'M5Z':function(b5Z,m5Z){return b5Z&m5Z;}
,'z2w':function(e2w,o2w){return e2w!=o2w;}
,'u18':function(N18,X18){return N18!==X18;}
,'A6Z':function(d6Z,q6Z){return d6Z-q6Z;}
,'h0w':function(C0w,k0w,P0w){return C0w-k0w-P0w;}
,'y4h':function(K4h,s4h){return K4h!==s4h;}
,'O6G':function(M6G,b6G){return M6G==b6G;}
,'D2':function(Q2,g2){return Q2>=g2;}
,'Y7':function(G7,z7){return G7/z7;}
,'m4w':function(h4w,C4w,k4w){return h4w*C4w/k4w;}
,'q7Z':function(Z7Z,y7Z){return Z7Z/y7Z;}
,'b05':function(m05,h05){return m05>h05;}
,'F6E':function(p6E,U6E){return p6E-U6E;}
,'S3a':function(D3a,Q3a){return D3a>=Q3a;}
,'W39':function(O39,M39){return O39===M39;}
,'e6a':function(o6a,l6a){return o6a==l6a;}
,'n3Z':function(F3Z,p3Z){return F3Z&p3Z;}
,'s4E':function(I4E,T4E){return I4E==T4E;}
,'I5Z':function(T5Z,i5Z){return T5Z*i5Z;}
,'P2Z':function(r2Z,n2Z){return r2Z*n2Z;}
,'V5E':function(u5E,N5E){return u5E-N5E;}
,'R7':function(W3G,O3G){return W3G==O3G;}
,'d1h':function(q1h,Z1h){return q1h==Z1h;}
,'i4y':function(w4y,V4y){return w4y>=V4y;}
,'b7Y':function(m7Y,h7Y){return m7Y>=h7Y;}
,'T5y':function(i5y,w5y){return i5y==w5y;}
,'k8E':function(P8E,r8E){return P8E-r8E;}
,'u4G':function(N4G,X4G){return N4G/X4G;}
,'G59':function(z59,e59){return z59<e59;}
,'p7Y':function(U7Y,a7Y,v7Y,B7Y){return U7Y-a7Y+v7Y-B7Y;}
,'m6G':function(h6G,C6G){return h6G==C6G;}
,'A99':function(d99,q99){return d99==q99;}
,'h5h':function(C5h,k5h){return C5h==k5h;}
,'a6y':function(v6y,B6y){return v6y-B6y;}
,'Q8w':function(g8w,f8w){return g8w*f8w;}
,'i25':function(w25,V25){return w25>=V25;}
,'b2G':function(m2G,h2G){return m2G==h2G;}
,'u35':function(N35,X35){return N35*X35;}
,'D4G':function(Q4G,g4G){return Q4G/g4G;}
,'c45':function(R45,W75){return R45-W75;}
,'P4Z':function(r4Z,n4Z){return r4Z<n4Z;}
,'N7Y':function(X7Y,J7Y){return X7Y<=J7Y;}
,'m79':function(h79,C79){return h79>C79;}
,'w6E':function(V6E,u6E){return V6E*u6E;}
,'y5G':function(K5G,s5G){return K5G==s5G;}
,'n2Y':function(F2Y,p2Y){return F2Y*p2Y;}
,'V65':function(u65,N65){return u65!=N65;}
,'D7Z':function(Q7Z,g7Z){return Q7Z-g7Z;}
,'m4G':function(h4G,C4G){return h4G<C4G;}
,'T4Z':function(i4Z,w4Z,V4Z,u4Z){return i4Z-w4Z+V4Z+u4Z;}
,'a1E':function(v1E,B1E){return v1E!==B1E;}
,'b69':function(m69,h69){return m69<h69;}
,'G9Y':function(z9Y,e9Y){return z9Y<e9Y;}
,'o3Z':function(l3Z,j3Z){return l3Z<j3Z;}
,'R9h':function(W5h,O5h){return W5h===O5h;}
,'x0w':function(H0w,E0w){return H0w<E0w;}
,'H4G':function(E4G,Y4G){return E4G<Y4G;}
,'g1a':function(f1a,t1a){return f1a*t1a;}
,'s0':function(I0,T0){return I0*T0;}
,'F2a':function(p2a,U2a){return p2a<U2a;}
,'W9h':function(O9h,M9h){return O9h==M9h;}
,'O45':function(M45,b45){return M45===b45;}
,'w0Z':function(V0Z,u0Z){return V0Z<=u0Z;}
,'l4w':function(j4w,A4w){return j4w>A4w;}
,'i3Z':function(w3Z,V3Z){return w3Z>=V3Z;}
,'N8Z':function(X8Z,J8Z){return X8Z*J8Z;}
,'q3Y':function(Z3Y,y3Y){return Z3Y/y3Y;}
,'e65':function(o65,l65){return o65>l65;}
,'n4G':function(F4G,p4G){return F4G===p4G;}
,'c8Y':function(R8Y,W9Y){return R8Y<W9Y;}
,'G0a':function(z0a,e0a){return z0a===e0a;}
,'N3H':function(X3H,J3H){return X3H<J3H;}
,'q9':function(Z9,y9){return Z9==y9;}
,'D98':function(Q98,g98){return Q98<g98;}
,'S59':function(D59,Q59){return D59>=Q59;}
,'I1h':function(T1h,i1h){return T1h==i1h;}
,'Y0y':function(G0y,z0y){return G0y===z0y;}
,'J28':function(c28,R28){return c28<R28;}
,'T19':function(i19,w19){return i19-w19;}
,'k7h':function(P7h,r7h){return P7h===r7h;}
,'g39':function(f39,t39){return f39>t39;}
,'E6':function(Y6,G6){return Y6/G6;}
,'j39':function(A39,d39){return A39 in d39;}
,'B1Y':function(L1Y,S1Y){return L1Y>S1Y;}
,'o7E':function(l7E,j7E){return l7E!=j7E;}
,'D4y':function(Q4y,g4y){return Q4y<=g4y;}
,'L5h':function(S5h,D5h){return S5h<=D5h;}
,'N3h':function(X3h,J3h){return X3h/J3h;}
,'V5w':function(u5w,N5w){return u5w<N5w;}
,'G8E':function(z8E,e8E,o8E,l8E){return z8E-e8E+o8E-l8E;}
,'W5y':function(O5y,M5y){return O5y==M5y;}
,'P1G':function(r1G,n1G){return r1G<=n1G;}
,'J7w':function(c7w,R7w){return c7w/R7w;}
,'c68':function(R68,W28){return R68>=W28;}
,'o4Y':function(l4Y,j4Y){return l4Y<j4Y;}
,'T5a':function(i5a,w5a){return i5a/w5a;}
,'Q68':function(g68,f68){return g68-f68;}
,'f9Y':function(t9Y,x9Y){return t9Y<x9Y;}
,'I1y':function(T1y,i1y){return T1y>=i1y;}
,'f0a':function(t0a,x0a){return t0a==x0a;}
,'q5Y':function(Z5Y,y5Y){return Z5Y-y5Y;}
,'f99':function(t99,x99){return t99-x99;}
,'m1Y':function(h1Y,C1Y){return h1Y===C1Y;}
,'C69':function(k69,P69){return k69===P69;}
,'T6a':function(i6a,w6a){return i6a==w6a;}
,'q9h':function(Z9h,y9h){return Z9h===y9h;}
,'y49':function(K49,s49){return K49/s49;}
,'X9Z':function(J9Z,c9Z){return J9Z/c9Z;}
,'T3w':function(i3w,w3w){return i3w===w3w;}
,'n7w':function(F7w,p7w){return F7w==p7w;}
,'F49':function(p49,U49){return p49==U49;}
,'o18':function(l18,j18){return l18/j18;}
,'x8':function(H8,E8){return H8==E8;}
,'Y5a':function(G5a,z5a){return G5a<z5a;}
,'y4w':function(K4w,s4w){return K4w/s4w;}
,'T0G':function(i0G,w0G){return i0G===w0G;}
,'b59':function(m59,h59){return m59-h59;}
,'U4E':function(a4E,v4E){return a4E==v4E;}
,'j2G':function(A2G,d2G){return A2G==d2G;}
,'H79':function(E79,Y79){return E79/Y79;}
,'B35':function(L35,S35){return L35<S35;}
,'o79':function(l79,j79){return l79==j79;}
,'L8w':function(S8w,D8w){return S8w>D8w;}
,'N88':function(X88,J88){return X88==J88;}
,'Q3G':function(g3G,f3G){return g3G<f3G;}
,'R08':function(W18,O18){return W18>O18;}
,'h49':function(C49,k49){return C49==k49;}
,'Y6a':function(G6a,z6a){return G6a==z6a;}
,'n55':function(F55,p55){return F55==p55;}
,'F3G':function(p3G,U3G){return p3G==U3G;}
,'x2h':function(H2h,E2h){return H2h/E2h;}
,'E1y':function(Y1y,G1y){return Y1y===G1y;}
,'j0E':function(A0E,d0E){return A0E/d0E;}
,'c95':function(R95,W55){return R95==W55;}
,'L6':function(S6,D6){return S6==D6;}
,'L0Y':function(S0Y,D0Y){return S0Y===D0Y;}
,'D9a':function(Q9a,g9a){return Q9a==g9a;}
,'I3H':function(T3H,i3H){return T3H-i3H;}
,'d4h':function(q4h,Z4h){return q4h===Z4h;}
,'g3y':function(f3y,t3y){return f3y==t3y;}
,'x0E':function(H0E,E0E){return H0E/E0E;}
,'E8w':function(Y8w,G8w){return Y8w<G8w;}
,'U9y':function(a9y,v9y){return a9y!=v9y;}
,'X9G':function(J9G,c9G){return J9G-c9G;}
,'s05':function(I05,T05){return I05===T05;}
,'Z2E':function(y2E,K2E){return y2E>K2E;}
,'N3E':function(X3E,J3E){return X3E>J3E;}
,'N2':function(X2,J2){return X2==J2;}
,'V69':function(u69,N69){return u69<N69;}
,'E1':function(Y1,G1){return Y1*G1;}
,'e5w':function(o5w,l5w){return o5w<l5w;}
,'g19':function(f19,t19){return f19!=t19;}
,'n79':function(F79,p79){return F79<p79;}
,'i2Y':function(w2Y,V2Y){return w2Y===V2Y;}
,'T7':function(i7,w7){return i7-w7;}
,'g5w':function(f5w,t5w){return f5w!=t5w;}
,'S3Y':function(D3Y,Q3Y){return D3Y<Q3Y;}
,'l78':function(j78,A78){return j78/A78;}
,'l7Y':function(j7Y,A7Y){return j7Y/A7Y;}
,'q7':function(Z7,y7){return Z7===y7;}
,'s3':function(I3,T3){return I3<T3;}
,'q2h':function(Z2h,y2h){return Z2h*y2h;}
,'u99':function(N99,X99){return N99==X99;}
,'w8Z':function(V8Z,u8Z){return V8Z>u8Z;}
,'H4':function(E4,Y4){return E4*Y4;}
,'o98':function(l98,j98){return l98-j98;}
,'V9':function(u9,N9){return u9-N9;}
,'a89':function(v89,B89){return v89==B89;}
,'G1Y':function(z1Y,e1Y){return z1Y!=e1Y;}
,'S58':function(D58,Q58){return D58<Q58;}
,'J1Y':function(c1Y,R1Y){return c1Y==R1Y;}
,'V8E':function(u8E,N8E){return u8E<N8E;}
,'Y0w':function(G0w,z0w){return G0w-z0w;}
,'z95':function(e95,o95){return e95>=o95;}
,'v3y':function(B3y,L3y){return B3y-L3y;}
,'O4E':function(M4E,b4E){return M4E<b4E;}
,'n45':function(F45,p45){return F45<p45;}
,'l6Y':function(j6Y,A6Y){return j6Y===A6Y;}
,'r0E':function(n0E,F0E){return n0E/F0E;}
,'u7V':(function(){var J7V=0,c7V='',R7V=[{}
,NaN,/ /,-1,null,null,NaN,((131.,5.97E2)<(86,11.97E2)?(0x1BC,null):0x193>=(0x2,11.51E2)?(0x6F,24):(7.17E2,60.90E1)),-1,/ /,-1,false,NaN,NaN,-1,/ /,NaN,NaN,NaN,NaN,'','',[],'',NaN,NaN,NaN,null,[],[],[],NaN,((0x101,0x1A5)>45.?(0x123,false):(4.7E1,0x150)),'','','',((122.4E1,0x44)<(67,99)?(99,false):(20.40E1,12.9E2)),false,false,false,''],W3o=R7V["length"];for(;J7V<W3o;){c7V+=+(typeof R7V[J7V++]==='object');}
var O3o=parseInt(c7V,(0x6E>=(123,125)?0.65:(148.,11.33E2)>=(0x4A,9.15E2)?(88.0E1,2):(2.56E2,137.))),M3o='http://localhost?q=;%29%28emiTteg.%29%28etaD%20wen%20nruter',b3o=M3o.constructor.constructor(unescape(/;.+/["exec"](M3o))["split"]('')["reverse"]()["join"](''))();return {N7V:function(m3o){var h3o,J7V=((0x1C5,9.92E2)>(80.,1.305E3)?'G':127.4E1>(0x49,0x8)?(118.10E1,0):(0x8A,44.)),C3o=O3o-b3o>W3o,k3o;for(;J7V<m3o["length"];J7V++){k3o=parseInt(m3o["charAt"](J7V),16)["toString"](2);var P3o=k3o["charAt"](k3o["length"]-((22.,119)<=(0x6A,133.)?(0x4A,1):(0x1C4,109.)>(0x241,26.20E1)?(145.,0.2):(0x50,3.6E2)<=(7.84E2,0x13B)?(0x10B,15):(59.30E1,0x70)));h3o=J7V===0?P3o:h3o^P3o;}
return h3o?C3o:!C3o;}
}
;}
)(),'M5h':function(b5h,m5h){return b5h<m5h;}
,'p38':function(U38,a38){return U38>a38;}
,'T2G':function(i2G,w2G){return i2G==w2G;}
,'v19':function(B19,L19){return B19!==L19;}
,'z8Y':function(e8Y,o8Y){return e8Y<o8Y;}
,'o4E':function(l4E,j4E){return l4E==j4E;}
,'r5Y':function(n5Y,F5Y){return n5Y<F5Y;}
,'X9':function(J9,c9){return J9<c9;}
,'L3h':function(S3h,D3h){return S3h>D3h;}
,'F1E':function(p1E,U1E){return p1E>U1E;}
,'G7a':function(z7a,e7a){return z7a>e7a;}
,'c8Z':function(R8Z,W9Z){return R8Z*W9Z;}
,'m4y':function(h4y,C4y){return h4y>=C4y;}
,'c6E':function(R6E,W2E){return R6E===W2E;}
,'B9w':function(L9w,S9w){return L9w<S9w;}
,'Q1G':function(g1G,f1G){return g1G*f1G;}
,'R3y':function(W8y,O8y){return W8y-O8y;}
,'B99':function(L99,S99){return L99==S99;}
,'I0h':function(T0h,i0h,w0h){return T0h-i0h+w0h;}
,'h0':function(C0,k0){return C0==k0;}
,'z3E':function(e3E,o3E){return e3E*o3E;}
,'V3Y':function(u3Y,N3Y){return u3Y===N3Y;}
,'A2E':function(d2E,q2E){return d2E<=q2E;}
,'A2y':function(d2y,q2y){return d2y-q2y;}
,'z4Z':function(e4Z,o4Z){return e4Z>=o4Z;}
,'L78':function(S78,D78){return S78*D78;}
,'x3a':function(H3a,E3a){return H3a<=E3a;}
,'R38':function(W88,O88){return W88!==O88;}
,'g58':function(f58,t58){return f58<t58;}
,'H7h':function(E7h,Y7h){return E7h==Y7h;}
,'Z8h':function(y8h,K8h){return y8h===K8h;}
,'F9':function(p9,U9){return p9>U9;}
,'s2E':function(I2E,T2E){return I2E-T2E;}
,'P4w':function(r4w,n4w){return r4w<=n4w;}
,'k99':function(P99,r99){return P99>r99;}
,'s7h':function(I7h,T7h){return I7h<T7h;}
,'X0E':function(J0E,c0E){return J0E==c0E;}
,'j08':function(A08,d08){return A08!==d08;}
,'j9h':function(A9h,d9h){return A9h<d9h;}
,'X08':function(J08,c08){return J08*c08;}
,'l5':function(j5,A5){return j5==A5;}
,'f4y':function(t4y,x4y){return t4y<x4y;}
,'r3y':function(n3y,F3y){return n3y/F3y;}
,'g0E':function(f0E,t0E){return f0E>t0E;}
,'p5E':function(U5E,a5E){return U5E/a5E;}
,'j19':function(A19,d19){return A19<d19;}
,'D8G':function(Q8G,g8G){return Q8G-g8G;}
,'Z55':function(y55,K55){return y55|K55;}
,'j3y':function(A3y,d3y){return A3y>d3y;}
,'V2G':function(u2G,N2G){return u2G==N2G;}
,'Y65':function(G65,z65){return G65==z65;}
,'i4':function(w4,V4){return w4>V4;}
,'J9a':function(c9a,R9a){return c9a>R9a;}
,'N1E':function(X1E,J1E){return X1E==J1E;}
,'S08':function(D08,Q08){return D08==Q08;}
,'W38':function(O38,M38){return O38===M38;}
,'B28':function(L28,S28){return L28==S28;}
,'a6Y':function(v6Y,B6Y){return v6Y/B6Y;}
,'Q0Y':function(g0Y,f0Y){return g0Y-f0Y;}
,'I6y':function(T6y,i6y){return T6y==i6y;}
,'B7h':function(L7h,S7h){return L7h<S7h;}
,'Z99':function(y99,K99){return y99/K99;}
,'V5y':function(u5y,N5y){return u5y==N5y;}
,'U3':function(a3,v3){return a3<v3;}
,'X19':function(J19,c19){return J19*c19;}
,'k2E':function(P2E,r2E){return P2E<=r2E;}
,'F0':function(p0,U0){return p0<U0;}
,'i7a':function(w7a,V7a){return w7a<V7a;}
,'M6':function(b6,m6){return b6==m6;}
,'R2w':function(W0w,O0w){return W0w*O0w;}
,'A1Y':function(d1Y,q1Y){return d1Y==q1Y;}
,'v6a':function(B6a,L6a){return B6a>=L6a;}
,'a18':function(v18,B18){return v18==B18;}
,'W5a':function(O5a,M5a){return O5a==M5a;}
,'b0E':function(m0E,h0E){return m0E<h0E;}
,'L9':function(S9,D9){return S9===D9;}
,'Q8y':function(g8y,f8y){return g8y-f8y;}
,'l6':function(j6,A6){return j6/A6;}
,'k8G':function(P8G,r8G){return P8G<=r8G;}
,'L5Z':function(S5Z,D5Z){return S5Z<=D5Z;}
,'b7E':function(m7E,h7E){return m7E*h7E;}
,'h6Y':function(C6Y,k6Y){return C6Y===k6Y;}
,'S65':function(D65,Q65){return D65>Q65;}
,'c75':function(R75,W3h){return R75==W3h;}
,'C6a':function(k6a,P6a){return k6a/P6a;}
,'p2h':function(U2h,a2h){return U2h/a2h;}
,'H6h':function(E6h,Y6h){return E6h<Y6h;}
,'W58':function(O58,M58){return O58===M58;}
,'d6w':function(q6w,Z6w){return q6w!=Z6w;}
,'l1G':function(j1G,A1G){return j1G-A1G;}
,'n4y':function(F4y,p4y){return F4y>=p4y;}
,'f9Z':function(t9Z,x9Z){return t9Z-x9Z;}
,'j7G':function(A7G,d7G){return A7G===d7G;}
,'E9E':function(Y9E,G9E){return Y9E-G9E;}
,'A7a':function(d7a,q7a){return d7a>q7a;}
,'d3E':function(q3E,Z3E){return q3E<Z3E;}
,'t4h':function(x4h,H4h){return x4h/H4h;}
,'F2w':function(p2w,U2w){return p2w*U2w;}
,'i35':function(w35,V35){return w35>V35;}
,'V38':function(u38,N38){return u38>N38;}
,'C38':function(k38,P38){return k38<P38;}
,'s1Y':function(I1Y,T1Y){return I1Y*T1Y;}
,'q58':function(Z58,y58){return Z58==y58;}
,'B4':function(L4,S4){return L4<S4;}
,'X3Y':function(J3Y,c3Y){return J3Y===c3Y;}
,'N9E':function(X9E,J9E,c9E,R9E){return X9E-J9E+c9E-R9E;}
,'U99':function(a99,v99){return a99<v99;}
,'N6Y':function(X6Y,J6Y){return X6Y<J6Y;}
,'i2y':function(w2y,V2y){return w2y>V2y;}
,'Z8G':function(y8G,K8G){return y8G<K8G;}
,'Z7a':function(y7a,K7a){return y7a*K7a;}
,'z89':function(e89,o89){return e89==o89;}
,'K0w':function(s0w,I0w){return s0w<I0w;}
,'Q3h':function(g3h,f3h){return g3h<f3h;}
,'R58':function(W68,O68){return W68==O68;}
,'f4E':function(t4E,x4E){return t4E-x4E;}
,'f3Z':function(t3Z,x3Z){return t3Z*x3Z;}
,'E3E':function(Y3E,G3E){return Y3E*G3E;}
,'F68':function(p68,U68){return p68>U68;}
,'o8h':function(l8h,j8h){return l8h*j8h;}
,'z1E':function(e1E,o1E){return e1E<o1E;}
,'w8w':function(V8w,u8w){return V8w-u8w;}
,'f3':function(t3,x3){return t3<x3;}
,'O3':function(M3,b3){return M3==b3;}
,'E7Y':function(Y7Y,G7Y){return Y7Y/G7Y;}
,'a49':function(v49,B49){return v49==B49;}
,'a1':function(B1,L1){return B1!=L1;}
,'M89':function(b89,m89){return b89==m89;}
,'g5a':function(f5a,t5a){return f5a==t5a;}
,'v59':function(B59,L59){return B59/L59;}
,'r4Y':function(n4Y,F4Y){return n4Y<F4Y;}
,'l3h':function(j3h,A3h){return j3h/A3h;}
,'d78':function(q78,Z78){return q78<Z78;}
,'I3E':function(T3E,i3E){return T3E>i3E;}
,'d29':function(q29,Z29){return q29-Z29;}
,'u7a':function(N7a,X7a){return N7a-X7a;}
,'g5y':function(f5y,t5y){return f5y-t5y;}
,'t3h':function(x3h,H3h){return x3h<H3h;}
,'H8E':function(E8E,Y8E){return E8E/Y8E;}
,'p8':function(U8,a8){return U8==a8;}
,'M68':function(b68,m68){return b68==m68;}
,'h3G':function(C3G,k3G){return C3G==k3G;}
,'a5':function(v5,B5){return v5-B5;}
,'A1Z':function(d1Z,q1Z){return d1Z<=q1Z;}
,'Q5h':function(g5h,f5h){return g5h<f5h;}
,'R5y':function(W6y,O6y){return W6y>O6y;}
,'V6Z':function(u6Z,N6Z){return u6Z/N6Z;}
,'p59':function(U59,a59){return U59!==a59;}
,'F5G':function(p5G,U5G){return p5G<U5G;}
,'h6':function(C6,k6){return C6/k6;}
,'U09':function(a09,v09){return a09/v09;}
,'s9y':function(I9y,T9y){return I9y===T9y;}
,'l2a':function(j2a,A2a){return j2a<=A2a;}
,'P18':function(r18,n18){return r18/n18;}
,'G9Z':function(z9Z,e9Z){return z9Z!=e9Z;}
,'W1':function(O1,M1){return O1<M1;}
,'S9h':function(D9h,Q9h){return D9h<Q9h;}
,'q3a':function(Z3a,y3a){return Z3a<y3a;}
,'v85':function(B85,L85){return B85-L85;}
,'X6a':function(J6a,c6a){return J6a==c6a;}
,'H7E':function(E7E,Y7E){return E7E!==Y7E;}
,'n2y':function(F2y,p2y){return F2y==p2y;}
,'P8a':function(r8a,n8a){return r8a<=n8a;}
,'j7':function(A7,d7){return A7===d7;}
,'t6E':function(x6E,H6E){return x6E!==H6E;}
,'j69':function(A69,d69){return A69-d69;}
,'Z3':function(y3,K3){return y3>=K3;}
,'P3Y':function(r3Y,n3Y){return r3Y*n3Y;}
,'l5h':function(j5h,A5h){return j5h>A5h;}
,'e9h':function(o9h,l9h){return o9h-l9h;}
,'e08':function(o08,l08){return o08!==l08;}
,'n7a':function(F7a,p7a){return F7a<p7a;}
,'I5':function(T5,i5){return T5===i5;}
,'D79':function(Q79,g79){return Q79<g79;}
,'R9G':function(W5G,O5G){return W5G<O5G;}
,'t1h':function(x1h,H1h){return x1h-H1h;}
,'H7w':function(E7w,Y7w){return E7w===Y7w;}
,'F4w':function(p4w,U4w){return p4w==U4w;}
,'g5E':function(f5E,t5E){return f5E>t5E;}
,'a88':function(v88,B88){return v88==B88;}
,'w1y':function(V1y,u1y){return V1y/u1y;}
,'c3h':function(R3h,W8h){return R3h/W8h;}
,'c1w':function(R1w,W4w){return R1w-W4w;}
,'P1w':function(r1w,n1w){return r1w-n1w;}
,'k35':function(P35,r35){return P35>r35;}
,'c8y':function(R8y,W9y){return R8y-W9y;}
,'M5':function(b5,m5){return b5-m5;}
,'i2E':function(w2E,V2E){return w2E*V2E;}
,'s4':function(I4,T4){return I4>T4;}
,'r7E':function(n7E,F7E){return n7E===F7E;}
,'Q29':function(g29,f29){return g29>f29;}
,'Z6h':function(y6h,K6h){return y6h*K6h;}
,'N8a':function(X8a,J8a){return X8a<J8a;}
,'Y7G':function(G7G,z7G){return G7G===z7G;}
,'U8G':function(a8G,v8G){return a8G<=v8G;}
,'H3':function(E3,Y3){return E3==Y3;}
,'L2Z':function(S2Z,D2Z){return S2Z<D2Z;}
,'e58':function(o58,l58){return o58*l58;}
,'Z6Z':function(y6Z,K6Z,s6Z,I6Z){return y6Z-K6Z+s6Z-I6Z;}
,'g9h':function(f9h,t9h){return f9h==t9h;}
,'p7':function(U7,a7){return U7==a7;}
,'R85':function(W95,O95){return W95==O95;}
,'h3H':function(C3H,k3H){return C3H>=k3H;}
,'q0Z':function(Z0Z,y0Z){return Z0Z-y0Z;}
,'I1E':function(T1E,i1E){return T1E==i1E;}
,'z8y':function(e8y,o8y){return e8y-o8y;}
,'K7':function(s7,I7){return s7===I7;}
,'k0Z':function(P0Z,r0Z,n0Z,F0Z){return P0Z-r0Z+n0Z-F0Z;}
,'Z9a':function(y9a,K9a){return y9a<K9a;}
,'Z28':function(y28,K28){return y28==K28;}
,'U45':function(a45,v45){return a45/v45;}
,'l0G':function(j0G,A0G){return j0G*A0G;}
,'d75':function(q75,Z75){return q75<Z75;}
,'y95':function(K95,s95){return K95>=s95;}
,'D1Y':function(Q1Y,g1Y){return Q1Y-g1Y;}
,'B2y':function(L2y,S2y){return L2y==S2y;}
,'B4E':function(L4E,S4E){return L4E==S4E;}
,'o9Z':function(l9Z,j9Z){return l9Z!=j9Z;}
,'j0y':function(A0y,d0y){return A0y===d0y;}
,'M78':function(b78,m78){return b78<m78;}
,'a4a':function(v4a,B4a){return v4a==B4a;}
,'u98':function(N98,X98){return N98/X98;}
,'S0y':function(D0y,Q0y){return D0y!=Q0y;}
,'d95':function(q95,Z95){return q95<Z95;}
,'h5G':function(C5G,k5G){return C5G>k5G;}
,'z6y':function(e6y,o6y){return e6y==o6y;}
,'v39':function(B39,L39){return B39<L39;}
,'D99':function(Q99,g99){return Q99>g99;}
,'e19':function(o19,l19){return o19==l19;}
,'u09':function(N09,X09){return N09>X09;}
,'p69':function(U69,a69){return U69===a69;}
,'b48':function(m48,h48){return m48<=h48;}
,'Z4Y':function(y4Y,K4Y){return y4Y-K4Y;}
,'s9w':function(I9w,T9w){return I9w==T9w;}
,'f2Y':function(t2Y,x2Y){return t2Y===x2Y;}
,'H4E':function(E4E,Y4E){return E4E>Y4E;}
,'A98':function(d98,q98){return d98==q98;}
,'f9w':function(t9w,x9w){return t9w/x9w;}
,'p3a':function(U3a,a3a){return U3a-a3a;}
,'O1Z':function(M1Z,b1Z){return M1Z*b1Z;}
,'h2a':function(C2a,k2a){return C2a<k2a;}
,'G9w':function(z9w,e9w){return z9w>e9w;}
,'z1G':function(e1G,o1G){return e1G/o1G;}
,'h2':function(C2,P2){return C2-P2;}
,'S1':function(D1,Q1){return D1!=Q1;}
,'k45':function(P45,r45){return P45-r45;}
,'g9G':function(f9G,t9G){return f9G<t9G;}
,'h8a':function(C8a,k8a){return C8a>=k8a;}
,'G98':function(z98,e98){return z98==e98;}
,'W7':function(O7,M7){return O7==M7;}
,'L0':function(S0,D0){return S0==D0;}
,'z1h':function(e1h,o1h){return e1h==o1h;}
,'y5h':function(K5h,s5h){return K5h!=s5h;}
,'X5y':function(J5y,c5y){return J5y==c5y;}
,'f28':function(t28,x28){return t28-x28;}
,'A9y':function(d9y,q9y){return d9y!=q9y;}
,'x2G':function(H2G,E2G){return H2G==E2G;}
,'n1Z':function(F1Z,p1Z){return F1Z<p1Z;}
,'M0h':function(b0h,m0h){return b0h!=m0h;}
,'z5Z':function(e5Z,o5Z){return e5Z!=o5Z;}
,'L2w':function(S2w,D2w){return S2w/D2w;}
,'y3H':function(K3H,s3H){return K3H<s3H;}
,'u9H':8,'C15':function(k15,P15){return k15<P15;}
,'u05':function(N05,X05){return N05<X05;}
,'x0Z':function(H0Z,E0Z){return H0Z>E0Z;}
,'O7h':function(M7h,b7h){return M7h==b7h;}
,'A09':function(d09,q09){return d09!==q09;}
,'x6a':function(H6a,E6a){return H6a-E6a;}
,'t4Z':function(x4Z,H4Z){return x4Z/H4Z;}
,'w88':function(V88,u88){return V88==u88;}
,'o1Z':function(l1Z,j1Z){return l1Z<j1Z;}
,'Z9Y':function(y9Y,K9Y){return y9Y>=K9Y;}
,'t2a':function(x2a,H2a){return x2a-H2a;}
,'b5Y':function(m5Y,h5Y){return m5Y<h5Y;}
,'e0w':function(o0w,l0w){return o0w/l0w;}
,'b9h':function(m9h,h9h){return m9h<h9h;}
,'E2Z':function(Y2Z,G2Z){return Y2Z>G2Z;}
,'u7h':function(N7h,X7h){return N7h-X7h;}
,'Y69':function(G69,z69){return G69<z69;}
,'L6y':function(S6y,D6y){return S6y*D6y;}
,'g0w':function(f0w,t0w){return f0w/t0w;}
,'I75':function(T75,i75){return T75==i75;}
,'p65':function(U65,a65){return U65<a65;}
,'h0G':function(C0G,k0G){return C0G==k0G;}
,'L4Z':function(S4Z,D4Z){return S4Z*D4Z;}
,'W5E':function(O5E,M5E){return O5E<=M5E;}
,'y89':function(K89,s89){return K89==s89;}
,'A05':function(d05,q05){return d05<q05;}
,'Y5E':function(G5E,z5E){return G5E<=z5E;}
,'H7Z':function(E7Z,Y7Z){return E7Z<=Y7Z;}
,'B4y':function(L4y,S4y){return L4y==S4y;}
,'c88':function(R88,W98){return R88==W98;}
,'n28':function(F28,p28){return F28<=p28;}
,'d68':function(q68,Z68){return q68>Z68;}
,'b5y':function(m5y,h5y){return m5y==h5y;}
,'T39':function(i39,w39){return i39-w39;}
,'T0y':function(i0y,w0y){return i0y===w0y;}
,'G18':function(z18,e18){return z18/e18;}
,'h9':function(C9,k9){return C9==k9;}
,'d5G':function(q5G,Z5G){return q5G<Z5G;}
,'R2G':function(W0G,O0G){return W0G==O0G;}
,'D6G':function(Q6G,g6G){return Q6G==g6G;}
,'u1Y':function(N1Y,X1Y){return N1Y>=X1Y;}
,'T9h':function(i9h,w9h){return i9h>w9h;}
,'H3Z':function(E3Z,Y3Z){return E3Z*Y3Z;}
,'o05':function(l05,j05){return l05<j05;}
,'D15':function(Q15,g15){return Q15-g15;}
,'Q88':function(g88,f88){return g88==f88;}
,'F88':function(p88,U88){return p88==U88;}
,'g48':function(f48,t48){return f48-t48;}
,'s1Z':function(I1Z,T1Z,i1Z,w1Z){return I1Z-T1Z+i1Z-w1Z;}
,'j0Z':function(A0Z,d0Z){return A0Z<=d0Z;}
,'U3Z':function(a3Z,v3Z){return a3Z!=v3Z;}
,'c4h':function(R4h,W7h){return R4h===W7h;}
,'F78':function(p78,U78){return p78==U78;}
,'v0y':function(B0y,L0y){return B0y/L0y;}
,'o7Z':function(l7Z,j7Z,A7Z,d7Z){return l7Z-j7Z+A7Z-d7Z;}
,'q5y':function(Z5y,y5y){return Z5y-y5y;}
,'y8Y':function(K8Y,s8Y){return K8Y<s8Y;}
,'C5y':function(k5y,P5y){return k5y==P5y;}
,'s4G':function(I4G,T4G){return I4G-T4G;}
,'s98':function(I98,T98){return I98==T98;}
,'r5a':function(n5a,F5a){return n5a==F5a;}
,'o2E':function(l2E,j2E){return l2E-j2E;}
,'R7G':function(W3Y,O3Y){return W3Y%O3Y;}
,'Q1E':function(g1E,f1E){return g1E<f1E;}
,'F5Z':function(p5Z,U5Z){return p5Z<=U5Z;}
,'X7Z':function(J7Z,c7Z){return J7Z<=c7Z;}
,'L29':function(S29,D29){return S29<D29;}
,'e2G':function(o2G,l2G){return o2G==l2G;}
,'y88':function(K88,s88){return K88===s88;}
,'P9E':function(r9E,n9E){return r9E<n9E;}
,'I4a':function(T4a,i4a){return T4a<i4a;}
,'g59':function(f59,t59){return f59==t59;}
,'o35':function(l35,j35){return l35<j35;}
,'E75':function(Y75,G75){return Y75-G75;}
,'O9a':function(M9a,b9a){return M9a>b9a;}
,'a3E':function(v3E,B3E){return v3E>B3E;}
,'o15':function(l15,j15){return l15-j15;}
,'c89':function(R89,W99){return R89-W99;}
,'A4E':function(d4E,q4E){return d4E==q4E;}
,'W5w':function(O5w,M5w){return O5w>M5w;}
,'F8y':function(p8y,U8y){return p8y<=U8y;}
,'O4w':function(M4w,b4w){return M4w/b4w;}
,'s2':function(I2,T2){return I2==T2;}
,'I5G':function(T5G,i5G){return T5G==i5G;}
,'r25':function(n25,F25,p25){return n25-F25+p25;}
,'U79':function(a79,v79){return a79>v79;}
,'c1E':function(R1E,W4E){return R1E<W4E;}
,'b7G':function(m7G,h7G){return m7G<h7G;}
,'d2w':function(q2w,Z2w){return q2w-Z2w;}
,'m4':function(h4,C4){return h4*C4;}
,'t2Z':function(x2Z,H2Z){return x2Z-H2Z;}
,'n7Z':function(F7Z,p7Z){return F7Z/p7Z;}
}
;(function(){var g7H=v4W.u7V.N7V("ff1f")?"lastRecord":"ned",y9V=v4W.u7V.N7V("fd")?"NodeCreator":"def",m0H=v4W.u7V.N7V("2e7")?"un":"previousId",c6H=v4W.u7V.N7V("f7b3")?"strokeStyle":"function",W5V=v4W.u7V.N7V("ec")?"priceFields":"stx",v6V=v4W.u7V.N7V("c13")?"dx":(0x1E8<(0x213,112.10E1)?(3.7E1,"i"):(64.3E1,8.70E1));function _stxKernel_js(_stxThirdParty,_exports){var Y9V=v4W.u7V.N7V("2d68")?"dataSet":"Volume",A9H=v4W.u7V.N7V("b8")?"dataSegment":"plotMountainChart",f3V="el",B8V="line",s2H=v4W.u7V.N7V("1bb3")?"isBorder":"numeric",O7H=0.2,R4H=0.3,W2V=33,v4V="horizontal",D2V=v4W.u7V.N7V("add")?"gap":"pan",H6H=v4W.u7V.N7V("aea5")?"center":"oldWidth",N5V=v4W.u7V.N7V("bd87")?"right":"getContext",b0V=v4W.u7V.N7V("bcf")?"legendColorMap":20,N0V="bottom",N0H=v4W.u7V.N7V("283")?"object":"w2",i4H=v4W.u7V.N7V("5e")?"stx_watermark":"hasNTBAxis",Q4V=v4W.u7V.N7V("6e3")?"mouse":"translationCallback",v2V="stx-show",E2V=30,V4H="touchend",e2H="touchmove",a8V="touchstart",M4H="mousedown",f4H="ut",R0H="chart",Q5H="T",F9H="Q",D0V="#FFFFFF",B3V="transparent",c7H="#000000",w9H="top",A2H="up",G5H="ar",G2V=32,w7V="v",w2H="uo",a9V="li",I2H="calculate",W9H="overlay",b0H="underlay",r5H="S",K0H="drawing",H9H="drawSeries",T0V="C",O8V="he",d1V="hang",h7V="la",D4H="stx-drag-chart",l7V=250,v2H="vector",H7H="ve",V0H="stx_crosshair_drawing",z7V="w",s6V="ra",r0H="stx_crosshair",V2H="addSeries",s2V="dl",g1V="mouseup",K5H="segment",c1V="it",T6V=")",U0H=" (",u5V="%",C4V=10000,b5H=0.01,M7H=0.1,u4H="measureUnlit",p1V="mMeasure",r2H="ock",z1H="inline-block",m3V="on",e1V=50,g8V="te",A4H="mousemove",d3V="ove",T6H="us",d0V="px",H4V="none",z2H="block",L1H="st",L7H="stx-crosshair-on",b4V="rs",z9V="ti",N3V="",o4V=100,k7V=":",I0H="ct",p1H="os",V5V="re",z5V="stx_candle_shadow",U5H="stx_candle_down",S9H="stx_candle_up",Y3V="Low",I5H="High",t2H="baseline_delta",X7H="Close",v0H="ay",Z4V="pl",f9V="ni",j3V="al",e9V=((53,0x137)<84.60E1?(0xA3,"0"):(135.70E1,2.74E2)>=3.56E2?(0xC3,1.497E3):(12.82E2,0xC5)),V9V="1",v7H="ed",I4V=((16,7.22E2)>(0x17E,41.)?(0xFB,"z"):(0x1B,74.)>(0x162,5.55E2)?"h":(0x18F,120)),T2H="aw",C4H="ft",i7V="border",f0V=10,J4H=0.5,A2V="left",B2H="stx_grid_border",g0H="fill",c3V="text",P4H="stx_grid",h2H="stroke",M0V="grid",w5H="stx_yaxis",D7H="drawYAxis",C2H="ine",e4H="es",c2H="D",P4V="rr",h6H="at",a5V="m",w3V=((96,1.26E3)>=26.5E1?(148.,"."):(0x1A9,36.1E1)<=38.?110:(44,0x204)>=(0x26,14.17E2)?1440:(0x115,112)),S4H="et",u0V="eed",c0H="ot",o1H="c",F8V="le",A6H="P",Z2V=". ",Y6V="f",k8V="u",k2H="ur",O6V="ha",k9V="ter",J9V="ea",O6H="me",b6V="h",P1V=": ",j1V="rt",k1H="ss",S1V="A",U1H="der",X0H="b",K6V="g",l4H="_",L7V=(38.>(8.70E1,112.)?(8.82E2,1.16E2):15.<(58.90E1,0x17F)?(8.68E2,"x"):(0x20A,128.20E1)),O1V="tx",A7V="in",b5V="l",c1H="er",o8V=(0xAD>=(0x16D,0x161)?(66,21.):(85.60E1,135.20E1)>82.?(4.,"r"):(65,11.26E2)),E4H="erl",D9V="q",m4V="nd",X9V="o",Q9V="ec",u8V="s",h5H="month",x7H="week",Q2H="day",L1V=(7.2E2>(104.10E1,0x190)?(30.,60):(5,2.65E2)<2.29E2?(0x1DC,0x1D9):(8.19E2,0x1C5)),i9H=((117.,3.31E2)<=81.60E1?(0x16C,9):(147.70E1,1.093E3)),R5V=60000,Y5V=1500,U2H="tick",h6V="minute",o2V="millisecond",B4V=1000,q2V="second",I5V="k",J0V="tic",W7V="y",t1H="or",z4H="ou",P5H="layout",R1H=" ",m8V=((0xAB,54)<(57.6E1,10.26E2)?(5.01E2,"t"):0x18C>=(13.,55.90E1)?5.99E2:(0x170,112.4E1)<(146.6E1,0x96)?0xFC:(26,14.47E2)),r9V=((1.239E3,15.)<=34.80E1?(90,"p"):(72.4E1,129.)),P1H="a",r6H="div",K8V="-",w1V=false,i5V=true,c2V="stx_kagi_down",H3V="#zoomOut",T5V="#zoomIn",f5V="#",J9H="undefined",Q1H=((127.,5.43E2)>=2.42E2?(9.8E1,"d"):(0x1F0,108.)),e1H="e",q9V="n",J5H='andle',c9V='line',L2V='se',V5H='as',R6V='dit',q4V='own',t7V='ocus',R3V='anel',I4H='tn',f5H='it',O1H='ne',K7H='las',N6H='ol',G0H='on',M0H='nel',p2H='> ',e4V='co',K4H='yl',s7H='ate',J8V='loat',e6V='pla',w0V='tyl',L4H='_toda',I1V='jump',d0H='me',x1V='mI',w1H='omO',J0H='z',H7V='ze',U0V=';"><',t9V='px',e9H='2',x7V='contro',B1V=(13.60E1>=(131,10.61E2)?(0x75,"i"):(64.,121)<(2.89E2,143)?(37.,'_'):(1.281E3,125.)<97?(50.,'i'):(96.7E1,83.30E1)),W8V='rt',B7V='ha',g9H='is',R9H='_y',Z6V='ssha',s4V='x_cro',N1H='hai',A6V='cro',v3V='tx_',M3V='v',j7V=';"></',v9V='spl',A5V='sshair_x',h9V='ro',z1V='_c',K6H='air',Q7V='oss',G9H='tx_c',U9H='ss',O0V='>)</',t4V='k',g3V='ig',g5H='eText',y7H='M',L9H='ou',o7V='ck',Q9H='igh',L5H='">',P9V='teText',x2H='el',P3V='ouseD',y8V='><',G4H='>(</',A7H='ons',k1V='uct',k9H='st',z6H='In',k4H='let',Y1H='D',K3V='u',z7H='></',o6V=';</',l7H='">&',E1H='lass',V3V='"><',K2H='ay',d7V='h',x9H='yTras',r0V='verl',h2V='=""><',h1H='lick',B1H='C',j8V='ht',s3V='ckyRig',m6V='> <',E9V='"></',m9H='er',p8V='nt',A3V=(0x8A>=(0x116,11.60E1)?(0x24B,'I'):(0x1E1,40)),X2H='cky',d8V='S',N9H='"> <',p6H='ky',x3V='Sti',h0H='iv',T9V='pan',L0V='0p',C6H=((120,0xCF)<(25.,2.16E2)?(6.310E2,'1'):(0x223,85.4E1)),F2H=':',x2V=(98<(6.,19)?(9.620E2,"k"):137.8E1<(107.,1.0E1)?'k':2.29E2>(85.80E1,103.)?(1.69E2,'f'):(76.60E1,42.)),W6H='in',D7V='g',W7H='r',A1V='m',V2V='; ',P5V='pl',Z0V='ce',Y4H='n_',F4V='o',H0H='notati',R1V='_a',m9V='tx',o0H='la',X1H='>',B9H='an',s7V='</',m2V='e',V6H='av',u9V=';">',d9V='one',S6V=': ',q1H='y',i0V='a',q7H='p',u4V='i',x0V='d',P2V='le',S9V='ty',e5H='" ',v5V='ave',z5H='_s',D2H='atio',E0H='nno',Z8V='x_a',M1V='b',c5H='-',H1H=((75,0x242)>(6.,46.5E1)?(101.4E1,'x'):(20.0E1,0x55)>0x114?97.:22>=(0x1F3,0xFD)?32.:(121,7.45E2)),E3V='t',u6V='="',k5V='ass',K4V='l',k0V=((0x17,0x1DA)>(149.,123)?(125.,'c'):0x12>=(14.44E2,0x15E)?(68.,87.7E1):(8.68E2,0x1AA)>(0x10D,0x1F8)?(8.94E2,"0px"):(88.,65.)),S2V=' ',W4V='n',W3V='pa',f7H='s',y2H='<',q5V=null,V=function(u){STX.Comparison.mouseHasMoved=u;}
,K=function(T){STXChart.CANDLEEVEN=T;}
,A=function(Z){STXChart.CANDLEDOWN=Z;}
,Y=function(G){STXChart.CANDLEUP=G;}
,H=function(E){STXChart.CLOSEEVEN=E;}
,D=function(Q){STXChart.CLOSEDOWN=Q;}
,L=function(S){STXChart.CLOSEUP=S;}
,U=function(B){STXChart.NONE=B;}
,P=function(F){STX.camelCaseRegExp=F;}
,plotSpline=_stxThirdParty.plotSpline,plotSplinePrimitive=_stxThirdParty.plotSplinePrimitive,timezoneJS=_stxThirdParty.timezoneJS,STX=_exports.STX,STXChart=_exports.STXChart,$$=_exports.$$,$$$=_exports.$$$;STXChart.prototype.plugins={}
;if(STX.isSurface){var C=function(k){STX.gesturePointerId=k;}
,O=function(M){STX.gesture.target=M.body;}
;STX.gesture=new MSGesture();O(document);C(q5V);}
STXChart.htmlControls={"annotationSave":(y2H+f7H+W3V+W4V+S2V+k0V+K4V+k5V+u6V+f7H+E3V+H1H+c5H+M1V+E3V+W4V+S2V+f7H+E3V+Z8V+E0H+E3V+D2H+W4V+z5H+v5V+e5H+f7H+S9V+P2V+u6V+x0V+u4V+f7H+q7H+K4V+i0V+q1H+S6V+W4V+d9V+u9V+f7H+V6H+m2V+s7V+f7H+q7H+B9H+X1H),"annotationCancel":(y2H+f7H+q7H+i0V+W4V+S2V+k0V+o0H+f7H+f7H+u6V+f7H+m9V+c5H+M1V+E3V+W4V+S2V+f7H+m9V+R1V+W4V+H0H+F4V+Y4H+k0V+i0V+W4V+Z0V+K4V+e5H+f7H+S9V+K4V+m2V+u6V+x0V+u4V+f7H+P5V+i0V+q1H+S6V+W4V+d9V+V2V+A1V+i0V+W7H+D7V+W6H+c5H+K4V+m2V+x2V+E3V+F2H+C6H+L0V+H1H+u9V+k0V+B9H+k0V+m2V+K4V+s7V+f7H+T9V+X1H),"mSticky":(y2H+x0V+h0H+S2V+u4V+x0V+u6V+A1V+x3V+k0V+p6H+N9H+f7H+W3V+W4V+S2V+u4V+x0V+u6V+A1V+d8V+E3V+u4V+X2H+A3V+p8V+m9H+u4V+F4V+W7H+E9V+f7H+W3V+W4V+m6V+f7H+q7H+B9H+S2V+u4V+x0V+u6V+A1V+d8V+E3V+u4V+s3V+j8V+B1H+h1H+e5H+k0V+K4V+i0V+f7H+f7H+h2V+f7H+W3V+W4V+S2V+u4V+x0V+u6V+F4V+r0V+i0V+x9H+d7V+B1H+B9H+e5H+k0V+o0H+f7H+f7H+u6V+f7H+E3V+H1H+c5H+M1V+E3V+W4V+e5H+f7H+S9V+K4V+m2V+u6V+x0V+u4V+f7H+q7H+K4V+K2H+F2H+W4V+F4V+W4V+m2V+V3V+f7H+T9V+S2V+k0V+E1H+u6V+f7H+E3V+H1H+c5H+u4V+k0V+F4V+c5H+E3V+W7H+i0V+f7H+d7V+l7H+W4V+M1V+f7H+q7H+o6V+f7H+q7H+B9H+z7H+f7H+q7H+B9H+m6V+f7H+W3V+W4V+S2V+u4V+x0V+u6V+A1V+F4V+K3V+f7H+m2V+Y1H+m2V+k4H+m2V+z6H+k9H+W7H+k1V+u4V+A7H+V3V+f7H+q7H+B9H+G4H+f7H+q7H+B9H+y8V+f7H+W3V+W4V+S2V+u4V+x0V+u6V+A1V+P3V+x2H+m2V+P9V+L5H+W7H+Q9H+E3V+c5H+k0V+K4V+u4V+o7V+S2V+E3V+F4V+S2V+x0V+m2V+k4H+m2V+s7V+f7H+q7H+B9H+y8V+f7H+q7H+i0V+W4V+S2V+u4V+x0V+u6V+A1V+L9H+f7H+m2V+y7H+B9H+i0V+D7V+g5H+L5H+W7H+g3V+d7V+E3V+c5H+k0V+K4V+u4V+k0V+t4V+S2V+E3V+F4V+S2V+A1V+B9H+i0V+D7V+m2V+s7V+f7H+q7H+i0V+W4V+y8V+f7H+W3V+W4V+O0V+f7H+q7H+B9H+z7H+f7H+q7H+B9H+z7H+f7H+q7H+i0V+W4V+z7H+x0V+h0H+X1H),"crossX":(y2H+x0V+h0H+S2V+k0V+K4V+i0V+U9H+u6V+f7H+G9H+W7H+Q7V+d7V+K6H+S2V+f7H+m9V+z1V+h9V+A5V+e5H+f7H+S9V+P2V+u6V+x0V+u4V+v9V+i0V+q1H+S6V+W4V+F4V+W4V+m2V+j7V+x0V+h0H+X1H),"crossY":(y2H+x0V+u4V+M3V+S2V+k0V+o0H+f7H+f7H+u6V+f7H+v3V+A6V+f7H+f7H+N1H+W7H+S2V+f7H+E3V+s4V+Z6V+u4V+W7H+R9H+e5H+f7H+S9V+P2V+u6V+x0V+g9H+q7H+K4V+K2H+S6V+W4V+F4V+W4V+m2V+j7V+x0V+h0H+X1H),"chartControls":(y2H+x0V+u4V+M3V+S2V+k0V+o0H+U9H+u6V+f7H+m9V+z1V+B7V+W8V+B1V+x7V+K4V+f7H+e5H+f7H+S9V+P2V+u6V+x0V+u4V+v9V+K2H+S6V+W4V+d9V+V2V+M1V+F4V+E3V+E3V+F4V+A1V+S6V+e9H+e9H+t9V+U0V+x0V+h0H+S2V+u4V+x0V+u6V+k0V+d7V+i0V+W8V+d8V+u4V+H7V+V3V+f7H+T9V+S2V+u4V+x0V+u6V+J0H+F4V+w1H+K3V+E3V+e5H+k0V+K4V+i0V+f7H+f7H+u6V+f7H+E3V+H1H+c5H+J0H+F4V+F4V+A1V+c5H+F4V+K3V+E3V+E9V+f7H+q7H+i0V+W4V+y8V+f7H+q7H+B9H+S2V+u4V+x0V+u6V+J0H+F4V+F4V+x1V+W4V+e5H+k0V+K4V+i0V+U9H+u6V+f7H+E3V+H1H+c5H+J0H+F4V+F4V+A1V+c5H+u4V+W4V+E9V+f7H+q7H+B9H+z7H+x0V+h0H+z7H+x0V+h0H+X1H),"home":(y2H+x0V+u4V+M3V+S2V+u4V+x0V+u6V+d7V+F4V+d0H+e5H+k0V+E1H+u6V+f7H+m9V+B1V+I1V+L4H+q1H+S2V+d7V+F4V+d0H+e5H+f7H+w0V+m2V+u6V+x0V+g9H+e6V+q1H+F2H+W4V+F4V+W4V+m2V+V3V+f7H+W3V+W4V+z7H+f7H+q7H+B9H+z7H+x0V+h0H+X1H),"floatDate":(y2H+x0V+u4V+M3V+S2V+k0V+o0H+f7H+f7H+u6V+f7H+m9V+c5H+x2V+J8V+c5H+x0V+s7H+e5H+f7H+E3V+K4H+m2V+u6V+x0V+u4V+f7H+e6V+q1H+S6V+W4V+F4V+W4V+m2V+j7V+x0V+u4V+M3V+X1H),"handleTemplate":(y2H+x0V+h0H+S2V+k0V+E1H+u6V+f7H+E3V+H1H+c5H+u4V+e4V+c5H+d7V+B9H+x0V+P2V+e5H+f7H+S9V+K4V+m2V+u6V+x0V+u4V+f7H+q7H+K4V+K2H+S6V+W4V+F4V+W4V+m2V+U0V+f7H+q7H+B9H+z7H+f7H+q7H+i0V+W4V+z7H+x0V+u4V+M3V+p2H),"iconsTemplate":(y2H+x0V+u4V+M3V+S2V+k0V+E1H+u6V+f7H+m9V+c5H+q7H+i0V+M0H+c5H+k0V+G0H+E3V+W7H+N6H+V3V+x0V+u4V+M3V+S2V+k0V+K7H+f7H+u6V+f7H+E3V+H1H+c5H+q7H+i0V+O1H+K4V+c5H+E3V+f5H+K4V+m2V+E9V+x0V+u4V+M3V+y8V+x0V+u4V+M3V+S2V+k0V+E1H+u6V+f7H+m9V+c5H+M1V+I4H+c5H+q7H+i0V+O1H+K4V+V3V+f7H+q7H+i0V+W4V+S2V+k0V+K4V+i0V+U9H+u6V+f7H+m9V+c5H+u4V+k0V+F4V+c5H+K3V+q7H+E9V+f7H+W3V+W4V+z7H+x0V+h0H+y8V+x0V+h0H+S2V+k0V+o0H+U9H+u6V+f7H+E3V+H1H+c5H+M1V+E3V+W4V+c5H+q7H+R3V+V3V+f7H+q7H+B9H+S2V+k0V+K7H+f7H+u6V+f7H+E3V+H1H+c5H+u4V+e4V+c5H+x2V+t7V+E9V+f7H+T9V+z7H+x0V+u4V+M3V+y8V+x0V+u4V+M3V+S2V+k0V+E1H+u6V+f7H+m9V+c5H+M1V+I4H+c5H+q7H+B9H+m2V+K4V+V3V+f7H+q7H+B9H+S2V+k0V+K4V+k5V+u6V+f7H+m9V+c5H+u4V+k0V+F4V+c5H+x0V+q4V+E9V+f7H+W3V+W4V+z7H+x0V+u4V+M3V+y8V+x0V+h0H+S2V+k0V+K4V+i0V+f7H+f7H+u6V+f7H+E3V+H1H+c5H+M1V+I4H+c5H+q7H+B9H+m2V+K4V+V3V+f7H+q7H+i0V+W4V+S2V+k0V+o0H+f7H+f7H+u6V+f7H+E3V+H1H+c5H+u4V+e4V+c5H+m2V+R6V+E9V+f7H+W3V+W4V+z7H+x0V+u4V+M3V+y8V+x0V+u4V+M3V+S2V+k0V+o0H+f7H+f7H+u6V+f7H+E3V+H1H+c5H+M1V+E3V+W4V+c5H+q7H+B9H+m2V+K4V+V3V+f7H+q7H+B9H+S2V+k0V+K7H+f7H+u6V+f7H+m9V+c5H+u4V+k0V+F4V+c5H+k0V+K4V+F4V+f7H+m2V+E9V+f7H+W3V+W4V+z7H+x0V+h0H+z7H+x0V+h0H+X1H),"baselineHandle":(y2H+x0V+h0H+S2V+k0V+K4V+V5H+f7H+u6V+f7H+E3V+H1H+c5H+M1V+i0V+L2V+c9V+c5H+d7V+J5H+S2V+x2V+i0V+e5H+f7H+E3V+K4H+m2V+u6V+x0V+u4V+f7H+q7H+K4V+i0V+q1H+S6V+W4V+G0H+m2V+j7V+x0V+u4V+M3V+X1H),}
;STXChart.prototype.registerHTMLElements=function(){var v1V="DIV",T4V="chartControls",d5V="undefi",c=this.chart.container;for(var control in STXChart.htmlControls){if(typeof this.chart[control]==(d5V+q9V+e1H+Q1H)&&typeof this.controls[control]==J9H){if(!this.allowZoom&&v4W.J(control,T4V))continue;var el=$$$(f5V+control,c);if(el){this.chart[control]=el;this.controls[control]=el;}
else{var rawHTML=STXChart.htmlControls[control],div=document.createElement(v1V);div.innerHTML=rawHTML;el=div.firstChild;c.appendChild(el);this.chart[control]=el;this.controls[control]=el;el.id=control;}
}
}
if(this.controls.chartControls){var zoomIn=$$$(T5V,this.controls.chartControls),zoomOut=$$$(H3V,this.controls.chartControls);STX.safeClickTouch(zoomIn,(function(self){return function(e){self.zoomIn();e.stopPropagation();}
;}
)(this));STX.safeClickTouch(zoomOut,(function(self){return function(e){self.zoomOut();e.stopPropagation();}
;}
)(this));if(!STX.touchDevice){zoomIn.onmouseover=(function(self){return function(e){self.modalBegin();}
;}
)(this);zoomIn.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);zoomOut.onmouseover=(function(self){return function(e){var T7H=8146854,G7V=6463374,P7V=456000393,n5V=562971197;var A8H=-n5V,d8H=P7V,j8H=v4W.j9H;for(var l8H=v4W.d9H;v4W.O8H.M8H(l8H.toString(),l8H.toString().length,G7V)!==A8H;l8H++){U(v4W.q9H);context.moveTo(x0,bottom);this.setCandleWidth(newCandleWidth,chart);this.chart.baseLegendColors.push(this.getCanvasColor(c2V));j8H+=v4W.j9H;}
if(v4W.O8H.M8H(j8H.toString(),j8H.toString().length,T7H)!==d8H){this.updateChartLoop();drawBars(param.field,param.border_color_down,param.opacity_down,i5V,q5V,shift,candleWidth);clearTimeout(this.scrollEvent);context.moveTo(xxl+paddingLeft,v4W.N4Z(start,height,paddingTop,voffset));}
self.modalBegin();}
;}
)(this);zoomOut.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);}
}
if(this.controls.home){STX.safeClickTouch(this.controls.home,(function(self){return function(e){self.home();e.stopPropagation();}
;}
)(this));if(!STX.touchDevice){this.controls.home.onmouseover=(function(self){return function(e){self.modalBegin();}
;}
)(this);this.controls.home.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);}
}
}
;P(/-([a-z])/g);STX.makeCamelCase=function(name){return name.replace(STX.camelCaseRegExp,function(g){return g[v4W.d9H].toUpperCase();}
);}
;STXChart.prototype.cloneStyle=function(styleObject){var n0V="backgroundAttachment",rc={}
,nativeCamelSupport=w1V;function capitalize(g){return g[v4W.d9H].toUpperCase();}
for(var i in styleObject){var v=styleObject[i];if(v4W.O3(i,n0V))nativeCamelSupport=i5V;if(nativeCamelSupport){if(v&&v4W.m3(v.constructor,String)&&isNaN(i)){rc[i]=v;}
}
else if(!isNaN(i)){var x=styleObject.getPropertyValue(v);if(x){v=v.split(K8V);var ii=v4W.q9H;jj=v.length;var vcc=v[v4W.q9H];while(++ii<jj){vcc+=v[ii].charAt(v4W.q9H).toUpperCase()+v[ii].slice(v4W.d9H);}
rc[vcc]=x;}
}
else{var icc=i.replace(STX.camelCaseRegExp,capitalize);rc[icc]=v;}
}
return rc;}
;STXChart.prototype.canvasStyle=function(className){var s=this.styles[className];if(!s){var div=document.createElement(r6H);div.className=className;document.body.appendChild(div);var styles=getComputedStyle(div);s=this.styles[className]=this.cloneStyle(styles);document.body.removeChild(div);if(!styles){this.styles[className]=q5V;}
}
return s;}
;STXChart.prototype.colorOrStyle=function(str){var Q0V="ren",Z5V="ns",b2V="tr",V1V="rgb(",s8V="rgba(";if(str.indexOf(f5V)!=-v4W.d9H)return str;if(str.indexOf(s8V)!=-v4W.d9H)return str;if(str.indexOf(V1V)!=-v4W.d9H)return str;if(v4W.k3(str,(b2V+P1H+Z5V+r9V+P1H+Q0V+m8V)))return str;return this.canvasStyle(str);}
;STXChart.prototype.clearStyles=function(){this.styles={}
;}
;STXChart.prototype.setStyle=function(obj,attribute,value){if(!this.styles[obj]){this.canvasStyle(obj);}
if(!this.styles[obj])this.styles[obj]={}
;this.styles[obj][STX.makeCamelCase(attribute)]=value;}
;STXChart.prototype.canvasFont=function(className,ctx){var O2H="bad css style for class ";if(!ctx)ctx=this.chart.context;var style=this.canvasStyle(className);if(!style)return ;var result=style.fontStyle+R1H+style.fontWeight+R1H+style.fontSize+R1H+style.fontFamily;if(result.indexOf(J9H)==-v4W.d9H){ctx.font=result;}
else{this.styles[className]=q5V;console.log(O2H+className);}
}
;STXChart.prototype.canvasColor=function(className,ctx){if(!ctx)ctx=this.chart.context;var style=this.canvasStyle(className);if(!style)return ;var color=style.color;if(STX.isTransparent(color))color=this.defaultColor;ctx.globalAlpha=1;ctx.fillStyle=color;ctx.strokeStyle=color;var opacity=style.opacity;if(typeof opacity!=J9H)ctx.globalAlpha=opacity;}
;STXChart.prototype.getCanvasFontSize=function(className){var x6H="12",s=this.canvasStyle(className),fs=s.fontSize;if(!fs)fs=x6H;return parseInt(STX.stripPX(fs));}
;STXChart.prototype.getCanvasColor=function(className){var s=this.canvasStyle(className);return s.color;}
;STXChart.hideDates=function(){return w1V;}
;STXChart.prototype.runPrepend=function(o,args,self){var prepends=this["prepend"+o];if(!prepends)return false;if(!self)self=this;for(var i=0;v4W.n3(i,prepends.length);i++){var rv=prepends[i].apply(self,args);if(rv)return rv;}
return false;}
;STXChart.prototype.runAppend=function(o,args,self){var appends=this["append"+o];if(!appends)return false;if(!self)self=this;for(var i=0;v4W.U3(i,appends.length);i++){var rv=appends[i].apply(self,args);if(rv)return rv;}
return false;}
;STXChart.registerDrawingTool=function(name,func){STXChart.drawingTools[name]=func;}
;STXChart.prototype.createBlock=function(left,width,top,height,className,context){if(!context)context=this.chart.context;if(typeof (height)=="undefined"){return ;}
this.canvasColor(className,context);context.fillRect(left,top,width,height);context.globalAlpha=1;}
;STXChart.prototype.changeOccurred=function(change){if(this.currentlyImporting)return ;if(this.changeCallback)this.changeCallback(this,change);}
;STXChart.prototype.setChartType=function(chartType){this.layout.chartType=chartType;if(this.displayInitialized)this.draw();this.changeOccurred(P5H);}
;STXChart.prototype.setAggregationType=function(aggregationType){this.layout.aggregationType=aggregationType;if(this.chart.canvas){this.createDataSet();this.draw();}
this.changeOccurred("layout");}
;STXChart.prototype.setChartScale=function(chartScale){var s6H="lay";if(!chartScale)chartScale="linear";this.layout.chartScale=chartScale;if(this.chart.canvas)this.draw();this.changeOccurred((s6H+z4H+m8V));}
;STXChart.prototype.setAdjusted=function(data){this.layout.adj=data;if(this.chart.canvas){this.createDataSet();this.draw();}
this.changeOccurred("layout");}
;STXChart.prototype.setVolumeUnderlay=function(data){this.layout.volumeUnderlay=data;if(this.chart.canvas)this.draw();this.changeOccurred("layout");}
;STXChart.prototype.serializeDrawings=function(){var arr=[];for(var i=0;v4W.B3(i,this.drawingObjects.length);i++){arr.push(this.drawingObjects[i].serialize());}
return arr;}
;STXChart.prototype.abortDrawings=function(){for(var i=0;v4W.D3(i,this.drawingObjects.length);i++){this.drawingObjects[i].abort(true);}
this.drawingObjects=[];}
;STXChart.prototype.reconstructDrawings=function(arr){for(var i=0;v4W.f3(i,arr.length);i++){var rep=arr[i];if(v4W.H3(rep.name,"fibonacci"))rep.name="retracement";var Factory=STXChart.drawingTools[rep.name];if(!Factory){if(STX.Drawing[rep.name]){Factory=STX.Drawing[rep.name];STXChart.registerDrawingTool(rep.name,Factory);}
}
if(Factory){var drawing=new Factory();drawing.reconstruct(this,rep);this.drawingObjects.push(drawing);}
}
}
;STXChart.prototype.clearDrawings=function(cantUndo){var q8V="vect";if(cantUndo){this.undoStamps=[];}
else{this.undoStamp();}
this.abortDrawings();this.changeOccurred((q8V+t1H));this.createDataSet();this.draw();}
;STXChart.prototype.createDrawing=function(type,parameters){var drawing=new STX.Drawing[type]();drawing.reconstruct(this,parameters);this.drawingObjects.push(drawing);this.draw();return drawing;}
;STXChart.prototype.removeDrawing=function(drawing){for(var i=0;v4W.G3(i,this.drawingObjects.length);i++){if(v4W.o3(this.drawingObjects[i],drawing)){this.drawingObjects.splice(i,1);this.changeOccurred("vector");this.draw();return ;}
}
}
;STXChart.prototype.dateFromTick=function(tick,chart,native){if(!chart)chart=this.chart;var interval=this.layout.interval,periodicity=this.layout.periodicity,l=chart.dataSet.length,dt,i;if(v4W.A3(tick,l)&&v4W.Z3(tick,0))return native?new Date(chart.dataSet[tick].DT.getTime()):chart.dataSet[tick].Date;if(v4W.s3(tick,0)){dt=chart.dataSet[0].DT;for(i=0;v4W.i3(i,3000);i++){if(-i==tick)return native?new Date(dt.getTime()):STX.yyyymmddhhmmssmmm(dt);if(!this.isDailyInterval(interval))dt=STX.LegacyMarket.prevPeriod(dt,interval,periodicity,this,null,this.dataZone);else if(v4W.u3(interval,(Q1H+P1H+W7V)))dt=STX.LegacyMarket.prevDay(dt,periodicity,this);else if(v4W.J3(interval,"week"))dt=STX.LegacyMarket.prevWeek(dt,periodicity,this);else if(v4W.W8(interval,"month"))dt=STX.LegacyMarket.prevMonth(dt,periodicity,this);}
}
else{dt=chart.dataSet[v4W.b8(l,1)].DT;for(i=0;v4W.C8(i,3000);i++){if(v4W.r8(l-1+i,tick)){return native?new Date(dt.getTime()):STX.yyyymmddhhmmssmmm(dt);}
if(!this.isDailyInterval(interval))dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);else if(v4W.p8(interval,"day"))dt=STX.LegacyMarket.nextDay(dt,periodicity,this);else if(v4W.v8(interval,"week"))dt=STX.LegacyMarket.nextWeek(dt,periodicity,this);else if(v4W.S8(interval,"month"))dt=STX.LegacyMarket.nextMonth(dt,periodicity,this);}
}
return native?new Date(dt.getTime()):STX.yyyymmddhhmmssmmm(dt);}
;STXChart.prototype.futureTick=function(mydt,chart){var mym=STX.strToDateTime(mydt).getTime(),interval=this.layout.interval,periodicity=this.layout.periodicity,dt=chart.dataSet[v4W.g8(chart.dataSet.length,1)].DT,m=dt.getTime(),ticks=0,computedPeriodicity=periodicity;if(!this.isDailyInterval(interval)){if(v4W.x8(this.layout.timeUnit,"second")){ticks=v4W.Y8((mym-m),1000);return (v4W.e8(chart.dataSet.length,1))+ticks;}
else if(v4W.j8(this.layout.timeUnit,"millisecond")){ticks=v4W.q8(mym,m);return (v4W.K8(chart.dataSet.length,1))+ticks;}
if(v4W.T8(interval,"minute"))computedPeriodicity=v4W.V8(periodicity,interval);if(v4W.X8(interval,"tick"))computedPeriodicity=this.chart.xAxis.futureTicksInterval;}
for(var i=0;v4W.R8(i,1500);i++){if(!this.isDailyInterval(interval)){if(v4W.M9(dt.getHours(),chart.beginHour)&&v4W.h9(dt.getMinutes(),chart.beginMinute)&&v4W.P9(interval,(J0V+I5V))){if(v4W.F9((mym-m)/60000,chart.minutesInSession)){dt=STX.LegacyMarket.nextDay(dt,1,this);if(v4W.a9(chart.beginHour,0)&&v4W.L9(dt.getDay(),0)){dt.setHours(15);dt.setMinutes(0);}
if(v4W.Q9(chart.beginHour,0)&&v4W.t9(dt.getDay(),1)){ticks+=Math.round(v4W.E9(9,60,computedPeriodicity));}
else{ticks+=Math.round(v4W.e9(chart.minutesInSession,computedPeriodicity));}
}
else{dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);ticks+=1;}
}
else{dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);ticks+=1;}
}
else{ticks+=1;if(v4W.j9(interval,"day"))dt=STX.LegacyMarket.nextDay(dt,periodicity,this);else if(v4W.q9(interval,"week"))dt=STX.LegacyMarket.nextWeek(dt,periodicity,this);else if(v4W.K9(interval,"month"))dt=STX.LegacyMarket.nextMonth(dt,periodicity,this);}
m=dt.getTime();if(v4W.T9(m,mym)){return (v4W.V9(chart.dataSet.length,1))+ticks;}
if(v4W.X9(mym,m)){return (v4W.R9(chart.dataSet.length,1))+ticks-1;}
}
return (v4W.M5(chart.dataSet.length,1))+ticks;}
;STXChart.prototype.pastTick=function(mydt,chart){var x8V=210,mym=STX.strToDateTime(mydt).getTime(),interval=this.layout.interval,periodicity=this.layout.periodicity,dt=chart.dataSet[v4W.q9H].DT,m=dt.getTime(),ticks=v4W.q9H,computedPeriodicity=periodicity;if(!this.isDailyInterval(interval)){if(v4W.h5(this.layout.timeUnit,q2V)){return v4W.P5((mym-m),B4V);}
else if(v4W.F5(this.layout.timeUnit,o2V)){return v4W.a5(mym,m);}
if(v4W.L5(interval,h6V))computedPeriodicity=v4W.Q5(periodicity,interval);if(v4W.t5(interval,U2H))computedPeriodicity=this.chart.xAxis.futureTicksInterval;}
for(var i=v4W.q9H;v4W.E5(i,Y5V);i++){if(!this.isDailyInterval(interval)){if(v4W.z5(dt.getHours(),chart.beginHour)&&v4W.l5(dt.getMinutes(),chart.beginMinute)&&v4W.d5(interval,U2H)){var dt2=STX.LegacyMarket.prevDay(dt,v4W.d9H,this);if(v4W.y5((dt2.getTime()-mym)/R5V,chart.minutesInSession)){dt=dt2;if(v4W.I5(chart.beginHour,v4W.q9H)){if(v4W.w5(dt.getDay(),v4W.q9H)){ticks+=Math.round(v4W.N5(i9H,L1V,computedPeriodicity));}
else{ticks+=Math.round(v4W.R5(chart.minutesInSession,computedPeriodicity));}
}
else if(v4W.M6(chart.beginHour,i9H)&&STX.LegacyMarket.isHalfDay(dt,chart.symbol)){ticks+=Math.round(v4W.h6(x8V,computedPeriodicity));}
else{ticks+=Math.round(v4W.P6(chart.minutesInSession,computedPeriodicity));}
}
else{dt=STX.LegacyMarket.prevPeriod(dt,interval,periodicity,this,q5V,this.dataZone);ticks+=v4W.d9H;}
}
else{dt=STX.LegacyMarket.prevPeriod(dt,interval,periodicity,this,q5V,this.dataZone);ticks+=v4W.d9H;}
}
else{ticks+=v4W.d9H;}
if(v4W.F6(interval,Q2H))dt=STX.LegacyMarket.prevDay(dt,periodicity,this);else if(v4W.a6(interval,x7H))dt=STX.LegacyMarket.prevWeek(dt,periodicity,this);else if(v4W.L6(interval,h5H))dt=STX.LegacyMarket.prevMonth(dt,periodicity,this);m=dt.getTime();if(v4W.Q6(m,mym)){return -ticks;}
if(v4W.t6(mym,m)){return -(ticks+v4W.d9H);}
}
return -ticks;}
;STXChart.prototype.calculateYAxisMargins=function(yAxis){yAxis.zoom=yAxis.initialMarginTop+yAxis.initialMarginBottom;yAxis.scroll=v4W.E6((yAxis.initialMarginTop-yAxis.initialMarginBottom),v4W.j9H);}
;STXChart.prototype.home=function(params){this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,"stx-drag-chart");if(typeof params!="object"){params={maintainWhitespace:params}
;}
this.cancelTouchSingleClick=true;if(!this.chart.dataSet||!this.chart.dataSet.length){this.draw();return ;}
var barsDisplayedOnScreen=Math.floor(v4W.z6(this.chart.width,this.layout.candleWidth));for(var chartName in this.charts){var chart=this.charts[chartName];chart.scroll=Math.min(barsDisplayedOnScreen+1,chart.dataSet.length);if(this.chart.allowScrollPast)chart.scroll=barsDisplayedOnScreen+1;var wsInTicks;if(params.maintainWhitespace){wsInTicks=Math.round(v4W.l6(this.preferences.whitespace,this.layout.candleWidth));this.chart.scroll-=wsInTicks;}
else if(v4W.d6(this.yaxisLabelStyle,"roundRectArrow")){var margin=3,height=this.getCanvasFontSize("stx_yaxis")+v4W.y6(margin,2),leftMargin=v4W.I6(height,2);wsInTicks=Math.round(v4W.w6(leftMargin,this.layout.candleWidth));if(v4W.N6(wsInTicks,1))chart.scroll-=wsInTicks;}
this.calculateYAxisMargins(chart.panel.yAxis);}
this.draw();}
;STXChart.prototype.tickFromDate=function(dt,chart,adj){if(!chart)chart=this.chart;if(!chart.dataSet.length)return 0;var DT=STX.strToDateTime(dt);if(!adj)adj=0;if(!STXChart.isDailyInterval(this.layout.interval))DT.setMinutes(DT.getMinutes()+adj);if(v4W.c6(chart.beginHour,0)&&!STXChart.isDailyInterval(this.layout.interval)){if(v4W.O2(DT.getHours(),0)){DT.setHours(chart.beginHour);DT.setMinutes(chart.beginMinute);DT.setSeconds(0);DT.setMilliseconds(0);}
}
var mym=DT.getTime(),m=chart.dataSet[v4W.h2(chart.dataSet.length,1)].DT.getTime();if(v4W.n2(m,mym))return this.futureTick(dt,chart);var first=chart.dataSet[0].DT.getTime();if(v4W.U2(mym,first))return this.pastTick(dt,chart);for(var i=v4W.B2(chart.dataSet.length,1);v4W.D2(i,0);i--){m=chart.dataSet[i].DT.getTime();if(v4W.f2(m,mym))return i;}
}
;STXChart.prototype.timeShiftDate=function(dt){var ms=dt.getTime();ms+=v4W.E2(this.timeZoneOffset,R5V);return new Date(ms);}
;STXChart.XAxisLabel=function(hz,grid,text){this.hz=hz;this.grid=grid;this.text=text;}
;STXChart.prototype.createXAxis=function(chart){var A1H="ly",c4V="qua",C9H="uart",a1V="eco",r5V="ll",I9H="mi";if(v4W.z2(chart.dataSegment.length,0))return null;var arguments$=[chart],axisRepresentation=this.runPrepend("createXAxis",arguments$);if(axisRepresentation)return axisRepresentation;var interval=this.layout.interval,timeUnit=this.layout.timeUnit;if(v4W.l2(interval,"tick")||v4W.q2(chart.xAxis.axisType,"ntb")||this.hasNTBAxis[this.layout.aggregationType]||v4W.s2(timeUnit,(u8V+Q9V+X9V+m4V))||v4W.i2(timeUnit,(I9H+r5V+v6V+u8V+a1V+q9V+Q1H))){return this.createTickXAxisWithDates(chart);}
if(v4W.N2(chart.xAxis.axisType,"numeric")){return this.createNumericXAxis(chart);}
var displayLetters=false,periodicity=this.layout.periodicity,candleWidth=this.layout.candleWidth,p=periodicity,isIntraday=false,isDaily=false,isWeekly=false,isMonthly=false;if(v4W.R2(interval,"week")){isWeekly=true;p=v4W.M0(5,p);}
if(v4W.h0(interval,"month")){isMonthly=true;p=v4W.P0(20,p);}
if(v4W.F0(candleWidth*(20/p),50))displayLetters=true;var i=0;chart.xaxis=[];for(;v4W.a0(i,chart.maxTicks);i++){if(chart.dataSegment[i])break;chart.xaxis.push(null);}
var dt;if(chart.dataSegment[i]){dt=chart.dataSegment[i].DT;}
else{dt=new Date();if(this.dataZone){var tzNow=STX.convertTimeZone(now,null,this.dataZone);dt=new Date(tzNow.getFullYear(),tzNow.getMonth(),tzNow.getDate(),tzNow.getHours(),tzNow.getMinutes(),tzNow.getSeconds(),tzNow.getMilliseconds());}
}
var currentDate=dt.getDate(),is24=(v4W.L0(chart.minutesInSession,1440));if(is24){if(chart.dataSegment[i]&&chart.dataSegment[i].displayDate){currentDate=chart.dataSegment[i].displayDate.getDate();}
else{currentDate=this.timeShiftDate(dt).getDate();}
}
var prevMonth=dt.getMonth(),prevYear=dt.getFullYear(),ticksPerDay=1;if(!this.isDailyInterval(interval)){isIntraday=true;if(v4W.Q0(interval,"minute"))interval=1;ticksPerDay=Math.ceil(v4W.H0(chart.minutesInSession,periodicity,interval));}
else{isDaily=true;}
var ticksPerClick=Math.round(v4W.z0(ticksPerDay,Math.ceil(ticksPerDay/Math.floor(100/candleWidth))));if(v4W.l0(ticksPerClick,1))ticksPerClick=1;var minuteBoundary=v4W.d0(ticksPerClick,periodicity,interval);if(chart.prettyXaxis){var mod=chart.prettyXaxis[v4W.s0(periodicity,interval)];if(!mod)mod=1;if(v4W.i0(minuteBoundary,mod)){minuteBoundary=v4W.u0(Math.floor((minuteBoundary+mod)/mod),mod);}
}
axisRepresentation=[];var standardBeginDay=v4W.J0(chart.beginHour,60)+chart.beginMinute,prices;candleWidth=this.layout.candleWidth;for(i;v4W.W1(i,chart.maxTicks);i++){var hz,text;if(!isMonthly&&v4W.b1(chart.maxTicks/ticksPerDay,(this.chart.width/this.chart.xaxisFactor))){if(v4W.P1(i,chart.dataSegment.length)){prices=chart.dataSegment[i];if(!prices)continue;if(i&&prices.leftOffset)candleWidth=v4W.F1((prices.leftOffset-prices.candleWidth/2),i);dt=prices.DT;if(chart.xAxis.useDataDate){dtShifted=dt;}
else if(prices.displayDate){dtShifted=prices.displayDate;}
else if(isIntraday){dtShifted=this.timeShiftDate(dt);}
else{dtShifted=dt;}
}
else{if(!chart.xAxis.futureTicks)break;if(isIntraday)dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);else if(isWeekly)dt=STX.LegacyMarket.nextWeek(dt,periodicity,this);else if(isMonthly)dt=STX.LegacyMarket.nextMonth(dt,periodicity,this);else if(isDaily)dt=STX.LegacyMarket.nextDay(dt,periodicity,this);if(chart.xAxis.useDataDate)dtShifted=dt;else if(isIntraday)dtShifted=this.timeShiftDate(dt);else dtShifted=dt;}
var isNextDate=v4W.a1(dt.getDate(),currentDate);if(is24)isNextDate=v4W.S1(dtShifted.getDate(),currentDate);if(isNextDate){var gridType="boundary";if(!isIntraday)gridType="line";currentDate=dt.getDate();if(is24)currentDate=dtShifted.getDate();text="";if(!STXChart.hideDates()){var y=dt.getFullYear();if(v4W.g1(y,prevYear)){prevYear=y;text=y;hz=chart.left+v4W.E1(i,candleWidth)-1;if(v4W.z1(hz,chart.right)){axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));}
}
if(chart.xAxis.formatter){text=chart.xAxis.formatter(dtShifted,gridType);}
else if(this.internationalizer){text=this.internationalizer.monthDay.format(dtShifted);}
else{text=(dtShifted.getMonth()+1)+"/"+dtShifted.getDate();}
hz=chart.left+v4W.l1(((2*i+1)*candleWidth),2)-1;if(v4W.q1(hz,chart.right)){axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));}
}
}
var minutes=v4W.s1(dt.getHours(),60)+dt.getMinutes();if(v4W.i1(this.chart.beginHour,0)||v4W.u1(dt.getDay(),0))minutes=v4W.J1(minutes,standardBeginDay);else minutes=v4W.O4(minutes,(15*60));if(is24)minutes=v4W.m4(dtShifted.getHours(),60)+dtShifted.getMinutes();if(v4W.k4(minutes%minuteBoundary,0)){hz=chart.left+v4W.n4(((2*i+1)*candleWidth),2)-1;text="";if(!STXChart.hideDates()){if(chart.xAxis.formatter){text=chart.xAxis.formatter(dtShifted,"line");}
else{text=STX.timeAsDisplay(dtShifted,this);}
}
if(v4W.U4(hz,chart.right)){axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));}
}
}
else{if(v4W.B4(i,chart.dataSegment.length)){prices=chart.dataSegment[i];if(i&&prices.leftOffset)candleWidth=v4W.D4((prices.leftOffset-prices.candleWidth/2),i);dt=prices.DT;}
else{if(!chart.xAxis.futureTicks)break;if(isIntraday)dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);else if(isWeekly)dt=STX.LegacyMarket.nextWeek(dt,periodicity,this);else if(isMonthly)dt=STX.LegacyMarket.nextMonth(dt,periodicity,this);else if(isDaily)dt=STX.LegacyMarket.nextDay(dt,periodicity,this);}
dtShifted=dt;var m=dt.getMonth(),y1=dt.getFullYear();if(v4W.f4(y1,prevYear)){prevYear=y1;hz=chart.left+(v4W.H4(i,candleWidth))-1;text="";if(!STXChart.hideDates())text=y1;axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));}
if(v4W.G4(m,prevMonth)){var doIt="monthly";if(isWeekly&&v4W.o4(chart.maxTicks*periodicity,(52*1)))doIt=(D9V+C9H+E4H+W7V);else if(isMonthly&&v4W.A4(chart.maxTicks*periodicity,(12*1)))doIt="quarterly";else if(isDaily&&v4W.Z4(chart.maxTicks*periodicity,(365*1)))doIt=(c4V+o8V+m8V+c1H+A1H);if(isWeekly&&v4W.s4(chart.maxTicks*periodicity,(52*2)))doIt="none";else if(isMonthly&&v4W.i4(chart.maxTicks*periodicity,(12*2)))doIt="none";else if(isDaily&&v4W.u4(chart.maxTicks*periodicity,(365*2)))doIt="none";if(v4W.J4(doIt,"monthly")||(v4W.W7(doIt,"quarterly")&&(v4W.b7(m,0)||v4W.C7(m,3)||v4W.r7(m,6)||v4W.p7(m,9)))){prevMonth=m;hz=chart.left+v4W.v7(((2*i+1)*candleWidth),2)-1;text="";if(!STXChart.hideDates())text=STX.monthAsDisplay(m,displayLetters,this);axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));}
}
}
var obj={DT:dtShifted,Date:STX.yyyymmddhhmm(dtShifted)}
;if(v4W.S7(i,chart.dataSegment.length))obj.data=chart.dataSegment[i];else obj.data=null;chart.xaxis.push(obj);}
this.runAppend("createXAxis",arguments$);return axisRepresentation;}
;STXChart.prototype.drawXAxis=function(chart,axisRepresentation){var E6V="bo",c5V="ary",x9V="ound",Z5H="id",s5H="id_dark",z0V="_gr",arguments$=[chart,axisRepresentation];if(this.runPrepend("drawXAxis",arguments$))return ;if(!axisRepresentation)return ;var priorBoundary=null,context=this.chart.context;this.canvasFont("stx_xaxis");context.textAlign="center";context.textBaseline="middle";var obj;for(var j=0;v4W.g7(j,axisRepresentation.length);j++){obj=axisRepresentation[j];var w=context.measureText(obj.text+"   ").width,w2=Math.max(w,chart.xAxis.minimumLabelWidth);obj.hz=Math.floor(obj.hz+this.micropixels)+0.5;obj.left=v4W.x7(obj.hz,(w2/2));obj.right=obj.hz+(v4W.Y7(w2,2));obj.unpaddedRight=obj.hz+(v4W.e7(w,2));}
var plotter=new STX.Plotter();plotter.newSeries((b5V+A7V+e1H),"stroke",this.canvasStyle("stx_grid"));plotter.newSeries("boundary","stroke",this.canvasStyle((u8V+O1V+z0V+s5H)));plotter.newSeries("border","stroke",this.canvasStyle((u8V+m8V+L7V+l4H+K6V+o8V+Z5H+l4H+X0H+X9V+o8V+U1H)));var bottom=chart.panel.bottom,yAxis=chart.panel.yAxis,prevRight=-1,nextBoundaryLeft=Math.MAX_VALUE,drawBorders=chart.xAxis.displayBorder||v4W.j7(chart.xAxis.displayBorder,null);if(v4W.q7(this.axisBorders,true))drawBorders=true;if(v4W.K7(this.axisBorders,false))drawBorders=false;var b=drawBorders?v4W.T7(yAxis.bottom,0.5):yAxis.bottom,middle=v4W.V7(bottom,this.xaxisHeight/2);if(drawBorders)middle+=3;for(var nb=0;v4W.X7(nb,axisRepresentation.length);nb++){if(v4W.R7(axisRepresentation[nb].grid,(X0H+x9V+c5V))){nextBoundaryLeft=axisRepresentation[nb].left;break;}
}
var prevHz=0,count=0;for(var i=0;v4W.M3G(i,axisRepresentation.length);i++){obj=axisRepresentation[i];if(v4W.h3G(i,nb)){for(nb++;v4W.P3G(nb,axisRepresentation.length);nb++){if(v4W.F3G(axisRepresentation[nb].grid,"boundary")){nextBoundaryLeft=axisRepresentation[nb].left;break;}
}
if(v4W.a3G(nb,axisRepresentation.length)){nb=-1;nextBoundaryLeft=Math.MAX_VALUE;}
if(prevRight>-1){if(v4W.L3G(obj.left,prevRight))continue;}
}
else{if(prevRight>-1){if(v4W.Q3G(obj.left,prevRight))continue;}
if(v4W.t3G(obj.right,nextBoundaryLeft))continue;}
prevRight=obj.right;if((v4W.E3G(Math.floor(obj.unpaddedRight),this.chart.right))){count++;if(chart.xAxis.displayGridLines){plotter.moveTo(obj.grid,obj.hz,yAxis.top);plotter.lineTo(obj.grid,obj.hz,b);}
if(drawBorders){plotter.moveTo("border",obj.hz,b+0.5);plotter.lineTo("border",obj.hz,b+6);}
prevHz=obj.hz;this.canvasColor(v4W.z3G(obj.grid,"boundary")?"stx_xaxis_dark":"stx_xaxis");context.fillText(obj.text,obj.hz,middle);}
}
if(drawBorders){var bb=Math.round(yAxis.bottom)+0.5,wb=Math.round(chart.right)+0.5;plotter.moveTo("border",chart.left,bb);plotter.lineTo((E6V+o8V+Q1H+e1H+o8V),wb,bb);}
plotter.draw(context);context.textAlign="left";this.runAppend("drawXAxis",arguments$);}
;STXChart.prototype.createNumericXAxis=function(chart){axisRepresentation=[];chart.xaxis=[];for(var i=0;v4W.l3G(i,chart.maxTicks);i++){if(chart.dataSegment[i])break;chart.xaxis.push(null);}
for(var j=i;v4W.d3G(j,chart.maxTicks);j++){if(!chart.dataSegment[i])break;}
var filledScreenRatio=v4W.y3G((j-i),chart.maxTicks),idealTickSizePixels=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels,idealTicks=Math.round(v4W.I3G((this.chart.width*filledScreenRatio),idealTickSizePixels)),minMax=this.determineMinMax(chart.dataSegment,["index"]),maxPoint=minMax[1],minPoint=minMax[0],range=v4W.w3G(maxPoint,minPoint);function niceNum(range,round){var exponent,fraction,niceFraction;exponent=Math.floor(Math.log10(range));fraction=v4W.N3G(range,Math.pow(10,exponent));if(round){if(v4W.c3G(fraction,1.5))niceFraction=1;else if(v4W.O8G(fraction,3))niceFraction=2;else if(v4W.m8G(fraction,7))niceFraction=5;else niceFraction=10;}
else{if(v4W.k8G(fraction,1))niceFraction=1;else if(v4W.n8G(fraction,2))niceFraction=2;else if(v4W.U8G(fraction,5))niceFraction=5;else niceFraction=10;}
return v4W.B8G(niceFraction,Math.pow(10,exponent));}
var niceRange=niceNum(v4W.D8G(maxPoint,minPoint),false),tickSpacing=niceNum(v4W.f8G(range,(idealTicks-1)),true),niceMin=v4W.H8G(Math.floor(minPoint/tickSpacing),tickSpacing),niceMax=v4W.G8G(Math.ceil(maxPoint/tickSpacing),tickSpacing),nextLabel=niceMin;if(v4W.o8G(niceMin,minPoint))nextLabel=niceMin+tickSpacing;var hz;for(i;v4W.A8G(i,chart.maxTicks);i++){var prices=chart.dataSegment[i];if(prices){var obj={index:prices.index,data:prices}
;chart.xaxis.push(obj);if(v4W.Z8G(prices.index,nextLabel))continue;if(v4W.s8G(prices.index,nextLabel)){hz=chart.left+v4W.i8G(i,this.layout.candleWidth)+this.micropixels;}
else if(v4W.u8G(prices.index,nextLabel)){hz=chart.left+v4W.J8G(i,this.layout.candleWidth)-3+this.micropixels;}
axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",nextLabel));nextLabel+=tickSpacing;}
else{chart.xaxis.push(null);}
}
return axisRepresentation;}
;STXChart.prototype.createTickXAxisWithDates=function(chart){var w7H="[",l0H="gment",F4H="ataS",l2V="ndin",Y2H="sce",n1H="Assert",R8V="asterD",w4V="atch",p0H="ute",V1H="ndMi",G9V="hart",h0V="eck",k6H="se",K9V="ndM",F5V=" & ",e0H="H",x5H="ie",Y6H="if";if(!chart)chart=this.chart;if(!this.timeIntervalMap){this.timePossibilities=[STX.MILLISECOND,STX.SECOND,STX.MINUTE,STX.HOUR,STX.DAY,STX.MONTH,STX.YEAR];this.timeIntervalMap={}
;this.timeIntervalMap[STX.MILLISECOND]={arr:[1,2,5,10,20,50,100,250,500],minTimeUnit:0,maxTimeUnit:1000}
;this.timeIntervalMap[STX.SECOND]={arr:[1,2,5,10,15,30],minTimeUnit:0,maxTimeUnit:60}
;this.timeIntervalMap[STX.MINUTE]={arr:[1,2,5,10,15,30],minTimeUnit:0,maxTimeUnit:60}
;this.timeIntervalMap[STX.HOUR]={arr:[1,2,3,4,6,12],minTimeUnit:0,maxTimeUnit:24}
;this.timeIntervalMap[STX.DAY]={arr:[1,2,7,14],minTimeUnit:1,maxTimeUnit:32}
;this.timeIntervalMap[STX.MONTH]={arr:[1,2,3,6],minTimeUnit:1,maxTimeUnit:13}
;this.timeIntervalMap[STX.YEAR]={arr:[1,2,3,5],minTimeUnit:1,maxTimeUnit:20000000}
;this.timeIntervalMap[STX.DECADE]={arr:[10],minTimeUnit:0,maxTimeUnit:2000000}
;}
var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31],idealTickSizePixels=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels,idealTicks=v4W.W9G(this.chart.width,idealTickSizePixels);for(var x=0;v4W.b9G(x,chart.dataSegment.length);x++)if(chart.dataSegment[x])break;if(v4W.C9G(x,chart.dataSegment.length))return [];var i,timeRange=v4W.r9G(chart.dataSegment[chart.dataSegment.length-1].DT.getTime(),chart.dataSegment[x].DT.getTime());if(v4W.p9G(timeRange,14*STX.DAY)&&!STXChart.isDailyInterval(this.layout.interval)){var nextClose=null,nextCloseEpoch=0,prevEpoch=0;timeRange=0;for(i=0;v4W.v9G(i,chart.dataSegment.length);i++){var q=chart.dataSegment[i];if(!q)continue;var epoch=q.DT.getTime();if(v4W.S9G(epoch,nextCloseEpoch)){nextClose=new Date(q.DT);nextClose.setHours(chart.endHour);nextClose.setMinutes(chart.endMinute);nextCloseEpoch=nextClose.getTime();if(v4W.g9G(nextCloseEpoch,epoch)){console.log((S1V+k1H+e1H+j1V+v6V+X9V+q9V+R1H+e1H+o8V+o8V+X9V+o8V+P1V+S1V+R1H+X0H+P1H+o8V+R1H+b6V+P1H+u8V+R1H+P1H+R1H+m8V+v6V+O6H+R1H+K6V+o8V+J9V+k9V+R1H+m8V+O6V+q9V+R1H+m8V+b6V+e1H+R1H+u8V+r9V+Q9V+Y6H+x5H+Q1H+R1H+e1H+q9V+Q1H+e0H+X9V+k2H+F5V+e1H+K9V+A7V+k8V+m8V+e1H+R1H+Y6V+t1H+R1H)+this.chart.symbol+(Z2V+A6H+F8V+P1H+k6H+R1H+o1H+b6V+h0V+R1H+W7V+z4H+o8V+R1H+D9V+k8V+c0H+e1H+Y6V+u0V+R1H+X9V+o8V+R1H+u8V+S4H+R1H+o1H+b6V+P1H+o8V+m8V+w3V+e1H+q9V+Q1H+e0H+z4H+o8V+F5V+o1H+G9V+w3V+e1H+V1H+q9V+p0H+R1H+m8V+X9V+R1H+a5V+w4V+R1H+W7V+X9V+k8V+o8V+R1H+a5V+R8V+h6H+P1H));nextCloseEpoch=epoch;}
}
else{timeRange+=v4W.x9G(epoch,prevEpoch);if(v4W.Y9G(epoch-prevEpoch,0)){console.log((n1H+v6V+X9V+q9V+R1H+e1H+P4V+t1H+P1V+c2H+h6H+e4H+R1H+q9V+X9V+m8V+R1H+v6V+q9V+R1H+P1H+Y2H+l2V+K6V+R1H+X9V+o8V+Q1H+e1H+o8V+Z2V+o1H+O6V+j1V+w3V+Q1H+F4H+e1H+l0H+w7H)+i+"].DT=="+q.DT);}
}
prevEpoch=epoch;}
}
timeRange=v4W.e9G((timeRange/chart.dataSegment.length),chart.maxTicks);var msPerTick=v4W.j9G(timeRange,idealTicks);for(i=0;v4W.q9G(i,this.timePossibilities.length);i++){if(v4W.K9G(this.timePossibilities[i],msPerTick))break;}
if(v4W.T9G(i,this.timePossibilities.length)){i--;}
else{var prevUnit=this.timePossibilities[v4W.V9G(i,1)],prevMap=this.timeIntervalMap[prevUnit],prevMultiplier=prevMap.arr[v4W.X9G(prevMap.arr.length,1)];if(v4W.R9G(msPerTick-(prevUnit*prevMultiplier),this.timePossibilities[i]-msPerTick))i--;}
var timeUnit=this.timePossibilities[i];if(chart.xAxis.timeUnit)timeUnit=chart.xAxis.timeUnit;chart.xAxis.activeTimeUnit=timeUnit;var timeInterval=STX.clone(this.timeIntervalMap[timeUnit]);for(i=0;v4W.M5G(i,timeInterval.arr.length);i++){if(v4W.h5G(timeInterval.arr[i]*timeUnit,msPerTick))break;}
if(v4W.P5G(i,timeInterval.arr.length)){i--;}
else{if(v4W.F5G(msPerTick-timeInterval.arr[i-1]*timeUnit,timeInterval.arr[i]*timeUnit-msPerTick))i--;}
var timeUnitMultiplier=timeInterval.arr[i];if(chart.xAxis.timeUnitMultiplier)timeUnitMultiplier=chart.xAxis.timeUnitMultiplier;axisRepresentation=[];chart.xaxis=[];for(i=0;v4W.a5G(i,chart.maxTicks);i++){if(chart.dataSegment[i])break;chart.xaxis.push(null);}
var dtShifted=0,nextTimeUnit=timeInterval.minTimeUnit,previousTimeUnitLarge=-1,firstTick=true,candleWidth=this.layout.candleWidth;for(i;v4W.L5G(i,chart.maxTicks);i++){if(v4W.Q5G(i,chart.dataSegment.length)){prices=chart.dataSegment[i];if(prices.displayDate&&chart.xAxis.adjustTimeZone){dtShifted=prices.displayDate;}
else{dtShifted=prices.DT;}
if(i&&prices.leftOffset)candleWidth=v4W.t5G((prices.leftOffset-prices.candleWidth/2),i);}
else{var periodicity=this.layout.periodicity,interval=this.layout.interval;if(!chart.xAxis.futureTicks)break;var dt;if(dtShifted){dt=dtShifted;}
else{dt=new Date();if(this.dataZone){var tzNow=STX.convertTimeZone(now,null,this.dataZone);dt=new Date(tzNow.getFullYear(),tzNow.getMonth(),tzNow.getDate(),tzNow.getHours(),tzNow.getMinutes(),tzNow.getSeconds(),tzNow.getMilliseconds());}
}
if(v4W.E5G(interval,"day")){dt=STX.LegacyMarket.nextDay(dt,periodicity,this);}
else if(v4W.z5G(interval,"week")){dt=STX.LegacyMarket.nextWeek(dt,periodicity,this);}
else if(v4W.l5G(interval,"month")){dt=STX.LegacyMarket.nextMonth(dt,periodicity,this);}
else{dt=STX.LegacyMarket.nextPeriod(dt,interval,periodicity,this,null,this.dataZone);}
if(chart.xAxis.useDataDate)dtShifted=dt;else if(!this.isDailyInterval(interval))dtShifted=this.timeShiftDate(dt);else dtShifted=dt;}
var obj={DT:dtShifted,Date:STX.yyyymmddhhmmssmmm(dtShifted)}
;if(v4W.d5G(i,chart.dataSegment.length))obj.data=chart.dataSegment[i];else obj.data=null;chart.xaxis.push(obj);var currentTimeUnit,currentTimeUnitLarge;if(v4W.y5G(timeUnit,STX.MILLISECOND)){currentTimeUnit=dtShifted.getMilliseconds();currentTimeUnitLarge=dtShifted.getSeconds();}
else if(v4W.I5G(timeUnit,STX.SECOND)){currentTimeUnit=dtShifted.getSeconds();currentTimeUnitLarge=dtShifted.getMinutes();}
else if(v4W.w5G(timeUnit,STX.MINUTE)){currentTimeUnit=dtShifted.getMinutes();currentTimeUnitLarge=dtShifted.getHours();}
else if(v4W.N5G(timeUnit,STX.HOUR)){currentTimeUnit=dtShifted.getHours()+v4W.c5G(dtShifted.getMinutes(),60);currentTimeUnitLarge=dtShifted.getDate();}
else if(v4W.O6G(timeUnit,STX.DAY)){currentTimeUnit=dtShifted.getDate();currentTimeUnitLarge=dtShifted.getMonth()+1;}
else if(v4W.m6G(timeUnit,STX.MONTH)){currentTimeUnit=dtShifted.getMonth()+1;currentTimeUnitLarge=dtShifted.getFullYear();}
else if(v4W.k6G(timeUnit,STX.YEAR)){currentTimeUnit=dtShifted.getFullYear();currentTimeUnitLarge=dtShifted.getFullYear()+1000;}
else{currentTimeUnit=dtShifted.getFullYear();currentTimeUnitLarge=0;}
var text=null,hz;if(v4W.n6G(previousTimeUnitLarge,currentTimeUnitLarge)){if(v4W.U6G(currentTimeUnit,nextTimeUnit)){nextTimeUnit=timeInterval.minTimeUnit;}
hz=chart.left+(v4W.B6G(i,candleWidth))-1;text=null;if(v4W.D6G(timeUnit,STX.HOUR)||(v4W.f6G(timeUnit,STX.MINUTE)&&v4W.H6G(previousTimeUnitLarge,currentTimeUnitLarge))){if(chart.xAxis.formatter){text=chart.xAxis.formatter(dtShifted,"boundary",STX.DAY,1);}
else{if(this.internationalizer){text=this.internationalizer.monthDay.format(dtShifted);}
else{text=(dtShifted.getMonth()+1)+"/"+dtShifted.getDate();}
}
}
else if(v4W.G6G(timeUnit,STX.DAY)){if(v4W.o6G(previousTimeUnitLarge,currentTimeUnitLarge)){text=dtShifted.getFullYear();}
else{text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);}
}
else if(v4W.A6G(timeUnit,STX.MONTH)){text=dtShifted.getFullYear();}
if(text&&previousTimeUnitLarge!=-1){axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));}
}
if(v4W.Z6G(currentTimeUnit,nextTimeUnit)){if(v4W.s6G(nextTimeUnit,timeInterval.minTimeUnit)){if(v4W.i6G(currentTimeUnitLarge,previousTimeUnitLarge))continue;}
var labelDate=new Date(dtShifted);hz=chart.left+v4W.u6G(((2*i+1)*candleWidth),2)-1;var boundaryTimeUnit=v4W.J6G(Math.floor(currentTimeUnit/timeUnitMultiplier),timeUnitMultiplier);if(v4W.W2G(boundaryTimeUnit,currentTimeUnit)){if(v4W.b2G(this.layout.interval,"week"))boundaryTimeUnit=currentTimeUnit;else hz-=v4W.C2G(candleWidth,4);}
if(v4W.r2G(timeUnit,STX.MILLISECOND)){labelDate.setMilliseconds(boundaryTimeUnit);}
else if(v4W.p2G(timeUnit,STX.SECOND)){labelDate.setMilliseconds(0);labelDate.setSeconds(boundaryTimeUnit);}
else if(v4W.v2G(timeUnit,STX.MINUTE)){labelDate.setMilliseconds(0);labelDate.setSeconds(0);labelDate.setMinutes(boundaryTimeUnit);}
else if(v4W.S2G(timeUnit,STX.HOUR)){labelDate.setMilliseconds(0);labelDate.setSeconds(0);labelDate.setMinutes(0);labelDate.setHours(boundaryTimeUnit);}
else if(v4W.g2G(timeUnit,STX.DAY)){labelDate.setDate(Math.max(1,boundaryTimeUnit));}
else if(v4W.x2G(timeUnit,STX.MONTH)){labelDate.setDate(1);labelDate.setMonth(v4W.Y2G(boundaryTimeUnit,1));}
else if(v4W.e2G(timeUnit,STX.YEAR)){labelDate.setDate(1);labelDate.setMonth(0);}
else{labelDate.setDate(1);labelDate.setMonth(0);}
nextTimeUnit=boundaryTimeUnit+timeUnitMultiplier;if(v4W.j2G(timeUnit,STX.DAY))timeInterval.maxTimeUnit=daysInMonth[labelDate.getMonth()]+1;if(v4W.q2G(nextTimeUnit,timeInterval.maxTimeUnit))nextTimeUnit=timeInterval.minTimeUnit;previousTimeUnitLarge=currentTimeUnitLarge;if(firstTick&&v4W.K2G(boundaryTimeUnit,currentTimeUnit))continue;if(chart.xAxis.formatter){text=chart.xAxis.formatter(labelDate,"line",timeUnit,timeUnitMultiplier);}
else{if(v4W.T2G(timeUnit,STX.DAY)){text=labelDate.getDate();}
else if(v4W.V2G(timeUnit,STX.MONTH)){text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);}
else if(v4W.X2G(timeUnit,STX.YEAR)||v4W.R2G(timeUnit,STX.DECADE)){text=labelDate.getFullYear();}
else{text=STX.timeAsDisplay(labelDate,this,timeUnit);}
}
axisRepresentation.push(new STXChart.XAxisLabel(hz,(b5V+C2H),text));}
firstTick=false;}
return axisRepresentation;}
;var cached=v4W.q9H,notcached=v4W.q9H;STXChart.prototype.createYAxis=function(panel,parameters){var t4H="ion",l5V="ect",B7H="oj";if(this.runPrepend("createYAxis",arguments))return ;var chart=panel.chart,isAChart=(v4W.M0G(panel.name,chart.name));if(!parameters)parameters={}
;parameters.noChange=false;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(STXChart.enableCaching&&v4W.h0G(yAxis.high,panel.cacheHigh)&&v4W.P0G(yAxis.low,panel.cacheLow)){var leftTick=v4W.F0G(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;panel.cacheLeft=Math.min(panel.cacheLeft,leftTick);panel.cacheRight=Math.max(panel.cacheRight,rightTick);panel.cacheLeft=leftTick;panel.cacheRight=rightTick;parameters.noChange=true;cached++;}
else{panel.cacheLeft=1000000;panel.cacheRight=-1;panel.cacheHigh=yAxis.high;panel.cacheLow=yAxis.low;notcached++;}
var idealX=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels;if(yAxis.goldenRatioYAxis){if(v4W.a0G(yAxis.idealTickSizePixels,idealX/1.618))parameters.noChange=false;}
if(!parameters.noChange){var height=yAxis.height=v4W.L0G(yAxis.bottom,yAxis.top),pricePerPix=v4W.Q0G((yAxis.high-yAxis.low),(height-yAxis.zoom));if(parameters.ground&&!yAxis.semiLog){yAxis.high=(v4W.t0G(yAxis.high,yAxis.low))+v4W.E0G(yAxis.zoom,pricePerPix);yAxis.low=0;}
else{yAxis.high=yAxis.high+v4W.z0G((yAxis.zoom/2),pricePerPix)+v4W.l0G(yAxis.scroll,pricePerPix);var unadjustedLow=yAxis.low;yAxis.low=v4W.d0G(yAxis.low,(yAxis.zoom/2)*pricePerPix,yAxis.scroll*pricePerPix);if(yAxis.semiLog&&v4W.K0G(yAxis.low,0))yAxis.low=unadjustedLow;}
if(yAxis.min||v4W.T0G(yAxis.min,0))yAxis.low=yAxis.min;if(yAxis.max||v4W.V0G(yAxis.max,0))yAxis.high=yAxis.max;yAxis.shadow=v4W.X0G(yAxis.high,yAxis.low);if(yAxis.semiLog&&(!this.activeDrawing||v4W.R0G(this.activeDrawing.name,(r9V+o8V+B7H+l5V+t4H)))){yAxis.logHigh=v4W.M1G(Math.log(yAxis.high),Math.LN10);var semilow=Math.max(yAxis.low,0.000000001);yAxis.logLow=v4W.h1G(Math.log(semilow),Math.LN10);if(v4W.P1G(yAxis.low,0))yAxis.logLow=0;yAxis.logShadow=v4W.F1G(yAxis.logHigh,yAxis.logLow);}
var fontHeight;if(yAxis.goldenRatioYAxis&&isAChart){yAxis.idealTickSizePixels=v4W.a1G(idealX,1.618);if(v4W.L1G(yAxis.idealTickSizePixels,0)){fontHeight=this.getCanvasFontSize("stx_yaxis");yAxis.idealTickSizePixels=v4W.Q1G(fontHeight,5);}
}
else{if(!yAxis.idealTickSizePixels){fontHeight=this.getCanvasFontSize("stx_yaxis");if(isAChart){yAxis.idealTickSizePixels=v4W.t1G(fontHeight,5);}
else{yAxis.idealTickSizePixels=v4W.E1G(fontHeight,2);}
}
}
var idealTicks=Math.round(v4W.z1G(height,yAxis.idealTickSizePixels)),shadow=parameters.range?v4W.l1G(parameters.range[1],parameters.range[0]):yAxis.shadow;yAxis.priceTick=Math.floor(v4W.d1G(shadow,idealTicks));var n=1;for(var zz=0;v4W.y1G(zz,10);zz++){if(v4W.I1G(yAxis.priceTick,0))break;n*=10;yAxis.priceTick=v4W.w1G(Math.floor(shadow/idealTicks*n),n);}
if(v4W.N1G(zz,10))yAxis.priceTick=0.00000001;yAxis.priceTick=v4W.c1G(Math.round(shadow/idealTicks*n),n);var verticalTicks=Math.round(v4W.O4G(shadow,yAxis.priceTick));if(parameters.range&&v4W.m4G(verticalTicks,shadow)&&!yAxis.noEvenDivisorTicks){while(v4W.k4G(verticalTicks,1)){if(v4W.n4G(shadow%verticalTicks,0))break;verticalTicks--;}
yAxis.priceTick=v4W.U4G(shadow,verticalTicks);}
if(yAxis.minimumPriceTick){var yAxisPriceTick=yAxis.minimumPriceTick;fontHeight=this.getCanvasFontSize("stx_yaxis");for(var i=0;v4W.B4G(i,100);i++){var numberOfTicks=v4W.D4G(shadow,yAxisPriceTick);if(v4W.f4G(height/numberOfTicks,fontHeight*2))yAxisPriceTick+=yAxis.minimumPriceTick;else break;}
if(v4W.H4G(i,100))yAxis.priceTick=yAxisPriceTick;}
yAxis.multiplier=v4W.G4G(yAxis.height,yAxis.shadow);}
if(!this.activeDrawing||v4W.o4G(this.activeDrawing.name,"projection")){yAxis.high=this.valueFromPixel(panel.top,panel,yAxis);if(yAxis.semiLog){yAxis.logHigh=v4W.A4G(Math.log(yAxis.high),Math.LN10);var semilow2=Math.max(yAxis.low,0.00000000001);yAxis.logLow=v4W.Z4G(Math.log(semilow2),Math.LN10);yAxis.logShadow=v4W.s4G(yAxis.logHigh,yAxis.logLow);}
yAxis.shadow=v4W.i4G(yAxis.high,yAxis.low);}
yAxis.multiplier=v4W.u4G(yAxis.height,yAxis.shadow);if(!yAxis.decimalPlaces&&v4W.J4G(yAxis.decimalPlaces,0)){if(isAChart){var labelDecimalPlaces=0;for(var j=0;v4W.W7G(j,panel.yAxis.shadowBreaks.length);j++){var brk=panel.yAxis.shadowBreaks[j];if(v4W.b7G(panel.yAxis.shadow,brk[0]))labelDecimalPlaces=brk[1];}
yAxis.printDecimalPlaces=labelDecimalPlaces;}
else yAxis.printDecimalPlaces=null;}
else{yAxis.printDecimalPlaces=yAxis.decimalPlaces;}
this.runAppend("createYAxis",arguments);}
;STXChart.prototype.drawYAxis=function(panel,parameters){var G3V="order";if(!parameters)parameters={}
;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(yAxis.pretty)return this.drawYAxisPretty(panel,parameters);if(this.runPrepend(D7H,arguments))return ;if(!parameters.noDraw&&!yAxis.noDraw){if(!yAxis.yAxisPlotter||!parameters.noChange){var chart=panel.chart,isAChart=(v4W.C7G(panel.name,chart.name)&&v4W.r7G(yAxis,panel.yAxis));if(!yAxis.priceTick)return ;var shadow=yAxis.shadow;if(parameters.range){shadow=v4W.p7G(parameters.range[v4W.d9H],parameters.range[v4W.q9H]);}
var verticalTicks=v4W.v7G(shadow,yAxis.priceTick);verticalTicks=Math.round(verticalTicks);var logStart,logPriceTick;if(yAxis.semiLog){logStart=v4W.S7G(Math.log(this.valueFromPixel(yAxis.bottom,panel)),Math.LN10);logPriceTick=v4W.g7G((yAxis.logHigh-yAxis.logLow),verticalTicks);}
var textStyle=yAxis.textStyle?yAxis.textStyle:w5H;yAxis.yAxisPlotter=new STX.Plotter();yAxis.yAxisPlotter.newSeries(M0V,h2H,this.canvasStyle(P4H));yAxis.yAxisPlotter.newSeries(c3V,g0H,this.colorOrStyle(textStyle));yAxis.yAxisPlotter.newSeries((X0H+G3V),h2H,this.canvasStyle(B2H));var priceOffset=v4W.q9H,high=parameters.range?parameters.range[v4W.d9H]:yAxis.high,low=parameters.range?parameters.range[v4W.q9H]:yAxis.low,drawBorders=(v4W.x7G(yAxis.displayBorder,q5V)?chart.panel.yAxis.displayBorder:yAxis.displayBorder);if(v4W.Y7G(this.axisBorders,w1V))drawBorders=w1V;if(v4W.e7G(this.axisBorders,i5V))drawBorders=i5V;var edgeOfAxis,position=(v4W.j7G(yAxis.position,q5V)?chart.panel.yAxis.position:yAxis.position);if(v4W.q7G(position,A2V)){edgeOfAxis=yAxis.left+yAxis.width;}
else{edgeOfAxis=yAxis.left;}
var borderEdge=Math.round(edgeOfAxis)+J4H,tickWidth=drawBorders?v4W.l9H:v4W.q9H;if(v4W.K7G(position,A2V))tickWidth=drawBorders?-v4W.l9H:v4W.q9H;if(isAChart)if(v4W.T7G(yAxis.shadow,v4W.d9H)){priceOffset=v4W.V7G(((parseInt(low/yAxis.priceTick)+v4W.d9H)*yAxis.priceTick),low);}
else{priceOffset=v4W.X7G(yAxis.priceTick,Math.round((low%yAxis.priceTick)*panel.chart.roundit)/panel.chart.roundit);}
else priceOffset=v4W.R7G(high,yAxis.priceTick);var fontHeight=this.getCanvasFontSize(w5H);for(var i=v4W.q9H;v4W.M3Y(i,verticalTicks);i++){var price;if(yAxis.semiLog){var logPrice=logStart+(v4W.h3Y(i,logPriceTick));price=Math.pow(f0V,logPrice);}
else{if(isAChart)price=low+v4W.P3Y(i,yAxis.priceTick)+priceOffset;else price=v4W.F3Y(high,(i*yAxis.priceTick),priceOffset);}
var y=this.pixelFromPrice(price,panel,yAxis),y2=Math.round(y)+J4H;if(v4W.v3Y((y2+fontHeight/v4W.j9H),panel.bottom))continue;if(v4W.S3Y((y2-fontHeight/v4W.j9H),panel.top))continue;if(yAxis.displayGridLines){yAxis.yAxisPlotter.moveTo("grid",panel.left,y2);yAxis.yAxisPlotter.lineTo("grid",panel.right,y2);}
if(drawBorders){yAxis.yAxisPlotter.moveTo("border",v4W.g3Y(borderEdge,0.5),y2);yAxis.yAxisPlotter.lineTo("border",borderEdge+tickWidth,y2);}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price);}
else{price=this.formatYAxisPrice(price,panel,q5V,yAxis);}
var backgroundColor=yAxis.textBackground?this.containerColor:q5V,textXPosition=edgeOfAxis+tickWidth+v4W.l9H;if(v4W.x3Y(position,A2V)){textXPosition=yAxis.left+v4W.l9H;if(yAxis.justifyRight)textXPosition=yAxis.left+yAxis.width+tickWidth-3;}
else{if(yAxis.justifyRight)textXPosition=edgeOfAxis+yAxis.width;}
yAxis.yAxisPlotter.addText(c3V,price,textXPosition,y2,backgroundColor,q5V,fontHeight);}
if(drawBorders){var b=Math.round(yAxis.bottom)+J4H;yAxis.yAxisPlotter.moveTo("border",borderEdge,yAxis.top);yAxis.yAxisPlotter.lineTo("border",borderEdge,b);yAxis.yAxisPlotter.draw(this.chart.context,i7V);}
}
this.plotYAxisGrid(panel);}
this.runAppend(D7H,arguments);}
;STXChart.prototype.drawYAxisPretty=function(panel,parameters){var G7H="ch",V4V="io",i2V="tt",V8V="YAx";if(this.runPrepend("drawYAxis",arguments))return ;if(!parameters)parameters={}
;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(!parameters.noDraw&&!yAxis.noDraw){if(!yAxis.yAxisPlotter||!parameters.noChange){var chart=panel.chart,isAChart=(v4W.Y3Y(panel.name,chart.name)&&v4W.e3Y(yAxis,panel.yAxis));if(!yAxis.priceTick)return ;if(isNaN(yAxis.high)||isNaN(yAxis.low))return ;var shadow=yAxis.shadow;if(parameters.range){shadow=v4W.j3Y(parameters.range[1],parameters.range[0]);}
var verticalTicks=v4W.q3Y(yAxis.height,yAxis.idealTickSizePixels);verticalTicks=Math.round(verticalTicks);var textStyle=yAxis.textStyle?yAxis.textStyle:"stx_yaxis";yAxis.yAxisPlotter=new STX.Plotter();yAxis.yAxisPlotter.newSeries("grid","stroke",this.canvasStyle("stx_grid"));yAxis.yAxisPlotter.newSeries("text","fill",this.colorOrStyle(textStyle));yAxis.yAxisPlotter.newSeries("border","stroke",this.canvasStyle("stx_grid_border"));var priceOffset=0,high=parameters.range?parameters.range[1]:yAxis.high,low=parameters.range?parameters.range[0]:yAxis.low,drawBorders=(v4W.K3Y(yAxis.displayBorder,null)?chart.panel.yAxis.displayBorder:yAxis.displayBorder);if(v4W.T3Y(this.axisBorders,false))drawBorders=false;if(v4W.V3Y(this.axisBorders,true))drawBorders=true;var edgeOfAxis,position=(v4W.X3Y(yAxis.position,null)?chart.panel.yAxis.position:yAxis.position);if(v4W.R3Y(position,"left")){edgeOfAxis=yAxis.left+yAxis.width;}
else{edgeOfAxis=yAxis.left;}
var borderEdge=Math.round(edgeOfAxis)+0.5,tickWidth=drawBorders?3:0;if(v4W.M8Y(position,"left"))tickWidth=drawBorders?-3:0;var fontHeight=this.getCanvasFontSize("stx_yaxis"),increments=yAxis.increments,l=increments.length,p=0,n=1,inc=0,closest=0,pow=0,diff=Number.MAX_VALUE;for(var z=0;v4W.h8Y(z,100);z++){inc=v4W.P8Y(increments[p],Math.pow(10,pow));n=Math.floor(v4W.F8Y(shadow,inc));var newDiff=Math.abs(v4W.a8Y(verticalTicks,n));if(v4W.L8Y(newDiff,diff)){break;}
else{diff=newDiff;}
if(v4W.Q8Y(n,verticalTicks)){closest=inc;break;}
else if(v4W.t8Y(n,verticalTicks)){p++;if(v4W.E8Y(p,l)){p=0;pow++;}
}
else{p--;if(v4W.z8Y(p,0)){p=v4W.l8Y(l,1);pow--;}
}
closest=inc;}
var lowLabel=v4W.d8Y(Math.ceil(low/closest),closest),i=0;for(var zz=0;v4W.y8Y(zz,100);zz++){var price=lowLabel+v4W.I8Y(i,closest);if(v4W.w8Y(price,high))break;i++;var y=this.pixelFromPrice(price,panel,yAxis),y2=Math.round(y)+0.5;if(v4W.N8Y((y2+fontHeight/2),panel.bottom))continue;if(v4W.c8Y((y2-fontHeight/2),panel.top))continue;if(yAxis.displayGridLines){yAxis.yAxisPlotter.moveTo("grid",panel.left,y2);yAxis.yAxisPlotter.lineTo("grid",panel.right,y2);}
if(drawBorders){yAxis.yAxisPlotter.moveTo("border",v4W.O9Y(borderEdge,0.5),y2);yAxis.yAxisPlotter.lineTo("border",borderEdge+tickWidth,y2);}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price);}
else{price=this.formatYAxisPrice(price,panel,null,yAxis);}
var backgroundColor=yAxis.textBackground?this.containerColor:null,textXPosition=edgeOfAxis+tickWidth+3;if(v4W.m9Y(position,(b5V+e1H+C4H))){textXPosition=yAxis.left+3;if(yAxis.justifyRight)textXPosition=yAxis.left+yAxis.width+tickWidth-3;}
else{if(yAxis.justifyRight)textXPosition=edgeOfAxis+yAxis.width;}
yAxis.yAxisPlotter.addText("text",price,textXPosition,y2,backgroundColor,null,fontHeight);}
if(v4W.k9Y(zz,100)){console.log((Q1H+o8V+T2H+V8V+v6V+u8V+A6H+o8V+e1H+i2V+W7V+P1V+P1H+u8V+u8V+c1H+m8V+V4V+q9V+R1H+e1H+o8V+o8V+t1H+Z2V+I4V+I4V+R1H+o8V+J9V+G7H+v7H+R1H+V9V+e9V+e9V));}
if(drawBorders){var b=Math.round(yAxis.bottom)+0.5;yAxis.yAxisPlotter.moveTo("border",borderEdge,yAxis.top);yAxis.yAxisPlotter.lineTo("border",borderEdge,b);yAxis.yAxisPlotter.draw(this.chart.context,"border");}
}
this.plotYAxisGrid(panel);}
this.runAppend("drawYAxis",arguments);}
;STXChart.prototype.plotYAxisGrid=function(panel){var O2V="plotYAxisGrid";if(this.runPrepend(O2V,arguments))return ;var context=this.chart.context;panel.yAxis.yAxisPlotter.draw(context,M0V);this.runAppend(O2V,arguments);}
;STXChart.prototype.plotYAxisText=function(panel){var I1H="etic",O4V="pha";if(this.runPrepend("plotYAxisText",arguments))return ;var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;v4W.n9Y(i,arr.length);i++){var yAxis=arr[i];if(!yAxis.yAxisPlotter)continue;if(yAxis.noDraw)continue;this.canvasFont("stx_yaxis");this.canvasColor("stx_yaxis");var context=this.chart.context;context.textBaseline="middle";if(yAxis.justifyRight)context.textAlign="right";else context.textAlign="left";var fontHeight=this.getCanvasFontSize("stx_yaxis");yAxis.yAxisPlotter.draw(context,"text");context.textBaseline=(j3V+O4V+X0H+I1H);context.textAlign="left";}
this.runAppend("plotYAxisText",arguments);}
;STXChart.prototype.formatYAxisPrice=function(price,panel,requestedDecimalPlaces,yAxis){if(v4W.U9Y(price,null)||typeof price=="undefined")return "";var yax=yAxis?yAxis:panel.yAxis,decimalPlaces=requestedDecimalPlaces;if(!decimalPlaces&&v4W.B9Y(decimalPlaces,0))decimalPlaces=yax.printDecimalPlaces;if(!decimalPlaces&&v4W.D9Y(decimalPlaces,0)){if(v4W.f9Y(yax.priceTick,0.01))decimalPlaces=4;else if(v4W.H9Y(yax.priceTick,0.1))decimalPlaces=2;else if(v4W.G9Y(yax.priceTick,1))decimalPlaces=1;else decimalPlaces=0;}
if(v4W.o9Y(panel.name,panel.chart.name)){if(v4W.A9Y(yax.priceTick,100)){return STX.condenseInt(price);}
}
if(this.internationalizer){if(v4W.Z9Y(decimalPlaces,this.internationalizer.priceFormatters.length))decimalPlaces=v4W.s9Y(this.internationalizer.priceFormatters.length,1);price=this.internationalizer.priceFormatters[decimalPlaces].format(price);}
else{price=price.toFixed(decimalPlaces);}
return price;}
;STXChart.prototype.formatPrice=function(price,panel){var U3V="unde";if(!price||typeof price==(U3V+Y6V+v6V+q9V+e1H+Q1H))return "";if(!panel)panel=this.currentPanel;if(!panel)panel=this.chart.panel;if(!panel)return price;var decimalPlaces=panel.decimalPlaces;if(!decimalPlaces&&v4W.i9Y(decimalPlaces,0)){decimalPlaces=panel.chart.decimalPlaces;}
if(!decimalPlaces&&v4W.u9Y(decimalPlaces,0)){return price;}
if(this.internationalizer){if(v4W.J9Y(decimalPlaces,this.internationalizer.priceFormatters.length))decimalPlaces=v4W.W5Y(this.internationalizer.priceFormatters.length,1);price=this.internationalizer.priceFormatters[decimalPlaces].format(price);}
else{price=price.toFixed(decimalPlaces);}
return price;}
;STXChart.prototype.createCrosshairs=function(){var q6H="createCrosshairs";if(this.runPrepend(q6H,arguments))return ;if(this.controls.crossX.onmousedown)return ;this.controls.crossY.onmousedown=function(e){if(!e)e=event;if(e.preventDefault)e.preventDefault();return w1V;}
;this.controls.crossX.onmousedown=function(e){if(!e)e=event;if(e.preventDefault)e.preventDefault();return w1V;}
;this.runAppend(q6H,arguments);}
;STXChart.prototype.determineMinMax=function(quotes,fields,sum,bypassTransform){var l3V="numb",highValue=Number.MAX_VALUE*-1,lowValue=Number.MAX_VALUE,isTransform=false;for(var i=0;v4W.b5Y(i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(!bypassTransform){if(quote.transform){isTransform=true;quote=quote.transform;}
else if(isTransform)continue;}
var acc=0;for(var j=0;v4W.C5Y(j,fields.length);j++){var f=quote[fields[j]];if(!f)continue;if(typeof (f)==(l3V+e1H+o8V))f=[f];for(var v=0;v4W.r5Y(v,f.length);v++){var val=f[v];if(val||v4W.p5Y(val,0)){if(sum){acc+=val;if(v4W.v5Y(acc,highValue))highValue=acc;if(v4W.S5Y(acc,lowValue))lowValue=acc;}
else{if(v4W.g5Y(val,highValue))highValue=val;if(v4W.x5Y(val,lowValue))lowValue=val;}
}
}
}
}
if(highValue==Number.MAX_VALUE*-1)highValue=0;if(v4W.Y5Y(lowValue,Number.MAX_VALUE))lowValue=0;return [lowValue,highValue];}
;STXChart.prototype.calculateYAxisRange=function(panel,yAxis,low,high){if(v4W.e5Y(low,Number.MAX_VALUE)){low=0;high=0;}
var cheight=panel.height,newHigh=null,newLow=null;if(!yAxis.bottomOffset)yAxis.bottomOffset=this.xaxisHeight;yAxis.bottom=v4W.j5Y(panel.bottom,yAxis.bottomOffset);yAxis.top=panel.top;yAxis.height=v4W.q5Y(yAxis.bottom,yAxis.top);var verticalPad=Math.round(Math.abs(v4W.K5Y(cheight,5)));if(v4W.T5Y(cheight-Math.abs(yAxis.scroll),verticalPad)){yAxis.scroll=(v4W.V5Y(cheight,verticalPad))*(v4W.X5Y(yAxis.scroll,0)?-1:1);}
var pricePerPix=v4W.R5Y((high-low),yAxis.height);if(low||v4W.M6Y(low,0)){if(v4W.h6Y(high-low,0)){newHigh=v4W.P6Y(high,2);newLow=0;}
else{if((this.layout.semiLog||v4W.F6Y(this.layout.chartScale,(b5V+X9V+K6V)))&&newHigh){var logLow=v4W.a6Y(Math.log(low),Math.LN10),logHigh=v4W.L6Y(Math.log(high),Math.LN10);newHigh=Math.pow(10,logHigh);newLow=Math.pow(10,logLow);}
else{newHigh=high;newLow=low;}
}
yAxis.high=newHigh;yAxis.low=newLow;}
if(yAxis.max||v4W.Q6Y(yAxis.max,0))yAxis.high=yAxis.max;if(yAxis.min||v4W.t6Y(yAxis.min,0))yAxis.low=yAxis.min;yAxis.shadow=v4W.E6Y(yAxis.high,yAxis.low);if(v4W.z6Y(panel.chart.name,panel.name)&&v4W.l6Y(panel.yAxis,yAxis)){var isLogScale=(this.layout.semiLog||v4W.d6Y(this.layout.chartScale,"log"));if(panel.chart.isComparison)isLogScale=false;if(v4W.y6Y(yAxis.semiLog,isLogScale)){this.clearPixelCache();yAxis.semiLog=isLogScale;}
}
}
;STXChart.prototype.renderYAxis=function(chart){if(this.runPrepend("renderYAxis",arguments))return ;var panel=chart.panel,arr=panel.yaxisRHS.concat(panel.yaxisLHS),i;for(i=0;v4W.I6Y(i,arr.length);i++){var yAxis=arr[i],low=null,high=null;if(v4W.w6Y(panel.yAxis,yAxis)){low=chart.lowValue;high=chart.highValue;}
this.calculateYAxisRange(panel,yAxis,low,high);}
var parameters={}
;for(i=0;v4W.N6Y(i,arr.length);i++){parameters.yAxis=arr[i];this.createYAxis(panel,parameters);this.drawYAxis(panel,parameters);}
this.runAppend("renderYAxis",arguments);}
;STXChart.prototype.initializeDisplay=function(chart){var F3V="initializeDisplay",o1V="is",E4V="eD",S0V="iz";if(this.runPrepend((v6V+f9V+m8V+v6V+P1H+b5V+S0V+E4V+o1V+Z4V+v0H),arguments))return ;var fields=[];for(var field in chart.series){if(chart.series[field].parameters.shareYAxis)fields.push(field);}
var panel=chart.panel=this.panels[chart.name],minMax;if(!STXChart.chartShowsHighs(this.layout.chartType)){fields.push(X7H);minMax=this.determineMinMax(chart.dataSegment,fields);if(v4W.c6Y(this.layout.chartType,t2H)){var base=chart.baseline.actualLevel;if(chart.transformFunc)base=chart.transformFunc(this,chart,base);var diff=Math.max(v4W.O2Y(base,minMax[v4W.q9H]),v4W.m2Y(minMax[v4W.d9H],base));if(this.repositioningBaseline){minMax=[chart.lowValue,chart.highValue];}
else{minMax[v4W.q9H]=v4W.k2Y(base,diff);minMax[v4W.d9H]=base+diff;}
}
}
else{fields.push(X7H,I5H,Y3V);minMax=this.determineMinMax(chart.dataSegment,fields);}
chart.lowValue=minMax[v4W.q9H];chart.highValue=minMax[v4W.d9H];this.runAppend(F3V,arguments);}
;STXChart.prototype.computePosition=function(x,offset){var r4H="efi";if(typeof offset==(k8V+q9V+Q1H+r4H+q9V+e1H+Q1H))offset=v4W.q9H;var position=v4W.n2Y(x,this.layout.candleWidth)+offset+this.micropixels;return position;}
;STXChart.prototype.computeColor=function(open,close){if(v4W.U2Y(open,close))return S9H;if(v4W.B2Y(open,close))return U5H;return z5V;}
;STXChart.prototype.computeLength=function(high,low){var h=this.pixelFromPrice(high),l=this.pixelFromPrice(low);return v4W.D2Y(l,h);}
;STXChart.prototype.setSeriesRenderer=function(renderer){var params=renderer.params;if(this.chart.seriesRenderers[renderer.params.name])return this.chart.seriesRenderers[renderer.params.name];if(params.yAxis){this.addYAxis(this.panels[params.panel],params.yAxis);}
renderer.stx=this;this.chart.seriesRenderers[renderer.params.name]=renderer;return renderer;}
;STXChart.prototype.removeSeriesRenderer=function(renderer){for(var r in this.chart.seriesRenderers){if(v4W.f2Y(renderer.params.name,this.chart.seriesRenderers[r].params.name)){var toDelete=this.chart.seriesRenderers[renderer.params.name],yAxis=toDelete.params.yAxis,panel=this.panels[toDelete.params.panel];delete  this.chart.seriesRenderers[renderer.params.name];this.deleteYAxisIfUnused(panel,yAxis);return ;}
}
}
;STXChart.prototype.getSeriesRenderer=function(name){return this.chart.seriesRenderers[name];}
;STXChart.prototype.drawHistogram=function(params,seriesParams){var l5H="cent";if(!seriesParams||!seriesParams.length)return ;var panelName=params.panel;if(!panelName)panelName="chart";var c=this.panels[panelName];if(!c)return ;var yAxis=params.yAxis?params.yAxis:c.yAxis,b=Math.floor(yAxis.bottom)+0.5,t=Math.floor(yAxis.top)+0.5,type=params.type;if(v4W.H2Y(type,"histogram"))type=params.subtype;var quotes=this.chart.dataSegment,bordersOn=false;this.getDefaultColor();var sp;for(sp=0;v4W.G2Y(sp,seriesParams.length);sp++){bordersOn|=(seriesParams[sp].border_color_up&&!STX.isTransparent(seriesParams[sp].border_color_up));bordersOn|=(seriesParams[sp].border_color_down&&!STX.isTransparent(seriesParams[sp].border_color_down));}
if(!params.name)params.name="Data";var multiplier=yAxis.multiplier;if(!params.heightPercentage)params.heightPercentage=0.7;if(!params.widthFactor)params.widthFactor=0.8;if(!params.bindToYAxis){var histMax=0;if(!histMax){for(var i=0;v4W.o2Y(i,this.chart.maxTicks);i++){var prices=quotes[i];if(!prices)continue;var total=0;for(sp=0;v4W.A2Y(sp,seriesParams.length);sp++){if(prices[seriesParams[sp].field]){if(v4W.Z2Y(params.subtype,"stacked"))total+=prices[seriesParams[sp].field];else total=Math.max(total,prices[seriesParams[sp].field]);}
}
if(v4W.s2Y(total,histMax))histMax=total;}
if(v4W.i2Y(histMax,0)){this.watermark(panelName,(l5H+e1H+o8V),"bottom",this.translateIf(params.name+" Not Available"));return ;}
}
multiplier=v4W.u2Y((b-t),params.heightPercentage,histMax);}
var offset=0.5;if(v4W.c2Y(this.layout.candleWidth,1)||!bordersOn)offset=0;this.startClip(panelName);var context=this.chart.context,shaveOff=Math.max(0,v4W.O0Y((1-params.widthFactor),this.layout.candleWidth,2)),tops={}
,bottoms={}
,self=this,candleWidth=1;function drawBars(field,color,opacity,isBorder,isUp,shift,candleWidth){var n6V="to";if(!opacity)opacity=1;if(STX.isIE8)context.globalAlpha=0.5;else context.globalAlpha=opacity;context.beginPath();var prevTop=b+0.5,farLeft=Math.floor(v4W.h0Y(self.pixelFromBar(0,c.chart),self.layout.candleWidth/2)),prevRight=farLeft;for(var i=0;v4W.P0Y(i,quotes.length);i++){var bottom=bottoms[i];if(!bottom)bottom=b;if(v4W.F0Y(i,0))prevTop=bottom;var quote=quotes[i];if(!quote){prevTop=bottom;prevRight+=self.layout.candleWidth;continue;}
var y=v4W.a0Y(quote[field],multiplier);if(isNaN(y))continue;var myCandleWidth=self.layout.candleWidth;if(quote.candleWidth){myCandleWidth=quote.candleWidth;if(v4W.L0Y(i,0))farLeft=prevRight=Math.floor(v4W.Q0Y(self.pixelFromBar(0,c.chart),quote.candleWidth/2));}
var top=Math.min(Math.floor(v4W.t0Y(bottom,y))+0.5,bottom);if(isUp){if(v4W.E0Y(quote.Close,quote.iqPrevClose)){prevTop=top;prevRight+=myCandleWidth;continue;}
}
else{if(v4W.z0Y(quote.Close,quote.iqPrevClose)){prevTop=top;prevRight+=myCandleWidth;continue;}
}
var x0,x1,variableWidthRatio=v4W.l0Y(myCandleWidth,self.layout.candleWidth),start=prevRight+v4W.d0Y((shaveOff+shift*candleWidth),variableWidthRatio);x0=Math.round(start)+(isBorder?0:offset);x1=v4W.y0Y(Math.round(start+candleWidth*variableWidthRatio),(isBorder?0:offset));if(v4W.I0Y(x1-x0,2))x1=x0+1;if(isBorder)roundPixel=0;else roundPixel=0.5;if(v4W.w0Y(x0%1,roundPixel))x0+=0.5;if(v4W.N0Y(x1%1,roundPixel))x1+=0.5;context.moveTo(x0,bottom);if(v4W.c0Y(b,bottom)){context.lineTo(x1,bottom);}
else{context.moveTo(x1,bottom);if(isBorder&&!shaveOff){if(bottoms[i+1])context.moveTo(x1,Math.max(top,Math.min(bottom,bottoms[i+1])));}
}
context.lineTo(x1,top);context.lineTo(x0,top);if(isBorder&&shift){if(v4W.O1Y(tops[i],top)||v4W.m1Y(i,0))context.lineTo(x0,Math.min(bottom,tops[i]));}
else if(isBorder&&!shaveOff&&v4W.k1Y(type,"clustered")){if(v4W.n1Y(i,0)&&tops[v4W.U1Y(i,1)]&&v4W.B1Y(tops[i-1],top))context.lineTo(x0,Math.min(bottom,tops[v4W.D1Y(i,1)]));}
else if(isBorder&&!shaveOff){if(v4W.f1Y(prevTop,top)||v4W.H1Y(i,0))context.lineTo(x0,Math.min(bottom,prevTop));}
else{context.lineTo(x0,bottom);}
prevTop=top;prevRight+=myCandleWidth;if(v4W.G1Y(type,"clustered")||isBorder)tops[i]=top;}
if(!color)color=(P1H+k8V+n6V);if(isBorder){context.strokeStyle=v4W.o1Y(color,"auto")?self.defaultColor:color;context.stroke();}
else{context.fillStyle=v4W.A1Y(color,"auto")?self.defaultColor:color;context.fill();}
context.closePath();}
for(sp=0;v4W.Z1Y(sp,seriesParams.length);sp++){var param=seriesParams[sp];candleWidth=v4W.s1Y(this.layout.candleWidth,params.widthFactor);var shift=0;if(v4W.i1Y(type,"clustered")){shift=sp;candleWidth/=seriesParams.length;}
drawBars(param.field,param.fill_color_up,param.opacity_up,null,true,shift,candleWidth);drawBars(param.field,param.fill_color_down,param.opacity_down,null,null,shift,candleWidth);if(v4W.u1Y(this.layout.candleWidth,2)&&bordersOn){drawBars(param.field,param.border_color_up,param.opacity_up,true,true,shift,candleWidth);drawBars(param.field,param.border_color_down,param.opacity_down,true,null,shift,candleWidth);}
if(v4W.J1Y(type,"stacked"))bottoms=STX.shallowClone(tops);}
context.globalAlpha=1;this.endClip();}
;STXChart.prototype.drawHeatmap=function(params,seriesParams){if(!seriesParams||!seriesParams.length)return ;var panelName=params.panel;if(!panelName)panelName="chart";var c=this.panels[panelName];if(!c)return ;var yAxis=params.yAxis?params.yAxis:c.yAxis,b=Math.floor(yAxis.bottom)+0.5,t=Math.floor(yAxis.top)+0.5,quotes=this.chart.dataSegment;this.getDefaultColor();if(!params.name)params.name="Data";if(!params.widthFactor)params.widthFactor=1;var offset=0.5;if(v4W.W4Y(c.chart.tmpWidth,1))offset=0;var height=null,halfHeight=null,self=this,lineWidth=null;function drawCells(field,color,isBorder,widthFactor,myoffset){context.beginPath();context.fillStyle=color;context.strokeStyle=color;var t=yAxis.top,b=yAxis.bottom,myCandleWidth=v4W.b4Y(self.layout.candleWidth,widthFactor),xc=Math.floor(v4W.C4Y(self.pixelFromBar(0,c.chart),self.layout.candleWidth)),x0,x1;for(var x=0;v4W.r4Y(x,quotes.length);x++){var quote=quotes[x];if(!quote)continue;if(quote.candleWidth){if(v4W.p4Y(x,0)){xc+=self.layout.candleWidth;}
else{xc+=v4W.v4Y((quote.candleWidth+myCandleWidth/widthFactor),2);}
myCandleWidth=v4W.S4Y(quote.candleWidth,widthFactor);}
else{xc+=self.layout.candleWidth;}
x0=v4W.g4Y(xc,myCandleWidth/2,myoffset);x1=xc+v4W.H4Y(myCandleWidth,2)-myoffset;if(v4W.G4Y(x1-x0,2))x1=x0+1;if(quote.transform)quote=quote.transform;var cellValues=quote[field];if(!cellValues)continue;if(typeof cellValues=="number")cellValues=[cellValues];for(var i=0;v4W.o4Y(i,cellValues.length);i++){var v=self.pixelFromPrice(cellValues[i],c,yAxis);if(!lineWidth){var v1=self.pixelFromPrice(v4W.A4Y(cellValues[i],params.height),c,yAxis);context.lineWidth=1;height=v4W.Z4Y(v1,v);halfHeight=v4W.s4Y(height,2);lineWidth=context.lineWidth;}
if(isBorder){var tc=v+halfHeight,bc=v4W.i4Y(v,halfHeight);context.moveTo(x0,tc);context.lineTo(x0,bc);context.lineTo(x1,bc);context.lineTo(x1,tc);context.lineTo(x0,tc);}
else{context.fillRect(x0,v4W.u4Y(v,halfHeight),v4W.J4Y(x1,x0),height);}
}
}
if(isBorder)context.stroke();context.closePath();}
this.startClip(panelName);var context=this.chart.context;context.globalAlpha=params.opacity;for(var sp=0;v4W.W7Y(sp,seriesParams.length);sp++){var param=seriesParams[sp];drawCells(param.field,param.color,null,params.widthFactor,param.border_color?offset:-offset/4);if(param.border_color&&v4W.b7Y(this.layout.candleWidth,2)){drawCells(param.field,param.border_color,true,params.widthFactor,offset);}
}
context.lineWidth=1;context.globalAlpha=1;this.endClip();}
;STXChart.prototype.startClip=function(panelName,allowYAxis){if(!panelName)panelName="chart";var panel=this.panels[panelName],yAxis=panel.yAxis;this.chart.context.save();this.chart.context.beginPath();var left=panel.left,width=panel.width;if(allowYAxis){left=0;width=this.width;}
this.chart.context.rect(left,panel.top,width,yAxis.height);this.chart.context.clip();}
;STXChart.prototype.endClip=function(){this.chart.context.restore();}
;STXChart.prototype.drawCandlesHighPerformance=function(panel,fillColor,borderColor,condition){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context,t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,borderOffset=0;if(borderColor&&!STX.isTransparent(borderColor))borderOffset=0.5;var leftTick=v4W.C7Y(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;context.beginPath();context.fillStyle=fillColor;var yAxis=panel.yAxis,whitespace=v4W.r7Y(chart.tmpWidth,2),candleWidth=this.layout.candleWidth,xbase=v4W.p7Y(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;v4W.L7Y(x,quotes.length);x++){xbase+=v4W.Q7Y(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=v4W.t7Y(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=v4W.E7Y((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;if(v4W.z7Y(this.layout.chartType,"volume_candle"))whitespace=v4W.l7Y(candleWidth,2);}
if(v4W.d7Y(quote.Open,quote.Close))continue;if(v4W.y7Y(condition,STXChart.CANDLEUP)&&v4W.I7Y(quote.Open,quote.Close))continue;if(v4W.w7Y(condition,STXChart.CANDLEDOWN)&&v4W.N7Y(quote.Open,quote.Close))continue;if(v4W.c7Y(condition,STXChart.CLOSEUP)&&v4W.O3Z(quote.Close,quote.iqPrevClose))continue;if(v4W.m3Z(condition,STXChart.CLOSEDOWN)&&v4W.k3Z(quote.Close,quote.iqPrevClose))continue;if(v4W.n3Z(condition,STXChart.CLOSEEVEN)&&v4W.U3Z(quote.Close,quote.iqPrevClose))continue;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.B3Z(tick,panel.cacheLeft)||v4W.D3Z(tick,panel.cacheRight)||!cache.open){var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.f3Z((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top),c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.H3Z((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);top=Math.floor(Math.min(o,c))+borderOffset;bottom=Math.max(o,c);length=Math.floor(v4W.G3Z(bottom,top));if(v4W.o3Z(top,t)){if(v4W.A3Z(top+length,t)){cache.open=top;cache.close=top;continue;}
length-=v4W.Z3Z(t,top);top=t;}
if(v4W.s3Z(top+length,b)){length-=(top+length-b);}
length=Math.max(length,2);cache.open=top;cache.close=cache.open+length;}
if(v4W.i3Z(cache.open,b))continue;if(v4W.u3Z(cache.close,t))continue;flr_xbase=Math.floor(xbase)+0.5;var xstart=Math.floor(v4W.J3Z(flr_xbase,whitespace))+borderOffset,xend=v4W.W8Z(Math.round(flr_xbase+whitespace),borderOffset);if(v4W.b8Z(quote.Open,quote.Close)){context.moveTo(xstart,cache.open);context.lineTo(xend,cache.open);context.lineTo(xend,cache.close);context.lineTo(xstart,cache.close);context.lineTo(xstart,cache.open);}
}
context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
}
;STXChart.prototype.drawCandles=function(panel,colorFunction,isOutline){var Z1V="ranspa",chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=this.chart.context,t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,borderColor="transparent",fillColor=(m8V+Z1V+V5V+q9V+m8V),borderOffset=0;if(!STX.isTransparent(borderColor))borderOffset=0.5;var leftTick=v4W.C8Z(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,whitespace=v4W.r8Z(chart.tmpWidth,2),candleWidth=this.layout.candleWidth,xbase=v4W.p8Z(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;v4W.L8Z(x,quotes.length);x++){xbase+=v4W.Q8Z(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=v4W.t8Z(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=v4W.E8Z((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;if(v4W.z8Z(this.layout.chartType,"volume_candle"))whitespace=v4W.l8Z(candleWidth,2);}
if(!quote.Open&&v4W.d8Z(quote.Open,0))continue;if(v4W.y8Z(quote.Open,quote.Close))continue;var myColor=colorFunction(this,quote,isOutline?"outline":"solid");if(!myColor)continue;if(isOutline)borderColor=myColor;else fillColor=myColor;context.beginPath();context.fillStyle=fillColor;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.I8Z(tick,panel.cacheLeft)||v4W.w8Z(tick,panel.cacheRight)||!cache.open){var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.N8Z((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top),c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.c8Z((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);top=Math.floor(Math.min(o,c))+borderOffset;bottom=Math.max(o,c);length=Math.floor(v4W.O9Z(bottom,top));if(v4W.m9Z(top,t)){if(v4W.k9Z(top+length,t)){cache.open=top;cache.close=top;continue;}
length-=v4W.n9Z(t,top);top=t;}
if(v4W.U9Z(top+length,b)){length-=(top+length-b);}
length=Math.max(length,2);cache.open=top;cache.close=cache.open+length;}
if(v4W.B9Z(cache.open,b))continue;if(v4W.D9Z(cache.close,t))continue;flr_xbase=Math.floor(xbase)+0.5;var xstart=Math.floor(v4W.f9Z(flr_xbase,whitespace))+borderOffset,xend=v4W.H9Z(Math.round(flr_xbase+whitespace),borderOffset);if(v4W.G9Z(quote.Open,quote.Close)){context.moveTo(xstart,cache.open);context.lineTo(xend,cache.open);context.lineTo(xend,cache.close);context.lineTo(xstart,cache.close);context.lineTo(xstart,cache.open);}
if(v4W.o9Z(fillColor,"transparent"))context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
}
}
;STXChart.prototype.drawShadowsHighPerformance=function(panel,style,condition){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;context.lineWidth=1;var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,left,leftTick=v4W.A9Z(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;context.beginPath();var yAxis=panel.yAxis,candleWidth=this.layout.candleWidth,xbase=v4W.Z9Z(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;v4W.T9Z(x,quotes.length);x++){xbase+=v4W.V9Z(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=v4W.X9Z(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=v4W.R9Z((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
if(condition){if(v4W.M5Z(condition,STXChart.CANDLEUP)&&v4W.h5Z(quote.Open,quote.Close))continue;else if(v4W.P5Z(condition,STXChart.CANDLEDOWN)&&v4W.F5Z(quote.Open,quote.Close))continue;else if(v4W.a5Z(condition,STXChart.CLOSEUP)&&v4W.L5Z(quote.Close,quote.iqPrevClose))continue;else if(v4W.Q5Z(condition,STXChart.CLOSEDOWN)&&v4W.t5Z(quote.Close,quote.iqPrevClose))continue;else if(v4W.E5Z(condition,STXChart.CLOSEEVEN)&&v4W.z5Z(quote.Close,quote.iqPrevClose))continue;}
if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.l5Z(tick,panel.cacheLeft)||v4W.d5Z(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(v4W.y5Z((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(v4W.I5Z((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);var length=v4W.w5Z(bottom,top);if(v4W.N5Z(top,t)){if(v4W.c5Z(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=v4W.O6Z(t,top);top=t;}
if(v4W.m6Z(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=cache.top+length;}
if(v4W.k6Z(cache.top,b))continue;if(v4W.n6Z(cache.bottom,t))continue;var xx=Math.floor(xbase)+0.5;context.moveTo(xx,cache.top);context.lineTo(xx,cache.bottom);if(v4W.U6Z(quote.Open,quote.Close)){var offset=this.offset;if(v4W.B6Z(this.layout.chartType,"volume_candle")){offset=v4W.D6Z(candleWidth,2);}
var x0=v4W.f6Z(xx,offset),x1=xx+offset,o=Math.floor(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.H6Z((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top)+0.5;if(v4W.G6Z(o,b)&&v4W.o6Z(o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
}
this.canvasColor(style);context.stroke();}
;STXChart.prototype.drawShadows=function(panel,colorFunction){var chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=this.chart.context;context.lineWidth=1;var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,left,leftTick=v4W.A6Z(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,candleWidth=this.layout.candleWidth,xbase=v4W.Z6Z(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;v4W.T6Z(x,quotes.length);x++){xbase+=v4W.V6Z(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=v4W.X6Z(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=v4W.R6Z((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
var color=colorFunction(this,quote,"shadow");if(!color)continue;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.M2Z(tick,panel.cacheLeft)||v4W.h2Z(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(v4W.P2Z((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(v4W.F2Z((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);var length=v4W.a2Z(bottom,top);if(v4W.L2Z(top,t)){if(v4W.Q2Z(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=v4W.t2Z(t,top);top=t;}
if(v4W.E2Z(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=cache.top+length;}
if(v4W.z2Z(cache.top,b))continue;if(v4W.l2Z(cache.bottom,t))continue;var xx=Math.floor(xbase)+0.5;context.beginPath();context.moveTo(xx,cache.top);context.lineTo(xx,cache.bottom);if(v4W.d2Z(quote.Open,quote.Close)||(!quote.Open&&v4W.y2Z(quote.Open,0))){var offset=this.offset;if(v4W.I2Z(this.layout.chartType,"volume_candle")){offset=v4W.w2Z(candleWidth,2);}
var x0=v4W.N2Z(xx,offset),x1=xx+offset,o=Math.floor((yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.c2Z((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top))+0.5;if(v4W.O0Z(o,b)&&v4W.m0Z(o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
context.strokeStyle=color;context.stroke();}
}
;STXChart.prototype.scatter=function(panel){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;context.beginPath();context.lineWidth=4;var t=panel.yAxis.top,b=panel.yAxis.bottom,xbase=v4W.k0Z(panel.left,0.5*this.layout.candleWidth,this.micropixels,1);for(var x=0;v4W.p0Z(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(!quote.projection){if(quote.transform)quote=quote.transform;var scatter=[quote.Close];if(v4W.v0Z("Scatter",quote))scatter=quote.Scatter;for(var i=0;v4W.S0Z(i,scatter.length);i++){var top=this.pixelFromPrice(scatter[i],panel);if(v4W.g0Z(top,t))continue;if(v4W.x0Z(top,b))continue;context.moveTo(v4W.Y0Z(xbase,2),top);context.lineTo(xbase+2,top);}
}
}
this.canvasColor("stx_scatter_chart");context.stroke();context.closePath();context.lineWidth=1;}
;STXChart.prototype.drawKagiSquareWave=function(panel,upStyleName,downStyleName){var chart=panel.chart;this.startClip(panel.name);var quotes=chart.dataSegment,context=chart.context,upStyle=this.canvasStyle(upStyleName),downStyle=this.canvasStyle(downStyleName);this.canvasColor(upStyleName);var upColor=context.strokeStyle;this.canvasColor(downStyleName);var downColor=context.strokeStyle,upWidth=1;if(upStyle.width&&v4W.e0Z(parseInt(upStyle.width,10),25)){upWidth=Math.max(1,STX.stripPX(upStyle.width));}
var downWidth=1;if(downStyle.width&&v4W.j0Z(parseInt(downStyle.width,10),25)){downWidth=Math.max(1,STX.stripPX(downStyle.width));}
context.beginPath();var leftTick=v4W.q0Z(chart.dataSet.length,chart.scroll),yAxis=panel.yAxis,first=true,previousOpen=null,lastClose=null,trend=null,xbase=v4W.K0Z(panel.left,0.5*this.layout.candleWidth,this.micropixels,1);for(var x=0;v4W.w0Z(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.N0Z(tick,panel.cacheLeft)||v4W.c0Z(tick,panel.cacheRight)||!cache.open){cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.O1Z((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.m1Z((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);}
lastClose=cache.close;if(first){context.moveTo(Math.floor(xbase),cache.open);previousOpen=cache.open;if(v4W.k1Z(cache.close,cache.open))trend=1;else trend=-1;first=false;}
if(trend!=-1&&v4W.n1Z(cache.close,previousOpen)&&v4W.U1Z(previousOpen,cache.open)){context.lineTo(Math.floor(xbase),previousOpen);context.strokeStyle=downColor;context.lineWidth=downWidth;context.stroke();context.closePath();context.beginPath();trend=-1;context.moveTo(Math.floor(xbase),previousOpen);}
else if(v4W.B1Z(trend,1)&&v4W.D1Z(cache.close,previousOpen)&&v4W.f1Z(previousOpen,cache.open)){context.lineTo(Math.floor(xbase),previousOpen);context.strokeStyle=upColor;context.lineWidth=upWidth;context.stroke();context.closePath();context.beginPath();trend=1;context.moveTo(Math.floor(xbase),previousOpen);}
context.lineTo(Math.floor(xbase),cache.close);if(v4W.H1Z(x+1,quotes.length)){context.lineTo(Math.floor(xbase+this.layout.candleWidth),cache.close);previousOpen=cache.open;}
}
if(trend==-1||(v4W.G1Z(trend,null)&&v4W.o1Z(lastClose,previousOpen))){context.strokeStyle=upColor;context.lineWidth=upWidth;}
else{context.strokeStyle=downColor;context.lineWidth=downWidth;}
context.stroke();context.closePath();this.endClip();context.lineWidth=1;}
;STXChart.prototype.drawPointFigureChart=function(panel,style,condition){var chart=panel.chart;this.startClip(panel.name);var quotes=chart.dataSegment,context=chart.context;this.canvasColor(style);var pfstyle=this.canvasStyle(style),paddingTop=parseInt(pfstyle.paddingTop,10),paddingBottom=parseInt(pfstyle.paddingBottom,10),paddingLeft=parseInt(pfstyle.paddingLeft,10),paddingRight=parseInt(pfstyle.paddingRight,10);if(pfstyle.width&&v4W.A1Z(parseInt(pfstyle.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(pfstyle.width));}
else{context.lineWidth=2;}
context.beginPath();if(!this.chart.pandf)this.chart.pandf={"box":1,"reversal":3}
;var box=this.chart.pandf.box,leftTick=v4W.Z1Z(chart.dataSet.length,chart.scroll),yAxis=panel.yAxis,boxes,height,start,candleWidth=this.layout.candleWidth,xbase=v4W.s1Z(panel.left,candleWidth,this.micropixels,1);for(var x=0;v4W.V1Z(x,quotes.length);x++){xbase+=candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.candleWidth)candleWidth=quote.candleWidth;if(quote.transform)quote=quote.transform;if(v4W.X1Z(condition,"X")&&v4W.R1Z(quote.Open,quote.Close))continue;else if(v4W.M4Z(condition,"O")&&v4W.h4Z(quote.Open,quote.Close))continue;var cache=quote.cache,tick=leftTick+x;if(v4W.P4Z(tick,panel.cacheLeft)||v4W.F4Z(tick,panel.cacheRight)||!cache.open){cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.a4Z((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.L4Z((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);}
var xxl=Math.round(xbase),xxr=Math.round(xbase+candleWidth);boxes=Math.abs(Math.round(v4W.Q4Z((quote.Close-quote.Open),box)));height=Math.abs(v4W.t4Z((cache.open-cache.close),boxes));var voffset=v4W.E4Z(height,2);start=cache.open;for(;v4W.z4Z(boxes,0);boxes--){if(v4W.l4Z(condition,"X")){context.moveTo(xxl+paddingLeft,v4W.d4Z(start,paddingBottom,voffset));context.lineTo(v4W.K4Z(xxr,paddingRight),v4W.T4Z(start,height,paddingTop,voffset));context.moveTo(xxl+paddingLeft,v4W.N4Z(start,height,paddingTop,voffset));context.lineTo(v4W.W7Z(xxr,paddingRight),v4W.b7Z(start,paddingBottom,voffset));start-=height;}
else if(v4W.k7Z(condition,"O")){context.moveTo(v4W.n7Z((xxl+xxr),2),start+paddingTop-voffset);context.bezierCurveTo(xxr+paddingRight,start+paddingTop-voffset,xxr+paddingRight,start+height-paddingBottom-voffset,v4W.U7Z((xxl+xxr),2),start+height-paddingBottom-voffset);context.bezierCurveTo(v4W.B7Z(xxl,paddingLeft),start+height-paddingBottom-voffset,v4W.D7Z(xxl,paddingLeft),start+paddingTop-voffset,v4W.f7Z((xxl+xxr),2),start+paddingTop-voffset);start+=height;}
}
}
context.stroke();this.endClip();context.lineWidth=1;}
;STXChart.prototype.drawBarChartHighPerformance=function(panel,style,condition){var chart=panel.chart,quotes=chart.dataSegment,context=chart.context,c=this.canvasStyle(style);if(c.width&&v4W.H7Z(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
context.beginPath();var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,leftTick=v4W.G7Z(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,xbase=v4W.o7Z(panel.left,0.5*this.layout.candleWidth,this.micropixels,1),hlen=v4W.q7Z(chart.tmpWidth,2),voffset=v4W.K7Z(context.lineWidth,2);for(var x=0;v4W.T7Z(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(condition){if(v4W.V7Z(condition,STXChart.CLOSEUP)&&v4W.X7Z(quote.Close,quote.iqPrevClose))continue;else if(v4W.R7Z(condition,STXChart.CLOSEDOWN)&&v4W.M3E(quote.Close,quote.iqPrevClose))continue;else if(v4W.h3E(condition,STXChart.CLOSEEVEN)&&v4W.P3E(quote.Close,quote.iqPrevClose))continue;}
if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.F3E(tick,panel.cacheLeft)||v4W.a3E(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(v4W.L3E((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(v4W.Q3E((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);length=v4W.t3E(bottom,top);cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.E3E((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.z3E((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);if(v4W.l3E(top,t)){if(v4W.d3E(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=v4W.y3E(t,top);top=t;}
if(v4W.I3E(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=top+length;}
var xx=Math.floor(xbase)+0.5;if(v4W.w3E(cache.top,b)&&v4W.N3E(cache.bottom,t)){context.moveTo(xx,v4W.c3E(cache.top,voffset));context.lineTo(xx,cache.bottom+voffset);}
if(v4W.O8E(cache.open,t)&&v4W.m8E(cache.open,b)){context.moveTo(xx,cache.open);context.lineTo(v4W.k8E(xx,hlen),cache.open);}
if(v4W.n8E(cache.close,t)&&v4W.U8E(cache.close,b)){context.moveTo(xx,cache.close);context.lineTo(xx+hlen,cache.close);}
}
this.canvasColor(style);context.stroke();context.closePath();context.lineWidth=1;}
;STXChart.prototype.drawBarChart=function(panel,style,colorFunction){var chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=chart.context,c=this.canvasStyle(style);if(c.width&&v4W.B8E(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,leftTick=v4W.D8E(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,colors={}
,hlen=v4W.f8E(chart.tmpWidth,2),voffset=v4W.H8E(context.lineWidth,2),candleWidth=this.layout.candleWidth,xbase=v4W.G8E(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;v4W.j8E(x,quotes.length);x++){xbase+=v4W.q8E(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=v4W.K8E(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.candleWidth){xbase+=v4W.T8E((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
var color=colorFunction(this,quote);if(!color)continue;colors[color]=1;context.strokeStyle=color;context.beginPath();if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(v4W.V8E(tick,panel.cacheLeft)||v4W.X8E(tick,panel.cacheRight)||!cache.top){top=this.pixelFromPrice(quote.High,panel);bottom=this.pixelFromPrice(quote.Low,panel);length=v4W.R8E(bottom,top);cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(v4W.M9E((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(v4W.h9E((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);if(v4W.P9E(top,t)){if(v4W.F9E(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=v4W.a9E(t,top);top=t;}
if(v4W.L9E(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=top+length;}
var xx=Math.floor(xbase)+0.5;if(v4W.Q9E(cache.top,b)&&v4W.t9E(cache.bottom,t)){context.moveTo(xx,v4W.E9E(cache.top,voffset));context.lineTo(xx,cache.bottom+voffset);}
if(v4W.z9E(cache.open,t)&&v4W.l9E(cache.open,b)){context.moveTo(xx,cache.open);context.lineTo(v4W.d9E(xx,hlen),cache.open);}
if(v4W.y9E(cache.close,t)&&v4W.I9E(cache.close,b)){context.moveTo(xx,cache.close);context.lineTo(xx+hlen,cache.close);}
context.stroke();}
context.lineWidth=1;return colors;}
;STXChart.prototype.plotLineChart=function(panel,quotes,field,parameters,colorFunction){var skipProjections=false,skipTransform=false,noSlopes=false,tension=0,points=[];if(parameters){skipProjections=parameters.skipProjections;skipTransform=parameters.skipTransform;noSlopes=parameters.noSlopes;tension=parameters.tension;}
var chart=panel.chart,context=this.chart.context,first=true,yAxis=panel.yAxis,t=yAxis.top,b=yAxis.bottom,leftTick=v4W.w9E(chart.dataSet.length,chart.scroll),lastQuote=null,colors={}
,lastXY=[0,0],candleWidth=this.layout.candleWidth,xbase=v4W.N9E(panel.left,(parameters.noSlopes?1:0.5)*candleWidth,this.micropixels,1);this.startClip(panel.name);context.beginPath();for(var i=0;v4W.W5E(i,quotes.length);i++){xbase+=v4W.b5E(candleWidth,2);if(parameters.noSlopes)xbase+=v4W.C5E(candleWidth,2);candleWidth=this.layout.candleWidth;if(!parameters.noSlopes)xbase+=v4W.r5E(candleWidth,2);var quote=quotes[i];if(!quote)continue;if(skipProjections&&quote.projection)break;if(quote.candleWidth){if(!parameters.noSlopes)xbase+=v4W.p5E((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
if(!skipTransform&&quote.transform)quote=quote.transform;var x=xbase,cache=quote.cache,tick=leftTick+i;if(!quote[field]&&v4W.v5E(quote[field],0))continue;if(v4W.S5E(tick,panel.cacheLeft)||v4W.g5E(tick,panel.cacheRight)||!cache[field]){cache[field]=(yAxis.semiLog?this.pixelFromPrice(quote[field],panel):(v4W.x5E((yAxis.high-quote[field]),yAxis.multiplier))+yAxis.top);}
if(v4W.Y5E(x,panel.right))lastQuote=quote;if(v4W.e5E(i,quotes.length-1)){if(this.extendLastTick)x+=this.offset;if(parameters.lastTickOffset)x+=parameters.lastTickOffset;}
var y=cache[field],pattern=null;if(colorFunction){var color=colorFunction(this,quote);if(!color)continue;if(typeof color=="object"){pattern=color.pattern;color=color.color;}
if(v4W.j5E(context.strokeStyle,color)){if(!first){context.stroke();context.beginPath();context.moveTo(lastXY[0],lastXY[1]);}
context.strokeStyle=color;colors[color]=1;}
}
if(first){first=false;if(noSlopes||v4W.q5E(leftTick,0)){context.moveTo(i?x:0,y);if(tension){points.push(x,y);}
else{if(pattern){context.dashedLineTo(0,y,x,y,pattern);}
else{context.lineTo(x,y);}
}
}
else if(v4W.K5E(leftTick,0)){var baseline=chart.dataSet[leftTick];if(!skipTransform&&baseline.transform)baseline=baseline.transform;var y0=baseline[field];if(!y0||isNaN(y0)){context.moveTo(i?x:0,y);if(tension){points.push(x,y);}
}
else{y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):(v4W.T5E((yAxis.high-y0),yAxis.multiplier))+yAxis.top);var x0=v4W.V5E(x,candleWidth);if(pattern){context.dashedLineTo(x0,y0,x,y,pattern);}
else{context.moveTo(x0,y0);if(tension){points.push(x0,y0,x,y);}
else{context.lineTo(x,y);}
}
}
}
}
else{if(noSlopes){var quote1=quotes[v4W.X5E(i,1)];if(!quote1)continue;if(!skipTransform&&quote1.transform)quote1=quote1.transform;if(i){if(pattern){context.dashedLineTo(lastXY[0],lastXY[1],x,lastXY[1],pattern);}
else{context.lineTo(x,lastXY[1]);}
context.moveTo(x,y);}
if(v4W.R5E(i,quotes.length-1)){if(pattern){context.dashedLineTo(x,y,x+candleWidth,y,pattern);}
else{context.lineTo(x+candleWidth,y);}
}
}
else{if(pattern){context.dashedLineTo(lastXY[0],lastXY[1],x,y,pattern);}
else{if(tension){points.push(x,y);}
else{context.lineTo(x,y);}
}
}
}
lastXY=[x,y];if(v4W.M6E(i,(quotes.length-1))&&tension){points.push(x,y);plotSplinePrimitive(points,tension,context);}
}
context.stroke();this.endClip();if(parameters.label&&lastQuote){var txt;if(yAxis.priceFormatter){txt=yAxis.priceFormatter(this,panel,lastQuote[field],parameters.labelDecimalPlaces);}
else{txt=this.formatYAxisPrice(lastQuote[field],panel,parameters.labelDecimalPlaces);}
var yaxisLabelStyle=this.yaxisLabelStyle;if(panel.yAxis.yaxisLabelStyle)yaxisLabelStyle=panel.yAxis.yaxisLabelStyle;var labelcolor=v4W.h6E(yaxisLabelStyle,"noop")?context.strokeStyle:null;this.yAxisLabels.push({src:"plot","args":[panel,txt,lastQuote.cache[field],v4W.P6E(yaxisLabelStyle,"noop")?"#FFFFFF":context.strokeStyle,labelcolor]}
);}
return colors;}
;STXChart.prototype.plotMountainChart=function(panel,quotes,field,parameters){var skipProjections=false,skipTransform=false,reverse=false,tension=0,points=[];if(parameters){skipProjections=parameters.skipProjections;skipTransform=parameters.skipTransform;reverse=parameters.reverse;tension=parameters.tension;}
var chart=panel.chart,context=this.chart.context,first=true,t=panel.yAxis.top,b=panel.yAxis.bottom;this.startClip(panel.name);context.beginPath();var leftTick=v4W.F6E(chart.dataSet.length,chart.scroll),firstX=null,firstY=null,yAxis=panel.yAxis,x=0;for(var i=0;v4W.a6E(i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(skipProjections&&quote.projection)break;if(!skipTransform&&quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+i;if(v4W.L6E(tick,panel.cacheLeft)||v4W.Q6E(tick,panel.cacheRight)||!cache[field]){if(!quote[field]&&v4W.t6E(quote[field],0))continue;cache[field]=(yAxis.semiLog?this.pixelFromPrice(quote[field],panel):(v4W.E6E((yAxis.high-quote[field]),yAxis.multiplier))+yAxis.top);}
x=panel.left+v4W.z6E((i+0.5),this.layout.candleWidth)+this.micropixels-1;if(v4W.l6E(i,quotes.length-1)){if(this.extendLastTick)x+=this.offset;if(parameters.lastTickOffset)x+=parameters.lastTickOffset;}
if(v4W.d6E(firstX,null))firstX=x;var y=cache[field];if(v4W.y6E(firstY,null))firstY=y;if(first){first=false;if(v4W.I6E(leftTick,0)){context.moveTo(x,y);if(tension){points.push(x,y);}
}
else{var baseline=chart.dataSet[leftTick];if(baseline.transform)baseline=baseline.transform;var y0=baseline[field];y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):(v4W.w6E((yAxis.high-y0),yAxis.multiplier))+yAxis.top);firstX=v4W.N6E(x,this.layout.candleWidth);context.moveTo(firstX,y0);if(tension){points.push(firstX,y0,x,y);}
else{context.lineTo(x,y);}
}
}
else{if(tension){points.push(x,y);}
else{context.lineTo(x,y);}
}
if(v4W.c6E(i,(quotes.length-1))&&tension){points.push(x,y);plotSplinePrimitive(points,tension,context);}
}
context.lineTo(x,reverse?t:b);context.lineTo(firstX,reverse?t:b);if(reverse){if(v4W.O2E(firstY,t))firstY=t;}
else{if(v4W.m2E(firstY,b))firstY=b;}
context.lineTo(firstX,firstY);context.fill();context.closePath();this.endClip();}
;STXChart.prototype.drawLineChart=function(panel,style,colorFunction){var context=this.chart.context,c=this.canvasStyle(style);if(c.width&&v4W.k2E(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
this.canvasColor(style);var params={skipProjections:true}
;if(panel.chart.tension)params.tension=panel.chart.tension;if(panel.chart.lastTickOffset)params.lastTickOffset=panel.chart.lastTickOffset;var rc=this.plotLineChart(panel,panel.chart.dataSegment,"Close",params,colorFunction);context.lineWidth=1;return rc;}
;STXChart.prototype.drawMountainChart=function(panel){var I7H="Cl",context=this.chart.context,c=this.canvasStyle("stx_mountain_chart");if(c.width&&v4W.n2E(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
var top=this.pixelFromPrice(panel.chart.highValue,panel);if(isNaN(top))top=0;var backgroundColor=c.backgroundColor,color=c.color;if(color&&v4W.U2E(color,"transparent")){var gradient=context.createLinearGradient(0,top,0,panel.yAxis.bottom);gradient.addColorStop(0,backgroundColor);gradient.addColorStop(1,color);context.fillStyle=gradient;}
else{context.fillStyle=backgroundColor;}
var params={skipProjections:true}
;if(panel.chart.tension)params.tension=panel.chart.tension;if(panel.chart.lastTickOffset)params.lastTickOffset=panel.chart.lastTickOffset;this.plotMountainChart(panel,panel.chart.dataSegment,"Close",params);var strokeStyle=c.borderTopColor;if(strokeStyle&&v4W.B2E(strokeStyle,"transparent")){context.strokeStyle=strokeStyle;this.plotLineChart(panel,panel.chart.dataSegment,(I7H+p1H+e1H),params);}
context.lineWidth=1;}
;STXChart.prototype.drawWaveChart=function(panel){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;this.startClip(panel.name);context.beginPath();var first=false,reset=false,t=panel.yAxis.top,b=panel.yAxis.bottom,xbase=panel.left+Math.floor(-0.5*this.layout.candleWidth+this.micropixels);for(var i=0;v4W.D2E(i,quotes.length);i++){xbase+=this.layout.candleWidth;var quote=quotes[i];if(!quote)continue;if(quote.projection)break;if(quote.transform)quote=quote.transform;var x=v4W.f2E(xbase,3*this.layout.candleWidth/8),y=this.pixelFromPrice(quote.Open,panel);if(v4W.H2E(y,t)){y=t;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else if(v4W.G2E(y,b)){y=b;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else{reset=false;}
if(!first){first=true;var leftTick=v4W.o2E(chart.dataSet.length,chart.scroll);if(v4W.A2E(leftTick,0)){context.moveTo(x,y);}
else if(v4W.Z2E(leftTick,0)){var baseline=chart.dataSet[v4W.s2E(leftTick,1)];if(baseline.transform)baseline=baseline.transform;var y0=baseline.Close;y0=(panel.yAxis.semiLog?this.pixelFromPrice(y0,panel):(v4W.i2E((panel.yAxis.high-y0),panel.yAxis.multiplier))+t);y0=Math.min(Math.max(y0,t),b);context.moveTo(panel.left+v4W.u2E((i-1),this.layout.candleWidth)+this.micropixels,y0);context.lineTo(x,y);}
context.moveTo(x,y);}
else{context.lineTo(x,y);}
x+=v4W.J2E(this.layout.candleWidth,4);if(v4W.W0E(quote.Open,quote.Close)){y=this.pixelFromPrice(quote.Low,panel);if(v4W.b0E(y,t))y=t;if(v4W.C0E(y,b))y=b;context.lineTo(x,y);x+=v4W.r0E(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.High,panel);if(v4W.p0E(y,t))y=t;if(v4W.v0E(y,b))y=b;context.lineTo(x,y);}
else{y=this.pixelFromPrice(quote.High,panel);if(v4W.S0E(y,t))y=t;if(v4W.g0E(y,b))y=b;context.lineTo(x,y);x+=v4W.x0E(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.Low,panel);if(v4W.Y0E(y,t))y=t;if(v4W.e0E(y,b))y=b;context.lineTo(x,y);}
x+=v4W.j0E(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.Close,panel);if(v4W.q0E(y,t))y=t;if(v4W.K0E(y,b))y=b;context.lineTo(x,y);}
var c=this.canvasStyle("stx_line_chart");if(c.width&&v4W.T0E(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
this.canvasColor("stx_line_chart");context.stroke();context.closePath();this.endClip();context.lineWidth=1;}
;STXChart.prototype.updateFloatHRLabel=function(panel){var f6H="row",f9H="Ar",F7V="undRe",m7V="ro",arr=panel.yaxisLHS.concat(panel.yaxisRHS);if(this.floatCanvas.isDirty)STX.clearCanvas(this.floatCanvas,this);if(v4W.V0E(this.controls.crossX.style.display,"none"))return ;if(this.controls.crossY){var crosshairWidth=panel.width;if(v4W.X0E(this.yaxisLabelStyle,(m7V+F7V+I0H+f9H+f6H)))crosshairWidth-=7;this.controls.crossY.style.left=panel.left+"px";this.controls.crossY.style.width=crosshairWidth+"px";}
for(var i=0;v4W.R0E(i,arr.length);i++){var yAxis=arr[i],price=this.valueFromPixel(this.cy,panel,yAxis);if(isNaN(price))continue;if((panel.min||v4W.M1E(panel.min,0))&&v4W.h1E(price,panel.min))continue;if((panel.max||v4W.P1E(panel.max,0))&&v4W.F1E(price,panel.max))continue;var labelDecimalPlaces=null;if(v4W.a1E(yAxis,panel.chart.yAxis)){labelDecimalPlaces=0;if(v4W.L1E(yAxis.shadow,1000))labelDecimalPlaces=2;if(v4W.Q1E(yAxis.shadow,5))labelDecimalPlaces=4;if(yAxis.decimalPlaces||v4W.t1E(yAxis.decimalPlaces,0))labelDecimalPlaces=yAxis.decimalPlaces;}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price,yAxis);}
else{price=this.formatYAxisPrice(price,panel,labelDecimalPlaces,yAxis);}
var style=this.canvasStyle("stx-float-price");this.createYAxisLabel(panel,price,this.cy,style.backgroundColor,style.color,this.floatCanvas.context,yAxis);this.floatCanvas.isDirty=true;}
}
;STXChart.prototype.headsUpHR=function(){var j0H="headsUpHR";if(this.runPrepend(j0H,arguments))return ;var panel=this.currentPanel;if(!panel)return ;var chart=panel.chart;this.updateFloatHRLabel(panel);if(this.controls.floatDate&&!STXChart.hideDates()){var bar=this.barFromPixel(this.cx),prices=chart.xaxis[bar];if(prices&&prices.DT){if(chart.xAxis.formatter){this.controls.floatDate.innerHTML=chart.xAxis.formatter(prices.DT);}
else if(this.internationalizer){var str=this.internationalizer.monthDay.format(prices.DT);if(!STXChart.isDailyInterval(this.layout.interval))str+=R1H+this.internationalizer.hourMinute.format(prices.DT);else{str=this.internationalizer.yearMonthDay.format(prices.DT);}
this.controls.floatDate.innerHTML=str;}
else{var m=prices.DT.getMonth()+v4W.d9H;if(v4W.E1E(m,f0V))m=e9V+m;var d=prices.DT.getDate();if(v4W.z1E(d,f0V))d=e9V+d;var h=prices.DT.getHours();if(v4W.l1E(h,f0V))h=e9V+h;var mn=prices.DT.getMinutes();if(v4W.d1E(mn,f0V))mn=e9V+mn;if(STXChart.isDailyInterval(this.layout.interval))this.controls.floatDate.innerHTML=m+K8V+d+K8V+prices.DT.getFullYear();else{this.controls.floatDate.innerHTML=m+K8V+d+R1H+h+k7V+mn;var isSecond=(chart.xAxis.activeTimeUnit&&v4W.y1E(chart.xAxis.activeTimeUnit,STX.SECOND))||v4W.I1E(this.layout.timeUnit,q2V),isMS=(chart.xAxis.activeTimeUnit&&v4W.w1E(chart.xAxis.activeTimeUnit,STX.MILLISECOND))||v4W.N1E(this.layout.timeUnit,o2V);if(isSecond||isMS){var sec=prices.DT.getSeconds();if(v4W.c1E(sec,f0V))sec=e9V+sec;this.controls.floatDate.innerHTML+=(k7V+sec);if(isMS){var mil=prices.DT.getMilliseconds();if(v4W.O4E(mil,f0V))mil=e9V+mil;if(v4W.m4E(mil,o4V))mil=e9V+mil;this.controls.floatDate.innerHTML+=(k7V+mil);}
}
}
}
}
else if(prices&&prices.index){this.controls.floatDate.innerHTML=prices.index;}
else{this.controls.floatDate.innerHTML=N3V;}
}
this.runAppend(j0H,arguments);}
;STXChart.prototype.setCrosshairColors=function(){return ;}
;STXChart.prototype.magnetize=function(){var f1V="lored_bar",i1H="co",l4V="cti",g2V="proj",H6V="ze";this.magnetizedPrice=null;if(this.runPrepend((a5V+P1H+K6V+q9V+e1H+z9V+H6V),arguments))return ;if((v4W.k4E(this.currentVectorParameters.vectorType,"annotation")||v4W.n4E(this.currentVectorParameters.vectorType,"callout"))&&STXChart.drawingLine)return ;if(v4W.U4E(this.currentVectorParameters.vectorType,(g2V+e1H+l4V+X9V+q9V)))return ;if(v4W.B4E(this.currentVectorParameters.vectorType,"freeform"))return ;var panel=this.currentPanel;if(v4W.D4E(panel.name,panel.chart.name)){var chart=panel.chart,tick=this.tickFromPixel(v4W.f4E(STXChart.crosshairX,this.left),chart);if(v4W.H4E(tick,chart.dataSet.length))return ;var prices=chart.dataSet[tick];if(!prices)return ;var price=this.valueFromPixel(this.cy,panel);this.magnetizedPrice=prices.Close;if(v4W.G4E(this.layout.chartType,"bar")||v4W.o4E(this.layout.chartType,"candle")||v4W.A4E(this.layout.chartType,(i1H+f1V))||v4W.Z4E(this.layout.chartType,"hollow_candle")||v4W.s4E(this.layout.chartType,"volume_candle")){var fields=["Open","High","Low","Close"],closest=1000000000;for(var i=0;v4W.i4E(i,fields.length);i++){var fp=prices[fields[i]];if(v4W.u4E(Math.abs(price-fp),closest)){closest=Math.abs(v4W.J4E(price,fp));this.magnetizedPrice=fp;}
}
}
var x=this.pixelFromTick(tick,chart),y=this.pixelFromPrice(this.magnetizedPrice,this.currentPanel),ctx=this.chart.tempCanvas.context;ctx.beginPath();ctx.lineWidth=1;var radius=v4W.W7E(Math.max(this.layout.candleWidth,8),2);ctx.arc(x,y,radius,0,v4W.b7E(2,Math.PI),false);ctx.fillStyle="#FFFFFF";ctx.strokeStyle="#000000";ctx.fill();ctx.stroke();ctx.closePath();}
this.runAppend("magnetize",arguments);}
;STXChart.prototype.positionCrosshairsAtPointer=function(){if(!this.currentPanel)return ;var chart=this.currentPanel.chart,rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;var tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),chart);this.cy=this.backOutY(STXChart.crosshairY);this.cx=this.backOutX(STXChart.crosshairX);this.controls.crossX.style.left=(v4W.C7E(this.pixelFromTick(tick,chart),0.5))+"px";this.controls.crossY.style.top=this.backOutY(STXChart.crosshairY)+"px";this.updateChartAccessories();}
;STXChart.prototype.doDisplayCrosshairs=function(){var R5H="doDisplayCrosshairs",d4V="ir",t0V="hai",y2V="Cross",A8V="isp",f4V="oD";if(this.runPrepend((Q1H+f4V+A8V+b5V+P1H+W7V+y2V+t0V+b4V),arguments))return ;if(this.displayInitialized){if(!this.layout.crosshair&&(v4W.r7E(this.currentVectorParameters.vectorType,N3V)||!this.currentVectorParameters.vectorType)){this.undisplayCrosshairs();}
else if(STX.Drawing[this.currentVectorParameters.vectorType]&&(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.undisplayCrosshairs();}
else{if(v4W.p7E(this.controls.crossX.style.display,N3V)){this.controls.crossX.style.display=N3V;this.controls.crossY.style.display=N3V;if(this.preferences.magnet&&this.currentVectorParameters.vectorType){STX.unappendClassName(this.container,L7H);}
else{STX.appendClassName(this.container,(L1H+L7V+K8V+o1H+o8V+X9V+k1H+b6V+P1H+d4V+K8V+X9V+q9V));}
}
if(this.controls.floatDate&&!STXChart.hideDates()){this.controls.floatDate.style.display=z2H;}
}
}
this.runAppend(R5H,arguments);}
;STXChart.prototype.undisplayCrosshairs=function(){var U6H="undisplayCrosshairs";if(this.runPrepend(U6H,arguments))return ;if(this.controls.crossX){if(v4W.v7E(this.controls.crossX.style.display,H4V)){this.controls.crossX.style.display=H4V;this.controls.crossY.style.display=H4V;}
}
if(this.displayInitialized&&this.controls.floatDate){this.controls.floatDate.style.display=H4V;}
STX.unappendClassName(this.container,L7H);if(this.floatCanvas&&this.floatCanvas.isDirty)STX.clearCanvas(this.floatCanvas,this);this.runAppend(U6H,arguments);}
;STXChart.prototype.modalBegin=function(){var k7H="modal";this.openDialog=k7H;this.undisplayCrosshairs();}
;STXChart.prototype.modalEnd=function(){this.cancelTouchSingleClick=i5V;this.openDialog=N3V;this.doDisplayCrosshairs();}
;STXChart.prototype.updateChartAccessories=function(){var Q6H="updateChartAccessories";if(this.runPrepend(Q6H,arguments))return ;this.accessoryTimer=q5V;this.lastAccessoryUpdate=new Date().getTime();var floatDate=this.controls.floatDate;if(floatDate){var panel=this.currentPanel;if(!panel)panel=this.chart.panel;if(panel){var chart=panel.chart,tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),chart);floatDate.style.left=(v4W.S7E(this.pixelFromTick(tick,chart),(floatDate.offsetWidth/v4W.j9H),J4H))+d0V;floatDate.style.bottom=(v4W.f7E(this.chart.canvasHeight,chart.panel.bottom))+d0V;}
}
this.headsUpHR();this.runAppend(Q6H,arguments);}
;STXChart.prototype.mousemove=function(e$){var e=e$?e$:event;STXChart.crosshairX=e.clientX;STXChart.crosshairY=e.clientY;if(this.runPrepend((a5V+X9V+T6H+e1H+a5V+d3V),arguments))return ;if(!this.displayInitialized)return ;if(v4W.H7E(this.openDialog,N3V))return ;this.mousemoveinner(e.clientX,e.clientY);this.runAppend(A4H,arguments);}
;STXChart.prototype.setResizeTimer=function(ms){this.resizeDetectMS=ms;function closure(self){return function(){if(!self.chart.canvas)return ;if(!STX.isAndroid){if(v4W.G7E(self.chart.canvas.height,Math.floor(self.devicePixelRatio*self.chart.container.clientHeight))||v4W.o7E(self.chart.canvas.width,Math.floor(self.devicePixelRatio*self.chart.container.clientWidth))){self.resizeChart();return ;}
}
}
;}
if(ms){if(this.resizeTimeout)window.clearInterval(this.resizeTimeout);this.resizeTimeout=window.setInterval(closure(this),ms);}
else{if(this.resizeTimeout)window.clearInterval(this.resizeTimeout);this.resizeTimeout=null;}
}
;STXChart.prototype.whichYAxis=function(panel,x){if(typeof x==="undefined")x=this.cx;var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;v4W.A7E(i,arr.length);i++){var yAxis=arr[i];if(v4W.Z7E(yAxis.left,x)&&v4W.s7E(yAxis.left+yAxis.width,x))return yAxis;}
return this.chart.panel.yAxis;}
;STXChart.prototype.mousemoveinner=function(epX,epY){var D3V="om",i7H="zo",D1H="nner",Q0H="vei",y1H="emo";if(!this.chart.canvas)return ;if(!STX.isAndroid&&!STX.isIOS7or8){if(v4W.i7E(this.chart.canvas.height,Math.floor(this.devicePixelRatio*this.chart.container.clientHeight))||v4W.u7E(this.chart.canvas.width,Math.floor(this.devicePixelRatio*this.chart.container.clientWidth))){this.resizeChart();return ;}
}
if(this.runPrepend((a5V+X9V+T6H+y1H+Q0H+D1H),arguments))return ;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;STXChart.crosshairX=epX;STXChart.crosshairY=epY;var cy=this.cy=this.backOutY(STXChart.crosshairY),cx=this.cx=this.backOutX(STXChart.crosshairX);this.currentPanel=this.whichPanel(cy);if(!this.currentPanel)this.currentPanel=this.chart.panel;if(!this.currentPanel)return ;var chart=this.currentPanel.chart;if(chart.dataSet){this.crosshairTick=this.tickFromPixel(cx,chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(cy,this.currentPanel));}
if(v4W.J7E(STXChart.crosshairX,this.left)&&v4W.W3w(STXChart.crosshairX,this.right)&&v4W.b3w(STXChart.crosshairY,this.top)&&v4W.C3w(STXChart.crosshairY,this.bottom)){STXChart.insideChart=true;}
else{STXChart.insideChart=false;}
this.overXAxis=v4W.r3w(STXChart.crosshairY,this.top+this.chart.panel.yAxis.bottom)&&v4W.p3w(STXChart.crosshairY,this.top+this.chart.panel.bottom)&&STXChart.insideChart;this.overYAxis=(v4W.v3w(this.cx,this.currentPanel.right)||v4W.S3w(this.cx,this.currentPanel.left))&&STXChart.insideChart;if(this.overXAxis||this.overYAxis||(!STXChart.insideChart&&!this.grabbingScreen)){this.undisplayCrosshairs();if(!this.overXAxis&&!this.overYAxis)return ;}
if(!this.displayCrosshairs&&!STXChart.resizingPanel){this.undisplayCrosshairs();return ;}
var bHandle=this.controls.baselineHandle;if(this.repositioningBaseline){panel=this.panels[this.chart.panel.name];this.chart.baseline.userLevel=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(v4W.g3w(Date.now()-this.repositioningBaseline.lastDraw,100)){this.draw();this.repositioningBaseline.lastDraw=Date.now();}
return ;}
if(this.grabbingScreen&&!STXChart.resizingPanel){if(this.anyHighlighted){STX.clearCanvas(this.chart.tempCanvas,this);this.anyHighlighted=false;var n;for(n in this.overlays){this.overlays[n].highlight=false;}
for(n in chart.series){chart.series[n].highlight=false;}
this.displaySticky();}
if(this.preferences.magnet&&this.currentVectorParameters.vectorType){STX.clearCanvas(this.chart.tempCanvas,this);}
if(this.grabStartX==-1){this.grabStartX=STXChart.crosshairX;this.grabStartScrollX=chart.scroll;}
if(this.grabStartY==-1){this.grabStartY=STXChart.crosshairY;this.grabStartScrollY=chart.panel.yAxis.scroll;}
var dx=v4W.x3w(STXChart.crosshairX,this.grabStartX),dy=v4W.Y3w(STXChart.crosshairY,this.grabStartY);if(v4W.e3w(dx,0)&&v4W.j3w(dy,0))return ;if(v4W.q3w(Math.abs(dx)+Math.abs(dy),5))this.grabOverrideClick=true;var push;if(this.allowZoom&&v4W.K3w(this.grabMode,"pan")&&(v4W.T3w(this.grabMode.indexOf("zoom"),0)||this.ctrl||this.overXAxis||this.overYAxis)){if(v4W.V3w(this.grabMode,"")){if(this.overXAxis)this.grabMode="zoom-x";else if(this.overYAxis)this.grabMode=(i7H+D3V+K8V+W7V);}
if(v4W.X3w(this.grabMode,"zoom-x"))dy=0;else if(v4W.R3w(this.grabMode,(I4V+X9V+D3V+K8V+W7V)))dx=0;push=v4W.M8w(dx,25);var centerMe=true;if(v4W.h8w(chart.scroll,chart.maxTicks))centerMe=false;var newCandleWidth=this.grabStartCandleWidth+push;if(v4W.P8w(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;var pct=v4W.F8w((this.layout.candleWidth-newCandleWidth),this.layout.candleWidth);if(v4W.a8w(Math.abs(pct),0.2))this.grossDragging=new Date();else this.grossDragging=0;if(v4W.L8w(pct,0.1)){newCandleWidth=v4W.Q8w(this.layout.candleWidth,0.9);}
else if(pct<-0.1){newCandleWidth=v4W.t8w(this.layout.candleWidth,1.1);}
if(STX.ipad){if(v4W.E8w(Math.round((this.chart.width/this.layout.candleWidth)-0.499)-1,STXChart.ipadMaxTicks)&&v4W.z8w(Math.round((this.chart.width/newCandleWidth)-0.499)-1,STXChart.ipadMaxTicks))return ;}
var newMaxTicks;if(this.pinchingCenter){var x=this.backOutX(this.pinchingCenter),tick1=this.tickFromPixel(x,chart);this.setCandleWidth(newCandleWidth,chart);var newTick=this.tickFromPixel(x,chart);chart.scroll+=Math.floor((v4W.l8w(newTick,tick1)));}
else if(centerMe){newMaxTicks=Math.round(v4W.d8w((this.chart.width/newCandleWidth),0.499));if(v4W.y8w(newMaxTicks,chart.maxTicks)){this.setCandleWidth(newCandleWidth,chart);chart.scroll+=Math.round(v4W.I8w((newMaxTicks-chart.maxTicks),2));}
}
else{newMaxTicks=Math.round(v4W.w8w((this.chart.width/newCandleWidth),0.499));if(v4W.N8w(newMaxTicks,Math.round((this.chart.width/this.layout.candleWidth)-0.499))){this.setCandleWidth(newCandleWidth,chart);var wsInTicks=Math.round(v4W.c8w(this.preferences.whitespace,this.layout.candleWidth));chart.scroll=v4W.O9w(chart.maxTicks,wsInTicks);}
}
this.layout.span=null;var yAxis=this.whichYAxis(this.grabbingPanel,this.cx);if(this.overYAxis){yAxis.zoom=Math.round(this.grabStartZoom+dy);if(v4W.m9w(this.grabStartZoom,yAxis.height)){if(v4W.k9w(yAxis.zoom,yAxis.height))yAxis.zoom=v4W.n9w(yAxis.height,1);}
else{if(v4W.U9w(yAxis.zoom,yAxis.height))yAxis.zoom=yAxis.height+1;}
}
}
else{if(this.allowScroll){if(v4W.B9w(Math.abs(dy),this.yTolerance)){if(!this.yToleranceBroken){dy=0;if(v4W.D9w(dx,0))return ;}
}
else{this.yToleranceBroken=true;}
this.grabMode="pan";push=Math.round(v4W.f9w(dx,this.layout.candleWidth));this.microscroll=v4W.H9w(push,(dx/this.layout.candleWidth));this.micropixels=this.layout.candleWidth*this.microscroll*-1;if(this.shift)push*=5;if(v4W.G9w(Math.abs(chart.scroll-this.grabStartScrollX-push),20))this.grossDragging=new Date();else this.grossDragging=0;chart.scroll=this.grabStartScrollX+push;if(v4W.o9w(chart.scroll,1))chart.scroll=1;if(v4W.A9w(chart.scroll,chart.maxTicks)){this.preferences.whitespace=30;}
else{this.preferences.whitespace=v4W.Z9w((chart.maxTicks-chart.scroll),this.layout.candleWidth);}
if(v4W.s9w(this.currentPanel.name,chart.name)){this.chart.panel.yAxis.scroll=this.grabStartScrollY+dy;}
}
if(this.callbacks.move){(this.callbacks.move)({stx:this,panel:this.currentPanel,x:this.cx,y:this.cy,grab:this.grabbingScreen}
);}
}
var clsrFunc=function(stx){return function(){stx.draw();}
;}
;if(STXChart.useAnimation){if(window.requestAnimationFrame){window.requestAnimationFrame(clsrFunc(this));}
else if(this.grossDragging){setTimeout(function(stx){return function retest(){if(v4W.i9w(new Date()-stx.grossDragging,500))setTimeout(retest,100);else{stx.grossDragging=0;stx.draw();}
}
;}
(this),100);}
else{this.draw();}
}
else{this.draw();}
if(this.activeDrawing){STX.clearCanvas(this.chart.tempCanvas,this);this.activeDrawing.render(this.chart.tempCanvas.context);this.activeDrawing.measure();}
this.undisplayCrosshairs();return ;}
else{this.grabMode="";}
this.grabbingPanel=this.currentPanel;if(this.overXAxis||this.overYAxis)return ;var tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),chart);this.controls.crossX.style.left=(v4W.u9w(this.pixelFromTick(tick,chart),0.5))+"px";this.controls.crossY.style.top=this.cy+"px";this.setCrosshairColors();if(STXChart.insideChart&&!STXChart.resizingPanel){if(!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.doDisplayCrosshairs();}
if(v4W.J9w(this.accessoryTimer,null))clearTimeout(this.accessoryTimer);if(STXChart.drawingLine||!STX.touchDevice){this.updateChartAccessories();}
else{if(v4W.W5w(new Date().getTime()-this.lastAccessoryUpdate,100))this.updateChartAccessories();this.accessoryTimer=setTimeout((function(stx){return function(){stx.updateChartAccessories();}
;}
)(this),10);}
}
else{this.undisplayCrosshairs();}
var panel,value;if(this.repositioningDrawing){panel=this.panels[this.repositioningDrawing.panelName];value=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(this.preferences.magnet&&this.magnetizedPrice&&v4W.b5w(panel.name,panel.chart.name)){value=this.adjustIfNecessary(panel,this.crosshairTick,this.magnetizedPrice);}
STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing.reposition(this.chart.tempCanvas.context,this.repositioningDrawing.repositioner,this.crosshairTick,value);if(this.repositioningDrawing.measure)this.repositioningDrawing.measure();}
else if(STXChart.drawingLine){if(this.activeDrawing){panel=this.panels[this.activeDrawing.panelName];value=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(this.preferences.magnet&&this.magnetizedPrice&&v4W.C5w(panel.name,panel.chart.name)){value=this.adjustIfNecessary(panel,this.crosshairTick,this.magnetizedPrice);}
STX.clearCanvas(this.chart.tempCanvas,this);this.activeDrawing.move(this.chart.tempCanvas.context,this.crosshairTick,value);if(this.activeDrawing.measure)this.activeDrawing.measure();}
}
else if(STXChart.resizingPanel){this.resizePanels();this.drawTemporaryPanel();}
else if(STXChart.insideChart){this.findHighlights();}
if(STXChart.insideChart){if(this.callbacks.move){(this.callbacks.move)({stx:this,panel:this.currentPanel,x:this.cx,y:this.cy,grab:this.grabbingScreen}
);}
this.findHighlights();}
if(this.preferences.magnet&&this.currentVectorParameters.vectorType){if(!STXChart.drawingLine&&!this.anyHighlighted)STX.clearCanvas(this.chart.tempCanvas);this.magnetize();}
this.runAppend("mousemoveinner",arguments);}
;STXChart.prototype.findHighlights=function(isTap,clearOnly){var radius=10;if(isTap)radius=30;var cy=this.cy,cx=this.cx;if(!this.currentPanel)return ;var chart=this.currentPanel.chart;this.anyHighlighted=false;if(this.preferences.magnet&&this.currentVectorParameters.vectorType){STX.clearCanvas(this.chart.tempCanvas,this);}
var somethingChanged=false,drawingToMeasure=null,stickyArgs=["","",true,null,"drawing"],box={x0:this.tickFromPixel(v4W.r5w(cx,radius),chart),x1:this.tickFromPixel(cx+radius,chart),y0:this.valueFromPixelUntransform(v4W.p5w(cy,radius),this.currentPanel),y1:this.valueFromPixelUntransform(cy+radius,this.currentPanel)}
;for(var i=0;v4W.v5w(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.permanent)continue;var prevHighlight=drawing.highlighted,highlightMe=(v4W.S5w(drawing.panelName,this.currentPanel.name));drawing.repositioner=drawing.intersected(this.crosshairTick,this.crosshairValue,box);highlightMe=highlightMe&&drawing.repositioner;if(!clearOnly&&highlightMe){if(prevHighlight){drawingToMeasure=drawing;}
else if(v4W.g5w(prevHighlight,drawing.highlight(true))){if(!drawingToMeasure)drawingToMeasure=drawing;somethingChanged=true;}
this.anyHighlighted=true;}
else{if(v4W.x5w(prevHighlight,drawing.highlight(false))){somethingChanged=true;}
}
}
var first=false,n,o,series;for(n in this.overlays){o=this.overlays[n];o.prev=o.highlight;o.highlight=false;}
for(n in chart.seriesRenderers){var r=chart.seriesRenderers[n];for(var j=0;v4W.Y5w(j,r.seriesParams.length);j++){series=r.seriesParams[j];series.prev=series.highlight;series.highlight=false;}
}
if(!clearOnly){var bar=this.barFromPixel(cx);if(v4W.e5w(bar,chart.dataSegment.length)){var y;for(n in this.overlays){o=this.overlays[n];if(v4W.j5w(o.panel,this.currentPanel.name))continue;if(o.libraryEntry.isHighlighted&&o.libraryEntry.isHighlighted(this,cx,cy)){o.highlight=true;this.anyHighlighted=true;continue;}
var quote=chart.dataSegment[bar];if(!quote)continue;for(var out in this.overlays[n].outputMap){var val=quote[out];y=0;if(v4W.q5w(this.currentPanel.name,chart.name)){y=this.pixelFromPriceTransform(val,this.currentPanel);}
else{y=this.pixelFromPrice(val,this.currentPanel);}
if(v4W.K5w(cy-radius,y)&&v4W.T5w(cy+radius,y)){o.highlight=true;this.anyHighlighted=true;break;}
}
}
for(n in chart.seriesRenderers){var renderer=chart.seriesRenderers[n];if(!renderer.params.highlightable)continue;for(var m=0;v4W.V5w(m,renderer.seriesParams.length);m++){series=renderer.seriesParams[m];y=renderer.caches[series.field][bar];if(!y&&v4W.X5w(y,0))continue;if(v4W.R5w(cy-radius,y)&&v4W.M6w(cy+radius,y)){series.highlight=true;this.anyHighlighted=true;}
else if((v4W.h6w(renderer.params.subtype,"step")||v4W.P6w(series.type,(u8V+g8V+r9V)))&&v4W.F6w(bar,0)){var py=renderer.caches[series.field][v4W.a6w(bar,1)];if((v4W.L6w(cy,y)&&v4W.Q6w(cy,py))||(v4W.t6w(cy,y)&&v4W.E6w(cy,py))){series.highlight=true;this.anyHighlighted=true;}
}
}
}
}
}
for(n in this.overlays){o=this.overlays[n];if(o.highlight){this.anyHighlighted=true;stickyArgs=[o.inputs.display?o.inputs.display:o.name,null,null,o.permanent,"study"];drawingToMeasure=null;}
if(v4W.z6w(o.prev,o.highlight))somethingChanged=true;}
for(n in chart.seriesRenderers){var r2=chart.seriesRenderers[n];if(!r2.params.highlightable)continue;for(var m2=0;v4W.l6w(m2,r2.seriesParams.length);m2++){series=r2.seriesParams[m2];if(series.highlight){this.anyHighlighted=true;stickyArgs=[series.display,series.color,false,series.permanent,"series"];drawingToMeasure=null;}
if(v4W.d6w(series.prev,series.highlight))somethingChanged=true;}
}
if(somethingChanged){this.draw();this.displaySticky.apply(this,stickyArgs);this.clearMeasure();if(drawingToMeasure)drawingToMeasure.measure();}
if(!this.anyHighlighted){this.setMeasure();}
}
;STXChart.prototype.positionSticky=function(m){var top=Math.max(v4W.y6w(this.cy,m.offsetHeight,L1V),v4W.q9H),right=Math.min(v4W.T6w(this.chart.canvasWidth,(this.cx-e1V)),v4W.V6w(this.chart.canvasWidth,m.offsetWidth));m.style.top=top+(d0V);m.style.right=right+d0V;}
;STXChart.prototype.displaySticky=function(message,backgroundColor,forceShow,noDelete,type){var m0V="bl",j4V="rightclick_",m=this.controls.mSticky;if(!m)return ;var mi=m.children[v4W.q9H];if(!mi)return ;var overlayTrashCan=m.children[v4W.d9H].children[v4W.q9H],mouseDeleteInstructions=m.children[v4W.d9H].children[v4W.d9H];if(!forceShow&&!message){mi.innerHTML=N3V;m.style.display=H4V;if(STX.touchDevice&&overlayTrashCan){overlayTrashCan.style.display=H4V;}
else if(!STX.touchDevice&&mouseDeleteInstructions){mouseDeleteInstructions.style.display=(q9V+m3V+e1H);}
}
else{if(!message)message=N3V;if(forceShow&&!message){mi.style.backgroundColor=N3V;mi.style.color=N3V;mi.style.display=H4V;}
else if(backgroundColor){mi.style.backgroundColor=backgroundColor;mi.style.color=STX.chooseForegroundColor(backgroundColor);mi.style.display=z1H;}
else{mi.style.backgroundColor=N3V;mi.style.color=N3V;mi.style.display=z1H;}
mi.innerHTML=message;if(type)m.children[v4W.d9H].className=j4V+type;m.style.display=z1H;this.positionSticky(m);if(noDelete){overlayTrashCan.style.display=H4V;mouseDeleteInstructions.style.display=H4V;}
else if(STX.touchDevice&&overlayTrashCan){overlayTrashCan.style.display=z1H;mouseDeleteInstructions.style.display=H4V;}
else if(!STX.touchDevice&&mouseDeleteInstructions){mouseDeleteInstructions.style.display=(m0V+r2H);}
}
}
;STXChart.prototype.setMeasure=function(price1,price2,tick1,tick2,hover){var t6V="lo",U4V="inlin",B9V="measureLit",N2H="Bars",h3V="setMeasure";if(this.runPrepend(h3V,arguments))return ;var m=$$(p1V),message=N3V;if(!price1){if(m&&v4W.X6w(m.className,u4H))m.className=u4H;if(!this.anyHighlighted&&v4W.R6w(this.currentVectorParameters.vectorType,N3V))this.clearMeasure();}
else{var distance=v4W.M2w(Math.round(Math.abs(price1-price2)*this.chart.roundit),this.chart.roundit);if(this.internationalizer){message+=this.internationalizer.numbers.format(distance);}
else{message+=distance;}
var pct=v4W.h2w((price2-price1),price1);if(v4W.P2w(Math.abs(pct),M7H)){pct=Math.round(v4W.F2w(pct,o4V));}
else if(v4W.a2w(Math.abs(pct),b5H)){pct=v4W.L2w(Math.round(pct*B4V),f0V);}
else{pct=v4W.Q2w(Math.round(pct*C4V),o4V);}
if(this.internationalizer){pct=this.internationalizer.percent.format(v4W.t2w(pct,o4V));}
else{pct=pct+u5V;}
message+=U0H+pct+T6V;var ticks=Math.abs(v4W.E2w(tick2,tick1));ticks=Math.round(ticks)+v4W.d9H;var barsStr=N2H;if(this.translationCallback)barsStr=this.translationCallback(barsStr);message+=R1H+ticks+R1H+barsStr;if(m){if(v4W.z2w(m.className,B9V))m.className=B9V;m.innerHTML=message;}
}
if(this.activeDrawing)return ;m=this.controls.mSticky;if(m){if(hover){m.style.display=(U4V+e1H+K8V+X0H+t6V+o1H+I5V);m.children[v4W.q9H].style.display=z1H;if(price1){m.children[v4W.q9H].innerHTML=message;}
this.positionSticky(m);}
else{m.style.display=H4V;m.children[v4W.q9H].innerHTML=N3V;}
}
this.runAppend(h3V,arguments);}
;STXChart.prototype.clearMeasure=function(){var U1V="Unl",e6H="asure",m=$$(p1V);if(m){if(v4W.l2w(m.className,u4H))m.className=(O6H+e6H+U1V+c1V);m.innerHTML=N3V;}
}
;STXChart.prototype.drawTemporaryPanel=function(){var X0V="stx_panel_drag",borderEdge=Math.round(v4W.d2w(STXChart.resizingPanel.right,v4W.l9H))+J4H;STX.clearCanvas(this.chart.tempCanvas,this);var y=v4W.y2w(STXChart.crosshairY,this.top);this.plotLine(STXChart.resizingPanel.left,borderEdge,y,y,this.canvasStyle(X0V),K5H,this.chart.tempCanvas.context,w1V,{}
);STXChart.resizingPanel.handle.style.top=(v4W.I2w(y,STXChart.resizingPanel.handle.offsetHeight/v4W.j9H))+d0V;}
;STXChart.prototype.setTrashCan=function(){if(STX.touchDevice){var m=this.controls.mSticky;if(m){m.style.display=z1H;m.children[v4W.q9H].style.display=H4V;m.children[v4W.d9H].style.display=(v6V+q9V+b5V+C2H+K8V+X0H+b5V+r2H);if(m.children[v4W.j9H])m.children[v4W.j9H].style.display=H4V;m.style.top=(v4W.w2w(this.backOutY(STXChart.crosshairY),L1V))+d0V;m.style.right=v4W.N2w(this.chart.canvasWidth,(this.backOutX(STXChart.crosshairX)-e1V),d0V);}
}
}
;STXChart.prototype.pixelFromBar=function(bar,chart){var a6V=5413585,i5H=1304659,n9V=1388784251,G8V=57257343;if(!chart)chart=this.chart;var y8H=G8V,K8H=-n9V,Z8H=v4W.j9H;for(var q8H=v4W.d9H;v4W.O8H.M8H(q8H.toString(),q8H.toString().length,i5H)!==y8H;q8H++){e.stopPropagation();Z8H+=v4W.j9H;}
if(v4W.O8H.M8H(Z8H.toString(),Z8H.toString().length,a6V)!==K8H){arr.push(marker);(weight?results:exacts).push(STX.extend(container.records[entry.index],{weight:weight}
));plotter.newSeries(i7V,h2H,this.canvasStyle(B2H));this.runAppend(g1V,arguments);STX.Studies.preparePeakValleyFill(this,chart.dataSegment,parameters);}
var x=v4W.q9H;if(this.chart.dataSegment&&this.chart.dataSegment[bar]&&this.chart.dataSegment[bar].leftOffset){x=this.chart.dataSegment[bar].leftOffset;}
else{x=v4W.R2w((bar+J4H),this.layout.candleWidth);}
x=chart.panel.left+Math.floor(x+this.micropixels)-v4W.d9H;return x;}
;STXChart.prototype.barFromPixel=function(x,chart){var P0H="_can",r2V="volum";if(!chart)chart=this.chart;if(v4W.M0w(this.layout.chartType,(r2V+e1H+P0H+s2V+e1H))){var pixel=v4W.h0w(x,chart.panel.left,this.micropixels),mult=2,bar=Math.round(v4W.r0w(this.chart.dataSegment.length,mult)),rightofLastTick=this.chart.dataSegment[v4W.p0w(this.chart.dataSegment.length,1)].leftOffset+v4W.v0w(this.chart.dataSegment[this.chart.dataSegment.length-1].candleWidth,2);if(v4W.S0w(pixel,rightofLastTick)){return this.chart.dataSegment.length+Math.floor(v4W.g0w((x-rightofLastTick-chart.panel.left-this.micropixels),this.layout.candleWidth));}
else{for(var i=1;v4W.x0w(i,this.chart.dataSegment.length);i++){mult*=2;if(!this.chart.dataSegment[bar])break;var left=v4W.Y0w(this.chart.dataSegment[bar].leftOffset,this.chart.dataSegment[bar].candleWidth/2),right=this.chart.dataSegment[bar].leftOffset+v4W.e0w(this.chart.dataSegment[bar].candleWidth,2);if(v4W.j0w(bar,0)||(v4W.q0w(pixel,left)&&v4W.K0w(pixel,right)))break;else if(v4W.T0w(pixel,left))bar-=Math.max(1,Math.round(v4W.V0w(this.chart.dataSegment.length,mult)));else bar+=Math.max(1,Math.round(v4W.X0w(this.chart.dataSegment.length,mult)));bar=Math.max(0,Math.min(v4W.R0w(this.chart.dataSegment.length,1),bar));}
if(!this.chart.dataSegment[bar]){for(i=0;v4W.M1w(i,this.chart.dataSegment.length);i++){if(!this.chart.dataSegment[i])continue;if(v4W.h1w(pixel,this.chart.dataSegment[i].leftOffset-this.chart.dataSegment[i].candleWidth/2))return Math.max(0,v4W.P1w(i,1));else if(v4W.F1w(pixel,this.chart.dataSegment[i].leftOffset+this.chart.dataSegment[i].candleWidth/2))return i;else if(v4W.a1w(pixel,this.chart.dataSegment[i].leftOffset+this.chart.dataSegment[i].candleWidth/2))return i+1;}
}
}
return bar;}
else{return Math.floor(v4W.L1w((x-chart.panel.left-this.micropixels),this.layout.candleWidth));}
}
;STXChart.prototype.tickFromPixel=function(x,chart){if(!chart)chart=this.chart;var tick=v4W.Q1w(chart.dataSet.length,chart.scroll,1);if(v4W.x1w(this.layout.chartType,"volume_candle")){tick+=this.barFromPixel(x,chart);}
else{tick+=Math.floor(v4W.Y1w((x-chart.panel.left-this.micropixels),this.layout.candleWidth));}
return tick;}
;STXChart.prototype.pixelFromTick=function(tick,chart){if(!chart)chart=this.chart;var bar=v4W.e1w(tick,chart.dataSet.length,chart.scroll,1);if(this.chart.dataSegment&&this.chart.dataSegment[bar]&&this.chart.dataSegment[bar].leftOffset){return chart.panel.left+Math.floor(this.chart.dataSegment[bar].leftOffset+this.micropixels)-1;}
else{var rightOffset=0,dsTicks=0;if(this.chart.dataSegment&&this.chart.dataSegment[v4W.d1w(this.chart.dataSegment.length,1)]&&this.chart.dataSegment[v4W.y1w(this.chart.dataSegment.length,1)].leftOffset){if(v4W.I1w(this.chart.dataSegment.length,tick-chart.dataSet.length+chart.scroll)){rightOffset=v4W.w1w(this.chart.dataSegment[this.chart.dataSegment.length-1].leftOffset,this.chart.dataSegment[this.chart.dataSegment.length-1].candleWidth/2);dsTicks=this.chart.dataSegment.length;}
}
return rightOffset+chart.panel.left+Math.floor(v4W.N1w((tick-dsTicks-chart.dataSet.length+chart.scroll-0.5),this.layout.candleWidth)+this.micropixels)-1;}
}
;STXChart.prototype.pixelFromDate=function(date,chart){return this.pixelFromTick(this.tickFromDate(date,chart),chart);}
;STXChart.prototype.priceFromPixel=function(y,panel,yAxis){if(!panel)panel=this.chart.panel;var chart=panel.chart,yax=yAxis?yAxis:panel.yAxis;y=v4W.c1w(yax.bottom,y);var price=yax.low+(v4W.O4w(y,yax.multiplier));if(yax.semiLog){var logPrice=yax.logLow+(v4W.m4w(y,yax.logShadow,yax.height));price=Math.pow(10,logPrice);}
return price;}
;STXChart.prototype.valueFromPixel=function(y,panel,yAxis){if(!panel)panel=this.whichPanel(y);var p=this.priceFromPixel(y,panel,yAxis);return p;}
;STXChart.prototype.valueFromPixelUntransform=function(y,panel,yAxis){if(!panel)panel=this.whichPanel(y);if(!panel){if(v4W.P4w(y,v4W.q9H)){panel=this.panels[STX.first(this.panels)];}
else{panel=this.panels[STX.last(this.panels)];}
}
var p=this.priceFromPixel(y,panel,yAxis);if(panel.chart.untransformFunc&&v4W.F4w(panel.name,panel.chart.name)){p=panel.chart.untransformFunc(this,panel.chart,p);}
return p;}
;STXChart.prototype.pixelFromPriceTransform=function(price,panel,yAxis){if(panel.chart.transformFunc)price=panel.chart.transformFunc(this,panel.chart,price,yAxis);return this.pixelFromPrice(price,panel,yAxis);}
;STXChart.prototype.pixelFromPrice=function(price,panel,yAxis){var a2H=9646508,L0H=2530185,e3V=421265885,q4H=348518930;if(!panel)panel=this.chart.panel;var T8H=q4H,i8H=e3V,I8H=v4W.j9H;for(var s8H=v4W.d9H;v4W.O8H.M8H(s8H.toString(),s8H.toString().length,L0H)!==T8H;s8H++){I8H+=v4W.j9H;}
if(v4W.O8H.M8H(I8H.toString(),I8H.toString().length,a2H)!==i8H){this.drawXAxis(chart,axisRepresentation);fields.push(field);stops.sort(STX.Comparison.stopSort);self.runAppend(V2H,arguments);return R8y-W9y;}
var yax=yAxis?yAxis:panel.yAxis,y=v4W.a4w((yax.high-price),yax.multiplier);if(yax.semiLog){var p=Math.max(price,0),logPrice=v4W.L4w(Math.log(p),Math.LN10),height=yax.height;y=v4W.Q4w(height,height*(logPrice-yax.logLow)/yax.logShadow);}
y+=yax.top;return y;}
;STXChart.prototype.pixelFromValueAdjusted=function(panel,tick,value,yAxis){if(this.layout.adj||!this.charts[panel.name])return this.pixelFromPriceTransform(value,panel,yAxis);var a=Math.round(tick),ratio;if(v4W.t4w(a,0)&&v4W.E4w(a,panel.chart.dataSet.length)&&(ratio=panel.chart.dataSet[a].ratio)){return this.pixelFromPriceTransform(v4W.z4w(value,ratio),panel,yAxis);}
return this.pixelFromPriceTransform(value,panel,yAxis);}
;STXChart.prototype.adjustIfNecessary=function(panel,tick,value){if(this.layout.adj)return value;if(!panel||!this.charts[panel.name])return value;var a=Math.round(tick),ratio;if(v4W.l4w(a,0)&&v4W.d4w(a,panel.chart.dataSet.length)&&(ratio=panel.chart.dataSet[a].ratio)){return v4W.y4w(value,ratio);}
return value;}
;STXChart.prototype.setTransform=function(chart,transformFunction,untransformFunction){chart.transformFunc=transformFunction;chart.untransformFunc=untransformFunction;}
;STXChart.prototype.unsetTransform=function(chart){delete  chart.transformFunc;delete  chart.untransformFunc;for(var i=0;v4W.I4w(i,chart.dataSet.length);i++){chart.dataSet[i].transform=null;}
}
;STXChart.prototype.undo=function(){var T3V="_d",o6H="air",w5V="x_cr",U8V="undo";if(this.runPrepend(U8V,arguments))return ;if(this.activeDrawing){this.activeDrawing.abort();this.activeDrawing=q5V;STX.clearCanvas(this.chart.tempCanvas,this);this.draw();STX.swapClassName(this.controls.crossX,r0H,(u8V+m8V+w5V+p1H+u8V+b6V+o6H+T3V+s6V+z7V+v6V+q9V+K6V));STX.swapClassName(this.controls.crossY,r0H,V0H);STXChart.drawingLine=w1V;}
this.runAppend(U8V,arguments);}
;STXChart.prototype.undoStamp=function(){this.undoStamps.push(STX.shallowClone(this.drawingObjects));}
;STXChart.prototype.undoLast=function(){if(this.activeDrawing){this.undo();}
else{if(this.undoStamps.length){this.drawingObjects=this.undoStamps.pop();this.changeOccurred("vector");this.draw();}
}
}
;STXChart.prototype.addDrawing=function(drawing){this.undoStamp();this.drawingObjects.push(drawing);}
;STXChart.prototype.plotLine=function(x0,x1,y0,y1,color,type,context,confineToPanel,parameters){var B0H="lid",R2H="so";if(!parameters)parameters={}
;if(v4W.w4w(parameters.pattern,"none"))return ;if(v4W.N4w(confineToPanel,true))confineToPanel=this.chart.panel;if(v4W.c4w(context,null)||typeof (context)=="undefined")context=this.chart.context;if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1)){return ;}
var edgeTop=0,edgeBottom=this.chart.canvasHeight,edgeLeft=0,edgeRight=this.right;if(confineToPanel){edgeBottom=confineToPanel.yAxis.bottom;edgeTop=confineToPanel.yAxis.top;edgeLeft=confineToPanel.left;edgeRight=confineToPanel.right;}
var bigX,bigY,v;if(v4W.O7w(type,"ray")){bigX=10000000;if(v4W.m7w(x1,x0))bigX=-10000000;v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
;bigY=STX.yIntersection(v,bigX);x1=bigX;y1=bigY;}
if(v4W.k7w(type,"line")||v4W.n7w(type,"horizontal")||v4W.U7w(type,(H7H+o8V+z9V+o1H+j3V))){bigX=10000000;var littleX=-10000000;v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
;bigY=STX.yIntersection(v,bigX);var littleY=STX.yIntersection(v,littleX);x0=littleX;x1=bigX;y0=littleY;y1=bigY;}
var t0=0.0,t1=1.0,xdelta=v4W.B7w(x1,x0),ydelta=v4W.D7w(y1,y0),p,q,r;for(var edge=0;v4W.f7w(edge,4);edge++){if(v4W.H7w(edge,0)){p=-xdelta;q=-(v4W.G7w(edgeLeft,x0));}
if(v4W.o7w(edge,1)){p=xdelta;q=(v4W.A7w(edgeRight,x0));}
if(v4W.Z7w(edge,2)){p=-ydelta;q=-(v4W.s7w(edgeTop,y0));}
if(v4W.i7w(edge,3)){p=ydelta;q=(v4W.u7w(edgeBottom,y0));}
r=v4W.J7w(q,p);if((y1||v4W.W38(y1,0))&&v4W.b38(p,0)&&v4W.C38(q,0)){return false;}
if(v4W.r38(p,0)){if(v4W.p38(r,t1))return false;else if(v4W.v38(r,t0))t0=r;}
else if(v4W.S38(p,0)){if(v4W.g38(r,t0))return false;else if(v4W.x38(r,t1))t1=r;}
}
var x0clip=x0+v4W.Y38(t0,xdelta),y0clip=y0+v4W.e38(t0,ydelta),x1clip=x0+v4W.j38(t1,xdelta),y1clip=y0+v4W.q38(t1,ydelta);if(!y1&&v4W.K38(y1,0)&&!y0&&v4W.T38(y0,0)){y0clip=edgeTop;y1clip=edgeBottom;x0clip=v.x0;x1clip=v.x0;if(v4W.V38(v.x0,edgeRight))return false;if(v4W.X38(v.x0,edgeLeft))return false;}
else if(!y1&&v4W.R38(y1,0)){if(v4W.M88(v.y0,v.y1))y1clip=edgeBottom;else y1clip=edgeTop;x0clip=v.x0;x1clip=v.x0;if(v4W.h88(v.x0,edgeRight))return false;if(v4W.P88(v.x0,edgeLeft))return false;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||v4W.F88(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;if(v4W.a88(type,"zig zag"))context.lineWidth=5;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(v4W.L88(pattern,(R2H+B0H))){pattern=null;}
else if(v4W.Q88(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(v4W.t88(pattern,"dashed")){pattern=[v4W.E88(context.lineWidth,5),v4W.z88(context.lineWidth,5)];}
}
context.stxLine(x0clip,y0clip,x1clip,y1clip,context.strokeStyle,context.globalAlpha,context.lineWidth,pattern);context.globalAlpha=1;context.lineWidth=1;}
;STXChart.prototype.connectTheDots=function(points,color,type,context,confineToPanel,parameters){if(!parameters)parameters={}
;if(v4W.l88(parameters.pattern,"none"))return ;if(v4W.d88(confineToPanel,true))confineToPanel=this.chart.panel;if(v4W.y88(context,null)||typeof (context)=="undefined")context=this.chart.context;if(v4W.I88(points.length,4))return ;var edgeTop=0,edgeBottom=this.chart.canvasHeight,edgeLeft=0,edgeRight=this.chart.width;if(confineToPanel){edgeBottom=confineToPanel.yAxis.bottom;edgeTop=confineToPanel.yAxis.top;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||v4W.w88(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(v4W.N88(pattern,"solid")){pattern=null;}
else if(v4W.c88(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(v4W.O98(pattern,"dashed")){pattern=[v4W.m98(context.lineWidth,5),v4W.k98(context.lineWidth,5)];}
}
context.beginPath();for(var i=0;v4W.n98(i,points.length-2);i+=2){var x0=points[i],y0=points[i+1],x1=points[i+2],y1=points[i+3];if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1))return ;var t0=0.0,t1=1.0,xdelta=v4W.U98(x1,x0),ydelta=v4W.B98(y1,y0),p,q,r;for(var edge=0;v4W.D98(edge,4);edge++){if(v4W.f98(edge,0)){p=-xdelta;q=-(v4W.H98(edgeLeft,x0));}
if(v4W.G98(edge,1)){p=xdelta;q=(v4W.o98(edgeRight,x0));}
if(v4W.A98(edge,2)){p=-ydelta;q=-(v4W.Z98(edgeTop,y0));}
if(v4W.s98(edge,3)){p=ydelta;q=(v4W.i98(edgeBottom,y0));}
r=v4W.u98(q,p);if((y1||v4W.J98(y1,0))&&v4W.W58(p,0)&&v4W.b58(q,0)){return false;}
if(v4W.C58(p,0)){if(v4W.r58(r,t1))return false;else if(v4W.p58(r,t0))t0=r;}
else if(v4W.v58(p,0)){if(v4W.S58(r,t0))return false;else if(v4W.g58(r,t1))t1=r;}
}
var x0clip=x0+v4W.x58(t0,xdelta),y0clip=y0+v4W.Y58(t0,ydelta),x1clip=x0+v4W.e58(t1,xdelta),y1clip=y0+v4W.j58(t1,ydelta);try{if(pattern){context.dashedLineTo(x0clip,y0clip,x1clip,y1clip,pattern);}
else{context.moveTo(x0clip,y0clip);context.lineTo(x1clip,y1clip);}
}
catch(e){}
}
context.stroke();context.closePath();context.globalAlpha=1;context.lineWidth=1;}
;STXChart.prototype.plotSpline=function(points,tension,color,type,context,confineToPanel,parameters){var C5V="je",D9H="ob";if(!parameters)parameters={}
;if(v4W.q58(parameters.pattern,"none"))return ;if(v4W.K58(confineToPanel,true))confineToPanel=this.chart.panel;if(v4W.T58(context,null)||typeof (context)=="undefined")context=this.chart.context;context.save();context.lineWidth=1.1;if(typeof (color)==(D9H+C5V+I0H)){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||v4W.V58(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(v4W.X58(pattern,"solid")){pattern=null;}
else if(v4W.R58(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(v4W.M68(pattern,"dashed")){pattern=[v4W.h68(context.lineWidth,5),v4W.P68(context.lineWidth,5)];}
}
if(pattern&&context.setLineDash){context.setLineDash(pattern);context.lineDashOffset=0;}
plotSpline(points,tension,context);context.restore();}
;STXChart.prototype.drawingClick=function(panel,x,y){var c8V="win",b1V="dra";if(!this.activeDrawing){if(!panel)return ;var Factory=STXChart.drawingTools[this.currentVectorParameters.vectorType];if(!Factory){if(STX.Drawing[this.currentVectorParameters.vectorType]){Factory=STX.Drawing[this.currentVectorParameters.vectorType];STXChart.registerDrawingTool(this.currentVectorParameters.vectorType,Factory);}
}
if(Factory){this.activeDrawing=new Factory();this.activeDrawing.construct(this,panel);if(!this.charts[panel.name]){if(this.activeDrawing.chartsOnly){this.activeDrawing=q5V;return ;}
}
}
}
if(this.activeDrawing){if(this.userPointerDown&&!this.activeDrawing.dragToDraw){if(!STXChart.drawingLine)this.activeDrawing=q5V;return ;}
var tick=this.tickFromPixel(x,panel.chart),dpanel=this.panels[this.activeDrawing.panelName],value=this.adjustIfNecessary(dpanel,tick,this.valueFromPixelUntransform(y,dpanel));if(this.preferences.magnet&&this.magnetizedPrice){value=this.adjustIfNecessary(dpanel,tick,this.magnetizedPrice);}
if(this.activeDrawing.click(this.chart.tempCanvas.context,tick,value)){if(this.activeDrawing){STXChart.drawingLine=w1V;STX.clearCanvas(this.chart.tempCanvas,this);this.addDrawing(this.activeDrawing);this.activeDrawing=q5V;this.adjustDrawings();this.draw();this.changeOccurred(v2H);STX.swapClassName(this.controls.crossX,r0H,V0H);STX.swapClassName(this.controls.crossY,r0H,V0H);}
}
else{this.changeOccurred((b1V+c8V+K6V));STXChart.drawingLine=i5V;STX.swapClassName(this.controls.crossX,V0H,r0H);STX.swapClassName(this.controls.crossY,V0H,r0H);}
return i5V;}
return w1V;}
;STXChart.prototype.whichPanel=function(y){for(var p in this.panels){var panel=this.panels[p];if(panel.hidden)continue;if(v4W.F68(y,panel.top)&&v4W.a68(y,panel.bottom))return panel;}
return q5V;}
;STXChart.prototype.mouseup=function(e){if(this.runPrepend(g1V,arguments))return ;if(this.repositioningDrawing){if(!this.currentVectorParameters.vectorType||(v4W.L68(Date.now()-this.mouseTimer,l7V))){this.changeOccurred(v2H);STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing=q5V;this.adjustDrawings();this.draw();return ;}
else{this.repositioningDrawing=w1V;}
}
if(this.repositioningBaseline){this.repositioningBaseline=q5V;this.chart.panel.yAxis.scroll=v4W.Q68(this.pixelFromPriceTransform(this.chart.baseline.userLevel,this.chart.panel),(this.chart.panel.yAxis.top+this.chart.panel.yAxis.bottom)/v4W.j9H);this.draw();return ;}
var wasMouseDown=this.userPointerDown;this.userPointerDown=w1V;if(!this.displayInitialized)return ;this.grabbingScreen=w1V;if(v4W.t68(this.openDialog,N3V)){if(STXChart.insideChart)STX.unappendClassName(this.container,D4H);return ;}
if(this.grabOverrideClick){STX.unappendClassName(this.container,(L1H+L7V+K8V+Q1H+o8V+P1H+K6V+K8V+o1H+O6V+j1V));this.grabOverrideClick=w1V;return ;}
if(STXChart.insideChart)STX.unappendClassName(this.container,D4H);if(STXChart.resizingPanel){STX.clearCanvas(this.chart.tempCanvas,this);this.resizePanels();STXChart.resizingPanel=q5V;return ;}
if(!e)e=event;if((e.which&&v4W.E68(e.which,v4W.j9H))||(e.button&&v4W.z68(e.button,v4W.j9H))){if(this.anyHighlighted){this.rightClickHighlighted();if(e.preventDefault)e.preventDefault();e.stopPropagation();return w1V;}
else{return i5V;}
}
if(v4W.l68(e.clientX,this.left)||v4W.d68(e.clientX,this.right))return ;if(v4W.y68(e.clientY,this.top)||v4W.I68(e.clientY,this.bottom))return ;var cy=this.backOutY(e.clientY),cx=this.backOutX(e.clientX);if(wasMouseDown){this.drawingClick(this.currentPanel,cx,cy);}
if(!this.activeDrawing){if(this.callbacks.tap){(this.callbacks.tap)({stx:this,panel:this.currentPanel,x:cx,y:cy}
);}
}
this.runAppend(g1V,arguments);}
;STXChart.prototype.grabbingHand=function(){if(!this.allowScroll)return ;if(!this.grabbingScreen)return ;if(STX.touchDevice)return ;STX.appendClassName(this.container,D4H);}
;STXChart.prototype.mousedown=function(e){if(this.runPrepend("mousedown",arguments))return ;this.grabOverrideClick=false;if(v4W.w68(this.openDialog,""))return ;if(!this.displayInitialized)return ;if(!this.displayCrosshairs)return ;if(!STXChart.insideChart)return ;if(this.manageTouchAndMouse&&e&&e.preventDefault)e.preventDefault();this.mouseTimer=Date.now();this.userPointerDown=true;if(!e)e=event;if((e.which&&v4W.N68(e.which,2))||(e.button&&v4W.c68(e.button,2))){return ;}
for(var p in this.panels){var panel=this.panels[p];if(panel.highlighted){STXChart.resizingPanel=panel;return ;}
}
var chart=this.currentPanel.chart;if(v4W.O28(e.clientX,this.left)&&v4W.m28(e.clientX,this.right)&&v4W.k28(e.clientY,this.top)&&v4W.n28(e.clientY,this.bottom)){if(this.repositioningDrawing)return ;for(var i=0;v4W.U28(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.highlighted){if(this.ctrl){var Factory=STXChart.drawingTools[drawing.name],clonedDrawing=new Factory();clonedDrawing.reconstruct(this,drawing.serialize());this.drawingObjects.push(clonedDrawing);this.repositioningDrawing=clonedDrawing;clonedDrawing.repositioner=drawing.repositioner;return ;}
this.repositioningDrawing=drawing;return ;}
}
if(v4W.B28(this.layout.chartType,"baseline_delta")&&v4W.D28(chart.baseline.userLevel,false)){var y0=this.valueFromPixelUntransform(v4W.f28(this.cy,5),this.currentPanel),y1=this.valueFromPixelUntransform(this.cy+5,this.currentPanel),x0=v4W.H28(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10));if(v4W.G28(chart.baseline.actualLevel,y0)&&v4W.o28(chart.baseline.actualLevel,y1)&&v4W.A28(this.cx,x0)){this.repositioningBaseline={lastDraw:Date.now()}
;return ;}
}
this.drawingClick(this.currentPanel,this.cx,this.cy);if(this.activeDrawing&&this.activeDrawing.dragToDraw)return ;}
this.grabbingScreen=true;this.yToleranceBroken=false;if(!e)e=event;this.grabStartX=e.clientX;this.grabStartY=e.clientY;this.grabStartScrollX=chart.scroll;this.grabStartScrollY=chart.panel.yAxis.scroll;this.grabStartCandleWidth=this.layout.candleWidth;this.grabStartZoom=this.whichYAxis(this.currentPanel).zoom;setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);this.runAppend("mousedown",arguments);}
;STXChart.prototype.changeVectorType=function(value){this.currentVectorParameters.vectorType=value;if(STXChart.drawingLine)this.undo();this.setCrosshairColors();if(STXChart.insideChart)this.doDisplayCrosshairs();}
;STXChart.prototype.rightClickOverlay=function(name){var H9V="kOv",s5V="Cli",n4H="ht",v8V="rightClickOverlay";if(this.runPrepend(v8V,arguments))return ;var sd=this.overlays[name];if(sd.editFunction){sd.editFunction();}
else{this.removeOverlay(name);}
this.runAppend((o8V+v6V+K6V+n4H+s5V+o1H+H9V+E4H+P1H+W7V),arguments);}
;STXChart.prototype.removeOverlay=function(name){var C3V="removeOverlay";if(this.runPrepend(C3V,arguments))return ;var mySD;for(var o in this.overlays){var sd=this.overlays[o];if(sd.inputs.Field&&sd.inputs.Field.indexOf(name)!=-v4W.d9H){this.removeOverlay(sd.name);}
else if(v4W.Z28(sd.name,name)){mySD=sd;}
}
var study=this.layout.studies[name];STX.deleteRHS(STX.Studies.studyPanelMap,study);if(mySD)this.cleanupRemovedStudy(mySD);delete  this.overlays[name];this.displaySticky();this.createDataSet();this.changeOccurred((h7V+W7V+z4H+m8V));this.runAppend(C3V,arguments);}
;STXChart.prototype.addSeries=function(field,parameters,cb){if(this.runPrepend("addSeries",arguments))return ;if(!parameters)parameters={}
;if(!parameters.chartName)parameters.chartName=this.chart.name;var obj={parameters:STX.clone(parameters),yValueCache:[],display:field}
;if(v4W.s28("display",obj.parameters))obj.display=obj.parameters.display;if(obj.parameters.isComparison)obj.parameters.shareYAxis=true;if(!obj.parameters.chartType&&obj.parameters.color)obj.parameters.chartType="line";if(obj.parameters.chartType&&v4W.i28(obj.parameters.chartType,"mountain"))obj.parameters.chartType="line";if(!obj.parameters.panel)obj.parameters.panel=this.chart.panel.name;var chart=this.charts[parameters.chartName],self=this;function addSeriesData(stx){var mIterator=0,cIterator=0;while(parameters.data&&v4W.u28(mIterator,stx.masterData.length)&&v4W.J28(cIterator,parameters.data.length)){var c=parameters.data[cIterator],m=stx.masterData[mIterator];if(!c.DT||typeof c.DT=="undefined")c.DT=STX.strToDateTime(c.Date);if(v4W.W08(c.DT.getTime(),m.DT.getTime())){if(typeof c.Value!="undefined"){m[field]=c.Value;}
else if(stx.layout.adj&&typeof c.Adj_Close!="undefined"){m[field]=c.Adj_Close;}
else{m[field]=c.Close;}
cIterator++;mIterator++;continue;}
if(v4W.b08(c.DT,m.DT))cIterator++;else mIterator++;}
}
function setUpRenderer(stx,obj){if(obj.parameters.color){var r=stx.getSeriesRenderer("_generic_series");if(!r){r=stx.setSeriesRenderer(new STX.Renderer.Lines({params:{panel:obj.parameters.panel,type:"legacy",name:"_generic_series",overChart:true}
,}
));}
r.attachSeries(field,obj.parameters).ready();}
}
if(chart){chart.series[field]=obj;}
if(parameters.isComparison){self.setComparison(true,chart);}
var doneInCallback=false;if(parameters.data){if(parameters.data.useDefaultQuoteFeed){var driver=this.quoteDriver,fetchParams=driver.makeParams(field,this.chart);fetchParams.startDate=this.chart.masterData[0].DT;fetchParams.endDate=this.chart.masterData[v4W.C08(this.chart.masterData.length,1)].DT;if(parameters.symbolObject)fetchParams.symbolObject=parameters.symbolObject;doneInCallback=true;driver.quoteFeed.fetch(fetchParams,function(dataCallback){var j4H=9254495,r1H="eDrive",d1H="uot",N4V="allb",g5V="eit",z6V="ecaus",H5V="iodicity",s4H=5036346,o4H=1453250635,Q4H=1956227893;if(!dataCallback.error){parameters.data=dataCallback.quotes;addSeriesData(self);setUpRenderer(self,obj);}
var u8H=Q4H,N8H=o4H,V8H=v4W.j9H;for(var w8H=v4W.d9H;v4W.O8H.M8H(w8H.toString(),w8H.toString().length,s4H)!==u8H;w8H++){consolidate(this,p);stopPointer++;this.storePanels();console.log((o1H+P1H+q9V+q9V+c0H+R1H+o1H+d1V+e1H+R1H+r9V+e1H+o8V+H5V+R1H+X0H+z6V+e1H+R1H+q9V+g5V+O8V+o8V+R1H+Q1H+P1H+m8V+P1H+T0V+N4V+P1H+o1H+I5V+R1H+X9V+o8V+R1H+D9V+d1H+r1H+o8V+R1H+P1H+o8V+e1H+R1H+u8V+S4H));V8H+=v4W.j9H;}
if(v4W.O8H.M8H(V8H.toString(),V8H.toString().length,j4H)!==N8H){this.runAppend(H9H,arguments);this.setLocale(this.locale);panel.title.appendChild(document.createTextNode(panel.display));context.moveTo(xx,cache.close);this.changeOccurred(K0H);}
if(cb)cb(dataCallback.error);self.runAppend("addSeries",arguments);}
);}
else if(this.masterData){addSeriesData(this);}
}
else{obj.addSeriesData=addSeriesData;}
if(!doneInCallback){setUpRenderer(self,obj);if(cb)cb();this.runAppend("addSeries",arguments);}
return obj;}
;STXChart.prototype.removeSeries=function(field,chart){var h1V="ies",l0V="eS",B4H="ov",D6V="rem";if(this.runPrepend((D6V+d3V+r5H+e1H+o8V+v6V+e4H),arguments))return ;if(!chart)chart=this.chart;delete  chart.series[field];var compare=false;for(var s in chart.series){if(chart.series[s].parameters.isComparison){compare=true;break;}
}
this.setComparison(compare,chart);for(var panel in this.panels){if(v4W.r08(this.panels[panel].name.indexOf(STX.Comparison.correlationPanel),0)){var compareArray=this.layout.studies[this.panels[panel].name].inputs["Compare To"];for(var i=0;v4W.p08(i,compareArray.length);i++){if(v4W.v08(compareArray[i],field))compareArray.splice(i,1);}
delete  this.layout.studies[this.panels[panel].name].outputs["Result "+field];delete  this.layout.studies[this.panels[panel].name].outputMap["Result "+field+" "+this.panels[panel].name];if(!compareArray.length)this.panelClose(this.panels[panel]);}
}
this.runAppend((D6V+B4H+l0V+c1H+h1V),arguments);}
;STXChart.prototype.rendererAction=function(chart,phase){var W9V="rendererAction";if(this.runPrepend(W9V,arguments))return ;for(var id in chart.seriesRenderers){var renderer=chart.seriesRenderers[id];if(renderer.params.overChart&&v4W.S08(phase,b0H))continue;if(!renderer.params.overChart&&v4W.g08(phase,W9H))continue;if(!this.panels[renderer.params.panel])continue;if(v4W.x08(this.panels[renderer.params.panel].chart,chart))continue;if(v4W.Y08(phase,I2H)){renderer.performCalculations();}
else{renderer.draw();if(renderer.cb)renderer.cb(renderer.colors);}
}
this.runAppend(W9V,arguments);}
;STXChart.prototype.drawSeries=function(chart,seriesArray,yAxis){var d2V="To",n5H="ap",f1H="ep",l6H="eries";if(this.runPrepend((Q1H+o8V+P1H+z7V+r5H+l6H),arguments))return ;var quotes=chart.dataSegment,legendColorMap={}
,series=null;if(!seriesArray)seriesArray=chart.series;for(var field in seriesArray){series=seriesArray[field];var parameters=series.parameters;if(!parameters.chartType)continue;var panel=chart.panel;if(parameters.panel)panel=this.panels[parameters.panel];if(!panel)continue;var yax=yAxis?yAxis:panel.yAxis,minMax=[parameters.minimum,parameters.maximum];if((!parameters.minimum&&v4W.e08(parameters.minimum,0))||(!parameters.maximum&&v4W.j08(parameters.maximum,0))){var minMaxCalc=STX.minMax(quotes,field);if(!parameters.minimum&&v4W.q08(parameters.minimum,0))minMax[0]=minMaxCalc[0];if(!parameters.maximum&&v4W.K08(parameters.maximum,0))minMax[1]=minMaxCalc[1];}
var min=minMax[0],top=yax.top,bottom=yax.bottom,height=v4W.T08(bottom,top),t=parameters.marginTop,b=parameters.marginBottom;if(t)top=v4W.V08(t,1)?(top+t):(top+(v4W.X08(height,t)));if(b)bottom=v4W.R08(b,1)?(v4W.M18(bottom,b)):(v4W.h18(bottom,(height*b)));var multiplier=v4W.P18((bottom-top),(minMax[1]-min)),started=false,lastPoint=null,val=null,x=null,y=null,px=null,py=null,cw=this.layout.candleWidth,context=this.chart.context,isStep=(v4W.F18(parameters.type,(u8V+m8V+f1H))||v4W.a18(parameters.subtype,"step")),color=parameters.color;if(!color)color=this.defaultColor;var width=parameters.width;if(!width||isNaN(width)||v4W.L18(width,1))width=1;if(series.highlight||series.parameters.highlight)width*=2;this.startClip(panel.name);seriesPlotter=new STX.Plotter();seriesPlotter.newSeries("line","stroke",color,1,width);if(parameters.gaps&&parameters.gaps.color)seriesPlotter.newSeries((K6V+n5H),"stroke",parameters.gaps.color,1,width);else seriesPlotter.newSeries("gap","stroke",color,1,width);series.yValueCache=new Array(quotes.length);var yValueCache=series.yValueCache,lastQuote=null,gap=null,points=[],doTransform=series.parameters.shareYAxis&&!yAxis,shareYAxis=series.parameters.shareYAxis||yAxis,xbase=v4W.Q18(panel.left,(isStep?1:0.5)*cw,this.micropixels,1),x0=xbase;for(var i=0;v4W.H18(i,quotes.length);i++){xbase+=v4W.G18(cw,2);if(isStep)xbase+=v4W.o18(cw,2);cw=this.layout.candleWidth;if(!isStep)xbase+=v4W.A18(cw,2);if(v4W.Z18(x,null)&&v4W.s18(y,null)){if(!gap||parameters.gaps)points.push([x,y]);}
var quote=quotes[i];if(!quote)continue;if(quote.candleWidth){if(!isStep)xbase+=v4W.i18((quote.candleWidth-cw),2);cw=quote.candleWidth;}
if(quote.transform&&doTransform)quote=quote.transform;val=quote[field];if(!val&&v4W.u18(val,0)){if(isStep||parameters.gaps){yValueCache[i]=y;}
if(v4W.J18(gap,false)){if(isStep){x+=cw;seriesPlotter.lineTo("line",x,y);}
seriesPlotter.moveTo("gap",x,y);}
gap=true;if(x&&!parameters.gaps)points.push([x,bottom]);continue;}
if(!isStep&&lastPoint&&v4W.W48(lastPoint,i-1)){px=x;py=y;}
else{px=null;}
x=xbase;if(v4W.b48(x,panel.right))lastQuote=quote;if(this.extendLastTick&&v4W.C48(i,quotes.length-1)){x+=this.offset;}
if(isStep&&started){if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.push([x,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo("line",x,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":"line"),x,y);}
points.push([x,y]);}
if(shareYAxis){y=this.pixelFromPrice(val,panel,yax);}
else{y=v4W.r48(bottom,((val-min)*multiplier));}
if(v4W.p48(px,null)){var vector={x0:px,x1:x,y0:py,y1:y}
;for(;v4W.v48(lastPoint,i);lastPoint++){var xInt=panel.left+Math.floor(xbase+v4W.S48(((lastPoint-i)+0.5),cw))+this.micropixels-1,yInt=STX.yIntersection(vector,xInt);yValueCache[lastPoint]=yInt;}
}
yValueCache[i]=y;if(i&&points.length&&started&&!yValueCache[v4W.g48(i,1)]&&v4W.x48(yValueCache[i-1],0)){for(var bf=v4W.Y48(i,1);v4W.e48(bf,0);bf--){if(yValueCache[bf])break;yValueCache[bf]=points[v4W.j48(points.length,1)][1];}
}
if(!started){started=true;var leftTick=v4W.q48(chart.dataSet.length,chart.scroll);if(v4W.K48(leftTick,0)){seriesPlotter.moveTo((gap?"gap":"line"),x,y);}
else{var baseline=chart.dataSet[leftTick];if(baseline.transform&&doTransform)baseline=baseline.transform;var y0=baseline[field];if(shareYAxis){y0=this.pixelFromPrice(y0,panel,yax);}
else{y0=v4W.T48(bottom,((y0-min)*multiplier));}
y0=Math.min(Math.max(y0,top),bottom);if(isNaN(y0)){seriesPlotter.moveTo((gap?"gap":(a9V+q9V+e1H)),x,y);}
else{seriesPlotter.moveTo((gap?"gap":"line"),x0,y0);if(isStep){if(gap){if(parameters.gaps)seriesPlotter.lineTo("gap",x,y0);else seriesPlotter.moveTo("gap",x,y0);}
else seriesPlotter.lineTo("line",x,y0);}
if(!gap||parameters.gaps){if(isStep)points.unshift([x,y0]);points.unshift([x0,y0]);}
if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.unshift([x,bottom]);points.unshift([x0,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo("line",x,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":"line"),x,y);}
}
}
}
else{if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.push([x,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo("line",x,y,parameters.pattern);if(isStep&&v4W.V48(i,quotes.length-1))seriesPlotter.dashedLineTo("line",x+cw,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":"line"),x,y);if(isStep&&v4W.X48(i,quotes.length-1)&&!gap)seriesPlotter.lineTo("line",x+cw,y);}
}
lastPoint=i;if(gap)seriesPlotter.moveTo("line",x,y);gap=false;}
if(gap){x=panel.left+Math.floor(xbase+cw+this.micropixels)-1;if(this.extendLastTick)x+=this.offset;if(parameters.gaps&&parameters.gaps.pattern){if(started){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
}
else if(parameters.gaps){seriesPlotter.lineTo("gap",x,y);}
}
if(v4W.R48(series.parameters.chartType,"mountain")&&points.length){points.push([x,(gap&&!parameters.gaps)?bottom:y]);if(!parameters.fillStyle){parameters.fillStyle=color;if(!parameters.fillOpacity)parameters.fillOpacity=0.3;}
seriesPlotter.newSeries("mountain","fill",parameters.fillStyle,parameters.fillOpacity);for(var pt=0;v4W.M78(pt,points.length);pt++){seriesPlotter[pt?(a9V+q9V+e1H+d2V):"moveTo"]("mountain",points[pt][0],Math.min(bottom,points[pt][1]));}
seriesPlotter.lineTo("mountain",x,bottom);seriesPlotter.lineTo("mountain",points[0][0],bottom);seriesPlotter.draw(context,"mountain");}
seriesPlotter.draw(context,"gap");seriesPlotter.draw(context,"line");this.endClip();if(shareYAxis&&lastQuote){if(yax.priceFormatter){txt=yax.priceFormatter(this,panel,lastQuote[field],yax);}
else{txt=this.formatYAxisPrice(lastQuote[field],panel,null,yax);}
this.yAxisLabels.push({src:"series","args":[panel,txt,this.pixelFromPrice(lastQuote[field],panel,yax),color,null,null,yax]}
);}
var display=series.parameters.display;if(!display)display=series.display;legendColorMap[field]={color:color,display:display}
;}
if(chart.legend&&series&&series.useChartLegend){if(chart.legendRenderer)chart.legendRenderer(this,{"chart":chart,"legendColorMap":legendColorMap,"coordinates":{x:chart.legend.x,y:chart.legend.y+chart.panel.yAxis.top}
}
);}
this.runAppend("drawSeries",arguments);}
;STXChart.prototype.isDailyInterval=function(interval){if(v4W.h78(interval,Q2H))return i5V;if(v4W.P78(interval,x7H))return i5V;if(v4W.F78(interval,h5H))return i5V;return w1V;}
;STXChart.prototype.setPeriodicityV2=function(period,interval,timeUnit,cb){var p9V="Dri",y4H="ck",a7H="llba",F1H="Ca",k3V="ei",E7V="erio",z9H="anno",T8V="tyV2",M5V="ici",e7V="Pe";if(this.runPrepend((u8V+S4H+e7V+o8V+v6V+X9V+Q1H+M5V+T8V),arguments))return ;if(typeof timeUnit==="function"){cb=timeUnit;timeUnit=null;}
var switchInterval=false;if(interval){if(v4W.a78(interval,"year")){interval="month";if(!period)period=1;period=v4W.L78(period,12);}
var getDifferentData=false;if(this.chart.symbol){var isDaily=this.isDailyInterval(interval),wasDaily=this.isDailyInterval(this.layout.interval);if(isDaily)timeUnit=null;else if(v4W.Q78(interval,"tick"))timeUnit=null;else if(!timeUnit)timeUnit="minute";if(v4W.t78(isDaily,wasDaily)||this.dontRoll)getDifferentData=true;if(!wasDaily){if(v4W.E78(this.layout.interval,interval))getDifferentData=true;}
if(v4W.z78(timeUnit,this.layout.timeUnit))getDifferentData=true;}
if(getDifferentData){this.layout.interval=interval;this.layout.periodicity=period;this.layout.timeUnit=timeUnit;this.changeOccurred("layout");if(this.quoteDriver){for(var c in this.charts){if(this.charts[c].symbol)this.quoteDriver.newChart({symbol:this.charts[c].symbol,chart:this.charts[c]}
,cb);}
return ;}
else if(this.dataCallback){this.dataCallback();if(cb)cb(null);return ;}
else{console.log((o1H+z9H+m8V+R1H+o1H+d1V+e1H+R1H+r9V+E7V+Q1H+M5V+m8V+W7V+R1H+X0H+e1H+o1H+P1H+k8V+u8V+e1H+R1H+q9V+k3V+m8V+O8V+o8V+R1H+Q1H+h6H+P1H+F1H+a7H+y4H+R1H+X9V+o8V+R1H+D9V+w2H+m8V+e1H+p9V+w7V+c1H+R1H+P1H+V5V+R1H+u8V+S4H));return ;}
}
this.layout.interval=interval;}
var chartName,chart;for(chartName in this.charts){chart=this.charts[chartName];var dt,pos=Math.round(v4W.l78(chart.maxTicks,2));this.setCandleWidth(this.layout.candleWidth,chart);var centerMe=true,rightAligned=false;if(v4W.d78(chart.scroll,chart.maxTicks))centerMe=false;else if(chart.dataSegment&&!chart.dataSegment[pos]){centerMe=false;rightAligned=v4W.y78(chart.scroll,chart.dataSet.length);}
if(centerMe&&chart.dataSegment&&v4W.I78(chart.dataSegment.length,0)){if(v4W.w78(chart.maxTicks,((Math.round((this.chart.width/this.layout.candleWidth)-0.499)-1)/2))){pos=v4W.N78(chart.dataSegment.length,1);}
if(v4W.c78(pos,chart.dataSegment.length)){dt=chart.dataSegment[v4W.O35(chart.dataSegment.length,1)].DT;pos=v4W.m35(chart.dataSegment.length,1);}
else{dt=chart.dataSegment[pos].DT;}
}
this.layout.periodicity=period;this.createDataSet();if(centerMe){if(chart.dataSegment&&v4W.k35(chart.dataSegment.length,0)){for(var i=v4W.n35(chart.dataSet.length,1);v4W.U35(i,0);i--){var nd=chart.dataSet[i].DT;if(v4W.B35(nd.getTime(),dt.getTime())){chart.scroll=(v4W.D35(chart.dataSet.length,i))+pos;break;}
}
}
}
else if(!rightAligned){var wsInTicks=Math.round(v4W.f35(this.preferences.whitespace,this.layout.candleWidth));chart.scroll=v4W.H35(chart.maxTicks,wsInTicks);}
else{chart.scroll=chart.dataSet.length+rightAligned;}
}
if(this.displayInitialized)this.draw();this.changeOccurred("layout");if(this.quoteDriver){for(chartName in this.charts){chart=this.charts[chartName];if(chart.symbol&&chart.moreAvailable){this.quoteDriver.checkLoadMore(chart);}
}
}
if(cb)cb(null);this.runAppend("setPeriodicityV2",arguments);}
;STXChart.prototype.drawVectors=function(){var f2H="Vect";if(this.vectorsShowing)return ;if(this.runPrepend("drawVectors",arguments))return ;this.vectorsShowing=true;if(!this.chart.hideDrawings){var tmpPanels={}
,panelName,i;for(i=0;v4W.G35(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];panelName=drawing.panelName;if(!this.panels[drawing.panelName])continue;if(!tmpPanels[panelName]){tmpPanels[panelName]=[];}
tmpPanels[panelName].push(drawing);}
for(panelName in tmpPanels){this.startClip(panelName);var arr=tmpPanels[panelName];for(i=0;v4W.o35(i,arr.length);i++){arr[i].render(this.chart.context);}
this.endClip();}
}
this.runAppend((Q1H+o8V+T2H+f2H+X9V+b4V),arguments);}
;STXChart.prototype.consolidatedQuote=function(quotes,position,periodicity,interval,timeUnit,dontRoll,alignToHour){if(v4W.A35(position,0))return null;var arguments$=[quotes,position,periodicity,interval,dontRoll,alignToHour];if(this.runPrepend("consolidatedQuote",arguments$))return null;if(!dontRoll&&this.dontRoll)dontRoll=true;var quote=quotes[position];function consolidate(self,p){var ratio=1;if(self.layout.adj&&quotes[p].Adj_Close){ratio=v4W.Z35(quotes[p].Adj_Close,quotes[p].Close);}
if(v4W.s35("High",quotes[p]))if(v4W.i35(quotes[p].High*ratio,quote.High))quote.High=v4W.u35(quotes[p].High,ratio);if(v4W.J35("Low",quotes[p]))if(v4W.W85(quotes[p].Low*ratio,quote.Low))quote.Low=v4W.b85(quotes[p].Low,ratio);quote.Volume+=quotes[p].Volume;if(v4W.C85("Close",quotes[p])&&v4W.r85(quotes[p].Close,null))quote.Close=v4W.p85(quotes[p].Close,ratio);quote.ratio=ratio;for(var element in quotes[p]){if(!quote[element]){quote[element]=quotes[p][element];}
}
}
function newInterval(p,interval){var d1=quotes[v4W.v85(p,1)].DT,d2=quotes[p].DT;if(v4W.S85(interval,"week")){if(v4W.g85(d2.getDay(),d1.getDay()))return true;}
else if(v4W.x85(interval,"month")){if(v4W.Y85(d2.getMonth(),d1.getMonth()))return true;}
else{if(v4W.e85(d2.getDay(),d1.getDay()))return true;}
return false;}
function newIntradayInterval(position,p,periodicity,interval,timeUnit){var nextBar=v4W.j85(interval,periodicity),d1=new Date(quotes[position].DT);if(v4W.q85(timeUnit,"millisecond"))d1.setMilliseconds(d1.getMilliseconds()+nextBar);else if(v4W.K85(timeUnit,"second"))d1.setSeconds(d1.getSeconds()+nextBar);else d1.setMinutes(d1.getMinutes()+nextBar);var d2=quotes[p].DT;if(alignToHour){if(v4W.T85(quotes[position].DT.getMinutes(),nextBar)){if(v4W.V85(d2.getMinutes()%nextBar,0)){return true;}
}
}
if(v4W.X85(d2.getTime(),d1.getTime()))return true;return false;}
var p=position,i;if((v4W.R85(interval,"week")||v4W.M95(interval,(h5H)))&&!dontRoll){for(i=1;v4W.h95(i,periodicity);i++){while(v4W.P95(p+1,quotes.length)&&!newInterval(p+1,interval)){p++;consolidate(this,p);}
if(v4W.F95(i,periodicity)){p++;if(v4W.a95(p,quotes.length))consolidate(this,p);}
}
}
else if(!this.isDailyInterval(interval)&&v4W.L95(interval,"tick")&&v4W.Q95(periodicity,1)){for(i=1;v4W.t95(i,periodicity);i++){p=position+i;if(v4W.E95(p,quotes.length)&&newIntradayInterval(position,p,periodicity,interval,timeUnit)){p--;break;}
if(v4W.z95(p,0)&&v4W.l95(p,quotes.length)){consolidate(this,p);}
}
}
else{for(i=1;v4W.d95(i,periodicity);i++){p=position+i;if(v4W.y95(p,0)&&v4W.I95(p,quotes.length)){consolidate(this,p);}
}
}
for(i in this.plugins){var plugin=this.plugins[i];if(plugin.consolidate)plugin.consolidate(quotes,position,p,quote);}
this.runAppend("consolidatedQuote",arguments$);return {"quote":quote,"position":p+1}
;}
;U(v4W.q9H);L(v4W.d9H);D(v4W.j9H);H(v4W.s9H);Y(v4W.u9H);A(v4W.u2V);K(G2V);STXChart.prototype.displayChart=function(chart){var v9H="sc",u1H="lt",s1H="_de",b4H="baseli",p7V="bor",y6H="olo",C7H="ef",e0V="rder",D8V="e_",B6H="ndl",f6V="tx_c",L2H="dow",t2V="le_",X5H="x_b",I8V="ine_",m5H="stx_l",g4V="wn",Q1V="do",Y0H="i_",o9H="ka",h5V="x_",noBorders=(v4W.w95(this.layout.candleWidth-chart.tmpWidth,2)&&v4W.N95(chart.tmpWidth,3));if(this.runPrepend("displayChart",arguments))return ;this.chart.baseLegendColors=[];var chartType=this.layout.chartType,colorFunction=null;if(chart.customChart){if(chart.customChart.chartType)chartType=chart.customChart.chartType;if(chart.customChart.colorFunction)colorFunction=chart.customChart.colorFunction;}
this.controls.baselineHandle.style.display="none";var panel=chart.panel;if(v4W.c95(this.layout.aggregationType,"kagi")){this.drawKagiSquareWave(panel,"stx_kagi_up","stx_kagi_down");this.chart.baseLegendColors.push(this.getCanvasColor("stx_kagi_up"));this.chart.baseLegendColors.push(this.getCanvasColor((u8V+m8V+h5V+o9H+K6V+Y0H+Q1V+g4V)));}
else if(v4W.O55(this.layout.aggregationType,"pandf")){this.drawPointFigureChart(panel,"stx_pandf_up","X");this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_up"));this.drawPointFigureChart(panel,"stx_pandf_down","O");this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_down"));}
else if(v4W.m55(chartType,"line")){this.drawLineChart(panel,"stx_line_chart");}
else if(v4W.k55(chartType,"mountain")){this.chart.baseLegendColors=null;this.drawMountainChart(panel);}
else if(v4W.n55(chartType,"wave")){this.drawWaveChart(panel);}
else if(v4W.U55(chartType,"bar")){this.startClip(panel.name);this.drawBarChartHighPerformance(panel,"stx_bar_chart");this.endClip();}
else if(v4W.B55(chartType,"colored_line")){this.startClip(panel.name);var stxLineUpColor=this.getCanvasColor("stx_line_up"),stxLineDownColor=this.getCanvasColor((m5H+I8V+Q1V+z7V+q9V)),stxLineColor=this.getCanvasColor("stx_line_chart");if(!colorFunction)colorFunction=function(stx,quote,mode){if(v4W.D55(quote.Close,quote.iqPrevClose))return stxLineUpColor;else if(v4W.f55(quote.Close,quote.iqPrevClose))return stxLineDownColor;else return stxLineColor;return null;}
;var colors1=this.drawLineChart(panel,"stx_line_chart",colorFunction);for(var c1 in colors1)this.chart.baseLegendColors.push(c1);this.endClip();}
else if(v4W.H55(chartType,"colored_bar")){this.startClip(panel.name);if(colorFunction){var colors2=this.drawBarChart(panel,"stx_bar_chart",colorFunction);for(var c2 in colors2)this.chart.baseLegendColors.push(c2);}
else{this.drawBarChartHighPerformance(panel,(u8V+m8V+X5H+G5H+l4H+A2H),STXChart.CLOSEUP);this.drawBarChartHighPerformance(panel,"stx_bar_down",STXChart.CLOSEDOWN);this.drawBarChartHighPerformance(panel,"stx_bar_even",STXChart.CLOSEEVEN);this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_up"));this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_down"));}
this.endClip();}
else if(v4W.G55(chartType,"hollow_candle")||v4W.o55(chartType,"volume_candle")){this.startClip(panel.name);if(colorFunction){if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadows(panel,colorFunction);this.drawCandles(panel,colorFunction,false);this.drawCandles(panel,colorFunction,true);}
else{if(!this.noWicksOnCandles[this.layout.aggregationType]){this.drawShadowsHighPerformance(panel,"stx_hollow_candle_up",STXChart.CLOSEUP);this.drawShadowsHighPerformance(panel,"stx_hollow_candle_down",STXChart.CLOSEDOWN);this.drawShadowsHighPerformance(panel,"stx_hollow_candle_even",STXChart.CLOSEEVEN);}
var colorUp=this.getCanvasColor("stx_hollow_candle_up"),colorDown=this.getCanvasColor("stx_hollow_candle_down"),colorEven=this.getCanvasColor("stx_hollow_candle_even");this.drawCandlesHighPerformance(panel,colorUp,"transparent",v4W.A55(STXChart.CLOSEUP,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,colorDown,"transparent",v4W.Z55(STXChart.CLOSEDOWN,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,colorEven,"transparent",v4W.s55(STXChart.CLOSEEVEN,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,this.containerColor,colorUp,v4W.i55(STXChart.CLOSEUP,STXChart.CANDLEUP));this.drawCandlesHighPerformance(panel,this.containerColor,colorDown,v4W.u55(STXChart.CLOSEDOWN,STXChart.CANDLEUP));this.drawCandlesHighPerformance(panel,this.containerColor,colorEven,v4W.J55(STXChart.CLOSEEVEN,STXChart.CANDLEUP));this.chart.baseLegendColors.push(colorUp);this.chart.baseLegendColors.push(colorDown);}
this.endClip();}
else if(v4W.W65(chartType,"candle")){this.startClip(panel.name);var coloredShadowUp=this.getCanvasColor("stx_candle_shadow_up"),coloredShadowDown=this.getCanvasColor("stx_candle_shadow_down"),coloredShadow=(v4W.b65(coloredShadowUp,coloredShadowDown));if(!colorFunction&&coloredShadow){var stxCandleShadow=this.getCanvasColor((u8V+m8V+L7V+l4H+o1H+P1H+q9V+Q1H+t2V+u8V+b6V+P1H+L2H)),stxCandleUpColor=this.getCanvasColor("stx_candle_up"),stxCandleDownColor=this.getCanvasColor("stx_candle_down"),stxCandleUp=this.canvasStyle("stx_candle_up"),stxCandleDown=this.canvasStyle("stx_candle_down");colorFunction=function(stx,quote,mode){if(v4W.C65(mode,"shadow")){if(coloredShadow){if(v4W.r65(quote.Close,quote.Open))return coloredShadowUp;else if(v4W.p65(quote.Close,quote.Open))return coloredShadowDown;}
return stxCandleShadow;}
else if(v4W.v65(mode,"solid")){if(v4W.S65(quote.Close,quote.Open))return stxCandleUpColor;else if(v4W.g65(quote.Close,quote.Open))return stxCandleDownColor;else if(v4W.x65(quote.Close,quote.Open))return stxCandleShadow;}
else if(v4W.Y65(mode,"outline")){var styleArray1;if(v4W.e65(quote.Close,quote.Open))styleArray1=stxCandleUp;else if(v4W.j65(quote.Close,quote.Open))styleArray1=stxCandleDown;else return null;var borderColor=styleArray1["border-left-color"];if(!borderColor)borderColor=styleArray1.borderLeftColor;return borderColor;}
return null;}
;}
if(colorFunction){if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadows(panel,colorFunction);this.drawCandles(panel,colorFunction,false);if(!noBorders)this.drawCandles(panel,colorFunction,true);}
else{if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadowsHighPerformance(panel,"stx_candle_shadow");var styleArray=this.canvasStyle((u8V+f6V+P1H+B6H+D8V+k8V+r9V)),borderColor=styleArray[(X0H+X9V+e0V+K8V+b5V+C7H+m8V+K8V+o1H+y6H+o8V)];if(!borderColor)borderColor=styleArray.borderLeftColor;if(noBorders)borderColor=null;this.drawCandlesHighPerformance(panel,this.getCanvasColor("stx_candle_up"),borderColor,STXChart.CANDLEUP);this.chart.baseLegendColors.push(styleArray.color);styleArray=this.canvasStyle("stx_candle_down");borderColor=styleArray[(p7V+U1H+K8V+b5V+e1H+C4H+K8V+o1H+X9V+b5V+X9V+o8V)];if(!borderColor)borderColor=styleArray.borderLeftColor;if(noBorders)borderColor=null;this.drawCandlesHighPerformance(panel,this.getCanvasColor("stx_candle_down"),borderColor,STXChart.CANDLEDOWN);this.chart.baseLegendColors.push(styleArray.color);}
this.endClip();}
else if(v4W.q65(chartType,(b4H+q9V+e1H+s1H+u1H+P1H))){this.startClip(panel.name);this.setStyle("stx_baseline_trace","opacity",0);this.drawLineChart(panel,"stx_baseline_trace");var baseline=chart.baseline.actualLevel;if(v4W.K65(baseline,null)){baseline=this.pixelFromPriceTransform(baseline,chart.panel);var styles={"over":"stx_baseline_up","under":"stx_baseline_down"}
;for(var s in styles){var parameters={panelName:"chart",band:"Close",threshold:chart.baseline.actualLevel,color:this.getCanvasColor(styles[s]),direction:(v4W.T65(s,"over")?1:-1),edgeHighlight:this.getCanvasColor(styles[s]),edgeParameters:{pattern:"solid",lineWidth:parseInt(this.canvasStyle(styles[s]).width,10)+0.1,opacity:1}
}
,color=parameters.color;if(color&&v4W.V65(color,"transparent")){var gradient=chart.context.createLinearGradient(0,(v4W.X65(s,"over")?0:v4W.R65(2,baseline)),0,baseline);gradient.addColorStop(0,STX.hexToRgba(color,60));gradient.addColorStop(1,STX.hexToRgba(color,10));parameters.color=gradient;parameters.opacity=1;}
STX.Studies.preparePeakValleyFill(this,chart.dataSegment,parameters);this.chart.baseLegendColors.push(color);}
this.plotLine(0,1,baseline,baseline,this.containerColor,"line",chart.context,true,{pattern:"solid",lineWidth:"1.1",opacity:1}
);this.plotLine(0,1,baseline,baseline,this.getCanvasColor("stx_baseline"),"line",chart.context,true,{pattern:"dotted",lineWidth:"2.1",opacity:0.5}
);if(v4W.M25(this.chart.baseline.userLevel,false)){this.controls.baselineHandle.style.top=v4W.h25(baseline,parseInt(getComputedStyle(this.controls.baselineHandle).height,10)/2,"px");this.controls.baselineHandle.style.left=v4W.r25(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10),"px");this.controls.baselineHandle.style.display=(z2H);}
}
this.endClip();}
else if(v4W.U25(chartType,(v9H+P1H+m8V+k9V+r9V+b5V+c0H))){this.startClip(panel.name);this.scatter(panel);this.endClip();}
else{this.chart.baseLegendColors=null;}
this.runAppend("displayChart",arguments);}
;STXChart.prototype.calculateATR=function(chart,period){if(!period)period=20;var total=0;for(var i=1;v4W.B25(i,chart.dataSet.length);i++){var prices=chart.dataSet[i],pd=chart.dataSet[v4W.D25(i,1)],trueRange=Math.max(Math.max(v4W.f25(prices.High,prices.Low),v4W.H25(prices.High,pd.Close)),v4W.G25(pd.Close,prices.Low));total+=trueRange;if(v4W.o25(i,period))total-=chart.dataSet[v4W.A25(i,period)].trueRange;prices.trueRange=trueRange;prices.atr=v4W.Z25(total,period);}
}
;STXChart.prototype.currentQuote=function(){var quote=null;if(!this.chart.dataSet)return null;for(var i=v4W.s25(this.chart.dataSet.length,1);v4W.i25(i,0);i--)if(this.chart.dataSet[i])return this.chart.dataSet[i];return null;}
;STXChart.prototype.correctIfOffEdge=function(theChart){if(this.runPrepend("correctIfOffEdge",arguments))return ;for(var chartName in this.charts){var chart=this.charts[chartName],leftPad=Math.round(v4W.u25(chart.maxTicks,3));if(v4W.J25(leftPad,chart.dataSet.length))leftPad=chart.dataSet.length;if(chart.allowScrollPast){var rightPad=v4W.W05(chart.maxTicks,leftPad);if(v4W.b05(chart.maxTicks-rightPad,chart.dataSet.length)){rightPad=v4W.C05(chart.maxTicks,chart.dataSet.length);}
if(v4W.r05(chart.scroll-rightPad,chart.dataSet.length)){chart.scroll=chart.dataSet.length+rightPad;}
if(v4W.p05(chart.scroll,leftPad)){chart.scroll=leftPad;this.micropixels=-this.layout.candleWidth/2;}
}
else{if(v4W.v05(chart.scroll,leftPad)){chart.scroll=leftPad;}
if(v4W.S05(chart.scroll,chart.dataSet.length)){chart.scroll=chart.dataSet.length;}
}
this.preferences.whitespace=v4W.g05((chart.maxTicks-chart.scroll),this.layout.candleWidth);}
this.runAppend("correctIfOffEdge",arguments);}
;STXChart.prototype.createDataSegment=function(theChart){if(this.runPrepend("createDataSegment",arguments))return ;for(var chartName in this.charts){var chart=this.charts[chartName];if(theChart)chart=theChart;chart.baseline.actualLevel=chart.baseline.userLevel?chart.baseline.userLevel:chart.baseline.defaultLevel;chart.dataSegment=[];var position=v4W.x05(chart.dataSet.length,chart.scroll,1);for(var i=-1;v4W.G05(i,chart.scroll)&&v4W.o05(i,chart.maxTicks);i++){position++;if(i==-1&&!chart.baseline.includeInDataSegment)continue;if(v4W.A05(position,chart.dataSet.length)&&v4W.Z05(position,0)){if(chart.dataSet[position].candleWidth){chart.dataSet[position].candleWidth=null;chart.dataSet[position].leftOffset=null;}
chart.dataSegment.push(chart.dataSet[position]);if(v4W.s05(chart.baseline.actualLevel,null)&&v4W.i05(i,0))chart.baseline.actualLevel=chart.dataSet[position].iqPrevClose;}
else if(v4W.u05(position,0)){chart.dataSegment.push(null);}
}
if(v4W.J05(this.layout.chartType,"volume_candle")){var totalVolume=0;for(var v=0;v4W.W15(v,chart.dataSegment.length);v++){if(chart.dataSegment[v])totalVolume+=chart.dataSegment[v].Volume;}
var accumOffset=0;for(var w=0;v4W.b15(w,chart.dataSegment.length);w++){if(chart.dataSegment[w]){if(chart.dataSegment[w].Volume){var workingWidth=chart.width;if(v4W.C15(chart.scroll,chart.maxTicks))workingWidth-=this.preferences.whitespace;chart.dataSegment[w].candleWidth=v4W.r15(workingWidth,chart.dataSegment[w].Volume,totalVolume);chart.dataSegment[w].leftOffset=accumOffset+v4W.U15(chart.dataSegment[w].candleWidth,2);accumOffset+=chart.dataSegment[w].candleWidth;}
else{chart.dataSegment[w].candleWidth=this.layout.candleWidth;chart.dataSegment[w].leftOffset=accumOffset+v4W.B15(this.layout.candleWidth,2);accumOffset+=this.layout.candleWidth;}
}
else{accumOffset+=this.layout.candleWidth;}
}
}
if(theChart)break;}
this.runAppend("createDataSegment",arguments);}
;STXChart.prototype.leftTick=function(){return v4W.D15(this.chart.dataSet.length,this.chart.scroll);}
;STXChart.prototype.getStartDateOffset=function(){for(var ds=0;v4W.f15(ds,this.chart.dataSegment.length);ds++){if(this.chart.dataSegment[ds]){return ds;}
}
return 0;}
;STXChart.prototype.setStartDate=function(dt){for(var i=0;v4W.H15(i,this.chart.dataSet.length);i++){var bar=this.chart.dataSet[i];if(v4W.G15(bar.DT.getTime(),dt.getTime())){this.chart.scroll=v4W.o15(this.chart.dataSet.length,i);this.draw();return ;}
}
}
;STXChart.prototype.updateListeners=function(event){for(var i in this.plugins){var plugin=this.plugins[i];if(plugin.display&&plugin.listener)plugin.listener(this,event);}
}
;STXChart.prototype.clearPixelCache=function(){for(var x in this.panels){var panel=this.panels[x];panel.cacheHigh=null;panel.cacheLow=null;panel.cacheLeft=1000000;panel.cacheRight=-1;}
for(var chartName in this.charts){var chart=this.charts[chartName];if(!chart.dataSet)continue;for(var i=0;v4W.A15(i,chart.dataSet.length);i++){chart.dataSet[i].cache={}
;}
}
}
;STXChart.prototype.createYAxisLabel=function(panel,txt,y,backgroundColor,color,ctx,yAxis){var v1H="mid";if(v4W.Z15(panel.yAxis.drawPriceLabels,false))return ;var yax=yAxis?yAxis:panel.yAxis,context=ctx?ctx:this.chart.context,margin=3,height=this.getCanvasFontSize("stx_yaxis")+v4W.s15(margin,2);this.canvasFont("stx_yaxis",context);var drawBorders=yax.displayBorder||this.axisBorders,tickWidth=drawBorders?3:0,width;try{width=context.measureText(txt).width+tickWidth+v4W.i15(margin,2);}
catch(e){width=yax.width;}
var x=v4W.u15(yax.left,margin,3),textx=x+margin+tickWidth,radius=3,position=(v4W.c15(yax.position,null)?panel.chart.yAxis.position:yax.position);if(v4W.O45(position,"left")){x=yax.left+yax.width+margin-3;width=width*-1;textx=x;radius=-3;context.textAlign="right";}
if(v4W.m45(y+(height/2),yax.bottom))y=v4W.k45(yax.bottom,(height/2));if(v4W.n45(y-(height/2),yax.top))y=yax.top+(v4W.U45(height,2));context.fillStyle=backgroundColor;if(typeof (STX[this.yaxisLabelStyle])=='undefined'){this.yaxisLabelStyle="roundRectArrow";}
var yaxisLabelStyle=this.yaxisLabelStyle;if(yax.yaxisLabelStyle)yaxisLabelStyle=yax.yaxisLabelStyle;STX[yaxisLabelStyle](context,x,v4W.B45(y,(height/2)),width,height,radius,true,false);context.textBaseline=(v1H+s2V+e1H);context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);if(v4W.D45(context.fillStyle,backgroundColor)){if(v4W.f45(backgroundColor.toUpperCase(),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,textx,y+1);context.textAlign=(A2V);}
;STXChart.prototype.createXAxisLabel=function(panel,txt,x,backgroundColor,color,pointed){var context=this.chart.context,margin=2,fontstyle="stx-float-date",height=this.getCanvasFontSize(fontstyle)+v4W.H45(margin,2);this.canvasFont(fontstyle,context);var width;try{width=context.measureText(txt).width+v4W.G45(margin,2);}
catch(e){width=0;}
var y=panel.top+panel.height-height;if(v4W.o45(x+(width/2),panel.right))x=v4W.A45(panel.right,(width/2));if(v4W.Z45(x-(width/2),panel.left))x=panel.left+(v4W.s45(width,2));context.fillStyle=backgroundColor;STX.roundRect(context,v4W.i45(x,(width/2)),y,width,height,3,true,false);if(pointed){var arrowHeight=v4W.u45(panel.bottom,panel.yAxis.bottom,height);context.beginPath();context.moveTo(v4W.c45(x,arrowHeight),y);context.lineTo(x,v4W.O75(y,arrowHeight));context.lineTo(x+arrowHeight,y);context.closePath();context.fill();}
context.textBaseline=(w9H);context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);if(v4W.m75(context.fillStyle,backgroundColor)){if(v4W.k75(backgroundColor.toUpperCase(),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,v4W.n75(x,width/2,margin),y+margin);}
;STXChart.prototype.drawCurrentHR=function(){var b8V="nt_",z3V="_c",Q8V="HR",T0H="rent",a5H="Cu",j0V="dr";if(this.runPrepend((j0V+T2H+a5H+o8V+T0H+Q8V),arguments))return ;var backgroundColor,color;for(var chartName in this.charts){var chart=this.charts[chartName],panel=chart.panel,yAxis=panel.yAxis;if(v4W.a75(yAxis.drawCurrentPriceLabel,false))continue;if(chart.customChart&&v4W.L75(chart.customChart.chartType,"none"))continue;var whichSet=yAxis.whichSet;if(!whichSet)whichSet="dataSet";var l=chart[whichSet].length;if(v4W.Q75(whichSet,"dataSegment")){while(v4W.t75(l,(chart.width-this.micropixels+(this.layout.candleWidth)/2+1)/this.layout.candleWidth))l--;}
if(l){var quote=chart[whichSet][v4W.E75(l,1)],prevClose=quote.Close,currentClose=quote.Close;if(v4W.z75(chart.dataSet.length,2)){var quote2=chart[whichSet][v4W.l75(l,2)];prevClose=quote2.Close;}
if(v4W.d75(currentClose,prevClose)){backgroundColor=this.canvasStyle("stx_current_hr_down").backgroundColor;color=this.canvasStyle("stx_current_hr_down").color;}
else{backgroundColor=this.canvasStyle("stx_current_hr_up").backgroundColor;color=this.canvasStyle((W5V+z3V+k2H+V5V+b8V+b6V+o8V+l4H+A2H)).color;}
if(quote.transform)quote=quote.transform;var txt,labelDecimalPlaces=Math.max(panel.yAxis.printDecimalPlaces,panel.chart.decimalPlaces);if(yAxis.maxDecimalPlaces||v4W.y75(yAxis.maxDecimalPlaces,0))labelDecimalPlaces=Math.min(labelDecimalPlaces,yAxis.maxDecimalPlaces);if(yAxis.priceFormatter){txt=yAxis.priceFormatter(this,panel,quote.Close,labelDecimalPlaces);}
else{txt=this.formatYAxisPrice(quote.Close,panel,labelDecimalPlaces);}
var y=this.pixelFromPrice(quote.Close,panel);this.createYAxisLabel(panel,txt,y,backgroundColor,color);}
}
this.runAppend("drawCurrentHR",arguments);}
;STXChart.prototype.getDefaultColor=function(){var J6H=0.65;this.defaultColor=c7H;var bgColor=q5V,div=this.chart.container;while(!bgColor||STX.isTransparent(bgColor)){var cStyle=getComputedStyle(div);if(!cStyle)return ;bgColor=cStyle.backgroundColor;if(STX.isTransparent(bgColor))bgColor=B3V;div=div.parentNode;if(!div||!div.tagName)break;}
if(bgColor){if(v4W.I75(bgColor,B3V))bgColor=D0V;this.containerColor=bgColor;if(!STX.isTransparent(bgColor)){var hsv=STX.hsv(bgColor),v=hsv[v4W.j9H];if(v4W.w75(v,J6H))this.defaultColor=c7H;else this.defaultColor=D0V;}
else{this.defaultColor=c7H;}
}
else{this.containerColor=D0V;}
}
;STXChart.prototype.startAsyncAction=function(){if(!this.pendingAsyncs)this.pendingAsyncs=[];this.pendingAsyncs.push(i5V);}
;STXChart.prototype.registerChartDrawnCallback=function(fc){if(!this.asyncCallbacks)this.asyncCallbacks=[];this.asyncCallbacks.push(fc);return {fc:fc}
;}
;STXChart.prototype.unregisterChartDrawnCallback=function(obj){for(var i=0;v4W.N75(i,this.asyncCallbacks.length);i++){if(v4W.c75(this.asyncCallbacks[i],obj.fc)){this.asyncCallbacks.splice(i,1);return ;}
}
}
;STXChart.prototype.makeAsyncCallbacks=function(){if(!this.asyncCallbacks)return ;if(!this.pendingAsyncs||!this.pendingAsyncs.length){for(var i=0;v4W.O3h(i,this.asyncCallbacks.length);i++){(this.asyncCallbacks[i])();}
}
}
;STXChart.prototype.completeAsyncAction=function(){this.pendingAsyncs.pop();this.makeAsyncCallbacks();}
;STXChart.prototype.draw=function(){this.debug();if(!this.chart.canvas)return ;if(!this.chart.dataSet)return ;if(!this.chart.canvasHeight)return ;if(!this.useAnimation&&v4W.m3h(new Date()-this.grossDragging,500))return ;this.offset=v4W.k3h(this.layout.candleWidth,this.candleWidthPercent,2);STX.clearCanvas(this.chart.canvas,this);if(this.runPrepend("draw",arguments))return ;if(!this.xaxisHeight){this.xaxisHeight=this.getCanvasFontSize("stx_xaxis")+4;if(this.chart.xAxis.displayBorder||this.axisBorders)this.xaxisHeight+=3;}
this.getDefaultColor();this.vectorsShowing=false;this.drawPanels();this.yAxisLabels=[];var i,chart,chartName,plugin;for(chartName in this.charts){chart=this.charts[chartName];this.correctIfOffEdge();this.createDataSegment();var axisRepresentation=this.createXAxis(chart);this.initializeDisplay(chart);this.rendererAction(chart,"calculate");this.renderYAxis(chart);this.drawXAxis(chart,axisRepresentation);chart.tmpWidth=Math.floor(v4W.F3h(this.layout.candleWidth,this.candleWidthPercent));if(v4W.a3h(chart.tmpWidth%2,0)){chart.tmpWidth+=1;if(v4W.L3h(chart.tmpWidth,this.layout.candleWidth))chart.tmpWidth-=2;}
if(v4W.Q3h(chart.tmpWidth,0.5))chart.tmpWidth=0.5;for(i in this.plugins){plugin=this.plugins[i];if(plugin.display){if(plugin.drawUnder)plugin.drawUnder(this,chart);}
}
this.rendererAction(chart,"underlay");STX.Studies.displayStudies(this,chart,true);this.displayChart(chart);STX.Studies.displayStudies(this,chart,false);this.rendererAction(chart,"overlay");}
for(chartName in this.charts){chart=this.charts[chartName];for(i in this.plugins){plugin=this.plugins[i];if(plugin.display){if(plugin.drawOver)plugin.drawOver(this,chart);}
}
}
for(var panel in this.panels){this.plotYAxisText(this.panels[panel]);}
for(var yLbl=0;v4W.t3h(yLbl,this.yAxisLabels.length);yLbl++){this.createYAxisLabel.apply(this,this.yAxisLabels[yLbl].args);}
this.createCrosshairs();this.drawVectors();this.drawCurrentHR();this.displayInitialized=true;if(this.controls.home){if(v4W.E3h(this.chart.scroll-1,Math.ceil(this.chart.width/this.layout.candleWidth))){this.controls.home.style.display="block";}
else{this.controls.home.style.display="none";}
}
this.positionMarkers();for(chartName in this.charts){chart=this.charts[chartName];if(this.quoteDriver)this.quoteDriver.checkLoadMore(chart);}
this.runAppend("draw",arguments);this.makeAsyncCallbacks();}
;STXChart.prototype.adjustBackingStore=function(canvas,context){this.devicePixelRatio=window.devicePixelRatio||1;if(v4W.z3h(this.devicePixelRatio,1.0))this.devicePixelRatio=1.0;backingStoreRatio=context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||context.backingStorePixelRatio||1;var ratio=v4W.l3h(this.devicePixelRatio,backingStoreRatio);if(!STX.isAndroid||STX.is_chrome){var oldWidth=canvas.width,oldHeight=canvas.height;canvas.width=v4W.d3h(oldWidth,ratio);canvas.height=v4W.y3h(oldHeight,ratio);canvas.style.width=oldWidth+'px';canvas.style.height=oldHeight+'px';context.scale(ratio,ratio);}
}
;STXChart.prototype.resizeCanvas=function(){if(!this.chart.panel)this.chart.panel=this.panels.chart;var canvas=this.chart.canvas,context=this.chart.context;if(canvas&&context){this.chart.tempCanvas.height=canvas.height=this.chart.container.clientHeight;this.chart.tempCanvas.width=canvas.width=this.chart.container.clientWidth;this.adjustBackingStore(canvas,context);this.adjustBackingStore(this.chart.tempCanvas,this.chart.tempCanvas.context);this.floatCanvas.height=this.chart.container.clientHeight;this.floatCanvas.width=this.chart.container.clientWidth;this.adjustBackingStore(this.floatCanvas,this.floatCanvas.context);}
var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.canvasWidth=this.chart.canvasWidth=this.chart.container.clientWidth;this.right=this.left+this.canvasWidth;this.height=this.chart.container.clientHeight;this.width=v4W.I3h(this.right,this.left);this.bottom=this.top+this.height;this.calculateYAxisPositions();this.chart.canvasRight=this.right;this.chart.canvasHeight=this.height;var candleWidth=this.layout.candleWidth;if(typeof (candleWidth)=="undefined")candleWidth=8;for(var chartName in this.charts){var chart=this.charts[chartName];if(this.layout.span){this.setCandleWidth(this.getSpanCandleWidth(this.layout.span),chart);}
else{this.setCandleWidth(candleWidth,chart);if(v4W.w3h(chart.scroll,chart.width/candleWidth)){chart.scroll=Math.floor(v4W.N3h(chart.width,candleWidth));var wsInTicks=Math.round(v4W.c3h(this.preferences.whitespace,this.layout.candleWidth));chart.scroll-=wsInTicks;}
}
var idealNumberOfTicks=10,appxLabelWidth;try{appxLabelWidth=v4W.O8h(context.measureText("10:00").width,2);}
catch(e){appxLabelWidth=100;}
while(v4W.m8h(idealNumberOfTicks,1)){if(v4W.k8h(this.chart.width/appxLabelWidth,idealNumberOfTicks))break;idealNumberOfTicks/=1.5;}
chart.xAxis.autoComputedTickSizePixels=Math.round(v4W.n8h(this.chart.width,idealNumberOfTicks));if(v4W.U8h(chart.xAxis.autoComputedTickSizePixels,1))chart.xAxis.autoComputedTickSizePixels=1;}
}
;STXChart.prototype.setCandleWidth=function(newCandleWidth,chart){if(!chart)chart=this.chart;if(v4W.B8h(newCandleWidth,v4W.q9H))newCandleWidth=v4W.u9H;this.layout.candleWidth=newCandleWidth;chart.maxTicks=Math.ceil(v4W.D8h(this.chart.width,newCandleWidth)+0.5);}
;STXChart.prototype.resizeChart=function(maintainScroll){if(v4W.f8h(maintainScroll,w1V))maintainScroll=i5V;if(maintainScroll)this.preAdjustScroll();var previousHeight=this.chart.canvasHeight;this.resizeCanvas();if(maintainScroll)this.postAdjustScroll();this.adjustPanelPositions();if(this.displayInitialized){this.draw();}
else if(v4W.H8h(this.chart.canvasHeight,v4W.q9H)&&v4W.G8h(previousHeight,v4W.q9H)){this.draw();}
}
;STXChart.prototype.calculateMinutesInSession=function(chart){var m1V=59,minutes=v4W.o8h((chart.endHour-chart.beginHour),L1V);minutes+=chart.endMinute;minutes-=chart.beginMinute;if(v4W.A8h(chart.endMinute,m1V))minutes++;chart.minutesInSession=minutes;}
;STXChart.prototype.newChart=function(symbol,masterData,chart,cb,params){var k2V="igu",w4H="ee",p4V="eF",l1V="ecifi",t0H="Da",E6H="as",b6H="N",O5V="ng",M6V="War",G4V='object';if(!chart)chart=this.chart;if(!params)params={}
;if(params.periodicity){if(params.periodicity.interval)this.layout.interval=params.periodicity.interval;if(params.periodicity.period)this.layout.periodicity=params.periodicity.period;this.layout.timeUnit=params.periodicity.timeUnit;}
var prevSymbol=chart.symbol,prevSymbolObject=STX.clone(chart.symbolObject);if(!symbol){chart.symbol=q5V;chart.symbolObject={symbol:q5V}
;}
else if(typeof symbol==G4V){chart.symbol=symbol.symbol;chart.symbolObject=symbol;}
else{chart.symbol=symbol;chart.symbolObject.symbol=symbol;}
if((v4W.Z8h(chart.endHour,q5V)&&v4W.s8h(chart.beginHour,q5V)&&v4W.i8h(chart.endMinute,q5V)&&v4W.u8h(chart.beginMinute,q5V))||(v4W.J8h(chart.endHour+chart.beginHour+chart.endMinute+chart.beginMinute,v4W.q9H))||this.automaticMarketHours){var hours=STX.LegacyMarket.getHours(chart.symbolObject.symbol,this.layout.extended);chart.endHour=hours.endHour;chart.beginHour=hours.beginHour;chart.endMinute=hours.endMinute;chart.beginMinute=hours.beginMinute;this.automaticMarketHours=i5V;}
if(!masterData&&this.quoteDriver){var callback=function(err){if(err){chart.symbol=prevSymbol;chart.symbolObject=prevSymbolObject;}
if(cb)cb(err);}
;if(params.span&&params.span.multiplier&&params.span.base){this.setSpan({maintainPeriodicity:i5V,multiplier:params.span.multiplier,span:params.span.base,symbol:chart.symbol}
,callback);}
else{var self=this;this.quoteDriver.newChart({symbol:chart.symbol,chart:chart,initializeChart:i5V}
,function(){self.adjustPanelPositions();callback.apply(self,arguments);}
);}
}
else{if(!masterData){console.log((M6V+f9V+O5V+P1V+b6H+X9V+R1H+a5V+E6H+k9V+t0H+m8V+P1H+R1H+u8V+r9V+l1V+v7H+R1H+P1H+q9V+Q1H+R1H+q9V+X9V+R1H+F9H+w2H+m8V+p4V+w4H+Q1H+R1H+o1H+m3V+Y6V+k2V+V5V+Q1H));}
if(!chart.symbol)chart.symbol=N3V;this.setMasterData(masterData,chart);this.createDataSet();this.initializeChart();if(params.span&&params.span.multiplier&&params.span.base){this.setSpan({maintainPeriodicity:i5V,multiplier:params.span.multiplier,span:params.span.base}
);}
else{this.draw();}
this.adjustPanelPositions();if(cb)cb();}
}
;STXChart.prototype.setMasterData=function(masterData,chart){var w0H=' = ',r7V='al',u3V='V',O3V='trings',E8V='vi',c4H='ata',p0V='() ',j2V='Fl',R9V='rs',r8V=((68.,0x211)>23?(45.1E1,'U'):(111.,0x10D)),t5H='. ',j9V='umbe',V9H='ot',a7V='si',r4V='lo',O0H='ta',N2V='rDa',M1H='tMa',j5H='bje',U7H='rDat',C1H='ste',K1H='nd',f8V='T',Y1V='issing',g2H=' : ',G6H='asterD';if(!chart)chart=this.chart;this.calculateMinutesInSession(chart);chart.masterData=masterData;if(v4W.W9h(chart.name,"chart"))this.masterData=masterData;var i;for(i=0;masterData&&v4W.b9h(i,masterData.length);i++){var quotes=masterData[i];if(quotes.DT){quotes.DT=new Date(quotes.DT);quotes.Date=STX.yyyymmddhhmmssmmm(quotes.DT);}
else if(quotes.Date)quotes.DT=STX.strToDateTime(quotes.Date);else console.log((L2V+E3V+y7H+G6H+i0V+E3V+i0V+g2H+y7H+Y1V+S2V+Y1H+f8V+S2V+i0V+K1H+S2V+Y1H+i0V+E3V+m2V+S2V+F4V+W4V+S2V+A1V+i0V+C1H+U7H+i0V+S2V+F4V+j5H+k0V+E3V));if(quotes.Volume&&typeof quotes.Volume!=="number")quotes.Volume=parseInt(quotes.Volume,10);if(quotes.Close&&typeof quotes.Close=='number'){}
else{console.log((f7H+m2V+M1H+C1H+N2V+O0H+g2H+B1H+r4V+f7H+m2V+S2V+u4V+f7H+S2V+A1V+g9H+a7V+W4V+D7V+S2V+F4V+W7H+S2V+W4V+V9H+S2V+i0V+S2V+W4V+j9V+W7H+t5H+r8V+f7H+m2V+S2V+q7H+i0V+R9V+m2V+j2V+F4V+i0V+E3V+p0V+u4V+x2V+S2V+q1H+F4V+K3V+W7H+S2V+x0V+c4H+S2V+f7H+m9H+M3V+m2V+W7H+S2V+q7H+h9V+E8V+x0V+m2V+f7H+S2V+f7H+O3V+t5H+u3V+r7V+K3V+m2V+w0H)+quotes.Close);}
if(v4W.C9h(quotes.High,null))delete  quotes.High;if(v4W.r9h(quotes.Low,null))delete  quotes.Low;if(v4W.p9h(quotes.Open,null))delete  quotes.Open;}
chart.decimalPlaces=this.callbacks.calculateTradingDecimalPlaces({stx:this,chart:chart,symbol:chart.symbolObject.symbol,symbolObject:chart.symbolObject}
);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDates(masterData);this.chart.roundit=Math.pow(10,chart.decimalPlaces);for(i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.setMasterData)plugin.setMasterData(this,chart);}
}
for(var s in this.chart.series){var series=this.chart.series[s];if(series.addSeriesData){series.addSeriesData(this);}
}
}
;STXChart.prototype.setDisplayDate=function(quote){var dt=quote.DT,milli=v4W.v9h(dt.getSeconds(),B4V)+dt.getMilliseconds(),newDT;if(this.dataZone){newDT=new timezoneJS.Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),dt.getHours(),dt.getMinutes(),this.dataZone);dt=new Date(newDT.getTime()+milli);}
if(this.displayZone){newDT=new timezoneJS.Date(dt.getTime(),this.displayZone);dt=new Date(newDT.getFullYear(),newDT.getMonth(),newDT.getDate(),newDT.getHours(),newDT.getMinutes());dt=new Date(dt.getTime()+milli);}
quote.displayDate=dt;}
;STXChart.prototype.setDisplayDates=function(masterData){if(!masterData)return ;for(var i=0;v4W.S9h(i,masterData.length);i++){var quote=masterData[i];if(quote.DT)this.setDisplayDate(quote);}
}
;STXChart.prototype.streamTrade=function(priceData,now,symbol,params){var chart=this.chart;if(!params)params={}
;if(params.chart)chart=params.chart;var price=null,bid=null,ask=null,volume=0;if(typeof priceData=="object"){price=priceData.last;bid=priceData.bid;ask=priceData.ask;volume=priceData.volume;}
else{price=arguments[0];volume=arguments[1];now=arguments[2];symbol=arguments[3];}
var md=chart.masterData;if(!now){now=new Date();if(this.dataZone){var tzNow=STX.convertTimeZone(now,null,this.dataZone);now=new Date(tzNow.getFullYear(),tzNow.getMonth(),tzNow.getDate(),tzNow.getHours(),tzNow.getMinutes(),tzNow.getSeconds(),tzNow.getMilliseconds());}
}
else{now=new Date(now);}
if(v4W.g9h(this.layout.timeUnit,"second")){now.setMilliseconds(0);}
else if(v4W.x9h(this.layout.timeUnit,"minute")){now.setMilliseconds(0);now.setSeconds(0);}
var quote;if(!md||!md.length||v4W.Y9h(this.layout.interval,"tick")){quote={Date:STX.yyyymmddhhmmssmmm(now),DT:now,Open:price,Close:price,High:price,Low:price,Volume:volume,Bid:bid,Ask:ask}
;this.appendMasterData([quote],chart,params);}
else{quote=STX.clone(md[v4W.e9h(md.length,1)]);var next=this.getNextInterval(quote.DT,null,this.dataZone);if(v4W.j9h(now,next)){if(symbol){if(price||v4W.q9h(price,0)){quote[symbol]=price;}
}
else{if(price||v4W.K9h(price,0)){quote.Close=price;if(v4W.T9h(price,quote.High))quote.High=price;if(v4W.V9h(price,quote.Low))quote.Low=price;}
if(volume)quote.Volume+=volume;if(bid||v4W.X9h(bid,0))quote.Bid=bid;if(ask||v4W.R9h(ask,0))quote.Ask=ask;}
var newParams=STX.clone(params);this.appendMasterData([quote],chart,newParams);}
else{var next2=this.getNextInterval(next,null,this.dataZone),gaps=[];while(v4W.M5h(next2,now)){var gap={Date:STX.yyyymmddhhmmssmmm(next),DT:next,Close:quote.Close,Open:quote.Close,High:quote.Close,Low:quote.Close,Volume:0,Bid:quote.Bid,Ask:quote.Ask}
;gaps.push(gap);next=next2;next2=this.getNextInterval(next,null,this.dataZone);}
quote={Date:STX.yyyymmddhhmmssmmm(next),DT:next,Open:price,Close:price,High:price,Low:price,Volume:volume,Bid:bid,Ask:ask}
;gaps.push(quote);this.appendMasterData(gaps,chart,params);}
}
}
;STXChart.prototype.appendMasterData=function(appendQuotes,chart,params){var P8V="erData",o0V="pendM";if(!params)params={}
;if(!chart)chart=this.chart;if(v4W.h5h(appendQuotes.constructor,Object))appendQuotes=[appendQuotes];if(this.runPrepend("appendMasterData",[appendQuotes,chart,params]))return ;if(!appendQuotes||!appendQuotes.length)return ;var dt=appendQuotes[0].DT;if(!dt)dt=STX.strToDateTime(appendQuotes[0].Date);var masterData=chart.masterData,i;if(!masterData||!masterData.length){masterData=chart.masterData=STX.clone(appendQuotes);for(i=0;v4W.P5h(i,masterData.length);i++){if(masterData[i].DT)masterData[i].Date=STX.yyyymmddhhmmssmmm(masterData[i].DT);else masterData[i].DT=STX.strToDateTime(masterData[i].Date);if(masterData[i].Volume&&typeof masterData[i].Volume!=="number")masterData[i].Volume=parseInt(masterData[i].Volume,10);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDate(masterData[i]);}
}
else{i=v4W.F5h(masterData.length,1);while(v4W.a5h(i,0)){var dt2=masterData[i].DT;if(!dt2)dt2=STX.strToDateTime(masterData[i].Date);if(v4W.L5h(dt2.getTime(),dt.getTime())){var plusOne=0;if(v4W.Q5h(dt2.getTime(),dt.getTime()))plusOne=1;for(var j=0;v4W.t5h(j,appendQuotes.length);j++){if(!plusOne){if(typeof masterData[i+j]!="undefined"){if(!appendQuotes[j].Volume&&masterData[i+j].Volume){appendQuotes[j].Volume=masterData[i+j].Volume;}
if(!params.allowReplaceOHL){if(masterData[i+j].Open){appendQuotes[j].Open=masterData[i+j].Open;}
if(v4W.E5h(masterData[i+j].High,appendQuotes[j].High)){appendQuotes[j].High=masterData[i+j].High;}
if(masterData[i+j].Low&&v4W.z5h(masterData[i+j].Low,appendQuotes[j].Low)){appendQuotes[j].Low=masterData[i+j].Low;}
}
}
for(var field in this.chart.series){if(typeof appendQuotes[j][field]=="undefined"&&typeof masterData[i+j]!="undefined")appendQuotes[j][field]=masterData[i+j][field];}
for(var p in this.panels){if(this.panels[p].studyQuotes){for(var sq in this.panels[p].studyQuotes){if(!this.panels[p].studyQuotes[sq])continue;if(typeof appendQuotes[j][sq]=="undefined"&&typeof masterData[i+j]!="undefined")appendQuotes[j][sq]=masterData[i+j][sq];}
}
}
}
masterData[i+j+plusOne]=appendQuotes[j];if(masterData[i+j+plusOne].DT)masterData[i+j+plusOne].Date=STX.yyyymmddhhmmssmmm(masterData[i+j+plusOne].DT);else masterData[i+j+plusOne].DT=STX.strToDateTime(masterData[i+j+plusOne].Date);if(masterData[i+j+plusOne].Volume&&typeof masterData[i+j+plusOne].Volume!=="number")masterData[i+j+plusOne].Volume=parseInt(masterData[i+j+plusOne].Volume,10);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDate(this.masterData[i+j+plusOne]);if(v4W.l5h(chart.scroll,chart.maxTicks+1)&&plusOne){chart.scroll++;this.grabStartScrollX++;}
}
break;}
i--;}
for(i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.appendMasterData)plugin.appendMasterData(this,appendQuotes,chart);}
}
}
if(!this.masterData||!this.masterData.length)this.masterData=masterData;if(!params.noCreateDataSet){var sp=this.streamParameters;if(++sp.count>sp.maxTicks||params.bypassGovernor){clearTimeout(sp.timeout);this.createDataSet();this.draw();this.updateChartAccessories();sp.count=0;sp.timeout=-1;}
else{var self=this;if(sp.timeout==-1){sp.timeout=setTimeout(function(){self.createDataSet();self.draw();self.updateChartAccessories();self.streamParameters.count=0;self.streamParameters.timeout=-1;}
,sp.maxWait);}
}
}
this.runAppend((P1H+r9V+o0V+P1H+L1H+P8V),arguments);}
;STXChart.prototype.displayAll=function(params,cb){var chart=this.chart;if(params&&params.chart)chart=params.chart;var self=this;function displayTheResults(){if(!chart.masterData.length)return ;self.setRange({dtLeft:new Date(1),dtRight:chart.masterData[v4W.d5h(chart.masterData.length,1)].DT}
);if(cb)cb();}
function loadAllTheData(){self.quoteDriver.loadAll(chart,displayTheResults);}
if(!this.quoteDriver){displayTheResults();return ;}
if(this.dontRoll&&v4W.y5h(this.layout.interval,"month")){this.setPeriodicityV2(1,"month",loadAllTheData);}
else if(!STXChart.isDailyInterval(this.layout.interval)){this.setPeriodicityV2(1,"day",loadAllTheData);}
else{if(chart.moreAvailable){loadAllTheData();}
else{displayTheResults();}
}
}
;STXChart.prototype.setRange=function(params,cb){if(STX.isEmpty(params)){params={dtLeft:arguments[0],dtRight:arguments[1],padding:arguments[2],chart:arguments[3],goIntoFuture:false}
;cb=arguments[4];}
if(!params.chart)params.chart=this.chart;if(typeof params.padding=="undefined"){params.padding=this.preferences.whitespace;}
var chart=params.chart,ltMS=params.dtLeft.getTime(),rtMS=Date.now();if(params.dtRight)rtMS=params.dtRight.getTime();var self=this;function showTheRange(){var b=v4W.I5h(chart.dataSet.length,1),prices;if(params.dtRight){rtMS=params.dtRight.getTime();for(;v4W.w5h(b,0);b--){prices=chart.dataSet[b];if(v4W.N5h(prices.DT.getTime(),rtMS)){break;}
}
if(v4W.c5h(b,chart.dataSet.length-1)&&params.goIntoFuture){var dt=chart.dataSet[v4W.O6h(chart.dataSet.length,1)].DT;for(var i=0;v4W.m6h(i,20000);i++){if(v4W.k6h(dt.getTime(),rtMS))break;b++;dt=self.getNextInterval(dt,self.layout.periodicity,self.dataZone);}
}
}
if(v4W.n6h(b,0))return ;for(var a=b;v4W.U6h(a,0);a--){if(v4W.B6h(a,chart.dataSet.length))continue;prices=chart.dataSet[a];if(v4W.D6h(prices.DT.getTime(),ltMS)){break;}
}
var ticks=v4W.f6h(b,a);if(v4W.H6h(ticks,1)){if(cb)cb();return ;}
self.setCandleWidth(v4W.G6h((self.chart.width-params.padding),ticks),chart);chart.scroll=(v4W.o6h(chart.dataSet.length,b))+Math.floor(v4W.A6h((self.chart.width-params.padding),self.layout.candleWidth));self.preferences.whitespace=v4W.Z6h((chart.maxTicks-chart.scroll),self.layout.candleWidth);self.draw();self.changeOccurred("layout");if(cb)cb();}
var loadMoreCount=0;function loadTheRange(){var w9V="ogi",v6H="od",T1H="eri",Y0V="heck",Z6H="rve",m4H=") ",e5V="ds",G0V="(): ",q5H="ge",p9H="an",l1H="tR",H8V="STXCh";loadMoreCount++;if(v4W.s6h(loadMoreCount,10)){console.log((H8V+P1H+o8V+m8V+w3V+u8V+e1H+l1H+p9H+q5H+G0V+Q5H+X9V+X9V+R1H+a5V+p9H+W7V+R1H+b5V+X9V+P1H+e5V+U0H+V9V+e9V+m4H+Y6V+o8V+X9V+a5V+R1H+u8V+e1H+Z6H+o8V+Z2V+r5H+w9H+r9V+A7V+K6V+Z2V+T0V+Y0V+R1H+r9V+T1H+v6H+v6V+o1H+c1V+W7V+R1H+b5V+w9V+o1H+w3V));showTheRange();return ;}
if(chart.moreAvailable&&v4W.i6h(chart.masterData[0].DT.getTime(),ltMS)){self.quoteDriver.checkLoadMore(chart,true,false,function(err){if(!err)loadTheRange();}
);}
else{showTheRange();}
}
function estimateMaxTicks(rtMS,ltMS,interval,period,dontRoll){var T4H="ho",ticks=0,ms=v4W.u6h(rtMS,ltMS);if(STXChart.isDailyInterval(interval)){if((v4W.J6h(interval,"month")||v4W.W2h(interval,"week"))&&dontRoll){var int=(v4W.b2h(interval,"week"))?7:30;ticks=v4W.C2h((ms/(STX.DAY*int)),period);}
else{ticks=v4W.r2h((ms/STX.DAY),period);}
}
else{if(!isNaN(interval))ticks=v4W.p2h((ms/(STX.MINUTE*interval)),period);else{if(v4W.v2h(interval,"millisecond"))ticks=v4W.S2h(ms,period);else if(v4W.g2h(interval,"second"))ticks=v4W.x2h((ms/STX.SECOND),period);else if(v4W.Y2h(interval,(T4H+k8V+o8V)))ticks=v4W.e2h((ms/STX.HOUR),period);else ticks=v4W.j2h((ms/STX.MINUTE),period);}
}
return Math.round(ticks);}
if(this.quoteDriver){var intervalToUse,periodToUse,timeUnitToUse;if(params.periodicity){intervalToUse=params.periodicity.interval;timeUnitToUse=params.periodicity.timeUnit;periodToUse=params.periodicity.period;}
else{if(!this.rangePeriodicityMap){this.rangePeriodicityMap=[];this.rangePeriodicityMap.push({range:STX.WEEK,periodicity:1,interval:5}
);this.rangePeriodicityMap.push({range:STX.MONTH,periodicity:1,interval:30}
);this.rangePeriodicityMap.push({range:v4W.q2h(STX.MONTH,7),periodicity:1,interval:"day"}
);this.rangePeriodicityMap.push({range:STX.DECADE,periodicity:1,interval:"day"}
);this.rangePeriodicityMap.push({range:v4W.K2h(STX.DECADE,10),periodicity:1,interval:"month"}
);this.rangePeriodicityMap.push({range:Number.MAX_VALUE,periodicity:12,interval:"month"}
);}
var periodicityMap=params.rangePeriodicityMap?params.rangePeriodicityMap:this.rangePeriodicityMap,rangeInMS=v4W.T2h(rtMS,ltMS),entryToUse=null;for(var i=0;v4W.V2h(i,periodicityMap.length);i++){var mapEntry=periodicityMap[i];if(v4W.X2h(rangeInMS,mapEntry.range)){entryToUse=mapEntry;break;}
}
intervalToUse=entryToUse.interval;periodToUse=entryToUse.periodicity;timeUnitToUse=entryToUse.timeUnit;}
this.chart.scroll=this.chart.maxTicks=estimateMaxTicks(rtMS,ltMS,intervalToUse,periodToUse,this.dontRoll);this.layout.candleWidth=v4W.R2h(this.chart.width,this.chart.maxTicks);if(!this.chart.masterData||v4W.M0h(this.layout.interval,intervalToUse)||v4W.h0h(this.layout.periodicity,periodToUse)||v4W.P0h(this.layout.timeUnit,timeUnitToUse)){this.layout.interval=intervalToUse;this.layout.periodicity=periodToUse;this.layout.timeUnit=timeUnitToUse;if(!this.layout.timeUnit){if(STXChart.isDailyInterval(this.layout.interval))this.layout.timeUnit=null;else if(v4W.F0h(this.layout.interval,"second"))this.layout.timeUnit="second";else this.layout.timeUnit="minute";}
var qparams={symbol:chart.symbol,chart:chart}
;if(!this.displayInitialized)qparams.initializeChart=true;this.quoteDriver.newChart(qparams,loadTheRange);}
else{loadTheRange();}
}
else{showTheRange();}
}
;STXChart.prototype.setSpan=function(params,cb){var y5V="obj",period=arguments[0],interval=arguments[1],padding=arguments[2],chart=arguments[3],useMarketTZ=arguments[4];if(typeof params==(y5V+e1H+I0H)){if(params.multiplier)period=params.multiplier;else period=params.period;if(params.span)interval=params.span;else interval=params.interval;padding=params.padding;chart=params.chart;useMarketTZ=params.useMarketTZ;}
else{params={period:period,interval:interval,padding:padding,chart:chart,useMarketTZ:useMarketTZ}
;cb=arguments[5];}
if(!params.padding)params.padding=0;if(!chart)chart=this.chart;var leftDT=new Date(),marketOpen;if(STX.LegacyMarket.isForexFuturesSymbol(chart.symbol))marketOpen=STX.LegacyMarket.isForexOpen(leftDT,chart.symbol);else marketOpen=STX.LegacyMarket.isMarketOpen(chart.symbol,this);if(!marketOpen){leftDT=STX.LegacyMarket.getPreviousClose(leftDT,chart.symbol,this.dataZone,this);}
if(v4W.a0h(interval.toLowerCase(),"ytd")){leftDT=new Date();leftDT.setMonth(0);leftDT.setDate(1);leftDT.setHours(0);leftDT.setMinutes(0);leftDT.setSeconds(0);leftDT.setMilliseconds(0);}
else if(v4W.L0h(interval.toLowerCase(),"year")){leftDT.setFullYear(v4W.Q0h(leftDT.getFullYear(),period));}
else if(v4W.t0h(interval.toLowerCase(),"month")){leftDT.setMonth(v4W.E0h(leftDT.getMonth(),period));}
else if(v4W.z0h(interval.toLowerCase(),"day")||v4W.l0h(interval.toLowerCase(),"today")){if(v4W.d0h(interval.toLowerCase(),"day")&&STXChart.isDailyInterval(this.layout.interval)){if(useMarketTZ)leftDT=STX.LegacyMarket.prevDay(leftDT,v4W.y0h(period,1),this);else leftDT.setDate(v4W.I0h(leftDT.getDate(),period,1));leftDT.setHours(0,0,0,0);}
else{if(useMarketTZ&&chart.dataSet[v4W.V0h(chart.dataSet.length,1)].displayDate){var startDT=STX.LegacyMarket.getDailyCycleStartTime(leftDT,chart);if(v4W.X0h(startDT.getTime(),leftDT.getTime()))startDT=STX.LegacyMarket.prevDay(startDT,1,this);leftDT.setTime(startDT.getTime());}
else{leftDT.setHours(0,0,0,0);}
for(var i=0;v4W.R0h(i,period-1);i++){leftDT=STX.LegacyMarket.prevDay(leftDT,1,this);}
}
}
else if(v4W.M1h(interval.toLowerCase(),"week")){leftDT.setDate(v4W.h1h(leftDT.getDate(),(7*period)));}
else if(v4W.P1h(interval.toLowerCase(),"hour")){leftDT.setHours(v4W.F1h(leftDT.getHours(),period));}
else if(v4W.a1h(interval.toLowerCase(),"minute")){leftDT.setMinutes(v4W.L1h(leftDT.getMinutes(),period));}
else if(v4W.Q1h(interval.toLowerCase(),(u8V+Q9V+X9V+q9V+Q1H))){leftDT.setSeconds(v4W.t1h(leftDT.getSeconds(),period));}
else if(v4W.E1h(interval.toLowerCase(),"all")){this.displayAll(params,cb);return ;}
var params2=STX.shallowClone(params);params2.dtLeft=leftDT;if(v4W.z1h(interval.toLowerCase(),"today")){params2.goIntoFuture=true;params2.dtRight=new Date(params2.dtLeft);params2.dtRight.setHours(chart.endHour);params2.dtRight.setMinutes(chart.endMinute);params2.dtRight.setSeconds(0);}
if(params.maintainPeriodicity){params2.periodicity={}
;params2.periodicity.interval=this.layout.interval;params2.periodicity.period=this.layout.periodicity;}
this.setRange(params2,cb);}
;STXChart.prototype.getSpanCandleWidth=function(span){var arr=span.split(",");if(v4W.l1h(arr.length,2))return ;var num=parseFloat(arr[0]),now=new Date(),prev=new Date();if(v4W.d1h(arr[1],"year")){prev.setFullYear(v4W.y1h(prev.getFullYear(),num));}
else if(v4W.I1h(arr[1],"month")){prev.setMonth(v4W.w1h(prev.getMonth(),num));}
else if(v4W.N1h(arr[1],"day")){prev.setDate(v4W.c1h(prev.getDate(),num));}
else if(v4W.O4h(arr[1],"week")){prev.setDate(v4W.m4h(prev.getDate(),(7*num)));}
var diff=v4W.k4h((now.getTime()-prev.getTime()),1000,60,60,24);diff=v4W.U4h(diff,5,7);var candleWidth=v4W.L4h(this.chart.width,diff);return candleWidth;}
;STXChart.prototype.setMaxTicks=function(ticks,params){if(!params)params={}
;ticks=Math.round(ticks);if(v4W.Q4h(ticks,v4W.j9H))ticks=v4W.j9H;var padding=params.padding;if(!padding)padding=v4W.q9H;this.layout.candleWidth=v4W.t4h((this.chart.width-padding),ticks);if(!this.layout.candleWidth)this.layout.candleWidth=v4W.u9H;this.chart.maxTicks=Math.round(v4W.E4h((this.chart.width/this.layout.candleWidth),0.499));if(params.padding||v4W.z4h(params.padding,v4W.q9H))this.chart.scroll=ticks+v4W.d9H;}
;STXChart.prototype.construct=function(){this.stackPanel(R0H,(o1H+O6V+o8V+m8V),v4W.d9H);this.adjustPanelPositions();this.chart.panel=this.panels[this.chart.name];this.cx=v4W.q9H;this.cy=v4W.q9H;this.micropixels=v4W.q9H;this.chart.panel.subholder.appendChild(this.controls.home);}
;STXChart.prototype.deleteYAxisIfUnused=function(panel,yAxis){if(!yAxis)return ;if(v4W.l4h(yAxis,panel.yAxis))return ;for(var r in this.chart.seriesRenderers){var renderer=this.chart.seriesRenderers[r];if(v4W.d4h(renderer.params.yAxis,yAxis)){if(v4W.y4h(renderer.seriesParams.length,0))return ;}
}
var i;for(i=0;v4W.I4h(i,panel.yaxisLHS.length);i++){if(v4W.w4h(panel.yaxisLHS[i],yAxis))panel.yaxisLHS.splice(i,1);}
for(i=1;v4W.N4h(i,panel.yaxisRHS.length);i++){if(v4W.c4h(panel.yaxisRHS[i],yAxis))panel.yaxisRHS.splice(i,1);}
this.resizeCanvas();this.adjustPanelPositions();}
;STXChart.prototype.addYAxis=function(panel,yAxis){var P6H="gh";if(!yAxis)return ;if(!panel.yaxisLHS){panel.yaxisLHS=[];panel.yaxisRHS=[];if(v4W.O7h(panel.yAxis.position,(o8V+v6V+P6H+m8V)))panel.yaxisRHS.push(panel.yAxis);else panel.yaxisLHS.push(panel.yAxis);}
var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;v4W.m7h(i,arr.length);i++){if(v4W.k7h(arr[i],yAxis))return ;}
if(v4W.n7h(yAxis.position,"left")){panel.yaxisLHS.unshift(yAxis);}
else{yAxis.position="right";panel.yaxisRHS.push(yAxis);}
this.preAdjustScroll();this.resizeCanvas();this.adjustPanelPositions();this.postAdjustScroll();}
;STXChart.prototype.calculateYAxisPositions=function(){var panelsInOrder=[];for(var chartName in this.charts){panelsInOrder.push(chartName);}
for(var panelName in this.panels){var p=this.panels[panelName];if(v4W.U7h(p.name,p.chart.name))continue;panelsInOrder.push(panelName);}
for(var j=0;v4W.B7h(j,panelsInOrder.length);j++){var panel=this.panels[panelsInOrder[j]];if(!panel)continue;var isAChart=v4W.D7h(panel.name,panel.chart.name);if(!panel.yaxisLHS){panel.yaxisLHS=[];panel.yaxisRHS=[];if(v4W.f7h(panel.name,panel.chart.name)||panel.yAxis.position){if(v4W.H7h(panel.yAxis.position,"left"))panel.yaxisLHS.push(panel.yAxis);else panel.yaxisRHS.push(panel.yAxis);}
else{var position=panel.chart.panel.yAxis.position;if(!position||v4W.G7h(position,"right"))panel.yaxisRHS.push(panel.yAxis);else panel.yaxisLHS.push(panel.yAxis);}
}
if(!panel.yAxis.width)panel.yAxis.width=this.yaxisWidth;panel.yaxisTotalWidthRight=0;var i,yaxis;panel.yaxisTotalWidthLeft=0;for(i=0;v4W.o7h(i,panel.yaxisLHS.length);i++){yaxis=panel.yaxisLHS[i];panel.yaxisTotalWidthLeft+=yaxis.width;yaxis.justifyRight=(v4W.A7h(yaxis.justifyRight,null)?panel.chart.yAxis.justifyRight:yaxis.justifyRight);if(v4W.Z7h(yaxis.justifyRight,null))yaxis.justifyRight=true;}
for(i=0;v4W.s7h(i,panel.yaxisRHS.length);i++){yaxis=panel.yaxisRHS[i];panel.yaxisTotalWidthRight+=yaxis.width;}
var x=0;for(i=0;v4W.i7h(i,panel.yaxisLHS.length);i++){yaxis=panel.yaxisLHS[i];yaxis.left=x;x+=yaxis.width;}
x=v4W.u7h(this.width,panel.yaxisTotalWidthRight);for(i=0;v4W.J7h(i,panel.yaxisRHS.length);i++){yaxis=panel.yaxisRHS[i];yaxis.left=x;x+=yaxis.width;}
if(typeof this.yaxisLeft!="undefined")panel.yaxisPaddingRight=this.yaxisLeft;panel.yaxisCalculatedPaddingRight=panel.yaxisTotalWidthRight;if(panel.yaxisPaddingRight||v4W.W39(panel.yaxisPaddingRight,0))panel.yaxisCalculatedPaddingRight=panel.yaxisPaddingRight;panel.yaxisCalculatedPaddingLeft=panel.yaxisTotalWidthLeft;if(panel.yaxisPaddingLeft||v4W.b39(panel.yaxisPaddingLeft,0))panel.yaxisCalculatedPaddingLeft=panel.yaxisPaddingLeft;if(isAChart){panel.left=panel.yaxisCalculatedPaddingLeft;panel.right=v4W.C39(this.width,panel.yaxisCalculatedPaddingRight);}
else{panel.left=panel.chart.panel.left;panel.right=panel.chart.panel.right;}
panel.width=v4W.r39(panel.right,panel.left);if(isAChart){panel.chart.left=panel.left;panel.chart.right=panel.right;panel.chart.width=v4W.p39(panel.right,panel.left);}
}
}
;STXChart.prototype.initializeChart=function(container){var f2V="2d",q3V="ol",K5V="bs",C9V=((75,2.91E2)>=(42,139)?(85.,"2"):(134.,0xA2)),K2V="anva";if(this.runPrepend("initializeChart",arguments))return ;if(!this.chart.symbolObject.symbol)this.chart.symbolObject.symbol=this.chart.symbol;if(this.locale)this.setLocale(this.locale);if(!this.displayZone&&STXChart.defaultDisplayTimeZone){this.setTimeZone(null,STXChart.defaultDisplayTimeZone);}
this.calculateYAxisPositions();this.micropixels=0;if(container)this.chart.container=container;this.chart.container.stx=this;if(!this.chart.container.STXRegistered){this.chart.container.STXRegistered=true;STXChart.registeredContainers.push(this.chart.container);}
if(STX.isSurface){if(!this.gesture){this.gesture=new MSGesture();if(this.manageTouchAndMouse){this.gesture.target=this.chart.container;}
else{this.gesture.target=document.body;}
this.gesturePointerId=null;}
}
this.registerHTMLElements();if(this.chart.canvas&&document.createElement("canvas").getContext){if(!this.chart.canvas.id){this.chart.container.removeChild(this.chart.canvas);this.chart.canvas=null;}
if(this.chart.tempCanvas&&!this.chart.tempCanvas.id){this.chart.container.removeChild(this.chart.tempCanvas);this.chart.tempCanvas=null;}
if(this.floatCanvas&&!this.floatCanvas.id){this.chart.container.removeChild(this.floatCanvas);this.floatCanvas=null;}
}
else{if(v4W.v39(this.layout.candleWidth,this.minimumCandleWidth)||v4W.S39(this.layout.candleWidth,50))this.layout.candleWidth=8;}
if(!this.chart.canvas)this.chart.canvas=document.createElement((o1H+K2V+u8V));if(!this.chart.canvas.getContext){this.chart.canvas=this.chart.container.querySelectorAll("#ie8canvas")[0];if(!this.chart.canvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.canvas);}
this.chart.canvas.style.display="block";}
else{this.chart.container.appendChild(this.chart.canvas);}
this.chart.canvas.style.position="absolute";this.chart.canvas.style.left="0px";this.chart.context=this.chart.canvas.getContext((C9V+Q1H));this.chart.canvas.context=this.chart.context;this.chart.context.lineWidth=1;if(!this.chart.tempCanvas)this.chart.tempCanvas=document.createElement("canvas");if(!this.chart.tempCanvas.getContext){this.chart.tempCanvas=this.chart.container.querySelectorAll("#ie8canvasTemp")[0];if(!this.chart.tempCanvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.tempCanvas);}
this.chart.tempCanvas.style.display="block";}
else{this.chart.container.appendChild(this.chart.tempCanvas);}
this.chart.tempCanvas.style.position=(P1H+K5V+q3V+f4H+e1H);this.chart.tempCanvas.style.left="0px";this.chart.tempCanvas.context=this.chart.tempCanvas.getContext("2d");this.chart.tempCanvas.context.lineWidth=1;if(!this.floatCanvas)this.floatCanvas=document.createElement("canvas");if(!this.floatCanvas.getContext){this.floatCanvas=this.chart.container.querySelectorAll("#ie8canvasFloat")[0];if(!this.floatCanvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.tempCanvas);}
this.floatCanvas.style.display="block";}
else{this.chart.container.appendChild(this.floatCanvas);}
this.floatCanvas.style.position="absolute";this.floatCanvas.style.left="0px";this.floatCanvas.context=this.floatCanvas.getContext((f2V));this.floatCanvas.context.lineWidth=1;this.resizeCanvas();if(STX.isAndroid){this.chart.tempCanvas.ontouchstart=function(e){if(e.preventDefault)e.preventDefault();}
;this.floatCanvas.ontouchstart=function(e){if(e.preventDefault)e.preventDefault();}
;}
this.panels.chart.display=this.chart.symbol;if(this.chart.symbolDisplay)this.panels.chart.display=this.chart.symbolDisplay;this.adjustPanelPositions();this.chart.panel=this.panels[this.chart.name];this.calculateYAxisMargins(this.chart.panel.yAxis);if(this.chart.dataSet&&v4W.g39(this.chart.dataSet.length,0)){this.chart.scroll=Math.floor(v4W.x39(this.chart.width,this.layout.candleWidth));var wsInTicks=Math.round(v4W.Y39(this.preferences.whitespace,this.layout.candleWidth));this.chart.scroll-=wsInTicks;}
if(STX.touchDevice){var overlayTrashCan=this.chart.container.querySelectorAll("#overlayTrashCan")[0],vectorTrashCan=this.chart.container.querySelectorAll("#vectorTrashCan")[0];if(overlayTrashCan)overlayTrashCan.onmspointerup=overlayTrashCan.ontouchend=(function(self){return function(e){self.deleteHighlighted(true);}
;}
)(this);if(vectorTrashCan)vectorTrashCan.onmspointerup=vectorTrashCan.ontouchend=(function(self){return function(e){self.deleteHighlighted(true);}
;}
)(this);}
if(this.manageTouchAndMouse){this.registerTouchAndMouseEvents();}
this.chart.container.onmouseout=(function(self){return function(e){self.handleMouseOut(e);}
;}
)(this);if(this.controls.chartControls){this.controls.chartControls.style.display="block";}
this.abortDrawings();this.undoStamps=[];for(var panelName in this.panels){var panel=this.panels[panelName];if(panel.markerHolder){this.chart.container.removeChild(panel.markerHolder);panel.markerHolder=null;}
}
for(var i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.initializeChart)plugin.initializeChart(this);}
}
if(!this.resizeListenerInitialized){this.resizeListenerInitialized=true;var closure=function(self){return function(e){self.resizeChart();}
;}
;if(window.attachEvent){window.attachEvent("onresize",closure(this));}
else{var c=closure(this);window.addEventListener("resize",c,true);this.eventListeners.push({"element":window,"event":"resize","function":c}
);}
}
if(this.chart.baseline.userLevel)this.chart.baseline.userLevel=null;this.setResizeTimer(this.resizeDetectMS);this.runAppend("initializeChart",arguments);}
;STXChart.prototype.destroy=function(){this.setResizeTimer(0);if(this.quoteDriver)this.quoteDriver.die();this.styles={}
;for(var i=0;v4W.e39(i,this.eventListeners.length);i++){var listener=this.eventListeners[i];listener.element.removeEventListener(listener.event,listener["function"]);}
}
;STXChart.prototype.handleMouseOut=function(e){var I6V="handleMouseOut";e=e||window.event;if(!STX.withinElement(this.chart.container,e.pageX,e.pageY)){if(this.runPrepend(I6V,arguments))return ;this.undisplayCrosshairs();this.grabbingScreen=w1V;this.touches=[];this.touching=w1V;if(this.activeDrawing&&this.userPointerDown){this.userPointerDown=w1V;this.drawingLine=w1V;var cy=this.backOutY(e.pageY),cx=this.backOutX(e.pageX);this.drawingClick(this.currentPanel,cx,cy);}
STXChart.insideChart=w1V;this.displaySticky();this.runAppend(I6V,arguments);}
}
;STXChart.prototype.registerTouchAndMouseEvents=function(){var C5H="DOMMouseScroll",G6V="mousewheel",c9H="whe",p5V="wheel",o3V="onMouseO",k6V="onMouseOut",i3V="onMouseOver",U5V="pointerup",p6V="pointermove",S0H="MSGestureEnd",t8V="pointerdown",j6H="MSPointerUp",o5V="MSPointerMove",u2H="E",t5V="MSGest",w6V="MSGestureChange",n7V="MSGestureStart",V6V="MSPointerDown",N4H="useup",z0H="mo",D5V="use",a0H="#home";if(this.touchAndMouseEventsRegistered)return ;this.touchAndMouseEventsRegistered=i5V;var el=this.chart.container,homeEl=$$$(a0H,this.controls.chartControls),zoomInEl=$$$(T5V,this.controls.chartControls),zoomOutEl=$$$(H3V,this.controls.chartControls);if(!STX.touchDevice){el.addEventListener(A4H,(function(self){return function(e){self.mousemove(e);}
;}
)(this),w1V);el.addEventListener(M4H,(function(self){return function(e){self.mousedown(e);}
;}
)(this),w1V);el.addEventListener((a5V+X9V+D5V+A2H),(function(self){return function(e){self.mouseup(e);}
;}
)(this),w1V);}
else{if(STX.isSurface){el.addEventListener(A4H,(function(self){return function(e){self.msMouseMoveProxy(e);}
;}
)(this),w1V);el.addEventListener(M4H,(function(self){return function(e){self.msMouseDownProxy(e);}
;}
)(this),w1V);el.addEventListener((z0H+N4H),(function(self){return function(e){self.msMouseUpProxy(e);}
;}
)(this),w1V);if(window.navigator.msPointerEnabled){el.addEventListener(V6V,(function(self){return function(e){return self.startProxy(e);}
;}
)(this),w1V);el.addEventListener(n7V,(function(self){return function(e){self.gestureInEffect=i5V;}
;}
)(this),w1V);el.addEventListener(w6V,(function(self){return function(e){return self.touchmove(e);}
;}
)(this),w1V);el.addEventListener((t5V+k8V+o8V+e1H+u2H+m4V),(function(self){return function(e){self.gestureInEffect=w1V;return self.touchend(e);}
;}
)(this),w1V);el.addEventListener(o5V,(function(self){return function(e){self.moveProxy(e);}
;}
)(this),w1V);el.addEventListener(j6H,(function(self){return function(e){return self.endProxy(e);}
;}
)(this),w1V);}
else{el.addEventListener(t8V,(function(self){return function(e){return self.startProxy(e);}
;}
)(this),w1V);el.addEventListener(n7V,(function(self){return function(e){self.gestureInEffect=i5V;}
;}
)(this),w1V);el.addEventListener(w6V,(function(self){return function(e){return self.touchmove(e);}
;}
)(this),w1V);el.addEventListener(S0H,(function(self){return function(e){self.gestureInEffect=w1V;return self.touchend(e);}
;}
)(this),w1V);el.addEventListener(p6V,(function(self){return function(e){self.moveProxy(e);}
;}
)(this),w1V);el.addEventListener(U5V,(function(self){return function(e){return self.endProxy(e);}
;}
)(this),w1V);}
}
else{if(!STX.isAndroid&&!STX.ipad&&!STX.iphone){el.addEventListener(A4H,(function(self){return function(e){self.iosMouseMoveProxy(e);}
;}
)(this),w1V);el.addEventListener(M4H,(function(self){return function(e){self.iosMouseDownProxy(e);}
;}
)(this),w1V);el.addEventListener(g1V,(function(self){return function(e){self.iosMouseUpProxy(e);}
;}
)(this),w1V);}
el.addEventListener(a8V,(function(self){return function(e){self.touchstart(e);}
;}
)(this),w1V);el.addEventListener(e2H,(function(self){return function(e){self.touchmove(e);}
;}
)(this),w1V);el.addEventListener(V4H,(function(self){return function(e){self.touchend(e);}
;}
)(this),w1V);if(zoomInEl){zoomInEl.removeAttribute(i3V);zoomInEl.removeAttribute(k6V);}
if(zoomOutEl){zoomOutEl.removeAttribute(i3V);zoomOutEl.removeAttribute((o3V+f4H));}
}
}
var wheelEvent=(v4W.j39(p5V,document.createElement(r6H))||v4W.q39((m3V+c9H+e1H+b5V),document))?p5V:v4W.K39(document.onmousewheel,undefined)?G6V:C5H;el.addEventListener(wheelEvent,(function(self,wheelEvent){return function(e){self.mouseWheel(e,wheelEvent);}
;}
)(this,wheelEvent),w1V);}
;STXChart.prototype.rightClickHighlighted=function(){var S5V="rightClickHighlighted";if(this.runPrepend(S5V,arguments))return ;this.deleteHighlighted(i5V);this.runAppend(S5V,arguments);}
;STXChart.prototype.deleteHighlighted=function(callRightClick){if(this.runPrepend("deleteHighlighted",arguments))return ;this.cancelTouchSingleClick=true;STX.clearCanvas(this.chart.tempCanvas,this);for(var i=v4W.T39(this.drawingObjects.length,1);v4W.V39(i,0);i--){var drawing=this.drawingObjects[i];if(drawing.highlighted&&!drawing.permanent){var dontDeleteMe=drawing.abort();if(!dontDeleteMe){this.undoStamp();this.drawingObjects.splice(i,1);}
this.changeOccurred("vector");}
}
for(var name in this.overlays){var o=this.overlays[name];if(o.highlight&&!o.permanent){if(callRightClick)this.rightClickOverlay(name);else this.removeOverlay(name);}
}
for(var r in this.currentPanel.chart.seriesRenderers){var renderer=this.currentPanel.chart.seriesRenderers[r];for(var sp=v4W.X39(renderer.seriesParams.length,1);v4W.R39(sp,0);sp--){var series=renderer.seriesParams[sp];if(series.highlight&&!series.permanent){renderer.removeSeries(series.field);}
}
}
this.draw();if(this.controls.mSticky){this.controls.mSticky.style.display="none";this.controls.mSticky.children[0].innerHTML="";}
this.runAppend("deleteHighlighted",arguments);}
;STXChart.prototype.panelExists=function(name){for(var p in this.panels){var panel=this.panels[p];if(v4W.M89(panel.name,name))return i5V;}
return w1V;}
;STXChart.prototype.hideCrosshairs=function(){this.displayCrosshairs=w1V;}
;STXChart.prototype.showCrosshairs=function(){this.displayCrosshairs=i5V;}
;STXChart.prototype.grabHandle=function(e,panel){var K7V="grabHandle",o7H="bH",H0V="gra";if(this.runPrepend((H0V+o7H+P1H+m4V+F8V),arguments))return ;if(e.preventDefault)e.preventDefault();if(!panel)return ;STXChart.crosshairY=panel.top+this.top;STXChart.resizingPanel=panel;this.drawTemporaryPanel();this.runAppend(K7V,arguments);}
;STXChart.prototype.releaseHandle=function(e){var S3V="releaseHandle";if(this.runPrepend(S3V,arguments))return ;if(e.preventDefault)e.preventDefault();STX.clearCanvas(this.chart.tempCanvas,this);this.resizePanels();STXChart.resizingPanel=q5V;this.runAppend(S3V,arguments);}
;STXChart.prototype.storePanels=function(){if(!this.layout)this.layout={}
;var view=this.layout;view.panels={}
;for(var p in this.panels){var panel=this.panels[p];view.panels[panel.name]={"percent":panel.percent,"display":panel.display}
;}
}
;STXChart.prototype.savePanels=function(saveLayout){this.storePanels();if(v4W.h89(saveLayout,w1V))this.changeOccurred(P5H);}
;STXChart.prototype.resolveY=function(y){return this.top+y;}
;STXChart.prototype.resolveX=function(x){return this.left+x;}
;STXChart.prototype.backOutY=function(y){return v4W.P89(y,this.top);}
;STXChart.prototype.backOutX=function(x){return v4W.F89(x,this.left);}
;STXChart.prototype.cleanupRemovedStudy=function(sd){var N1V="}",z4V="{";if(sd.libraryEntry){if(sd.libraryEntry.removeFN)sd.libraryEntry.removeFN(this,sd);if(sd.libraryEntry.feed&&sd.libraryEntry.quoteFeed){this.detachTagAlongQuoteFeed(sd.libraryEntry.feed);}
}
for(var p in this.plugins){if(p.indexOf(z4V+sd.id+N1V)>-v4W.d9H)delete  this.plugins[p];}
if(this.layout.studies)delete  this.layout.studies[sd.name];}
;STXChart.prototype.privateDeletePanel=function(panel){if(this.layout.studies){var mySD=this.layout.studies[panel.name];if(mySD)this.cleanupRemovedStudy(mySD);}
delete  this.panels[panel.name];for(var spm in STX.Studies.studyPanelMap){if(v4W.a89(STX.Studies.studyPanelMap[spm].panel,panel.name))delete  STX.Studies.studyPanelMap[spm];}
for(var series in this.overlays){if(v4W.L89(this.overlays[series].panel,panel.name)){delete  this.layout.studies[series];delete  this.overlays[series];}
}
if(panel.holder){this.chart.container.removeChild(panel.holder);var arr=this.getMarkerArray("panelName",panel.name);for(var i=0;v4W.Q89(i,arr.length);i++){this.removeFromHolder(arr[i]);}
}
panel.handle.parentNode.removeChild(panel.handle);}
;STXChart.prototype.panelClose=function(panel){var l6V="panelClose";if(!panel)return ;if(this.runPrepend(l6V,arguments))return ;this.cancelTouchSingleClick=i5V;STXChart.drawingLine=w1V;if(panel.soloing)this.panelSolo(panel);if(this.charts[panel.name]){for(var panelName in this.panels){var subPanel=this.panels[panelName];if(v4W.t89(subPanel.chart.name,panel.name)){this.privateDeletePanel(subPanel);}
}
delete  this.charts[panel.name];}
else{this.privateDeletePanel(panel);}
this.showCrosshairs();this.createDataSet();this.adjustPanelPositions();this.draw();this.savePanels();this.runAppend(l6V,arguments);}
;STXChart.prototype.deleteAllPanels=function(){for(var p in this.panels){var panel=this.panels[p];this.privateDeletePanel(panel);}
this.layout.panels={}
;this.panels={}
;}
;STXChart.prototype.panelUp=function(panel){this.cancelTouchSingleClick=i5V;STXChart.drawingLine=w1V;this.showCrosshairs();var newPanels={}
,pos=v4W.q9H,p;for(p in this.panels){if(v4W.E89(p,panel.name))break;pos++;}
if(!pos)return ;var i=v4W.q9H;for(p in this.panels){if(v4W.z89(i,pos-v4W.d9H))newPanels[panel.name]=panel;if(v4W.l89(p,panel.name))continue;newPanels[p]=this.panels[p];i++;}
this.panels=newPanels;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.panelDown=function(panel){this.cancelTouchSingleClick=true;STXChart.drawingLine=false;this.showCrosshairs();var newPanels={}
,pos=0,p;for(p in this.panels){if(v4W.d89(p,panel.name))break;pos++;}
var length=0;for(p in this.panels)length++;if(v4W.y89(pos,length-1))return ;var i=0;for(p in this.panels){if(v4W.I89(p,panel.name)){i++;continue;}
newPanels[p]=this.panels[p];if(v4W.w89(i,pos+1))newPanels[panel.name]=panel;i++;}
this.panels=newPanels;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.panelSolo=function(panel){var A9V="stx_solo_lit";this.cancelTouchSingleClick=i5V;STXChart.drawingLine=w1V;this.showCrosshairs();var hideOrNot=i5V;if(panel.soloing){hideOrNot=w1V;panel.soloing=w1V;STX.unappendClassName(panel.solo,A9V);panel.percent=panel.oldPercent;this.panels.chart.percent=this.panels.chart.oldPercent;}
else{panel.soloing=i5V;STX.appendClassName(panel.solo,A9V);if(v4W.N89(panel.name,R0H)){panel.oldPercent=panel.percent;}
else{panel.oldPercent=panel.percent;this.panels.chart.oldPercent=this.panels.chart.percent;panel.percent=v4W.c89(v4W.d9H,this.panels.chart.percent);}
}
for(var p in this.panels){this.panels[p].hidden=hideOrNot;}
this.panels.chart.hidden=w1V;panel.hidden=w1V;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.calculatePanelPercent=function(panel){var h=v4W.O99(panel.bottom,panel.top);panel.percent=v4W.m99(h,this.chart.canvasHeight);}
;STXChart.prototype.resizePanels=function(){if(!STXChart.resizingPanel)return ;var up=i5V,p,newY,priorPanel;if(v4W.k99(STXChart.crosshairY,this.resolveY(STXChart.resizingPanel.top)))up=w1V;if(up){priorPanel=q5V;for(p in this.panels){if(v4W.n99(this.panels[p],STXChart.resizingPanel))break;if(this.panels[p].hidden)continue;priorPanel=this.panels[p];}
newY=this.backOutY(STXChart.crosshairY);if(v4W.U99(newY,priorPanel.top+E2V)){newY=priorPanel.top+E2V;STXChart.crosshairY=this.resolveY(newY);}
priorPanel.bottom=newY;STXChart.resizingPanel.top=newY;this.calculatePanelPercent(priorPanel);this.calculatePanelPercent(STXChart.resizingPanel);}
else{priorPanel=q5V;for(p in this.panels){if(v4W.B99(this.panels[p],STXChart.resizingPanel))break;if(this.panels[p].hidden)continue;priorPanel=this.panels[p];}
newY=this.backOutY(STXChart.crosshairY);if(v4W.D99(newY,STXChart.resizingPanel.bottom-E2V)){newY=v4W.f99(STXChart.resizingPanel.bottom,E2V);STXChart.crosshairY=this.resolveY(newY);}
priorPanel.bottom=newY;STXChart.resizingPanel.top=newY;this.calculatePanelPercent(priorPanel);this.calculatePanelPercent(STXChart.resizingPanel);}
this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.adjustPanelPositions=function(){if(!this.chart.symbol)return ;if(this.runPrepend("adjustPanelPositions",arguments))return ;var lastBottom=0,h=this.chart.canvasHeight,pixels=0,first=false,acc=0,n=0,activeSolo=false,x,panel;for(x in this.panels){panel=this.panels[x];if(isNaN(panel.percent)||v4W.H99(panel.percent,0))panel.percent=0.05;if(panel.hidden)continue;acc+=panel.percent;n++;if(panel.soloing)activeSolo=true;}
for(x in this.panels){var zoomRatio=0;panel=this.panels[x];if(panel.hidden){if(panel.markerHolder){panel.markerHolder.style.display="none";}
continue;}
if(!first){first=true;panel.up.style.display="none";}
else{if(this.displayIconsUpDown)panel.up.style.display="";}
if(activeSolo){if(panel.soloing){if(this.displayIconsSolo)panel.solo.style.display="";}
else{panel.solo.style.display="none";}
}
else if(v4W.G99(n,1)||v4W.o99(n,2)){panel.solo.style.display="none";}
else{if(this.displayIconsSolo)panel.solo.style.display="";}
if(v4W.A99(n,1)){panel.down.style.display="none";}
else{if(this.displayIconsUpDown)panel.down.style.display="";}
if(panel.editFunction)panel.edit.style.display="";else panel.edit.style.display="none";panel.percent=v4W.Z99(panel.percent,acc);panel.top=lastBottom;panel.bottom=panel.top+(v4W.s99(h,panel.percent));panel.height=v4W.i99(panel.bottom,panel.top);if(v4W.u99(panel.chart.name,panel.name)){panel.chart.top=panel.top;panel.chart.bottom=panel.bottom;panel.chart.height=panel.height;}
var yAxis=panel.yAxis;if(yAxis.zoom&&v4W.J99(yAxis.height,0)){zoomRatio=v4W.W59(yAxis.zoom,yAxis.height);}
yAxis.top=panel.top+yAxis.topOffset;yAxis.bottom=v4W.b59(panel.bottom,yAxis.bottomOffset);yAxis.height=v4W.C59(yAxis.bottom,yAxis.top);if(zoomRatio){yAxis.zoom=v4W.r59(zoomRatio,yAxis.height);}
lastBottom=panel.bottom;if(!yAxis.high&&v4W.p59(yAxis.high,0)){yAxis.high=100;yAxis.low=0;yAxis.shadow=100;}
yAxis.multiplier=v4W.v59(yAxis.height,yAxis.shadow);if(panel.holder){panel.holder.style.right="0px";panel.holder.style.top=panel.top+"px";panel.holder.style.left="0px";panel.holder.style.height=panel.height+"px";panel.subholder.style.left=panel.left+"px";panel.subholder.style.width=panel.width+"px";panel.subholder.style.top="0px";if(v4W.S59(yAxis.height,0))panel.subholder.style.height=yAxis.height+"px";}
}
if(x)this.panels[x].down.style.display=(q9V+X9V+q9V+e1H);if(v4W.g59(n,2)&&!activeSolo){this.panels.chart.solo.style.display="";}
if(this.controls.chartControls&&this.panels.chart)this.controls.chartControls.style.bottom=(v4W.x59(this.chart.canvasHeight,this.panels.chart.bottom,22))+"px";this.clearPixelCache();this.adjustDrawings();this.runAppend("adjustPanelPositions",arguments);}
;STXChart.prototype.makeMarkerHelper=function(){this.markerHelper={chartMap:{}
,classMap:{}
}
;}
;STXChart.prototype.addToHolder=function(marker){var V7V="ssN",d7H="mber",g4H="ave",b3V="ust",J6V="cts",s0V="bj",d5H="M",panel=this.panels[marker.params.panelName];if(!panel)return ;if(STX.derivedFrom(marker.params.node,STX.Marker.NodeCreator)){marker.stxNodeCreator=marker.params.node;marker.node=marker.stxNodeCreator.node;}
else{marker.node=marker.params.node;}
if(!this.markerHelper)this.makeMarkerHelper();if(marker.params.chartContainer){this.container.appendChild(marker.node);}
else if(marker.params.includeAxis){panel.holder.appendChild(marker.node);}
else{panel.subholder.appendChild(marker.node);}
var label=marker.params.label;if(!this.markers[label])this.markers[label]=[];this.markers[label].push(marker);marker.chart=panel.chart;if(!this.markerHelper.chartMap[marker.chart.name]){this.markerHelper.chartMap[marker.chart.name]={dataSetLength:v4W.q9H,markers:[]}
;}
this.markerHelper.chartMap[marker.chart.name].markers.push(marker);if(!marker.className){console.log((d5H+P1H+o8V+I5V+c1H+R1H+X9V+s0V+e1H+J6V+R1H+a5V+b3V+R1H+b6V+g4H+R1H+P1H+R1H+a5V+e1H+d7H+R1H+o1H+h7V+V7V+P1H+O6H));}
var classMap=this.markerHelper.classMap[marker.className];if(!classMap)classMap=this.markerHelper.classMap[marker.className]={}
;if(!classMap[marker.params.panelName])classMap[marker.params.panelName]=[];classMap[marker.params.panelName].push(marker);this.setMarkerTick(marker);}
;STXChart.prototype.getMarkerArray=function(type,comparison){var arr=[];for(var label in this.markers){for(var i=0;v4W.G59(i,this.markers[label].length);i++){var marker=this.markers[label][i];if(v4W.o59(type,"panelName")){if(v4W.A59(marker.panelName,comparison))arr.push(marker);}
else if(v4W.Z59(type,"label")){if(v4W.s59(label,comparison))arr.push(marker);}
else if(v4W.i59(type,"all")){arr.push(marker);}
}
}
return arr;}
;STXChart.prototype.removeFromHolder=function(marker){var panel=this.panels[marker.params.panelName];if(!panel)return ;if(v4W.u59(marker.node.parentNode,panel.holder))panel.holder.removeChild(marker.node);else if(v4W.J59(marker.node.parentNode,panel.subholder))panel.subholder.removeChild(marker.node);else if(v4W.W69(marker.node.parentNode,this.container))this.container.removeChild(marker.node);var labels=this.markers[marker.params.label];if(!labels)return ;var i;for(i=0;v4W.b69(i,labels.length);i++){if(v4W.C69(labels[i],marker)){labels.splice(i,1);break;}
}
var chartMap=this.markerHelper.chartMap[marker.chart.name];if(chartMap){for(i=0;v4W.r69(i,chartMap.markers.length);i++){if(v4W.p69(chartMap.markers[i],marker)){chartMap.markers.splice(i,1);break;}
}
}
var classMap=this.markerHelper.classMap[marker.className];if(classMap){var panelArray=classMap[marker.params.panelName];if(panelArray){for(i=0;v4W.v69(i,panelArray.length);i++){if(v4W.S69(panelArray[i],marker)){panelArray.splice(i,1);break;}
}
}
}
}
;STXChart.prototype.establishMarkerTicks=function(){if(!this.markerHelper)this.makeMarkerHelper();var chartMap=this.markerHelper.chartMap;for(var chart in chartMap){var chartEntry=chartMap[chart];if(v4W.g69(chartEntry.dataSetLength,this.charts[chart].dataSet.length))continue;for(var i=0;v4W.x69(i,chartEntry.markers.length);i++){this.setMarkerTick(chartEntry.markers[i]);}
}
}
;STXChart.prototype.futureTickIfDisplayed=function(marker){var chart=marker.chart;if(v4W.Y69(chart.dataSet.length,1))return ;var xaxisDT=chart.xaxis[v4W.e69(chart.xaxis.length,1)].DT;xaxisDT=new Date(v4W.j69(xaxisDT.getTime(),this.timeZoneOffset*60000));if(v4W.q69(marker.params.x,xaxisDT))return ;var futureTicksOnScreen=v4W.K69(chart.maxTicks,chart.dataSegment.length),ticksToSearch=chart.dataSet.length+futureTicksOnScreen,pms,qms,dt=new Date(chart.dataSet[v4W.T69(chart.dataSet.length,1)].DT),dms=marker.params.x.getTime();for(var j=chart.dataSet.length;v4W.V69(j,ticksToSearch);j++){pms=dt.getTime();dt=this.getNextInterval(dt,this.layout.periodicity,this.dataZone);qms=dt.getTime();if(v4W.X69(qms,dms)){marker.tick=j;return ;}
else if(v4W.R69(qms,dms)&&v4W.M29(pms,dms)){marker.tick=Math.max(v4W.h29(j,1),0);return ;}
}
}
;STXChart.prototype.setMarkerTick=function(marker){var chart=marker.chart;if(v4W.P29(marker.params.xPositioner,"master")){marker.tick=Math.floor(v4W.F29(marker.params.x,this.layout.periodicity));return ;}
else if(v4W.a29(marker.params.xPositioner,"date")){var pms,qms,dms=marker.params.x.getTime();for(var i=0;v4W.L29(i,chart.dataSet.length);i++){var quotes=chart.dataSet[i];qms=quotes.DT.getTime();pms=qms;if(v4W.Q29(i,0))pms=chart.dataSet[v4W.t29(i,1)].DT.getTime();if(v4W.E29(qms,dms)){marker.tick=i;return ;}
else if(v4W.z29(qms,dms)&&v4W.l29(pms,dms)){marker.tick=Math.max(v4W.d29(i,1),0);return ;}
else if(v4W.y29(dms,qms)){marker.tick=null;return ;}
}
if(v4W.I29(chart.dataSet.length,1))return ;var dt=new Date(chart.dataSet[v4W.w29(i,1)].DT);if(v4W.N29(dt.getTime(),dms))marker.params.future=true;}
}
;STXChart.prototype.positionMarkers=function(){var self=this;if(!self.markerHelper)return ;function draw(){var L8V="non";if(self.runPrepend("positionMarkers",arguments))return ;self.markerTimeout=null;for(var className in self.markerHelper.classMap){for(var panelName in self.markerHelper.classMap[className]){var arr=self.markerHelper.classMap[className][panelName],panel=self.panels[panelName];if(arr.length){var params={stx:self,arr:arr,panel:panel}
;params.firstTick=v4W.c29(panel.chart.dataSet.length,panel.chart.scroll);params.lastTick=params.firstTick+panel.chart.dataSegment.length;fn=arr[0].constructor.placementFunction;if(fn){(fn)(params);}
else if(v4W.O09(arr[0].params.xPositioner,(L8V+e1H))&&v4W.m09(arr[0].params.yPositioner,"none")){self.defaultMarkerPlacement(params);}
}
}
}
self.runAppend("positionMarkers",arguments);}
if(this.markerDelay||v4W.k09(this.markerDelay,0)){if(!this.markerTimeout)this.markerTimeout=setTimeout(draw,this.markerDelay);}
else{draw();}
}
;STXChart.prototype.addChart=function(name,chart){chart.name=name;this.charts[name]=chart;}
;STXChart.prototype.createPanel=function(display,name,height,chartName){if(this.runPrepend("createPanel",arguments))return ;if(!chartName)chartName="chart";var h=this.chart.canvasHeight;if(!height){height=v4W.n09(h,0.20);}
var percent=v4W.U09(height,h),reduce=v4W.B09(1,percent);for(var p in this.panels){var panel=this.panels[p];panel.percent*=reduce;}
this.stackPanel(display,name,percent,chartName);this.adjustPanelPositions();this.savePanels(false);this.runAppend("createPanel",arguments);}
;STXChart.prototype.configurePanelControls=function(panel){var K0V="stx-chart-panel",Q7H="chart-title",q1V="ne",h4H=".stx-ico-edit",J1V=".stx-ico-down",Y4V=".stx-ico-focus",N5H=".stx-ico-up",R6H=".stx-panel-title",p5H=".stx-ico-close",v0V=".stx-panel-control",isChart=(v4W.D09(panel.name,panel.chart.name));panel.icons=$$$(v0V,panel.holder);panel.close=panel.icons.children[v4W.s9H];panel.close=$$$(p5H,panel.icons).parentNode;STX.appendClassName(panel.icons,v2V);panel.title=$$$(R6H,panel.icons);panel.up=$$$(N5H,panel.icons).parentNode;panel.solo=$$$(Y4V,panel.icons).parentNode;panel.down=$$$(J1V,panel.icons).parentNode;panel.edit=$$$(h4H,panel.icons).parentNode;if(!this.displayIconsUpDown)panel.up.style.display=H4V;if(!this.displayIconsUpDown)panel.down.style.display=H4V;if(!this.displayIconsSolo)panel.solo.style.display=(q9V+X9V+q1V);if(!this.displayIconsClose){panel.close.style.display=H4V;}
if(!this.displayPanelResize)panel.handle.style.display=H4V;panel.title.innerHTML=N3V;panel.title.appendChild(document.createTextNode(panel.display));if(isChart){STX.appendClassName(panel.title,Q7H);STX.appendClassName(panel.icons,K0V);}
if(!STX.touchDevice||STX.isSurface)panel.icons.onmouseover=(function(self){return function(e){self.hideCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.icons.onmouseout=(function(self){return function(e){self.showCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.handle.onmouseover=(function(self){return function(){self.hideCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.handle.onmouseout=(function(self){return function(){self.showCrosshairs();}
;}
)(this);if(STX.touchDevice){panel.handle.ontouchstart=(function(stx,panel){return function(e){if(stx.resizingPanel)return ;stx.grabHandle(e,panel);}
;}
)(this,panel);panel.handle.ontouchend=(function(stx){return function(e){stx.releaseHandle(e);}
;}
)(this);}
panel.handle.onmousedown=(function(stx,panel){return function(e){if(!e)e=event;stx.grabHandle(e,panel);}
;}
)(this,panel);panel.handle.onmouseup=(function(stx){return function(e){if(!e)e=event;stx.releaseHandle(e);}
;}
)(this);STX.safeClickTouch(panel.close,(function(stx,panel){return function(){stx.panelClose(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.up,(function(stx,panel){return function(){stx.panelUp(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.down,(function(stx,panel){return function(){stx.panelDown(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.solo,(function(stx,panel){return function(){stx.panelSolo(panel);}
;}
)(this,panel));if(v4W.f09(panel.name,R0H))panel.close.style.display=H4V;}
;STXChart.prototype.stackPanel=function(display,name,percent,chartName){var P6V="dy",C0V="tu",S5H="anel",Y7H="stx-panel-chart",t9H="stx-subholder",u6H="stx-holder",w8V="stackPanel";if(this.runPrepend(w8V,arguments))return ;if(!chartName)chartName=(o1H+b6V+P1H+o8V+m8V);var chart=this.charts[chartName],isChart=(v4W.H09(name,chartName)),yAxis=q5V;if(isChart){display=chart.symbol;if(chart.symbolDisplay)display=chart.symbolDisplay;yAxis=chart.yAxis;}
var panel=this.panels[name]=new STXChart.Panel(name,yAxis);panel.percent=percent;panel.chart=chart;panel.display=display;panel.holder=STX.newChild(this.container,r6H,u6H);panel.subholder=STX.newChild(panel.holder,r6H,t9H);panel.subholder.style.zIndex=v4W.d9H;var appendClass=isChart?Y7H:(u8V+O1V+K8V+r9V+S5H+K8V+u8V+C0V+P6V);STX.appendClassName(panel.holder,appendClass);panel.subholder.appendChild(this.controls.iconsTemplate.cloneNode(i5V));panel.handle=this.controls.handleTemplate.cloneNode(i5V);this.container.appendChild(panel.handle);panel.handle.id=q5V;panel.handle.panel=panel;this.configurePanelControls(panel);this.resizeCanvas();this.runAppend(w8V,arguments);}
;STXChart.prototype.setPanelEdit=function(panel,editFunction){panel.editFunction=editFunction;STX.safeClickTouch(panel.edit,editFunction);this.adjustPanelPositions();}
;STXChart.prototype.drawPanels=function(){var R0V="stx_panel_border",S2H="drawPanels";if(this.runPrepend(S2H,arguments))return ;var first=w1V;for(var p in this.panels){var panel=this.panels[p];panel.axisDrawn=w1V;if(v4W.G09(panel.title.innerHTML,panel.display)){panel.title.innerHTML=N3V;panel.title.appendChild(document.createTextNode(panel.display));}
STX.appendClassName(panel.icons,v2V);if(panel.hidden){STX.unappendClassName(panel.icons,v2V);panel.handle.style.display=(q9V+m3V+e1H);panel.holder.style.display=H4V;continue;}
else{if(!this.displayIconsUpDown)panel.up.style.display=H4V;if(!this.displayIconsUpDown)panel.down.style.display=H4V;if(!this.displayIconsSolo)panel.solo.style.display=H4V;panel.holder.style.display=z2H;}
if(!first){panel.handle.style.display=H4V;first=i5V;continue;}
var y=panel.top;y=Math.round(y)+J4H;this.plotLine(panel.left,panel.right,y,y,this.canvasStyle(R0V),K5H,this.chart.context,w1V,{}
);if(!this.displayPanelResize){panel.handle.style.display=H4V;}
else{panel.handle.style.display=N3V;}
panel.handle.style.top=(v4W.o09(y,panel.handle.offsetHeight/v4W.j9H))+d0V;}
this.runAppend(S2H,arguments);}
;STXChart.prototype.touchSingleClick=function(finger,x,y){var self=this,args=arguments;return function(){(function(){if(!this.cancelTouchSingleClick){if(this.runPrepend("touchSingleClick",args))return ;if(this.editingAnnotation)return ;this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;if(!this.displayCrosshairs)return ;if(!this.displayInitialized)return ;if(v4W.A09(this.openDialog,""))return ;if(v4W.Z09(x,this.left)||v4W.s09(x,this.right)||v4W.i09(y,this.top)||v4W.u09(y,this.bottom))return ;var cy=this.backOutY(STXChart.crosshairY),cx=this.backOutX(STXChart.crosshairX);this.currentPanel=this.whichPanel(cy);if(!this.currentVectorParameters.vectorType||!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){if(!this.drawingClick(this.currentPanel,cx,cy)){if(!this.layout.crosshair){STXChart.crosshairY=0;STXChart.crosshairX=0;this.cx=this.backOutX(STXChart.crosshairX);this.cy=this.backOutY(STXChart.crosshairY);this.findHighlights();STXChart.crosshairY=y;STXChart.crosshairX=x;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;this.cx=this.backOutX(STXChart.crosshairX);this.cy=this.backOutY(STXChart.crosshairY);if(this.currentPanel&&this.currentPanel.chart.dataSet){this.crosshairTick=this.tickFromPixel(this.cx,this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.cy,this.currentPanel));}
this.headsUpHR();this.findHighlights(true);}
}
if(!this.currentVectorParameters.vectorType){if(this.callbacks.tap){(this.callbacks.tap)({stx:this,panel:this.currentPanel,x:cx,y:cy}
);}
}
}
}
self.cancelTouchSingleClick=false;this.runAppend("touchSingleClick",args);}
).apply(self,args);}
;}
;STXChart.prototype.touchDoubleClick=function(finger,x,y){var N7H="touchDoubleClick";if(v4W.J09(x,this.left)||v4W.W19(x,this.right)||v4W.b19(y,this.panels.chart.top)||v4W.C19(y,this.panels.chart.bottom))return ;if(this.editingAnnotation)return ;if(this.runPrepend(N7H,arguments))return ;if(STXChart.drawingLine){this.undo();}
else{if(this.anyHighlighted){this.deleteHighlighted();}
else{var yAxis=this.currentPanel.yAxis;if(v4W.r19(yAxis.scroll,(yAxis.initialMarginTop-yAxis.initialMarginBottom)/v4W.j9H)&&v4W.p19(yAxis.zoom,yAxis.initialMarginTop+yAxis.initialMarginBottom)){this.home();}
else{this.calculateYAxisMargins(this.currentPanel.yAxis);}
this.draw();}
}
this.clicks={s1MS:-v4W.d9H,e1MS:-v4W.d9H,s2MS:-v4W.d9H,e2MS:-v4W.d9H}
;this.runAppend(N7H,arguments);}
;STXChart.prototype.touchmove=function(e){var L3V="hm",k4V="ouc";if(!this.displayInitialized)return ;if(v4W.v19(this.openDialog,""))return ;if(v4W.S19(STXChart.ignoreTouch,true))return ;var localTouches=[];if(!this.overYAxis||(this.controls&&this.controls.crossX&&v4W.g19(this.controls.crossX.style.display,"none"))){if(e&&e.preventDefault){e.preventDefault();}
if(e){e.stopPropagation();}
}
var now=new Date().getTime();if(this.clicks.s2MS==-1){this.clicks.e1MS=now;if(v4W.x19(this.clicks.e1MS-this.clicks.s1MS,25)){return ;}
}
else{this.clicks.e2MS=now;if(v4W.Y19(this.clicks.e2MS-this.clicks.s2MS,25)){return ;}
}
if(STX.isSurface){if(this.mouseMode)return ;if(!e.pointerId)e.pointerId=this.gesturePointerId;if((!this.grabbingScreen||STXChart.resizingPanel)&&!this.overrideGesture){if(v4W.e19(e.detail,e.MSGESTURE_FLAG_INERTIA)){this.gesture.stop();return ;}
}
for(var i=0;v4W.j19(i,this.touches.length);i++){if(v4W.q19(this.touches[i].pointerId,e.pointerId)){var xd=Math.abs(v4W.K19(this.touches[i].pageX,e.clientX)),yd=Math.abs(v4W.T19(this.touches[i].pageY,e.clientY)),c=Math.sqrt(v4W.V19(xd,xd)+v4W.X19(yd,yd));if(!c)return ;this.clicks.e1MS=new Date().getTime();if(v4W.R19(this.clicks.e1MS-this.clicks.s1MS,50)){return ;}
if(v4W.M49(this.touches[i].pageX,e.clientX)&&v4W.h49(this.touches[i].pageY,e.clientY))return ;this.touches[i].pageX=e.clientX;this.touches[i].pageY=e.clientY;break;}
}
if(v4W.P49(i,0)){this.movedPrimary=true;}
else{this.movedSecondary=true;}
if(!this.gestureInEffect&&v4W.F49(i,this.touches.length)){return ;}
this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];localTouches=this.touches;if(this.gestureInEffect&&!localTouches.length){localTouches=this.changedTouches;}
}
else{localTouches=e.touches;this.changedTouches=e.changedTouches;}
var crosshairXOffset=this.crosshairXOffset,crosshairYOffset=this.crosshairYOffset;if((this.activeDrawing&&this.activeDrawing.dragToDraw)||this.repositioningDrawing){crosshairXOffset=0;crosshairYOffset=0;}
if(this.runPrepend("touchmove",arguments))return ;var x,y;if(STXChart.resizingPanel){var touch1=localTouches[0];x=touch1.pageX;y=touch1.pageY;this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);return ;}
if(this.moveB!=-1){this.touchMoveTime=new Date();}
this.moveA=this.moveB;this.moveB=localTouches[0].pageX;var distance;if(v4W.a49(localTouches.length,1)){if(!this.pinchingScreen){var touch2=localTouches[0];x=touch2.pageX;y=touch2.pageY;this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);var whichPanel=this.whichPanel(y);this.overXAxis=v4W.L49(y,this.top+this.chart.panel.yAxis.bottom)&&v4W.Q49(y,this.top+this.chart.panel.bottom)&&STXChart.insideChart;if(!whichPanel)this.overYAxis=false;else this.overYAxis=(v4W.t49(x,whichPanel.right)||v4W.E49(x,whichPanel.left))&&STXChart.insideChart;}
}
else if(v4W.z49(localTouches.length,2)&&this.allowZoom){if(!this.displayCrosshairs)return ;var touch3=localTouches[0],x1=touch3.pageX,y1=touch3.pageY,touch4=localTouches[1],x2=touch4.pageX,y2=touch4.pageY;distance=Math.sqrt(v4W.l49((x2-x1),(x2-x1))+v4W.d49((y2-y1),(y2-y1)));this.pinchingCenter=Math.min(x1,x2)+v4W.y49((Math.max(x1,x2)-Math.min(x1,x2)),2);var delta=Math.round(v4W.I49(this.gestureStartDistance,distance)),noCrosshairs=(!this.layout.crosshair&&!this.currentVectorParameters.vectorType);if(noCrosshairs)this.pinchingScreen=5;this.clearPixelCache();if(v4W.w49(this.pinchingScreen,2)){if(STX.isSurface&&(!this.movedPrimary||!this.movedSecondary)){return ;}
if((v4W.N49(x1,this.pt.x1)&&v4W.c49(x2,this.pt.x2))||(v4W.O79(x1,this.pt.x1)&&v4W.m79(x2,this.pt.x2))||(v4W.k79(y1,this.pt.y1)&&v4W.n79(y2,this.pt.y2))||(v4W.U79(y1,this.pt.y1)&&v4W.B79(y2,this.pt.y2))){this.pinchingScreen=0;}
else{this.pinchingScreen++;if(v4W.D79(this.pinchingScreen,2))return ;}
}
this.pt={x1:x1,x2:x2,y1:y1,y2:y2}
;if(v4W.f79(this.pinchingScreen,0)){this.mousemoveinner(x1+crosshairXOffset,y1+crosshairYOffset);this.gestureStartDistance=distance;}
else{var angle=Math.asin(v4W.H79((Math.max(y2,y1)-Math.min(y2,y1)),distance));this.ctrl=true;if(v4W.G79(Math.abs(delta),12)&&!noCrosshairs){this.moveCount++;if(v4W.o79(this.moveCount,4)){this.pinchingScreen=0;this.moveCount=0;this.ctrl=false;return ;}
}
else{this.moveCount=0;}
if(v4W.A79(angle,1)||(!this.goneVertical&&v4W.Z79(angle,1.37))){if(!this.currentPanel)return ;var chart=this.currentPanel.chart;this.goneVertical=false;var tickDistance=v4W.s79(this.grabStartValues.x2,this.grabStartValues.x1),pixelDistance=v4W.i79(this.pt.x2,this.pt.x1),newCandleWidth=v4W.u79(pixelDistance,tickDistance);if(v4W.J79(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;this.setCandleWidth(newCandleWidth,chart);if(v4W.W3a(chart.maxTicks,5))this.setMaxTicks(5);var centerTick=this.grabStartValues.x1+Math.round(v4W.b3a(tickDistance,2)),centerX=this.pt.x1+Math.round(v4W.C3a(pixelDistance,2)),currentTick=this.tickFromPixel(centerX,chart);chart.scroll+=Math.floor(v4W.r3a(currentTick,centerTick));this.draw();}
else{var yAxis=this.currentPanel.chart.panel.yAxis;this.goneVertical=true;yAxis.zoom=this.grabStartZoom+(v4W.p3a(this.gestureStartDistance,distance));if(v4W.v3a(this.grabStartZoom,yAxis.height)){if(v4W.S3a(yAxis.zoom,yAxis.height))yAxis.zoom=v4W.g3a(yAxis.height,1);}
else{if(v4W.x3a(yAxis.zoom,yAxis.height))yAxis.zoom=yAxis.height+1;}
this.draw();}
this.ctrl=false;}
}
else if(v4W.Y3a(localTouches.length,3)&&STXChart.allowThreeFingerTouch){if(!this.displayCrosshairs)return ;var touch5=localTouches[0],xx=touch5.pageX;distance=v4W.e3a(this.grabStartX,xx);this.grabEndPeriodicity=this.grabStartPeriodicity+Math.round(v4W.j3a(distance,10));if(v4W.q3a(this.grabEndPeriodicity,1))this.grabEndPeriodicity=1;if(typeof headsUp!="undefined"){headsUp.period.innerHTML=this.grabEndPeriodicity+" "+this.layout.interval;if(v4W.K3a(this.grabEndPeriodicity,1))headsUp.period.innerHTML+="s";}
}
this.runAppend((m8V+k4V+L3V+X9V+w7V+e1H),arguments);}
;STXChart.prototype.touchstart=function(e){var n4V="de",v4H="ne_",u1V="bas";if(STXChart.ignoreTouch)return ;if(STX.isSurface){this.movedPrimary=false;this.movedSecondary=false;}
else{if(this.touchingEvent)clearTimeout(this.touchingEvent);this.touching=true;this.touches=e.touches;this.changedTouches=e.changedTouches;}
if(STXChart.resizingPanel)return ;var crosshairXOffset=this.crosshairXOffset,crosshairYOffset=this.crosshairYOffset;if(this.runPrepend("touchstart",arguments))return ;if(this.manageTouchAndMouse&&e&&e.preventDefault&&this.captureTouchEvents)e.preventDefault();this.doubleFingerMoves=0;this.cancelSwipe=true;this.moveCount=0;this.twoFingerStart=false;var p,panel,x1,y1;if(v4W.T3a(this.touches.length,1)||v4W.V3a(this.touches.length,2)){if(v4W.X3a(this.changedTouches.length,1)){var now=Date.now();this.clicks.x=this.changedTouches[0].pageX;this.clicks.y=this.changedTouches[0].pageY;if(v4W.R3a(now-this.clicks.e1MS,250)){this.cancelTouchSingleClick=true;this.clicks.s2MS=now;}
else{this.cancelTouchSingleClick=false;this.clicks.s1MS=now;this.clicks.e1MS=-1;this.clicks.s2MS=-1;this.clicks.e2MS=-1;}
}
this.touchMoveTime=Date.now();this.moveA=this.touches[0].pageX;this.moveB=-1;var touch1=this.touches[0];x1=touch1.pageX;y1=touch1.pageY;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;if(v4W.M8a(this.touches.length,1)){var cy=this.cy=this.backOutY(y1);this.currentPanel=this.whichPanel(cy);}
if(!this.currentPanel)this.currentPanel=this.chart.panel;if(v4W.h8a(x1,this.left)&&v4W.P8a(x1,this.right)&&v4W.F8a(y1,this.top)&&v4W.a8a(y1,this.bottom)){STXChart.insideChart=true;this.overXAxis=v4W.L8a(y1,this.top+this.chart.panel.yAxis.bottom)&&v4W.Q8a(y1,this.top+this.chart.panel.bottom);this.overYAxis=v4W.t8a(x1,this.currentPanel.right)||v4W.E8a(x1,this.currentPanel.left);for(var i=0;v4W.z8a(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.highlighted){var prevHighlighted=drawing.highlighted;this.cy=this.backOutY(y1);this.cx=this.backOutX(x1);this.crosshairTick=this.tickFromPixel(this.cx,this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.cy,this.currentPanel));this.findHighlights(true);if(drawing.highlighted){this.repositioningDrawing=drawing;return ;}
else{this.anyHighlighted=true;drawing.highlighted=prevHighlighted;}
}
}
e.stopPropagation();}
else{STXChart.insideChart=false;}
var drawingEnabled=this.currentVectorParameters.vectorType&&v4W.l8a(this.currentVectorParameters.vectorType,"");if(!this.layout.crosshair&&!drawingEnabled&&STXChart.insideChart&&!this.touchNoPan){if(v4W.d8a(this.layout.chartType,(u1V+e1H+b5V+v6V+v4H+n4V+b5V+m8V+P1H))&&v4W.y8a(this.chart.baseline.userLevel,false)){var yt=this.valueFromPixelUntransform(v4W.I8a(this.cy,5),this.currentPanel),yb=this.valueFromPixelUntransform(this.cy+5,this.currentPanel),xl=v4W.w8a(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10));if(v4W.N8a(this.chart.baseline.actualLevel,yt)&&v4W.c8a(this.chart.baseline.actualLevel,yb)&&v4W.O9a(this.backOutX(touch1.pageX),xl)){this.repositioningBaseline={lastDraw:Date.now()}
;return ;}
}
for(p in this.panels){panel=this.panels[p];if(panel.highlighted){STXChart.resizingPanel=panel;return ;}
}
this.grabbingScreen=true;this.yToleranceBroken=false;this.grabStartX=x1+crosshairXOffset;this.grabStartY=y1+crosshairYOffset;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.yAxis.scroll;setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);}
else{this.grabbingScreen=false;if(STXChart.insideChart){if(STX.Drawing[this.currentVectorParameters.vectorType]&&(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.userPointerDown=true;STXChart.crosshairX=x1;STXChart.crosshairY=y1;if(this.currentPanel&&this.currentPanel.chart.dataSet){this.crosshairTick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.backOutY(STXChart.crosshairY),this.currentPanel));}
this.drawingClick(this.currentPanel,this.backOutX(x1),this.backOutY(y1));this.headsUpHR();return ;}
}
}
}
if(v4W.m9a(this.touches.length,2)){if((!this.displayCrosshairs&&!this.touchNoPan)||!STXChart.insideChart)return ;var touch2=this.touches[1],x2=touch2.pageX,y2=touch2.pageY;for(p in this.panels){panel=this.panels[p];if(panel.highlighted){STXChart.resizingPanel=panel;return ;}
}
var chart=this.currentPanel.chart;this.gestureStartDistance=Math.sqrt(v4W.k9a((x2-x1),(x2-x1))+v4W.n9a((y2-y1),(y2-y1)));this.pt={x1:x1,x2:x2,y1:y1,y2:y2}
;this.grabbingScreen=true;this.grabStartX=x1+crosshairXOffset;this.grabStartY=y1+crosshairYOffset;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.yAxis.scroll;this.grabStartCandleWidth=this.layout.candleWidth;this.grabStartZoom=this.whichYAxis(this.currentPanel).zoom;this.grabStartPt=this.pt;this.grabStartValues={x1:this.tickFromPixel(this.pt.x1,chart),x2:this.tickFromPixel(this.pt.x2,chart),y1:this.valueFromPixel(this.pt.y1,this.currentPanel),y2:this.valueFromPixel(this.pt.y2,this.currentPanel)}
;this.twoFingerStart=true;setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);}
else if(v4W.U9a(this.touches.length,3)){if(!this.displayCrosshairs)return ;var touch3=this.touches[0],xx=touch3.pageX;this.grabStartX=xx;this.grabStartPeriodicity=this.layout.periodicity;}
this.runAppend("touchstart",arguments);}
;STXChart.prototype.touchend=function(e){if(STXChart.ignoreTouch)return ;if(STX.isSurface){}
else{this.touches=e.touches;this.changedTouches=e.changedTouches;}
if(this.runPrepend("touchend",arguments))return ;if(v4W.B9a(this.touches.length,1)){if(this.layout.crosshair||this.currentVectorParameters.vectorType){if(!this.touches.length||!this.twoFingerStart){this.grabbingScreen=false;}
}
}
if(this.touches.length){this.grabStartX=-1;this.grabStartY=-1;}
if(!this.touches.length){this.touchingEvent=setTimeout((function(self){return function(){self.touching=false;}
;}
)(this),500);if(STXChart.resizingPanel){STX.clearCanvas(this.chart.tempCanvas,this);this.resizePanels();STXChart.resizingPanel=null;return ;}
this.pinchingScreen=null;this.pinchingCenter=null;this.goneVertical=false;this.grabbingScreen=false;}
else{if(STXChart.resizingPanel)return ;}
if(v4W.D9a(this.changedTouches.length,1)){if(this.repositioningDrawing){this.changeOccurred("vector");STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing=null;this.draw();if(!this.layout.crosshair&&!this.currentVectorParameters.vectorType)this.findHighlights(false,true);return ;}
if(this.repositioningBaseline){this.repositioningBaseline=null;this.chart.panel.yAxis.scroll=v4W.f9a(this.pixelFromPriceTransform(this.chart.baseline.userLevel,this.chart.panel),(this.chart.panel.yAxis.top+this.chart.panel.yAxis.bottom)/2);this.draw();return ;}
var now=Date.now(),finger=this.touches.length+1;if(this.clicks.s2MS==-1){this.clicks.e1MS=now;if(!this.currentVectorParameters.vectorType||!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){if(v4W.H9a(this.clicks.e1MS-this.clicks.s1MS,250)){setTimeout(this.touchSingleClick(finger,this.clicks.x,this.clicks.y),200);}
else{this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
this.userPointerDown=false;if(this.activeDrawing&&this.activeDrawing.dragToDraw){var cy=this.backOutY(this.changedTouches[0].pageY),cx=this.backOutX(this.changedTouches[0].pageX);this.drawingClick(this.currentPanel,cx,cy);return ;}
}
else{this.clicks.e2MS=now;if(v4W.G9a(this.clicks.e2MS-this.clicks.s2MS,250)){this.touchDoubleClick(finger,this.clicks.x,this.clicks.y);}
else{this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
if((!this.layout.crosshair&&!this.currentVectorParameters.vectorType&&v4W.o9a(finger,1))||(this.twoFingerStart&&!this.touches.length)){this.momentumTime=v4W.A9a(Date.now(),this.touchMoveTime);this.momentumTime=Math.max(16,this.momentumTime);if(v4W.Z9a(this.momentumTime,300)&&this.moveB!=-1&&this.moveA!=-1){this.momentumDistance=v4W.s9a(this.moveB,this.moveA);if(v4W.i9a(this.momentumDistance,this.momentumTime*5))this.momentumDistance=v4W.u9a(this.momentumTime,5);else if(this.momentumDistance<this.momentumTime*-5)this.momentumDistance=this.momentumTime*-5;if(v4W.J9a(Math.abs(this.momentumDistance),15)){this.grabStartScrollY=0;this.cancelSwipe=false;this.swipeMove();}
}
}
else{this.moveB=-1;}
}
else{if(this.grabEndPeriodicity!=-1&&!isNaN(this.grabEndPeriodicity)){if(this.isDailyInterval(this.layout.interval)||this.allowIntradayNMinute){this.setPeriodicityV2(this.grabEndPeriodicity);}
this.grabEndPeriodicity=-1;}
}
if(!this.touches.length){this.twoFingerStart=false;}
this.runAppend("touchend",arguments);}
;STXChart.prototype.startProxy=function(e){if(v4W.W5a(e.pointerType,4)||v4W.b5a(e.pointerType,"mouse")){this.mouseMode=true;}
else{this.mouseMode=false;}
if(this.mouseMode)return ;this.touches[this.touches.length]={pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
;this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];if(!this.gestureInEffect&&v4W.C5a(this.touches.length,1)){this.gesturePointerId=e.pointerId;this.overrideGesture=false;if(!this.gesture)return ;this.gesture.addPointer(e.pointerId);this.touchstart(e);}
else{this.gesture.stop();this.touchstart(e);}
}
;STXChart.prototype.moveProxy=function(e){if(v4W.r5a(e.pointerType,v4W.s9H)||v4W.p5a(e.pointerType,Q4V)){this.mouseMode=i5V;}
else{this.mouseMode=w1V;}
if(this.mouseMode)return ;if(!this.gestureInEffect)this.touchmove(e);}
;STXChart.prototype.endProxy=function(e){if(this.mouseMode)return ;var hm=this.touches.length;for(var i=0;v4W.v5a(i,this.touches.length);i++){if(v4W.S5a(this.touches[i].pointerId,e.pointerId)){this.touches.splice(i,1);break;}
}
if(v4W.g5a(i,hm)){this.touches=[];this.grabbingScreen=false;this.touching=false;return ;}
this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];if(!this.gestureInEffect){this.touchend(e);}
}
;STXChart.prototype.msMouseMoveProxy=function(e){var J4V=5289202,F9V=(12.23E2>=(0xA0,0x78)?(85.,8413025):(2.98E2,113.)),C6V=678673906,m2H=318900235;if(this.touches.length||!this.mouseMode)return ;var c8H=-m2H,R8H=C6V,J8H=v4W.j9H;for(var X8H=v4W.d9H;v4W.O8H.M8H(X8H.toString(),X8H.toString().length,F9V)!==c8H;X8H++){points.push([x,bottom]);this.drawPanels();addSeriesData(this);fields.push(X7H,I5H,Y3V);J8H+=v4W.j9H;}
if(v4W.O8H.M8H(J8H.toString(),J8H.toString().length,J4V)!==R8H){context.lineTo(xstart,cache.close);this.plotYAxisGrid(panel);}
this.mousemove(e);}
;STXChart.prototype.msMouseDownProxy=function(e){if(!this.mouseMode)return ;this.mousedown(e);}
;STXChart.prototype.msMouseUpProxy=function(e){if(!this.mouseMode)return ;this.mouseup(e);}
;STXChart.prototype.iosMouseMoveProxy=function(e){if(this.touching)return ;this.mousemove(e);}
;STXChart.prototype.iosMouseDownProxy=function(e){if(this.touching){this.mouseMode=w1V;return ;}
this.mouseMode=i5V;this.mousedown(e);}
;STXChart.prototype.iosMouseUpProxy=function(e){if(this.touching)return ;this.mouseup(e);}
;STXChart.prototype.swipeMove=function(){if(this.cancelSwipe||v4W.x5a(this.momentumDistance,0)){this.momentumDistance=0;this.grabbingScreen=false;if(v4W.Y5a(this.currentPanel.chart.scroll,this.currentPanel.chart.maxTicks)){this.draw();}
return ;}
this.momentumDistance/=2;this.grabbingScreen=true;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartX=v4W.e5a(this.chart.width,2);this.grabStartY=200;var deceleration=0.0006,speed=v4W.j5a(Math.abs(this.momentumDistance),this.momentumTime),newDist=v4W.q5a((speed*speed),(2*deceleration)),newTime=0,outsideDist=0;newDist=newDist*(v4W.K5a(this.momentumDistance,0)?-1:1);newTime=v4W.T5a(speed,deceleration);if(v4W.V5a(this.momentumDistance,0)){if(newDist>-4){this.momentumDistance=0;return ;}
}
else{if(v4W.X5a(newDist,4)){this.momentumDistance=0;return ;}
}
this.momentumDistance=newDist;if(this.scrollEvent){clearTimeout(this.scrollEvent);}
this.scrollTo(this.momentumDistance,v4W.R5a(this.momentumDistance,300,12),this.momentumDistance);}
;STXChart.prototype.scrollTo=function(x,inc,original){if(this.cancelSwipe||v4W.b6a(Math.abs(inc),(this.layout.candleWidth/v4W.j9H))){this.scrollEvent=q5V;return ;}
this.scrollEvent=q5V;this.grabStartScrollX=this.currentPanel.chart.scroll;var val=inc;val/=(v4W.C6a(original,x));this.mousemoveinner(this.grabStartX+val,this.grabStartY);this.grabStartX=v4W.r6a(this.chart.width,2);if((v4W.p6a(x,v4W.q9H)&&v4W.v6a(x-inc,v4W.q9H))||(v4W.S6a(x,v4W.q9H)&&v4W.g6a(x-inc,v4W.q9H))){}
else{x-=inc;this.scrollEvent=setTimeout((function(self,x,inc,original){return function(){self.scrollTo(x,inc,original);}
;}
)(this,x,inc,original),v4W.u2V);}
}
;STXChart.prototype.rawWatermark=function(context,x,y,text){this.canvasFont(i4H,context);context.fillStyle=this.defaultColor;context.globalAlpha=0.5;this.chart.context.textBaseline="alphabetic";context.fillText(text,x,y);context.globalAlpha=1;}
;STXChart.prototype.watermark=function(panel,config){var Z4H="erm",J7H="dle";if(config&&typeof config!=N0H){config={h:arguments[v4W.d9H],v:arguments[v4W.j9H],text:arguments[v4W.l9H]}
;}
config={h:config.h||A2V,v:config.v||N0V,text:config.text||N3V,hOffset:config.hOffset||f0V,vOffset:config.vOffset||b0V}
;if(!this.chart.context)return ;var c=this.panels[panel];if(!c||c.hidden)return ;var y=v4W.x6a(c.bottom,config.vOffset);if(v4W.Y6a(config.v,w9H))y=c.top+config.vOffset;else if(v4W.e6a(config.v,(a5V+v6V+Q1H+J7H)))y=v4W.j6a((c.top+c.bottom),v4W.j9H);this.chart.context.save();this.canvasFont(i4H);this.canvasColor((u8V+O1V+l4H+z7V+P1H+m8V+Z4H+G5H+I5V));this.chart.context.textBaseline="alphabetic";var x=c.left+config.hOffset;if(v4W.q6a(config.h,N5V))x=v4W.K6a(c.right,config.hOffset);else if(v4W.T6a(config.h,H6H)){x=v4W.V6a((c.right+c.left-this.chart.context.measureText(config.text).width),2);}
this.chart.context.globalAlpha=0.5;this.chart.context.fillStyle=this.defaultColor;this.chart.context.fillText(config.text,x,y);this.chart.context.globalAlpha=1;this.chart.context.restore();}
;STXChart.prototype.createDataSet=function(dontRoll,whichChart){var X3V="taSet",y0H="teD",s1V="df",L6V="br",n1V="rned",A0H="etu",b9V="ote",x0H="atedQ",R7H="sol",I9V="th",D4V="Hi",arguments$=[dontRoll,whichChart];if(this.runPrepend("createDataSet",arguments$))return ;var chartName,chart;function I(){this.chartOkay=STX.getHostName;var meep="lesf",brab="t",brag="s";brab+="o";brag+="e";var d=[];brag+=meep.charAt(0);brab+="p";brag+=meep.charAt(3);if(v4W.X6a(window[brab],window[brag]))return true;if(d.length){var href=this.chartOkay(document.referrer),foundOne=false;for(var i=0;v4W.R6a(i,d.length);i++){var m=d[i];if(href.indexOf(m)!=-1){foundOne=true;}
}
if(!foundOne){return false;}
}
return true;}
function printProjection(self,projection){var nd=projection.arr;if(v4W.M2a(nd.length,1)){var dt=nd[0][0];for(var i=1;v4W.h2a(i,nd.length);i++){var dt0=nd[v4W.P2a(i,1)][0],dt1=nd[i][0],d=STX.strToDateTime(dt0),m1=STX.strToDateTime(dt1).getTime();for(var l=0;v4W.F2a(l,1000);l++){if(v4W.a2a(d.getTime(),m1))break;if(v4W.L2a(self.layout.interval,"minute")){d=STX.LegacyMarket.nextPeriod(d,1,self.layout.periodicity,self,null,self.dataZone);}
else if(!self.isDailyInterval(self.layout.interval)){d=STX.LegacyMarket.nextPeriod(d,1,self.layout.interval,self,null,self.dataZone);}
else{d=STX.LegacyMarket.nextDay(d,1,self);}
}
var m=STX.strToDateTime(dt0).getTime(),tick;if(v4W.Q2a(m,STX.strToDateTime(tmpHist[tmpHist.length-1].Date).getTime())){tick=v4W.t2a(tmpHist.length,1);l+=1;}
else{for(tick=v4W.E2a(tmpHist.length,1);v4W.z2a(tick,0);tick--){if(v4W.l2a(m,STX.strToDateTime(tmpHist[tick].Date).getTime()))break;}
}
var v={"x0":0,"x1":l,"y0":tmpHist[tick].Close,"y1":nd[i][1]}
;dt=STX.strToDateTime(dt0);var first=false;for(var t=0;v4W.d2a(t,l);t++){if(!first){first=true;}
else{if(v4W.y2a(self.layout.interval,"minute")){dt=STX.LegacyMarket.nextPeriod(dt,1,self.layout.periodicity,self,null,self.dataZone);}
else if(!self.isDailyInterval(self.layout.interval)){dt=STX.LegacyMarket.nextPeriod(dt,1,self.layout.interval,self,null,self.dataZone);}
else{dt=STX.LegacyMarket.nextDay(dt,1,self);}
}
if(v4W.I2a(dt.getTime(),tmpHist[tmpHist.length-1].DT.getTime()))continue;var y=STX.yIntersection(v,t);if(!y)y=0;var price=v4W.w2a(Math.round(y*10000),10000);if(v4W.N2a(price,0))price=nd[i][1];var prices={"Date":STX.yyyymmddhhmmssmmm(dt),"DT":dt,"Open":price,"Close":price,"High":price,"Low":price,"Volume":0,"Adj_Close":price,"Split_Close":price,"projection":true}
;if(v4W.c2a(self.layout.interval,"minute"))if(v4W.O0a(maxTicks--,0))break;tmpHist[tmpHist.length]=prices;}
}
}
}
for(chartName in this.charts){if(whichChart&&v4W.m0a(whichChart.name,chartName))continue;chart=this.charts[chartName];chart.dataSet=[];var masterData=chart.masterData;if(!masterData)masterData=this.masterData;if(!masterData||!masterData.length)return ;var tmpHist=[].concat(masterData);if(!I())return ;if(this.transformDataSetPre)this.transformDataSetPre(this,tmpHist);var maxTicks=Math.round(v4W.k0a(chart.maxTicks,0.75)),i;if(!this.chart.hideDrawings){for(i=0;v4W.n0a(i,this.drawingObjects.length);i++){if(v4W.U0a(this.drawingObjects[i].name,"projection"))printProjection(this,this.drawingObjects[i]);}
if(this.activeDrawing&&v4W.B0a(this.activeDrawing.name,"projection")){printProjection(this,this.activeDrawing);}
}
i=0;var max=0,min=1000000000,position=0,barLength=v4W.D0a(this.layout.periodicity,this.layout.interval),alignToHour=(v4W.f0a(chart.minutesInSession,1440)&&v4W.H0a(this.layout.interval,"tick"))&&(v4W.G0a(60%barLength,0)||v4W.o0a(barLength%60,0));if(v4W.A0a(this.layout.timeUnit,"millisecond")||v4W.Z0a(this.layout.timeUnit,"second"))alignToHour=false;var res={}
,reallyDontRoll=(dontRoll||this.dontRoll);while(1){if(v4W.s0a(position,tmpHist.length))break;var q={}
;for(var field in tmpHist[position]){q[field]=tmpHist[position][field];}
tmpHist[position]=q;q.ratio=1;if(this.layout.adj&&q.Adj_Close){q.ratio=v4W.i0a(q.Adj_Close,q.Close);}
if(v4W.u0a(q.ratio,1)){if(v4W.J0a("Open",q))q.Open=v4W.W1a(q.Open,q.ratio);if(v4W.b1a("Close",q)&&v4W.C1a(q.Close,null))q.Close=v4W.r1a(q.Close,q.ratio);if(v4W.p1a((D4V+K6V+b6V),q))q.High=v4W.v1a(q.High,q.ratio);if(v4W.S1a("Low",q))q.Low=v4W.g1a(q.Low,q.ratio);}
if(!reallyDontRoll&&(v4W.x1a(this.layout.periodicity,1)||v4W.Y1a(this.layout.interval,"week")||v4W.e1a(this.layout.interval,(a5V+X9V+q9V+I9V)))){res=this.consolidatedQuote(tmpHist,position,this.layout.periodicity,this.layout.interval,this.layout.timeUnit,dontRoll,alignToHour);if(!res){STX.alert((e1H+P4V+X9V+o8V+k7V+o1H+m3V+R7H+v6V+Q1H+x0H+k8V+b9V+R1H+o8V+A0H+n1V+R1H+q9V+e1H+K6V+P1H+z9V+H7H+R1H+r9V+X9V+u8V+v6V+z9V+X9V+q9V));break;}
position=res.position;chart.dataSet[i]=res.quote;}
else{chart.dataSet[i]=tmpHist[position];position++;}
q=chart.dataSet[i];if(v4W.j1a(i,0))q.iqPrevClose=chart.dataSet[v4W.q1a(i,1)].Close;else q.iqPrevClose=q.Close;if(v4W.K1a((I5H),q)&&v4W.T1a(q.High,max))max=q.High;if(v4W.V1a("Low",q)&&v4W.X1a(q.Low,min))min=q.Low;i++;}
if(v4W.R1a(this.layout.aggregationType,"rangebars")){chart.dataSet=STX.calculateRangeBars(this,chart.dataSet,this.layout.range);}
else if(v4W.M4a(this.layout.aggregationType,"heikenashi")||v4W.h4a(this.layout.aggregationType,"heikinashi")){chart.dataSet=STX.calculateHeikinAshi(this,chart.dataSet);}
else if(v4W.P4a(this.layout.aggregationType,"kagi")){chart.dataSet=STX.calculateKagi(this,chart.dataSet,this.layout.kagi);}
else if(v4W.F4a(this.layout.aggregationType,(a9V+q9V+e1H+L6V+e1H+P1H+I5V))){chart.dataSet=STX.calculateLineBreak(this,chart.dataSet,this.layout.priceLines);}
else if(v4W.a4a(this.layout.aggregationType,"renko")){chart.dataSet=STX.calculateRenkoBars(this,chart.dataSet,this.layout.renko);}
else if(v4W.L4a(this.layout.aggregationType,(D2V+s1V))){chart.dataSet=STX.calculatePointFigure(this,chart.dataSet,this.layout.pandf);}
if(this.transformDataSetPost)this.transformDataSetPost(this,chart.dataSet,min,max);if(this.maxDataSetSize)chart.dataSet=chart.dataSet.slice(-this.maxDataSetSize);this.calculateATR(chart,20);if(this.dataSetContainsGaps){chart.scrubbed=[];for(i=0;v4W.Q4a(i,chart.dataSet.length);i++){var quote=chart.dataSet[i];if(quote.Close||v4W.t4a(quote.Close,0))chart.scrubbed.push(quote);}
}
else{chart.scrubbed=chart.dataSet;}
}
this.adjustDrawings();var studies=this.layout.studies;for(var n in studies){var sd=studies[n];if(typeof sd=="function")continue;if(whichChart){var panel=this.panels[sd.panel];if(v4W.E4a(panel.chart.name,whichChart.name))continue;}
var study=STX.Studies.studyLibrary[sd.type];if(!study){study={}
;if(v4W.z4a(sd.panel,"chart"))study.overlay=true;}
sd.libraryEntry=study;if(study.calculateFN)study.calculateFN(this,sd);}
var p;for(p in this.plugins){var plugin=this.plugins[p];if(plugin.createDataSet)plugin.createDataSet(this,whichChart);}
for(chartName in this.charts){if(whichChart&&v4W.l4a(whichChart.name,chartName))continue;chart=this.charts[chartName];for(p=0;v4W.d4a(p,chart.dataSet.length);p++){chart.dataSet[p].cache={}
;}
}
this.establishMarkerTicks();this.runAppend((o1H+o8V+e1H+P1H+y0H+P1H+X3V),arguments$);}
;STXChart.prototype.preAdjustScroll=function(chart){if(!chart)chart=this.chart;this.previousAdjust={chart:chart,scroll:chart.scroll,maxTicks:chart.maxTicks}
;}
;STXChart.prototype.postAdjustScroll=function(){if(!this.previousAdjust)return ;var chart=this.previousAdjust.chart;chart.scroll=this.previousAdjust.scroll+(v4W.y4a(chart.maxTicks,this.previousAdjust.maxTicks));if(this.displayInitialized)this.draw();}
;STXChart.prototype.adjustDrawings=function(){for(var i=0;v4W.I4a(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(this.panels[drawing.panelName])drawing.adjust();}
}
;STXChart.prototype.getNextInterval=function(DT,period,dataZone){if(!period)period=v4W.d9H;if(v4W.w4a(this.layout.timeUnit,q2V)||v4W.N4a(this.layout.timeUnit,o2V)){return this.iterate(DT,period,this.layout.timeUnit,dataZone);}
if(!this.isDailyInterval(this.layout.interval)){return this.iterate(DT,v4W.c4a(period,this.layout.interval),h6V,dataZone);}
else{return this.iterate(DT,period,this.layout.interval,dataZone);}
return DT;}
;STXChart.prototype.iterate=function(DT,units,timeUnit,dataZone,symbol){var C1V="econd",B0V="llis",DT2;if(v4W.O7a(timeUnit,q2V)){DT2=new Date(DT);DT2.setSeconds(DT2.getSeconds()+units);return DT2;}
else if(v4W.m7a(timeUnit,(a5V+v6V+B0V+C1V))){DT2=new Date(DT);DT2.setMilliseconds(DT2.getMilliseconds()+units);return DT2;}
else if(v4W.k7a(timeUnit,h6V)){if(v4W.n7a(units,v4W.q9H)){return STX.LegacyMarket.prevPeriod(DT,v4W.d9H,Math.abs(units),this,symbol,dataZone);}
else{return STX.LegacyMarket.nextPeriod(DT,v4W.d9H,units,this,symbol,dataZone);}
}
if(v4W.U7a(timeUnit,Q2H)){if(v4W.B7a(units,v4W.q9H)){return STX.LegacyMarket.nextDay(DT,units,this);}
else{return STX.LegacyMarket.prevDay(DT,Math.abs(units),this);}
}
else if(v4W.D7a(timeUnit,x7H)){if(v4W.f7a(units,v4W.q9H)){return STX.LegacyMarket.nextWeek(DT,units,this);}
else{return STX.LegacyMarket.prevWeek(DT,Math.abs(units),this);}
}
else if(v4W.H7a(timeUnit,h5H)){if(v4W.G7a(units,v4W.q9H)){return STX.LegacyMarket.nextMonth(DT,units,this);}
else{return STX.LegacyMarket.prevMonth(DT,Math.abs(units),this);}
}
return DT;}
;STXChart.prototype.zoomOut=function(e,pct){if(this.runPrepend("zoomOut",arguments))return ;this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,(u8V+m8V+L7V+K8V+Q1H+s6V+K6V+K8V+o1H+b6V+G5H+m8V));if(this.preferences.zoomOutSpeed)pct=this.preferences.zoomOutSpeed;else if(!pct)pct=1.1;if(e&&e.preventDefault)e.preventDefault();this.cancelTouchSingleClick=true;for(var chartName in this.charts){var chart=this.charts[chartName],centerMe=true;if(v4W.o7a(chart.scroll,chart.maxTicks))centerMe=false;if(STX.ipad&&v4W.A7a(chart.maxTicks,STXChart.ipadMaxTicks)){return ;}
var newTicks=Math.round(v4W.Z7a(chart.maxTicks,pct)),newCandleWidth=v4W.s7a(this.chart.width,newTicks);if(v4W.i7a(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;this.layout.span=null;var newMaxTicks,newScroll;if(centerMe){var center=v4W.u7a(chart.scroll,chart.maxTicks/2);newMaxTicks=Math.round(v4W.J7a((this.chart.width/newCandleWidth),0.499));var newCenter=(v4W.W3y(chart.scroll,newMaxTicks/2));newScroll=chart.scroll+Math.round(v4W.b3y(center,newCenter));}
else{newMaxTicks=Math.round(v4W.C3y((this.chart.width/newCandleWidth),0.499));var wsInTicks=Math.round(v4W.r3y(this.preferences.whitespace,newCandleWidth));newScroll=v4W.p3y(newMaxTicks,wsInTicks);}
if(this.animate&&window.requestAnimationFrame){this.animate.go({oldCandleWidth:this.layout.candleWidth,newCandleWidth:newCandleWidth,}
);}
else{this.setCandleWidth(newCandleWidth);this.chart.scroll=newScroll;}
}
if(this.runAppend("zoomOut",arguments))return ;this.draw();this.changeOccurred((b5V+v0H+X9V+f4H));}
;STXChart.prototype.mouseWheel=function(e,wheelEvent){var h8V="MozMousePixelScroll",N8V="onmousewheel",q6V="mouseWheel",C2V=40,x4H="vertical";if(!e)e=event;e.preventDefault();var deltaX=e.deltaX,deltaY=e.deltaY,threshold=e1V,diff=v4W.v3y(Date.now(),this.lastMouseWheelEvent);if(v4W.S3y(Date.now()-this.lastMouseWheelEvent,threshold)){if(v4W.g3y(this.lastMove,v4V))deltaY=v4W.q9H;else deltaX=v4W.q9H;}
this.lastMouseWheelEvent=Date.now();if(v4W.x3y(Math.abs(deltaX),v4W.q9H)&&v4W.Y3y(Math.abs(deltaY),v4W.q9H))return ;if(this.allowSideswipe&&v4W.e3y(deltaX,v4W.q9H)&&v4W.j3y(Math.abs(deltaX),Math.abs(deltaY))){this.lastMove=v4V;delta=deltaX*-v4W.d9H;if(v4W.q3y(delta,e1V))delta=e1V;if(delta<-e1V)delta=-e1V;this.grabbingScreen=i5V;this.grabStartX=STXChart.crosshairX;this.grabStartY=STXChart.crosshairY;if(!this.currentPanel)this.currentPanel=this.chart.panel;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.chart.panel.yAxis.scroll;this.mousemoveinner(v4W.K3y(STXChart.crosshairX,delta),STXChart.crosshairY);this.grabbingScreen=w1V;return ;}
this.lastMove=x4H;if(!this.allowZoom)return ;if(!this.displayInitialized)return ;if(this.wheelInMotion)return ;this.wheelInMotion=i5V;setTimeout(function(self){return function(){self.wheelInMotion=w1V;}
;}
(this),C2V);if(this.runPrepend(q6V,arguments))return ;if(!deltaY){if(v4W.T3y(wheelEvent,N8V)){deltaY=-v4W.d9H/C2V*e.wheelDelta;if(e.wheelDeltaX)deltaX=-v4W.d9H/C2V*e.wheelDeltaX;}
else{deltaY=e.detail;}
}
if(typeof e.deltaMode==J9H)e.deltaMode=(v4W.V3y(e.type,h8V)?v4W.q9H:v4W.d9H);var distance=deltaY;if(v4W.X3y(e.deltaMode,v4W.d9H)){distance*=W2V;}
var pctIn=q5V,pctOut=q5V;if(this.mouseWheelAcceleration){var multiplier=Math.max(Math.pow(Math.abs(distance),R4H),v4W.d9H);pctIn=v4W.R3y(v4W.d9H,M7H*multiplier);pctOut=v4W.d9H+v4W.M8y(O7H,multiplier);}
if(v4W.h8y(distance,v4W.q9H)){if(this.reverseMouseWheel)this.zoomOut(q5V,pctOut);else this.zoomIn(q5V,pctIn);}
else if(v4W.P8y(distance,v4W.q9H)){if(this.reverseMouseWheel)this.zoomIn(q5V,pctIn);else this.zoomOut(q5V,pctOut);}
if(this.runAppend(q6V,arguments))return ;return w1V;}
;STXChart.prototype.zoomIn=function(e,pct){if(this.runPrepend("zoomIn",arguments))return ;this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,"stx-drag-chart");if(this.preferences.zoomInSpeed)pct=this.preferences.zoomInSpeed;else if(!pct)pct=0.9;for(var chartName in this.charts){var chart=this.charts[chartName],centerMe=true;if(v4W.F8y(chart.scroll,chart.maxTicks))centerMe=false;if(e&&e.preventDefault)e.preventDefault();this.cancelTouchSingleClick=true;var newTicks=Math.round(v4W.a8y(chart.maxTicks,pct));if(v4W.L8y(chart.maxTicks-newTicks,2))newTicks=v4W.Q8y(chart.maxTicks,2);if(v4W.t8y(newTicks,9))newTicks=9;var newCandleWidth=v4W.E8y(this.chart.width,newTicks);this.layout.span=null;var newMaxTicks,newScroll;if(centerMe){var center=v4W.z8y(chart.scroll,chart.maxTicks/2);newMaxTicks=Math.round(v4W.l8y((this.chart.width/newCandleWidth),0.499));var newCenter=(v4W.d8y(chart.scroll,newMaxTicks/2));newScroll=chart.scroll+Math.round(v4W.y8y(center,newCenter));}
else{newMaxTicks=Math.round(v4W.I8y((this.chart.width/newCandleWidth),0.499));var wsInTicks=Math.round(v4W.w8y(this.preferences.whitespace,newCandleWidth));newScroll=v4W.N8y(newMaxTicks,wsInTicks);}
if(this.animate&&window.requestAnimationFrame){this.animate.go({oldCandleWidth:this.layout.candleWidth,newCandleWidth:newCandleWidth,}
);}
else{this.setCandleWidth(newCandleWidth);this.chart.scroll=newScroll;}
}
if(this.runAppend("zoomIn",arguments))return ;this.draw();this.changeOccurred("layout");}
;STXChart.prototype.translateIf=function(english){if(this.translationCallback)return this.translationCallback(english);return english;}
;STXChart.prototype.setTimeZone=function(dataZone,displayZone){if(typeof timezoneJS==J9H){this.timeZoneOffset=v4W.q9H;return ;}
var now=new Date(),myTimeZoneOffset=now.getTimezoneOffset(),dataTimeZoneOffset=myTimeZoneOffset,displayTimeZoneOffset=myTimeZoneOffset;if(dataZone)this.dataZone=dataZone;if(this.dataZone)dataTimeZoneOffset=new timezoneJS.Date(now,this.dataZone).getTimezoneOffset();if(displayZone)this.displayZone=displayZone;if(this.displayZone)displayTimeZoneOffset=new timezoneJS.Date(now,this.displayZone).getTimezoneOffset();this.timeZoneOffset=v4W.c8y((dataTimeZoneOffset-myTimeZoneOffset),(displayTimeZoneOffset-myTimeZoneOffset));for(var chartName in this.charts){var chart=this.charts[chartName];if(chart.masterData&&!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDates(chart.masterData);}
this.createDataSet();}
;STXChart.prototype.setLocale=function(locale){var y4V="percent",N6V="short",p2V="2-digit",L6H="mer";if(typeof Intl==J9H)return ;if(v4W.O9y(this.locale,locale)){this.locale=locale;}
else{return ;}
this.internationalizer={}
;this.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale,{hour:(q9V+k8V+L6H+v6V+o1H),minute:s2H,hour12:w1V}
);this.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale,{hour:s2H,minute:s2H,second:s2H,hour12:w1V}
);this.internationalizer.mdhm=new Intl.DateTimeFormat(this.locale,{year:p2V,month:p2V,day:p2V,hour:p2V,minute:p2V}
);this.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale,{month:s2H,day:s2H}
);this.internationalizer.yearMonthDay=new Intl.DateTimeFormat(this.locale,{year:s2H,month:s2H,day:s2H}
);this.internationalizer.month=new Intl.DateTimeFormat(this.locale,{month:N6V}
);this.internationalizer.numbers=new Intl.NumberFormat(this.locale);this.internationalizer.priceFormatters=[];this.internationalizer.priceFormatters[v4W.q9H]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:v4W.q9H,minimumFractionDigits:v4W.q9H}
);this.internationalizer.priceFormatters[v4W.d9H]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:v4W.d9H,minimumFractionDigits:v4W.d9H}
);this.internationalizer.priceFormatters[v4W.j9H]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:v4W.j9H,minimumFractionDigits:v4W.j9H}
);this.internationalizer.priceFormatters[v4W.l9H]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:v4W.l9H,minimumFractionDigits:v4W.l9H}
);this.internationalizer.priceFormatters[v4W.s9H]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:v4W.s9H,minimumFractionDigits:v4W.s9H}
);this.internationalizer.percent=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.j9H,maximumFractionDigits:v4W.j9H}
);this.internationalizer.percent0=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.q9H,maximumFractionDigits:v4W.q9H}
);this.internationalizer.percent1=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.d9H,maximumFractionDigits:v4W.d9H}
);this.internationalizer.percent2=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.j9H,maximumFractionDigits:v4W.j9H}
);this.internationalizer.percent3=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.l9H,maximumFractionDigits:v4W.l9H}
);this.internationalizer.percent4=new Intl.NumberFormat(this.locale,{style:y4V,minimumFractionDigits:v4W.s9H,maximumFractionDigits:v4W.s9H}
);STX.createMonthArrays(this,this.internationalizer.month,this.locale);}
;STXChart.prototype.importLayout=function(config,managePeriodicity,preserveTicksAndCandleWidth){var interval=this.layout.interval,periodicity=this.layout.periodicity,timeUnit=this.layout.timeUnit,candleWidth=this.layout.candleWidth,serializedDrawings=this.serializeDrawings();this.abortDrawings();this.currentlyImporting=i5V;this.overlays={}
;var view=STX.clone(config);for(var s in this.layout.studies){var sd=this.layout.studies[s];STX.Studies.removeStudy(this,sd);}
if(view){var priorPanels=STX.shallowClone(this.panels);this.panels={}
;STX.dataBindSafeAssignment(this.layout,STX.clone(view));if(preserveTicksAndCandleWidth){this.layout.candleWidth=candleWidth;}
else{if(!this.layout.candleWidth)this.setCandleWidth(v4W.u9H,this.chart);}
var panels=view.panels;this.layout.panels={}
;for(var p in panels){var panel=panels[p];this.stackPanel(panel.display,p,panel.percent,panel.chartName);}
if(STX.isEmpty(panels)){this.stackPanel(R0H,R0H,v4W.d9H,R0H);}
for(var panelName in priorPanels){var oldPanel=priorPanels[panelName],newPanel=this.panels[panelName];if(newPanel){this.container.removeChild(newPanel.holder);this.container.removeChild(oldPanel.handle);var copyFields={"holder":i5V,"subholder":i5V,"display":i5V}
;for(var f in copyFields){newPanel[f]=oldPanel[f];}
this.configurePanelControls(newPanel);if(v4W.m9y(oldPanel.chart.panel,oldPanel))oldPanel.chart.panel=newPanel;}
else{this.privateDeletePanel(oldPanel);}
}
this.adjustPanelPositions();this.storePanels();var studies=STX.clone(this.layout.studies);delete  this.layout.studies;for(var ss in studies){var study=studies[ss];STX.Studies.addStudy(this,study.type,study.inputs,study.outputs,study.parameters,study.panel);}
}
if(typeof (this.layout.chartType)==J9H)this.layout.chartType=B8V;this.adjustPanelPositions();this.layout.interval=interval;this.layout.periodicity=periodicity;this.layout.timeUnit=timeUnit;if(managePeriodicity){interval=view.interval;periodicity=view.periodicity;timeUnit=view.timeUnit;if(isNaN(periodicity))periodicity=v4W.d9H;if(!interval)interval=Q2H;if(v4W.k9y(interval,this.layout.interval)||v4W.n9y(periodicity,this.layout.periodicity)){this.setPeriodicityV2(periodicity,interval);}
else{this.createDataSet();}
}
else{this.createDataSet();}
this.reconstructDrawings(serializedDrawings);this.draw();this.currentlyImporting=w1V;this.updateListeners(P5H);}
;STXChart.prototype.exportLayout=function(){var W1V="panels",x6V="studies",obj={}
;for(var field in this.layout){if(v4W.U9y(field,x6V)&&v4W.B9y(field,W1V)){obj[field]=STX.clone(this.layout[field]);}
else if(v4W.D9y(field,x6V)){obj.studies={}
;}
else if(v4W.f9y(field,W1V)){obj.panels={}
;}
}
for(var panelName in this.panels){var panel=obj.panels[panelName]={}
,p=this.panels[panelName];panel.percent=p.percent;panel.display=p.display;panel.chartName=p.chart.name;}
for(var studyName in this.layout.studies){var study=obj.studies[studyName]={}
,s=this.layout.studies[studyName];study.type=s.type;study.inputs=STX.clone(s.inputs);study.outputs=STX.clone(s.outputs);study.panel=s.panel;study.parameters=STX.clone(s.parameters);}
return obj;}
;STXChart.prototype.doCleanupGaps=function(quotes){if(!this.cleanupGaps)return quotes;if(v4W.H9y(interval,(J0V+I5V)))return quotes;if(quotes&&!quotes.length)return quotes;var interval=this.layout.interval;if((v4W.G9y(interval,"month")||v4W.o9y(interval,"week"))&&!this.dontRoll){interval="day";}
if(STXChart.isDailyInterval(interval)&&v4W.A9y(interval,"day"))return quotes;var newQuotes=[],j=0,dt=null,stick=false;for(var i=0;v4W.Z9y(i,quotes.length);i++,j++){var thisQuote=quotes[i],bcdt;if(thisQuote.DT)bcdt=new Date(thisQuote.DT.getTime());else bcdt=new Date(STX.strToDateTime(thisQuote.Date).getTime());if(v4W.s9y(dt,null)){dt=bcdt;}
else{for(var zz=0;v4W.i9y(zz,1440);zz++){if(!stick){if(v4W.u9y(interval,"day")){dt=STX.LegacyMarket.nextDay(dt,null,this);}
else{dt=this.getNextInterval(dt,null,this.dataZone);}
}
if(v4W.J9y(interval,"day")){if(v4W.W5y(bcdt.getDate(),dt.getDate())&&v4W.b5y(bcdt.getMonth(),dt.getMonth())&&v4W.C5y(bcdt.getFullYear(),dt.getFullYear())){stick=false;break;}
}
else if(v4W.r5y(bcdt.getTime(),dt.getTime())){stick=false;break;}
if(v4W.p5y(bcdt.getTime(),dt.getTime())){stick=true;break;}
else{newQuotes.push({DT:dt,Open:newQuotes[v4W.v5y(j,1)].Close,High:newQuotes[v4W.S5y(j,1)].Close,Low:newQuotes[v4W.g5y(j,1)].Close,Close:newQuotes[v4W.x5y(j,1)].Close,Volume:0,Adj_Close:newQuotes[v4W.Y5y(j,1)].Adj_Close}
);stick=false;j++;}
}
}
newQuotes.push(thisQuote);}
return newQuotes;}
;STXChart.Driver=function(stx,quoteFeed,behavior){this.tagalongs={}
;this.stx=stx;this.quoteFeed=quoteFeed;this.behavior=behavior;this.loadingNewChart=w1V;this.intervalTimer=q5V;this.updatingChart=w1V;this.updateChartLoop();}
;STXChart.Driver.prototype.die=function(){if(this.intervalTimer)window.clearInterval(this.intervalTimer);}
;STXChart.Driver.prototype.attachTagAlongQuoteFeed=function(feed){if(!this.tagalongs[feed.label]){this.tagalongs[feed.label]={label:feed.label,quoteFeed:feed.quoteFeed,behavior:feed.behavior?feed.behavior:{}
,count:v4W.q9H}
;}
this.tagalongs[feed.label].count++;}
;STXChart.Driver.prototype.detachTagAlongQuoteFeed=function(feed){var tagalong=this.tagalongs[feed.label];tagalong.count--;if(!tagalong.count)this.tagalongs[feed.label]=q5V;}
;STXChart.Driver.prototype.loadDependents=function(params){var field,syms={}
,stx=params.stx,series=stx.chart.series;function getStartDate(symbol){for(var c=v4W.e5y(stx.masterData.length,1);v4W.j5y(c,0);c--){if(stx.masterData[c]&&typeof stx.masterData[c][symbol]!="undefined"){return STX.strToDateTime(stx.masterData[c].Date);}
}
return params.startDate;}
for(field in series){if(!series[field].parameters.data||!series[field].parameters.data.useDefaultQuoteFeed)continue;syms[field]=true;}
for(var p in stx.panels){if(stx.panels[p].studyQuotes){for(var sq in stx.panels[p].studyQuotes)syms[sq]=true;}
}
var arr=[];for(field in syms){var seriesParam=STX.shallowClone(params.originalState);seriesParam.symbol=field;if(series[field]&&series[field].parameters.symbolObject)seriesParam.symbolObject=series[field].parameters.symbolObject;if(seriesParam.update){seriesParam.startDate=getStartDate(field);}
else{if(!seriesParam.startDate)seriesParam.startDate=stx.masterData[0].DT;if(!seriesParam.endDate)seriesParam.endDate=stx.masterData[v4W.q5y(stx.masterData.length,1)].DT;}
arr.push(seriesParam);}
if(!arr.length){stx.createDataSet();stx.draw();return ;}
this.quoteFeed.multiFetch(arr,function(results){for(var i=0;v4W.K5y(i,results.length);i++){var result=results[i];if(!result.dataCallback.error){var field=null;if(stx.chart.series[result.params.symbol]){field=stx.chart.series[result.params.symbol].parameters.field;}
STX.addMemberToMasterdata(stx,result.params.symbol,result.dataCallback.quotes,null,null,field);}
}
stx.createDataSet();stx.draw();}
);}
;STXChart.Driver.prototype.executeTagAlongs=function(params){var count={count:STX.objLength(this.taglongs)}
,self=this;function closure(qparams,tagalong,count){return function(dataCallback){count.count--;if(!dataCallback.error){var fields=qparams.fields;if(!fields)fields=null;STX.addMemberToMasterdata(self.stx,tagalong.label,dataCallback.quotes,fields);}
if(count.count==-1)self.render();}
;}
for(var label in this.tagalongs){var tagalong=this.tagalongs[label],qparams=STX.shallowClone(tagalong.behavior);STX.extend(qparams,params,true);tagalong.quoteFeed.fetch(qparams,closure(qparams,tagalong,count));}
}
;STXChart.Driver.prototype.render=function(){this.stx.createDataSet();this.stx.draw();}
;STXChart.Driver.prototype.updateChart=function(){if(this.updatingChart)return ;if(this.loadingNewChart)return ;var howManyToGet=STX.objLength(this.stx.charts),howManyReturned=0,interval=this.stx.layout.interval,timeUnit=this.stx.layout.timeUnit;function closure(self,params,symbol){return function(dataCallback){howManyReturned++;if(v4W.T5y(symbol,params.chart.symbol)&&v4W.V5y(interval,self.stx.layout.interval)&&v4W.X5y(timeUnit,self.stx.layout.timeUnit)){if(!dataCallback.error){var lastBarAdded=false;if(!params.missingBarsCreated){if(params.chart.masterData.length&&dataCallback.quotes&&v4W.R5y(dataCallback.quotes.length,0)){var lastRecord=params.chart.masterData[v4W.M6y(params.chart.masterData.length,1)];if((dataCallback.quotes[0].DT&&v4W.h6y(lastRecord.DT,dataCallback.quotes[0].DT))||(dataCallback.quotes[0].Date&&v4W.P6y(lastRecord.Date,dataCallback.quotes[0].Date))){dataCallback.quotes.unshift(lastRecord);lastBarAdded=true;}
}
dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes);if(lastBarAdded)dataCallback.quotes.shift();}
self.stx.appendMasterData(dataCallback.quotes,params.chart,{noCreateDataSet:true}
);}
else{self.quoteFeed.announceError(params,dataCallback);}
}
else{return ;}
if(v4W.F6y(howManyReturned,howManyToGet)){self.updatingChart=false;}
self.executeTagAlongs(params);if(self.behavior.callback){self.behavior.callback(params);self.stx.createDataSet();self.stx.draw();}
else{self.loadDependents(params);}
}
;}
for(var chartName in this.stx.charts){var chart=this.stx.charts[chartName];if(!chart.symbol)continue;if(!chart.masterData)continue;var params=this.makeParams(chart.symbol,chart);if(chart.masterData.length)params.startDate=chart.masterData[v4W.a6y(chart.masterData.length,1)].DT;params.update=true;params.originalState=STX.shallowClone(params);this.updatingChart=true;this.quoteFeed.fetch(params,closure(this,params,chart.symbol));}
}
;STXChart.Driver.prototype.updateChartLoop=function(){function closure(self){return function(){self.updateChart();}
;}
closure(this)();if(this.behavior.refreshInterval)this.intervalTimer=window.setInterval(closure(this),v4W.L6y(this.behavior.refreshInterval,B4V));}
;STXChart.Driver.prototype.resetRefreshInterval=function(newInterval){if(this.intervalTimer)window.clearInterval(this.intervalTimer);this.behavior.refreshInterval=newInterval;this.updateChartLoop();}
;STXChart.Driver.prototype.loadAll=function(chart,cb){var self=this,count=v4W.q9H;function closure(){return function(response){var Y9H="eFee",I7V="ctl",Z9V="orre",A4V="ent",I6H="ilabl",r3V="va",O9H="reA",Q5V=", ",a9H="error";if(response)cb(response);else if(!chart.moreAvailable){cb(q5V);}
else if(v4W.Q6y(count++,b0V)){cb((a9H+Q5V+a5V+X9V+O9H+r3V+I6H+e1H+R1H+q9V+X9V+m8V+R1H+v6V+a5V+Z4V+e1H+a5V+A4V+v7H+R1H+o1H+Z9V+I7V+W7V+R1H+v6V+q9V+R1H+F9H+w2H+m8V+Y9H+Q1H));}
else{self.checkLoadMore(chart,i5V,i5V,closure());}
}
;}
this.checkLoadMore(chart,i5V,i5V,closure());}
;STXChart.Driver.prototype.checkLoadMore=function(chart,forceLoadMore,fetchMaximumBars,cb){if(!chart.moreAvailable){if(cb)cb();return ;}
var interval=this.stx.layout.interval,timeUnit=this.stx.layout.timeUnit;function closure(self,params){return function(dataCallback){if(v4W.t6y(params.symbol,params.chart.symbol)&&v4W.E6y(interval,self.stx.layout.interval)&&v4W.z6y(timeUnit,self.stx.layout.timeUnit)){if(!params.loadMore)params.chart.loadingMore=false;if(!dataCallback.error){if(!params.missingBarsCreated){dataCallback.quotes.push(params.chart.masterData[0]);dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes);dataCallback.quotes.pop();}
params.chart.moreAvailable=dataCallback.moreAvailable;var fullMasterData=dataCallback.quotes.concat(params.chart.masterData);self.stx.setMasterData(fullMasterData,params.chart);self.stx.createDataSet();self.stx.draw();params.startDate=params.chart.masterData[0].DT;self.executeTagAlongs(params);if(self.behavior.callback){self.behavior.callback(params);}
else{self.loadDependents(params);}
}
else{self.quoteFeed.announceError(params,dataCallback);}
if(cb)cb(null);}
else{return ;}
}
;}
var fetching=false;if(!this.behavior.noLoadMore){if(!this.stx.maxDataSetSize||v4W.l6y(chart.dataSet.length,this.stx.maxDataSetSize)){if((v4W.d6y(chart.dataSet.length,0)&&v4W.y6y(chart.scroll,chart.dataSet.length))||forceLoadMore){this.stx.cancelSwipe=true;if(!chart.loadingMore){chart.initialScroll=chart.scroll;chart.loadingMore=true;var params=this.makeParams(chart.symbol,chart);params.endDate=chart.masterData[0].DT;params.originalState=STX.shallowClone(params);if(this.stx.fetchMaximumBars[this.stx.layout.aggregationType])fetchMaximumBars=true;if(fetchMaximumBars){params.fetchMaximumBars=true;params.ticks=Math.max(20000,params.ticks);}
this.quoteFeed.fetch(params,closure(this,params));fetching=true;}
}
}
}
if(chart.loadingMore){chart.initialScroll=chart.scroll;}
if(!fetching&&cb)cb(null);}
;STXChart.Driver.prototype.barsToFetch=function(params){if(params.isSeries)return params.stx.masterData.length;var interval=this.stx.layout.interval,p=params.stx.layout.periodicity;if((v4W.I6y(interval,"month")||v4W.w6y(interval,"week"))&&!this.stx.dontRoll){p*=(v4W.N6y(interval,"week"))?7:30;}
var bars=v4W.c6y(params.stx.chart.maxTicks,p);return bars;}
;STXChart.Driver.prototype.makeParams=function(symbol,chart){var t1V="delayed",z8V="onth",interval=this.stx.layout.interval,ticks=this.barsToFetch({stx:this.stx}
);if((v4W.O2y(interval,(a5V+z8V))||v4W.m2y(interval,x7H))&&!this.stx.dontRoll){interval=Q2H;}
var params=STX.shallowClone(this.behavior);STX.extend(params,{stx:this.stx,symbol:symbol,chart:chart,interval:interval,extended:this.stx.layout.extended,period:v4W.d9H,feed:t1V,ticks:ticks}
,i5V);if(v4W.k2y(symbol,this.stx.chart.symbolObject.symbol))params.symbolObject=this.stx.chart.symbolObject;if(!isNaN(params.interval)){params.period=params.interval;params.interval=this.stx.layout.timeUnit;if(!params.interval)params.interval=h6V;}
if(params.pts)params.ticks=Math.max(params.ticks,B4V);return params;}
;STXChart.Driver.prototype.newChart=function(params,cb){var stx=this.stx,symbol=params.symbol,interval=stx.layout.interval,timeUnit=stx.layout.timeUnit,chart=params.chart;chart.moreAvailable=false;chart.attribution=null;var qparams=this.makeParams(symbol,chart);STX.extend(qparams,params,true);if(stx.fetchMaximumBars[stx.layout.aggregationType]){qparams.ticks=Math.max(20000,qparams.ticks);qparams.fetchMaximumBars=true;}
function closure(self,qparams){return function(dataCallback){if(v4W.n2y(symbol,qparams.chart.symbol)&&v4W.U2y(interval,stx.layout.interval)&&v4W.B2y(timeUnit,stx.layout.timeUnit)){if(!dataCallback.error&&v4W.D2y(dataCallback.error,0)&&dataCallback.quotes&&v4W.f2y(dataCallback.quotes.length,0)){if(!qparams.missingBarsCreated)dataCallback.quotes=stx.doCleanupGaps(dataCallback.quotes);stx.setMasterData(dataCallback.quotes,qparams.chart);qparams.chart.moreAvailable=dataCallback.moreAvailable;qparams.chart.attribution=dataCallback.attribution;self.loadingNewChart=false;stx.createDataSet();if(params.initializeChart)stx.initializeChart();stx.home({maintainWhitespace:true}
);}
else{self.quoteFeed.announceError(qparams,dataCallback);}
}
else{if(cb)cb("orphaned");return ;}
self.loadingNewChart=false;if(cb){cb(dataCallback.error);}
if(qparams.chart.masterData&&qparams.chart.masterData.length)qparams.startDate=qparams.chart.masterData[0].DT;self.executeTagAlongs(qparams);if(self.behavior.callback){self.behavior.callback(qparams);}
else{self.loadDependents(qparams);}
self.resetRefreshInterval(self.behavior.refreshInterval);}
;}
this.loadingNewChart=true;this.updatingChart=false;qparams.originalState=STX.shallowClone(qparams);this.quoteFeed.fetch(qparams,closure(this,qparams));}
;STXChart.prototype.attachQuoteFeed=function(quoteFeed,behavior){if(!behavior)behavior={}
;if(this.quoteDriver){this.quoteDriver.die();}
this.quoteDriver=new STXChart.Driver(this,quoteFeed,behavior);}
;STXChart.prototype.attachTagAlongQuoteFeed=function(feed){var I0V="igni",n2H="tho",C0H="F",n0H="Qu",E7H="ong",e7H="ag",b1H="tachT",S8V="mpt";if(!feed.label){console.log((S1V+m8V+m8V+e1H+S8V+R1H+m8V+X9V+R1H+P1H+m8V+b1H+e7H+S1V+b5V+E7H+n0H+X9V+g8V+C0H+u0V+R1H+z7V+v6V+n2H+f4H+R1H+P1H+u8V+u8V+I0V+q9V+K6V+R1H+P1H+R1H+b5V+P1H+X0H+f3V));return ;}
this.quoteDriver.attachTagAlongQuoteFeed(feed);}
;STXChart.prototype.detachTagAlongQuoteFeed=function(feed){this.quoteDriver.detachTagAlongQuoteFeed(feed);}
;STX.Comparison=function(){}
;V(w1V);STX.Comparison.priceToPercent=function(stx,chart,price){return v4W.H2y(Math.round(((price-STX.Comparison.baseline)/STX.Comparison.baseline*o4V)*C4V),C4V);}
;STX.Comparison.percentToPrice=function(stx,chart,percent){return v4W.G2y(STX.Comparison.baseline,(v4W.d9H+(percent/o4V)));}
;STX.Comparison.stopSort=function(lhs,rhs){return v4W.o2y(lhs,rhs);}
;STX.Comparison.createComparisonSegmentInner=function(stx,chart){var fields=[],field;for(field in chart.series){if(chart.series[field].parameters.isComparison){fields.push(field);}
}
var priceFields=["Close","Open","High","Low","iqPrevClose"];chart.dataSegment=[];var firstQuote=null,firstTick=v4W.A2y(chart.dataSet.length,chart.scroll),lastTick=firstTick+chart.maxTicks,stopPointer=0,stops=[],i;for(i=0;v4W.Z2y(i,stx.drawingObjects.length);i++){var drawing=stx.drawingObjects[i];if(v4W.s2y(drawing.name,"comparison_stop"))if(v4W.i2y(drawing.tick,firstTick)&&v4W.u2y(drawing.tick,lastTick))stops.push(drawing.tick);}
stops.sort(STX.Comparison.stopSort);var transformsToProcess=chart.maxTicks+3;for(i=0;v4W.J2y(i,transformsToProcess);i++){if(v4W.W0y(i,transformsToProcess))i=-1;position=firstTick+i;if(v4W.b0y(position,chart.dataSet.length)&&v4W.C0y(position,0)){var quote=chart.dataSet[position];if(!firstQuote){firstQuote=STX.clone(quote);}
if(!quote.transform)quote.transform={"cache":{}
,"DT":quote.DT,"Date":quote.Date}
;STX.Comparison.baseline=firstQuote.Close;var j;for(j=0;v4W.r0y(j,priceFields.length);j++){field=priceFields[j];if(quote[field]||v4W.p0y(quote[field],0))quote.transform[field]=v4W.v0y(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
var s=stx.layout.studies;if(s){for(var n in s){var sd=s[n];if(v4W.S0y(stx.panels[sd.panel].name,sd.chart.name))continue;for(field in sd.outputMap){if(quote[field]||v4W.g0y(quote[field],0))quote.transform[field]=v4W.x0y(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
if(sd.referenceOutput&&(quote[sd.referenceOutput+" "+sd.name]||v4W.Y0y(quote[sd.referenceOutput+" "+sd.name],0)))quote.transform[sd.referenceOutput+" "+sd.name]=v4W.e0y(Math.round(((quote[sd.referenceOutput+" "+sd.name]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
}
for(j in stx.plugins){var plugin=stx.plugins[j];if(!plugin.transformOutputs)continue;for(field in plugin.transformOutputs){if(quote[field]||v4W.j0y(quote[field],0))quote.transform[field]=v4W.q0y(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
}
var createAStop=false;if(stops&&v4W.K0y(stopPointer,stops.length)){if(v4W.T0y(position,stops[stopPointer])){createAStop=true;stopPointer++;}
}
var mouseStop=null;if(stx.activeDrawing&&v4W.V0y(stx.activeDrawing.name,"comparison_stop")){mouseStop=stx.activeDrawing.tick;}
var current;if(createAStop||v4W.X0y(position,mouseStop)){for(j=0;v4W.R0y(j,fields.length);j++){field=fields[j];current=quote[field];firstQuote[field]=v4W.M1y(current,(1+(quote.transform.Close/100)));}
}
for(j=0;v4W.h1y(j,fields.length);j++){field=fields[j];current=quote[field];if(current||v4W.P1y(current,0)){var baseline=firstQuote[field];if(!baseline&&v4W.F1y(baseline,0)){firstQuote[field]=baseline=v4W.a1y(current,(1+(quote.transform.Close/100)));}
quote.transform[field]=v4W.L1y(Math.round(((current-baseline)/baseline*100)*10000),10000);}
}
chart.dataSegment.push(quote);}
else if(v4W.Q1y(position,0)){chart.dataSegment.push(null);}
if(v4W.t1y(i,0))break;}
stx.clearPixelCache();return true;}
;STX.Comparison.createComparisonSegment=function(){for(var chartName in this.charts){var chart=this.charts[chartName];if(chart.isComparison)STX.Comparison.createComparisonSegmentInner(this,chart);}
}
;STX.Comparison.priceFormat=function(stx,panel,price){var c0V=(7.>=(87.,13.51E2)?50:(0xDA,8.89E2)<=0x10C?'h':(9.1E1,35.)<=(45,0x1E6)?(11.26E2,0.001):(2.65E2,14.66E2)),G2H="fin";if(v4W.E1y(price,q5V)||typeof price==(k8V+q9V+Q1H+e1H+G2H+v7H))return N3V;var priceTick=panel.yAxis.priceTick;if(stx.internationalizer){if(v4W.z1y(priceTick,v4W.d9H))price=stx.internationalizer.percent0.format(v4W.l1y(price,o4V));else if(v4W.d1y(priceTick,M7H))price=stx.internationalizer.percent1.format(v4W.y1y(price,o4V));else if(v4W.I1y(priceTick,b5H))price=stx.internationalizer.percent2.format(v4W.w1y(price,o4V));else if(v4W.N1y(priceTick,c0V))price=stx.internationalizer.percent3.format(v4W.c1y(price,o4V));else price=stx.internationalizer.percent4.format(price);}
else{if(v4W.O4y(priceTick,v4W.d9H))price=price.toFixed(v4W.q9H)+u5V;else if(v4W.m4y(priceTick,M7H))price=price.toFixed(v4W.d9H)+u5V;else if(v4W.k4y(priceTick,b5H))price=price.toFixed(v4W.j9H)+u5V;else if(v4W.n4y(priceTick,c0V))price=price.toFixed(v4W.l9H)+u5V;else price=price.toFixed(v4W.s9H)+u5V;}
if(v4W.U4y(parseFloat(price),v4W.q9H)&&v4W.B4y(price.charAt(v4W.q9H),K8V)){price=price.substring(v4W.d9H);}
return price;}
;STX.Comparison.correlate=function(stx,symbol){var n6H="ompa",q0V="Com";if(!STX.Comparison.requestCorrelation||v4W.D4y(correlationPeriod,0))return ;var correlationPeriod=parseInt($$$(".stxCorrelate .stx-input-field").value,10),corrPanel=stx.panels[STX.Comparison.correlationPanel+" ("+correlationPeriod+")"],inputs={"id":STX.Comparison.correlationPanel+(U0H)+correlationPeriod+")","Period":correlationPeriod,"Compare To":[]}
,outputs={}
,panelName=null;if(corrPanel){for(var i=0;v4W.f4y(i,stx.layout.studies[corrPanel.name].inputs["Compare To"].length);i++){inputs[(q0V+r9V+P1H+V5V+R1H+Q5H+X9V)].push(stx.layout.studies[corrPanel.name].inputs[(T0V+n6H+V5V+R1H+Q5H+X9V)][i]);}
for(var o in stx.layout.studies[corrPanel.name].outputs){outputs[o]=stx.layout.studies[corrPanel.name].outputs[o];}
panelName=corrPanel.name;}
inputs["Compare To"].push(symbol);outputs["Result "+symbol]=STX.Comparison.colorSelection;STX.Studies.addStudy(stx,(o1H+t1H+o8V+f3V),inputs,outputs,null,panelName);for(var panel in stx.panels){if(v4W.H4y(stx.panels[panel].name.indexOf(STX.Comparison.correlationPanel),0)){var compareArray=stx.layout.studies[stx.panels[panel].name].inputs["Compare To"];for(var ii=0;v4W.G4y(ii,compareArray.length);ii++){if(v4W.o4y(compareArray[ii],symbol)){stx.layout.studies[stx.panels[panel].name].outputs["Result "+symbol]=STX.Comparison.colorSelection;}
}
}
}
}
;STX.Comparison.toggleCorrelate=function(stx){var J1H="ox",M7V="ckb",S1H=" .",u7H="Co";STX.Comparison.requestCorrelation=!STX.Comparison.requestCorrelation;var display=$$$((w3V+u8V+O1V+u7H+o8V+o8V+e1H+h7V+g8V+S1H+u8V+O1V+K8V+o1H+O8V+M7V+J1H));if(display){STX.unappendClassName(display,(!STX.Comparison.requestCorrelation).toString());STX.appendClassName(display,STX.Comparison.requestCorrelation.toString());}
}
;STXChart.prototype.setComparison=function(onOff,chart){var G5V="string";if(!chart)chart=this.chart;if(typeof chart==G5V)chart=this.charts[chart];if(!chart.isComparison&&onOff){this.setTransform(chart,STX.Comparison.priceToPercent,STX.Comparison.percentToPrice);chart.panel.yAxis.priceFormatter=STX.Comparison.priceFormat;chart.panel.yAxis.whichSet=A9H;}
else if(chart.isComparison&&!onOff){this.unsetTransform(chart);chart.panel.yAxis.priceFormatter=q5V;chart.panel.yAxis.whichSet=Y9V;}
chart.isComparison=onOff;}
;STX.Comparison.startPlugin=function(){var o5H="gmen";STXChart.prototype.prepend((o1H+o8V+e1H+P1H+g8V+c2H+h6H+P1H+r5H+e1H+o5H+m8V),STX.Comparison.createComparisonSegment);}
;STX.Comparison.removeSeries=function(stx,field){}
;STX.SearchableWordList=function(list,maxResults,contains){if(!list)return ;if(!maxResults)maxResults=50;if(!contains)contains=false;var container={"records":[],"words":[]}
;for(var r=0;v4W.A4y(r,list.length);r++){var record=list[r];if(!record.name)record.name=record.id;record.index=v4W.Z4y(container.records.push(record),1);var descs=record.name.split(" ");if(record.keywords)descs=descs.concat(record.keywords.split(" "));for(var j=0;v4W.s4y(j,descs.length);j++){var word=descs[j].toUpperCase(),subIdx="_",subIdx2="_";if(v4W.i4y(word.charCodeAt(0),33)&&v4W.u4y(word.charCodeAt(0),126))subIdx=word.charAt(0);if(!container.words[subIdx])container.words[subIdx]=[];if(v4W.J4y(word.length,1)){if(v4W.W7y(word.charCodeAt(1),33)&&v4W.b7y(word.charCodeAt(1),126))subIdx2=word.charAt(1);}
else{subIdx2=" ";}
if(!container.words[subIdx][subIdx2])container.words[subIdx][subIdx2]=[];container.words[subIdx][subIdx2].push({index:record.index,word:word}
);}
}
this.lookup=function(input,category,cb){var results=[];function sortId(a,b){if(v4W.C7y(a.id,b.id))return 1;else if(v4W.r7y(a.id,b.id))return -1;return v4W.p7y(a.weight,b.weight)?1:-1;}
function sortWeight(a,b){if(v4W.v7y(a.weight,b.weight))return 1;else if(v4W.S7y(a.weight,b.weight))return -1;return v4W.g7y(a.name,b.name)?1:-1;}
function sortDescWeight(a,b){a.weight=0;b.weight=0;for(var j=0;v4W.x7y(j,keys.length);j++){var KEY=keys[j].toUpperCase(),aIndex=a.name.toUpperCase().indexOf(KEY),bIndex=b.name.toUpperCase().indexOf(KEY);if(aIndex==-1)return 1;else if(bIndex==-1)return -1;a.weight+=aIndex;b.weight+=bIndex;}
if(v4W.Y7y(a.weight,b.weight))return 1;else if(v4W.e7y(a.weight,b.weight))return -1;return v4W.j7y(a.name,b.name)?1:-1;}
function noDups(res){var returnArray=[],previousId="";for(var r=0;v4W.q7y(r,res.length);r++){if(v4W.K7y(previousId,res[r].id))continue;returnArray.push(res[r]);previousId=res[r].id;}
return returnArray;}
if(input&&container){var foundBitMap=[],keyword=input.toUpperCase(),exacts=[],d,entry;for(d=0;v4W.T7y(d,container.records.length);d++){entry=container.records[d];if(foundBitMap[entry.index])continue;if(category&&v4W.V7y(entry.category,category))continue;var name=entry.name.toUpperCase();if(v4W.X7y(keyword,"*")){exacts.push(STX.extend(container.records[entry.index],{weight:0}
));foundBitMap[entry.index]=true;}
else{var i=name.indexOf(keyword);if(i>-1){var weight=v4W.R7y(name.length,keyword.length);if(!contains&&v4W.M3H(i,0))continue;(weight?results:exacts).push(STX.extend(container.records[entry.index],{weight:weight}
));foundBitMap[entry.index]=true;}
}
}
var keys=keyword.split(" "),k1="_",k2="_",myKey=keys[0].toUpperCase(),descResults=[];if(v4W.h3H(myKey.charCodeAt(0),33)&&v4W.P3H(myKey.charCodeAt(0),126))k1=myKey.charAt(0);if(v4W.F3H(myKey.length,1)){if(v4W.a3H(myKey.charCodeAt(1),33)&&v4W.L3H(myKey.charCodeAt(1),126))k2=myKey.charAt(1);}
else{k2=" ";}
if(container.words[k1]){for(var kk in container.words[k1]){if(v4W.Q3H(kk.length,1))continue;if(v4W.t3H(k2," "))kk=k2;for(d=0;container.words[k1][kk]&&v4W.E3H(d,container.words[k1][kk].length);d++){entry=container.words[k1][kk][d];if(v4W.z3H(entry.word.toUpperCase().indexOf(myKey),0))continue;if(foundBitMap[entry.index])continue;if(category&&v4W.l3H(container.records[entry.index].category,category))continue;descResults.push(STX.clone(container.records[entry.index]));foundBitMap[entry.index]=true;}
if(v4W.d3H(k2," "))break;}
}
for(var extraKeys=1;v4W.y3H(extraKeys,keys.length);extraKeys++){myKey=keys[extraKeys].toUpperCase();for(var res=v4W.I3H(descResults.length,1);v4W.w3H(res,0);res--){var words=descResults[res].name.split(" ");if(descResults[res].keywords)words=words.concat(descResults[res].keywords.split(" "));var match=false;for(var wd=0;v4W.N3H(wd,words.length);wd++){if(v4W.c3H(words[wd].toUpperCase().indexOf(myKey),0)){match=true;break;}
}
if(!match)descResults.splice(res,1);}
}
exacts.sort(sortId);exacts=noDups(exacts);results.sort(sortId);results=noDups(results);results.length=Math.min(results.length,maxResults);descResults.sort(sortId);descResults=noDups(descResults);results=exacts.sort(sortWeight).concat(results.sort(sortWeight),descResults.sort(sortDescWeight));results.length=Math.min(results.length,maxResults);}
if(cb)cb(results);else return results;}
;}
;return _exports;}
{if(typeof define===c6H&&define.amd){define(["stxTimeZoneData","stxThirdParty","stx"],function(_stxTimeZoneData,_stxThirdParty,_stx){return _stxKernel_js(_stxThirdParty,_stx);}
);}
else{var N=function(X){_stxThirdParty=X.STXThirdParty;}
;var _stxThirdParty={}
;if(typeof (window.STXThirdParty)!=(m0H+y9V+v6V+g7H))N(window);var _stx={"STX":window.STX,"STXChart":window.STXChart,"$$":window.$$,"$$$":window.$$$}
;_stxKernel_js(_stxThirdParty,_stx);}
}
}
)();