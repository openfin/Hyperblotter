/* File generated Wed Apr 15 2015 16:07:33 GMT-0400 (EDT) */
/* Expires on 2015/06/01 */
/*
Copyright 2014 ChartIQ LLC
*/

(function(){
	var trialExpiration =  "2015/06/01";
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
	var version=["Version 2015-01-20 - early"];
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
var b6S={'X6F':function(p6F,M6F){return p6F==M6F;}
,'S9Z':function(z9Z,q9Z){return z9Z!=q9Z;}
,'v5q':function(d5q,J5q){return d5q!=J5q;}
,'z8g':function(q8g,n8g){return q8g*n8g;}
,'x7t':function(B7t,L7t){return B7t!=L7t;}
,'i1Z':function(m1Z,T1Z){return m1Z<=T1Z;}
,'s5K':function(E5K,W5K){return E5K<W5K;}
,'f1p':function(R1p,C1p){return R1p-C1p;}
,'l3x':function(c3x,j3x){return c3x==j3x;}
,'b5j':function(l5j,c5j){return l5j>=c5j;}
,'p3g':function(M3g,e3g){return M3g>e3g;}
,'x1g':function(B1g,L1g){return B1g/L1g;}
,'j4t':function(k4t,t4t){return k4t>t4t;}
,'i1G':function(m1G,T1G){return m1G==T1G;}
,'y4F':function(O4F,x4F){return O4F-x4F;}
,'o5F':function(i5F,m5F){return i5F<m5F;}
,'A4t':function(X4t,p4t){return X4t==p4t;}
,'K6g':function(D6g,G6g){return D6g<=G6g;}
,'H9Z':function(P9Z,g9Z){return P9Z-g9Z;}
,'Q4d':function(K4d,D4d){return K4d-D4d;}
,'N8K':function(S6K,z6K){return S6K>z6K;}
,'I7Z':function(o7Z,i7Z){return o7Z<i7Z;}
,'a9M':"a",'r7p':function(u7p,Q7p){return u7p-Q7p;}
,'E9Z':function(W9Z,v9Z){return W9Z==v9Z;}
,'k1B':function(t1B,s1B){return t1B==s1B;}
,'R1B':function(C1B,a1B){return C1B==a1B;}
,'Z5V':function(w5V,b5V){return w5V>=b5V;}
,'E3d':function(W3d,v3d){return W3d-v3d;}
,'g9t':function(Z9t,w9t){return Z9t>w9t;}
,'k8d':function(t8d,s8d){return t8d!=s8d;}
,'s5j':function(E5j,W5j){return E5j!=W5j;}
,'X9L':function(p9L,M9L){return p9L*M9L;}
,'X7B':function(p7B,M7B){return p7B==M7B;}
,'Y0':function(V0,H0){return V0==H0;}
,'K9j':function(D9j,G9j){return D9j<G9j;}
,'f3Z':function(R3Z,C3Z){return R3Z==C3Z;}
,'p1g':function(M1g,e1g){return M1g/e1g;}
,'E3L':function(W3L,v3L){return W3L>v3L;}
,'B2':function(L2,F2){return L2==F2;}
,'T2G':function(U2G,y2G){return U2G-y2G;}
,'e29':function(f29,R29){return f29<R29;}
,'i5Z':function(m5Z,T5Z){return m5Z==T5Z;}
,'D0V':function(G0V,A0V){return G0V>A0V;}
,'S3d':function(z3d,q3d){return z3d*q3d;}
,'G1j':2,'i89':function(m89,T89){return m89==T89;}
,'S0j':function(z0j,q0j){return z0j==q0j;}
,'z9d':function(q9d,n9d){return q9d in n9d;}
,'y9K':function(O9K,x9K){return O9K<x9K;}
,'p5G':function(M5G,e5G){return M5G<e5G;}
,'g9j':function(Z9j,w9j){return Z9j-w9j;}
,'z3B':function(q3B,n3B,Y3B){return q3B-n3B+Y3B;}
,'Z8p':function(w8p,b8p){return w8p==b8p;}
,'u4H':function(Q4H,K4H){return Q4H<K4H;}
,'g2H':function(Z2H,w2H){return Z2H!=w2H;}
,'U19':function(y19,O19){return y19/O19;}
,'U4q':function(y4q,O4q){return y4q>O4q;}
,'X7K':function(p7K,M7K){return p7K==M7K;}
,'j2x':function(k2x,t2x){return k2x<t2x;}
,'V2p':function(H2p,P2p){return H2p/P2p;}
,'K5K':function(D5K,G5K){return D5K==G5K;}
,'w4G':function(b4G,l4G){return b4G<l4G;}
,'h4F':function(N4F,S7F){return N4F>S7F;}
,'Q2B':function(K2B,D2B){return K2B>D2B;}
,'G7t':function(A7t,X7t){return A7t>=X7t;}
,'Z6B':function(w6B,b6B){return w6B*b6B;}
,'N9g':function(S2g,z2g){return S2g*z2g;}
,'V2H':function(H2H,P2H){return H2H!=P2H;}
,'r7H':function(u7H,Q7H){return u7H!=Q7H;}
,'r2L':function(u2L,Q2L){return u2L==Q2L;}
,'I7p':function(o7p,i7p){return o7p==i7p;}
,'Y2B':function(V2B,H2B){return V2B<H2B;}
,'Y2V':function(V2V,H2V){return V2V/H2V;}
,'M7x':function(e7x,f7x){return e7x>f7x;}
,'s2x':function(E2x,W2x){return E2x>W2x;}
,'V6':function(H6,P6){return H6>P6;}
,'P4K':function(g4K,Z4K){return g4K==Z4K;}
,'h6p':function(N6p,S3p){return N6p*S3p;}
,'k4H':function(t4H,s4H){return t4H-s4H;}
,'U6x':function(y6x,O6x){return y6x-O6x;}
,'P3V':function(g3V,Z3V){return g3V!=Z3V;}
,'j1t':function(k1t,t1t){return k1t/t1t;}
,'e8d':function(f8d,R8d){return f8d<R8d;}
,'s0V':function(E0V,W0V){return E0V<W0V;}
,'w3Z':function(b3Z,l3Z){return b3Z>l3Z;}
,'K6q':function(D6q,G6q){return D6q>G6q;}
,'W1p':function(v1p,d1p){return v1p/d1p;}
,'a0H':function(h0H,N0H){return h0H!=N0H;}
,'W3Z':function(v3Z,d3Z){return v3Z*d3Z;}
,'v1F':function(d1F,J1F){return d1F<J1F;}
,'b6g':function(l6g,c6g){return l6g-c6g;}
,'P0L':function(g0L,Z0L){return g0L/Z0L;}
,'A7p':function(X7p,p7p){return X7p==p7p;}
,'c8t':function(j8t,k8t){return j8t!=k8t;}
,'j1':function(k1,s1){return k1*s1;}
,'J5L':function(I5L,o5L){return I5L<o5L;}
,'D79':function(G79,A79){return G79==A79;}
,'k3G':function(t3G,s3G){return t3G==s3G;}
,'C8g':function(a8g,h8g){return a8g-h8g;}
,'u3x':function(Q3x,K3x){return Q3x==K3x;}
,'F5H':function(r5H,u5H){return r5H<u5H;}
,'t0L':function(s0L,E0L){return s0L<E0L;}
,'V3K':function(H3K,P3K){return H3K-P3K;}
,'d6F':function(J6F,I6F){return J6F<I6F;}
,'p5p':function(M5p,e5p){return M5p!=e5p;}
,'a1':function(h1,N1){return h1!=N1;}
,'W3V':function(v3V,d3V){return v3V<d3V;}
,'c6x':function(j6x,k6x){return j6x*k6x;}
,'M3F':function(e3F,f3F){return e3F==f3F;}
,'l3d':function(c3d,j3d){return c3d<j3d;}
,'t3':function(s3,E3){return s3<E3;}
,'B3t':function(L3t,F3t){return L3t>=F3t;}
,'w6L':function(b6L,l6L){return b6L!=l6L;}
,'F6d':function(r6d,u6d){return r6d<u6d;}
,'v7L':function(d7L,J7L){return d7L!=J7L;}
,'n6G':function(Y6G,V6G){return Y6G==V6G;}
,'d29':function(J29,I29){return J29/I29;}
,'h6B':function(N6B,S3B){return N6B-S3B;}
,'x9F':function(B9F,L9F){return B9F==L9F;}
,'g6d':function(Z6d,w6d,b6d){return Z6d*w6d*b6d;}
,'f6x':function(R6x,C6x){return R6x!=C6x;}
,'g5K':function(Z5K,w5K){return Z5K==w5K;}
,'v0V':function(d0V,J0V){return d0V-J0V;}
,'V7L':function(H7L,P7L){return H7L==P7L;}
,'V5q':function(H5q,P5q){return H5q>=P5q;}
,'Q6d':function(K6d,D6d){return K6d!=D6d;}
,'D4L':function(G4L,A4L){return G4L<=A4L;}
,'D2K':function(G2K,A2K){return G2K<=A2K;}
,'u5B':function(Q5B,K5B){return Q5B/K5B;}
,'E0t':function(W0t,v0t){return W0t>=v0t;}
,'v4F':function(d4F,J4F){return d4F==J4F;}
,'H8Z':function(P8Z,g8Z){return P8Z>g8Z;}
,'L4H':function(F4H,r4H){return F4H-r4H;}
,'y9H':function(O9H,x9H){return O9H-x9H;}
,'U6L':function(y6L,O6L){return y6L==O6L;}
,'o7G':function(i7G,m7G){return i7G==m7G;}
,'t1q':function(s1q,E1q){return s1q<E1q;}
,'V0d':function(H0d,P0d){return H0d-P0d;}
,'s8V':function(E8V,W8V){return E8V==W8V;}
,'k0j':function(t0j,s0j){return t0j/s0j;}
,'N2F':function(S5F,z5F){return S5F==z5F;}
,'P8G':function(g8G,Z8G){return g8G>Z8G;}
,'y8L':function(O8L,x8L){return O8L-x8L;}
,'f8B':function(R8B,C8B){return R8B*C8B;}
,'K3F':function(D3F,G3F){return D3F==G3F;}
,'k8K':function(t8K,s8K){return t8K<s8K;}
,'J8H':function(I8H,o8H){return I8H*o8H;}
,'J0p':function(I0p,o0p){return I0p==o0p;}
,'U9G':function(y9G,O9G){return y9G-O9G;}
,'K2Z':function(D2Z,G2Z){return D2Z<G2Z;}
,'O6d':function(x6d,B6d,L6d){return x6d*B6d/L6d;}
,'V0V':function(H0V,P0V){return H0V*P0V;}
,'b7':function(l7,c7){return l7/c7;}
,'K0q':function(D0q,G0q){return D0q/G0q;}
,'e3H':function(f3H,R3H){return f3H!=R3H;}
,'t4G':function(s4G,E4G,W4G){return s4G*E4G/W4G;}
,'a4q':function(h4q,N4q){return h4q|N4q;}
,'X3G':function(p3G,M3G){return p3G-M3G;}
,'V3t':function(H3t,P3t){return H3t-P3t;}
,'O9Z':function(x9Z,B9Z){return x9Z==B9Z;}
,'N9Z':function(S2Z,z2Z){return S2Z-z2Z;}
,'g0d':function(Z0d,w0d){return Z0d<w0d;}
,'s2F':function(E2F,W2F){return E2F<W2F;}
,'w2t':function(b2t,l2t){return b2t==l2t;}
,'S0g':function(z0g,q0g){return z0g>q0g;}
,'F8H':function(r8H,u8H){return r8H-u8H;}
,'J6H':function(I6H,o6H){return I6H*o6H;}
,'p6H':function(M6H,e6H){return M6H==e6H;}
,'R0Z':function(C0Z,a0Z){return C0Z<a0Z;}
,'f3g':function(R3g,C3g){return R3g<C3g;}
,'s1F':function(E1F,W1F){return E1F<W1F;}
,'N1L':function(S8L,z8L){return S8L>z8L;}
,'X4p':function(p4p,M4p){return p4p!=M4p;}
,'T0g':function(U0g,y0g){return U0g>y0g;}
,'g8L':function(Z8L,w8L){return Z8L>w8L;}
,'J6x':function(I6x,o6x){return I6x!=o6x;}
,'K0d':function(D0d,G0d){return D0d>G0d;}
,'Z2q':function(w2q,b2q){return w2q*b2q;}
,'Z4Z':function(w4Z,b4Z){return w4Z>=b4Z;}
,'M59':function(e59,f59){return e59/f59;}
,'e7V':function(f7V,R7V){return f7V!=R7V;}
,'g5d':function(Z5d,w5d){return Z5d<w5d;}
,'T5V':function(U5V,y5V){return U5V-y5V;}
,'v4':function(d4,J4,I4){return d4*J4/I4;}
,'Q5x':function(K5x,D5x){return K5x<D5x;}
,'x89':function(B89,L89){return B89/L89;}
,'W9G':function(v9G,d9G){return v9G<d9G;}
,'A2F':function(X2F,p2F){return X2F*p2F;}
,'g3F':function(Z3F,w3F){return Z3F==w3F;}
,'j8x':function(k8x,t8x){return k8x*t8x;}
,'W1Z':function(v1Z,d1Z){return v1Z>d1Z;}
,'S3H':function(z3H,q3H){return z3H==q3H;}
,'K5q':function(D5q,G5q){return D5q>=G5q;}
,'m9':function(T9,U9){return T9!=U9;}
,'a5x':function(h5x,N5x){return h5x>N5x;}
,'j5K':function(k5K,t5K){return k5K/t5K;}
,'n7d':function(Y7d,V7d){return Y7d>V7d;}
,'L9g':function(F9g,r9g){return F9g==r9g;}
,'Q6x':function(K6x,D6x){return K6x!=D6x;}
,'C4x':function(a4x,h4x){return a4x>h4x;}
,'v7x':function(d7x,J7x){return d7x!=J7x;}
,'G1H':function(A1H,X1H){return A1H/X1H;}
,'C0V':function(a0V,h0V){return a0V/h0V;}
,'z4G':function(q4G,n4G){return q4G-n4G;}
,'A0K':function(X0K,p0K){return X0K>p0K;}
,'n8':function(Y8,V8){return Y8==V8;}
,'g7p':function(Z7p,w7p){return Z7p==w7p;}
,'T5t':function(U5t,y5t){return U5t==y5t;}
,'D4Z':function(G4Z,A4Z){return G4Z==A4Z;}
,'h1q':function(N1q,S8q){return N1q<S8q;}
,'G2V':function(A2V,X2V){return A2V<X2V;}
,'c6L':function(j6L,k6L){return j6L!=k6L;}
,'r9t':function(u9t,Q9t){return u9t==Q9t;}
,'l9p':function(c9p,j9p){return c9p!=j9p;}
,'f9G':function(R9G,C9G){return R9G*C9G;}
,'t5L':function(s5L,E5L){return s5L>E5L;}
,'V39':function(H39,P39){return H39==P39;}
,'D1j':3,'V0B':function(H0B,P0B){return H0B==P0B;}
,'R0K':function(C0K,a0K){return C0K==a0K;}
,'S6B':function(z6B,q6B){return z6B/q6B;}
,'O8':function(x8,B8){return x8*B8;}
,'i8F':function(m8F,T8F){return m8F<T8F;}
,'m6':function(T6,U6){return T6==U6;}
,'M9B':function(e9B,f9B){return e9B==f9B;}
,'C0G':function(a0G,h0G,N0G){return a0G-h0G-N0G;}
,'B2p':function(L2p,F2p){return L2p-F2p;}
,'X3x':function(p3x,M3x){return p3x-M3x;}
,'W9d':function(v9d,d9d){return v9d==d9d;}
,'N9p':function(S2p,z2p){return S2p*z2p;}
,'o5':function(i5,m5){return i5==m5;}
,'U2V':function(y2V,O2V){return y2V==O2V;}
,'W8B':function(v8B,d8B){return v8B==d8B;}
,'A7H':function(X7H,p7H){return X7H/p7H;}
,'I6Z':function(o6Z,i6Z){return o6Z<=i6Z;}
,'w4d':function(b4d,l4d){return b4d!=l4d;}
,'S2d':function(z2d,q2d){return z2d>q2d;}
,'M0K':function(e0K,f0K){return e0K-f0K;}
,'L9L':function(F9L,r9L){return F9L==r9L;}
,'O8Z':function(x8Z,B8Z){return x8Z>=B8Z;}
,'n1x':function(Y1x,V1x){return Y1x==V1x;}
,'K2F':function(D2F,G2F){return D2F/G2F;}
,'n3H':function(Y3H,V3H){return Y3H==V3H;}
,'g3p':function(Z3p,w3p){return Z3p<w3p;}
,'r2F':function(u2F,Q2F){return u2F/Q2F;}
,'C3G':function(a3G,h3G){return a3G>h3G;}
,'Q3p':function(K3p,D3p){return K3p!=D3p;}
,'b7L':function(l7L,c7L){return l7L!=c7L;}
,'X1V':function(p1V,M1V){return p1V/M1V;}
,'V2x':function(H2x,P2x){return H2x==P2x;}
,'M3t':function(e3t,f3t){return e3t-f3t;}
,'b7x':function(l7x,c7x){return l7x-c7x;}
,'i0B':function(m0B,T0B){return m0B>T0B;}
,'N8d':function(S6d,z6d){return S6d==z6d;}
,'X3L':function(p3L,M3L){return p3L<M3L;}
,'R8q':function(C8q,a8q){return C8q*a8q;}
,'H7d':function(P7d,g7d){return P7d-g7d;}
,'O1L':function(x1L,B1L){return x1L>=B1L;}
,'b7G':function(l7G,c7G,j7G){return l7G-c7G+j7G;}
,'T0t':function(U0t,y0t){return U0t==y0t;}
,'V5G':function(H5G,P5G){return H5G>P5G;}
,'L29':function(F29,r29){return F29<r29;}
,'U5L':function(y5L,O5L){return y5L>O5L;}
,'z9q':function(q9q,n9q){return q9q<n9q;}
,'f0p':function(R0p,C0p){return R0p-C0p;}
,'d7G':function(J7G,I7G){return J7G==I7G;}
,'Q9d':function(K9d,D9d){return K9d==D9d;}
,'N4Z':function(S7Z,z7Z){return S7Z<z7Z;}
,'z6L':function(q6L,n6L){return q6L-n6L;}
,'t9d':function(s9d,E9d){return s9d<E9d;}
,'C7q':function(a7q,h7q){return a7q<h7q;}
,'C8p':function(a8p,h8p){return a8p/h8p;}
,'c0p':function(j0p,k0p){return j0p==k0p;}
,'R7L':function(C7L,a7L){return C7L/a7L;}
,'r2':function(u2,Q2){return u2-Q2;}
,'Z9V':function(w9V,b9V,l9V){return w9V-b9V+l9V;}
,'R5d':function(C5d,a5d){return C5d==a5d;}
,'I8x':function(o8x,i8x){return o8x<i8x;}
,'J5p':function(I5p,o5p){return I5p>o5p;}
,'K4j':function(D4j,G4j){return D4j==G4j;}
,'L0F':function(F0F,r0F){return F0F==r0F;}
,'I59':function(o59,i59){return o59<i59;}
,'I6K':function(o6K,i6K){return o6K-i6K;}
,'i5L':function(m5L,T5L){return m5L>T5L;}
,'N5g':function(S4g,z4g){return S4g<z4g;}
,'u2j':function(Q2j,K2j){return Q2j%K2j;}
,'B9K':function(L9K,F9K){return L9K-F9K;}
,'r0K':function(u0K,Q0K){return u0K<=Q0K;}
,'M7':function(e7,f7){return e7<=f7;}
,'O5g':function(x5g,B5g){return x5g==B5g;}
,'s7Z':function(E7Z,W7Z){return E7Z-W7Z;}
,'n5B':function(Y5B,V5B){return Y5B<=V5B;}
,'z4q':function(q4q,n4q){return q4q*n4q;}
,'E4x':function(W4x,v4x){return W4x>v4x;}
,'D5V':function(G5V,A5V){return G5V-A5V;}
,'G0x':function(A0x,X0x){return A0x>X0x;}
,'o4Z':function(i4Z,m4Z){return i4Z/m4Z;}
,'F5L':function(r5L,u5L){return r5L<u5L;}
,'Q0x':function(K0x,D0x){return K0x<D0x;}
,'d2K':function(J2K,I2K){return J2K>I2K;}
,'m7B':function(T7B,U7B,y7B,O7B,x7B){return T7B/U7B/y7B/O7B/x7B;}
,'Z1L':function(w1L,b1L){return w1L==b1L;}
,'L1L':function(F1L,r1L){return F1L<=r1L;}
,'Y9d':function(V9d,H9d){return V9d>H9d;}
,'b6V':function(l6V,c6V){return l6V==c6V;}
,'l0F':function(c0F,j0F){return c0F-j0F;}
,'s5':function(E5,W5,v5){return E5*W5/v5;}
,'P6H':function(g6H,Z6H){return g6H/Z6H;}
,'N7V':function(S0V,z0V){return S0V!=z0V;}
,'S5B':function(z5B,q5B){return z5B>=q5B;}
,'o3x':function(i3x,m3x){return i3x==m3x;}
,'R6p':function(C6p,a6p){return C6p*a6p;}
,'x2V':function(B2V,L2V){return B2V<L2V;}
,'U8F':function(y8F,O8F){return y8F<O8F;}
,'S1G':function(z1G,q1G){return z1G-q1G;}
,'r7L':function(u7L,Q7L){return u7L===Q7L;}
,'L3x':function(F3x,r3x){return F3x==r3x;}
,'I1F':function(o1F,i1F){return o1F<i1F;}
,'U0':function(O0,B0){return O0!=B0;}
,'P6x':function(g6x,Z6x){return g6x>Z6x;}
,'D5F':function(G5F,A5F){return G5F>=A5F;}
,'j2':function(k2,t2){return k2-t2;}
,'o4x':function(i4x,m4x){return i4x*m4x;}
,'O9L':function(x9L,B9L){return x9L==B9L;}
,'Y49':function(V49,H49){return V49>=H49;}
,'A09':function(X09,p09){return X09*p09;}
,'S3L':function(z3L,q3L){return z3L<q3L;}
,'g9K':function(Z9K,w9K){return Z9K/w9K;}
,'g0V':function(Z0V,w0V){return Z0V-w0V;}
,'B5j':function(L5j,F5j){return L5j==F5j;}
,'N6K':function(S3K,z3K){return S3K<z3K;}
,'H3d':function(P3d,g3d){return P3d/g3d;}
,'T9L':function(U9L,y9L){return U9L>y9L;}
,'Z6G':function(w6G,b6G){return w6G<b6G;}
,'n1G':function(Y1G,V1G){return Y1G-V1G;}
,'U7F':function(y7F,O7F){return y7F<=O7F;}
,'h09':function(N09,S19){return N09==S19;}
,'l9L':function(c9L,j9L){return c9L-j9L;}
,'Q4K':function(K4K,D4K){return K4K-D4K;}
,'P4G':function(g4G,Z4G){return g4G*Z4G;}
,'V8V':function(H8V,P8V){return H8V>P8V;}
,'o3d':function(i3d,m3d){return i3d-m3d;}
,'I2H':function(o2H,i2H){return o2H>=i2H;}
,'s2Z':function(E2Z,W2Z){return E2Z==W2Z;}
,'G7F':function(A7F,X7F){return A7F==X7F;}
,'H6F':function(P6F,g6F){return P6F-g6F;}
,'j0q':function(k0q,t0q){return k0q==t0q;}
,'b5K':function(l5K,c5K){return l5K<c5K;}
,'v0Z':function(d0Z,J0Z){return d0Z>=J0Z;}
,'K6B':function(D6B,G6B){return D6B==G6B;}
,'h4V':function(N4V,S7V){return N4V-S7V;}
,'z7g':function(q7g,n7g){return q7g>=n7g;}
,'V1t':function(H1t,P1t){return H1t instanceof P1t;}
,'S79':function(z79,q79){return z79<=q79;}
,'p3V':function(M3V,e3V){return M3V==e3V;}
,'L3L':function(F3L,r3L){return F3L==r3L;}
,'C5j':function(a5j,h5j){return a5j==h5j;}
,'o0F':function(i0F,m0F){return i0F>m0F;}
,'r5q':function(u5q,Q5q){return u5q<Q5q;}
,'J2t':function(I2t,o2t){return I2t*o2t;}
,'G3V':function(A3V,X3V){return A3V>X3V;}
,'I6p':function(o6p,i6p){return o6p-i6p;}
,'k8Z':function(t8Z,s8Z){return t8Z-s8Z;}
,'H6t':function(P6t,g6t){return P6t-g6t;}
,'Q8F':function(K8F,D8F){return K8F==D8F;}
,'i5x':function(m5x,T5x){return m5x<T5x;}
,'D6t':function(G6t,A6t){return G6t*A6t;}
,'X9p':function(p9p,M9p){return p9p<=M9p;}
,'S4H':function(z4H,q4H){return z4H<q4H;}
,'o0G':function(i0G,m0G){return i0G<m0G;}
,'E3H':function(W3H,v3H){return W3H==v3H;}
,'I9j':function(o9j,i9j){return o9j==i9j;}
,'v4t':function(d4t,J4t){return d4t<J4t;}
,'D9x':function(G9x,A9x){return G9x!=A9x;}
,'M4t':function(e4t,f4t){return e4t==f4t;}
,'U0p':function(y0p,O0p){return y0p==O0p;}
,'a3g':function(h3g,N3g){return h3g-N3g;}
,'I9t':function(o9t,i9t){return o9t*i9t;}
,'R1q':function(C1q,a1q){return C1q!=a1q;}
,'e4G':function(f4G,R4G){return f4G<R4G;}
,'R2Z':function(C2Z,a2Z){return C2Z*a2Z;}
,'q7G':function(n7G,Y7G){return n7G-Y7G;}
,'v5j':function(d5j,J5j){return d5j<J5j;}
,'x9q':function(B9q,L9q){return B9q in L9q;}
,'s7p':function(E7p,W7p){return E7p>=W7p;}
,'x6x':function(B6x,L6x){return B6x/L6x;}
,'C3L':function(a3L,h3L){return a3L*h3L;}
,'d5t':function(J5t,I5t){return J5t==I5t;}
,'E3x':function(W3x,v3x){return W3x==v3x;}
,'z6H':function(q6H,n6H){return q6H==n6H;}
,'b2Z':function(l2Z,c2Z){return l2Z==c2Z;}
,'R3F':function(C3F,a3F){return C3F-a3F;}
,'A39':function(X39,p39){return X39>p39;}
,'Y7g':function(V7g,H7g){return V7g<=H7g;}
,'v6K':function(d6K,J6K){return d6K-J6K;}
,'R9B':function(C9B,a9B){return C9B-a9B;}
,'q4':function(n4,Y4){return n4<Y4;}
,'z19':function(q19,n19){return q19==n19;}
,'Y3q':function(V3q,H3q){return V3q<H3q;}
,'a6H':function(h6H,N6H){return h6H<N6H;}
,'G7j':function(A7j,X7j){return A7j-X7j;}
,'K1F':function(D1F,G1F){return D1F/G1F;}
,'Y8F':function(V8F,H8F){return V8F==H8F;}
,'d9V':function(J9V,I9V,o9V){return J9V*I9V/o9V;}
,'W99':function(v99,d99){return v99==d99;}
,'v9j':function(d9j,J9j){return d9j!=J9j;}
,'E4L':function(W4L,v4L){return W4L/v4L;}
,'w9q':function(b9q,l9q){return b9q!=l9q;}
,'k6t':function(t6t,s6t){return t6t>s6t;}
,'h5d':function(N5d,S4d){return N5d!=S4d;}
,'D3H':function(G3H,A3H){return G3H-A3H;}
,'C7K':function(a7K,h7K){return a7K==h7K;}
,'K0Z':function(D0Z,G0Z){return D0Z>=G0Z;}
,'F8t':function(r8t,u8t){return r8t!=u8t;}
,'u8Z':function(Q8Z,K8Z){return Q8Z*K8Z;}
,'t8t':function(s8t,E8t){return s8t!=E8t;}
,'H0t':function(P0t,g0t){return P0t>=g0t;}
,'n29':function(Y29,V29){return Y29==V29;}
,'R3B':function(C3B,a3B){return C3B<a3B;}
,'L0G':function(F0G,r0G){return F0G-r0G;}
,'f0L':function(R0L,C0L){return R0L>=C0L;}
,'f9q':function(R9q,C9q){return R9q/C9q;}
,'I6g':function(o6g,i6g){return o6g-i6g;}
,'M2x':function(e2x,f2x){return e2x>=f2x;}
,'j2L':function(k2L,t2L){return k2L<t2L;}
,'S2F':function(z2F,q2F){return z2F-q2F;}
,'T9x':function(U9x,y9x){return U9x<=y9x;}
,'c8F':function(j8F,k8F){return j8F-k8F;}
,'q39':function(n39,Y39){return n39/Y39;}
,'N7K':function(S0K,z0K){return S0K<z0K;}
,'J89':function(I89,o89){return I89-o89;}
,'K6Z':function(D6Z,G6Z){return D6Z<G6Z;}
,'K2':function(D2,G2){return D2!=G2;}
,'g2L':function(Z2L,w2L){return Z2L==w2L;}
,'B1B':function(L1B,F1B){return L1B==F1B;}
,'Y8G':function(V8G,H8G){return V8G>H8G;}
,'t7V':function(s7V,E7V){return s7V==E7V;}
,'G4q':function(A4q,X4q){return A4q|X4q;}
,'q7':function(n7,Y7){return n7==Y7;}
,'g59':function(Z59,w59){return Z59==w59;}
,'b59':function(l59,c59){return l59/c59;}
,'V4t':function(H4t,P4t){return H4t<P4t;}
,'X3H':function(p3H,M3H){return p3H/M3H;}
,'J8F':function(I8F,o8F){return I8F-o8F;}
,'q5j':function(n5j,Y5j){return n5j-Y5j;}
,'i4d':function(m4d,T4d){return m4d==T4d;}
,'e2q':function(f2q,R2q){return f2q!=R2q;}
,'e0F':function(f0F,R0F){return f0F==R0F;}
,'t8G':function(s8G,E8G){return s8G<E8G;}
,'Y1K':function(V1K,H1K){return V1K==H1K;}
,'y2F':function(O2F,x2F){return O2F-x2F;}
,'l7K':function(c7K,j7K){return c7K<j7K;}
,'k7q':function(t7q,s7q){return t7q>s7q;}
,'F1H':function(r1H,u1H){return r1H*u1H;}
,'D4H':function(G4H,A4H){return G4H>=A4H;}
,'G2B':function(A2B,X2B){return A2B==X2B;}
,'F6H':function(r6H,u6H){return r6H<u6H;}
,'V5':function(H5,P5){return H5==P5;}
,'y8V':function(O8V,x8V){return O8V-x8V;}
,'I2L':function(o2L,i2L){return o2L*i2L;}
,'i6G':function(m6G,T6G){return m6G>=T6G;}
,'v2':function(J2,I2){return J2==I2;}
,'k7d':function(t7d,s7d){return t7d==s7d;}
,'m7L':function(T7L,U7L){return T7L==U7L;}
,'S8K':function(z8K,q8K){return z8K<q8K;}
,'Q8B':function(K8B,D8B){return K8B==D8B;}
,'M1F':function(e1F,f1F){return e1F<f1F;}
,'I2Z':function(o2Z,i2Z){return o2Z-i2Z;}
,'j5':function(k5,t5){return k5==t5;}
,'u0G':function(Q0G,K0G){return Q0G-K0G;}
,'w6H':function(b6H,l6H){return b6H<=l6H;}
,'f1H':function(R1H,C1H){return R1H/C1H;}
,'i5G':function(m5G,T5G){return m5G<=T5G;}
,'K3t':function(D3t,G3t){return D3t-G3t;}
,'O5V':function(x5V,B5V){return x5V<B5V;}
,'m8x':function(T8x,U8x){return T8x>U8x;}
,'y1F':function(O1F,x1F){return O1F<x1F;}
,'I3t':function(o3t,i3t){return o3t-i3t;}
,'d2j':function(J2j,I2j){return J2j-I2j;}
,'Z2G':function(w2G,b2G){return w2G*b2G;}
,'f5Z':function(R5Z,C5Z){return R5Z*C5Z;}
,'f1g':function(R1g,C1g){return R1g<C1g;}
,'z9F':function(q9F,n9F){return q9F<n9F;}
,'o8d':function(i8d,m8d){return i8d>=m8d;}
,'g2p':function(Z2p,w2p){return Z2p*w2p;}
,'h39':function(N39,S9d){return N39-S9d;}
,'e9g':function(f9g,R9g){return f9g-R9g;}
,'N0V':function(S1V,z1V){return S1V<z1V;}
,'X4L':function(p4L,M4L){return p4L<=M4L;}
,'b1':function(l1,c1){return l1-c1;}
,'S7K':function(z7K,q7K){return z7K<q7K;}
,'A0d':function(X0d,p0d){return X0d-p0d;}
,'i8G':function(m8G,T8G){return m8G==T8G;}
,'n3L':function(Y3L,V3L){return Y3L<V3L;}
,'Q3g':function(K3g,D3g){return K3g>D3g;}
,'Q19':function(K19,D19){return K19<D19;}
,'N3G':function(S9V,z9V){return S9V<=z9V;}
,'N8p':function(S6p,z6p){return S6p<=z6p;}
,'K3q':function(D3q,G3q){return D3q<G3q;}
,'E3G':function(W3G,v3G){return W3G*v3G;}
,'r1B':function(u1B,Q1B){return u1B==Q1B;}
,'M6q':function(e6q,f6q){return e6q==f6q;}
,'u2G':function(Q2G,K2G){return Q2G<K2G;}
,'b2g':function(l2g,c2g){return l2g<=c2g;}
,'h8x':function(N8x,S6x){return N8x>S6x;}
,'m4t':function(T4t,U4t){return T4t*U4t;}
,'Y1d':function(V1d,H1d){return V1d==H1d;}
,'b4':function(l4,c4){return l4>c4;}
,'S6F':function(z6F,q6F){return z6F-q6F;}
,'B4t':function(L4t,F4t){return L4t*F4t;}
,'L6F':function(F6F,r6F){return F6F>r6F;}
,'m4V':function(T4V,U4V){return T4V==U4V;}
,'M2F':function(e2F,f2F){return e2F/f2F;}
,'n4x':function(Y4x,V4x){return Y4x-V4x;}
,'E6B':function(W6B,v6B){return W6B==v6B;}
,'H2K':function(P2K,g2K){return P2K<g2K;}
,'f6G':function(R6G,C6G){return R6G-C6G;}
,'v2p':function(d2p,J2p){return d2p<J2p;}
,'O2G':function(x2G,B2G){return x2G-B2G;}
,'G89':function(A89,X89){return A89==X89;}
,'c1G':function(j1G,k1G,t1G){return j1G*k1G/t1G;}
,'E7G':function(W7G,v7G){return W7G/v7G;}
,'i4K':function(m4K,T4K){return m4K==T4K;}
,'k5V':function(t5V,s5V){return t5V/s5V;}
,'e1':function(R1,C1){return R1!=C1;}
,'f2B':function(R2B,C2B){return R2B!=C2B;}
,'j7L':function(k7L,t7L){return k7L==t7L;}
,'K7M':"t",'s7L':function(E7L,W7L){return E7L/W7L;}
,'k2q':function(t2q,s2q){return t2q<s2q;}
,'c7V':function(j7V,k7V){return j7V!=k7V;}
,'X3d':function(p3d,M3d){return p3d-M3d;}
,'Y6x':function(V6x,H6x){return V6x<H6x;}
,'V9V':function(H9V,P9V,g9V){return H9V-P9V+g9V;}
,'i3V':function(m3V,T3V){return m3V<=T3V;}
,'G1g':function(A1g,X1g){return A1g/X1g;}
,'v4V':function(d4V,J4V){return d4V/J4V;}
,'b9':function(l9,c9){return l9<c9;}
,'C9x':function(a9x,h9x){return a9x<=h9x;}
,'H4x':function(P4x,g4x){return P4x<=g4x;}
,'B9j':function(L9j,F9j){return L9j<=F9j;}
,'n2d':function(Y2d,V2d){return Y2d<=V2d;}
,'l8K':function(c8K,j8K){return c8K>j8K;}
,'b5':function(l5,c5){return l5==c5;}
,'F3g':function(r3g,u3g){return r3g-u3g;}
,'c3Z':function(j3Z,k3Z){return j3Z>=k3Z;}
,'r1':function(u1,Q1){return u1!=Q1;}
,'W3':function(v3,d3){return v3==d3;}
,'A6p':function(X6p,p6p){return X6p%p6p;}
,'t5p':function(s5p,E5p){return s5p/E5p;}
,'P8g':function(g8g,Z8g){return g8g<Z8g;}
,'H6G':function(P6G,g6G){return P6G==g6G;}
,'v9K':function(d9K,J9K){return d9K<J9K;}
,'G0p':function(A0p,X0p){return A0p-X0p;}
,'t6H':function(s6H,E6H){return s6H>E6H;}
,'v2Z':function(d2Z,J2Z){return d2Z-J2Z;}
,'Q5G':function(K5G,D5G){return K5G<D5G;}
,'W8g':function(v8g,d8g){return v8g/d8g;}
,'p5H':function(M5H,e5H){return M5H>e5H;}
,'X9x':function(p9x,M9x){return p9x-M9x;}
,'y9V':function(O9V,x9V){return O9V<x9V;}
,'h1B':function(N1B,S8B){return N1B-S8B;}
,'e7d':function(f7d,R7d){return f7d*R7d;}
,'D0g':function(G0g,A0g){return G0g==A0g;}
,'w1d':function(b1d,l1d){return b1d==l1d;}
,'H4L':function(P4L,g4L){return P4L*g4L;}
,'W2B':function(v2B,d2B){return v2B>=d2B;}
,'P8t':function(g8t,Z8t){return g8t!=Z8t;}
,'V5d':function(H5d,P5d){return H5d*P5d;}
,'L9p':function(F9p,r9p){return F9p<r9p;}
,'q5':function(n5,Y5){return n5>Y5;}
,'C4':function(a4,h4){return a4>h4;}
,'B6g':function(L6g,F6g){return L6g-F6g;}
,'P19':function(g19,Z19){return g19==Z19;}
,'S0G':function(z0G,q0G){return z0G-q0G;}
,'d3H':function(J3H,I3H){return J3H-I3H;}
,'E2G':function(W2G,v2G){return W2G<v2G;}
,'F9F':function(r9F,u9F){return r9F-u9F;}
,'f8G':function(R8G,C8G){return R8G==C8G;}
,'u1x':function(Q1x,K1x){return Q1x<=K1x;}
,'v0K':function(d0K,J0K){return d0K>J0K;}
,'Y9q':function(V9q,H9q){return V9q!=H9q;}
,'E1x':function(W1x,v1x){return W1x-v1x;}
,'Z6t':function(w6t,b6t){return w6t*b6t;}
,'l0t':function(c0t,j0t){return c0t>=j0t;}
,'w6x':function(b6x,l6x){return b6x<=l6x;}
,'c19':function(j19,k19){return j19<k19;}
,'a4d':function(h4d,N4d){return h4d-N4d;}
,'B5q':function(L5q,F5q){return L5q<F5q;}
,'O6t':function(x6t,B6t){return x6t==B6t;}
,'P2B':function(g2B,Z2B){return g2B<Z2B;}
,'S5t':function(z5t,q5t){return z5t==q5t;}
,'s59':function(E59,W59){return E59==W59;}
,'x5G':function(B5G,L5G){return B5G==L5G;}
,'o9Z':function(i9Z,m9Z){return i9Z==m9Z;}
,'M2g':function(e2g,f2g){return e2g==f2g;}
,'n1p':function(Y1p,V1p){return Y1p*V1p;}
,'q2p':function(n2p,Y2p){return n2p-Y2p;}
,'w9G':function(b9G,l9G){return b9G>l9G;}
,'U2B':function(y2B,O2B){return y2B<O2B;}
,'F49':function(r49,u49){return r49==u49;}
,'z3q':function(q3q,n3q){return q3q==n3q;}
,'e4H':function(f4H,R4H){return f4H<=R4H;}
,'r6':function(u6,Q6){return u6==Q6;}
,'t1d':function(s1d,E1d){return s1d==E1d;}
,'M2':function(e2,R2){return e2<R2;}
,'y7Z':function(O7Z,x7Z){return O7Z>x7Z;}
,'u3G':function(Q3G,K3G){return Q3G-K3G;}
,'v3q':function(d3q,J3q){return d3q/J3q;}
,'R2p':function(C2p,a2p){return C2p>a2p;}
,'N5B':function(S4B,z4B){return S4B-z4B;}
,'k69':function(t69,s69){return t69-s69;}
,'v6Z':function(d6Z,J6Z){return d6Z&J6Z;}
,'A2g':function(X2g,p2g){return X2g<p2g;}
,'i3g':function(m3g,T3g){return m3g*T3g;}
,'O3H':function(x3H,B3H){return x3H==B3H;}
,'C0F':function(a0F,h0F){return a0F==h0F;}
,'o1g':function(i1g,m1g,T1g){return i1g*m1g/T1g;}
,'I3K':function(o3K,i3K){return o3K-i3K;}
,'t9B':function(s9B,E9B,W9B){return s9B-E9B-W9B;}
,'V9H':function(H9H,P9H){return H9H==P9H;}
,'S8H':function(z8H,q8H){return z8H!=q8H;}
,'N2K':function(S5K,z5K){return S5K==z5K;}
,'o6t':function(i6t,m6t){return i6t==m6t;}
,'F0x':function(r0x,u0x){return r0x==u0x;}
,'U1p':function(y1p,O1p){return y1p/O1p;}
,'e0V':function(f0V,R0V){return f0V-R0V;}
,'e5B':function(f5B,R5B){return f5B*R5B;}
,'n8j':8,'D7q':function(G7q,A7q){return G7q<A7q;}
,'d79':function(J79,I79){return J79==I79;}
,'F4d':function(r4d,u4d){return r4d<u4d;}
,'w2V':function(b2V,l2V){return b2V==l2V;}
,'D3x':function(G3x,A3x){return G3x==A3x;}
,'J1Z':function(I1Z,o1Z){return I1Z>=o1Z;}
,'g1t':function(Z1t,w1t){return Z1t>w1t;}
,'T1':function(U1,O1){return U1<O1;}
,'O5B':function(x5B,B5B){return x5B-B5B;}
,'t4q':function(s4q,E4q){return s4q==E4q;}
,'Q9F':function(K9F,D9F){return K9F*D9F;}
,'F3V':function(r3V,u3V){return r3V<=u3V;}
,'X8V':function(p8V,M8V){return p8V<M8V;}
,'x5x':function(B5x,L5x){return B5x>L5x;}
,'X9Z':function(p9Z,M9Z){return p9Z==M9Z;}
,'p1K':function(M1K,e1K){return M1K==e1K;}
,'w7V':function(b7V,l7V){return b7V==l7V;}
,'R2x':function(C2x,a2x){return C2x&a2x;}
,'N4':function(S7,z7){return S7/z7;}
,'b2L':function(l2L,c2L){return l2L==c2L;}
,'r3t':function(u3t,Q3t){return u3t<Q3t;}
,'r0q':function(u0q,Q0q){return u0q-Q0q;}
,'T6d':function(U6d,y6d){return U6d==y6d;}
,'u7q':function(Q7q,K7q){return Q7q>K7q;}
,'T5F':function(U5F,y5F){return U5F>=y5F;}
,'a1Z':function(h1Z,N1Z){return h1Z!=N1Z;}
,'G0B':function(A0B,X0B){return A0B-X0B;}
,'V4j':function(H4j,P4j){return H4j-P4j;}
,'I2p':function(o2p,i2p){return o2p==i2p;}
,'e5':function(f5,R5){return f5-R5;}
,'u7d':function(Q7d,K7d){return Q7d*K7d;}
,'U1G':function(y1G,O1G){return y1G<O1G;}
,'J7t':function(I7t,o7t){return I7t==o7t;}
,'f3':function(R3,C3){return R3==C3;}
,'h6g':function(N6g,S3g){return N6g==S3g;}
,'u2d':function(Q2d,K2d){return Q2d-K2d;}
,'c5Z':function(j5Z,k5Z){return j5Z<k5Z;}
,'d3d':function(J3d,I3d){return J3d-I3d;}
,'r59':function(u59,Q59){return u59<Q59;}
,'s4B':function(E4B,W4B){return E4B-W4B;}
,'l5B':function(c5B,j5B){return c5B<j5B;}
,'F5x':function(r5x,u5x){return r5x*u5x;}
,'V2L':function(H2L,P2L){return H2L==P2L;}
,'v4j':function(d4j,J4j){return d4j>=J4j;}
,'p1d':function(M1d,e1d){return M1d/e1d;}
,'p7t':function(M7t,e7t){return M7t<e7t;}
,'q2x':function(n2x,Y2x){return n2x<=Y2x;}
,'h7H':function(N7H,S0H){return N7H==S0H;}
,'V5F':function(H5F,P5F){return H5F/P5F;}
,'U8H':function(y8H,O8H){return y8H/O8H;}
,'k8':function(t8,s8){return t8*s8;}
,'X8Z':function(p8Z,M8Z){return p8Z==M8Z;}
,'G7g':function(A7g,X7g){return A7g==X7g;}
,'O0G':function(x0G,B0G){return x0G-B0G;}
,'Z9p':function(w9p,b9p){return w9p<b9p;}
,'H4p':function(P4p,g4p){return P4p==g4p;}
,'K2H':function(D2H,G2H){return D2H<=G2H;}
,'A3K':function(X3K,p3K){return X3K==p3K;}
,'H6B':function(P6B,g6B){return P6B-g6B;}
,'x6G':function(B6G,L6G){return B6G-L6G;}
,'d1V':function(J1V,I1V){return J1V>I1V;}
,'a5p':function(h5p,N5p){return h5p<N5p;}
,'B8q':function(L8q,F8q){return L8q/F8q;}
,'g7L':function(Z7L,w7L){return Z7L/w7L;}
,'v0q':function(d0q,J0q){return d0q-J0q;}
,'O4Z':function(x4Z,B4Z){return x4Z<B4Z;}
,'H0g':function(P0g,g0g){return P0g>g0g;}
,'Q0L':function(K0L,D0L){return K0L/D0L;}
,'I3B':function(o3B,i3B){return o3B<i3B;}
,'d5F':function(J5F,I5F){return J5F*I5F;}
,'i0x':function(m0x,T0x){return m0x-T0x;}
,'z2':function(q2,n2){return q2<n2;}
,'M5d':function(e5d,f5d){return e5d-f5d;}
,'c99':function(j99,k99){return j99<k99;}
,'V4B':function(H4B,P4B){return H4B-P4B;}
,'y7L':function(O7L,x7L){return O7L/x7L;}
,'L5':function(F5,r5){return F5==r5;}
,'z6q':function(q6q,n6q){return q6q-n6q;}
,'W7t':function(v7t,d7t){return v7t<d7t;}
,'e8K':function(f8K,R8K){return f8K-R8K;}
,'o8p':function(i8p,m8p){return i8p==m8p;}
,'O8p':function(x8p,B8p){return x8p<B8p;}
,'p49':function(M49,e49){return M49<e49;}
,'P8q':function(g8q,Z8q){return g8q<Z8q;}
,'m4j':function(T4j,U4j){return T4j<U4j;}
,'Q3Z':function(K3Z,D3Z){return K3Z>=D3Z;}
,'C2j':function(a2j,h2j){return a2j<h2j;}
,'X2K':function(p2K,M2K){return p2K==M2K;}
,'B8L':function(L8L,F8L){return L8L-F8L;}
,'v9':function(d9,J9){return d9!=J9;}
,'O9g':function(x9g,B9g){return x9g*B9g;}
,'i1H':function(m1H,T1H){return m1H/T1H;}
,'B9t':function(L9t,F9t){return L9t==F9t;}
,'D4':function(G4,A4){return G4==A4;}
,'b4g':function(l4g,c4g){return l4g<c4g;}
,'e4x':function(f4x,R4x){return f4x<R4x;}
,'s2':function(E2,W2){return E2<W2;}
,'W1q':function(v1q,d1q){return v1q<d1q;}
,'z2V':function(q2V,n2V){return q2V*n2V;}
,'s9K':function(E9K,W9K){return E9K<W9K;}
,'A7L':function(X7L,p7L){return X7L==p7L;}
,'O3d':function(x3d,B3d){return x3d>=B3d;}
,'o4H':function(i4H,m4H){return i4H-m4H;}
,'S3G':function(z3G,q3G){return z3G-q3G;}
,'V3F':function(H3F,P3F){return H3F-P3F;}
,'e8Z':function(f8Z,R8Z){return f8Z-R8Z;}
,'L3G':function(F3G,r3G){return F3G<r3G;}
,'n1L':function(Y1L,V1L){return Y1L>=V1L;}
,'Q7t':function(K7t,D7t){return K7t>=D7t;}
,'m8L':function(T8L,U8L){return T8L<U8L;}
,'G9G':function(A9G,X9G){return A9G<X9G;}
,'a49':function(h49,N49){return h49>=N49;}
,'u4G':function(Q4G,K4G){return Q4G==K4G;}
,'R6':function(C6,a6){return C6-a6;}
,'N2':function(S5,z5){return S5==z5;}
,'f9d':function(R9d,C9d){return R9d>C9d;}
,'B9':function(L9,F9){return L9<F9;}
,'I0V':function(o0V,i0V){return o0V<i0V;}
,'p6x':function(M6x,e6x){return M6x<e6x;}
,'w8g':function(b8g,l8g){return b8g<l8g;}
,'C2':function(a2,h2){return a2==h2;}
,'U1K':function(y1K,O1K){return y1K==O1K;}
,'y39':function(O39,x39){return O39!=x39;}
,'e2K':function(f2K,R2K){return f2K>R2K;}
,'t0p':function(s0p,E0p){return s0p>=E0p;}
,'s9V':function(E9V,W9V,v9V){return E9V*W9V/v9V;}
,'C8':function(a8,h8){return a8-h8;}
,'D5':function(G5,A5){return G5<A5;}
,'l5V':function(c5V,j5V){return c5V-j5V;}
,'R09':function(C09,a09){return C09==a09;}
,'g7Z':function(Z7Z,w7Z){return Z7Z<=w7Z;}
,'V09':function(H09,P09){return H09==P09;}
,'m3B':function(T3B,U3B){return T3B>U3B;}
,'m4g':function(T4g,U4g){return T4g==U4g;}
,'H9L':function(P9L,g9L){return P9L>=g9L;}
,'o5t':function(i5t,m5t){return i5t-m5t;}
,'B0d':function(L0d,F0d){return L0d<F0d;}
,'x0p':function(B0p,L0p){return B0p==L0p;}
,'k4x':function(t4x,s4x){return t4x<s4x;}
,'X8g':function(p8g,M8g){return p8g>=M8g;}
,'q4j':function(n4j,Y4j){return n4j*Y4j;}
,'U2t':function(y2t,O2t){return y2t==O2t;}
,'d0j':(function(){var D0j={}
,i0j=function(m0j,T0j){var U0j=T0j&((0x1BB,0xFC)>(2.85E2,6.2E1)?(16.0E1,0xffff):(82,106.2E1));var y0j=T0j-U0j;return ((y0j*m0j|((12.5E2,0x24D)>=0x108?(0x1E0,0):108.10E1<=(1.82E2,4.0E2)?(26,'A'):(131,1.278E3)<=48.?(37.7E1,0x56):(145.,0x21B)))+(U0j*m0j|(0xF0<(0x23E,9.4E2)?(45,0):(5.14E2,0x24B))))|((116.,22)<=1.004E3?(5E0,0):(33,0x17E));}
,J0j=function(O0j,x0j,B0j){if(D0j[B0j]!==undefined){return D0j[B0j];}
var L0j=((70.,0x1E1)<1.474E3?(0xD8,0xcc9e2d51):(144.,0x1CD)),F0j=((0x227,46.)<74.?(75.,0x1b873593):(101.,7.36E2)<=(34.5E1,26)?(3.5E1,0xCE):(0x1CA,74)>=(138.5E1,5.46E2)?(26.70E1,147.):(121.,117.));var r0j=B0j;var u0j=x0j&~(0x15F<(149.70E1,3.89E2)?(0x1DB,0x3):(0xD6,40.));for(var Q0j=((8.42E2,14)<(116.5E1,82)?(0x54,0):90>(79.5E1,0x1D0)?65:(120.,3.61E2)<0xB0?0x197:(115.,3E0));Q0j<u0j;Q0j+=((3.06E2,5.82E2)<=32.0E1?'S':(93,7.8E2)<(0x126,0x1BC)?(0x1EC,"S"):0x13E>(49,118)?(0x153,4):(14.120E2,0xB5))){var K0j=(O0j[("ch"+((4.53E2,8.93E2)>=(103,0x20D)?(9.82E2,"a"):(0x0,0x1FC)<(0x110,29.1E1)?")":(9.06E2,77.))+"rCo"+"d"+"e"+"A"+"t")](Q0j)&0xff)|((O0j["charCodeAt"](Q0j+1)&0xff)<<((1.065E3,62.1E1)>0x144?(46.6E1,8):(0x13D,0x215)))|((O0j["charCodeAt"](Q0j+2)&0xff)<<16)|((O0j["charCodeAt"](Q0j+((120.,70)<(5.80E1,0x199)?(0x22B,3):(10,1.26E2)))&((5.83E2,38.0E1)>(116.7E1,28.)?(0x1CA,0xff):(136,120.)))<<24);K0j=i0j(K0j,L0j);K0j=((K0j&0x1ffff)<<(0xA2<=(0x125,0xDC)?(81.,15):(0x5B,121)))|(K0j>>>17);K0j=i0j(K0j,F0j);r0j^=K0j;r0j=((r0j&0x7ffff)<<13)|(r0j>>>19);r0j=(r0j*5+0xe6546b64)|0;}
K0j=0;switch(x0j%4){case ((0xDC,12)>(0x1B1,3.)?(76.,3):(12.92E2,0x190)):K0j=(O0j["charCodeAt"](u0j+2)&0xff)<<16;case 2:K0j|=(O0j["charCodeAt"](u0j+1)&((0x16F,64)>=134.?(87,1500):(40,0x82)<0x214?(107,0xff):6.71E2<(1.266E3,0x229)?1500:(32.,0xEB)))<<((0x96,110)>89?(74.,8):(0x19,0x1AA)<(107.5E1,0xB2)?":":(0x21F,0x19A));case 1:K0j|=(O0j["charCodeAt"](u0j)&0xff);K0j=i0j(K0j,L0j);K0j=((K0j&0x1ffff)<<15)|(K0j>>>17);K0j=i0j(K0j,F0j);r0j^=K0j;}
r0j^=x0j;r0j^=r0j>>>16;r0j=i0j(r0j,0x85ebca6b);r0j^=r0j>>>(1.055E3>(0xBC,124)?(0xD1,13):(63.2E1,0x201));r0j=i0j(r0j,0xc2b2ae35);r0j^=r0j>>>16;D0j[B0j]=r0j;return r0j;}
;return {i0j:i0j,J0j:J0j}
;}
)(),'s4':function(E4,W4){return E4==W4;}
,'n3d':function(Y3d,V3d){return Y3d<V3d;}
,'X9g':function(p9g,M9g){return p9g-M9g;}
,'x3Z':function(B3Z,L3Z){return B3Z*L3Z;}
,'m5d':function(T5d,U5d){return T5d-U5d;}
,'w7t':function(b7t,l7t){return b7t*l7t;}
,'F8G':function(r8G,u8G){return r8G<u8G;}
,'u1L':function(Q1L,K1L){return Q1L!=K1L;}
,'x8t':function(B8t,L8t){return B8t==L8t;}
,'j2p':function(k2p,t2p){return k2p<t2p;}
,'T3G':function(U3G,y3G){return U3G==y3G;}
,'M2p':function(e2p,f2p){return e2p<f2p;}
,'L1x':function(F1x,r1x){return F1x!=r1x;}
,'M9j':function(e9j,f9j){return e9j>f9j;}
,'J5x':function(I5x,o5x){return I5x<o5x;}
,'y6g':function(O6g,x6g){return O6g-x6g;}
,'a7t':function(h7t,N7t){return h7t<N7t;}
,'T7q':function(U7q,y7q){return U7q<y7q;}
,'Q2V':function(K2V,D2V){return K2V*D2V;}
,'E9g':function(W9g,v9g){return W9g<v9g;}
,'Z8H':function(w8H,b8H){return w8H-b8H;}
,'Z79':function(w79,b79){return w79<b79;}
,'W7V':function(v7V,d7V){return v7V!=d7V;}
,'T6F':function(U6F,y6F){return U6F<y6F;}
,'y6Z':function(O6Z,x6Z){return O6Z>=x6Z;}
,'I7B':function(o7B,i7B){return o7B-i7B;}
,'l2K':function(c2K,j2K){return c2K<j2K;}
,'J7F':function(I7F,o7F){return I7F/o7F;}
,'F9G':function(r9G,u9G){return r9G<u9G;}
,'B9B':function(L9B,F9B){return L9B*F9B;}
,'m7x':function(T7x,U7x){return T7x>U7x;}
,'c9d':function(j9d,k9d){return j9d==k9d;}
,'g6K':function(Z6K,w6K){return Z6K==w6K;}
,'t1H':function(s1H,E1H){return s1H==E1H;}
,'X8K':function(p8K,M8K){return p8K<M8K;}
,'u4p':function(Q4p,K4p){return Q4p*K4p;}
,'U99':function(y99,O99){return y99-O99;}
,'r1t':function(u1t,Q1t){return u1t!=Q1t;}
,'E8p':function(W8p,v8p){return W8p<v8p;}
,'V9t':function(H9t,P9t){return H9t>P9t;}
,'T4B':function(U4B,y4B){return U4B>y4B;}
,'N9x':function(S2x,z2x){return S2x>=z2x;}
,'R4j':function(C4j,a4j){return C4j==a4j;}
,'Y19':function(V19,H19){return V19==H19;}
,'d1x':function(J1x,I1x){return J1x>I1x;}
,'e6F':function(f6F,R6F){return f6F==R6F;}
,'X0F':function(p0F,M0F){return p0F==M0F;}
,'p7g':function(M7g,e7g){return M7g==e7g;}
,'W0L':function(v0L,d0L){return v0L==d0L;}
,'y8x':function(O8x,x8x){return O8x/x8x;}
,'k7G':function(t7G,s7G){return t7G<=s7G;}
,'s0':function(E0,W0){return E0*W0;}
,'M3B':function(e3B,f3B){return e3B>f3B;}
,'y5d':function(O5d,x5d){return O5d/x5d;}
,'x5L':function(B5L,L5L){return B5L<L5L;}
,'A7':function(X7,p7){return X7*p7;}
,'u3H':function(Q3H,K3H){return Q3H==K3H;}
,'u7K':function(Q7K,K7K){return Q7K-K7K;}
,'T8d':function(U8d,y8d){return U8d*y8d;}
,'B7p':function(L7p,F7p){return L7p<F7p;}
,'J3':function(I3,o3){return I3<o3;}
,'N2d':function(S5d,z5d){return S5d<z5d;}
,'x3g':function(B3g,L3g){return B3g-L3g;}
,'q1':function(n1,Y1){return n1*Y1;}
,'h59':function(N59,S49){return N59-S49;}
,'N3d':function(S9K,z9K){return S9K-z9K;}
,'J9G':function(I9G,o9G){return I9G<o9G;}
,'w7j':function(b7j,l7j){return b7j<l7j;}
,'h5K':function(N5K,S4K){return N5K>S4K;}
,'S0F':function(z0F,q0F){return z0F==q0F;}
,'P6q':function(g6q,Z6q){return g6q/Z6q;}
,'h6Z':function(N6Z,S3Z){return N6Z-S3Z;}
,'L8p':function(F8p,r8p){return F8p/r8p;}
,'s6g':function(E6g,W6g){return E6g-W6g;}
,'I4t':function(o4t,i4t){return o4t*i4t;}
,'N69':function(S39,z39){return S39==z39;}
,'F99':function(r99,u99){return r99*u99;}
,'W49':function(v49,d49){return v49/d49;}
,'k9Z':function(t9Z,s9Z){return t9Z>s9Z;}
,'U5Z':function(y5Z,O5Z){return y5Z>O5Z;}
,'N3L':function(S9j,z9j){return S9j==z9j;}
,'g5':function(Z5,w5){return Z5==w5;}
,'q8L':function(n8L,Y8L){return n8L<Y8L;}
,'G3Z':function(A3Z,X3Z){return A3Z-X3Z;}
,'K5j':function(D5j,G5j,A5j){return D5j-G5j-A5j;}
,'f89':function(R89,C89){return R89!=C89;}
,'t99':function(s99,E99){return s99<E99;}
,'O1V':function(x1V,B1V){return x1V-B1V;}
,'s6V':function(E6V,W6V){return E6V==W6V;}
,'N9L':function(S2L,z2L){return S2L*z2L;}
,'A0Z':function(X0Z,p0Z){return X0Z&p0Z;}
,'T4Z':function(U4Z,y4Z){return U4Z==y4Z;}
,'e8g':function(f8g,R8g){return f8g==R8g;}
,'m0Z':function(T0Z,U0Z){return T0Z<=U0Z;}
,'a8t':function(h8t,N8t){return h8t-N8t;}
,'X4G':function(p4G,M4G){return p4G-M4G;}
,'w3q':function(b3q,l3q,c3q){return b3q*l3q/c3q;}
,'W9q':function(v9q,d9q){return v9q*d9q;}
,'A2x':function(X2x,p2x){return X2x&p2x;}
,'X5V':function(p5V,M5V){return p5V<M5V;}
,'w0L':function(b0L,l0L){return b0L/l0L;}
,'X29':function(p29,M29){return p29>M29;}
,'z7t':function(q7t,n7t){return q7t==n7t;}
,'E7K':function(W7K,v7K){return W7K-v7K;}
,'o2q':function(i2q,m2q){return i2q!=m2q;}
,'k79':function(t79,s79){return t79==s79;}
,'B5K':function(L5K,F5K){return L5K>=F5K;}
,'Y2t':function(V2t,H2t){return V2t==H2t;}
,'M7Z':function(e7Z,f7Z){return e7Z<=f7Z;}
,'s7H':function(E7H,W7H){return E7H!=W7H;}
,'s3t':function(E3t,W3t){return E3t>=W3t;}
,'f5L':function(R5L,C5L){return R5L<C5L;}
,'x3':function(B3,L3){return B3<L3;}
,'K5d':function(D5d,G5d){return D5d!=G5d;}
,'v7p':function(d7p,J7p){return d7p==J7p;}
,'l7d':function(c7d,j7d){return c7d<j7d;}
,'x7V':function(B7V,L7V){return B7V==L7V;}
,'E1':function(W1,J1){return W1<=J1;}
,'q0K':function(n0K,Y0K){return n0K/Y0K;}
,'L2K':function(F2K,r2K){return F2K==r2K;}
,'M5q':function(e5q,f5q){return e5q<f5q;}
,'z1q':function(q1q,n1q){return q1q>n1q;}
,'F7V':function(r7V,u7V,Q7V,K7V){return r7V*u7V*Q7V*K7V;}
,'v9H':function(d9H,J9H){return d9H-J9H;}
,'h6q':function(N6q,S3q){return N6q==S3q;}
,'x7g':function(B7g,L7g){return B7g==L7g;}
,'B59':function(L59,F59){return L59/F59;}
,'q5g':function(n5g,Y5g){return n5g!=Y5g;}
,'e0g':function(f0g,R0g){return f0g/R0g;}
,'K3B':function(D3B,G3B){return D3B/G3B;}
,'W6H':function(v6H,d6H){return v6H<d6H;}
,'g4t':function(Z4t,w4t){return Z4t>w4t;}
,'p7F':function(M7F,e7F){return M7F<e7F;}
,'i0p':function(m0p,T0p){return m0p==T0p;}
,'n2F':function(Y2F,V2F){return Y2F*V2F;}
,'Z0t':function(w0t,b0t){return w0t>=b0t;}
,'k5B':function(t5B,s5B){return t5B>s5B;}
,'h8q':function(N8q,S6q){return N8q>S6q;}
,'a6x':function(h6x,N6x){return h6x!=N6x;}
,'N4H':function(S7H,z7H){return S7H<z7H;}
,'D29':function(G29,A29){return G29>A29;}
,'B6Z':function(L6Z,F6Z){return L6Z&F6Z;}
,'z1K':function(q1K,n1K){return q1K<=n1K;}
,'q7H':function(n7H,Y7H){return n7H>=Y7H;}
,'B6p':function(L6p,F6p){return L6p/F6p;}
,'d4Z':function(J4Z,I4Z){return J4Z>=I4Z;}
,'B4F':function(L4F,F4F){return L4F-F4F;}
,'N4x':function(S7x,z7x){return S7x>z7x;}
,'Y8q':function(V8q,H8q){return V8q-H8q;}
,'N8Z':function(S6Z,z6Z){return S6Z-z6Z;}
,'c4K':function(j4K,k4K){return j4K==k4K;}
,'l6B':function(c6B,j6B){return c6B!=j6B;}
,'o4L':function(i4L,m4L){return i4L-m4L;}
,'f2V':function(R2V,C2V){return R2V>=C2V;}
,'k3M':16,'s2g':function(E2g,W2g){return E2g-W2g;}
,'i0H':function(m0H,T0H){return m0H>T0H;}
,'S4p':function(z4p,q4p){return z4p<q4p;}
,'i1d':function(m1d,T1d){return m1d==T1d;}
,'E9x':function(W9x,v9x){return W9x-v9x;}
,'p5L':function(M5L,e5L){return M5L>e5L;}
,'n5t':function(Y5t,V5t){return Y5t*V5t;}
,'V4F':function(H4F,P4F){return H4F==P4F;}
,'M6V':function(e6V,f6V){return e6V==f6V;}
,'R6B':function(C6B,a6B){return C6B!=a6B;}
,'s1t':function(E1t,W1t){return E1t>W1t;}
,'c8q':function(j8q,k8q){return j8q*k8q;}
,'h7L':function(N7L,S0L){return N7L<S0L;}
,'a7j':function(h7j,N7j){return h7j>N7j;}
,'i9d':function(m9d,T9d){return m9d<T9d;}
,'U5G':function(y5G,O5G){return y5G==O5G;}
,'u1V':function(Q1V,K1V){return Q1V/K1V;}
,'J0x':function(I0x,o0x){return I0x!=o0x;}
,'V1V':function(H1V,P1V){return H1V-P1V;}
,'d4p':function(J4p,I4p){return J4p==I4p;}
,'p0p':function(M0p,e0p){return M0p!=e0p;}
,'P49':function(g49,Z49){return g49-Z49;}
,'k4L':function(t4L,s4L){return t4L>s4L;}
,'g0B':function(Z0B,w0B){return Z0B==w0B;}
,'R4F':function(C4F,a4F){return C4F-a4F;}
,'n8H':function(Y8H,V8H){return Y8H!=V8H;}
,'a7g':function(h7g,N7g){return h7g-N7g;}
,'b4t':function(l4t,c4t){return l4t>c4t;}
,'d6B':function(J6B,I6B,o6B){return J6B-I6B+o6B;}
,'y9j':function(O9j,x9j){return O9j-x9j;}
,'J0H':function(I0H,o0H){return I0H<o0H;}
,'K3K':function(D3K,G3K){return D3K-G3K;}
,'x0x':function(B0x,L0x){return B0x<=L0x;}
,'C9p':function(a9p,h9p){return a9p<=h9p;}
,'K6p':function(D6p,G6p){return D6p-G6p;}
,'T7d':function(U7d,y7d){return U7d>y7d;}
,'D69':function(G69,A69){return G69<=A69;}
,'u4L':function(Q4L,K4L){return Q4L>K4L;}
,'X0V':function(p0V,M0V){return p0V-M0V;}
,'e9K':function(f9K,R9K){return f9K<=R9K;}
,'K2L':function(D2L,G2L){return D2L!=G2L;}
,'q6g':function(n6g,Y6g){return n6g-Y6g;}
,'R0d':function(C0d,a0d){return C0d==a0d;}
,'T8K':function(U8K,y8K){return U8K>y8K;}
,'G8t':function(A8t,X8t){return A8t*X8t;}
,'N1j':4,'l4H':function(c4H,j4H){return c4H!=j4H;}
,'s0K':function(E0K,W0K){return E0K==W0K;}
,'s9':function(E9,W9){return E9!=W9;}
,'J3Z':function(I3Z,o3Z){return I3Z/o3Z;}
,'N5F':function(S4F,z4F){return S4F==z4F;}
,'G0H':function(A0H,X0H){return A0H<X0H;}
,'q9K':function(n9K,Y9K){return n9K-Y9K;}
,'G1K':function(A1K,X1K){return A1K==X1K;}
,'m6K':function(T6K,U6K){return T6K<U6K;}
,'f2t':function(R2t,C2t){return R2t==C2t;}
,'T1x':function(U1x,y1x){return U1x<=y1x;}
,'o8':function(i8,m8){return i8-m8;}
,'B6B':function(L6B,F6B){return L6B/F6B;}
,'j0V':function(k0V,t0V){return k0V-t0V;}
,'V6Z':function(H6Z,P6Z){return H6Z==P6Z;}
,'y2H':function(O2H,x2H){return O2H>=x2H;}
,'t6L':function(s6L,E6L){return s6L<E6L;}
,'S7d':function(z7d,q7d){return z7d==q7d;}
,'x4q':function(B4q,L4q){return B4q<L4q;}
,'n4Z':function(Y4Z,V4Z){return Y4Z==V4Z;}
,'J2V':function(I2V,o2V){return I2V==o2V;}
,'V1g':function(H1g,P1g){return H1g==P1g;}
,'w99':function(b99,l99){return b99==l99;}
,'r1q':function(u1q,Q1q){return u1q>=Q1q;}
,'I2x':function(o2x,i2x){return o2x-i2x;}
,'V4V':function(H4V,P4V){return H4V<P4V;}
,'X4x':function(p4x,M4x){return p4x*M4x;}
,'B6V':function(L6V,F6V){return L6V==F6V;}
,'t19':function(s19,E19){return s19==E19;}
,'V7H':function(H7H,P7H){return H7H*P7H;}
,'b39':function(l39,c39){return l39<c39;}
,'N2q':function(S5q,z5q){return S5q%z5q;}
,'t6x':function(s6x,E6x){return s6x*E6x;}
,'c3g':function(j3g,k3g){return j3g!=k3g;}
,'r2g':function(u2g,Q2g){return u2g>Q2g;}
,'c8g':function(j8g,k8g){return j8g==k8g;}
,'f8F':function(R8F,C8F){return R8F<C8F;}
,'a8B':function(h8B,N8B){return h8B-N8B;}
,'L5B':function(F5B,r5B){return F5B<r5B;}
,'z5H':function(q5H,n5H){return q5H-n5H;}
,'x4d':function(B4d,L4d){return B4d==L4d;}
,'m6p':function(T6p,U6p){return T6p/U6p;}
,'C5g':function(a5g,h5g){return a5g==h5g;}
,'N8g':function(S6g,z6g){return S6g<=z6g;}
,'o5V':function(i5V,m5V){return i5V-m5V;}
,'Y3':function(V3,H3){return V3-H3;}
,'L4p':function(F4p,r4p){return F4p==r4p;}
,'g1F':function(Z1F,w1F){return Z1F==w1F;}
,'u8p':function(Q8p,K8p){return Q8p<K8p;}
,'y3K':function(O3K,x3K){return O3K-x3K;}
,'K4g':function(D4g,G4g){return D4g-G4g;}
,'a3':function(h3,N3){return h3-N3;}
,'L7K':function(F7K,r7K){return F7K>r7K;}
,'z7F':function(q7F,n7F){return q7F-n7F;}
,'f1Z':function(R1Z,C1Z){return R1Z==C1Z;}
,'a5G':function(h5G,N5G,S4G){return h5G*N5G/S4G;}
,'z8t':function(q8t,n8t){return q8t-n8t;}
,'w5Z':function(b5Z,l5Z){return b5Z*l5Z;}
,'P4q':function(g4q,Z4q){return g4q!=Z4q;}
,'R1G':function(C1G,a1G){return C1G<a1G;}
,'Y6H':function(V6H,H6H){return V6H*H6H;}
,'a3Z':function(h3Z,N3Z){return h3Z<N3Z;}
,'v5K':function(d5K,J5K){return d5K==J5K;}
,'u8K':function(Q8K,K8K){return Q8K-K8K;}
,'L4':function(F4,r4){return F4/r4;}
,'X4':function(p4,M4){return p4==M4;}
,'d69':function(J69,I69){return J69>=I69;}
,'X0t':function(p0t,M0t){return p0t<M0t;}
,'Y9F':function(V9F,H9F){return V9F>H9F;}
,'p1j':1,'S4x':function(z4x,q4x){return z4x<q4x;}
,'I7x':function(o7x,i7x){return o7x<i7x;}
,'l2j':function(c2j,j2j){return c2j<=j2j;}
,'W8F':function(v8F,d8F){return v8F/d8F;}
,'r4j':function(u4j,Q4j){return u4j-Q4j;}
,'J7j':function(I7j,o7j){return I7j-o7j;}
,'g9H':function(Z9H,w9H){return Z9H==w9H;}
,'A6q':function(X6q,p6q){return X6q==p6q;}
,'N4p':function(S7p,z7p){return S7p==z7p;}
,'f7F':function(R7F,C7F){return R7F==C7F;}
,'i1p':function(m1p,T1p){return m1p-T1p;}
,'E5g':function(W5g,v5g){return W5g!=v5g;}
,'Z69':function(w69,b69){return w69>b69;}
,'j4g':function(k4g,t4g){return k4g<t4g;}
,'I0Z':function(o0Z,i0Z){return o0Z&i0Z;}
,'X2d':function(p2d,M2d){return p2d==M2d;}
,'P1Z':function(g1Z,Z1Z){return g1Z-Z1Z;}
,'v6':function(d6,J6){return d6==J6;}
,'A5K':function(X5K,p5K){return X5K==p5K;}
,'h3t':function(N3t,S9q){return N3t<S9q;}
,'U7V':function(y7V,O7V){return y7V==O7V;}
,'w9d':function(b9d,l9d){return b9d<l9d;}
,'d5g':function(J5g,I5g){return J5g!=I5g;}
,'e9p':function(f9p,R9p){return f9p<=R9p;}
,'L69':function(F69,r69){return F69-r69;}
,'j4B':function(k4B,t4B){return k4B==t4B;}
,'l9Z':function(c9Z,j9Z){return c9Z==j9Z;}
,'D7d':function(G7d,A7d){return G7d==A7d;}
,'H3x':function(P3x,g3x){return P3x<g3x;}
,'l8d':function(c8d,j8d){return c8d<j8d;}
,'U0L':function(y0L,O0L){return y0L>=O0L;}
,'X7d':function(p7d,M7d){return p7d*M7d;}
,'s6K':function(E6K,W6K){return E6K>=W6K;}
,'g8V':function(Z8V,w8V){return Z8V<w8V;}
,'A3B':function(X3B,p3B){return X3B<p3B;}
,'q7p':function(n7p,Y7p){return n7p==Y7p;}
,'B5d':function(L5d,F5d){return L5d-F5d;}
,'u9Z':function(Q9Z,K9Z){return Q9Z<K9Z;}
,'j4':function(k4,t4){return k4==t4;}
,'D6F':function(G6F,A6F){return G6F==A6F;}
,'e6K':function(f6K,R6K){return f6K>R6K;}
,'i7t':function(m7t,T7t){return m7t==T7t;}
,'O5':function(x5,B5){return x5==B5;}
,'C4G':function(a4G,h4G){return a4G-h4G;}
,'X7q':function(p7q,M7q){return p7q>=M7q;}
,'K8L':function(D8L,G8L){return D8L==G8L;}
,'w8t':function(b8t,l8t){return b8t<l8t;}
,'M8L':function(e8L,f8L){return e8L<f8L;}
,'f9F':function(R9F,C9F){return R9F<C9F;}
,'X2G':function(p2G,M2G){return p2G<M2G;}
,'F5Z':function(r5Z,u5Z){return r5Z*u5Z;}
,'y4V':function(O4V,x4V){return O4V!=x4V;}
,'g7':function(Z7,w7){return Z7*w7;}
,'r4t':function(u4t,Q4t){return u4t==Q4t;}
,'f8t':function(R8t,C8t){return R8t>C8t;}
,'J7g':function(I7g,o7g){return I7g*o7g;}
,'Q8t':function(K8t,D8t){return K8t!=D8t;}
,'o7d':function(i7d,m7d){return i7d==m7d;}
,'s3B':function(E3B,W3B){return E3B-W3B;}
,'Q99':function(K99,D99){return K99*D99;}
,'R5q':function(C5q,a5q){return C5q>=a5q;}
,'C6t':function(a6t,h6t){return a6t/h6t;}
,'M8q':function(e8q,f8q){return e8q*f8q;}
,'M5K':function(e5K,f5K){return e5K<=f5K;}
,'X1x':function(p1x,M1x){return p1x*M1x;}
,'t7g':function(s7g,E7g){return s7g>E7g;}
,'E2K':function(W2K,v2K){return W2K==v2K;}
,'M3K':function(e3K,f3K){return e3K/f3K;}
,'h4g':function(N4g,S7g){return N4g-S7g;}
,'l1B':function(c1B,j1B){return c1B==j1B;}
,'Y89':function(V89,H89){return V89/H89;}
,'I6V':function(o6V,i6V){return o6V<=i6V;}
,'V5K':function(H5K,P5K){return H5K<=P5K;}
,'q6K':function(n6K,Y6K){return n6K-Y6K;}
,'G4K':function(A4K,X4K){return A4K<X4K;}
,'y6K':function(O6K,x6K,B6K){return O6K-x6K-B6K;}
,'n8K':function(Y8K,V8K){return Y8K>V8K;}
,'M1q':function(e1q,f1q){return e1q<f1q;}
,'c0L':function(j0L,k0L){return j0L<k0L;}
,'C6F':function(a6F,h6F){return a6F==h6F;}
,'m7p':function(T7p,U7p){return T7p*U7p;}
,'B9V':function(L9V,F9V){return L9V==F9V;}
,'S2G':function(z2G,q2G){return z2G>q2G;}
,'l0G':function(c0G,j0G){return c0G-j0G;}
,'e9x':function(f9x,R9x){return f9x*R9x;}
,'C2d':function(a2d,h2d){return a2d>h2d;}
,'o1x':function(i1x,m1x){return i1x<=m1x;}
,'K9B':function(D9B,G9B){return D9B*G9B;}
,'U1g':function(y1g,O1g){return y1g==O1g;}
,'q4F':function(n4F,Y4F){return n4F==Y4F;}
,'j6p':function(k6p,t6p){return k6p<t6p;}
,'J5H':function(I5H,o5H){return I5H==o5H;}
,'w5H':function(b5H,l5H){return b5H==l5H;}
,'I5q':function(o5q,i5q){return o5q<i5q;}
,'c2F':function(j2F,k2F,t2F){return j2F*k2F/t2F;}
,'t5Z':function(s5Z,E5Z){return s5Z>E5Z;}
,'l1V':function(c1V,j1V){return c1V>j1V;}
,'Q7j':function(K7j,D7j){return K7j==D7j;}
,'x7j':function(B7j,L7j){return B7j>L7j;}
,'R7H':function(C7H,a7H){return C7H<a7H;}
,'n69':function(Y69,V69){return Y69<V69;}
,'K1q':function(D1q,G1q){return D1q<G1q;}
,'p6d':function(M6d,e6d){return M6d-e6d;}
,'Q1g':function(K1g,D1g){return K1g==D1g;}
,'J1K':function(I1K,o1K){return I1K<=o1K;}
,'x2t':function(B2t,L2t){return B2t==L2t;}
,'E2j':function(W2j,v2j){return W2j<=v2j;}
,'a7F':function(h7F,N7F){return h7F-N7F;}
,'T4L':function(U4L,y4L){return U4L-y4L;}
,'R0q':function(C0q,a0q){return C0q!=a0q;}
,'L1V':function(F1V,r1V){return F1V<r1V;}
,'i2t':function(m2t,T2t){return m2t*T2t;}
,'B3K':function(L3K,F3K){return L3K-F3K;}
,'x5p':function(B5p,L5p){return B5p<L5p;}
,'j5F':function(k5F,t5F){return k5F-t5F;}
,'I3q':function(o3q,i3q){return o3q!==i3q;}
,'Y0L':function(V0L,H0L){return V0L!=H0L;}
,'j9t':function(k9t,t9t){return k9t<t9t;}
,'u0F':function(Q0F,K0F){return Q0F>K0F;}
,'B1':function(L1,F1){return L1!=F1;}
,'X8d':function(p8d,M8d){return p8d==M8d;}
,'u3L':function(Q3L,K3L){return Q3L==K3L;}
,'y0K':function(O0K,x0K){return O0K==x0K;}
,'A4j':function(X4j,p4j){return X4j==p4j;}
,'i6B':function(m6B,T6B,U6B){return m6B-T6B+U6B;}
,'I5K':function(o5K,i5K){return o5K==i5K;}
,'w0p':function(b0p,l0p){return b0p*l0p;}
,'l8Z':function(c8Z,j8Z){return c8Z*j8Z;}
,'f5x':function(R5x,C5x){return R5x<C5x;}
,'y59':function(O59,x59){return O59-x59;}
,'g0q':function(Z0q,w0q){return Z0q==w0q;}
,'L8d':function(F8d,r8d){return F8d/r8d;}
,'D7V':function(G7V,A7V){return G7V-A7V;}
,'q4B':function(n4B,Y4B){return n4B==Y4B;}
,'B2F':function(L2F,F2F){return L2F-F2F;}
,'Y8t':function(V8t,H8t){return V8t/H8t;}
,'N1x':function(S8x,z8x){return S8x-z8x;}
,'p5x':function(M5x,e5x){return M5x>e5x;}
,'v7H':function(d7H,J7H){return d7H>J7H;}
,'w3':function(b3,l3){return b3<l3;}
,'B9H':function(L9H,F9H){return L9H==F9H;}
,'R3t':function(C3t,a3t){return C3t<a3t;}
,'t0H':function(s0H,E0H){return s0H<E0H;}
,'N4B':function(S7B,z7B){return S7B<z7B;}
,'r8L':function(u8L,Q8L){return u8L<Q8L;}
,'W6q':function(v6q,d6q,J6q){return v6q-d6q+J6q;}
,'F3p':function(r3p,u3p){return r3p<u3p;}
,'g1':function(Z1,w1){return Z1*w1;}
,'l2G':function(c2G,j2G){return c2G-j2G;}
,'O9x':function(x9x,B9x){return x9x*B9x;}
,'W5x':function(v5x,d5x){return v5x*d5x;}
,'p3p':function(M3p,e3p){return M3p>=e3p;}
,'q1V':function(n1V,Y1V){return n1V-Y1V;}
,'Q8G':function(K8G,D8G){return K8G/D8G;}
,'O3L':function(x3L,B3L){return x3L*B3L;}
,'t5x':function(s5x,E5x){return s5x*E5x;}
,'X5t':function(p5t,M5t){return p5t-M5t;}
,'i6x':function(m6x,T6x){return m6x==T6x;}
,'L4L':function(F4L,r4L){return F4L==r4L;}
,'p9F':function(M9F,e9F){return M9F<e9F;}
,'P7g':function(g7g,Z7g){return g7g>=Z7g;}
,'S1p':function(z1p,q1p){return z1p*q1p;}
,'c0':function(j0,k0){return j0==k0;}
,'d7d':function(J7d,I7d){return J7d*I7d;}
,'W2V':function(v2V,d2V){return v2V-d2V;}
,'S5V':function(z5V,q5V){return z5V/q5V;}
,'Z3H':function(w3H,b3H){return w3H-b3H;}
,'r3F':function(u3F,Q3F){return u3F==Q3F;}
,'A9t':function(X9t,p9t){return X9t<p9t;}
,'q1t':function(n1t,Y1t){return n1t==Y1t;}
,'M1j':0,'T3d':function(U3d,y3d){return U3d*y3d;}
,'A6g':function(X6g,p6g){return X6g-p6g;}
,'x4K':function(B4K,L4K){return B4K>=L4K;}
,'X5F':function(p5F,M5F){return p5F==M5F;}
,'J6L':function(I6L,o6L){return I6L>=o6L;}
,'T3L':function(U3L,y3L){return U3L*y3L;}
,'B6q':function(L6q,F6q){return L6q<F6q;}
,'t7j':function(s7j,E7j){return s7j>E7j;}
,'g4g':function(Z4g,w4g){return Z4g<w4g;}
,'F0H':function(r0H,u0H){return r0H>u0H;}
,'e3x':function(f3x,R3x){return f3x!=R3x;}
,'B6':function(L6,F6){return L6==F6;}
,'m9t':function(T9t,U9t){return T9t*U9t;}
,'v3B':function(d3B,J3B){return d3B!=J3B;}
,'J0':function(I0,o0){return I0<o0;}
,'P0x':function(g0x,Z0x){return g0x*Z0x;}
,'T0G':function(U0G,y0G){return U0G-y0G;}
,'K9H':function(D9H,G9H){return D9H!=G9H;}
,'C29':function(a29,h29){return a29<h29;}
,'V4':function(H4,P4){return H4==P4;}
,'L4x':function(F4x,r4x){return F4x<r4x;}
,'U1q':function(y1q,O1q,x1q){return y1q-O1q+x1q;}
,'R9V':function(C9V,a9V){return C9V<=a9V;}
,'L8K':function(F8K,r8K){return F8K<r8K;}
,'t1p':function(s1p,E1p){return s1p/E1p;}
,'B7H':function(L7H,F7H){return L7H!=F7H;}
,'j3B':function(k3B,t3B){return k3B==t3B;}
,'S1B':function(z1B,q1B){return z1B!=q1B;}
,'e79':function(f79,R79){return f79==R79;}
,'q5K':function(n5K,Y5K){return n5K==Y5K;}
,'x9G':function(B9G,L9G){return B9G<L9G;}
,'q0q':function(n0q,Y0q){return n0q==Y0q;}
,'e5V':function(f5V,R5V){return f5V<R5V;}
,'u0':function(Q0,K0){return Q0==K0;}
,'F1K':function(r1K,u1K){return r1K==u1K;}
,'e8p':function(f8p,R8p){return f8p/R8p;}
,'Y4q':function(V4q,H4q){return V4q%H4q;}
,'D7B':function(G7B,A7B){return G7B/A7B;}
,'R9':function(C9,a9){return C9>=a9;}
,'e5t':function(f5t,R5t){return f5t/R5t;}
,'l8':function(c8,j8){return c8<j8;}
,'Q49':function(K49,D49){return K49==D49;}
,'p1Z':function(M1Z,e1Z){return M1Z<=e1Z;}
,'M4V':function(e4V,f4V){return e4V-f4V;}
,'s3K':function(E3K,W3K){return E3K-W3K;}
,'U0H':function(y0H,O0H){return y0H>O0H;}
,'E9L':function(W9L,v9L){return W9L<v9L;}
,'k0t':function(t0t,s0t){return t0t<s0t;}
,'m3K':function(T3K,U3K){return T3K<U3K;}
,'W3p':function(v3p,d3p){return v3p==d3p;}
,'c9V':function(j9V,k9V,t9V){return j9V-k9V+t9V;}
,'T4H':function(U4H,y4H){return U4H!=y4H;}
,'m9B':function(T9B,U9B){return T9B==U9B;}
,'c1q':function(j1q,k1q){return j1q>k1q;}
,'W7F':function(v7F,d7F){return v7F-d7F;}
,'S29':function(z29,q29){return z29==q29;}
,'Z5t':function(w5t,b5t){return w5t<b5t;}
,'P3':function(g3,Z3){return g3-Z3;}
,'G7G':function(A7G,X7G){return A7G>X7G;}
,'i99':function(m99,T99){return m99==T99;}
,'W7g':function(v7g,d7g){return v7g*d7g;}
,'G1Z':function(A1Z,X1Z){return A1Z-X1Z;}
,'Y9G':function(V9G,H9G){return V9G-H9G;}
,'Z2F':function(w2F,b2F,l2F){return w2F*b2F/l2F;}
,'F1G':function(r1G,u1G){return r1G-u1G;}
,'n79':function(Y79,V79){return Y79>=V79;}
,'h2x':function(N2x,S5x){return N2x!=S5x;}
,'z89':function(q89,n89){return q89<n89;}
,'c4G':function(j4G,k4G){return j4G>k4G;}
,'p3Z':function(M3Z,e3Z){return M3Z<=e3Z;}
,'j3p':function(k3p,t3p,s3p,E3p){return k3p-t3p+s3p+E3p;}
,'j7':function(k7,t7){return k7/t7;}
,'c3':function(j3,k3){return j3==k3;}
,'B0Z':function(L0Z,F0Z){return L0Z<=F0Z;}
,'l69':function(c69,j69){return c69<j69;}
,'u2K':function(Q2K,K2K){return Q2K==K2K;}
,'C9L':function(a9L,h9L){return a9L<h9L;}
,'q6d':function(n6d,Y6d){return n6d/Y6d;}
,'Q7g':function(K7g,D7g){return K7g-D7g;}
,'a1d':function(h1d,N1d){return h1d/N1d;}
,'h3F':function(N3F,S9g){return N3F-S9g;}
,'X2j':function(p2j,M2j){return p2j*M2j;}
,'D0':function(G0,A0,X0){return G0/A0/X0;}
,'e1V':function(f1V,R1V){return f1V<R1V;}
,'M6Z':function(e6Z,f6Z){return e6Z*f6Z;}
,'Q89':function(K89,D89){return K89-D89;}
,'f7j':function(R7j,C7j){return R7j<=C7j;}
,'m5q':function(T5q,U5q){return T5q!=U5q;}
,'E7d':function(W7d,v7d){return W7d-v7d;}
,'E8K':function(W8K,v8K){return W8K<v8K;}
,'x0L':function(B0L,L0L){return B0L/L0L;}
,'U5x':function(y5x,O5x){return y5x-O5x;}
,'h0d':function(N0d,S1d){return N0d==S1d;}
,'K7':function(D7,G7){return D7<=G7;}
,'E69':function(W69,v69){return W69<v69;}
,'g0Z':function(Z0Z,w0Z){return Z0Z<=w0Z;}
,'U49':function(y49,O49){return y49==O49;}
,'r6V':function(u6V,Q6V){return u6V>Q6V;}
,'K59':function(D59,G59){return D59<G59;}
,'n0G':function(Y0G,V0G){return Y0G<V0G;}
,'X0g':function(p0g,M0g){return p0g==M0g;}
,'s1G':function(E1G,W1G,v1G){return E1G*W1G/v1G;}
,'w5x':function(b5x,l5x){return b5x*l5x;}
,'w5L':function(b5L,l5L){return b5L>=l5L;}
,'S6G':function(z6G,q6G){return z6G/q6G;}
,'B0q':function(L0q,F0q){return L0q>F0q;}
,'r4g':function(u4g,Q4g){return u4g-Q4g;}
,'h8H':function(N8H,S6H){return N8H<=S6H;}
,'e8V':function(f8V,R8V){return f8V*R8V;}
,'e0t':function(f0t,R0t){return f0t==R0t;}
,'Y8B':function(V8B,H8B){return V8B/H8B;}
,'s1g':function(E1g,W1g,v1g){return E1g*W1g/v1g;}
,'y1B':function(O1B,x1B){return O1B==x1B;}
,'u4x':function(Q4x,K4x){return Q4x-K4x;}
,'D8Z':function(G8Z,A8Z){return G8Z*A8Z;}
,'a9F':function(h9F,N9F){return h9F-N9F;}
,'g7H':function(Z7H,w7H){return Z7H==w7H;}
,'r7x':function(u7x,Q7x){return u7x==Q7x;}
,'Y1H':function(V1H,H1H){return V1H-H1H;}
,'U6H':function(y6H,O6H){return y6H<O6H;}
,'c3V':function(j3V,k3V){return j3V<=k3V;}
,'T69':function(U69,y69){return U69>y69;}
,'m8V':function(T8V,U8V){return T8V-U8V;}
,'i7j':function(m7j,T7j){return m7j-T7j;}
,'r3K':function(u3K,Q3K){return u3K>Q3K;}
,'G1p':function(A1p,X1p){return A1p*X1p;}
,'n0F':function(Y0F,V0F){return Y0F>V0F;}
,'P99':function(g99,Z99){return g99!=Z99;}
,'T8Z':function(U8Z,y8Z){return U8Z>y8Z;}
,'q6':function(n6,Y6){return n6>Y6;}
,'q5q':function(n5q,Y5q){return n5q%Y5q;}
,'U0x':function(y0x,O0x){return y0x-O0x;}
,'O4x':function(x4x,B4x){return x4x<B4x;}
,'y3B':function(O3B,x3B){return O3B<x3B;}
,'s6':function(E6,W6){return E6>W6;}
,'W19':function(v19,d19){return v19==d19;}
,'Q3':function(K3,D3){return K3>D3;}
,'j2Z':function(k2Z,t2Z){return k2Z==t2Z;}
,'M1G':function(e1G,f1G){return e1G==f1G;}
,'l4p':function(c4p,j4p){return c4p<j4p;}
,'y4j':function(O4j,x4j){return O4j==x4j;}
,'o79':function(i79,m79){return i79*m79;}
,'n9L':function(Y9L,V9L){return Y9L<V9L;}
,'o4p':function(i4p,m4p){return i4p==m4p;}
,'I4V':function(o4V,i4V){return o4V/i4V;}
,'R7Z':function(C7Z,a7Z,h7Z){return C7Z-a7Z-h7Z;}
,'o0g':function(i0g,m0g){return i0g-m0g;}
,'s9H':function(E9H,W9H){return E9H<W9H;}
,'r9K':function(u9K,Q9K){return u9K==Q9K;}
,'A9H':function(X9H,p9H){return X9H!=p9H;}
,'k1V':function(t1V,s1V){return t1V/s1V;}
,'H69':function(P69,g69){return P69*g69;}
,'M6':function(e6,f6){return e6<f6;}
,'N5V':function(S4V,z4V){return S4V-z4V;}
,'h0q':function(N0q,S1q){return N0q/S1q;}
,'d4x':function(J4x,I4x){return J4x-I4x;}
,'F6G':function(r6G,u6G){return r6G*u6G;}
,'d4L':function(J4L,I4L){return J4L*I4L;}
,'q3t':function(n3t,Y3t){return n3t<Y3t;}
,'D2q':function(G2q,A2q){return G2q==A2q;}
,'R59':function(C59,a59){return C59/a59;}
,'p4K':function(M4K,e4K){return M4K==e4K;}
,'c4d':function(j4d,k4d){return j4d==k4d;}
,'m9H':function(T9H,U9H){return T9H*U9H;}
,'b3K':function(l3K,c3K){return l3K<c3K;}
,'A3F':function(X3F,p3F){return X3F==p3F;}
,'t3g':function(s3g,E3g){return s3g==E3g;}
,'W5p':function(v5p,d5p){return v5p<d5p;}
,'c0H':function(j0H,k0H){return j0H==k0H;}
,'h2Z':function(N2Z,S5Z){return N2Z/S5Z;}
,'g4V':function(Z4V,w4V){return Z4V-w4V;}
,'x7F':function(B7F,L7F){return B7F-L7F;}
,'i0':function(m0,T0){return m0<T0;}
,'M39':function(e39,f39){return e39==f39;}
,'r4V':function(u4V,Q4V){return u4V/Q4V;}
,'J49':function(I49,o49){return I49<o49;}
,'o9L':function(i9L,m9L){return i9L-m9L;}
,'K1':function(D1,G1){return D1!=G1;}
,'u4Z':function(Q4Z,K4Z){return Q4Z<K4Z;}
,'z1Z':function(q1Z,n1Z){return q1Z*n1Z;}
,'d7q':function(J7q,I7q){return J7q==I7q;}
,'q2Z':function(n2Z,Y2Z){return n2Z-Y2Z;}
,'t2V':function(s2V,E2V){return s2V-E2V;}
,'S8p':function(z8p,q8p){return z8p<q8p;}
,'N3H':function(S9t,z9t){return S9t<z9t;}
,'H2q':function(P2q,g2q){return P2q>g2q;}
,'N0g':function(S1g,z1g){return S1g==z1g;}
,'D4B':function(G4B,A4B){return G4B==A4B;}
,'h1t':function(N1t,S8t){return N1t-S8t;}
,'i5p':function(m5p,T5p){return m5p-T5p;}
,'D0t':function(G0t,A0t){return G0t==A0t;}
,'o2K':function(i2K,m2K){return i2K<m2K;}
,'J8g':function(I8g,o8g,i8g){return I8g*o8g*i8g;}
,'p2B':function(M2B,e2B){return M2B!=e2B;}
,'b3F':function(l3F,c3F){return l3F==c3F;}
,'L79':function(F79,r79){return F79==r79;}
,'W1d':function(v1d,d1d){return v1d!=d1d;}
,'P1K':function(g1K,Z1K){return g1K<Z1K;}
,'Y5H':function(V5H,H5H){return V5H<H5H;}
,'T8p':function(U8p,y8p){return U8p/y8p;}
,'E5B':function(W5B,v5B){return W5B<v5B;}
,'J3V':function(I3V,o3V){return I3V>o3V;}
,'P5H':function(g5H,Z5H){return g5H==Z5H;}
,'m2H':function(T2H,U2H){return T2H<=U2H;}
,'t9q':function(s9q,E9q){return s9q in E9q;}
,'S3x':function(z3x,q3x){return z3x<q3x;}
,'d9L':function(J9L,I9L){return J9L>I9L;}
,'O2K':function(x2K,B2K){return x2K-B2K;}
,'u9L':function(Q9L,K9L){return Q9L<K9L;}
,'W5L':function(v5L,d5L){return v5L<=d5L;}
,'V7':function(H7,P7){return H7==P7;}
,'z3V':function(q3V,n3V){return q3V-n3V;}
,'e2G':function(f2G,R2G){return f2G-R2G;}
,'E4p':function(W4p,v4p){return W4p==v4p;}
,'Y1Z':function(V1Z,H1Z){return V1Z*H1Z;}
,'t7F':function(s7F,E7F){return s7F<E7F;}
,'s4g':function(E4g,W4g){return E4g-W4g;}
,'K4V':function(D4V,G4V){return D4V-G4V;}
,'b7Z':function(l7Z,c7Z){return l7Z>c7Z;}
,'u9g':function(Q9g,K9g){return Q9g-K9g;}
,'U0B':function(y0B,O0B){return y0B/O0B;}
,'C1x':function(a1x,h1x){return a1x>h1x;}
,'t8q':function(s8q,E8q){return s8q-E8q;}
,'k6B':function(t6B,s6B){return t6B/s6B;}
,'Y2':function(V2,H2){return V2==H2;}
,'x8B':function(B8B,L8B){return B8B<=L8B;}
,'o4':function(i4,m4){return i4/m4;}
,'V2j':function(H2j,P2j,g2j){return H2j-P2j-g2j;}
,'V5g':function(H5g,P5g){return H5g-P5g;}
,'z4K':function(q4K,n4K){return q4K-n4K;}
,'x0H':function(B0H,L0H){return B0H-L0H;}
,'g3t':function(Z3t,w3t){return Z3t>w3t;}
,'y8q':function(O8q,x8q){return O8q<x8q;}
,'y6V':function(O6V,x6V){return O6V==x6V;}
,'n9x':function(Y9x,V9x){return Y9x*V9x;}
,'z8B':function(q8B,n8B){return q8B-n8B;}
,'y7x':function(O7x,x7x){return O7x*x7x;}
,'d2q':function(J2q,I2q){return J2q in I2q;}
,'i9q':function(m9q,T9q){return m9q!=T9q;}
,'T0F':function(U0F,y0F){return U0F==y0F;}
,'Z3d':function(w3d,b3d){return w3d<b3d;}
,'O8d':function(x8d,B8d){return x8d==B8d;}
,'o8K':function(i8K,m8K){return i8K<m8K;}
,'F8F':function(r8F,u8F){return r8F==u8F;}
,'n9Z':function(Y9Z,V9Z){return Y9Z>=V9Z;}
,'z3g':function(q3g,n3g){return q3g==n3g;}
,'g5j':function(Z5j,w5j){return Z5j*w5j;}
,'u4':function(Q4,K4){return Q4==K4;}
,'y2g':function(O2g,x2g){return O2g*x2g;}
,'R6V':function(C6V,a6V){return C6V*a6V;}
,'n1B':function(Y1B,V1B){return Y1B-V1B;}
,'a6d':function(h6d,N6d){return h6d-N6d;}
,'H2G':function(P2G,g2G){return P2G>g2G;}
,'F7j':function(r7j,u7j){return r7j!=u7j;}
,'c2V':function(j2V,k2V){return j2V<k2V;}
,'E5G':function(W5G,v5G){return W5G==v5G;}
,'o2G':function(i2G,m2G){return i2G<m2G;}
,'c9q':function(j9q,k9q){return j9q/k9q;}
,'d8':function(J8,I8){return J8!=I8;}
,'D8V':function(G8V,A8V){return G8V==A8V;}
,'s4V':function(E4V,W4V){return E4V-W4V;}
,'I8q':function(o8q,i8q){return o8q>i8q;}
,'W1H':function(v1H,d1H){return v1H==d1H;}
,'Y4G':function(V4G,H4G){return V4G-H4G;}
,'a3p':function(h3p,N3p){return h3p!=N3p;}
,'f7g':function(R7g,C7g){return R7g>C7g;}
,'s9j':function(E9j,W9j){return E9j*W9j;}
,'j5d':function(k5d,t5d){return k5d-t5d;}
,'O69':function(x69,B69){return x69-B69;}
,'W8t':function(v8t,d8t){return v8t*d8t;}
,'M9V':function(e9V,f9V){return e9V<=f9V;}
,'V0K':function(H0K,P0K){return H0K-P0K;}
,'K2x':function(D2x,G2x){return D2x<=G2x;}
,'m2p':function(T2p,U2p){return T2p*U2p;}
,'j3q':function(k3q,t3q){return k3q>t3q;}
,'r09':function(u09,Q09){return u09-Q09;}
,'w1H':function(b1H,l1H){return b1H==l1H;}
,'i2B':function(m2B,T2B){return m2B<T2B;}
,'s7':function(E7,W7){return E7!=W7;}
,'x1p':function(B1p,L1p){return B1p==L1p;}
,'e1x':function(f1x,R1x){return f1x<R1x;}
,'i5H':function(m5H,T5H){return m5H==T5H;}
,'K09':function(D09,G09){return D09>G09;}
,'C3x':function(a3x,h3x){return a3x>h3x;}
,'T9Z':function(U9Z,y9Z){return U9Z<y9Z;}
,'H9p':function(P9p,g9p){return P9p<=g9p;}
,'Q1d':function(K1d,D1d){return K1d/D1d;}
,'M2H':function(e2H,f2H){return e2H==f2H;}
,'Z4x':function(w4x,b4x){return w4x==b4x;}
,'x1K':function(B1K,L1K){return B1K<L1K;}
,'w8q':function(b8q,l8q){return b8q*l8q;}
,'q9j':function(n9j,Y9j){return n9j==Y9j;}
,'t3V':function(s3V,E3V){return s3V==E3V;}
,'M1B':function(e1B,f1B){return e1B==f1B;}
,'V71':"A",'T7K':function(U7K,y7K){return U7K<=y7K;}
,'x5H':function(B5H,L5H){return B5H/L5H;}
,'Q7F':function(K7F,D7F){return K7F<D7F;}
,'r2H':function(u2H,Q2H){return u2H>=Q2H;}
,'Z1G':function(w1G,b1G,l1G){return w1G*b1G/l1G;}
,'P2':function(g2,Z2){return g2==Z2;}
,'D8':function(G8,A8){return G8<A8;}
,'l3H':function(c3H,j3H){return c3H-j3H;}
,'a0L':function(h0L,N0L){return h0L>=N0L;}
,'P3g':function(g3g,Z3g){return g3g-Z3g;}
,'O0t':function(x0t,B0t){return x0t in B0t;}
,'b2p':function(l2p,c2p){return l2p*c2p;}
,'v1t':function(d1t,J1t){return d1t==J1t;}
,'X6t':function(p6t,M6t){return p6t!=M6t;}
,'p0B':function(M0B,e0B){return M0B>=e0B;}
,'L9x':function(F9x,r9x){return F9x/r9x;}
,'I0K':function(o0K,i0K){return o0K<i0K;}
,'q7L':function(n7L,Y7L){return n7L<Y7L;}
,'D8K':function(G8K,A8K){return G8K>=A8K;}
,'m0d':function(T0d,U0d){return T0d<U0d;}
,'A1t':function(X1t,p1t){return X1t>p1t;}
,'v09':function(d09,J09){return d09==J09;}
,'C7d':function(a7d,h7d){return a7d==h7d;}
,'d9p':function(J9p,I9p){return J9p/I9p;}
,'O3G':function(x3G,B3G){return x3G==B3G;}
,'p2t':function(M2t,e2t){return M2t==e2t;}
,'M9':function(e9,f9){return e9<f9;}
,'o8Z':function(i8Z,m8Z){return i8Z-m8Z;}
,'Z0g':function(w0g,b0g){return w0g<b0g;}
,'w0x':function(b0x,l0x){return b0x*l0x;}
,'k9p':function(t9p,s9p){return t9p<s9p;}
,'z4d':function(q4d,n4d){return q4d!=n4d;}
,'C3d':function(a3d,h3d){return a3d-h3d;}
,'D3L':function(G3L,A3L){return G3L==A3L;}
,'j39':function(k39,t39){return k39<t39;}
,'Z8Z':function(w8Z,b8Z){return w8Z*b8Z;}
,'Y1q':function(V1q,H1q){return V1q-H1q;}
,'d0G':function(J0G,I0G){return J0G*I0G;}
,'b6':function(l6,c6){return l6>c6;}
,'x1H':function(B1H,L1H){return B1H>L1H;}
,'C7B':function(a7B,h7B){return a7B!=h7B;}
,'e3L':function(f3L,R3L){return f3L*R3L;}
,'o9g':function(i9g,m9g){return i9g-m9g;}
,'j6V':function(k6V,t6V){return k6V==t6V;}
,'A2H':function(X2H,p2H){return X2H>=p2H;}
,'f4d':function(R4d,C4d){return R4d-C4d;}
,'i1q':function(m1q,T1q){return m1q<T1q;}
,'g8x':function(Z8x,w8x){return Z8x-w8x;}
,'M3q':function(e3q,f3q){return e3q-f3q;}
,'I1':function(o1,i1){return o1<i1;}
,'G4d':function(A4d,X4d){return A4d-X4d;}
,'c89':function(j89,k89){return j89>=k89;}
,'p9G':function(M9G,e9G){return M9G<e9G;}
,'v6p':function(d6p,J6p){return d6p==J6p;}
,'L6K':function(F6K,r6K){return F6K>=r6K;}
,'I2M':"e",'C69':function(a69,h69){return a69<=h69;}
,'T2':function(U2,O2){return U2==O2;}
,'f49':function(R49,C49){return R49==C49;}
,'M2Z':function(e2Z,f2Z){return e2Z==f2Z;}
,'x1G':function(B1G,L1G){return B1G-L1G;}
,'x6L':function(B6L,L6L){return B6L-L6L;}
,'U9F':function(y9F,O9F){return y9F<O9F;}
,'Z2d':function(w2d,b2d){return w2d*b2d;}
,'G99':function(A99,X99){return A99<X99;}
,'V1':function(H1,P1){return H1!=P1;}
,'x1Z':function(B1Z,L1Z){return B1Z*L1Z;}
,'I4g':function(o4g,i4g){return o4g==i4g;}
,'b4V':function(l4V,c4V){return l4V/c4V;}
,'g4F':function(Z4F,w4F){return Z4F-w4F;}
,'c5p':function(j5p,k5p){return j5p*k5p;}
,'W4d':function(v4d,d4d){return v4d==d4d;}
,'t3Z':function(s3Z,E3Z){return s3Z<=E3Z;}
,'n8p':function(Y8p,V8p){return Y8p>V8p;}
,'g6Z':function(Z6Z,w6Z){return Z6Z&w6Z;}
,'D4p':function(G4p,A4p){return G4p*A4p;}
,'V6V':function(H6V,P6V){return H6V-P6V;}
,'i7g':function(m7g,T7g){return m7g*T7g;}
,'Q4q':function(K4q,D4q){return K4q==D4q;}
,'I7':function(o7,i7){return o7-i7;}
,'Z1B':function(w1B,b1B){return w1B==b1B;}
,'P5Z':function(g5Z,Z5Z){return g5Z!=Z5Z;}
,'d5G':function(J5G,I5G,o5G){return J5G-I5G+o5G;}
,'f7t':function(R7t,C7t){return R7t>C7t;}
,'M6p':function(e6p,f6p){return e6p<f6p;}
,'p7G':function(M7G,e7G){return M7G<e7G;}
,'I5d':function(o5d,i5d){return o5d-i5d;}
,'c9G':function(j9G,k9G){return j9G>k9G;}
,'H0G':function(P0G,g0G){return P0G/g0G;}
,'m4F':function(T4F,U4F){return T4F==U4F;}
,'D5B':function(G5B,A5B){return G5B-A5B;}
,'X5j':function(p5j,M5j){return p5j==M5j;}
,'H3G':function(P3G,g3G){return P3G*g3G;}
,'x2B':function(B2B,L2B){return B2B>L2B;}
,'G6L':function(A6L,X6L){return A6L!=X6L;}
,'P9g':function(g9g,Z9g,w9g,b9g){return g9g-Z9g+w9g+b9g;}
,'E2q':function(W2q,v2q){return W2q*v2q;}
,'z3':function(q3,n3){return q3/n3;}
,'v7Z':function(d7Z,J7Z){return d7Z*J7Z;}
,'q0d':function(n0d,Y0d){return n0d<Y0d;}
,'a1H':function(h1H,N1H){return h1H-N1H;}
,'j3c':"ch",'r1F':function(u1F,Q1F){return u1F>=Q1F;}
,'C4p':function(a4p,h4p){return a4p-h4p;}
,'e3G':function(f3G,R3G){return f3G>R3G;}
,'k2d':function(t2d,s2d){return t2d<s2d;}
,'C4L':function(a4L,h4L){return a4L<h4L;}
,'V5j':function(H5j,P5j){return H5j==P5j;}
,'l5G':function(c5G,j5G){return c5G<j5G;}
,'u0t':function(Q0t,K0t){return Q0t<K0t;}
,'P1q':function(g1q,Z1q){return g1q>Z1q;}
,'d6t':function(J6t,I6t){return J6t==I6t;}
,'z3p':function(q3p,n3p,Y3p){return q3p-n3p-Y3p;}
,'s2H':function(E2H,W2H){return E2H!=W2H;}
,'m1t':function(T1t,U1t){return T1t!=U1t;}
,'U3Z':function(y3Z,O3Z){return y3Z-O3Z;}
,'b9j':function(l9j,c9j){return l9j-c9j;}
,'k2j':function(t2j,s2j){return t2j>s2j;}
,'b0q':function(l0q,c0q){return l0q*c0q;}
,'G9q':function(A9q,X9q){return A9q*X9q;}
,'A6V':function(X6V,p6V){return X6V-p6V;}
,'c2t':function(j2t,k2t){return j2t==k2t;}
,'B2L':function(L2L,F2L){return L2L==F2L;}
,'q1g':function(n1g,Y1g){return n1g==Y1g;}
,'Z3G':function(w3G,b3G){return w3G==b3G;}
,'S0t':function(z0t,q0t){return z0t>q0t;}
,'A7x':function(X7x,p7x){return X7x<p7x;}
,'x6H':function(B6H,L6H){return B6H/L6H;}
,'C5V':function(a5V,h5V){return a5V*h5V;}
,'n8d':function(Y8d,V8d){return Y8d==V8d;}
,'Z1x':function(w1x,b1x){return w1x<=b1x;}
,'Q1G':function(K1G,D1G,G1G){return K1G*D1G/G1G;}
,'U1Z':function(y1Z,O1Z){return y1Z*O1Z;}
,'z5L':function(q5L,n5L){return q5L<=n5L;}
,'L6t':function(F6t,r6t){return F6t==r6t;}
,'r8V':function(u8V,Q8V,K8V){return u8V*Q8V/K8V;}
,'d8p':function(J8p,I8p){return J8p>=I8p;}
,'P6L':function(g6L,Z6L){return g6L>=Z6L;}
,'N6t':function(S3t,z3t){return S3t-z3t;}
,'L0':function(F0,r0){return F0==r0;}
,'L8Z':function(F8Z,r8Z){return F8Z<=r8Z;}
,'H1B':function(P1B,g1B){return P1B-g1B;}
,'S1L':function(z1L,q1L){return z1L>=q1L;}
,'K7L':function(D7L,G7L){return D7L==G7L;}
,'m5K':function(T5K,U5K){return T5K>U5K;}
,'r7':function(u7,Q7){return u7>=Q7;}
,'z7j':function(q7j,n7j){return q7j/n7j;}
,'a2B':function(h2B,N2B){return h2B-N2B;}
,'A0q':function(X0q,p0q){return X0q-p0q;}
,'A2p':function(X2p,p2p){return X2p-p2p;}
,'b4j':function(l4j,c4j){return l4j==c4j;}
,'y4g':function(O4g,x4g){return O4g==x4g;}
,'s0q':function(E0q,W0q){return E0q<W0q;}
,'p99':function(M99,e99){return M99==e99;}
,'y0d':function(O0d,x0d){return O0d==x0d;}
,'F2t':function(r2t,u2t){return r2t==u2t;}
,'N1V':function(S8V,z8V){return S8V>z8V;}
,'X4Z':function(p4Z,M4Z){return p4Z<M4Z;}
,'f19':function(R19,C19){return R19<C19;}
,'m8q':function(T8q,U8q){return T8q-U8q;}
,'V7G':function(H7G,P7G){return H7G<P7G;}
,'B7B':function(L7B,F7B,r7B){return L7B*F7B/r7B;}
,'T4x':function(U4x,y4x){return U4x*y4x;}
,'w1K':function(b1K,l1K){return b1K/l1K;}
,'F0B':function(r0B,u0B){return r0B in u0B;}
,'V6K':function(H6K,P6K){return H6K-P6K;}
,'Z2j':function(w2j,b2j){return w2j>b2j;}
,'d3x':function(J3x,I3x){return J3x==I3x;}
,'Z8K':function(w8K,b8K){return w8K==b8K;}
,'w2B':function(b2B,l2B){return b2B==l2B;}
,'o0t':function(i0t,m0t){return i0t<m0t;}
,'A8q':function(X8q,p8q){return X8q==p8q;}
,'v2g':function(d2g,J2g){return d2g>=J2g;}
,'K8x':function(D8x,G8x){return D8x<G8x;}
,'V7x':function(H7x,P7x){return H7x>P7x;}
,'s0d':function(E0d,W0d){return E0d<W0d;}
,'v6g':function(d6g,J6g){return d6g-J6g;}
,'z0':function(q0,n0){return q0==n0;}
,'K6':function(D6,G6){return D6-G6;}
,'d0g':function(J0g,I0g){return J0g-I0g;}
,'a8F':function(h8F,N8F){return h8F>N8F;}
,'R1F':function(C1F,a1F){return C1F<a1F;}
,'E1B':function(W1B,J1B){return W1B==J1B;}
,'Z4L':function(w4L,b4L){return w4L*b4L;}
,'k6F':function(t6F,s6F){return t6F*s6F;}
,'T2d':function(U2d,y2d){return U2d-y2d;}
,'J0L':function(I0L,o0L){return I0L>=o0L;}
,'U8B':function(y8B,O8B){return y8B==O8B;}
,'O5F':function(x5F,B5F){return x5F==B5F;}
,'g7x':function(Z7x,w7x){return Z7x<w7x;}
,'N9H':function(S2H,z2H){return S2H-z2H;}
,'i7F':function(m7F,T7F){return m7F<T7F;}
,'F7F':function(r7F,u7F){return r7F>u7F;}
,'U3p':function(y3p,O3p){return y3p<O3p;}
,'a0B':function(h0B,N0B){return h0B==N0B;}
,'i3p':function(m3p,T3p){return m3p!=T3p;}
,'A7Z':function(X7Z,p7Z){return X7Z-p7Z;}
,'k2G':function(t2G,s2G){return t2G<s2G;}
,'T4':function(U4,y4){return U4==y4;}
,'j7Z':function(k7Z,t7Z){return k7Z==t7Z;}
,'v59':function(d59,J59){return d59<J59;}
,'r7Z':function(u7Z,Q7Z){return u7Z>Q7Z;}
,'u0g':function(Q0g,K0g){return Q0g==K0g;}
,'l4x':function(c4x,j4x){return c4x==j4x;}
,'y9':function(O9,x9){return O9<x9;}
,'F1g':function(r1g,u1g){return r1g/u1g;}
,'M9H':function(e9H,f9H){return e9H!=f9H;}
,'C5F':function(a5F,h5F){return a5F-h5F;}
,'G2t':function(A2t,X2t){return A2t==X2t;}
,'A3q':function(X3q,p3q){return X3q/p3q;}
,'N7B':function(S0B,z0B){return S0B!=z0B;}
,'P0H':function(g0H,Z0H){return g0H<Z0H;}
,'S6t':function(z6t,q6t){return z6t<=q6t;}
,'a9q':function(h9q,N9q){return h9q!=N9q;}
,'F0L':function(r0L,u0L){return r0L>=u0L;}
,'r0d':function(u0d,Q0d){return u0d<Q0d;}
,'U7j':function(y7j,O7j){return y7j!=O7j;}
,'s5d':function(E5d,W5d){return E5d-W5d;}
,'I4G':function(o4G,i4G){return o4G-i4G;}
,'u3d':function(Q3d,K3d){return Q3d-K3d;}
,'E6t':function(W6t,v6t){return W6t==v6t;}
,'j8L':function(k8L,t8L){return k8L>t8L;}
,'q3F':function(n3F,Y3F){return n3F<Y3F;}
,'Z3x':function(w3x,b3x){return w3x<b3x;}
,'T1L':function(U1L,y1L){return U1L-y1L;}
,'o5g':function(i5g,m5g){return i5g-m5g;}
,'J19':function(I19,o19){return I19==o19;}
,'l1L':function(c1L,j1L){return c1L<=j1L;}
,'z9g':function(q9g,n9g){return q9g-n9g;}
,'R7x':function(C7x,a7x){return C7x-a7x;}
,'g09':function(Z09,w09){return Z09==w09;}
,'d9Z':function(J9Z,I9Z){return J9Z==I9Z;}
,'O79':function(x79,B79){return x79==B79;}
,'Y8g':function(V8g,H8g){return V8g==H8g;}
,'G5p':function(A5p,X5p){return A5p<X5p;}
,'e69':function(f69,R69){return f69==R69;}
,'g7B':function(Z7B,w7B){return Z7B==w7B;}
,'G0L':function(A0L,X0L){return A0L>=X0L;}
,'c9B':function(j9B,k9B){return j9B<k9B;}
,'U5p':function(y5p,O5p){return y5p!=O5p;}
,'j3F':function(k3F,t3F){return k3F*t3F;}
,'e4L':function(f4L,R4L){return f4L==R4L;}
,'c8B':function(j8B,k8B){return j8B==k8B;}
,'R6g':function(C6g,a6g){return C6g/a6g;}
,'V2Z':function(H2Z,P2Z){return H2Z==P2Z;}
,'J1d':function(I1d,o1d){return I1d<o1d;}
,'Q9q':function(K9q,D9q){return K9q in D9q;}
,'G5L':function(A5L,X5L){return A5L<X5L;}
,'z1d':function(q1d,n1d){return q1d==n1d;}
,'F89':function(r89,u89){return r89==u89;}
,'A9K':function(X9K,p9K,M9K){return X9K-p9K+M9K;}
,'w7F':function(b7F,l7F){return b7F-l7F;}
,'b6Z':function(l6Z,c6Z){return l6Z>=c6Z;}
,'y7H':function(O7H,x7H){return O7H!=x7H;}
,'H2F':function(P2F,g2F){return P2F==g2F;}
,'v4B':function(d4B,J4B,I4B){return d4B-J4B-I4B;}
,'o4B':function(i4B,m4B){return i4B-m4B;}
,'T5B':function(U5B,y5B){return U5B<y5B;}
,'A5d':function(X5d,p5d){return X5d!=p5d;}
,'H29':function(P29,g29){return P29!=g29;}
,'P7t':function(g7t,Z7t){return g7t*Z7t;}
,'f4K':function(R4K,C4K){return R4K==C4K;}
,'W6L':function(v6L,d6L){return v6L==d6L;}
,'b0V':function(l0V,c0V){return l0V-c0V;}
,'X4B':function(p4B,M4B){return p4B-M4B;}
,'r5d':function(u5d,Q5d){return u5d-Q5d;}
,'j7x':function(k7x,t7x){return k7x<=t7x;}
,'w8G':function(b8G,l8G){return b8G*l8G;}
,'S4Z':function(z4Z,q4Z){return z4Z-q4Z;}
,'Q5p':function(K5p,D5p){return K5p-D5p;}
,'t8g':function(s8g,E8g){return s8g/E8g;}
,'Z0j':function(w0j,b0j){return w0j==b0j;}
,'t9F':function(s9F,E9F){return s9F/E9F;}
,'J0B':function(I0B,o0B){return I0B==o0B;}
,'H4H':function(P4H,g4H){return P4H/g4H;}
,'B7':function(L7,F7){return L7-F7;}
,'O8K':function(x8K,B8K){return x8K==B8K;}
,'V2g':function(H2g,P2g){return H2g>=P2g;}
,'q6Z':function(n6Z,Y6Z){return n6Z<=Y6Z;}
,'X8p':function(p8p,M8p){return p8p!=M8p;}
,'z5p':function(q5p,n5p){return q5p<n5p;}
,'w89':function(b89,l89){return b89<l89;}
,'m2g':function(T2g,U2g){return T2g<=U2g;}
,'T2q':function(U2q,y2q){return U2q*y2q;}
,'M7H':function(e7H,f7H){return e7H-f7H;}
,'S9p':function(z9p,q9p){return z9p-q9p;}
,'B4j':function(L4j,F4j){return L4j<F4j;}
,'W6x':function(v6x,d6x){return v6x-d6x;}
,'U1d':function(y1d,O1d){return y1d<O1d;}
,'W5Z':function(v5Z,d5Z){return v5Z-d5Z;}
,'e4':function(f4,R4){return f4==R4;}
,'B7Z':function(L7Z,F7Z){return L7Z<F7Z;}
,'p9d':function(M9d,e9d){return M9d==e9d;}
,'r9B':function(u9B,Q9B){return u9B<Q9B;}
,'d7K':function(J7K,I7K){return J7K==I7K;}
,'C4H':function(a4H,h4H){return a4H/h4H;}
,'O9p':function(x9p,B9p){return x9p/B9p;}
,'G5Z':function(A5Z,X5Z){return A5Z<X5Z;}
,'b4F':function(l4F,c4F){return l4F==c4F;}
,'h7':function(N7,S0){return N7==S0;}
,'H9x':function(P9x,g9x){return P9x*g9x;}
,'Q1p':function(K1p,D1p){return K1p*D1p;}
,'s2p':function(E2p,W2p){return E2p<=W2p;}
,'U1H':function(y1H,O1H){return y1H/O1H;}
,'e0G':function(f0G,R0G){return f0G-R0G;}
,'Q7G':function(K7G,D7G){return K7G*D7G;}
,'n6t':function(Y6t,V6t){return Y6t-V6t;}
,'Y0x':function(V0x,H0x){return V0x-H0x;}
,'d6d':function(J6d,I6d){return J6d==I6d;}
,'J4K':function(I4K,o4K){return I4K<o4K;}
,'H8p':function(P8p,g8p){return P8p/g8p;}
,'N0F':function(S1F,z1F){return S1F<z1F;}
,'S2q':function(z2q,q2q){return z2q/q2q;}
,'I1B':function(o1B,i1B){return o1B==i1B;}
,'f1d':function(R1d,C1d){return R1d==C1d;}
,'k1L':function(t1L,s1L){return t1L<s1L;}
,'N3x':function(S9H,z9H){return S9H==z9H;}
,'q2L':function(n2L,Y2L){return n2L==Y2L;}
,'l9x':function(c9x,j9x){return c9x<j9x;}
,'Z7d':function(w7d,b7d){return w7d<b7d;}
,'P8B':function(g8B,Z8B){return g8B==Z8B;}
,'T2K':function(U2K,y2K){return U2K>=y2K;}
,'m9K':function(T9K,U9K){return T9K-U9K;}
,'T9g':function(U9g,y9g){return U9g==y9g;}
,'C7V':function(a7V,h7V){return a7V!=h7V;}
,'Y6L':function(V6L,H6L){return V6L<H6L;}
,'I09':function(o09,i09){return o09==i09;}
,'X79':function(p79,M79){return p79!=M79;}
,'c1p':function(j1p,k1p){return j1p!=k1p;}
,'f1K':function(R1K,C1K){return R1K>C1K;}
,'A1B':function(X1B,p1B){return X1B==p1B;}
,'w3V':function(b3V,l3V){return b3V!=l3V;}
,'M0d':function(e0d,f0d){return e0d*f0d;}
,'C2K':function(a2K,h2K){return a2K-h2K;}
,'b1F':function(l1F,c1F){return l1F==c1F;}
,'V7p':function(H7p,P7p){return H7p>P7p;}
,'b5q':function(l5q,c5q){return l5q==c5q;}
,'r6q':function(u6q,Q6q){return u6q!=Q6q;}
,'l6t':function(c6t,j6t){return c6t==j6t;}
,'j6':function(k6,t6){return k6>t6;}
,'m6V':function(T6V,U6V){return T6V-U6V;}
,'c9F':function(j9F,k9F){return j9F>=k9F;}
,'h9B':function(N9B,S2B){return N9B<S2B;}
,'v8x':function(d8x,J8x){return d8x<J8x;}
,'c4q':function(j4q,k4q){return j4q==k4q;}
,'O5t':function(x5t,B5t){return x5t-B5t;}
,'w8B':function(b8B,l8B){return b8B>l8B;}
,'L5t':function(F5t,r5t){return F5t==r5t;}
,'k8H':function(t8H,s8H){return t8H-s8H;}
,'k3H':function(t3H,s3H){return t3H<s3H;}
,'P0':function(g0,Z0){return g0==Z0;}
,'G6G':function(A6G,X6G){return A6G<X6G;}
,'y6B':function(O6B,x6B){return O6B*x6B;}
,'g3K':function(Z3K,w3K){return Z3K>=w3K;}
,'Y5L':function(V5L,H5L){return V5L>H5L;}
,'D1L':function(G1L,A1L){return G1L==A1L;}
,'C4Z':function(a4Z,h4Z){return a4Z<=h4Z;}
,'O2j':function(x2j,B2j){return x2j!=B2j;}
,'b5d':function(l5d,c5d){return l5d/c5d;}
,'t0x':function(s0x,E0x){return s0x==E0x;}
,'r9H':function(u9H,Q9H){return u9H!=Q9H;}
,'X0G':function(p0G,M0G){return p0G>M0G;}
,'P3Z':function(g3Z,Z3Z){return g3Z-Z3Z;}
,'i3':function(m3,T3){return m3==T3;}
,'h1j':5,'x8F':function(B8F,L8F){return B8F==L8F;}
,'u6K':function(Q6K,K6K){return Q6K-K6K;}
,'A3t':function(X3t,p3t){return X3t/p3t;}
,'b9H':function(l9H,c9H){return l9H==c9H;}
,'J4q':function(I4q,o4q){return I4q==o4q;}
,'j6K':function(k6K,t6K){return k6K-t6K;}
,'x8G':function(B8G,L8G){return B8G==L8G;}
,'C5':function(a5,h5){return a5!=h5;}
,'b09':function(l09,c09){return l09==c09;}
,'o2j':function(i2j,m2j){return i2j>m2j;}
,'v8L':function(d8L,J8L){return d8L==J8L;}
,'H5t':function(P5t,g5t){return P5t*g5t;}
,'o69':function(i69,m69){return i69==m69;}
,'W9F':function(v9F,d9F){return v9F==d9F;}
,'F1Z':function(r1Z,u1Z){return r1Z==u1Z;}
,'e4B':function(f4B,R4B){return f4B==R4B;}
,'Y6q':function(V6q,H6q){return V6q<H6q;}
,'x1d':function(B1d,L1d){return B1d!=L1d;}
,'H79':function(P79,g79){return P79<=g79;}
,'U8G':function(y8G,O8G){return y8G>O8G;}
,'y5j':function(O5j,x5j){return O5j<x5j;}
,'P9G':function(g9G,Z9G){return g9G*Z9G;}
,'i19':function(m19,T19){return m19<T19;}
,'m0q':function(T0q,U0q){return T0q-U0q;}
,'u5t':function(Q5t,K5t){return Q5t-K5t;}
,'k4Z':function(t4Z,s4Z){return t4Z>s4Z;}
,'d8K':function(J8K,I8K){return J8K>I8K;}
,'S69':function(z69,q69){return z69==q69;}
,'A1G':function(X1G,p1G){return X1G==p1G;}
,'i7V':function(m7V,T7V){return m7V<T7V;}
,'y7p':function(O7p,x7p){return O7p*x7p;}
,'D4G':function(G4G,A4G){return G4G==A4G;}
,'h1F':function(N1F,S8F){return N1F==S8F;}
,'o3H':function(i3H,m3H){return i3H==m3H;}
,'y6q':function(O6q,x6q){return O6q-x6q;}
,'U4K':function(y4K,O4K){return y4K==O4K;}
,'P5x':function(g5x,Z5x){return g5x*Z5x;}
,'Y4d':function(V4d,H4d){return V4d==H4d;}
,'h3V':function(N3V,S9F){return N3V*S9F;}
,'A9B':function(X9B,p9B){return X9B==p9B;}
,'Y0p':function(V0p,H0p){return V0p-H0p;}
,'s2L':function(E2L,W2L){return E2L>W2L;}
,'t2B':function(s2B,E2B){return s2B-E2B;}
,'S1x':function(z1x,q1x){return z1x==q1x;}
,'k0F':function(t0F,s0F){return t0F<s0F;}
,'f0B':function(R0B,C0B){return R0B==C0B;}
,'Z8':function(w8,b8){return w8!=b8;}
,'N5j':function(S4j,z4j){return S4j-z4j;}
,'Q1K':function(K1K,D1K){return K1K==D1K;}
,'G6x':function(A6x,X6x){return A6x<X6x;}
,'R7p':function(C7p,a7p){return C7p==a7p;}
,'L3H':function(F3H,r3H){return F3H-r3H;}
,'H8':function(P8,g8){return P8-g8;}
,'q6p':function(n6p,Y6p){return n6p-Y6p;}
,'P3M':17,'C9Z':function(a9Z,h9Z){return a9Z<h9Z;}
,'O0F':function(x0F,B0F){return x0F-B0F;}
,'h6V':function(N6V,S3V){return N6V*S3V;}
,'B2x':function(L2x,F2x){return L2x==F2x;}
,'i0L':function(m0L,T0L){return m0L/T0L;}
,'a1K':function(h1K,N1K){return h1K<N1K;}
,'l0j':function(c0j,j0j){return c0j instanceof j0j;}
,'k9L':function(t9L,s9L){return t9L*s9L;}
,'y0V':function(O0V,x0V){return O0V*x0V;}
,'v4g':function(d4g,J4g){return d4g-J4g;}
,'f6H':function(R6H,C6H){return R6H==C6H;}
,'T5g':function(U5g,y5g){return U5g==y5g;}
,'s9t':function(E9t,W9t){return E9t<W9t;}
,'y7':function(O7,x7){return O7<x7;}
,'D0G':function(G0G,A0G){return G0G<A0G;}
,'I4j':function(o4j,i4j){return o4j==i4j;}
,'C5B':function(a5B,h5B){return a5B<h5B;}
,'D8p':function(G8p,A8p){return G8p/A8p;}
,'N7d':function(S0d,z0d){return S0d!==z0d;}
,'g4B':function(Z4B,w4B){return Z4B==w4B;}
,'v3F':function(d3F,J3F){return d3F*J3F;}
,'W4K':function(v4K,d4K){return v4K/d4K;}
,'C4B':function(a4B,h4B){return a4B-h4B;}
,'j7B':function(k7B,t7B){return k7B==t7B;}
,'J3p':function(I3p,o3p){return I3p!=o3p;}
,'P4d':function(g4d,Z4d){return g4d!=Z4d;}
,'y2L':function(O2L,x2L){return O2L>x2L;}
,'w1Z':function(b1Z,l1Z){return b1Z<l1Z;}
,'H8H':function(P8H,g8H){return P8H-g8H;}
,'x3V':function(B3V,L3V){return B3V>L3V;}
,'O7K':function(x7K,B7K){return x7K==B7K;}
,'E0j':function(W0j,v0j){return W0j/v0j;}
,'c7g':function(j7g,k7g){return j7g<k7g;}
,'t49':function(s49,E49){return s49-E49;}
,'h8L':function(N8L,S6L){return N8L<S6L;}
,'t2t':function(s2t,E2t){return s2t==E2t;}
,'y9B':function(O9B,x9B){return O9B==x9B;}
,'z9G':function(q9G,n9G){return q9G<n9G;}
,'K4F':function(D4F,G4F){return D4F==G4F;}
,'H5V':function(P5V,g5V){return P5V/g5V;}
,'j2H':function(k2H,t2H){return k2H!=t2H;}
,'j1F':function(k1F,t1F){return k1F<t1F;}
,'W3g':function(v3g,d3g){return v3g==d3g;}
,'m6q':function(T6q,U6q){return T6q>=U6q;}
,'u29':function(Q29,K29){return Q29<K29;}
,'d5B':function(J5B,I5B){return J5B>=I5B;}
,'D9L':function(G9L,A9L){return G9L-A9L;}
,'U4d':function(y4d,O4d){return y4d<O4d;}
,'Q3V':function(K3V,D3V){return K3V==D3V;}
,'z6x':function(q6x,n6x){return q6x/n6x;}
,'V6d':function(H6d,P6d){return H6d/P6d;}
,'W0x':function(v0x,d0x){return v0x!=d0x;}
,'z99':function(q99,n99){return q99==n99;}
,'n3x':function(Y3x,V3x){return Y3x<V3x;}
,'M0q':function(e0q,f0q){return e0q>=f0q;}
,'R4V':function(C4V,a4V){return C4V/a4V;}
,'w0H':function(b0H,l0H){return b0H!=l0H;}
,'q3K':function(n3K,Y3K){return n3K-Y3K;}
,'C9g':function(a9g,h9g){return a9g==h9g;}
,'V7B':function(H7B,P7B){return H7B-P7B;}
,'r39':function(u39,Q39){return u39%Q39;}
,'H7K':function(P7K,g7K){return P7K==g7K;}
,'a8G':function(h8G,N8G){return h8G==N8G;}
,'X6K':function(p6K,M6K){return p6K<M6K;}
,'W0p':function(v0p,d0p){return v0p==d0p;}
,'a89':function(h89,N89){return h89==N89;}
,'y6':function(O6,x6){return O6==x6;}
,'j59':function(k59,t59){return k59<t59;}
,'A59':function(X59,p59){return X59/p59;}
,'r4F':function(u4F,Q4F){return u4F==Q4F;}
,'Y3g':function(V3g,H3g){return V3g-H3g;}
,'f0x':function(R0x,C0x){return R0x*C0x;}
,'T9p':function(U9p,y9p){return U9p-y9p;}
,'f8H':function(R8H,C8H,a8H){return R8H*C8H/a8H;}
,'f3p':function(R3p,C3p){return R3p-C3p;}
,'g5g':function(Z5g,w5g,b5g){return Z5g*w5g/b5g;}
,'l8p':function(c8p,j8p){return c8p/j8p;}
,'S4L':function(z4L,q4L){return z4L<q4L;}
,'Y3Z':function(V3Z,H3Z){return V3Z<H3Z;}
,'L4Z':function(F4Z,r4Z){return F4Z<r4Z;}
,'x3p':function(B3p,L3p){return B3p<L3p;}
,'e5j':function(f5j,R5j){return f5j==R5j;}
,'q2H':function(n2H,Y2H){return n2H-Y2H;}
,'j09':function(k09,t09){return k09<t09;}
,'I4F':function(o4F,i4F){return o4F-i4F;}
,'m3q':function(T3q,U3q){return T3q*U3q;}
,'D8g':function(G8g,A8g){return G8g<A8g;}
,'F7g':function(r7g,u7g){return r7g>u7g;}
,'X5B':function(p5B,M5B){return p5B-M5B;}
,'L3d':function(F3d,r3d){return F3d-r3d;}
,'y4t':function(O4t,x4t){return O4t*x4t;}
,'g2x':function(Z2x,w2x){return Z2x in w2x;}
,'P7F':function(g7F,Z7F){return g7F-Z7F;}
,'d5':function(J5,I5){return J5/I5;}
,'i9V':function(m9V,T9V,U9V){return m9V*T9V/U9V;}
,'t8B':function(s8B,E8B){return s8B<E8B;}
,'j6g':function(k6g,t6g){return k6g-t6g;}
,'R9t':function(C9t,a9t){return C9t<a9t;}
,'u8d':function(Q8d,K8d){return Q8d/K8d;}
,'E2d':function(W2d,v2d){return W2d-v2d;}
,'Z3L':function(w3L,b3L){return w3L==b3L;}
,'b8x':function(l8x,c8x){return l8x*c8x;}
,'r9V':function(u9V,Q9V){return u9V/Q9V;}
,'i8t':function(m8t,T8t){return m8t==T8t;}
,'V0q':function(H0q,P0q){return H0q!=P0q;}
,'F3':function(r3,u3){return r3<u3;}
,'v3K':function(d3K,J3K){return d3K>=J3K;}
,'q9V':function(n9V,Y9V){return n9V<Y9V;}
,'m3F':function(T3F,U3F){return T3F*U3F;}
,'D1V':function(G1V,A1V){return G1V>=A1V;}
,'B0K':function(L0K,F0K){return L0K==F0K;}
,'R4g':function(C4g,a4g){return C4g-a4g;}
,'y5K':function(O5K,x5K){return O5K<x5K;}
,'H1x':function(P1x,g1x){return P1x==g1x;}
,'C1V':function(a1V,h1V){return a1V/h1V;}
,'G6d':function(A6d,X6d){return A6d>=X6d;}
,'B8V':function(L8V,F8V){return L8V==F8V;}
,'p89':function(M89,e89){return M89/e89;}
,'l5g':function(c5g,j5g){return c5g>j5g;}
,'Q0p':function(K0p,D0p){return K0p==D0p;}
,'B09':function(L09,F09){return L09<F09;}
,'v2H':function(d2H,J2H){return d2H/J2H;}
,'O4p':function(x4p,B4p){return x4p==B4p;}
,'I7L':function(o7L,i7L){return o7L/i7L;}
,'w9F':function(b9F,l9F){return b9F-l9F;}
,'c5H':function(j5H,k5H){return j5H>k5H;}
,'n0j':function(Y0j,V0j){return Y0j==V0j;}
,'k2K':function(t2K,s2K){return t2K==s2K;}
,'k29':function(t29,s29){return t29*s29;}
,'r6B':function(u6B,Q6B){return u6B-Q6B;}
,'V9j':function(H9j,P9j){return H9j!=P9j;}
,'b9t':function(l9t,c9t){return l9t>c9t;}
,'B1q':function(L1q,F1q){return L1q<F1q;}
,'Z7q':function(w7q,b7q){return w7q!=b7q;}
,'U9q':function(y9q,O9q){return y9q*O9q;}
,'F4K':function(r4K,u4K){return r4K/u4K;}
,'Z6F':function(w6F,b6F){return w6F<b6F;}
,'p0H':function(M0H,e0H){return M0H>e0H;}
,'A4F':function(X4F,p4F){return X4F/p4F;}
,'b0d':function(l0d,c0d){return l0d-c0d;}
,'f99':function(R99,C99){return R99==C99;}
,'N2j':function(S5j,z5j){return S5j-z5j;}
,'L4G':function(F4G,r4G){return F4G<=r4G;}
,'G1d':function(A1d,X1d){return A1d>=X1d;}
,'q59':function(n59,Y59){return n59>Y59;}
,'E4Z':function(W4Z,v4Z){return W4Z==v4Z;}
,'V3B':function(H3B,P3B){return H3B==P3B;}
,'S8d':function(z8d,q8d){return z8d/q8d;}
,'o2':function(i2,m2){return i2==m2;}
,'C2q':function(a2q,h2q){return a2q*h2q;}
,'t6q':function(s6q,E6q){return s6q==E6q;}
,'H0F':function(P0F,g0F){return P0F==g0F;}
,'e5F':function(f5F,R5F){return f5F<R5F;}
,'e4Z':function(f4Z,R4Z){return f4Z>=R4Z;}
,'o9p':function(i9p,m9p){return i9p/m9p;}
,'r3B':function(u3B,Q3B){return u3B==Q3B;}
,'p1p':function(M1p,e1p){return M1p/e1p;}
,'s4j':function(E4j,W4j){return E4j<W4j;}
,'I9B':function(o9B,i9B){return o9B==i9B;}
,'w4K':function(b4K,l4K){return b4K<=l4K;}
,'J8B':function(I8B,o8B){return I8B>o8B;}
,'L0g':function(F0g,r0g){return F0g==r0g;}
,'j5q':function(k5q,t5q){return k5q<=t5q;}
,'p0x':function(M0x,e0x){return M0x!=e0x;}
,'I3F':function(o3F,i3F){return o3F==i3F;}
,'k0g':function(t0g,s0g){return t0g-s0g;}
,'s6p':function(E6p,W6p){return E6p<W6p;}
,'h1G':function(N1G,S8G){return N1G-S8G;}
,'q4V':function(n4V,Y4V){return n4V/Y4V;}
,'h3q':function(N3q,S9B){return N3q<=S9B;}
,'M9t':function(e9t,f9t){return e9t==f9t;}
,'Y3V':function(V3V,H3V){return V3V<=H3V;}
,'b8V':function(l8V,c8V){return l8V>c8V;}
,'S1H':function(z1H,q1H,n1H){return z1H-q1H-n1H;}
,'u9x':function(Q9x,K9x){return Q9x==K9x;}
,'Z0G':function(w0G,b0G){return w0G<b0G;}
,'c7F':function(j7F,k7F){return j7F<k7F;}
,'G3g':function(A3g,X3g){return A3g<X3g;}
,'z8F':function(q8F,n8F){return q8F==n8F;}
,'w1p':function(b1p,l1p){return b1p-l1p;}
,'j0d':function(k0d,t0d){return k0d-t0d;}
,'M6B':function(e6B,f6B){return e6B==f6B;}
,'k5t':function(t5t,s5t){return t5t-s5t;}
,'a9d':function(h9d,N9d){return h9d==N9d;}
,'C79':function(a79,h79){return a79==h79;}
,'d5V':function(J5V,I5V){return J5V<I5V;}
,'A1q':function(X1q,p1q){return X1q-p1q;}
,'T3x':function(U3x,y3x){return U3x==y3x;}
,'V7Z':function(H7Z,P7Z){return H7Z>=P7Z;}
,'I2g':function(o2g,i2g){return o2g==i2g;}
,'q2g':function(n2g,Y2g){return n2g>=Y2g;}
,'k1x':function(t1x,s1x){return t1x*s1x;}
,'K2p':function(D2p,G2p){return D2p<G2p;}
,'O7G':function(x7G,B7G){return x7G<B7G;}
,'E79':function(W79,v79){return W79/v79;}
,'C2G':function(a2G,h2G){return a2G>h2G;}
,'S9L':function(z9L,q9L){return z9L>q9L;}
,'D5t':function(G5t,A5t){return G5t==A5t;}
,'t7t':function(s7t,E7t){return s7t>E7t;}
,'W8G':function(v8G,d8G){return v8G-d8G;}
,'I9':function(o9,i9){return o9!=i9;}
,'K9V':function(D9V,G9V){return D9V/G9V;}
,'I0q':function(o0q,i0q){return o0q-i0q;}
,'J9F':function(I9F,o9F){return I9F==o9F;}
,'L9Z':function(F9Z,r9Z){return F9Z<r9Z;}
,'s4F':function(E4F,W4F){return E4F/W4F;}
,'K6V':function(D6V,G6V){return D6V<=G6V;}
,'s6Z':function(E6Z,W6Z){return E6Z<=W6Z;}
,'n3G':function(Y3G,V3G){return Y3G-V3G;}
,'n4H':function(Y4H,V4H){return Y4H>V4H;}
,'h7x':function(N7x,S0x){return N7x<=S0x;}
,'J3g':function(I3g,o3g){return I3g*o3g;}
,'j0K':function(k0K,t0K){return k0K==t0K;}
,'d9x':function(J9x,I9x){return J9x>I9x;}
,'f6d':function(R6d,C6d){return R6d-C6d;}
,'e3d':function(f3d,R3d){return f3d-R3d;}
,'R3K':function(C3K,a3K){return C3K>a3K;}
,'T1V':function(U1V,y1V){return U1V<y1V;}
,'F6L':function(r6L,u6L){return r6L*u6L;}
,'R3q':function(C3q,a3q){return C3q-a3q;}
,'v3t':function(d3t,J3t){return d3t-J3t;}
,'q7B':function(n7B,Y7B){return n7B==Y7B;}
,'C8d':function(a8d,h8d){return a8d!=h8d;}
,'D4x':function(G4x,A4x){return G4x>A4x;}
,'H5B':function(P5B,g5B){return P5B==g5B;}
,'b0K':function(l0K,c0K){return l0K<c0K;}
,'z0p':function(q0p,n0p){return q0p==n0p;}
,'W2t':function(v2t,d2t){return v2t==d2t;}
,'v8V':function(d8V,J8V){return d8V-J8V;}
,'A9V':function(X9V,p9V){return X9V<p9V;}
,'p8t':function(M8t,e8t){return M8t<e8t;}
,'O7q':function(x7q,B7q){return x7q==B7q;}
,'Z7K':function(w7K,b7K){return w7K>b7K;}
,'o7K':function(i7K,m7K){return i7K==m7K;}
,'q4g':function(n4g,Y4g){return n4g>Y4g;}
,'x0B':function(B0B,L0B){return B0B<L0B;}
,'U5H':function(y5H,O5H){return y5H==O5H;}
,'h5q':function(N5q,S4q){return N5q<S4q;}
,'f0H':function(R0H,C0H){return R0H!=C0H;}
,'A5q':function(X5q,p5q){return X5q<p5q;}
,'b7H':function(l7H,c7H){return l7H-c7H;}
,'P7j':function(g7j,Z7j){return g7j>Z7j;}
,'r5K':function(u5K,Q5K){return u5K-Q5K;}
,'c49':function(j49,k49){return j49==k49;}
,'P2t':function(g2t,Z2t){return g2t==Z2t;}
,'G8F':function(A8F,X8F){return A8F>X8F;}
,'g1g':function(Z1g,w1g){return Z1g==w1g;}
,'h0':function(N0,S1,z1){return N0*S1*z1;}
,'H1G':function(P1G,g1G){return P1G<g1G;}
,'r2p':function(u2p,Q2p){return u2p/Q2p;}
,'I6':function(o6,i6){return o6==i6;}
,'o3G':function(i3G,m3G){return i3G==m3G;}
,'b2x':function(l2x,c2x){return l2x<c2x;}
,'r0V':function(u0V,Q0V,K0V){return u0V*Q0V/K0V;}
,'l79':function(c79,j79){return c79/j79;}
,'Q6G':function(K6G,D6G){return K6G==D6G;}
,'q7x':function(n7x,Y7x){return n7x<Y7x;}
,'d1L':function(J1L,I1L){return J1L<I1L;}
,'s7x':function(E7x,W7x){return E7x==W7x;}
,'a0x':function(h0x,N0x){return h0x*N0x;}
,'L8g':function(F8g,r8g){return F8g*r8g;}
,'y09':function(O09,x09){return O09-x09;}
,'p8G':function(M8G,e8G){return M8G*e8G;}
,'w5p':function(b5p,l5p){return b5p/l5p;}
,'r5j':function(u5j,Q5j){return u5j==Q5j;}
,'o5B':function(i5B,m5B){return i5B>=m5B;}
,'t8F':function(s8F,E8F){return s8F<E8F;}
,'m2L':function(T2L,U2L){return T2L<U2L;}
,'q6V':function(n6V,Y6V){return n6V<Y6V;}
,'a2t':function(h2t,N2t){return h2t==N2t;}
,'b2H':function(l2H,c2H){return l2H!=c2H;}
,'W89':function(v89,d89){return v89<=d89;}
,'B3B':function(L3B,F3B){return L3B>F3B;}
,'t1K':function(s1K,E1K){return s1K==E1K;}
,'I6q':function(o6q,i6q){return o6q-i6q;}
,'Z29':function(w29,b29){return w29==b29;}
,'o7q':function(i7q,m7q){return i7q>m7q;}
,'M8x':function(e8x,f8x){return e8x/f8x;}
,'p19':function(M19,e19){return M19<e19;}
,'Y7t':function(V7t,H7t){return V7t==H7t;}
,'b6K':function(l6K,c6K){return l6K<c6K;}
,'f5H':function(R5H,C5H){return R5H*C5H;}
,'b5F':function(l5F,c5F){return l5F*c5F;}
,'I9H':function(o9H,i9H){return o9H/i9H;}
,'i8B':function(m8B,T8B){return m8B-T8B;}
,'h2p':function(N2p,S5p){return N2p-S5p;}
,'u5V':function(Q5V,K5V){return Q5V==K5V;}
,'h3K':function(N3K,S9G){return N3K/S9G;}
,'z2B':function(q2B,n2B){return q2B>n2B;}
,'G8H':function(A8H,X8H){return A8H-X8H;}
,'R9H':function(C9H,a9H,h9H){return C9H-a9H-h9H;}
,'y0Z':function(O0Z,x0Z){return O0Z&x0Z;}
,'j4V':function(k4V,t4V){return k4V/t4V;}
,'q5d':function(n5d,Y5d){return n5d<=Y5d;}
,'M4j':function(e4j,f4j){return e4j==f4j;}
,'Y7V':function(V7V,H7V){return V7V-H7V;}
,'S9x':function(z9x,q9x){return z9x>q9x;}
,'Y9g':function(V9g,H9g){return V9g/H9g;}
,'e7q':function(f7q,R7q){return f7q<R7q;}
,'t4d':function(s4d,E4d){return s4d==E4d;}
,'W1K':function(v1K,d1K){return v1K-d1K;}
,'K9t':function(D9t,G9t){return D9t>G9t;}
,'j3t':function(k3t,t3t){return k3t-t3t;}
,'A9j':function(X9j,p9j){return X9j!=p9j;}
,'E4H':function(W4H,v4H){return W4H-v4H;}
,'l1x':function(c1x,j1x){return c1x-j1x;}
,'k9g':function(t9g,s9g){return t9g==s9g;}
,'w19':function(b19,l19){return b19==l19;}
,'n8Z':function(Y8Z,V8Z){return Y8Z<V8Z;}
,'c1d':function(j1d,k1d){return j1d==k1d;}
,'p7j':function(M7j,e7j){return M7j>=e7j;}
,'s3F':function(E3F,W3F){return E3F==W3F;}
,'j4F':function(k4F,t4F){return k4F==t4F;}
,'a5L':function(h5L,N5L){return h5L==N5L;}
,'t89':function(s89,E89){return s89>E89;}
,'T6t':function(U6t,y6t){return U6t==y6t;}
,'m7Z':function(T7Z,U7Z){return T7Z-U7Z;}
,'G5G':function(A5G,X5G){return A5G-X5G;}
,'x99':function(B99,L99){return B99-L99;}
,'r6g':function(u6g,Q6g){return u6g<=Q6g;}
,'Z9Z':function(w9Z,b9Z){return w9Z<b9Z;}
,'n6B':function(Y6B,V6B){return Y6B-V6B;}
,'B1F':function(L1F,F1F){return L1F-F1F;}
,'m09':function(T09,U09){return T09==U09;}
,'d8Z':function(J8Z,I8Z){return J8Z<I8Z;}
,'k8p':function(t8p,s8p){return t8p/s8p;}
,'o29':function(i29,m29){return i29-m29;}
,'m8g':function(T8g,U8g,y8g){return T8g*U8g*y8g;}
,'i3Z':function(m3Z,T3Z){return m3Z==T3Z;}
,'E8':function(W8,v8){return W8!=v8;}
,'D0F':function(G0F,A0F){return G0F==A0F;}
,'n0g':function(Y0g,V0g){return Y0g<V0g;}
,'m4G':function(T4G,U4G){return T4G*U4G;}
,'u4B':function(Q4B,K4B){return Q4B-K4B;}
,'v7':function(d7,J7){return d7==J7;}
,'k3L':function(t3L,s3L){return t3L<s3L;}
,'b3p':function(l3p,c3p){return l3p-c3p;}
,'M4g':function(e4g,f4g){return e4g-f4g;}
,'J99':function(I99,o99){return I99<o99;}
,'I7H':function(o7H,i7H){return o7H==i7H;}
,'b3t':function(l3t,c3t){return l3t<c3t;}
,'G3p':function(A3p,X3p){return A3p>X3p;}
,'q0Z':function(n0Z,Y0Z){return n0Z-Y0Z;}
,'R6Z':function(C6Z,a6Z){return C6Z*a6Z;}
,'C3H':function(a3H,h3H){return a3H==h3H;}
,'P7V':function(g7V,Z7V){return g7V-Z7V;}
,'y9t':function(O9t,x9t){return O9t*x9t;}
,'l4Z':function(c4Z,j4Z){return c4Z*j4Z;}
,'N4L':function(S7L,z7L){return S7L>=z7L;}
,'A4V':function(X4V,p4V){return X4V<p4V;}
,'O4H':function(x4H,B4H){return x4H/B4H;}
,'J8G':function(I8G,o8G){return I8G-o8G;}
,'L2j':function(F2j,r2j){return F2j!=r2j;}
,'v4G':function(d4G,J4G){return d4G-J4G;}
,'r8x':function(u8x,Q8x){return u8x>Q8x;}
,'e4p':function(f4p,R4p){return f4p<=R4p;}
,'j7H':function(k7H,t7H){return k7H==t7H;}
,'s7B':function(E7B,W7B){return E7B-W7B;}
,'a19':function(h19,N19,S89){return h19/N19*S89;}
,'i6L':function(m6L,T6L){return m6L<T6L;}
,'y1t':function(O1t,x1t){return O1t!=x1t;}
,'F5G':function(r5G,u5G){return r5G<u5G;}
,'R6q':function(C6q,a6q){return C6q<a6q;}
,'s0Z':function(E0Z,W0Z){return E0Z&W0Z;}
,'e6t':function(f6t,R6t){return f6t!=R6t;}
,'b3B':function(l3B,c3B){return l3B==c3B;}
,'D3d':function(G3d,A3d){return G3d-A3d;}
,'i1K':function(m1K,T1K){return m1K<T1K;}
,'A6B':function(X6B,p6B){return X6B!=p6B;}
,'L5V':function(F5V,r5V){return F5V*r5V;}
,'Y5p':function(V5p,H5p){return V5p-H5p;}
,'N6F':function(S3F,z3F){return S3F==z3F;}
,'s5F':function(E5F,W5F,v5F){return E5F*W5F/v5F;}
,'l29':function(c29,j29){return c29==j29;}
,'T3H':function(U3H,y3H){return U3H-y3H;}
,'B1t':function(L1t,F1t){return L1t!=F1t;}
,'a6L':function(h6L,N6L){return h6L<N6L;}
,'N4G':function(S7G,z7G){return S7G-z7G;}
,'B0V':function(L0V,F0V){return L0V<F0V;}
,'S2K':function(z2K,q2K){return z2K-q2K;}
,'l6G':function(c6G,j6G,k6G){return c6G*j6G*k6G;}
,'L8':function(F8,r8){return F8==r8;}
,'O7d':function(x7d,B7d){return x7d>=B7d;}
,'O1x':function(x1x,B1x){return x1x!=B1x;}
,'c6H':function(j6H,k6H){return j6H-k6H;}
,'g2Z':function(Z2Z,w2Z){return Z2Z==w2Z;}
,'l6d':function(c6d,j6d){return c6d*j6d;}
,'m7':function(T7,U7){return T7<U7;}
,'r8q':function(u8q,Q8q){return u8q-Q8q;}
,'P9d':function(g9d,Z9d){return g9d in Z9d;}
,'l2q':function(c2q,j2q){return c2q in j2q;}
,'u69':function(Q69,K69){return Q69>=K69;}
,'p4d':function(M4d,e4d){return M4d-e4d;}
,'q8V':function(n8V,Y8V){return n8V*Y8V;}
,'v9B':function(d9B,J9B){return d9B>J9B;}
,'c6q':function(j6q,k6q){return j6q==k6q;}
,'h9t':function(N9t,S2t){return N9t>S2t;}
,'x19':function(B19,L19){return B19/L19;}
,'R8x':function(C8x,a8x){return C8x<a8x;}
,'n2G':function(Y2G,V2G){return Y2G>V2G;}
,'Q1Z':function(K1Z,D1Z){return K1Z-D1Z;}
,'m39':function(T39,U39){return T39==U39;}
,'v5d':function(d5d,J5d){return d5d-J5d;}
,'d1g':function(J1g,I1g){return J1g==I1g;}
,'e7B':function(f7B,R7B){return f7B-R7B;}
,'L2G':function(F2G,r2G){return F2G*r2G;}
,'l3L':function(c3L,j3L){return c3L<j3L;}
,'z49':function(q49,n49){return q49<n49;}
,'U89':function(y89,O89){return y89==O89;}
,'M1t':function(e1t,f1t){return e1t*f1t;}
,'z8q':function(q8q,n8q){return q8q==n8q;}
,'W8q':function(v8q,d8q,J8q){return v8q-d8q+J8q;}
,'V3p':function(H3p,P3p){return H3p>P3p;}
,'g5F':function(Z5F,w5F){return Z5F<w5F;}
,'L5F':function(F5F,r5F){return F5F<r5F;}
,'u79':function(Q79,K79){return Q79==K79;}
,'z5Z':function(q5Z,n5Z){return q5Z/n5Z;}
,'M6g':function(e6g,f6g){return e6g-f6g;}
,'E29':function(W29,v29){return W29*v29;}
,'O0g':function(x0g,B0g){return x0g==B0g;}
,'A1F':function(X1F,p1F){return X1F-p1F;}
,'h4j':function(N4j,S7j){return N4j>S7j;}
,'w0':function(b0,l0){return b0*l0;}
,'H0j':function(P0j,g0j){return P0j==g0j;}
,'X8':function(p8,M8){return p8<M8;}
,'I8L':function(o8L,i8L){return o8L>i8L;}
,'X69':function(p69,M69){return p69<=M69;}
,'P1d':function(g1d,Z1d){return g1d==Z1d;}
,'B7L':function(L7L,F7L){return L7L<F7L;}
,'K0K':function(D0K,G0K){return D0K==G0K;}
,'Z9L':function(w9L,b9L){return w9L<=b9L;}
,'F1d':function(r1d,u1d){return r1d==u1d;}
,'Q2t':function(K2t,D2t){return K2t<D2t;}
,'U8t':function(y8t,O8t){return y8t-O8t;}
,'E1V':function(W1V,v1V){return W1V/v1V;}
,'p9q':function(M9q,e9q){return M9q!=e9q;}
,'e5g':function(f5g,R5g){return f5g<R5g;}
,'F9d':function(r9d,u9d){return r9d<u9d;}
,'o6F':function(i6F,m6F){return i6F>m6F;}
,'B8x':function(L8x,F8x){return L8x<F8x;}
,'l5t':function(c5t,j5t){return c5t-j5t;}
,'R4t':function(C4t,a4t){return C4t==a4t;}
,'u8':function(Q8,K8){return Q8*K8;}
,'R7':function(C7,a7){return C7==a7;}
,'O2q':function(x2q,B2q){return x2q-B2q;}
,'P9F':function(g9F,Z9F){return g9F<Z9F;}
,'y2Z':function(O2Z,x2Z){return O2Z/x2Z;}
,'v9t':function(d9t,J9t){return d9t*J9t;}
,'C0t':function(a0t,h0t){return a0t<h0t;}
,'E8Z':function(W8Z,v8Z){return W8Z<v8Z;}
,'y3F':function(O3F,x3F){return O3F-x3F;}
,'v2L':function(d2L,J2L){return d2L-J2L;}
,'R9j':function(C9j,a9j,h9j){return C9j-a9j-h9j;}
,'l0g':function(c0g,j0g){return c0g==j0g;}
,'h7p':function(N7p,S0p){return N7p==S0p;}
,'s8L':function(E8L,W8L){return E8L-W8L;}
,'y0q':function(O0q,x0q){return O0q-x0q;}
,'S7q':function(z7q,q7q){return z7q|q7q;}
,'k5g':function(t5g,s5g){return t5g<s5g;}
,'J9q':function(I9q,o9q){return I9q in o9q;}
,'d2d':function(J2d,I2d){return J2d-I2d;}
,'j9K':function(k9K,t9K){return k9K<t9K;}
,'m6g':function(T6g,U6g){return T6g-U6g;}
,'m7H':function(T7H,U7H){return T7H==U7H;}
,'E8d':function(W8d,v8d){return W8d==v8d;}
,'k3x':function(t3x,s3x){return t3x==s3x;}
,'M0Z':function(e0Z,f0Z){return e0Z!=f0Z;}
,'d4H':function(J4H,I4H){return J4H-I4H;}
,'N5':function(S4,z4){return S4*z4;}
,'h0Z':function(N0Z,S1Z){return N0Z>S1Z;}
,'C0g':function(a0g,h0g){return a0g==h0g;}
,'P3q':function(g3q,Z3q){return g3q==Z3q;}
,'T2j':function(U2j,y2j){return U2j-y2j;}
,'J1H':function(I1H,o1H){return I1H!=o1H;}
,'l6F':function(c6F,j6F){return c6F*j6F;}
,'D1x':function(G1x,A1x){return G1x==A1x;}
,'a5H':function(h5H,N5H){return h5H*N5H;}
,'u6t':function(Q6t,K6t){return Q6t==K6t;}
,'f5p':function(R5p,C5p){return R5p<=C5p;}
,'X5g':function(p5g,M5g){return p5g/M5g;}
,'c1H':function(j1H,k1H){return j1H==k1H;}
,'H8K':function(P8K,g8K){return P8K<g8K;}
,'c1Z':function(j1Z,k1Z){return j1Z<k1Z;}
,'K39':function(D39,G39){return D39>=G39;}
,'W7j':function(v7j,d7j){return v7j==d7j;}
,'T4p':function(U4p,y4p){return U4p==y4p;}
,'n4L':function(Y4L,V4L){return Y4L<V4L;}
,'n5V':function(Y5V,V5V){return Y5V<V5V;}
,'F0p':function(r0p,u0p){return r0p==u0p;}
,'N7q':function(S0q,z0q){return S0q==z0q;}
,'K8q':function(D8q,G8q){return D8q==G8q;}
,'l3G':function(c3G,j3G){return c3G*j3G;}
,'U9d':function(y9d,O9d){return y9d-O9d;}
,'a1p':function(h1p,N1p){return h1p/N1p;}
,'W5H':function(v5H,d5H){return v5H==d5H;}
,'X5':function(p5,M5){return p5-M5;}
,'t5H':function(s5H,E5H){return s5H!=E5H;}
,'b1g':function(l1g,c1g){return l1g==c1g;}
,'g2g':function(Z2g,w2g){return Z2g==w2g;}
,'Y5Z':function(V5Z,H5Z){return V5Z-H5Z;}
,'N2G':function(S5G,z5G){return S5G>=z5G;}
,'t9G':function(s9G,E9G){return s9G-E9G;}
,'D3G':function(G3G,A3G){return G3G-A3G;}
,'F4q':function(r4q,u4q){return r4q==u4q;}
,'I1t':function(o1t,i1t){return o1t!=i1t;}
,'Y99':function(V99,H99){return V99==H99;}
,'M09':function(e09,f09){return e09>f09;}
,'a2V':function(h2V,N2V){return h2V-N2V;}
,'s4t':function(E4t,W4t){return E4t<W4t;}
,'K9':function(D9,G9){return D9<G9;}
,'C9K':function(a9K,h9K,N9K){return a9K/h9K*N9K;}
,'J1q':function(I1q,o1q){return I1q>o1q;}
,'L2d':function(F2d,r2d){return F2d/r2d;}
,'G9d':function(A9d,X9d){return A9d>X9d;}
,'H3L':function(P3L,g3L){return P3L<g3L;}
,'n4p':function(Y4p,V4p){return Y4p==V4p;}
,'F9q':function(r9q,u9q){return r9q*u9q;}
,'H3H':function(P3H,g3H){return P3H==g3H;}
,'D9p':function(G9p,A9p){return G9p<A9p;}
,'p2V':function(M2V,e2V){return M2V/e2V;}
,'V6g':function(H6g,P6g){return H6g-P6g;}
,'n7K':function(Y7K,V7K){return Y7K==V7K;}
,'l4L':function(c4L,j4L){return c4L<j4L;}
,'c0x':function(j0x,k0x){return j0x-k0x;}
,'b0B':function(l0B,c0B){return l0B<c0B;}
,'h2g':function(N2g,S5g,z5g){return N2g*S5g/z5g;}
,'j3K':function(k3K,t3K){return k3K-t3K;}
,'b1t':function(l1t,c1t){return l1t<c1t;}
,'J6G':function(I6G,o6G){return I6G/o6G;}
,'O4L':function(x4L,B4L){return x4L<B4L;}
,'F1p':function(r1p,u1p){return r1p*u1p;}
,'Q9G':function(K9G,D9G){return K9G>D9G;}
,'w9B':function(b9B,l9B){return b9B==l9B;}
,'l8H':function(c8H,j8H){return c8H-j8H;}
,'a1g':function(h1g,N1g,S8g){return h1g*N1g*S8g;}
,'R2F':function(C2F,a2F,h2F){return C2F*a2F*h2F;}
,'s8x':function(E8x,W8x){return E8x/W8x;}
,'d9g':function(J9g,I9g){return J9g-I9g;}
,'e7K':function(f7K,R7K){return f7K<=R7K;}
,'W4q':function(v4q,d4q){return v4q==d4q;}
,'C5t':function(a5t,h5t){return a5t!=h5t;}
,'j6Z':function(k6Z,t6Z){return k6Z&t6Z;}
,'R1t':function(C1t,a1t){return C1t>a1t;}
,'W6G':function(v6G,d6G){return v6G-d6G;}
,'g1V':function(Z1V,w1V,b1V){return Z1V*w1V/b1V;}
,'o1V':function(i1V,m1V){return i1V/m1V;}
,'B7x':function(L7x,F7x){return L7x*F7x;}
,'i4q':function(m4q,T4q){return m4q==T4q;}
,'s09':function(E09,W09){return E09<W09;}
,'J9d':function(I9d,o9d){return I9d!=o9d;}
,'g6':function(Z6,w6){return Z6>w6;}
,'y4G':function(O4G,x4G,B4G){return O4G-x4G+B4G;}
,'m6Z':function(T6Z,U6Z){return T6Z&U6Z;}
,'i9G':function(m9G,T9G){return m9G>T9G;}
,'l9g':function(c9g,j9g){return c9g!=j9g;}
,'S8Z':function(z8Z,q8Z){return z8Z==q8Z;}
,'K7H':function(D7H,G7H){return D7H/G7H;}
,'D2G':function(G2G,A2G){return G2G/A2G;}
,'h9':function(N9,S2){return N9<S2;}
,'x9d':function(B9d,L9d){return B9d<L9d;}
,'f7G':function(R7G,C7G){return R7G*C7G;}
,'n6F':function(Y6F,V6F){return Y6F/V6F;}
,'l2M':"d",'u5':function(Q5,K5){return Q5-K5;}
,'Z9x':function(w9x,b9x){return w9x-b9x;}
,'H1p':function(P1p,g1p,Z1p){return P1p-g1p+Z1p;}
,'A6':function(X6,p6){return X6<p6;}
,'Y7F':function(V7F,H7F){return V7F<H7F;}
,'v6V':function(d6V,J6V){return d6V>J6V;}
,'u9p':function(Q9p,K9p){return Q9p<K9p;}
,'M7L':function(e7L,f7L){return e7L<f7L;}
,'J7V':function(I7V,o7V){return I7V==o7V;}
,'F2V':function(r2V,u2V){return r2V-u2V;}
,'D5g':function(G5g,A5g){return G5g/A5g;}
,'G6H':function(A6H,X6H){return A6H==X6H;}
,'K1t':function(D1t,G1t){return D1t-G1t;}
,'j9H':function(k9H,t9H){return k9H<t9H;}
,'u2q':function(Q2q,K2q){return Q2q<K2q;}
,'h2H':function(N2H,S5H){return N2H-S5H;}
,'l7q':function(c7q,j7q){return c7q==j7q;}
,'g3B':function(Z3B,w3B){return Z3B==w3B;}
,'Q5L':function(K5L,D5L){return K5L>=D5L;}
,'h6':function(N6,S3){return N6/S3;}
,'C8Z':function(a8Z,h8Z){return a8Z!=h8Z;}
,'K7x':function(D7x,G7x){return D7x!=G7x;}
,'j9j':function(k9j,t9j){return k9j==t9j;}
,'O0T':(function(K0T){return (function(e0T,p0T){return (function(f0T){return {x0T:f0T}
;}
)(function(L0T){var A0T,F0T=0;for(var M0T=e0T;F0T<L0T["length"];F0T++){var X0T=p0T(L0T,F0T);A0T=F0T===((53.,8.45E2)<=(122.5E1,20.6E1)?(95.,1.35E2):5.33E2>=(5.21E2,8.22E2)?(23.90E1,"o"):(0x202,138.6E1)>141?(104.,0):(0.,94.))?X0T:A0T^X0T;}
return A0T?M0T:!M0T;}
);}
)((function(D0T,u0T,r0T,G0T){var Q0T=25;return D0T(K0T,Q0T)-G0T(u0T,r0T)>Q0T;}
)(parseInt,Date,(function(u0T){return (''+u0T)["substring"](1,(u0T+'')["length"]-1);}
)('_getTime2'),function(u0T,r0T){return new u0T()[r0T]();}
),function(L0T,F0T){var B0T=parseInt(L0T["charAt"](F0T),16)["toString"](2);return B0T["charAt"](B0T["length"]-1);}
);}
)('99k140500'),'C8K':function(a8K,h8K){return a8K>=h8K;}
,'q7Z':function(n7Z,Y7Z){return n7Z>Y7Z;}
,'g6g':function(Z6g,w6g){return Z6g<w6g;}
,'a4K':function(h4K,N4K){return h4K/N4K;}
,'p6G':function(M6G,e6G){return M6G-e6G;}
,'h3B':function(N3B,S99){return N3B>S99;}
,'H2d':function(P2d,g2d){return P2d>g2d;}
,'p4q':function(M4q,e4q){return M4q|e4q;}
,'H7q':function(P7q,g7q){return P7q==g7q;}
,'E0F':function(W0F,v0F){return W0F<v0F;}
,'U7g':function(y7g,O7g){return y7g==O7g;}
,'Q8H':function(K8H,D8H){return K8H*D8H;}
,'G5x':function(A5x,X5x){return A5x>X5x;}
,'P9q':function(g9q,Z9q){return g9q/Z9q;}
,'U3':function(y3,O3){return y3>=O3;}
,'a9G':function(h9G,N9G){return h9G-N9G;}
,'J1p':function(I1p,o1p){return I1p<=o1p;}
,'p8B':function(M8B,e8B){return M8B/e8B;}
,'b7p':function(l7p,c7p){return l7p>c7p;}
,'J2B':function(I2B,o2B){return I2B<=o2B;}
,'N5t':function(S4t,z4t){return S4t==z4t;}
,'y5q':function(O5q,x5q){return O5q>x5q;}
,'N79':function(S09,z09){return S09!=z09;}
,'L4B':function(F4B,r4B){return F4B==r4B;}
,'B2H':function(L2H,F2H){return L2H<=F2H;}
,'z8G':function(q8G,n8G){return q8G-n8G;}
,'E5V':function(W5V,v5V){return W5V-v5V;}
,'M7p':function(e7p,f7p){return e7p==f7p;}
,'V4g':function(H4g,P4g){return H4g*P4g;}
,'T5':function(U5,y5){return U5==y5;}
,'B3F':function(L3F,F3F){return L3F-F3F;}
,'W0H':function(v0H,d0H){return v0H>d0H;}
,'i2V':function(m2V,T2V){return m2V==T2V;}
,'O8g':function(x8g,B8g){return x8g*B8g;}
,'q2j':function(n2j,Y2j){return n2j==Y2j;}
,'S8':function(z8,q8){return z8*q8;}
,'u6F':function(Q6F,K6F){return Q6F==K6F;}
,'o9x':function(i9x,m9x){return i9x>=m9x;}
,'C1L':function(a1L,h1L){return a1L==h1L;}
,'g4j':function(Z4j,w4j){return Z4j>w4j;}
,'I5j':function(o5j,i5j){return o5j<i5j;}
,'j2g':function(k2g,t2g){return k2g<=t2g;}
,'h2L':function(N2L,S5L){return N2L>=S5L;}
,'L7G':function(F7G,r7G,u7G){return F7G*r7G*u7G;}
,'m2Z':function(T2Z,U2Z){return T2Z-U2Z;}
,'R0':function(C0,a0){return C0<a0;}
,'u5g':function(Q5g,K5g){return Q5g/K5g;}
,'v7B':function(d7B,J7B){return d7B==J7B;}
,'B3q':function(L3q,F3q){return L3q-F3q;}
,'L0t':function(F0t,r0t){return F0t<r0t;}
,'J5Z':function(I5Z,o5Z){return I5Z<o5Z;}
,'w1q':function(b1q,l1q){return b1q-l1q;}
,'g6V':function(Z6V,w6V){return Z6V<w6V;}
,'C6K':function(a6K,h6K){return a6K>h6K;}
,'P5L':function(g5L,Z5L){return g5L<Z5L;}
,'r2x':function(u2x,Q2x){return u2x&Q2x;}
,'Y5x':function(V5x,H5x){return V5x>H5x;}
,'O2d':function(x2d,B2d){return x2d-B2d;}
,'n2q':function(Y2q,V2q){return Y2q in V2q;}
,'c7j':function(j7j,k7j){return j7j-k7j;}
,'c5x':function(j5x,k5x){return j5x-k5x;}
,'D2d':function(G2d,A2d){return G2d==A2d;}
,'j9':function(k9,t9){return k9==t9;}
,'P8F':function(g8F,Z8F){return g8F<Z8F;}
,'U3V':function(y3V,O3V){return y3V==O3V;}
,'J8t':function(I8t,o8t){return I8t==o8t;}
,'r3q':function(u3q,Q3q){return u3q!=Q3q;}
,'p1H':function(M1H,e1H){return M1H/e1H;}
,'y6p':function(O6p,x6p){return O6p/x6p;}
,'K4t':function(D4t,G4t){return D4t==G4t;}
,'A2Z':function(X2Z,p2Z){return X2Z/p2Z;}
,'M4F':function(e4F,f4F){return e4F<f4F;}
,'p0L':function(M0L,e0L){return M0L/e0L;}
,'m59':function(T59,U59){return T59-U59;}
,'z0H':function(q0H,n0H){return q0H!=n0H;}
,'E5t':function(W5t,v5t){return W5t<v5t;}
,'G8B':function(A8B,X8B){return A8B==X8B;}
,'F5p':function(r5p,u5p){return r5p>u5p;}
,'d3G':function(J3G,I3G){return J3G*I3G;}
,'u5F':function(Q5F,K5F){return Q5F-K5F;}
,'u7B':function(Q7B,K7B){return Q7B/K7B;}
,'r6p':function(u6p,Q6p){return u6p-Q6p;}
,'w7g':function(b7g,l7g){return b7g<=l7g;}
,'i8H':function(m8H,T8H){return m8H/T8H;}
,'c5L':function(j5L,k5L){return j5L<k5L;}
,'m0K':function(T0K,U0K){return T0K-U0K;}
,'w3g':function(b3g,l3g){return b3g!=l3g;}
,'t4K':function(s4K,E4K){return s4K<E4K;}
,'X1L':function(p1L,M1L){return p1L<M1L;}
,'e1L':function(f1L,R1L){return f1L==R1L;}
,'a6G':function(h6G,N6G){return h6G-N6G;}
,'c1K':function(j1K,k1K){return j1K<k1K;}
,'A4g':function(X4g,p4g){return X4g-p4g;}
,'T29':function(U29,y29){return U29==y29;}
,'x8H':function(B8H,L8H){return B8H-L8H;}
,'L5g':function(F5g,r5g){return F5g/r5g;}
,'K7p':function(D7p,G7p){return D7p==G7p;}
,'O6F':function(x6F,B6F){return x6F<B6F;}
,'d1G':function(J1G,I1G,o1G){return J1G*I1G/o1G;}
,'f4q':function(R4q,C4q){return R4q|C4q;}
,'F8B':function(r8B,u8B){return r8B==u8B;}
,'p8H':function(M8H,e8H){return M8H/e8H;}
,'Y4K':function(V4K,H4K){return V4K==H4K;}
,'f6L':function(R6L,C6L){return R6L<C6L;}
,'i6H':function(m6H,T6H){return m6H>T6H;}
,'V1F':function(H1F,P1F){return H1F!=P1F;}
,'A2':function(X2,p2){return X2*p2;}
,'I39':function(o39,i39){return o39*i39;}
,'D9Z':function(G9Z,A9Z){return G9Z<A9Z;}
,'H4Z':function(P4Z,g4Z){return P4Z<g4Z;}
,'m2F':function(T2F,U2F){return T2F>U2F;}
,'j4j':function(k4j,t4j){return k4j>t4j;}
,'v39':function(d39,J39){return d39==J39;}
,'g6p':function(Z6p,w6p){return Z6p/w6p;}
,'k4p':function(t4p,s4p){return t4p==s4p;}
,'v2F':function(d2F,J2F){return d2F-J2F;}
,'G3':function(A3,X3){return A3>=X3;}
,'y2p':function(O2p,x2p){return O2p>x2p;}
,'b0Z':function(l0Z,c0Z){return l0Z==c0Z;}
,'I9K':function(o9K,i9K){return o9K<i9K;}
,'B4g':function(L4g,F4g){return L4g>F4g;}
,'r6Z':function(u6Z,Q6Z){return u6Z!=Q6Z;}
,'N29':function(S59,z59){return S59>z59;}
,'G49':function(A49,X49){return A49==X49;}
,'d0F':function(J0F,I0F){return J0F==I0F;}
,'e8':function(f8,R8){return f8!=R8;}
,'V6p':function(H6p,P6p){return H6p-P6p;}
,'T7G':function(U7G,y7G){return U7G<y7G;}
,'z2t':function(q2t,n2t){return q2t<n2t;}
,'b8L':function(l8L,c8L){return l8L<c8L;}
,'j8V':function(k8V,t8V){return k8V==t8V;}
,'E6F':function(W6F,v6F){return W6F-v6F;}
,'m9j':function(T9j,U9j){return T9j>U9j;}
,'k3d':function(t3d,s3d){return t3d>s3d;}
,'L2q':function(F2q,r2q){return F2q==r2q;}
,'P9B':function(g9B,Z9B){return g9B==Z9B;}
,'q5F':function(n5F,Y5F){return n5F==Y5F;}
,'E0G':function(W0G,v0G){return W0G*v0G;}
,'e2d':function(f2d,R2d){return f2d==R2d;}
,'o2d':function(i2d,m2d){return i2d-m2d;}
,'R39':function(C39,a39){return C39>a39;}
,'C8V':function(a8V,h8V){return a8V==h8V;}
,'h4t':function(N4t,S7t){return N4t==S7t;}
,'E9p':function(W9p,v9p){return W9p==v9p;}
,'V8L':function(H8L,P8L){return H8L<P8L;}
,'B39':function(L39,F39){return L39%F39;}
,'b2':function(l2,c2){return l2==c2;}
,'K9K':function(D9K,G9K){return D9K<G9K;}
,'z0L':function(q0L,n0L){return q0L==n0L;}
,'D7K':function(G7K,A7K){return G7K==A7K;}
,'j5j':function(k5j,t5j){return k5j==t5j;}
,'k0G':function(t0G,s0G){return t0G*s0G;}
,'w6q':function(b6q,l6q){return b6q-l6q;}
,'v2x':function(d2x,J2x){return d2x*J2x;}
,'g0K':function(Z0K,w0K){return Z0K<w0K;}
,'E8H':function(W8H,v8H,d8H){return W8H-v8H+d8H;}
,'f3V':function(R3V,C3V,a3V){return R3V*C3V/a3V;}
,'a99':function(h99,N99){return h99==N99;}
,'T8':function(U8,y8){return U8-y8;}
,'j1g':function(k1g,t1g){return k1g==t1g;}
,'I8V':function(o8V,i8V){return o8V<i8V;}
,'e9L':function(f9L,R9L){return f9L*R9L;}
,'O3x':function(x3x,B3x){return x3x==B3x;}
,'A6Z':function(X6Z,p6Z){return X6Z>p6Z;}
,'c8G':function(j8G,k8G){return j8G==k8G;}
,'G5H':function(A5H,X5H){return A5H/X5H;}
,'q0B':function(n0B,Y0B){return n0B!=Y0B;}
,'r0Z':function(u0Z,Q0Z){return u0Z&Q0Z;}
,'V0Z':function(H0Z,P0Z){return H0Z-P0Z;}
,'L7q':function(F7q,r7q){return F7q==r7q;}
,'Z4p':function(w4p,b4p){return w4p==b4p;}
,'P2V':function(g2V,Z2V){return g2V/Z2V;}
,'o6d':function(i6d,m6d){return i6d<m6d;}
,'P5p':function(g5p,Z5p){return g5p>Z5p;}
,'p3':function(M3,e3){return M3<=e3;}
,'F2B':function(r2B,u2B){return r2B<u2B;}
,'Z0F':function(w0F,b0F){return w0F<b0F;}
,'K7Z':function(D7Z,G7Z){return D7Z==G7Z;}
,'m0V':function(T0V,U0V){return T0V-U0V;}
,'q4t':function(n4t,Y4t){return n4t<Y4t;}
,'N8V':function(S6V,z6V){return S6V-z6V;}
,'v0d':function(d0d,J0d){return d0d!=J0d;}
,'c2B':function(j2B,k2B){return j2B<k2B;}
,'J4d':function(I4d,o4d){return I4d<o4d;}
,'E7q':function(W7q,v7q){return W7q<v7q;}
,'U3g':function(y3g,O3g){return y3g==O3g;}
,'z9B':function(q9B,n9B){return q9B-n9B;}
,'f5G':function(R5G,C5G){return R5G>C5G;}
,'V59':function(H59,P59){return H59<P59;}
,'B4V':function(L4V,F4V){return L4V>=F4V;}
,'z0x':function(q0x,n0x){return q0x>n0x;}
,'e2j':function(f2j,R2j){return f2j==R2j;}
,'E1L':function(W1L,v1L){return W1L==v1L;}
,'P89':function(g89,Z89){return g89/Z89;}
,'G8G':function(A8G,X8G){return A8G<X8G;}
,'b9K':function(l9K,c9K){return l9K-c9K;}
,'d8d':function(J8d,I8d){return J8d/I8d;}
,'D9g':function(G9g,A9g){return G9g>A9g;}
,'y3t':function(O3t,x3t){return O3t-x3t;}
,'Q6H':function(K6H,D6H){return K6H==D6H;}
,'R2L':function(C2L,a2L){return C2L<a2L;}
,'L7d':function(F7d,r7d){return F7d==r7d;}
,'F19':function(r19,u19){return r19/u19;}
,'o1L':function(i1L,m1L){return i1L==m1L;}
,'I2F':function(o2F,i2F){return o2F<i2F;}
,'m1B':function(T1B,U1B){return T1B==U1B;}
,'A1':function(X1,M1){return X1!=M1;}
,'Q5Z':function(K5Z,D5Z){return K5Z/D5Z;}
,'I0d':function(o0d,i0d){return o0d-i0d;}
,'G19':function(A19,X19){return A19/X19;}
,'N0t':function(S1t,z1t){return S1t==z1t;}
,'x49':function(B49,L49){return B49!=L49;}
,'h9V':function(N9V,S2V){return N9V-S2V;}
,'Q6L':function(K6L,D6L){return K6L!=D6L;}
,'P0p':function(g0p,Z0p){return g0p==Z0p;}
,'g5q':function(Z5q,w5q){return Z5q==w5q;}
,'r9':function(u9,Q9){return u9<Q9;}
,'a0p':function(h0p,N0p){return h0p/N0p;}
,'q09':function(n09,Y09){return n09!=Y09;}
,'Y7j':function(V7j,H7j){return V7j-H7j;}
,'p8F':function(M8F,e8F){return M8F<e8F;}
,'D2j':function(G2j,A2j){return G2j==A2j;}
,'R5K':function(C5K,a5K){return C5K==a5K;}
,'y3q':function(O3q,x3q){return O3q*x3q;}
,'A8x':function(X8x,p8x){return X8x>p8x;}
,'t1Z':function(s1Z,E1Z){return s1Z-E1Z;}
,'m2x':function(T2x,U2x){return T2x-U2x;}
,'O4':function(x4,B4){return x4/B4;}
,'e9Z':function(f9Z,R9Z){return f9Z>R9Z;}
,'G9F':function(A9F,X9F){return A9F==X9F;}
,'n7q':function(Y7q,V7q){return Y7q|V7q;}
,'M0':function(e0,f0){return e0/f0;}
,'B2Z':function(L2Z,F2Z){return L2Z<F2Z;}
,'x5Z':function(B5Z,L5Z){return B5Z==L5Z;}
,'M2L':function(e2L,f2L){return e2L>=f2L;}
,'F7t':function(r7t,u7t){return r7t!=u7t;}
,'g9':function(Z9,w9){return Z9<w9;}
,'a7G':function(h7G,N7G){return h7G*N7G;}
,'z3Z':function(q3Z,n3Z){return q3Z<n3Z;}
,'i49':function(m49,T49){return m49>T49;}
,'V8x':function(H8x,P8x){return H8x>P8x;}
,'Q0B':function(K0B,D0B){return K0B!==D0B;}
,'m3t':function(T3t,U3t){return T3t>U3t;}
,'w49':function(b49,l49){return b49<=l49;}
,'Q0H':function(K0H,D0H){return K0H<D0H;}
,'X4H':function(p4H,M4H){return p4H-M4H;}
,'m1F':function(T1F,U1F){return T1F>U1F;}
,'U6G':function(y6G,O6G){return y6G<O6G;}
,'l2d':function(c2d,j2d){return c2d/j2d;}
,'O4B':function(x4B,B4B){return x4B<B4B;}
,'i9F':function(m9F,T9F){return m9F==T9F;}
,'A8L':function(X8L,p8L){return X8L>p8L;}
,'g39':function(Z39,w39){return Z39==w39;}
,'O29':function(x29,B29){return x29<B29;}
,'d0t':function(J0t,I0t){return J0t<=I0t;}
,'Z8d':function(w8d,b8d){return w8d==b8d;}
,'z7V':function(q7V,n7V){return q7V>n7V;}
,'d2G':function(J2G,I2G){return J2G<I2G;}
,'q9H':function(n9H,Y9H){return n9H==Y9H;}
,'H1L':function(P1L,g1L){return P1L==g1L;}
,'N7Z':function(S0Z,z0Z){return S0Z-z0Z;}
,'B2g':function(L2g,F2g){return L2g==F2g;}
,'b6p':function(l6p,c6p){return l6p==c6p;}
,'w8F':function(b8F,l8F){return b8F>l8F;}
,'d3L':function(J3L,I3L){return J3L>=I3L;}
,'U7t':function(y7t,O7t){return y7t>O7t;}
,'q9t':function(n9t,Y9t){return n9t<Y9t;}
,'K2g':function(D2g,G2g){return D2g==G2g;}
,'s5q':function(E5q,W5q){return E5q<W5q;}
,'A2L':function(X2L,p2L){return X2L!=p2L;}
,'X7V':function(p7V,M7V){return p7V-M7V;}
,'n0t':function(Y0t,V0t){return Y0t!=V0t;}
,'h0K':function(N0K,S1K){return N0K==S1K;}
,'g5G':function(Z5G,w5G,b5G){return Z5G*w5G/b5G;}
,'F3Z':function(r3Z,u3Z){return r3Z<=u3Z;}
,'q0V':function(n0V,Y0V){return n0V-Y0V;}
,'A9':function(X9,p9){return X9==p9;}
,'n9p':function(Y9p,V9p){return Y9p==V9p;}
,'Y0H':function(V0H,H0H){return V0H!=H0H;}
,'R8L':function(C8L,a8L){return C8L-a8L;}
,'n2K':function(Y2K,V2K){return Y2K<V2K;}
,'u8g':function(Q8g,K8g){return Q8g<K8g;}
,'k5G':function(t5G,s5G){return t5G-s5G;}
,'t6G':function(s6G,E6G){return s6G<E6G;}
,'g4':function(Z4,w4){return Z4==w4;}
,'k7K':function(t7K,s7K){return t7K>=s7K;}
,'s0B':function(E0B,W0B){return E0B/W0B;}
,'K1B':function(D1B,G1B){return D1B==G1B;}
,'Z2K':function(w2K,b2K){return w2K/b2K;}
,'a5Z':function(h5Z,N5Z){return h5Z-N5Z;}
,'k6d':function(t6d,s6d){return t6d<s6d;}
,'b4B':function(l4B,c4B){return l4B-c4B;}
,'k9x':function(t9x,s9x){return t9x<s9x;}
,'D6K':function(G6K,A6K){return G6K-A6K;}
,'Z4H':function(w4H,b4H){return w4H-b4H;}
,'P1H':function(g1H,Z1H){return g1H-Z1H;}
,'H8d':function(P8d,g8d){return P8d/g8d;}
,'z5x':function(q5x,n5x){return q5x<n5x;}
,'m5j':function(T5j,U5j){return T5j<U5j;}
,'N8':function(S6,z6){return S6!=z6;}
,'r2Z':function(u2Z,Q2Z){return u2Z-Q2Z;}
,'s39':function(E39,W39){return E39==W39;}
,'q8x':function(n8x,Y8x){return n8x<=Y8x;}
,'j7p':function(k7p,t7p){return k7p==t7p;}
,'j0Z':function(k0Z,t0Z){return k0Z==t0Z;}
,'j0B':function(k0B,t0B){return k0B>t0B;}
,'F6x':function(r6x,u6x){return r6x*u6x;}
,'E0g':function(W0g,v0g){return W0g-v0g;}
,'R2H':function(C2H,a2H){return C2H!=a2H;}
,'p6L':function(M6L,e6L){return M6L==e6L;}
,'E6d':function(W6d,v6d){return W6d/v6d;}
,'o3L':function(i3L,m3L){return i3L<m3L;}
,'Z5B':function(w5B,b5B){return w5B-b5B;}
,'r9j':function(u9j,Q9j){return u9j>Q9j;}
,'Q1H':function(K1H,D1H){return K1H>D1H;}
,'Y9B':function(V9B,H9B){return V9B*H9B;}
,'Q5H':function(K5H,D5H){return K5H<D5H;}
,'y2x':function(O2x,x2x){return O2x<=x2x;}
,'R2g':function(C2g,a2g){return C2g-a2g;}
,'V9K':function(H9K,P9K){return H9K-P9K;}
,'s3q':function(E3q,W3q){return E3q<W3q;}
,'q1F':function(n1F,Y1F){return n1F!=Y1F;}
,'w4q':function(b4q,l4q){return b4q!=l4q;}
,'b7B':function(l7B,c7B){return l7B-c7B;}
,'p5Z':function(M5Z,e5Z){return M5Z==e5Z;}
,'N9j':function(S2j,z2j){return S2j==z2j;}
,'T79':function(U79,y79){return U79*y79;}
,'D8d':function(G8d,A8d){return G8d==A8d;}
,'c7t':function(j7t,k7t){return j7t/k7t;}
,'q5G':function(n5G,Y5G){return n5G-Y5G;}
,'X2q':function(p2q,M2q){return p2q!=M2q;}
,'g7G':function(Z7G,w7G){return Z7G*w7G;}
}
;(function(){var Y3U=b6S.O0T.x0T("117")?"STXChart":"ema3",K5z=b6S.O0T.x0T("2bc5")?"getFullYear":"rty",s4R=b6S.O0T.x0T("75")?"scrolledBottom":"hird",L5D=b6S.O0T.x0T("5c")?"STXT":"drawXAxis",p87=b6S.O0T.x0T("6a")?"downColor":"amd",L1c=b6S.O0T.x0T("2f5")?"yyyymmddhhmm":"ct",W5M=b6S.O0T.x0T("8cb4")?"ion":"maxTicks",r9T=b6S.O0T.x0T("d5")?"aggregationType":"stx",q6M=b6S.O0T.x0T("c64b")?"f":"Markers",J6j=b6S.O0T.x0T("16ee")?"P":"displayZone",n1M=b6S.O0T.x0T("88b")?"n":"getSpanCandleWidth",X7M=b6S.O0T.x0T("b62")?"u":"calculateHistoricalVolatility",Q11="undefined",r6z=b6S.O0T.x0T("2446")?"is_chrome":"$$$",x2R="$$",I2C=b6S.O0T.x0T("eaf3")?"IntradayRTForex":"STX";function _stxKernel_js(_stxThirdParty,_exports){var k6I=b6S.O0T.x0T("82")?"zoomOut":"ond",O57="uro",N5I="ndo",W5R=b6S.O0T.x0T("edd")?"setAdjusted":"rope",D2R=b6S.O0T.x0T("1ba")?"minX":"kl",m4U="Asia/Seoul",R0U="America/Chicago",i6c="America/Sao_Paulo",i9T="Europe/Vienna",p21="Europe/Warsaw",y87="Europe/Vilnius",m9T="oro",H2w=b6S.O0T.x0T("a31")?"canvas":"Asia/Tokyo",K5w="Europe/Tallinn",c3R="Asia/Taipei",S1c="Asia/Tel_Aviv",K8C="Europe/Zurich",d81="rli",j2U="rop",S2C="Europe/Stockholm",T8U="Asia/Shanghai",P8z="Asia/Singapore",q7I=b6S.O0T.x0T("c88")?"month":"America/Santiago",e2D="Europe/Riga",K4T="Europe/Prague",i97="aris",r27=b6S.O0T.x0T("d54")?"vOffset":"Eur",F9R="Europe/Oslo",N8D="Pacific/Auckland",R1z=b6S.O0T.x0T("11")?"stx_annotation_highlight":"Asia/Muscat",g4R=b6S.O0T.x0T("82")?"LLV":"Europe/London",b6D="Europe/Lisbon",k77="oul",r11="As",j1z="America/Lima",k11="Africa/Johannesburg",C3C="Atlantic/Reykjavik",y17=b6S.O0T.x0T("43c7")?"simple":"Asia/Hong_Kong",e7c="Europe/Helsinki",i7w="Europe/Dublin",S6C=b6S.O0T.x0T("33")?"ray":"Europe/Copenhagen",L97="America/Toronto",s5w=b6S.O0T.x0T("24")?"STD Dev ":"Europe/Budapest",t5R=b6S.O0T.x0T("8e")?"XPRA":"Europe/Brussels",Y27="Asia/Calcutta",G3D=b6S.O0T.x0T("27c")?"Europe/Berlin":"GetHistoricalFutureRange",k5R=b6S.O0T.x0T("42")?"resize":"Europe/Bratislava",a5R="Europe/Madrid",v3j="Europe/Athens",A6w=b6S.O0T.x0T("3af7")?"terda":"lastRecord",g7C=b6S.O0T.x0T("863")?"Eu":"clonedDrawing",E2D="Europe/Moscow",q81=b6S.O0T.x0T("548f")?"Donchian Channel":"Europe/Rome",A31=b6S.O0T.x0T("58d")?"userPointerDown":"o_",b4D="Am",f1j=((0x1B3,28)>=4.?(0x3D,7):7.3E2<=(0x1D7,0x4A)?(24.,3):6.93E2<=(112.,3.550E2)?120.:(0xA9,0xA)),s5c="0j",g0I=b6S.O0T.x0T("8c")?"bc":"k0j",z0I="/*",q6z="defaultToken",J17="Vo",G8I="w_xign",y2C=b6S.O0T.x0T("fa8")?"ices":"preferences",V5z="fs",p5c="TCO",S8c="iceTyp",z4z="vic",G6c="Char",t7D=b6S.O0T.x0T("fe")?"TC":"stxCandleShadow",y6D="recis",K3z=b6S.O0T.x0T("82d6")?"vice":"DAY",G41="olu",O37=b6S.O0T.x0T("e7c")?"set":"Studies",i2z=b6S.O0T.x0T("41b")?"high":"tartDa",n0U=b6S.O0T.x0T("c72")?"ethod":"emaPreviousDay",y9M="tM",d7c="tmen",t7R=b6S.O0T.x0T("2b")?"ju":"accidentalClick",J5R="ute",A6c="fierT",l4C="Ide",W37=b6S.O0T.x0T("61")?"indi":"saveAnnotation",j9w="gl",l7I="_x",m6j=b6S.O0T.x0T("111")?"olum":"transitionMS",D7c=b6S.O0T.x0T("ec")?"setVolumeUnderlay":"tartT",M3C=b6S.O0T.x0T("1c")?"tho":"barTop",F5R="inut",R8I=b6S.O0T.x0T("f6")?"ecis":"p",H0U="fie",M5I="denti",Z8z="tiq_x",D9D="olume",i2M=b6S.O0T.x0T("d81d")?"tR":"Low",A7R=b6S.O0T.x0T("27")?"djust":"canvasColor",a9z="Off",p6c="tartD",H6c=b6S.O0T.x0T("acd")?"ci":"daysSinceLow",l3w="ymbol",N4c="Iden",X4w="csv",M3I="TSRealT",W01="xBA",P4D="ervic",w3j="tRa",Z1c="hartB",V0C="artBars",g67="rtTi",c27="rtBars",R7D="rtDa",q3z="Met",o3j="tment",b1z="rec",d8M="olP",i3C="fier",U5M="sv",N0c="isI",K8U="Ra",E81="tBars",B3D="COff",Z9R="hartBa",m3j="tart",Q7I="artB",B31="ntMet",P8c="cis",T5R="lP",F6w="Id",e71="hartiq_x",W1I="ces",T2T="entRatio",f4I="us",f5U="hartBar",z37="lu",X6j="tBar",t8j="tB",y51="artT",J4D="artBar",D6c="Ch",s2D="ntMe",c4D="olPr",u8z="ymb",t8w="dent",p1R="Tim",i5I="artD",E0M="ntRati",H0R="ustm",z7C="rtB",e5D="Bar",s0U="Ba",L8c="tBa",A6z="fse",O9z="rtBa",i2C="etho",y2T="stm",M2c="dj",c7U="isi",x3U="ifi",U3C="rti",J9z="Quot",u7I="lume",N3R="_xign",m67="encies_x",Y0D="harti",H47="urr",L0w="ily",U9c="iodT",W3w="Typ",l6j="ixin",M8c="tals",E6R="lm",J11="ob",U5C="tiq",w7w="ail",g1c="dT",u1j="ngT",f5R="Fix",f9D="ite",k6w="xig",p6w="enci",r8z="curr",S91="arti",w7U="rvice",R67="lues",c0I="um",a5T="alue",B2C="alu",h2w="_xig",K0R="alind",c2T="lob",W7T="iq",a31="rvic",K7R="lQu",j5D="Globa",c9C="Rat",d6R="lQuo",x0C="obalQ",o8z="lQuote",w6U="ba",H9D="loba",M5w="lobalQ",Z9T="tes",l3j="obal",v3I=",",I8R="Gl",f1w="ho",e4C="dju",X91="&",G4z="rTy",t1R="ifie",d3C="Ident",B9D="ange",v2z="lMo",M8j="tG",E1C="otes",o4D="lyQu",D67="torical",G9R="lH",V8R="oba",o4M="GetG",y2D="ww_xignit",H3I="/",p81="rtiq",Z4C="ervices",I6w="://",j9z="isIE9",E41="0000",o0M="000",N4w="bypassSnapshot",B0U="ken",l8c="Day",d2U="nite",H41="Xig",W8z="method",x7z="time",G8U="isForexMetal",R6R="Templates",y5I="Me",y47="getSnapshotQuote",M3D="igni",B8U="rv",W8U="gni",g9R="oteF",R3C="isForexSymbol",r97="isBats",B2I="Quo",G4T="timeZone",E9C="Utility",h41="Feed",Q6R="token",M2C="Xignite",X6M="postAjax",c1U='$',y7D="symbology",q8D="ticks",o81=20000,d37="maxRecords",c0T="America/New_York",C51="=",A2R="ype",O51="?",R6C="getETDateTime",N2T="QuoteFeed",i9R="Australia/Sydney",a9T="exchangeZones",o77="url",G87="BarChart",N81="date",y1M="setMarkerTick",l0T="node",q1I="reset",K2T="0px",G3z="DIV",W6I="markers",q71="redrawTimeout",r3M="clear",o1C="start",f2c="comparison_stop",G9U="startPlugin",F6I="son",O0M="toggleCorrelate",x6I="requestCorrelation",q9T="ela",d9C="cor",L47="rison",C7C="priceFormat",J7T="createComparisonSegment",A2U="iso",a81="ompa",G8C="createComparisonSegmentInner",N2D="stopSort",h6U="percentToPrice",J77="priceToPercent",Y0M="sort",f6C="profileRange",H3j="twoClicked",D8R="profile",X5T="bellcurve",j87="awi",h6I=".",l4R="setOuter",h9T="outer",R3j="xIntersection",I7w="level",F41="fibs",H8D="mapping",s27="fibonacci",d87="lw",O4z="fi",V8w="drag",F4D="pointIntersection",H4c="littleCircle",f9T="whichPoint",A77="fillColor",Z1I="rans",F1j="rits",W6U="nhe",s6z="ellipse",Y6I="rit",S3U="freezeTick",T8C="freeze",Q2M="intersect",x2w="8g",o6C="pixelFromDate",A5w="intervalRatio",Z6c="pNodes",s5U="nodes",r5c="startY",R5c="startX",b9U="lowY",K2w="hiY",o9U="lowX",E5w="hiX",V4z=0.3,K3R="splineTension",n1R="freeform",i17="accidentalClick",F1c="continuous",K91="Drawin",K6D="axisLabel",f2R="ray",N9R="v0B",y8M="v1",o3c="ptrn",Z51="pnl",m5w="penDown",B4w="d1B",O2T="d0B",v5D="v1B",C31="erv",p5I="segment",x1j="stxInheritsFrom",W7C="p1",X0C="W7",J97="fnt",F5I="replaceFields",R1U="bg",D8U="bc",g71="dateFromTick",j0U="d0",F37="copyConfig",s8R="focus",i1D="pi",Y8U="annotationCancel",r0D="annotationSave",A6I="value",p3c="Co",A47="borderColor",Q8z="stem",s7C="p0",q5T="pixelFromValueAdjusted",F0w="currentColor",z1c="fontString",Z7I="weight",X2c="fontDef",H11="BaseTwoPoint",u4D="eritsF",C0c="_passToModulus",L2z="M2",E4D="Last",U6c="drawZones",i8R="reverse",Y8M="bottomBand",u1C="topBand",D7M="yChann",B4T="displayMassIndex",f2M="Support 3 ",P7D="Pivot ",R9T="Resistance 1 ",K9z="Resistance 2 ",G2z="Resistance 3 ",U7M="prepareChannelFill",R4C="displayPivotPoints",w6w="_hist1",I71="displayElderRay",D3M="studyOverBoughtValue",t1M="studyOverZonesEnabled",l4D="esA",w9I="displayRAVI",Z2R="displayAwesomeOscillator",k9T="displayPrettyGoodOscillator",L87="elativ",N3D="eR",u4z="yP",v4z="disp",t5M="ate",d0I="extended",D27="calculatePriceRelative",r1C="calculateFractalChaos",V8D="calculateCCI",u81="calculateAccumulationDistribution",G7w="calculateMaxHighMinLow",K5R="5F",X4T="elo",X3c="cEn",u7R="Ge",K2I="late",q5M="teM",N7M="alcula",h0c="Standard Deviations",O1z="field",e9U="calculateBollinger",L6U="ica",U1I="nea",N3C="alcul",U61="calculateCoppock",n5M="MA ",e7z="Moving Average Type",a3w="calculateKeltner",C5M="calculatePriceOscillator",e41="calculateVerticalHorizontalFilter",O1C="calculatePrimeNumber",P0T="calculateAroon",h9I="udi",m4D="era",d4T="calculateDetrendedPrice",k7T="calculateChandeForecast",u9w="calculateMoneyFlowIndex",C8z="calculateMassIndex",h07="calculateTwiggsMoneyFlow",P67="lt",s1c="Res",g9I="calculateChaikinMoneyFlow",g7I="calculateChaikinVolatility",r2D="ow",g5U="calculatePivotPoints",J01="calculateEaseOfMovement",N5R="calculateCenterOfGravity",Y3D="calculateElderForce",X4c="calculateElderRay",L8U="edC",g8j="culateWei",c9M="typicalPrice",t77="calculateRateOfChange",x7c="calculateChange",W8c="calculateRandomWalk",u21="calculateSwingIndex",L5c="calculateHistoricalVolatility",Y5D="calculatePerformance",B8D="calculateVolumeIndex",X7w="calculateOnBalanceVolume",K0C="calculatePriceVolumeTrend",g6D="lose",y8D="calculateUltimateOscillator",g9c="calculateAwesomeOscillator",h5w="ema",W1w="calculatePrettyGoodOscillator",R7w="calculateEhlerFisher",j5U="zoneOutput",T7C="np",j57="ent",c9w="hM",r7U="d1",c1R="ld",o9R="Fi",X4U="calculateSchaff",y4M="cul",L5z="nput",h47="calculateQStick",G71="tum",o2w="yMo",Q8R="rad",R8w="ateInt",h1R="lc",z0M="nPri",i5w="Med",C6M="calc",E7R="calculateTRIX",b1D="calculatePSAR",j6w="referenceOutput",y9D="calculateATRStops",R7M="ATR ",Z7M="Shift",n8U="calculateGenericEnvelope",n41="calculateATRBands",N7C="calculateStudyATR",h7c="tick",x0R="computePosition",n67="ame",Y3z="nam",o6D="displaySeriesAsLine",e01="displayIchimoku",H5I="futureB",J5I="futureA",k8R="calculateIchimoku",W51="substring",P61="uotes",y3M="_calculateStochastics",S3w="cri",t0z="yD",w3C="ema2",s91="calculateTypicalPrice",k6M="tp",f2U="calculateKlinger",v8C="calculateCorrelationCoefficient",y0T="ys",k4M="teMo",e27="lcul",K7c="bed",p1M="ssionIn",T8I="calculateChandeMomentum",N3U="calculateMovingAverage",i4T="std",k47="calculateMovingAverageWeighted",o5z="calculateMovingAverageVariable",n4I="calculateMovingAverageTimeSeries",J3z="_calculateMovingAverage",c91="vi",c0R="ays",F0M="calculateStandardDeviation",N17="vera",f11="gA",e6C="vin",T67="eMo",y9z="Studi",t3w="MACD",J4c="macd2",l51="calculateMovingAverageExponential",k4U="Stu",s0C="StudyDescriptor",r4c="macd1",c6z="put",F1M="days",d1c="_calculateMACD",D4w="cal",x4w="ia",J1z="noUpdate",e3j="endDate",E9M="makeParams",h8U="loadingMore",d4C="loadMore",F7I="uo",o21="doCleanupGaps",n6c="fetch",E2M="originalState",L7c="update",T37="startDate",j0T="callback",d4M="ati",t4z="announceError",o5D="quotes",j5c="missingBarsCreated",o0R="sym",j2T="refreshInterval",B77="updatingChart",L4C="intervalTimer",X61="loadingNewChart",M4I="behavior",v1w="quoteFeed",G0U="Driver",D6j=((127,8.78E2)>32.?(61.2E1,"J"):(0x1D,0x88)),R9R="isFuturesSymbol",d4c="cleanupGaps",l3I="line",l9c="addStudy",e8w="percent4",W8w="percent2",c8w="percent1",S8w="percent0",V2c="eF",f2T="ze",y7I="numeric",l11="getTimezoneOffset",L8M=.9,o6M=33,m0U="2d",P9w=1.1,i7D="ek",g7R="adjust",Y4R="previousAdjust",r4R="scrubbed",e0c="Qu",A87="nter",N87="uot",w2w="wi",j5w="il",A0z="concat",n3w="tex",t7c="center",u1z="middle",z4c="top",d3M=20,G1c="object",d2D="scrollTo",A1z="scrollEvent",a1R="mD",W9w="mouse",G3j="pointerType",u7z="he",u9M="nge",j6D="setPeriodicityV2",R5I="momentumDistance",Z8I="momentumTime",S1D="ec",s5M="tV",D6z="ren",y1D="ea",J6U="twoFingerStart",l61="val",P01="eCh",b0T="im",B4I="tar",u9z="ger",w8j="woF",c6I="cancelSwipe",U7w="touchingEvent",L91="iod",S57="period",S5c="grabStartPeriodicity",b7R="grabEndPeriodicity",Y9C="grabStartValues",g2M="ues",Z0I="goneVertical",o2R="moveCount",i5D="ee",n3z="y2",w51="x2",r21="x1",B6D="pt",O8I="gestureStartDistance",a7U="d2",M1z="pinchingScreen",n9w="moveA",U1C="touchMoveTime",D9w="moveB",i5R="crosshairYOffset",W4U="crosshairXOffset",U5w="ie",T1j="changedTouches",x4z="movedSecondary",F5w="movedPrimary",k9D="sqrt",Y0U="stop",M8I="detail",K5I="overrideGesture",N8w="pointerId",w8M="mouseMode",m7c="e2MS",I0R="s1MS",G2U="e1MS",h5M="s2MS",U3R="ult",u0R="ignoreTouch",M4z="touchDoubleClick",P0c="findHighlights",N9M="cur",d1j="ackOu",z9c="clicks",z7R="editingAnnotation",B4c="tom",h17="displayPanelResize",S4U="displayIconsClose",E0U="displayIconsSolo",N7U="displayIconsUpDown",d9w="wn",d4R="title",z7I="ine",w7T="tyl",m4w="els",w7C="ottom",c9U="topOffset",c47="edit",M0R="down",a6M=(31.40E1>(1.219E3,110.2E1)?(101,"&"):121.>=(0x147,70)?(121.,30):0x215<(0x1FA,0xE0)?(80.,'I'):(89,1.2570E3)),I6C="resolveY",e1R="solo",N6R="savePanels",W5T="showCrosshairs",C1R="privateDeletePanel",h0M="nel",g4T="soloing",l8C="closeX",o1I="icons",K57="appended",X3D="storePanels",w7c="removeSeries",J7C="mouseWheel",g8R="onmousewheel",F5T="onmouseup",O5M="ad",t2U="touchstart",A8R="iphone",o0c="tou",R1w="touchend",O2D="gestureInEffect",u2R="touchmove",N4I="ur",R6z="uote",y01=":",Z8j="zoomOut",a3M="zoomIn",k67="mousedown",F81="touching",O61="touches",G01="event",E3z="die",h8c="size",c0U="setResizeTimer",c7M="eventListeners",m8c="addEventListener",N7z="Cha",T7w="ize",r7I="markerHolder",J9C="deleteHighlighted",b7z="ontouchend",v0z="onmspointerup",l27="symbolDisplay",X2C="stackPanel",l9M="nels",K5T="ontouchstart",U2D="0B",o3C="position",X3R="manageTouchAndMouse",I4U="locale",i1z="Legac",H6j="tF",p71="5",Z0M="ark",W1R="Leg",Q5M="padding",T1M="isEmpty",s81="mete",b1C="unt",f3z="xT",b0M="studyQuotes",w9U="Dat",j7T="ym",C3w="ter",g2T="In",G5R="getNextInterval",V6I="one",E5U="appendMasterData",C6j=((65.,0x127)>(0xE6,1.79E2)?(90.0E1,"K"):(27,0x33)),c71="setDisplayDate",C8I="displayZone",Z77="Di",z7c="toString",D21="nut",P0M="initializeChart",Z1M="setMasterData",w8U="har",P9I=59,G2R="adjustPanelPositions",E8z="resizeCanvas",s5I="yaxisWidth",D1U="adjustBackingStore",M1C="tio",I9c="eP",M4T="iv",C87="drawCurrentHR",j7c="drawVectors",d6C="drawSeries",Q3R="displayChart",q7U="drawXAxis",B0R="initializeDisplay",x21="createXAxis",M0U="createDataSegment",e5I="correctIfOffEdge",R6j="drawPanels",v5U="makeAsyncCallbacks",K2U="ice",M81="fc",W4M="sy",n4D="asyncCallbacks",d2C="pendingAsyncs",x3M="#FFFFFF",E21="00",m9C="transparent",A4D="#000000",h0w="xis",o2z="whichSet",q3U="Re",F5D="ef",h8j="oll",j4I="createVolumeChart",J91="base",L5w="preparePeakValleyFill",P2I="ace",p8z="pus",A0M="containerColor",B61="ev",Q1M="getCanvasColor",V9I="tx",n5D="lin",P8w="lor",i77="unPrep",h6M=32,t8R="ote",b8c="dQ",L3j="so",u8c="plugins",p2I="A5",U1j="tD",y3c="Cl",x3R="Clo",B8C="Adj_Close",j9c="Split_Close",z9R="ose",a51="endClip",v17="startClip",t9T="hideDrawings",g5c="vectorsShowing",t6z="checkLoadMore",r6c="qu",q1w="moreAvailable",C11="men",e4R="ataS",b3D="quoteDriver",h6j="dataCallback",N9I="ack",s4C="dontRoll",t2D="eri",Q31="ers",E6D="eY",W6R="baseLegendColors",Z2w="legend",x6R="end",M9w="Le",F3R="panelClose",E6C="correlationPanel",l0I="isComparison",A4w="addSeriesData",V4I="ue",B6w="masterData",c8c="type",C3I="chartName",J6w="studyPanelMap",j7C="studies",b1I="inputs",L8z="Field",k7w="npu",A7z="rightClickOverlay",R4M="removeOverlay",w1I="editFunction",q9w="Li",V6R="rab",n3M="Pa",q5R="wing",K4z="highlighted",t81="An",y6c="appendClassName",j8R="unA",M2D="drawingClick",T9c="mouseup",s4U="rightClickHighlighted",n4R="button",p8I="which",Z5M="stx-drag-chart",V7c="unappendClassName",N01=250,V5D="mouseTimer",U6R="now",D6w="ctor",T9C="con",v8U="rr",M7D="adjustDrawings",e2M="addDrawing",t4c="anel",v2R="raw",L3R="userPointerDown",Z5U="chartsOnly",e91="awin",j4T="ste",r01="lineDashOffset",j8w="setLineDash",g1U="bj",n3I="att",b8U="city",r6M="stxLine",L9w="y1",v9w="y0",e21="x0",C2D="yIntersection",O6I="va",A4c="pattern",w5I="pop",r3D="shallowClone",J9I="undoStamps",k5c="pp",U8w="stx_",w3I="undo",u9C="ratio",e7M="untransformFunc",t51="tickFromDate",F2U="isp",L11="oc",O17="handle",j5T="plotLine",O3U="osi",e77="lay",h67="translationCallback",H5R="Bars",c51=(0x186>(0x20E,3.280E2)?(4.07E2,")"):(7.,142)),r31=" (",y21="%",N71="percent",R27=10000,L3M=10,i8U=1000,t4w=.01,O9w=100,T8M=.1,C9C="numbers",e9M="ss",X87="inline-block",U67="chooseForegroundColor",o47="col",t57="backgroundColor",c2M="sp",j2c="1H",z8C="children",H4D="mSticky",y9I=50,n7z="setMeasure",l5U="spla",x1w="ht",H8I="isStep",f9U="yValueCache",I0c="pixelFromPriceTransform",p01="outputMap",d4D="Se",N41="libraryEntry",t61="dat",Q3U="ixe",a0M="displaySticky",Q2c="po",l4c="permanent",c6j="as",P2c="anv",S2z="magnetize",C6w="drawTemporaryPanel",O5R="resizePanels",l0C="move",L2w="gn",N2C="win",L17="Dr",x51="repositioner",h2M="tY",p4I="bac",e6c="valueFromPixelUntransform",T6z="panelName",f8M="repositioningDrawing",B0z="touchDevice",E4M="ag",e7T="yp",S2R="vec",t8D="Col",d7R="setC",B9z="measure",y1j="sc",R8z="shift",O7w="grabStartZoom",b4z="span",a87="whitespace",f0R="scr",H7D="setCandleWidth",M5c="pinchingCenter",z1w="ipadMaxTicks",c5U="ick",w6I="ipad",Y6U="minimumCandleWidth",C9D="grabStartCandleWidth",x77="ctrl",A5T="grabOverrideClick",u7w="yToleranceBroken",O87="grabStartScrollY",Z4M="grabStartY",M87="grabStartScrollX",a5M="grabStartX",r8I="ve",Q3c="highlight",z0z="overlays",o9C="anyHighlighted",Q9I="resizingPanel",T2R="displayCrosshairs",r61="grabbingScreen",r2z="insideChart",v0R="canvasRight",L6D="airX",F9D="os",K0c="cr",g6j="adjustIfNecessary",Y5z="crosshairValue",C0w="mPi",D9T="kF",h9D="crosshairTick",q0z="whichPanel",M7C="isAndroid",f0D="setInterval",H9I="clearInterval",C7R="resizeChart",C1I="clientWidth",L9z="clientHeight",J7c="devicePixelRatio",H6D="eX",k6D="pa",X8I="mousemoveinner",c8I="mousemove",H8R="pageY",B1w="scrollTop",J5w="clientY",b9z="age",Z1D="documentElement",x7C="scrollLeft",S6w="clientX",E1R="pageX",J9M="headsUpHR",i1w="canvasHeight",x9U="2H",E9D="offsetWidth",p2M="tX",J4w="backO",d5C="offsetHeight",N67="parentNode",w81="oa",B8w="getPos",v9z="lastAccessoryUpdate",d7C="accessoryTimer",W6z="openDialog",w2T=true,V6z="cancelTouchSingleClick",r7w="ssh",x5D="auto",r2M="tro",H5U="rol",j0c="block",h3C="yle",s2c="none",T0U="cursor",L8D="dy",R2c="magnet",X3M="preferences",C47="display",G7c="dragToDraw",j3C="undisplayCrosshairs",n8D="Ty",O4U="ect",A7c="cu",u1I="crosshair",k2T="displayInitialized",X81="doDisplayCrosshairs",s3C="updateChartAccessories",K3D="px",L61="crosshairY",I8M=.5,Y1I="xel",F4M="ai",A5M="backOutY",g4M="backOutX",B3c="tempCanvas",d57="pixelFromTick",K3w="rval",T71="int",i61="crosshairX",A7M="tickFromPixel",e1j="am",D2D="Type",j01="magnetizedPrice",w1U="sY",A5D="cros",y5c="swapClassName",L3C="annotation",P5D="vertical",a27="horizontal",W2w="vectorType",d3I="currentVectorParameters",e11="drawingLine",P2z="stx_crosshair_drawing",M0c="stx_crosshair",r2U="rm",d0c="cx",S7I="floatDate",W3j="sh",F5C="ode",d3R="zIndex",W4w="style",g2U="sL",a1C="yax",n2M="clearCanvas",I31="rendered",j2I="getContext",P8M="childNodes",X71="floatHR",k3z="Lo",e0M="q",u2w="pixel",i1M="art",L5T="pan",Y2z="plotLineChart",T0M="aS",k31="createYAxisLabel",s0M="Pr",S8D="and",P2C="extendLastTick",S4T="conte",T11="noSlopes",g2R="skipProjections",o6j="omP",U5R="Fr",x4T="ix",u9D="em",T2c="pl",r81="mul",u1D="ane",a1w="los",D0z="ope",N5D="ayout",W3D="eL",z8z="yA",z9C="ntex",P7z="fl",P6M="ffs",x9I="Hig",h27="Hi",F7U="bo",a97="ier",U0I="ul",O0D="pe",o1D="romP",J1C="ne",Y3j="ax",B6c="are",P1M="th",i7M="W",R57="clo",L1M="close",W6c="cl",P4U="open",W8R="cache",p8M="v0",d77="Open",Z5I="projection",v9D="ot",m71="7",H8M="ars",n8M="outputs",A9R="setStyle",n6R="lum",P91="No",c9R="High",Q6I="Low",J2M="ata",K7D="aram",b3C="gh",L0z="hi",I51="displayVolumeProfile",q5c="di",i3M="tu",k1c="removeVolumeProfile",J0R="ume",D4I="_v",S0T="Width",U8D="dt",C1M="tm",z9z="isIE8",q7z="tmpWidth",p7T="underlayPercentage",S2D="or",T4C="ns",U6M="tr",U4U="stx_candle_shadow",L6C="stx_candle_down",o7I="up",z0D="e_",t0M="_ca",P3c="drawYAxis",p67="Axis",t4M=((2.18E2,1.)>5.020E2?(36,"w"):26.40E1>=(0x176,41.)?(10.,"Y"):(8.790E2,92.)),C9T="crea",H4C="clearPixelCache",J2C="igh",C3R="lue",Y6C="Va",T3R="lo",B8c="highValue",B0D="lowValue",Q41="B",v8M="abs",v1j="transformFunc",N7T="baseline",R9M="tT",q8M="bottomOffset",B6U="shareYAxis",Z91="parameters",m2T="series",E2C="pen",N7I="un",q4M="Z",X8U="ru",e07="Seg",J51="createYAxis",w91="studyLibrary",a4w="Studies",w4C="iqPrevClose",G3c="Close",J7w="can",f5I="translateIf",o1M="watermark",K2R="hidden",K41="panels",X9D="Volume",M2w="volumeMax",k61="preventDefault",f4z="crossY",F6z="onmousedown",o7z="crossX",y3C="createCrosshairs",A3j="F",U8M="to",B0c="rna",v7M="al",T6U="rn",p27="inte",Q4R="currentPanel",z1D="toFixed",M6U="form",s87="priceFormatters",h5T="iz",Z8w="condenseInt",T47="mi",M1M="char",o7D="ol",r0U="anva",s9R="stx_yaxis",Z8U="isT",P9c="dra",j9D="en",o37="nA",G6I="ext",t8U="sT",m51="plotYAxisGrid",V8z="ha",G7U="yAx",a5C="yaxisLeft",T8R="canvasWidth",t67="formatYAxisPrice",v7z="priceFormatter",T0T="Axi",D7C="pixelFromPrice",L4M="semiL",S7U="sF",Y11="roundit",U0z="axisBorders",o5M="_",Q6z="gr",W7M="rice",s0c="yAxisPlotter",v5M="ac",c5c="pr",u5U="printDecimalPlaces",E3M="decimalPlaces",G0D="valueFromPixel",X5R="multiplier",c6M="ric",m3R="mP",U5U="ri",x87="priceTick",o4U="range",k5D="Si",T6R="Tic",Y2c="de",Q0c="logHigh",q4I="logShadow",w4I="logLow",e2T="LN10",q4w="ig",K81="og",T5D="activeDrawing",S0U="ra",Y1U="semiLog",B8j="shadow",k5z="ft",N3c="ca",Q6U="cacheRight",s2U="cacheLeft",N0C="cacheLow",S4w="low",O47="cacheHigh",o5w="high",y41="noChange",n0z="xi",X07="teYA",i2c="Ti",l37="ma",z1U="setFullYear",q6U="setMonth",I5M="setDate",P6j="se",a61="setSeconds",i6R="ll",H5w="etMi",L9M="tS",G9z="setMilliseconds",q0C="monthDay",t7I="Mo",l9z="get",c77="me",E8c="getMilliseconds",M4w="getSeconds",W9T="convertTimeZone",L7T="dataZone",D1M=((45,0x1AE)>(0x1D3,35.)?(11.21E2,"j"):(0x89,68)>0x8B?(138,"EMA"):(0x125,12.74E2)),H7T="it",N4M=((0x3,13.0E2)<=6.53E2?"pnl":(44,0x13C)<0x255?(0x185,"U"):(50,129)),e1M="arr",x9c="clone",A7T="io",U5T="endMinute",I9D="endHour",T9I="aSe",V6j="at",X31="Ax",v9T="hart",I41=((93.60E1,129)>=(2.64E2,85.9E1)?(100.10E1,58):(120.30E1,0x81)<(14.34E2,0x20A)?(0x19C,"C"):(69,54.)<13.?.75:(7.71E2,1.002E3)),T3j="E",i6j="I",E1U="bi",t6w="ime",k9c="offset",w87="index",C5I="pow",q31="ex",e4I="ind",r9I="determineMinMax",F91="idealTickSizePixels",b6U="ro",K51="pixelsBetweenXAxis",H9M="G",N3j="ay",Z3I="displ",b4C="G3",o1j="Q",S5w="MAX_VALUE",F9M="b",A7w="J3",q07="xaxisHeight",N3I="3",Z7D="om",K4U="bott",u0C="axi",u2M="displayBorder",f97="bottom",w2M="st",K6R="newSeries",M5D="Plotter",j5z="h6",H3R="right",X1j="R",q3M="left",z4M="max",F71="6",f6z="canvasFont",b7M="X",R9c="dd",k2C="monthAsDisplay",F2T="K6",E7C="no",R1M="b6",S5D="g6",b97="ks",c7w="ic",E8D="eT",l7D="el",N2M="ab",H87="XA",M2U="D8",V4C="timeAsDisplay",w3M="tt",t9z="L8",h01="8",B7U="T8",h0C="o8",C3c="format",Q17="mo",i2D="er",q2I="z",o8R="li",d8C="na",z1M="ti",T3D="internationalizer",S7T="is",X6z="formatter",E2R="Z8",c7T="futureTicks",B3M="useDataDate",J2w="gm",b47="taSe",I91="1",v71="candleWidthPercent",M4D="q1",l91="0",b3R="floor",Y3c="ce",t97="ceil",D0I="getFullYear",C2T="getMonth",h7M="te",i7C="timeShiftDate",l41="displayDate",S7D="on",q3j="si",y9C="Ses",n4C="nu",n8C="getDate",f7w="ment",m91="taS",n2D="U0",t4R="xaxis",s9U="s0",h7I="w0",N8R="xAxis",U3U="dataSegment",e6w="text",y6z="grid",S1w="hz",x7D="XAxisLabel",i1C="timeZoneOffset",v4c="aSet",k4c="da",k3D="r7",s6D="B7",j1w="Time",k8U="rs",Z5D="ou",S07="our",v9M="H",W2T="runAppend",c3I="yAxis",c7D="panel",E4C="calculateYAxisMargins",h4U="candleWidth",o61="g7",f8w="getCanvasFontSize",u6w="yaxisLabelStyle",T4c="maxTicks",B9R="min",F1w="charts",E8j=(111<=(4.47E2,0xEF)?(113,"S"):(0x3F,1.77E2)),m2I="uc",N1C="nc",W0M="runPrepend",e8z="N4",s67="scroll",P87="initialMarginBottom",U07="initialMarginTop",E0w="zoom",w5w="month",s4z="week",K8j="ar",O4c="cy",p61="day",n61="od",r2I="v",x0M="p",D1C="nd",t3U="rou",F3I="symbol",C4z="yM",V01="4",E9I=60,q8j=9,O8D=60000,c21=1500,N9D="q4",d2T="minute",u11="C5",P1c="e5",z5D="et",Z2U="rk",l9R="ke",L6I="Ma",k6C="ga",y1c="round",D5T="setMinutes",l6I="setHours",Y4M="getDay",s2I="x",K17="minutesInSession",r9D="q5",A71="beginMinute",L8R="getMinutes",n6j=(109.<(0x50,0x1A2)?(0x1CA,"N"):97.>=(53.7E1,92.0E1)?"S":(0x39,10.86E2)<=74.0E1?(61.5E1,9.74E2):(0x195,0xBC)),a6R="beginHour",C6I="getHours",G3I="2",x0I="A2",z8I="ut",L8j="T",F3j="D",Y7w="getTime",a5c="strToDateTime",P3R="nextMonth",q0I="ont",W6C="nextWeek",h8D="nextDay",Q9C="nextPeriod",Q1D="prevMonth",q1M="b2",M0D="prevWeek",Q7c="ket",U9M="ega",c3j=(147.<(0x2E,94.0E1)?(86.,"L"):(107.,0x2B)),g07="prevDay",P0I="prevPeriod",N77="LegacyMarket",m8R="isDailyInterval",Z87="yyyymmddhhmm",q4c="DT",X3C="h9",W31="Date",X8j="M",g91="dataSet",W27="periodicity",r7T="yo",k9w="interval",F57="splice",Z6M="g",S7w="vector",k21="abortDrawings",q91="undoStamp",X6c="reconstruct",f57="Drawing",T5U="name",n3D="To",i0I="ing",J3j="aw",f8D="B9",R3U="serialize",k2c="drawingObjects",I57="push",M6M="ts",b6j="O",X5C="ng",K8M=(143>=(5.810E2,0x1F)?(0x156,"i"):(0x19E,0x9E)>=0x1B6?118.60E1:(79.,32.)),J2I=((0xD7,102)>=(126,96.)?(135.9E1,"w"):(0xD8,2.)>0x1B7?(0xA,210):24.8E1>(37,0x155)?(41.80E1,0xFF):(89,126.)),F3D="dr",K01="9",P8U="rt",N0U="volumeUnderlay",W9C="Set",f4M="ta",W1c="Da",N4U="re",i8I="adj",A01="createDataSet",p3M="v9",K5M="aggregationType",x7T="you",L57="la",H2M="changeOccurred",Y5M="draw",L8w="chartType",k5I="layout",K6c="ck",x2c="eC",S8M="k",F17="lba",N1c="Ca",z3C="ge",D77="currentlyImporting",X3j="canvasColor",T6I="drawingTools",G8D="registerDrawingTool",Y3w="apply",u27=false,W6D="hideDates",O1R="le",d8U="sS",c4C="nv",m2M="stripPX",H6I="opacity",B3I="defaultColor",s7c="isTransparent",c7R="color",o4z="context",H1w="log",Q5D="ed",m8z="indexOf",Q0D="fontFamily",r3w="fontSize",e2w="fontWeight",B1I=" ",k6c="fontStyle",g2I="y",o31="St",x31="vas",m1j="an",w5z="xt",S1z="nte",U8c="co",i7z="sty",M3z="canvasStyle",l5D="es",E1M="l",t9I="ty",d0M="s",n3j="removeChild",v7c="className",J1I="styles",h6z="slice",l3R="charAt",i3I=((4.7E1,7.59E2)>(0x32,133.5E1)?0x1E3:(136,16)>=0x1D8?'X':(65.,0x33)<=108?(104,"-"):(0x1E4,43.)),T91="split",B7M="",l81="toUpperCase",a7T="replace",c0C="makeCamelCase",s9I="onclick",y67="home",y11="onmouseout",E0T="in",B4D="eg",x1M="m",g7D="onmouseover",k7D="#zoomOut",o57="chartControls",C6R="#zoomIn",i67="ls",F4C="nt",c1M="o",o2M="c",X5w="id",Z7z="appendChild",Z9c="innerHTML",Q4M=(0xBA<(0x18E,11.10E1)?"1.1":(43,2.56E2)<26.70E1?(131.6E1,"V"):(0xA5,115.)>(6.15E2,0x244)?(0x12F,1.326E3):(0x23E,12.16E2)),i4w="createElement",b9M="controls",V61="cha",Y21="#",w8w="container",X1c="chart",h3R='dit',o5C='bs',E7c='wn',C8C='us',L4z='las',g8C='co',p1U='tle',H2C='anel',s07='> ',j0w='on',p9T='pl',p51='ndle',j2z='ne',C2R='ay',E0z='isp',i87='te',S7C='splay',t4T='tyl',c4w='_t',p4z='ump',q0w='_j',P0w='oo',b61='In',M31='">-</',A8C='ut',t5w='oom',h9C='u',R8C='oomO',V87=(96<=(26.1E1,6.99E2)?(116.,'z'):(16.,29.6E1)),s1U='ize',Y9R='ar',d0w='om',W2C='tt',V3D='; ',j0R='ols',q9C='tr',W5I='t_con',i6U='ha',N2U='isplay',z5w='_y',a7w='crosshai',v9c=(37<(124.,0x10E)?(53,'_'):(0x20C,147.3E1)),B3C='air',Q01='rossh',a4T='_c',n47=';"></',d2z='lay',E07='ir_x',i5T='ssh',K1j='tx_c',N91='osshair',e7D='x_c',z4U='ass',Y4U='nner',z17='ice',S8R='><',E9R='as',X2U='loat',Z61='0',U11=((0x145,0x1FE)>=51.?(0xBD,'2'):(1.242E3,13)),K47='ght',w9D='ei',v6z='00',v9C='w',W0C=';"><',R8D=': ',r4C='ispl',L51='le',W5C='ty',L0R='ri',x9R='at',r71='lo',h6D='f',s97='>)</',Q7R='ete',f61='el',w11='lic',p2w='igh',v37=((19.,6)<=0x56?(0x1A2,'r'):14>=(57.80E1,93)?(0x1C3,0xFD):(79,126)),H7R='>(</',C4c='ion',v77='ct',C01='eteInstru',V2D='D',g97='se',X2w='ou',X7R='></',z5T=';</',H57='sp',p7R='">&',E5c='h',D4U='ras',z2C='"><',I9T='one',b0U='play',L1j='is',I01='yle',r1c='hC',X51='yTra',k0C='verl',n2c='o',s8M='> <',p0z='"></',J2z='rior',X1D='nte',I7D='I',t2c=(1.365E3<=(1.071E3,128.0E1)?(0x99,85.):(0xCE,57.)<134.6E1?(97,'k'):(7.13E2,0xF4)<(12.5E2,0x7D)?(0x1EB,1.112E3):(0x1C8,0x245)),p0R='Sti',F11='"> <',S67='y',b2w='ick',E0D='S',D2c='i',D3j='iv',U3D='d',t4D='cel',d3U='an',l1M=';">',R5T='0p',R81='1',F61=':',L9c='eft',t9C='argi',A9c=(0>(0x26,44)?(1.227E3,"d"):(84.,0x22A)<(2.98E2,96.)?'d':(0x1CF,0x1D1)>(0x24,132.)?(0x142,'m'):(112.,68)),Q8I='tyle',B5w='" ',O2c='l',T0C='ce',m7M='n_c',H9U='otatio',Q2z='_ann',u87='x',B9C='t',H8c='lass',B9T='pan',o2D='>',A37='p',h8C='</',N6U='ve',x8j='">',D6D='e',b9C='v',f3D='a',x5w='_s',K7T='notatio',O8j='tx_a',Z37='tn',H9c='b',G81='-',q5C='tx',B7C='="',t47='ss',o0I='la',w3D='c',o0U=' ',C9c='n',M8w='pa',x37='s',V31='<',d9U="htmlControls",F4U=((125.,75)>(105.10E1,130.)?(0x1D8,1500):82>=(2.30E1,11.)?(60.90E1,null):(0xAF,78)>(113.30E1,0xAF)?100:(2,0x52)),l4U="body",E4c="target",k2w="gesture",h3I="gesturePointerId",a3z="isSurface",V0M="r",E8M="h",O9C="XC",a4U="ST",U8C="timezoneJS",b1U="plotSpline",h1M="camelCaseRegExp",G0c="CLOSEUP",F6D="CLOSEDOWN",N51="CLOSEEVEN",R6D="CANDLEUP",m1I="CANDLEDOWN",D5I="mouseHasMoved",J3I="Comparison",k8c="currentZindex",y7w="Markers",Y9=function(V9){STX[y7w][k8c]=V9;}
,q9=function(n9){STX[J3I][D5I]=n9;}
,S9=function(z9){var w8D="CANDLEEVEN";STXChart[w8D]=z9;}
,f=function(N){STXChart[m1I]=N;}
,G=function(X){STXChart[R6D]=X;}
,F=function(Q){STXChart[N51]=Q;}
,O=function(L){STXChart[F6D]=L;}
,J=function(U){STXChart[G0c]=U;}
,E=function(W){var I4R="NONE";STXChart[I4R]=W;}
,P=function(Z){STX[h1M]=Z;}
,plotSpline=_stxThirdParty[b1U],timezoneJS=_stxThirdParty[U8C],STX=_exports[I2C],STXChart=_exports[(a4U+O9C+E8M+b6S.a9M+V0M+b6S.K7M)],$$=_exports[x2R],$$$=_exports[r6z];STXChart.prototype.plugins={}
;if(STX[a3z]){var V=function(H){STX[h3I]=H;}
,z=function(Y){STX[k2w][E4c]=Y[l4U];}
;STX[k2w]=new MSGesture;z(document);V(F4U);}
STXChart[d9U]={"annotationSave":(V31+x37+M8w+C9c+o0U+w3D+o0I+t47+B7C+x37+q5C+G81+H9c+Z37+o0U+x37+O8j+C9c+K7T+C9c+x5w+f3D+b9C+D6D+x8j+x37+f3D+N6U+h8C+x37+A37+f3D+C9c+o2D),"annotationCancel":(V31+x37+B9T+o0U+w3D+H8c+B7C+x37+B9C+u87+G81+H9c+B9C+C9c+o0U+x37+q5C+Q2z+H9U+m7M+f3D+C9c+T0C+O2c+B5w+x37+Q8I+B7C+A9c+t9C+C9c+G81+O2c+L9c+F61+R81+R5T+u87+l1M+w3D+d3U+t4D+h8C+x37+A37+d3U+o2D),"mSticky":(V31+U3D+D3j+o0U+D2c+U3D+B7C+A9c+E0D+B9C+b2w+S67+F11+x37+A37+d3U+o0U+D2c+U3D+B7C+A9c+p0R+w3D+t2c+S67+I7D+X1D+J2z+p0z+x37+A37+d3U+s8M+x37+A37+d3U+o0U+D2c+U3D+B7C+n2c+k0C+f3D+X51+x37+r1c+f3D+C9c+B5w+w3D+o0I+t47+B7C+x37+q5C+G81+H9c+Z37+B5w+x37+B9C+I01+B7C+U3D+L1j+b0U+F61+C9c+I9T+z2C+x37+A37+d3U+o0U+w3D+O2c+f3D+x37+x37+B7C+x37+B9C+u87+G81+D2c+w3D+n2c+G81+B9C+D4U+E5c+p7R+C9c+H9c+H57+z5T+x37+A37+d3U+X7R+x37+A37+f3D+C9c+s8M+x37+A37+f3D+C9c+o0U+D2c+U3D+B7C+A9c+X2w+g97+V2D+D6D+O2c+C01+v77+C4c+x37+z2C+x37+M8w+C9c+H7R+x37+B9T+o2D+v37+p2w+B9C+G81+w3D+w11+t2c+o0U+B9C+n2c+o0U+U3D+f61+Q7R+V31+x37+B9T+s97+x37+M8w+C9c+X7R+x37+A37+d3U+X7R+U3D+D2c+b9C+o2D),"floatHR":(V31+U3D+D3j+o0U+w3D+O2c+f3D+x37+x37+B7C+x37+q5C+G81+h6D+r71+x9R+G81+A37+L0R+w3D+D6D+B5w+x37+W5C+L51+B7C+U3D+r4C+f3D+S67+R8D+C9c+n2c+C9c+D6D+W0C+w3D+d3U+b9C+f3D+x37+o0U+v9C+D2c+U3D+B9C+E5c+B7C+R81+v6z+B5w+E5c+w9D+K47+B7C+U11+Z61+B5w+w3D+O2c+f3D+x37+x37+B7C+x37+q5C+G81+h6D+X2U+G81+A37+v37+D2c+w3D+D6D+G81+w3D+d3U+b9C+E9R+p0z+w3D+d3U+b9C+E9R+S8R+U3D+D3j+o0U+w3D+o0I+t47+B7C+x37+q5C+G81+h6D+r71+x9R+G81+A37+v37+z17+G81+D2c+Y4U+p0z+U3D+D2c+b9C+X7R+U3D+D2c+b9C+o2D),"crossX":(V31+U3D+D3j+o0U+w3D+O2c+z4U+B7C+x37+B9C+e7D+v37+N91+o0U+x37+K1j+v37+n2c+i5T+f3D+E07+B5w+x37+W5C+L51+B7C+U3D+D2c+H57+d2z+R8D+C9c+I9T+n47+U3D+D3j+o2D),"crossY":(V31+U3D+D3j+o0U+w3D+O2c+z4U+B7C+x37+B9C+u87+a4T+Q01+B3C+o0U+x37+q5C+v9c+a7w+v37+z5w+B5w+x37+Q8I+B7C+U3D+N2U+R8D+C9c+n2c+C9c+D6D+n47+U3D+D3j+o2D),"chartControls":(V31+U3D+D2c+b9C+o0U+w3D+O2c+f3D+t47+B7C+x37+B9C+u87+v9c+w3D+i6U+v37+W5I+q9C+j0R+B5w+x37+Q8I+B7C+U3D+D2c+H57+d2z+R8D+C9c+n2c+C9c+D6D+V3D+H9c+n2c+W2C+d0w+R8D+U11+U11+A37+u87+W0C+U3D+D2c+b9C+o0U+D2c+U3D+B7C+w3D+E5c+Y9R+B9C+E0D+s1U+z2C+x37+B9T+o0U+D2c+U3D+B7C+V87+R8C+h9C+B9C+B5w+w3D+O2c+E9R+x37+B7C+x37+q5C+G81+V87+t5w+G81+n2c+A8C+M31+x37+A37+f3D+C9c+S8R+x37+B9T+o0U+D2c+U3D+B7C+V87+n2c+d0w+b61+B5w+w3D+O2c+f3D+t47+B7C+x37+B9C+u87+G81+V87+P0w+A9c+G81+D2c+C9c+M31+x37+B9T+X7R+U3D+D2c+b9C+X7R+U3D+D2c+b9C+o2D),"home":(V31+U3D+D2c+b9C+o0U+D2c+U3D+B7C+E5c+n2c+A9c+D6D+B5w+w3D+O2c+E9R+x37+B7C+x37+B9C+u87+q0w+p4z+c4w+n2c+U3D+f3D+S67+o0U+E5c+d0w+D6D+o0U+x37+B9C+u87+G81+H9c+Z37+B5w+x37+t4T+D6D+B7C+U3D+D2c+S7C+F61+C9c+n2c+C9c+D6D+z2C+x37+M8w+C9c+X7R+x37+M8w+C9c+X7R+U3D+D2c+b9C+o2D),"floatDate":(V31+U3D+D2c+b9C+o0U+w3D+O2c+f3D+t47+B7C+x37+B9C+u87+G81+h6D+O2c+n2c+f3D+B9C+G81+U3D+f3D+i87+B5w+x37+W5C+L51+B7C+U3D+E0z+O2c+C2R+R8D+C9c+n2c+j2z+n47+U3D+D3j+o2D),"handleTemplate":(V31+U3D+D2c+b9C+o0U+w3D+H8c+B7C+x37+B9C+u87+G81+D2c+w3D+n2c+G81+E5c+f3D+p51+B5w+x37+Q8I+B7C+U3D+L1j+p9T+f3D+S67+R8D+C9c+j0w+D6D+W0C+x37+M8w+C9c+X7R+x37+M8w+C9c+X7R+U3D+D2c+b9C+s07),"iconsTemplate":(V31+U3D+D3j+o0U+w3D+o0I+t47+B7C+x37+q5C+G81+A37+d3U+D6D+O2c+G81+w3D+j0w+B9C+v37+n2c+O2c+B5w+x37+B9C+S67+L51+B7C+U3D+L1j+A37+o0I+S67+R8D+C9c+n2c+j2z+W0C+U3D+D2c+b9C+o0U+w3D+O2c+f3D+x37+x37+B7C+x37+q5C+G81+A37+H2C+G81+B9C+D2c+p1U+p0z+U3D+D2c+b9C+S8R+U3D+D3j+o0U+w3D+o0I+x37+x37+B7C+x37+B9C+u87+G81+H9c+Z37+o0U+x37+q5C+G81+D2c+g8C+z2C+x37+A37+f3D+C9c+o0U+w3D+L4z+x37+B7C+x37+B9C+u87+G81+D2c+g8C+G81+h9C+A37+p7R+C9c+H9c+H57+z5T+x37+A37+f3D+C9c+X7R+U3D+D2c+b9C+S8R+U3D+D2c+b9C+o0U+w3D+O2c+f3D+t47+B7C+x37+B9C+u87+G81+H9c+B9C+C9c+o0U+x37+B9C+u87+G81+D2c+g8C+z2C+x37+M8w+C9c+o0U+w3D+O2c+z4U+B7C+x37+q5C+G81+D2c+g8C+G81+h6D+n2c+w3D+C8C+p7R+C9c+H9c+H57+z5T+x37+B9T+X7R+U3D+D2c+b9C+S8R+U3D+D2c+b9C+o0U+w3D+O2c+E9R+x37+B7C+x37+B9C+u87+G81+H9c+B9C+C9c+o0U+x37+q5C+G81+D2c+g8C+z2C+x37+A37+f3D+C9c+o0U+w3D+O2c+z4U+B7C+x37+B9C+u87+G81+D2c+w3D+n2c+G81+U3D+n2c+E7c+p7R+C9c+o5C+A37+z5T+x37+B9T+X7R+U3D+D2c+b9C+S8R+U3D+D2c+b9C+o0U+w3D+O2c+E9R+x37+B7C+x37+B9C+u87+G81+H9c+Z37+o0U+x37+q5C+G81+D2c+g8C+z2C+x37+M8w+C9c+o0U+w3D+o0I+x37+x37+B7C+x37+q5C+G81+D2c+w3D+n2c+G81+D6D+h3R+p7R+C9c+o5C+A37+z5T+x37+A37+f3D+C9c+X7R+U3D+D3j+S8R+U3D+D2c+b9C+o0U+w3D+H8c+B7C+x37+q5C+G81+H9c+Z37+o0U+x37+B9C+u87+G81+D2c+w3D+n2c+z2C+x37+A37+f3D+C9c+o0U+w3D+O2c+f3D+t47+B7C+x37+B9C+u87+G81+D2c+g8C+G81+w3D+O2c+n2c+x37+D6D+p7R+C9c+H9c+H57+z5T+x37+A37+d3U+X7R+U3D+D3j+X7R+U3D+D2c+b9C+o2D)}
;STXChart.prototype.registerHTMLElements=function(){var X2I="modalEnd",B5I="artC",o97="firstChild",Q6c="DI",c=this[X1c][w8w];for(var control in STXChart[d9U]){if(typeof this[X1c][control]==Q11){var el=$$$(Y21+control,c);if(el){this[(V61+V0M+b6S.K7M)][control]=el;this[b9M][control]=el;}
else{var rawHTML=STXChart[d9U][control],div=document[i4w]((Q6c+Q4M));div[Z9c]=rawHTML;el=div[o97];c[Z7z](el);this[X1c][control]=el;this[b9M][control]=el;el[X5w]=control;}
}
}
;if(this[b9M][(o2M+E8M+B5I+c1M+F4C+V0M+c1M+i67)]){var zoomIn=$$$(C6R,this[b9M][o57]),zoomOut=$$$(k7D,this[b9M][o57]);zoomIn[g7D]=(function(self){return function(e){var P7R="alB";self[(x1M+c1M+b6S.l2M+P7R+B4D+E0T)]();}
;}
)(this);zoomIn[y11]=(function(self){return function(e){self[X2I]();}
;}
)(this);zoomOut[g7D]=(function(self){return function(e){var S4R="modalBegin";self[S4R]();}
;}
)(this);zoomOut[y11]=(function(self){return function(e){self[X2I]();}
;}
)(this);}
if(this[b9M][y67])this[b9M][y67][s9I]=(function(self){return function(e){self[y67]();}
;}
)(this);}
;P(/-([a-z])/g);STX[c0C]=function(name){return name[a7T](STX[h1M],function(g){return g[b6S.p1j][l81]();}
);}
;STXChart.prototype.cloneStyle=function(styleObject){var Q6w="getPropertyValue",rc={}
;for(var i in styleObject){var v=styleObject[i];if(!isNaN(i)){var x=styleObject[Q6w](v);if(x){var vcc=B7M;v=v[T91](i3I);var ii=b6S.M1j;jj=v.length;while(++ii<jj){vcc+=v[ii][l3R](b6S.M1j)[l81]()+v[ii][h6z](b6S.p1j);}
rc[vcc]=x;}
}
else{var icc=i[a7T](STX[h1M],function(g){return g[b6S.p1j][l81]();}
);rc[icc]=v;}
}
return rc;}
;STXChart.prototype.canvasStyle=function(className){var J0M="cloneStyle",l3C="div",s=this[J1I][className];if(!s){var div=document[i4w](l3C);div[v7c]=className;document[l4U][Z7z](div);var styles=getComputedStyle(div);s=this[J1I][className]=this[J0M](styles);document[l4U][n3j](div);if(!styles){this[J1I][className]=F4U;}
}
return s;}
;STXChart.prototype.clearStyles=function(){this[(d0M+t9I+E1M+l5D)]={}
;}
;STXChart.prototype.setStyle=function(obj,attribute,value){var X3z="Case",H4R="makeCame";if(!this[J1I][obj]){this[M3z](obj);}
if(!this[J1I][obj])this[J1I][obj]={}
;this[(i7z+E1M+b6S.I2M+d0M)][obj][STX[(H4R+E1M+X3z)](attribute)]=value;}
;STXChart.prototype.canvasFont=function(className,ctx){var T61="bad css style for class ",D01="efin";if(!ctx)ctx=this[X1c][(U8c+S1z+w5z)];var style=this[(o2M+m1j+x31+o31+g2I+E1M+b6S.I2M)](className);if(!style)return ;var result=style[k6c]+B1I+style[e2w]+B1I+style[r3w]+B1I+style[Q0D];if(result[m8z]((X7M+n1M+b6S.l2M+D01+Q5D))==-b6S.p1j){ctx.font=result;}
else{this[J1I][className]=F4U;console[H1w](T61+className);}
}
;STXChart.prototype.canvasColor=function(className,ctx){var e8U="fine";if(!ctx)ctx=this[X1c][o4z];var style=this[M3z](className);if(!style)return ;var color=style[c7R];if(STX[s7c](color))color=this[B3I];ctx.globalAlpha=1;ctx.fillStyle=color;ctx.strokeStyle=color;var opacity=style[H6I];if(typeof opacity!=(X7M+n1M+b6S.l2M+b6S.I2M+e8U+b6S.l2M))ctx.globalAlpha=opacity;}
;STXChart.prototype.getCanvasFontSize=function(className){var g61="12",s=this[M3z](className),fs=s[r3w];if(!fs)fs=g61;return parseInt(STX[m2M](fs));}
;STXChart.prototype.getCanvasColor=function(className){var s=this[(o2M+b6S.a9M+c4C+b6S.a9M+d8U+t9I+O1R)](className);return s[c7R];}
;STXChart[W6D]=function(){return u27;}
;STXChart.prototype.runPrepend=function(o,args,self){var J0C="appl",M61="g9",prepends=this["prepend"+o];if(!prepends)return false;if(!self)self=this;for(var i=0;b6S[(M61)](i,prepends.length);i++){var rv=prepends[i][(J0C+g2I)](self,args);if(rv)return rv;}
return false;}
;STXChart.prototype.runAppend=function(o,args,self){var t6M="b9",appends=this["append"+o];if(!appends)return false;if(!self)self=this;for(var i=0;b6S[t6M](i,appends.length);i++){var rv=appends[i][Y3w](self,args);if(rv)return rv;}
return false;}
;STXChart[G8D]=function(name,func){STXChart[T6I][name]=func;}
;STXChart.prototype.createBlock=function(left,width,top,height,className,context){var x0w="j9";if(b6S[x0w](context,null))context=this[X1c][o4z];if(typeof (height)=="undefined"){return ;}
this[X3j](className,context);context.fillRect(left,top,width,height);context.globalAlpha=1;}
;STXChart.prototype.changeOccurred=function(change){var K1R="lb",q6D="ang";if(this[D77])return ;if(this[(b6S.j3c+m1j+z3C+N1c+E1M+F17+o2M+S8M)])this[(o2M+E8M+q6D+x2c+b6S.a9M+E1M+K1R+b6S.a9M+K6c)](this,change);}
;STXChart.prototype.setChartType=function(chartType){var q6c="s9";this[k5I][L8w]=chartType;if(b6S[q6c](this[(b6S.j3c+b6S.a9M+V0M+b6S.K7M)].canvas,null))this[Y5M]();this[H2M]((L57+x7T+b6S.K7M));}
;STXChart.prototype.setAggregationType=function(aggregationType){this[k5I][K5M]=aggregationType;if(b6S[p3M](this[X1c].canvas,null)){this[A01]();this[Y5M]();}
this[H2M]("layout");}
;STXChart.prototype.setAdjusted=function(data){var S3R="I9";this[(k5I)][i8I]=data;if(b6S[S3R](this[X1c].canvas,null)){this[(o2M+N4U+b6S.a9M+b6S.K7M+b6S.I2M+W1c+f4M+W9C)]();this[Y5M]();}
this[H2M]("layout");}
;STXChart.prototype.setVolumeUnderlay=function(data){var S27="m9";this[k5I][N0U]=data;if(b6S[S27](this[(V61+P8U)].canvas,null))this[(Y5M)]();this[H2M]("layout");}
;STXChart.prototype.serializeDrawings=function(){var l17="bje",arr=[];for(var i=0;b6S[(g2I+K01)](i,this[(F3D+b6S.a9M+J2I+K8M+X5C+b6j+l17+o2M+M6M)].length);i++){arr[I57](this[k2c][i][R3U]());}
return arr;}
;STXChart.prototype.abortDrawings=function(){for(var i=0;b6S[f8D](i,this[k2c].length);i++){this[k2c][i].abort(true);}
this[k2c]=[];}
;STXChart.prototype.reconstructDrawings=function(arr){var K3j="ols",Y9c="r9";for(var i=0;b6S[Y9c](i,arr.length);i++){var rep=arr[i],Factory=STXChart[(F3D+J3j+i0I+n3D+K3j)][rep[T5U]];if(!Factory){if(STX[f57][rep[T5U]]){Factory=STX[f57][rep[T5U]];STXChart[G8D](rep[T5U],Factory);}
}
if(Factory){var drawing=new Factory;drawing[X6c](this,rep);this[k2c][I57](drawing);}
}
}
;STXChart.prototype.clearDrawings=function(){this[q91]();this[k21]();this[H2M](S7w);this[A01]();this[Y5M]();}
;STXChart.prototype.createDrawing=function(type,parameters){var s7M="Draw",drawing=new STX[(s7M+E0T+Z6M)][type];drawing[X6c](this,parameters);this[k2c][I57](drawing);this[Y5M]();return drawing;}
;STXChart.prototype.removeDrawing=function(drawing){var r5I="A9",E6M="cts",G9T="je",h5R="rawingOb",o3w="K9";for(var i=0;b6S[o3w](i,this[(b6S.l2M+h5R+G9T+E6M)].length);i++){if(b6S[r5I](this[k2c][i],drawing)){this[k2c][F57](i,1);this[H2M]("vector");this[Y5M]();return ;}
}
}
;STXChart.prototype.dateFromTick=function(tick,chart){var H0D="B2",E4U="T2",S87="o2",j6M="v2",u3c="s2",n8w="j2",B1M="cyMar",q21="P2",Y6R="Y2",n4z="z2",N8M="R9";if(!chart)chart=this[X1c];var interval=this[k5I][k9w],periodicity=this[(L57+r7T+X7M+b6S.K7M)][W27],l=chart[g91].length;if(b6S[(X8j+K01)](tick,l)&&b6S[N8M](tick,0))return chart[g91][tick][W31];if(b6S[X3C](tick,0)){var dt=chart[g91][0][q4c];for(var i=0;b6S[n4z](i,3000);i++){if(-i==tick)return STX[Z87](dt);if(!this[m8R](interval))dt=STX[N77][P0I](dt,interval,periodicity,this);else if(b6S[Y6R](interval,"day"))dt=STX[N77][g07](dt,periodicity,this);else if(b6S[q21](interval,"week"))dt=STX[(c3j+U9M+B1M+Q7c)][M0D](dt,periodicity,this);else if(b6S[q1M](interval,"month"))dt=STX[N77][Q1D](dt,periodicity,this);}
}
else{var dt=chart[g91][b6S[n8w](l,1)][(q4c)];for(var i=0;b6S[u3c](i,3000);i++){if(b6S[j6M](l-1+i,tick)){return STX[Z87](dt);}
if(!this[m8R](interval))dt=STX[N77][Q9C](dt,interval,periodicity,this);else if(b6S[S87](interval,"day"))dt=STX[N77][h8D](dt,periodicity,this);else if(b6S[E4U](interval,"week"))dt=STX[N77][W6C](dt,periodicity,this);else if(b6S[H0D](interval,(x1M+q0I+E8M)))dt=STX[N77][P3R](dt,periodicity,this);}
}
return STX[Z87](dt);}
;STXChart.prototype.futureTick=function(mydt,chart){var o07="X5",c2U="D5",f9M="u5",C9z="L5",I0I="O5",C4U="T5",R2I="cyM",m07="o5",L4U="d5",N47="oun",H3c="s5",d1w="j5",g8M="b5",b5D="g5",x8D="V5",z61="C2",S2T="K2",t5c="r2",mym=STX[a5c](mydt)[Y7w](),interval=this[k5I][k9w],periodicity=this[k5I][W27],dt=chart[g91][b6S[t5c](chart[g91].length,1)][(F3j+L8j)],m=dt[Y7w](),ticks=0,computedPeriodicity=periodicity;if(!this[m8R](interval)){if(b6S[S2T](interval,(x1M+K8M+n1M+z8I+b6S.I2M)))computedPeriodicity=b6S[x0I](periodicity,interval);}
for(var i=0;b6S[(X8j+G3I)](i,1500);i++){if(!this[m8R](interval)){if(b6S[z61](dt[C6I](),chart[a6R])&&b6S[(n6j+G3I)](dt[L8R](),chart[A71])){if(b6S[(r9D)]((mym-m)/60000,chart[K17])){dt=STX[N77][(n1M+b6S.I2M+s2I+b6S.K7M+F3j+b6S.a9M+g2I)](dt,1,this);if(b6S[(x8D)](chart[a6R],0)&&b6S[b5D](dt[Y4M](),0)){dt[l6I](15);dt[D5T](0);}
if(b6S[g8M](chart[a6R],0)&&b6S[d1w](dt[Y4M](),1)){ticks+=Math[y1c](b6S[H3c](9,60,computedPeriodicity));}
else{ticks+=Math[(V0M+N47+b6S.l2M)](b6S[L4U](chart[K17],computedPeriodicity));}
}
else{dt=STX[N77][Q9C](dt,interval,periodicity,this);ticks+=1;}
}
else{dt=STX[(c3j+b6S.I2M+k6C+o2M+g2I+L6I+V0M+l9R+b6S.K7M)][Q9C](dt,interval,periodicity,this);ticks+=1;}
}
else{ticks+=1;if(b6S[m07](interval,"day"))dt=STX[(c3j+b6S.I2M+k6C+R2I+b6S.a9M+Z2U+z5D)][h8D](dt,periodicity,this);else if(b6S[C4U](interval,"week"))dt=STX[N77][W6C](dt,periodicity,this);else if(b6S[I0I](interval,"month"))dt=STX[N77][P3R](dt,periodicity,this);}
m=dt[Y7w]();if(b6S[C9z](m,mym)){return (b6S[f9M](chart[g91].length,1))+ticks;}
if(b6S[c2U](mym,m)){return (b6S[o07](chart[g91].length,1))+ticks-1;}
}
return (b6S[P1c](chart[g91].length,1))+ticks;}
;STXChart.prototype.pastTick=function(mydt,chart){var I11="C4",D0c="e4",w17="X4",g7w="prevWee",V2U="D4",B9M="u4",G3U="LegacyMa",q2z="L4",s3I=210,p0I="O4",d6U="isHalfDay",q2C="arke",k07="o4",T6M="v4",c3c="s4",m8w="j4",U0M="b4",m2D="g4",c3D="V4",b6z="N5",mym=STX[a5c](mydt)[Y7w](),interval=this[k5I][k9w],periodicity=this[k5I][W27],dt=chart[g91][b6S.M1j][q4c],m=dt[Y7w](),ticks=b6S.M1j,computedPeriodicity=periodicity;if(!this[m8R](interval)){if(b6S[u11](interval,d2T))computedPeriodicity=b6S[b6z](periodicity,interval);}
for(var i=b6S.M1j;b6S[N9D](i,c21);i++){if(!this[m8R](interval)){if(b6S[(c3D)](dt[C6I](),chart[a6R])&&b6S[m2D](dt[L8R](),chart[A71])){var dt2=STX[N77][g07](dt,b6S.p1j,this);if(b6S[U0M]((dt2[Y7w]()-mym)/O8D,chart[K17])){dt=dt2;if(b6S[m8w](chart[a6R],b6S.M1j)){if(b6S[c3c](dt[Y4M](),b6S.M1j)){ticks+=Math[y1c](b6S[T6M](q8j,E9I,computedPeriodicity));}
else{ticks+=Math[y1c](b6S[k07](chart[K17],computedPeriodicity));}
}
else if(b6S[(L8j+V01)](chart[a6R],q8j)&&STX[(c3j+U9M+o2M+C4z+q2C+b6S.K7M)][d6U](dt,chart[F3I])){ticks+=Math[(t3U+D1C)](b6S[p0I](s3I,computedPeriodicity));}
else{ticks+=Math[(t3U+n1M+b6S.l2M)](b6S[q2z](chart[K17],computedPeriodicity));}
}
else{dt=STX[(G3U+V0M+Q7c)][P0I](dt,interval,periodicity,this);ticks+=b6S.p1j;}
}
else{dt=STX[N77][(x0M+V0M+b6S.I2M+r2I+J6j+b6S.I2M+V0M+K8M+n61)](dt,interval,periodicity,this);ticks+=b6S.p1j;}
}
else{ticks+=b6S.p1j;}
if(b6S[B9M](interval,p61))dt=STX[(c3j+U9M+O4c+X8j+K8j+l9R+b6S.K7M)][g07](dt,periodicity,this);else if(b6S[(V2U)](interval,s4z))dt=STX[N77][(g7w+S8M)](dt,periodicity,this);else if(b6S[w17](interval,w5w))dt=STX[N77][Q1D](dt,periodicity,this);m=dt[Y7w]();if(b6S[D0c](m,mym)){return -ticks;}
if(b6S[I11](mym,m)){return -(ticks+b6S.p1j);}
}
return -ticks;}
;STXChart.prototype.calculateYAxisMargins=function(yAxis){yAxis[E0w]=yAxis[U07]+yAxis[P87];yAxis[s67]=b6S[e8z]((yAxis[U07]-yAxis[P87]),b6S.G1j);}
;STXChart.prototype.home=function(){var Q1w="j7",r1M="b7",C8D="V7",w5D="q7",p6z="ngleClick";if(this[W0M]("home",arguments))return ;this[(o2M+b6S.a9M+N1C+b6S.I2M+E1M+n3D+m2I+E8M+E8j+K8M+p6z)]=true;if(!this[X1c][g91]||b6S[w5D](this[(b6S.j3c+b6S.a9M+P8U)][g91].length,0))return ;for(var chartName in this[F1w]){var chart=this[(b6S.j3c+b6S.a9M+V0M+M6M)][chartName];chart[s67]=Math[B9R](chart[T4c],chart[g91].length);if(b6S[C8D](this[u6w],"roundRectArrow")){var margin=3,height=this[f8w]("stx_yaxis")+b6S[o61](margin,2),leftMargin=b6S[r1M](height,2),wsInTicks=Math[y1c](b6S[Q1w](leftMargin,this[k5I][h4U]));chart[s67]-=wsInTicks;}
this[E4C](chart[c7D][c3I]);}
this[Y5M]();this[W2T]("home",arguments);}
;STXChart.prototype.tickFromDate=function(dt,chart){var v2T="K7",k6j="pastTick",J6z="y7",Y07="futureTick",i27="m7",E3R="I7",o3M="v7",G1U="begi",u6c="s7";if(!chart[g91].length)return 0;if(!chart)chart=this[X1c];var DT=STX[a5c](dt);if(b6S[u6c](chart[(G1U+n1M+v9M+S07)],0)&&!STXChart[m8R](this[k5I][k9w])){if(b6S[o3M](DT[C6I](),0)){DT[(d0M+z5D+v9M+Z5D+k8U)](chart[a6R]);DT[D5T](chart[A71]);}
}
var mym=DT[(Z6M+b6S.I2M+b6S.K7M+j1w)](),m=chart[g91][b6S[(E3R)](chart[g91].length,1)][q4c][Y7w]();if(b6S[(i27)](m,mym))return this[Y07](dt,chart);var first=chart[g91][0][q4c][Y7w]();if(b6S[J6z](mym,first))return this[k6j](dt,chart);for(var i=b6S[s6D](chart[g91].length,1);b6S[k3D](i,0);i--){m=chart[(k4c+b6S.K7M+v4c)][i][q4c][Y7w]();if(b6S[(v2T)](m,mym))return i;}
}
;STXChart.prototype.timeShiftDate=function(dt){var E5I="A7",ms=dt[Y7w]();ms+=b6S[E5I](this[i1C],O8D);return new Date(ms);}
;STXChart[x7D]=function(hz,grid,text){this[S1w]=hz;this[y6z]=grid;this[e6w]=text;}
;STXChart.prototype.createXAxis=function(chart){var T5I="A6",Z17="mm",V8j="yym",x6D="r6",Z6D="B6",P6z="y6",Y97="m6",Z3R="I6",Z3M="v6",f6c="s6",L1w="j6",M8D="V6",W9D="q6",R0I="N8",c31="C8",a7c="e8",Z07="X8",z9T="orm",m5M="u8",v4U="d8",x4c="E8",e4T="k8",n7R="l8",m2R="H8",G67="n8",w4c="S8",m5I="a1",T8c="e1",X7I="A1",Y2T="K1",K2c="r1",A0D="B1",b7U="xaxisFactor",n8R="I1",D3c="E1",e1w="j1",w1M="b1",H2D="g1",q3D="V1",n5I="prettyXaxis",R0M="R0",b2z="M0",s6U="D0",n9M="u0",D5R="tDa",t5U="sI",b4T="L0",F2w="i0",d7w="J0",i1j="c0",k91="P0",V5R="createNumericXAxis",O8R="Y0",y4z="createTickXAxisWithDates",i4z="z0",L7z="axisType",u5z="h7",J8M="R7",w8z="M7";if(b6S[w8z](chart[U3U].length,0))return null;var arguments$=[chart],axisRepresentation=this[W0M]("createXAxis",arguments$);if(axisRepresentation)return axisRepresentation;var interval=this[k5I][k9w];if(b6S[J8M](interval,"tick")||b6S[u5z](chart[N8R][L7z],"ntb")||b6S[i4z](this[k5I][K5M],"rangebars")){return this[y4z](chart);}
if(b6S[O8R](chart[N8R][L7z],"numeric")){return this[V5R](chart);}
var displayLetters=false,periodicity=this[k5I][W27],candleWidth=this[k5I][h4U],p=periodicity,isIntraday=false,isDaily=false,isWeekly=false,isMonthly=false;if(b6S[k91](interval,"week")){isWeekly=true;p=b6S[h7I](5,p);}
if(b6S[i1j](interval,"month")){isMonthly=true;p=b6S[s9U](20,p);}
if(b6S[d7w](candleWidth*(20/p),50))displayLetters=true;var i=0;chart[t4R]=[];for(;b6S[F2w](i,chart[T4c]);i++){if(b6S[n2D](chart[(b6S.l2M+b6S.a9M+m91+B4D+f7w)][i],null))break;chart[t4R][I57](null);}
var dt;if(chart[U3U][i]){dt=chart[U3U][i][q4c];}
else{dt=new Date();}
var currentDate=dt[n8C](),is24=(b6S[b4T](chart[(x1M+K8M+n4C+b6S.K7M+b6S.I2M+t5U+n1M+y9C+q3j+S7D)],1440));if(is24){if(chart[U3U][i]&&chart[U3U][i][l41]){currentDate=chart[U3U][i][l41][n8C]();}
else{currentDate=this[i7C](dt)[(Z6M+b6S.I2M+D5R+h7M)]();}
}
var prevMonth=dt[C2T](),prevYear=dt[D0I](),ticksPerDay=1;if(!this[m8R](interval)){isIntraday=true;if(b6S[n9M](interval,"minute"))interval=1;ticksPerDay=Math[t97](b6S[s6U](chart[K17],periodicity,interval));}
else{isDaily=true;}
var ticksPerClick=Math[y1c](b6S[b2z](ticksPerDay,Math[(Y3c+K8M+E1M)](ticksPerDay/Math[b3R](100/candleWidth))));if(b6S[R0M](ticksPerClick,1))ticksPerClick=1;var minuteBoundary=b6S[(E8M+l91)](ticksPerClick,periodicity,interval);if(chart[n5I]){var mod=chart[n5I][b6S[M4D](periodicity,interval)];if(!mod)mod=1;if(b6S[q3D](minuteBoundary,mod)){minuteBoundary=b6S[H2D](Math[b3R]((minuteBoundary+mod)/mod),mod);}
}
var offset=Math[(V0M+c1M+X7M+D1C)](b6S[(w1M)](Math[y1c](candleWidth*this[v71])/2,1));axisRepresentation=[];var standardBeginDay=b6S[(e1w)](chart[a6R],60)+chart[A71];for(i;b6S[D3c](i,chart[T4c]);i++){if(!isMonthly&&b6S[n8R](chart[T4c]/ticksPerDay,(this[X1c].width/this[X1c][b7U]))){var prices;if(b6S[(L8j+I91)](i,chart[U3U].length)){prices=chart[(k4c+b47+J2w+b6S.I2M+n1M+b6S.K7M)][i];if(!prices)continue;dt=prices[q4c];if(chart[N8R][B3M]){dtShifted=dt;}
else if(prices[l41]){dtShifted=prices[l41];}
else if(isIntraday){dtShifted=this[i7C](dt);}
else{dtShifted=dt;}
}
else{if(!chart[N8R][c7T])break;if(isIntraday)dt=STX[N77][Q9C](dt,interval,periodicity,this);else if(isWeekly)dt=STX[N77][W6C](dt,periodicity,this);else if(isMonthly)dt=STX[N77][P3R](dt,periodicity,this);else if(isDaily)dt=STX[N77][h8D](dt,periodicity,this);if(chart[N8R][B3M])dtShifted=dt;else if(isIntraday)dtShifted=this[i7C](dt);else dtShifted=dt;}
var isNextDate=b6S[A0D](dt[n8C](),currentDate);if(is24)isNextDate=b6S[K2c](dtShifted[n8C](),currentDate);var nonBoundary=b6S[Y2T](dt[C6I](),chart[a6R])||b6S[(X7I)](dt[L8R](),chart[A71]);if(is24)nonBoundary=b6S[T8c](dtShifted[C6I](),0)||b6S[m5I](dtShifted[L8R](),0);if(isNextDate){var gridType="boundary";if(!isIntraday)gridType="line";currentDate=dt[n8C]();if(is24)currentDate=dtShifted[n8C]();var hz=(b6S[w4c](i,candleWidth))+offset;if(b6S[G67](gridType,"boundary"))hz=b6S[m2R](((i)*candleWidth),3);var text="";if(!STXChart[W6D]()){var y=dt[D0I]();if(b6S[E2R](y,prevYear)){prevYear=y;text=y;gridType="boundary";}
else{if(chart[N8R][X6z]){text=chart[(s2I+b6S.V71+s2I+S7T)][X6z](dtShifted,gridType);}
else if(this[T3D]){text=this[(K8M+F4C+b6S.I2M+V0M+n1M+b6S.a9M+z1M+c1M+d8C+o8R+q2I+i2D)][(Q17+n1M+b6S.K7M+E8M+W1c+g2I)][C3c](dtShifted);}
else{text=(dtShifted[C2T]()+1)+"/"+dtShifted[n8C]();}
}
}
if(b6S[n7R](hz,chart.width)){axisRepresentation[I57](new STXChart[x7D](hz,gridType,text));}
}
else if(nonBoundary){var minutes=b6S[e4T](dt[C6I](),60)+dt[L8R]();if(b6S[x4c](this[X1c][a6R],0)||b6S[v4U](dt[Y4M](),0))minutes=b6S[h0C](minutes,standardBeginDay);else minutes=b6S[B7U](minutes,(15*60));if(is24)minutes=b6S[(b6j+h01)](dtShifted[C6I](),60)+dtShifted[L8R]();if(b6S[t9z](minutes%minuteBoundary,0)){var hz=(b6S[m5M](i,candleWidth))+offset,text="";if(!STXChart[W6D]()){if(chart[N8R][(q6M+z9T+b6S.a9M+w3M+b6S.I2M+V0M)]){text=chart[N8R][X6z](dtShifted,"line");}
else{text=STX[V4C](dtShifted,this);}
}
if(b6S[(M2U)](hz,chart.width)){axisRepresentation[I57](new STXChart[(H87+s2I+K8M+d0M+c3j+N2M+l7D)](hz,"line",text));}
}
}
}
else{var prices;if(b6S[Z07](i,chart[U3U].length)){prices=chart[U3U][i];dt=prices[q4c];}
else{if(!chart[N8R][(q6M+X7M+b6S.K7M+X7M+V0M+E8D+c7w+b97)])break;if(isIntraday)dt=STX[N77][Q9C](dt,interval,periodicity,this);else if(isWeekly)dt=STX[N77][W6C](dt,periodicity,this);else if(isMonthly)dt=STX[N77][P3R](dt,periodicity,this);else if(isDaily)dt=STX[N77][h8D](dt,periodicity,this);}
dtShifted=dt;var m=dt[C2T](),y=dt[D0I]();if(b6S[a7c](y,prevYear)){prevYear=y;prevMonth=m;var hz=b6S[c31]((i*candleWidth),2),text="";if(!STXChart[W6D]())text=y;axisRepresentation[I57](new STXChart[x7D](hz,"boundary",text));}
else if(b6S[R0I](m,prevMonth)){var doIt="monthly";if(isWeekly&&b6S[W9D](chart[T4c]*periodicity,(52*1)))doIt="quarterly";else if(isMonthly&&b6S[(M8D)](chart[T4c]*periodicity,(12*1)))doIt="quarterly";else if(isDaily&&b6S[S5D](chart[T4c]*periodicity,(365*1)))doIt="quarterly";if(isWeekly&&b6S[R1M](chart[T4c]*periodicity,(52*2)))doIt=(E7C+n1M+b6S.I2M);else if(isMonthly&&b6S[L1w](chart[T4c]*periodicity,(12*2)))doIt="none";else if(isDaily&&b6S[(f6c)](chart[T4c]*periodicity,(365*2)))doIt="none";if(b6S[Z3M](doIt,"monthly")||(b6S[Z3R](doIt,"quarterly")&&(b6S[Y97](m,0)||b6S[P6z](m,3)||b6S[Z6D](m,6)||b6S[x6D](m,9)))){prevMonth=m;var hz=b6S[F2T]((i*candleWidth),2),text="";if(!STXChart[W6D]())text=STX[k2C](m,displayLetters,this);axisRepresentation[I57](new STXChart[x7D](hz,"line",text));}
}
}
var obj={DT:dtShifted,Date:STX[(g2I+g2I+V8j+x1M+R9c+E8M+E8M+Z17)](dtShifted)}
;if(b6S[T5I](i,chart[U3U].length))obj.data=chart[U3U][i];else obj.data=null;chart[t4R][I57](obj);}
this[W2T]("createXAxis",arguments$);return axisRepresentation;}
;STXChart.prototype.drawXAxis=function(chart,axisRepresentation){var j8D="H9p",w6R="n9p",W71="S9p",Y0I="a3",O8M="rid",p4C="p3",t17="F3",V51="x3",e31="U3",U6z="i3",e5C="W3",X6U="t3",S6j="c3",c7I="w3",m6R="Y3",B67="sBor",n1w="LUE",t1D="VA",P27="X_",W1z="x_",w4z="z3",N1I="unpaddedRight",S0c="minimumLabelWidth",arguments$=[chart,axisRepresentation];if(this[W0M]((b6S.l2M+V0M+b6S.a9M+J2I+b7M+b6S.V71+s2I+S7T),arguments$))return ;if(!axisRepresentation)return ;var priorBoundary=null,context=this[X1c][o4z];this[f6z]("stx_xaxis");context.textAlign="center";context.textBaseline="middle";for(var i=0;b6S[(X8j+F71)](i,axisRepresentation.length);i++){var obj=axisRepresentation[i],w=context.measureText(obj[e6w]).width,w2=Math[z4M](w,chart[N8R][S0c]);obj[S1w]=Math[b3R](obj[(S1w)])+.5;obj[q3M]=b6S[(X1j+F71)](obj[S1w],(w2/2));obj[H3R]=obj[S1w]+(b6S[j5z](w2,2));obj[N1I]=obj[S1w]+(b6S[w4z](w,2));}
var plotter=new STX[M5D]();plotter[K6R]("line","stroke",this[M3z]((w2M+W1z+Z6M+V0M+X5w)));plotter[K6R]("boundary","stroke",this[M3z]("stx_grid_dark"));plotter[K6R]("border","stroke",this[M3z]("stx_grid_border"));var bottom=chart[c7D][f97],yAxis=chart[c7D][c3I],context=this[X1c][o4z],prevRight=-1,nextBoundaryLeft=Math[(X8j+b6S.V71+P27+t1D+n1w)],drawBorders=chart[N8R][u2M]||this[(u0C+B67+b6S.l2M+i2D+d0M)],b=drawBorders?b6S[m6R](yAxis[f97],.5):yAxis[(K4U+Z7D)],middle=b6S[(J6j+N3I)](bottom,this[q07]/2);if(drawBorders)middle+=3;for(var nb=0;b6S[c7I](nb,axisRepresentation.length);nb++){if(b6S[(S6j)](axisRepresentation[nb][y6z],"boundary")){nextBoundaryLeft=axisRepresentation[nb][q3M];break;}
}
var gridDistance=0,boundaryDistance=0,prevHz=0;for(var i=0;b6S[X6U](i,axisRepresentation.length);i++){var obj=axisRepresentation[i];if(b6S[e5C](i,nb)){for(nb++;b6S[A7w](nb,axisRepresentation.length);nb++){if(b6S[U6z](axisRepresentation[nb][(Z6M+V0M+X5w)],(F9M+Z5D+n1M+b6S.l2M+K8j+g2I))){nextBoundaryLeft=axisRepresentation[nb][q3M];break;}
}
if(b6S[e31](nb,axisRepresentation.length)){nb=-1;nextBoundaryLeft=Math[S5w];}
if(prevRight>-1){if(b6S[V51](obj[q3M],prevRight))continue;}
}
else{if(prevRight>-1){if(b6S[t17](obj[q3M],prevRight))continue;}
if(b6S[(o1j+N3I)](obj[H3R],nextBoundaryLeft))continue;}
prevRight=obj[H3R];if(b6S[b4C](obj[S1w],0)&&b6S[p4C](Math[b3R](obj[N1I]),this[X1c].width)){if(chart[N8R][(Z3I+N3j+H9M+O8M+c3j+K8M+n1M+l5D)]){plotter.moveTo(obj[y6z],obj[S1w],yAxis.top);plotter.lineTo(obj[y6z],obj[S1w],b);}
if(drawBorders){plotter.moveTo("border",obj[S1w],b+.5);plotter.lineTo("border",obj[S1w],b+6);}
if(b6S[(q6M+N3I)](obj[y6z],"boundary")){boundaryDistance=b6S[Y0I](obj[S1w],prevHz);}
else{gridDistance=b6S[W71](obj[S1w],prevHz);}
prevHz=obj[S1w];this[X3j](b6S[w6R](obj[y6z],"boundary")?"stx_xaxis_dark":"stx_xaxis");context.fillText(obj[e6w],obj[S1w],middle);}
}
if(gridDistance)this[K51]=gridDistance;else this[K51]=boundaryDistance;if(b6S[j8D](axisRepresentation.length,1))this[K51]=0;if(drawBorders){var b=Math[(b6U+X7M+D1C)](yAxis[f97])+.5,w=Math[y1c](chart.width)+.5;plotter.moveTo("border",0,b);plotter.lineTo("border",w,b);}
plotter[Y5M](context);context.textAlign="left";this[W2T]("drawXAxis",arguments$);}
;STXChart.prototype.createNumericXAxis=function(chart){var a9D="B2p",Y7I="y2p",s9T="yout",w4R="m2p",H27="I2p",Y5U="v2p",C97="s2p",U6D="j2p",O0I="b2p",Z1C="g2p",Q2U="V2p",d2w="q2p",M3w="T9p",g2c="o9p",S7c="d9p",a6z="E9p",Y1C="k9p",h0I="l9p",p31="Z9p";axisRepresentation=[];chart[t4R]=[];for(var i=0;b6S[p31](i,chart[T4c]);i++){if(b6S[h0I](chart[U3U][i],null))break;chart[t4R][I57](null);}
for(var j=i;b6S[Y1C](j,chart[T4c]);j++){if(b6S[a6z](chart[U3U][i],null))break;}
var filledScreenRatio=b6S[S7c]((j-i),chart[T4c]),idealTicks=Math[y1c](b6S[g2c]((this[X1c].width*filledScreenRatio),chart[N8R][F91])),minMax=this[r9I](chart[U3U],[(e4I+q31)]),maxPoint=minMax[1],minPoint=minMax[0],range=b6S[M3w](maxPoint,minPoint);function niceNum(range,round){var w8R="N9p",w2z="C9p",F3w="9p",Y2R="D9p",r47="u9p",e8j="L9p",U9w="O9p",Z57="log10",exponent,fraction,niceFraction;exponent=Math[b3R](Math[Z57](range));fraction=b6S[U9w](range,Math[C5I](10,exponent));if(round){if(b6S[e8j](fraction,1.5))niceFraction=1;else if(b6S[r47](fraction,3))niceFraction=2;else if(b6S[Y2R](fraction,7))niceFraction=5;else niceFraction=10;}
else{if(b6S[(b7M+F3w)](fraction,1))niceFraction=1;else if(b6S[(b6S.I2M+K01+x0M)](fraction,2))niceFraction=2;else if(b6S[w2z](fraction,5))niceFraction=5;else niceFraction=10;}
return b6S[w8R](niceFraction,Math[C5I](10,exponent));}
var niceRange=niceNum(b6S[d2w](maxPoint,minPoint),false),tickSpacing=niceNum(b6S[Q2U](range,(idealTicks-1)),true),niceMin=b6S[Z1C](Math[b3R](minPoint/tickSpacing),tickSpacing),niceMax=b6S[O0I](Math[t97](maxPoint/tickSpacing),tickSpacing),nextLabel=niceMin;if(b6S[U6D](niceMin,minPoint))nextLabel=niceMin+tickSpacing;var hz;for(i;b6S[C97](i,chart[T4c]);i++){var prices=chart[U3U][i];if(prices){var obj={index:prices[w87],data:prices}
;chart[t4R][I57](obj);if(b6S[Y5U](prices[w87],nextLabel))continue;if(b6S[(H27)](prices[(K8M+n1M+b6S.l2M+q31)],nextLabel)){hz=(b6S[w4R](i,this[(L57+s9T)][h4U]))+this[k9c];}
else if(b6S[Y7I](prices[w87],nextLabel)){hz=b6S[a9D]((i*this[k5I][h4U]),3);}
axisRepresentation[I57](new STXChart[x7D](hz,"line",nextLabel));nextLabel+=tickSpacing;}
else{chart[t4R][I57](null);}
}
return axisRepresentation;}
;STXChart.prototype.createTickXAxisWithDates=function(chart){var a6U="i0p",H2T="J0p",a4C="W0",T8D="eU",G6U="t0p",v4C="maxTimeUnit",n1D="c0p",D9c="P0p",b2R="Y0p",I0C="z0p",m0I="h7p",n01="inu",M1R="HO",K9T="R7p",B1U="eco",W7z="M7p",p5D="cond",O0w="A7p",y0D="K7p",b8z="r7p",I3j="B7p",h5U="y7p",c6U="m7p",k7c="I7p",T07="nT",b71="v7p",S41="s7p",u91="abel",R21="xisL",m37="j7p",w0z="b7p",D0U="g7p",D51="V7p",F07="q7p",A3U="C4p",Z3z="minTimeUnit",L3U="4p",j4R="X4p",W2c="D4p",l2I="u4p",q2T="L4p",K6j="O4p",E61="T4p",x3D="UR",j1M="o4p",E8I="d4p",u4M="Seconds",w1c="E4p",b7c="k4p",i1c="l4p",D57="Z4p",v4M="H4p",P8C="n4p",r4I="lYe",H0M="getFu",B7c="S4p",B27="Zone",X9z="a5p",L1I="f5p",K37="minTim",u6z="p5p",S9U="G5p",x8c="timeUnitMultiplier",q4R="Q5p",N5c="F5p",r91="x5",Q2D="timeUnit",v61="U5p",A17="i5p",m1C="J5p",G61="timePossibilities",K1D="W5p",t0C="t5p",G8j="c5p",A1R="w5p",A4T="P5p",u2U="Y5p",q2D="z5p",s2R="h2p",T0D="R2p",Q9D="gme",k3U="M2p",J4C="aSegm",L6M="K2p",A1M="r2p",L4D="TE",H0I="NU",Q81="DECADE",h6R="YEAR",q1C="MONTH",M9c="DAY",J7M="HOUR",C8U="MINUTE",N0R="SECOND",d27="MILLISECOND",u4w="ssi",M7M="Po",c2D="timeIntervalMap";if(!chart)chart=this[X1c];if(!this[c2D]){this[(b6S.K7M+t6w+M7M+u4w+E1U+o8R+b6S.K7M+K8M+b6S.I2M+d0M)]=[STX[d27],STX[N0R],STX[C8U],STX[J7M],STX[M9c],STX[q1C],STX[h6R],STX[Q81]];this[c2D]={}
;this[c2D][STX[d27]]={arr:[1,2,5,10,20,50,100,250,500],minTimeUnit:0,maxTimeUnit:1000}
;this[c2D][STX[N0R]]={arr:[1,2,5,10,15,30],minTimeUnit:0,maxTimeUnit:60}
;this[c2D][STX[(X8j+i6j+H0I+L4D)]]={arr:[1,2,3,5,10,15,20,30],minTimeUnit:0,maxTimeUnit:60}
;this[c2D][STX[J7M]]={arr:[1,2,3,4,6,12],minTimeUnit:0,maxTimeUnit:24}
;this[c2D][STX[M9c]]={arr:[1,2,3],minTimeUnit:1,maxTimeUnit:32}
;this[c2D][STX[q1C]]={arr:[1,2,3,6],minTimeUnit:1,maxTimeUnit:13}
;this[c2D][STX[h6R]]={arr:[1,2,3,5],minTimeUnit:1,maxTimeUnit:20000000}
;this[c2D][STX[(F3j+T3j+I41+b6S.V71+F3j+T3j)]]={arr:[10],minTimeUnit:0,maxTimeUnit:2000000}
;}
var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31],idealTicks=b6S[A1M](this[(o2M+v9T)].width,chart[(s2I+X31+K8M+d0M)][F91]);for(var x=0;b6S[L6M](x,chart[U3U].length);x++)if(chart[U3U][x])break;if(STXChart[m8R](this[k5I][k9w])){var timeRange=b6S[(x0I+x0M)](chart[U3U][chart[(b6S.l2M+V6j+J4C+b6S.I2M+n1M+b6S.K7M)].length-1][q4c][Y7w](),chart[U3U][x][q4c][Y7w]());}
else{var timeRange=0,nextClose=null,nextCloseEpoch=0,prevEpoch=0;for(var i=0;b6S[k3U](i,chart[U3U].length);i++){var q=chart[(b6S.l2M+V6j+T9I+Q9D+F4C)][i];if(!q)continue;var epoch=q[q4c][Y7w]();if(b6S[(T0D)](epoch,nextCloseEpoch)){timeRange+=b6S[s2R](nextCloseEpoch,prevEpoch);nextClose=new Date(q[q4c]);nextClose[l6I](chart[I9D]);nextClose[D5T](chart[U5T]);nextCloseEpoch=nextClose[Y7w]();if(b6S[q2D](nextCloseEpoch,epoch)){nextCloseEpoch=epoch;}
}
else{timeRange+=b6S[u2U](epoch,prevEpoch);}
prevEpoch=epoch;}
if(b6S[A4T](timeRange,chart[K17]))timeRange*=(b6S[A1R](1440,chart[(x1M+K8M+n1M+z8I+l5D+i6j+n1M+y9C+d0M+A7T+n1M)]));}
timeRange=b6S[G8j]((timeRange/chart[U3U].length),chart[T4c]);var msPerTick=b6S[t0C](timeRange,idealTicks);for(var i=0;b6S[K1D](i,this[G61].length);i++){if(b6S[m1C](this[G61][i],msPerTick))break;}
var timeUnit=this[G61][b6S[A17](i,1)];if(b6S[v61](chart[N8R][Q2D],null))timeUnit=chart[N8R][Q2D];var timeInterval=STX[x9c](this[c2D][timeUnit]);for(var i=0;b6S[(r91+x0M)](i,timeInterval[(K8j+V0M)].length);i++){if(b6S[N5c](timeInterval[e1M][i]*timeUnit,msPerTick))break;}
var timeUnitMultiplier=timeInterval[e1M][b6S[q4R](i,1)];if(chart[N8R][x8c])timeUnitMultiplier=chart[N8R][x8c];axisRepresentation=[];var i=0;chart[t4R]=[];for(;b6S[S9U](i,chart[T4c]);i++){if(b6S[u6z](chart[U3U][i],null))break;chart[t4R][I57](null);}
var dtShifted=0,nextTimeUnit=timeInterval[(K37+b6S.I2M+N4M+n1M+H7T)],previousTimeUnitLarge=0;for(i;b6S[L1I](i,chart[T4c]);i++){if(b6S[X9z](i,chart[U3U].length)){prices=chart[U3U][i];if(prices[l41]&&chart[N8R][(b6S.a9M+b6S.l2M+D1M+X7M+w2M+L8j+K8M+x1M+b6S.I2M+B27)]&&b6S[B7c](timeUnit,STX[M9c])){dtShifted=prices[l41];}
else{dtShifted=prices[q4c];}
}
else{if(!chart[N8R][c7T])break;var periodicity=this[k5I][W27],interval=this[k5I][k9w];if(dtShifted){var dt=dtShifted;}
else{dt=new Date();if(this[L7T]){var tzNow=STX[W9T](now,null,this[L7T]);dt=new Date(tzNow[(H0M+E1M+r4I+K8j)](),tzNow[C2T](),tzNow[n8C](),tzNow[C6I](),tzNow[L8R](),tzNow[M4w](),tzNow[E8c]());}
}
if(b6S[P8C](interval,"day")){dt=STX[N77][h8D](dt,periodicity,this);}
else if(b6S[v4M](interval,"week")){dt=STX[N77][W6C](dt,periodicity,this);}
else if(b6S[D57](interval,"month")){dt=STX[N77][P3R](dt,periodicity,this);}
else{dt=STX[N77][Q9C](dt,interval,periodicity,this,null,this[L7T]);}
if(chart[N8R][B3M])dtShifted=dt;else if(!this[m8R](interval))dtShifted=this[i7C](dt);else dtShifted=dt;}
var obj={DT:dtShifted,Date:STX[Z87](dtShifted)}
;if(b6S[i1c](i,chart[U3U].length))obj.data=chart[(b6S.l2M+V6j+b6S.a9M+E8j+b6S.I2M+Z6M+c77+n1M+b6S.K7M)][i];else obj.data=null;chart[t4R][I57](obj);var currentTimeUnit,currentTimeUnitLarge;if(b6S[b7c](timeUnit,STX[d27])){currentTimeUnit=dtShifted[Y7w]();currentTimeUnitLarge=dtShifted[M4w]();}
else if(b6S[w1c](timeUnit,STX[N0R])){currentTimeUnit=dtShifted[(Z6M+b6S.I2M+b6S.K7M+u4M)]();currentTimeUnitLarge=dtShifted[L8R]();}
else if(b6S[E8I](timeUnit,STX[C8U])){currentTimeUnit=dtShifted[L8R]();currentTimeUnitLarge=dtShifted[C6I]();}
else if(b6S[j1M](timeUnit,STX[(v9M+b6j+x3D)])){currentTimeUnit=dtShifted[C6I]();currentTimeUnitLarge=dtShifted[n8C]();}
else if(b6S[E61](timeUnit,STX[M9c])){currentTimeUnit=dtShifted[n8C]();currentTimeUnitLarge=dtShifted[C2T]()+1;}
else if(b6S[K6j](timeUnit,STX[q1C])){currentTimeUnit=dtShifted[(l9z+t7I+F4C+E8M)]()+1;currentTimeUnitLarge=dtShifted[D0I]();}
else if(b6S[q2T](timeUnit,STX[h6R])){currentTimeUnit=dtShifted[D0I]();currentTimeUnitLarge=dtShifted[D0I]();}
else{currentTimeUnit=b6S[l2I](dtShifted[D0I](),10);currentTimeUnitLarge=b6S[W2c](dtShifted[D0I](),10);}
var text;if(b6S[j4R](previousTimeUnitLarge,currentTimeUnitLarge)){if(b6S[(b6S.I2M+L3U)](currentTimeUnit,nextTimeUnit)){nextTimeUnit=timeInterval[Z3z];}
hz=b6S[A3U]((i*this[k5I][h4U]),3);text=null;if(b6S[(e8z+x0M)](timeUnit,STX[J7M])||(b6S[F07](timeUnit,STX[C8U])&&b6S[D51](previousTimeUnitLarge,currentTimeUnitLarge))){if(chart[N8R][X6z]){text=chart[N8R][X6z](dtShifted,"boundary",STX[M9c],1);}
else{if(this[T3D]){text=this[T3D][q0C][C3c](dtShifted);}
else{text=(dtShifted[C2T]()+1)+"/"+dtShifted[n8C]();}
}
}
else if(b6S[D0U](timeUnit,STX[M9c])){if(b6S[w0z](previousTimeUnitLarge,currentTimeUnitLarge)){text=dtShifted[D0I]();}
else{text=STX[k2C](dtShifted[(l9z+X8j+q0I+E8M)](),false,this);}
}
else if(b6S[m37](timeUnit,STX[q1C])){text=dtShifted[D0I]();}
if(text){axisRepresentation[I57](new STXChart[(H87+R21+u91)](hz,"boundary",text));}
}
if(b6S[S41](currentTimeUnit,nextTimeUnit)){if(b6S[b71](nextTimeUnit,timeInterval[(x1M+K8M+T07+K8M+x1M+b6S.I2M+N4M+n1M+H7T)])){if(b6S[k7c](currentTimeUnitLarge,previousTimeUnitLarge))continue;}
var labelDate=new Date(dtShifted),hz=(b6S[c6U](i,this[k5I][h4U]))+this[k9c],boundaryTimeUnit=b6S[h5U](Math[b3R](currentTimeUnit/timeUnitMultiplier),timeUnitMultiplier);if(b6S[I3j](boundaryTimeUnit,currentTimeUnit)){hz=b6S[b8z]((i*this[k5I][h4U]),3);}
if(b6S[y0D](timeUnit,STX[d27])){labelDate[G9z](boundaryTimeUnit);}
else if(b6S[O0w](timeUnit,STX[N0R])){labelDate[G9z](0);labelDate[(d0M+b6S.I2M+L9M+b6S.I2M+p5D+d0M)](boundaryTimeUnit);}
else if(b6S[W7z](timeUnit,STX[C8U])){labelDate[(d0M+H5w+i6R+S7T+B1U+D1C+d0M)](0);labelDate[a61](0);labelDate[D5T](boundaryTimeUnit);}
else if(b6S[K9T](timeUnit,STX[(M1R+N4M+X1j)])){labelDate[G9z](0);labelDate[a61](0);labelDate[(P6j+b6S.K7M+X8j+n01+b6S.K7M+b6S.I2M+d0M)](0);labelDate[l6I](boundaryTimeUnit);}
else if(b6S[m0I](timeUnit,STX[M9c])){labelDate[I5M](boundaryTimeUnit);}
else if(b6S[I0C](timeUnit,STX[q1C])){labelDate[I5M](1);labelDate[q6U](b6S[b2R](boundaryTimeUnit,1));}
else if(b6S[D9c](timeUnit,STX[h6R])){labelDate[I5M](1);labelDate[q6U](0);labelDate[z1U](boundaryTimeUnit);}
else{labelDate[I5M](1);labelDate[q6U](0);labelDate[z1U](b6S[(h7I+x0M)](boundaryTimeUnit,10));}
nextTimeUnit=boundaryTimeUnit+timeUnitMultiplier;if(b6S[n1D](timeUnit,STX[M9c]))timeInterval[v4C]=daysInMonth[labelDate[C2T]()]+1;if(b6S[G6U](nextTimeUnit,timeInterval[(l37+s2I+i2c+x1M+T8D+n1M+H7T)]))nextTimeUnit=timeInterval[Z3z];previousTimeUnitLarge=currentTimeUnitLarge;if(chart[N8R][X6z]){text=chart[N8R][X6z](labelDate,"line",timeUnit,timeUnitMultiplier);}
else{if(b6S[(a4C+x0M)](timeUnit,STX[M9c])){text=labelDate[n8C]();}
else if(b6S[H2T](timeUnit,STX[q1C])){text=STX[k2C](dtShifted[C2T](),false,this);}
else if(b6S[a6U](timeUnit,STX[h6R])||b6S[(n2D+x0M)](timeUnit,STX[Q81])){text=labelDate[D0I]();}
else{text=STX[V4C](labelDate,this,timeUnit);}
}
axisRepresentation[(x0M+X7M+d0M+E8M)](new STXChart[x7D](hz,"line",text));}
}
return axisRepresentation;}
;var cached=b6S.M1j,notcached=b6S.M1j;STXChart.prototype.createYAxis=function(panel,parameters){var i0M="Pl",D8w="ecimal",h6C="ntD",g3z="s6p",p57="j6p",G6C="b6p",V8c="g6p",D4D="V6p",i3R="q6p",C3U="N8p",h8z="C8p",S01="e8p",f4C="ction",f6M="proj",N4C="X8p",y6R="D8p",K8z="u8p",u0M="L8p",U4z="O8p",I6c="eTic",p6I="imu",P5T="minimumPriceTick",B4R="T8p",H1D="o8p",l3c="d8p",M9R="noEvenDivisorTicks",M0I="E8p",C67="k8p",X6C="8p",J9R="n8p",J8I="S8p",l6z="a1p",a4c="f1p",Y8R="p1p",d6I="G1p",g8D="Pixe",m5R="idea",F9c="Q1p",c3U="ontSize",x6c="asF",a1j="tC",c5C="F1p",p0c="x1p",X01="U1p",v6C="tioYAx",C77="nR",z3c="gol",M9U="i1p",e9z="J1p",H37="W1p",k2U="t1p",x81="c1p",g81="ctiv",f9C="w1p",B8z="H1p",i4c="1p",k8C="S1p",g7z="a0p",r0R="f0p",p9R="p0p",C7D="goldenRatioYAxis",o8C="eLe",U3c="croll",L9I="G0p",v4D="Q0p",Y77="F0p",Y0R="enableCaching",L0M="x0p",X7z="rea";if(this[W0M]((o2M+X7z+X07+n0z+d0M),arguments))return ;var chart=panel[X1c],isAChart=(b6S[L0M](panel[T5U],chart[T5U])),yAxis=panel[c3I];if(!parameters)parameters={}
;parameters[y41]=false;if(STXChart[Y0R]&&b6S[Y77](yAxis[o5w],panel[O47])&&b6S[v4D](yAxis[S4w],panel[N0C])){var leftTick=b6S[L9I](chart[g91].length,chart[(d0M+U3c)]),rightTick=leftTick+chart[T4c];panel[s2U]=Math[B9R](panel[s2U],leftTick);panel[Q6U]=Math[z4M](panel[Q6U],rightTick);panel[(N3c+o2M+E8M+o8C+k5z)]=leftTick;panel[Q6U]=rightTick;parameters[y41]=true;cached++;}
else{panel[s2U]=1000000;panel[Q6U]=-1;panel[O47]=yAxis[o5w];panel[N0C]=yAxis[S4w];notcached++;}
if(this[C7D]){if(b6S[p9R](yAxis[F91],this[K51]/1.618))parameters[y41]=false;}
if(!parameters[y41]){var height=yAxis.height=b6S[r0R](yAxis[f97],yAxis.top),pricePerPix=b6S[g7z]((yAxis[o5w]-yAxis[S4w]),(height-yAxis[E0w]));yAxis[o5w]=yAxis[o5w]+b6S[k8C]((yAxis[E0w]/2),pricePerPix)+b6S[(n1M+i4c)](yAxis[s67],pricePerPix);yAxis[(E1M+c1M+J2I)]=b6S[B8z](yAxis[S4w],(yAxis[E0w]/2)*pricePerPix,yAxis[s67]*pricePerPix);yAxis[B8j]=b6S[f9C](yAxis[o5w],yAxis[S4w]);if(yAxis[Y1U]&&(!this[(b6S.a9M+g81+b6S.I2M+F3j+S0U+J2I+i0I)]||b6S[x81](this[T5D][T5U],"projection"))){yAxis[(E1M+K81+v9M+q4w+E8M)]=b6S[k2U](Math[H1w](yAxis[o5w]),Math[e2T]);yAxis[w4I]=b6S[H37](Math[H1w](yAxis[S4w]),Math[e2T]);if(b6S[e9z](yAxis[S4w],0))yAxis[w4I]=0;yAxis[q4I]=b6S[M9U](yAxis[Q0c],yAxis[w4I]);}
if(this[(z3c+Y2c+C77+b6S.a9M+v6C+S7T)]&&isAChart){yAxis[F91]=b6S[X01](this[K51],1.618);if(b6S[p0c](yAxis[F91],0)){var fontHeight=this[f8w]("stx_yaxis");yAxis[F91]=b6S[c5C](fontHeight,5);}
}
else{if(!yAxis[F91]){var fontHeight=this[(z3C+a1j+b6S.a9M+n1M+r2I+x6c+c3U)]("stx_yaxis");if(isAChart){yAxis[F91]=b6S[(F9c)](fontHeight,5);}
else{yAxis[(m5R+E1M+T6R+S8M+k5D+q2I+b6S.I2M+g8D+i67)]=b6S[d6I](fontHeight,2);}
}
}
var idealTicks=Math[y1c](b6S[Y8R](height,yAxis[F91])),shadow=parameters[o4U]?b6S[a4c](parameters[o4U][1],parameters[o4U][0]):yAxis[B8j];yAxis[x87]=Math[b3R](b6S[l6z](shadow,idealTicks));var n=1;for(var zz=0;b6S[J8I](zz,10);zz++){if(b6S[J9R](yAxis[x87],0))break;n*=10;yAxis[x87]=b6S[(v9M+X6C)](Math[b3R](shadow/idealTicks*n),n);}
if(b6S[(E2R+x0M)](zz,10))yAxis[(x0M+U5U+o2M+b6S.I2M+i2c+K6c)]=.00000001;yAxis[x87]=b6S[(E1M+h01+x0M)](Math[(V0M+Z5D+n1M+b6S.l2M)](shadow/idealTicks*n),n);var verticalTicks=Math[y1c](b6S[C67](shadow,yAxis[x87]));if(parameters[o4U]&&b6S[M0I](verticalTicks,shadow)&&!yAxis[M9R]){while(b6S[(l3c)](verticalTicks,1)){if(b6S[H1D](shadow%verticalTicks,0))break;verticalTicks--;}
yAxis[x87]=b6S[B4R](shadow,verticalTicks);}
if(yAxis[P5T]){yAxis[x87]=yAxis[(B9R+p6I+m3R+c6M+I6c+S8M)];for(var i=0;b6S[U4z](i,10);i++){var numberOfTicks=b6S[u0M](shadow,yAxis[x87]);if(b6S[K8z](height/numberOfTicks,this[f8w]("stx_yaxis")*2))yAxis[x87]*=2;else break;}
}
yAxis[X5R]=b6S[y6R](yAxis.height,yAxis[B8j]);}
if(!this[T5D]||b6S[N4C](this[T5D][T5U],(f6M+b6S.I2M+f4C))){yAxis[o5w]=this[G0D](panel.top,panel);if(yAxis[Y1U]){yAxis[Q0c]=b6S[S01](Math[H1w](yAxis[o5w]),Math[e2T]);yAxis[w4I]=b6S[h8z](Math[H1w](yAxis[S4w]),Math[e2T]);if(b6S[C3U](yAxis[S4w],0))yAxis[w4I]=0;yAxis[q4I]=b6S[i3R](yAxis[Q0c],yAxis[w4I]);}
yAxis[B8j]=b6S[D4D](yAxis[o5w],yAxis[(E1M+c1M+J2I)]);}
yAxis[X5R]=b6S[V8c](yAxis.height,yAxis[B8j]);if(b6S[G6C](yAxis[E3M],null)){if(isAChart){var labelDecimalPlaces=0;if(b6S[p57](panel[c3I][B8j],1000))labelDecimalPlaces=2;if(b6S[g3z](panel[c3I][B8j],1))labelDecimalPlaces=4;yAxis[u5U]=labelDecimalPlaces;}
else yAxis[u5U]=null;}
else{yAxis[(c5c+K8M+h6C+D8w+i0M+v5M+b6S.I2M+d0M)]=yAxis[E3M];}
if(this[W2T]("createYAxis",arguments))return ;}
;STXChart.prototype.drawYAxis=function(panel,parameters){var D87="wYAx",y9T="tYAxi",H4w="lot",l6U="sP",l0c="j3p",T6c="addText",Z8M="b3p",e5M="sPlot",R61="displayGridLines",l67="g3p",s4c="V3p",g8c="z3p",K3C="h6p",O3M="R6p",J6C="M6p",l1U="tCanva",w4T="A6p",G0I="K6p",m9z="r6p",M0w="ries",X1C="newSe",L2M="B6p",p7c="y6p",l9U="m6p",x1D="I6p",Q47="6p",F0C="noDraw";if(this[W0M]("drawYAxis",arguments))return ;if(!parameters)parameters={}
;if(!parameters[F0C]&&!panel[(g2I+b6S.V71+n0z+d0M)][(E7C+F3j+S0U+J2I)]){if(!panel[s0c]||!parameters[y41]){var chart=panel[X1c],isAChart=(b6S[(r2I+Q47)](panel[T5U],chart[T5U])),yAxis=panel[c3I];if(!yAxis[(x0M+W7M+L8j+K8M+o2M+S8M)])return ;var shadow=yAxis[B8j];if(parameters[o4U]){shadow=b6S[x1D](parameters[o4U][1],parameters[o4U][0]);}
var verticalTicks=b6S[l9U](shadow,yAxis[x87]);verticalTicks=Math[y1c](verticalTicks);if(yAxis[Y1U]){var logStart=b6S[p7c](Math[(E1M+c1M+Z6M)](this[G0D](yAxis[f97],panel)),Math[e2T]),logPriceTick=b6S[L2M]((yAxis[Q0c]-yAxis[w4I]),verticalTicks);}
panel[s0c]=new STX[M5D]();panel[s0c][(X1C+M0w)]((Q6z+K8M+b6S.l2M),"stroke",this[M3z]("stx_grid"));panel[s0c][K6R]("text","fill",this[M3z]((r9T+o5M+g2I+b6S.a9M+s2I+S7T)));panel[s0c][K6R]("border","stroke",this[M3z]("stx_grid_border"));var priceOffset=0,high=parameters[o4U]?parameters[o4U][1]:yAxis[o5w],low=parameters[o4U]?parameters[o4U][0]:yAxis[S4w],drawBorders=chart[c7D][c3I][u2M]||this[U0z],borderEdge=Math[y1c](chart.width)+.5,w=drawBorders?b6S[m9z](borderEdge,.5):this[X1c].width,tickWidth=drawBorders?3:0;if(isAChart)priceOffset=b6S[G0I](yAxis[x87],Math[y1c]((low%yAxis[x87])*panel[X1c][Y11])/panel[X1c][Y11]);else priceOffset=b6S[w4T](high,yAxis[x87]);var fontHeight=this[(z3C+l1U+S7U+q0I+k5D+q2I+b6S.I2M)]("stx_yaxis");for(var i=0;b6S[J6C](i,verticalTicks);i++){var price;if(yAxis[(L4M+c1M+Z6M)]){var logPrice=logStart+(b6S[O3M](i,logPriceTick));price=Math[C5I](10,logPrice);}
else{if(isAChart)price=low+b6S[K3C](i,yAxis[x87])+priceOffset;else price=b6S[g8c](high,(i*yAxis[x87]),priceOffset);}
var y=this[D7C](price,panel),y2=Math[y1c](y)+.5;if(b6S[s4c]((y2+fontHeight/2),panel[f97]))continue;if(b6S[l67]((y2-fontHeight/2),panel.top))continue;if(yAxis[R61]){panel[s0c].moveTo("grid",0,y2);panel[(g2I+T0T+e5M+b6S.K7M+b6S.I2M+V0M)].lineTo("grid",w,y2);}
if(drawBorders){panel[s0c].moveTo("border",b6S[Z8M](borderEdge,.5),y2);panel[s0c].lineTo("border",borderEdge+tickWidth,y2);}
if(yAxis[v7z]){price=yAxis[v7z](this,panel,price);}
else{price=this[t67](price,panel);}
panel[s0c][T6c]("text",price,b6S[l0c](this[(b6S.j3c+b6S.a9M+V0M+b6S.K7M)][T8R],this[a5C],tickWidth,3),y2);}
if(drawBorders){var b=Math[y1c](yAxis[f97])+.5;panel[s0c].moveTo("border",borderEdge,yAxis.top);panel[(G7U+K8M+l6U+H4w+b6S.K7M+i2D)].lineTo("border",borderEdge,b);panel[s0c][(F3D+b6S.a9M+J2I)](this[(o2M+V8z+P8U)][o4z],"border");}
}
this[m51](panel);this[(x0M+E1M+c1M+y9T+t8U+G6I)](panel);}
if(this[(V0M+X7M+o37+x0M+x0M+j9D+b6S.l2M)]((P9c+D87+S7T),arguments))return ;}
;STXChart.prototype.plotYAxisGrid=function(panel){if(this[W0M](m51,arguments))return ;var context=this[X1c][o4z];panel[s0c][(b6S.l2M+V0M+J3j)](context,y6z);if(this[W2T](m51,arguments))return ;}
;STXChart.prototype.plotYAxisText=function(panel){var b11="plotYAxisText",X5U="sC",y4R="otY";if(this[W0M]((x0M+E1M+y4R+X31+Z8U+b6S.I2M+s2I+b6S.K7M),arguments))return ;this[f6z](s9R);this[(o2M+r0U+X5U+o7D+c1M+V0M)](s9R);var context=this[(M1M+b6S.K7M)][o4z];context.textBaseline=(T47+R9c+O1R);panel[s0c][Y5M](context,e6w);context.textBaseline="alphabetic";if(this[W2T](b11,arguments))return ;}
;STXChart.prototype.formatYAxisPrice=function(price,panel,requestedDecimalPlaces){var m81="f3p",S1U="ationa",Y4T="p3p",f4D="G3p",u1U="Q3p",k6R="F3p",U81="x3p",P5I="U3p",H9R="i3p",P1R="W3p";if(b6S[P1R](price,null)||typeof price=="undefined")return "";var yAxis=panel[c3I],decimalPlaces=requestedDecimalPlaces;if(!decimalPlaces&&b6S[(A7w+x0M)](decimalPlaces,0))decimalPlaces=yAxis[u5U];if(!decimalPlaces&&b6S[H9R](decimalPlaces,0)){if(b6S[P5I](yAxis[x87],.01))decimalPlaces=4;else if(b6S[U81](yAxis[x87],.1))decimalPlaces=2;else if(b6S[k6R](yAxis[x87],1))decimalPlaces=1;else decimalPlaces=0;}
if(b6S[u1U](panel[T5U],panel[X1c][T5U])){if(b6S[f4D](price,1000)||price<-1000){return STX[Z8w](price);}
}
if(this[T3D]){if(b6S[Y4T](decimalPlaces,this[(K8M+n1M+b6S.K7M+i2D+n1M+S1U+E1M+h5T+i2D)][s87].length))decimalPlaces=b6S[m81](this[T3D][s87].length,1);price=this[T3D][s87][decimalPlaces][(M6U+V6j)](price);}
else{price=price[z1D](decimalPlaces);}
return price;}
;STXChart.prototype.formatPrice=function(price,panel){var i1R="aliz",H8U="terna",t41="alize",w2D="H9Z",Q57="n9Z",e2I="S9Z",s4T="a3p";if(!price||typeof price=="undefined")return "";if(!panel)panel=this[Q4R];if(!panel)panel=this[X1c][c7D];if(!panel)return price;var decimalPlaces=panel[E3M];if(!decimalPlaces&&b6S[s4T](decimalPlaces,0)){decimalPlaces=panel[X1c][E3M];}
if(!decimalPlaces&&b6S[e2I](decimalPlaces,0)){return price;}
if(this[(p27+T6U+b6S.a9M+b6S.K7M+A7T+n1M+v7M+K8M+q2I+b6S.I2M+V0M)]){if(b6S[Q57](decimalPlaces,this[T3D][s87].length))decimalPlaces=b6S[w2D](this[(K8M+F4C+b6S.I2M+B0c+b6S.K7M+W5M+t41+V0M)][s87].length,1);price=this[(E0T+H8U+z1M+S7D+i1R+b6S.I2M+V0M)][s87][decimalPlaces][C3c](price);}
else{price=price[(U8M+A3j+K8M+s2I+b6S.I2M+b6S.l2M)](decimalPlaces);}
return price;}
;STXChart.prototype.createCrosshairs=function(){if(this[W0M](y3C,arguments))return ;if(this[b9M][o7z][F6z])return ;this[b9M][f4z][F6z]=function(e){if(!e)e=event;if(e[k61])e[k61]();return u27;}
;this[b9M][o7z][F6z]=function(e){if(!e)e=event;if(e[k61])e[k61]();return u27;}
;this[W2T](y3C,arguments);}
;STXChart.prototype.createVolumeChart=function(chart){var Q4w="ppend",C7U="volumeChart",x5C="vcha",n7M="L9Z",M2z="O9Z",R0R="T9Z",S6D="o9Z",n8c="d9Z",x4I="E9Z",F9C="k9Z",i4I="l9Z",W2U="axTi",f7D="Z9Z",arguments$=[chart];if(this[W0M]("createVolumeChart",arguments$))return ;var quotes=chart[U3U],context=this[X1c][o4z];chart[M2w]=0;for(var i=0;b6S[f7D](i,chart[(x1M+W2U+o2M+S8M+d0M)]);i++){var prices=quotes[i];if(b6S[i4I](prices,null))continue;if(b6S[F9C](prices[X9D],chart[M2w]))chart[M2w]=prices[X9D];}
var vchart=this[K41]["vchart"];if(b6S[x4I](vchart,null)||b6S[n8c](vchart[K2R],true))return ;if(b6S[S6D](chart[M2w],0)){this[o1M]("vchart","center","bottom",this[f5I]("Volume Not Available"));}
var stx_volume_up=this[(J7w+r2I+b6S.a9M+d8U+b6S.K7M+g2I+E1M+b6S.I2M)]("stx_volume_up")[c7R],stx_volume_down=this[M3z]("stx_volume_down")[c7R],colorMap={}
;colorMap[stx_volume_up]=[];colorMap[stx_volume_down]=[];for(var i=0;b6S[R0R](i,quotes.length);i++){var quote=quotes[i];if(b6S[M2z](quote,null)){colorMap[stx_volume_up][I57](null);colorMap[stx_volume_down][I57](null);continue;}
if(b6S[n7M](quote[G3c],quote[w4C])){colorMap[stx_volume_up][I57](null);colorMap[stx_volume_down][I57](quote[X9D]);}
else{colorMap[stx_volume_up][I57](quote[X9D]);colorMap[stx_volume_down][I57](null);}
}
var borderMap={}
;borderMap[colorMap[stx_volume_up]]="#000000";borderMap[colorMap[stx_volume_down]]="#000000";vchart[(T47+n1M)]=0;vchart[z4M]=chart[M2w];var sd={name:(x5C+P8U),panel:"vchart",libraryEntry:STX[a4w][w91]["vchart"],outputMap:{"Volume":""}
}
;STX[a4w][C7U](this,sd,colorMap,borderMap);STX[a4w][J51](this,sd,this[X1c][(b6S.l2M+b6S.a9M+b6S.K7M+b6S.a9M+e07+x1M+b6S.I2M+F4C)],vchart);if(this[(X8U+n1M+b6S.V71+Q4w)]("createVolumeChart",arguments$))return ;}
;STXChart.prototype.determineMinMax=function(quotes,fields){var q41="e9Z",I2z="X9Z",y1R="D9Z",B7z="u9Z",highValue=Number[S5w]*-1,lowValue=Number[S5w];for(var i=0;b6S[B7z](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(quote.transform)quote=quote.transform;for(var j=0;b6S[y1R](j,fields.length);j++){var val=quote[fields[j]];if(val||b6S[I2z](val,0)){if(b6S[(q41)](val,highValue))highValue=val;if(b6S[(I41+K01+q4M)](val,lowValue))lowValue=val;}
}
}
return [lowValue,highValue];}
;STXChart.prototype.initializeDisplay=function(chart){var P9R="P5Z",P2D="Y5Z",D7U="z5Z",U4R="h2Z",i9c="R2Z",i8C="M2Z",d7M="K2Z",u3M="y2Z",H6R="m2Z",D3R="I2Z",i7c="v2Z",O6R="s2Z",w2c="j2Z",R71="b2Z",L2C="g2Z",V5T="V2Z",U2z="q2Z",m27="N9Z";if(this[(V0M+N7I+J6j+N4U+E2C+b6S.l2M)]("initializeDisplay",arguments))return ;var fields=[];for(var field in chart[m2T]){if(chart[m2T][field][Z91][B6U])fields[I57](field);}
var panel=chart[c7D]=this[K41][chart[T5U]],yAxis=panel[c3I],cheight=panel.height,high=low=null;if(!yAxis[q8M])yAxis[q8M]=this[q07];yAxis[f97]=b6S[m27](panel[f97],yAxis[q8M]);yAxis.top=panel.top;yAxis.height=b6S[U2z](yAxis[f97],yAxis.top);var minMax;if(b6S[V5T](this[k5I][L8w],"line")||b6S[L2C](this[k5I][(o2M+E8M+b6S.a9M+V0M+R9M+g2I+x0M+b6S.I2M)],"colored_line")||b6S[R71](this[k5I][L8w],"mountain")||b6S[w2c](this[k5I][L8w],"baseline_delta")){fields[I57]("Close");minMax=this[r9I](chart[U3U],fields);if(b6S[O6R](this[k5I][L8w],"baseline_delta")){var base=chart[N7T];if(chart[v1j])base=chart[v1j](this,chart,base);var diff=Math[z4M](b6S[i7c](base,minMax[0]),b6S[D3R](minMax[1],base));minMax[0]=b6S[H6R](base,diff);minMax[1]=base+diff;}
}
else{fields[I57]("Close","High","Low");minMax=this[r9I](chart[U3U],fields);}
var verticalPad=Math[(V0M+c1M+X7M+n1M+b6S.l2M)](Math[v8M](b6S[u3M](cheight,5)));if(b6S[(Q41+G3I+q4M)](cheight-Math[v8M](yAxis[s67]),verticalPad)){yAxis[s67]=(b6S[(V0M+G3I+q4M)](cheight,verticalPad))*(b6S[d7M](yAxis[s67],0)?-1:1);}
chart[B0D]=minMax[0];chart[B8c]=minMax[1];var pricePerPix=b6S[(x0I+q4M)]((chart[B8c]-chart[B0D]),yAxis.height);if(b6S[i8C](chart[B8c]-chart[B0D],0)){high=b6S[i9c](chart[B8c],2);low=0;}
else{if(this[k5I][Y1U]&&high){var logLow=b6S[U4R](Math[H1w](chart[(T3R+J2I+Y6C+C3R)]),Math[e2T]),logHigh=b6S[D7U](Math[H1w](chart[B8c]),Math[e2T]);high=Math[C5I](10,logHigh);low=Math[C5I](10,logLow);}
else{high=chart[B8c];low=chart[B0D];}
}
yAxis[(E8M+J2C)]=high;yAxis[S4w]=low;yAxis[B8j]=b6S[P2D](yAxis[o5w],yAxis[S4w]);if(b6S[P9R](yAxis[Y1U],this[k5I][Y1U])){this[H4C]();yAxis[Y1U]=this[k5I][Y1U];}
var parameters={}
;this[(C9T+h7M+t4M+p67)](panel,parameters);this[P3c](panel,parameters);this[W2T]("initializeDisplay",arguments);}
;STXChart.prototype.computePosition=function(x,offset){var j27="w5Z";if(typeof offset==Q11)offset=b6S.M1j;var position=b6S[j27](x,this[k5I][h4U])+offset;return position;}
;STXChart.prototype.computeColor=function(open,close){var H5C="t5Z",k4I="ndl",c8M="c5Z";if(b6S[c8M](open,close))return (w2M+s2I+t0M+k4I+z0D+o7I);if(b6S[(H5C)](open,close))return L6C;return U4U;}
;STXChart.prototype.computeLength=function(high,low){var d97="W5Z",h=this[D7C](high),l=this[D7C](low);return b6S[d97](l,h);}
;STXChart.prototype.volUnderlay=function(chart){var L9R="ay_",P3I="d4Z",F8R="Q5Z",V1U="F5Z",Q0w="If",D8D="x5Z",a2D="U5Z",J37="i5Z",g5C="J5Z",quotes=chart[U3U];chart[M2w]=0;for(var i=0;b6S[g5C](i,chart[T4c]);i++){var prices=quotes[i];if(b6S[J37](prices,null))continue;if(b6S[a2D](prices[X9D],chart[M2w]))chart[M2w]=prices[X9D];}
if(b6S[D8D](chart[M2w],0)){this[o1M]("chart","center","bottom",this[(U6M+b6S.a9M+T4C+L57+h7M+Q0w)]("Volume Not Available"));return ;}
var context=this[X1c][o4z],c=chart[c7D],b=Math[b3R](c[(G7U+K8M+d0M)][f97])+.5,t=Math[(q6M+E1M+c1M+S2D)](c.yAxis.top)+.5,h=b6S[(V1U)]((b-t),this[p7T]),negativeOffset=b6S[F8R]((this[q7z]-this[(k5I)][h4U]),2),quotes=chart[U3U],bordersOn=(!STX[s7c](this[M3z]("stx_volume_underlay_up")["borderLeftColor"])&&!STX[s7c](this[M3z]("stx_volume_underlay_down")["borderLeftColor"])),self=this;function drawBars(directionClass,borders){var Q1U="E4Z",Z8c="k4Z",g2C="pWi",w0D="l4Z",y77="Z4Z",a3j="H4Z",F6C="n4Z",v9U="S4Z",k4z="a5Z",B7D="f5Z",N9z="p5Z",O6D="G5Z",borderColor=self[M3z](directionClass)["borderLeftColor"];self[X3j](directionClass);if(STX[z9z])context.globalAlpha=.5;context.beginPath();var prevTop=b+.5,farLeft=(bordersOn?.5:0),prevRight=farLeft;for(var i=0;b6S[O6D](i,quotes.length);i++){var quote=quotes[i];if(b6S[N9z](quote,null)){prevTop=b;prevRight+=self[k5I][h4U];continue;}
var y=b6S[B7D](quote[X9D],(h/chart[M2w])),top=Math[B9R](Math[b3R]((b6S[k4z](b,h))+(b6S[v9U](h,y)))+.5,b);if(b6S[F6C](directionClass,"stx_volume_underlay_up")){if(b6S[a3j](quote[G3c],quote[w4C])){prevTop=top;prevRight+=self[k5I][h4U];continue;}
}
else{if(b6S[y77](quote[G3c],quote[w4C])){prevTop=top;prevRight+=self[k5I][h4U];continue;}
}
if(bordersOn){var x0=Math[b3R](prevRight+Math[b3R](negativeOffset))+.5,x1=Math[b3R](prevRight+self[k5I][h4U]+Math[b3R](negativeOffset))+.5;x0=Math[z4M](x0,farLeft);}
else{var x0=Math[b3R](b6S[w0D](i,self[k5I][h4U])),x1=x0+self[(C1M+g2C+U8D+E8M)];}
context.moveTo(x0+.5,b);context.lineTo(x1,b);context.lineTo(x1,top);context.lineTo(x0,top);if(borders){if(b6S[Z8c](prevTop,top)||b6S[Q1U](i,0))context.lineTo(x0,prevTop);}
else{context.lineTo(x0,b);}
prevTop=top;prevRight+=self[k5I][h4U];}
if(!borders)context.fill();context.strokeStyle=borderColor;if(borders)context.stroke();context.closePath();}
drawBars("stx_volume_underlay_up",false);drawBars("stx_volume_underlay_down",false);if(b6S[P3I](this[k5I][(J7w+b6S.l2M+E1M+b6S.I2M+S0T)],3)&&bordersOn){drawBars((w2M+s2I+D4I+o7D+J0R+o5M+X7M+n1M+b6S.l2M+b6S.I2M+V0M+E1M+L9R+X7M+x0M),true);drawBars("stx_volume_underlay_down",true);}
context.globalAlpha=1;}
;STX[a4w][k1c]=function(stx,sd){var K5C="removeStudy";if(!stx||!stx[X1c][g91])return ;var remove=sd[Z91][K5C];stx[H2M](k5I);if(remove){STX[(E8j+i3M+q5c+b6S.I2M+d0M)][K5C](stx,sd);}
}
;STX[a4w][I51]=function(stx,sd){var n51="v7Z",U2w="s7Z",I81="of",S6R="nou",q27="j7Z",f37="7Z",c0c="g7Z",q51="V7Z",n97="q7Z",v3C="N4Z",E27="C4Z",t5z="e4Z",e9T="X4Z",j4c="D4Z",u7M="u4Z",V77="file",E01="nde",F47="oug",z4w="L4Z",G51="O4Z",x4D="T4Z",c4M="o4Z",A1c="numberOfBars",B57="study";if(!stx||!stx[X1c][g91])return ;var chart=stx[X1c];if(!sd[B57][Z91][A1c])sd[B57][Z91][A1c]=30;var interval=b6S[(c4M)]((chart[(L0z+b3C+Q4M+b6S.a9M+C3R)]-chart[B0D]),sd[B57][(x0M+K7D+z5D+b6S.I2M+k8U)][A1c]);if(b6S[x4D](interval,0))return ;var priceVolArry=[];for(var j=chart[B0D];b6S[G51](j,chart[B8c]+.1);j+=interval){priceVolArry[I57]([j,0]);}
if(b6S[z4w](priceVolArry.length,2)){stx[o1M]("chart","center","top",stx[f5I]((n6j+c1M+b6S.K7M+B1I+b6S.I2M+n1M+F47+E8M+B1I+b6S.l2M+J2M+B1I+b6S.K7M+c1M+B1I+V0M+b6S.I2M+E01+V0M+B1I+b6S.K7M+E8M+b6S.I2M+B1I+Q4M+c1M+E1M+X7M+x1M+b6S.I2M+B1I+J6j+V0M+c1M+V77)));return ;}
var quotes=chart[U3U],volumeMax=0;for(var i=0;b6S[u7M](i,quotes.length);i++){var prices=quotes[i];if(b6S[(j4c)](prices,null))continue;var bottomRange=priceVolArry[0][0],topRange=0;for(var x=1;b6S[e9T](x,priceVolArry.length);x++){topRange=priceVolArry[x][0];if((b6S[t5z](prices[Q6I],bottomRange)&&b6S[E27](prices[Q6I],topRange))||(b6S[v3C](prices[Q6I],bottomRange)&&b6S[n97](prices[c9R],topRange))||(b6S[q51](prices[c9R],bottomRange)&&b6S[c0c](prices[c9R],topRange))){priceVolArry[x][1]+=prices[X9D];if(b6S[(F9M+f37)](priceVolArry[x][1],volumeMax))volumeMax=priceVolArry[x][1];}
bottomRange=topRange;}
}
if(b6S[q27](volumeMax,0)){stx[o1M]("chart","center","top",stx[f5I]((P91+b6S.K7M+B1I+b6S.I2M+S6R+Z6M+E8M+B1I+b6S.l2M+b6S.a9M+b6S.K7M+b6S.a9M+B1I+b6S.K7M+c1M+B1I+V0M+b6S.I2M+E01+V0M+B1I+b6S.K7M+E8M+b6S.I2M+B1I+Q4M+c1M+n6R+b6S.I2M+B1I+J6j+V0M+I81+K8M+O1R)));return ;}
stx[A9R]("stx_volume_profile","color",sd[n8M][(Q41+H8M+B1I+I41+c1M+T3R+V0M)]);var context=chart[o4z],fontstyle="stx-float-date";stx[f6z](fontstyle,context);var txtHeight=stx[f8w](fontstyle),panel=chart[c7D],chartBottom=panel[c3I][f97],barBottom=b6S[U2w](Math[y1c](chart.width),.5),bartop=0,barMaxHeight=b6S[n51]((chart.width),stx[p7T]),borderColor=stx[M3z]("stx_volume_profile")["borderColor"],bordersOn=(!STX[s7c](stx[M3z]("stx_volume_profile")["borderColor"]))&&sd[B57][Z91][u2M],self=stx;function drawBars(volumeProfileClass,borders){var M0M="R7Z",r3C="M7Z",Q7w="A7Z",U4D="displayVolume",p9c="K7Z",g5z="r7Z",x4M="B7Z",o7c="y7Z",b4U="m7Z",T6D="I7Z";if(!borders)barBottom-=2;self[X3j](volumeProfileClass);if(STX[z9z])context.globalAlpha=.5;context.beginPath();var bottomRange=priceVolArry[0][0],prevTop=barBottom;for(var i=1;b6S[T6D](i,priceVolArry.length);i++){if(priceVolArry[i][1]){barTop=b6S[b4U](Math[y1c](barBottom-(priceVolArry[i][1]*barMaxHeight/volumeMax)),.5);bottomRangePixel=Math[y1c](self[D7C](bottomRange,panel))+.5;topRangePixel=Math[y1c](self[D7C](priceVolArry[i][0],panel))+.5;if(!borders){bottomRangePixel-=.5;topRangePixel+=.5;barTop+.5;}
if(b6S[o7c](bottomRangePixel,chartBottom))bottomRangePixel=chartBottom;if(b6S[x4M](topRangePixel,chartBottom)){context.moveTo(barBottom,bottomRangePixel);context.lineTo(barBottom,topRangePixel);context.lineTo(barTop,topRangePixel);context.lineTo(barTop,bottomRangePixel);if(borders){if(b6S[g5z](prevTop,barTop)||b6S[p9c](i,1))context.lineTo(prevTop,bottomRangePixel);}
else{context.lineTo(barBottom,bottomRangePixel);if(sd[B57][Z91][U4D]){var txt=STX[Z8w](priceVolArry[i][1]),barHeight=b6S[Q7w](bottomRangePixel,topRangePixel);if(b6S[r3C](txtHeight,barHeight-2)){try{var width=context.measureText(txt).width;}
catch(e){width=0;}
context.textBaseline="top";var tmpcolor=context.fillStyle;context.fillStyle=borderColor;context.fillText(txt,b6S[M0M](barTop,width,3),topRangePixel+(b6S[(n6j+m71+q4M)](barHeight/2,txtHeight/2)));context.fillStyle=tmpcolor;}
}
}
}
prevTop=barTop;}
else{prevTop=barBottom;}
bottomRange=priceVolArry[i][0];}
if(!borders)context.fill();context.strokeStyle=borderColor;if(borders)context.stroke();context.closePath();}
drawBars("stx_volume_profile",false);if(bordersOn){drawBars("stx_volume_profile",true);}
context.globalAlpha=1;}
;STXChart.prototype.startClip=function(panel){var M1I="q0Z";if(!panel)panel=X1c;var c=this[K41][panel];this[X1c][o4z].save();this[X1c][o4z].beginPath();this[X1c][o4z].rect(0,c.top,this[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)].width,b6S[M1I](c[f97],c.top));this[X1c][o4z].clip();}
;STXChart.prototype.endClip=function(){this[X1c][o4z].restore();}
;STXChart.prototype.drawCandlesHighPerformance=function(chart,fillColor,borderColor,condition){var a7D="Q1Z",G7C="F1Z",Y2I="x1Z",B5R="ndle",r5M="U1Z",W0c="i1Z",l9T="J1Z",S0z="W1Z",f1U="t1Z",p2c="c1Z",j4C="w1Z",I3D="P1Z",Q8D="1Z",u8C="z1Z",R87="h0Z",a1U="R0Z",m1D="M0Z",F5c="A0Z",E4I="K0Z",b01="r0Z",F97="B0Z",v87="EU",O21="OS",V8U="CL",M6w="y0Z",S5T="m0Z",a2T="I0Z",v51="j0Z",U31="0Z",b8R="g0Z",y3z="V0Z",quotes=chart[U3U],context=this[X1c][o4z],panel=chart[c7D],t=panel.yAxis.top,b=panel[c3I][(F9M+v9D+b6S.K7M+c1M+x1M)],top,bottom,length,borderOffset=0;if(!STX[s7c](borderColor))borderOffset=.5;var leftTick=b6S[y3z](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c];context.beginPath();context.fillStyle=fillColor;var yAxis=panel[c3I];for(var x=0;b6S[b8R](x,quotes.length);x++){var quote=quotes[x];if(b6S[(F9M+U31)](quote,null))continue;if(quote[Z5I])continue;if(b6S[(v51)](quote[d77],quote[G3c]))continue;if(b6S[(d0M+l91+q4M)](condition,STXChart[R6D])&&b6S[(p8M+q4M)](quote[d77],quote[G3c]))continue;if(b6S[a2T](condition,STXChart[m1I])&&b6S[S5T](quote[d77],quote[G3c]))continue;if(b6S[M6w](condition,STXChart[(V8U+O21+v87+J6j)])&&b6S[F97](quote[G3c],quote[w4C]))continue;if(b6S[b01](condition,STXChart[F6D])&&b6S[E4I](quote[G3c],quote[w4C]))continue;if(b6S[F5c](condition,STXChart[N51])&&b6S[m1D](quote[G3c],quote[w4C]))continue;if(quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+x;if(b6S[a1U](tick,panel[s2U])||b6S[R87](tick,panel[Q6U])||!cache[P4U]){var o=(yAxis[Y1U]?this[D7C](quote[d77],panel):(b6S[u8C]((yAxis[o5w]-quote[d77]),yAxis[X5R]))+yAxis.top),c=(yAxis[Y1U]?this[D7C](quote[G3c],panel):(b6S[(t4M+Q8D)]((yAxis[o5w]-quote[G3c]),yAxis[X5R]))+yAxis.top);top=Math[b3R](Math[B9R](o,c))+borderOffset;bottom=Math[z4M](o,c);length=Math[b3R](b6S[I3D](bottom,top));if(b6S[j4C](top,t)){if(b6S[p2c](top+length,t)){cache[P4U]=top;cache[(W6c+c1M+P6j)]=top;continue;}
length-=b6S[(f1U)](t,top);top=t;}
if(b6S[S0z](top+length,b)){length-=(top+length-b);}
length=Math[z4M](length,2);cache[P4U]=top;cache[L1M]=cache[P4U]+length;}
if(b6S[l9T](cache[P4U],b))continue;if(b6S[W0c](cache[(R57+d0M+b6S.I2M)],t))continue;var x0=Math[b3R](b6S[r5M](x,this[k5I][(o2M+b6S.a9M+B5R+i7M+K8M+b6S.l2M+P1M)]))+borderOffset,x1=x0+this[q7z]-(b6S[Y2I](borderOffset,2));if(b6S[G7C](quote[d77],quote[G3c])){top=b6S[a7D](Math[y1c](cache[(c1M+x0M+b6S.I2M+n1M)]),borderOffset);context.moveTo(x0,top);context.lineTo(x1,top);}
else{context.moveTo(x0,cache[P4U]);context.lineTo(x1,cache[P4U]);context.lineTo(x1,cache[(o2M+T3R+P6j)]);context.lineTo(x0,cache[L1M]);context.lineTo(x0,cache[P4U]);}
}
context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
context.closePath();}
;STXChart.prototype.drawCandles=function(chart,colorFunction,isOutline){var S8z="8Z",u5M="e8Z",Y8j="Op",f1C="X8Z",U47="D8Z",g6C="u8Z",X9I="L8Z",z4T="O8Z",k57="T8Z",u61="o8Z",O0U="d8Z",U91="E8Z",J47="k8Z",X8w="loo",v0M="l8Z",j9R="lF",z8D="pixe",h4c="Z8Z",A8U="H8Z",T4R="n8Z",m4R="tli",W1M="S8Z",S3C="a1Z",s7R="f1Z",L5R="p1Z",H4I="G1Z",y8j="tran",quotes=chart[U3U],context=this[X1c][o4z],panel=chart[c7D],t=panel.yAxis.top,b=panel[c3I][f97],top,bottom,length,borderColor=(y8j+d0M+x0M+B6c+F4C),fillColor="transparent",borderOffset=0,leftTick=b6S[H4I](chart[(b6S.l2M+b6S.a9M+b6S.K7M+b6S.a9M+E8j+b6S.I2M+b6S.K7M)].length,chart[s67]),rightTick=leftTick+chart[(x1M+Y3j+L8j+K8M+K6c+d0M)],yAxis=panel[(g2I+X31+K8M+d0M)];for(var x=0;b6S[L5R](x,quotes.length);x++){context.beginPath();var quote=quotes[x];if(b6S[s7R](quote,null))continue;if(quote[Z5I])continue;if(!quote[d77]&&b6S[S3C](quote[d77],0))continue;if(b6S[W1M](quote[d77],quote[G3c]))continue;var myColor=colorFunction(this,quote,isOutline?(c1M+X7M+m4R+J1C):"solid");if(!myColor)continue;if(isOutline)borderColor=myColor;else fillColor=myColor;context.fillStyle=fillColor;if(!STX[s7c](borderColor))borderOffset=.5;if(quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+x;if(b6S[(T4R)](tick,panel[s2U])||b6S[(A8U)](tick,panel[Q6U])||!cache[P4U]){var o=(yAxis[Y1U]?this[D7C](quote[d77],panel):(b6S[h4c]((yAxis[o5w]-quote[d77]),yAxis[X5R]))+yAxis.top),c=(yAxis[(L4M+K81)]?this[(z8D+j9R+o1D+V0M+K8M+o2M+b6S.I2M)](quote[G3c],panel):(b6S[v0M]((yAxis[o5w]-quote[G3c]),yAxis[X5R]))+yAxis.top);top=Math[(q6M+X8w+V0M)](Math[B9R](o,c))+borderOffset;bottom=Math[z4M](o,c);length=Math[b3R](b6S[J47](bottom,top));if(b6S[U91](top,t)){if(b6S[O0U](top+length,t)){cache[P4U]=top;cache[L1M]=top;continue;}
length-=b6S[u61](t,top);top=t;}
if(b6S[k57](top+length,b)){length-=(top+length-b);}
length=Math[z4M](length,2);cache[P4U]=top;cache[L1M]=cache[P4U]+length;}
if(b6S[z4T](cache[P4U],b))continue;if(b6S[X9I](cache[L1M],t))continue;var x0=Math[b3R](b6S[g6C](x,this[k5I][h4U]))+borderOffset,x1=x0+this[q7z]-(b6S[U47](borderOffset,2));if(b6S[f1C](quote[(Y8j+b6S.I2M+n1M)],quote[G3c])){top=b6S[u5M](Math[y1c](cache[P4U]),borderOffset);context.moveTo(x0,top);context.lineTo(x1,top);}
else{context.moveTo(x0,cache[P4U]);context.lineTo(x1,cache[(c1M+O0D+n1M)]);context.lineTo(x1,cache[L1M]);context.lineTo(x0,cache[(o2M+T3R+d0M+b6S.I2M)]);context.lineTo(x0,cache[P4U]);}
if(b6S[(I41+S8z)](fillColor,"transparent"))context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
}
}
;STXChart.prototype.drawShadowsHighPerformance=function(chart,style,condition){var t3c="Q3Z",z5R="F3Z",J1U="x3Z",g8I="U3Z",v7R="i3Z",i0z="J3Z",P0C="W3Z",J8R="t3Z",z6U="c3Z",a0C="w3Z",q17="P3Z",n07="Y3Z",z27="z3Z",K7z="h6Z",N8j="R6Z",L2R="tipl",s2T="M6Z",F87="sem",l5T="A6Z",R7T="r6Z",S11="B6Z",v0D="y6Z",f7c="m6Z",c9D="I6Z",H7I="v6Z",D4z="s6Z",p6R="j6Z",q5z="b6Z",W0D="g6Z",Z11="V6Z",e5R="q6Z",N1z="yAxi",j7R="N8Z",quotes=chart[U3U],context=this[X1c][o4z],panel=chart[c7D];context.lineWidth=1;var t=panel.yAxis.top,b=panel[c3I][f97],top,bottom,left,leftTick=b6S[j7R](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c];context.beginPath();var yAxis=panel[(N1z+d0M)];for(var x=0;b6S[e5R](x,quotes.length);x++){var quote=quotes[x];if(b6S[Z11](quote,null))continue;if(quote[Z5I])continue;if(condition){if(b6S[W0D](condition,STXChart[R6D])&&b6S[q5z](quote[d77],quote[G3c]))continue;else if(b6S[p6R](condition,STXChart[m1I])&&b6S[D4z](quote[d77],quote[G3c]))continue;else if(b6S[H7I](condition,STXChart[G0c])&&b6S[c9D](quote[G3c],quote[w4C]))continue;else if(b6S[f7c](condition,STXChart[F6D])&&b6S[v0D](quote[G3c],quote[w4C]))continue;else if(b6S[S11](condition,STXChart[N51])&&b6S[R7T](quote[G3c],quote[w4C]))continue;}
if(quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+x;if(b6S[(F2T+q4M)](tick,panel[s2U])||b6S[l5T](tick,panel[Q6U])||!cache.top){top=(yAxis[(F87+K8M+c3j+c1M+Z6M)]?this[D7C](quote[c9R],panel):(b6S[s2T]((yAxis[o5w]-quote[c9R]),yAxis[(x1M+U0I+L2R+a97)]))+yAxis.top);bottom=(yAxis[Y1U]?this[D7C](quote[Q6I],panel):(b6S[N8j]((yAxis[o5w]-quote[Q6I]),yAxis[X5R]))+yAxis.top);var length=b6S[K7z](bottom,top);if(b6S[z27](top,t)){if(b6S[n07](top+length,t)){cache.top=top;cache[f97]=top;continue;}
length-=b6S[q17](t,top);top=t;}
if(b6S[a0C](top+length,b)){length-=(top+length-b);}
cache.top=top;cache[f97]=cache.top+length;}
if(b6S[z6U](cache.top,b))continue;if(b6S[J8R](cache[(F7U+b6S.K7M+U8M+x1M)],t))continue;var xx=Math[b3R](Math[b3R](b6S[P0C](x,this[k5I][h4U]))+(b6S[i0z](this[q7z],2)))+.5;context.moveTo(xx,cache.top);context.lineTo(xx,cache[f97]);if(b6S[v7R](quote[d77],quote[G3c])){var x0=b6S[g8I](xx,this[k9c]),x1=xx+this[k9c],o=(yAxis[Y1U]?this[D7C](quote[d77],panel):(b6S[J1U]((yAxis[o5w]-quote[(d77)]),yAxis[X5R]))+yAxis.top);if(b6S[z5R](o,b)&&b6S[t3c](o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
}
this[X3j](style);context.stroke();context.closePath();}
;STXChart.prototype.drawShadows=function(chart,colorFunction){var V1I="N9",n5T="C9x",k8I="e9x",O3z="X9x",B3U="D9x",W07="u9x",s8j="L9x",m6z="O9x",Z4z="oor",g0T="T9x",l7c="o9x",l2T="9x",f4c="E9",e1C="k9x",L8I="l9x",C81="Z9x",A3D="H9x",s0R="n9x",j3I="S9x",H8w="a3Z",e5U="f3Z",j4w="p3Z",quotes=chart[(b6S.l2M+V6j+T9I+Z6M+c77+n1M+b6S.K7M)],context=this[X1c][o4z],panel=chart[c7D];context.lineWidth=1;var t=panel.yAxis.top,b=panel[c3I][f97],top,bottom,left,leftTick=b6S[(b4C+q4M)](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c],yAxis=panel[c3I];for(var x=0;b6S[j4w](x,quotes.length);x++){context.beginPath();var quote=quotes[x];if(b6S[e5U](quote,null))continue;if(quote[Z5I])continue;var color=colorFunction(this,quote,"shadow");if(!color)continue;if(quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+x;if(b6S[H8w](tick,panel[s2U])||b6S[j3I](tick,panel[Q6U])||!cache.top){top=(yAxis[Y1U]?this[D7C](quote[(h27+b3C)],panel):(b6S[s0R]((yAxis[o5w]-quote[(x9I+E8M)]),yAxis[X5R]))+yAxis.top);bottom=(yAxis[Y1U]?this[D7C](quote[Q6I],panel):(b6S[A3D]((yAxis[o5w]-quote[Q6I]),yAxis[X5R]))+yAxis.top);var length=b6S[C81](bottom,top);if(b6S[L8I](top,t)){if(b6S[e1C](top+length,t)){cache.top=top;cache[f97]=top;continue;}
length-=b6S[(f4c+s2I)](t,top);top=t;}
if(b6S[(b6S.l2M+l2T)](top+length,b)){length-=(top+length-b);}
cache.top=top;cache[f97]=cache.top+length;}
if(b6S[l7c](cache.top,b))continue;if(b6S[g0T](cache[(F9M+v9D+b6S.K7M+c1M+x1M)],t))continue;var xx=Math[(q6M+E1M+Z4z)](Math[b3R](b6S[m6z](x,this[k5I][h4U]))+(b6S[s8j](this[q7z],2)))+.5;context.moveTo(xx,cache.top);context.lineTo(xx,cache[f97]);if(b6S[W07](quote[d77],quote[G3c])||(!quote[d77]&&b6S[B3U](quote[d77],0))){var x0=b6S[O3z](xx,this[k9c]),x1=xx+this[(c1M+P6M+z5D)],o=Math[(P7z+c1M+c1M+V0M)]((yAxis[Y1U]?this[D7C](quote[G3c],panel):(b6S[k8I]((yAxis[o5w]-quote[G3c]),yAxis[X5R]))+yAxis.top))+.5;if(b6S[n5T](o,b)&&b6S[(V1I+s2I)](o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
context.strokeStyle=color;context.stroke();}
}
;STXChart.prototype.scatter=function(chart){var r07="I2x",W7U="v2x",p1c="j2x",D2U="2x",H6C="g2x",M4U="V2x",Q3z="q2x",quotes=chart[U3U],context=this[X1c][(U8c+z9C+b6S.K7M)];context.beginPath();context.lineWidth=4;var t=chart.panel.yAxis.top,b=chart[c7D][c3I][f97];for(var x=0;b6S[Q3z](x,quotes.length);x++){var quote=quotes[x];if(b6S[M4U](quote,null))continue;if(!quote[Z5I]){if(quote.transform)quote=quote.transform;var scatter=[quote[G3c]];if(b6S[H6C]("Scatter",quote))scatter=quote[(E8j+o2M+b6S.a9M+b6S.K7M+b6S.K7M+b6S.I2M+V0M)];for(var i=0;b6S[(F9M+D2U)](i,scatter.length);i++){var top=this[D7C](scatter[i],chart[c7D]);if(b6S[p1c](top,t))continue;if(b6S[(d0M+G3I+s2I)](top,b))continue;var xx=b6S[W7U](x,this[k5I][h4U]),xxo=xx+this[k9c];context.moveTo(b6S[r07](xxo,2),top);context.lineTo(xxo+2,top);}
}
}
this[X3j]("stx_scatter_chart");context.stroke();context.closePath();}
;STXChart.prototype.drawBarChartHighPerformance=function(chart,style,condition){var e5c="S4x",o3z="a5x",C7I="f5x",p1z="p5x",Y6c="G5x",q2R="Q5x",K3c="F5x",N27="x5x",C1U="U5x",z9I="botto",S77="i5x",g0w="J5",L7D="W5x",o6z="ipli",Y8C="t5x",P3j="c5x",x7R="w5x",h2T="P5x",i31="eRigh",e4U="Y5x",Y31="z5x",W2I="ach",d0T="h2x",m8D="R2x",O7R="M2x",u6M="A2x",B9I="K2x",n0M="r2x",A2D="B2x",C0I="y2x",T7R="m2x",quotes=chart[U3U],panel=chart[c7D],context=chart[o4z];context.beginPath();context.lineWidth=1;var t=panel.yAxis.top,b=panel[(z8z+s2I+K8M+d0M)][f97],top,bottom,length,leftTick=b6S[T7R](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c],yAxis=panel[c3I];for(var x=0;b6S[C0I](x,quotes.length);x++){var quote=quotes[x];if(b6S[(A2D)](quote,null))continue;if(quote[Z5I])break;if(condition){if(b6S[n0M](condition,STXChart[G0c])&&b6S[B9I](quote[G3c],quote[w4C]))continue;else if(b6S[u6M](condition,STXChart[F6D])&&b6S[O7R](quote[G3c],quote[w4C]))continue;else if(b6S[m8D](condition,STXChart[N51])&&b6S[d0T](quote[G3c],quote[w4C]))continue;}
if(quote.transform)quote=quote.transform;var cache=quote[(o2M+W2I+b6S.I2M)],tick=leftTick+x;if(b6S[Y31](tick,panel[(N3c+b6S.j3c+W3D+b6S.I2M+k5z)])||b6S[e4U](tick,panel[(o2M+W2I+i31+b6S.K7M)])||!cache.top){top=(yAxis[Y1U]?this[D7C](quote[c9R],panel):(b6S[h2T]((yAxis[o5w]-quote[c9R]),yAxis[X5R]))+yAxis.top);bottom=(yAxis[Y1U]?this[D7C](quote[Q6I],panel):(b6S[x7R]((yAxis[o5w]-quote[Q6I]),yAxis[X5R]))+yAxis.top);var length=b6S[P3j](bottom,top);cache[P4U]=(yAxis[Y1U]?this[D7C](quote[d77],panel):(b6S[Y8C]((yAxis[o5w]-quote[d77]),yAxis[(x1M+X7M+E1M+b6S.K7M+o6z+b6S.I2M+V0M)]))+yAxis.top);cache[L1M]=(yAxis[Y1U]?this[D7C](quote[G3c],panel):(b6S[L7D]((yAxis[o5w]-quote[G3c]),yAxis[X5R]))+yAxis.top);if(b6S[(g0w+s2I)](top,t)){if(b6S[S77](top+length,t)){cache.top=top;cache[(z9I+x1M)]=top;continue;}
length-=b6S[C1U](t,top);top=t;}
if(b6S[N27](top+length,b)){length-=(top+length-b);}
cache.top=top;cache[f97]=top+length;}
var xx=b6S[K3c](x,this[(E1M+N5D)][h4U]),xxo=xx+this[k9c];if(b6S[q2R](cache.top,b)&&b6S[Y6c](cache[f97],t)){var xx2=Math[y1c](xxo)+.5;context.moveTo(xx2,cache.top);context.lineTo(xx2,cache[f97]);}
if(b6S[p1z](cache[(D0z+n1M)],t)&&b6S[C7I](cache[P4U],b)){context.moveTo(xx,cache[P4U]);context.lineTo(xxo,cache[P4U]);}
if(b6S[o3z](cache[(o2M+a1w+b6S.I2M)],t)&&b6S[e5c](cache[L1M],b)){context.moveTo(xxo,cache[L1M]);context.lineTo(xxo+this[k9c],cache[L1M]);}
}
this[X3j](style);context.stroke();context.closePath();}
;STXChart.prototype.drawBarChart=function(chart,colorFunction){var V7U="g7x",E7I="V7x",e87="q7x",l9w="N4x",M2R="C4x",M7R="X4x",X7D="D4x",C1w="u4x",y3w="L4x",D9M="O4x",r2C="T4x",t0I="Log",v2I="o4x",A2I="d4x",b6c="E4x",E6U="k4x",v8R="Z4x",Z2M="H4x",g0C="n4x",quotes=chart[U3U],panel=chart[(x0M+u1D+E1M)],context=chart[o4z];context.lineWidth=1;var t=panel.yAxis.top,b=panel[c3I][f97],top,bottom,length,leftTick=b6S[g0C](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c],yAxis=panel[c3I],colors={}
;for(var x=0;b6S[Z2M](x,quotes.length);x++){var quote=quotes[x];if(b6S[v8R](quote,null))continue;if(quote[Z5I])break;var color=colorFunction(this,quote);if(b6S[(E1M+V01+s2I)](color,null))continue;colors[color]=1;context.strokeStyle=color;context.beginPath();if(quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+x;if(b6S[E6U](tick,panel[s2U])||b6S[b6c](tick,panel[Q6U])||!cache.top){top=this[D7C](quote[c9R],panel);bottom=this[D7C](quote[Q6I],panel);var length=b6S[A2I](bottom,top);cache[P4U]=(yAxis[Y1U]?this[D7C](quote[d77],panel):(b6S[v2I]((yAxis[o5w]-quote[d77]),yAxis[(r81+b6S.K7M+K8M+T2c+K8M+i2D)]))+yAxis.top);cache[L1M]=(yAxis[(d0M+u9D+K8M+t0I)]?this[(x0M+x4T+l7D+U5R+o6j+U5U+Y3c)](quote[G3c],panel):(b6S[r2C]((yAxis[o5w]-quote[G3c]),yAxis[X5R]))+yAxis.top);if(b6S[D9M](top,t)){if(b6S[y3w](top+length,t)){cache.top=top;cache[f97]=top;continue;}
length-=b6S[C1w](t,top);top=t;}
if(b6S[X7D](top+length,b)){length-=(top+length-b);}
cache.top=top;cache[f97]=top+length;}
var xx=b6S[M7R](x,this[k5I][h4U]),xxo=xx+this[k9c];if(b6S[(b6S.I2M+V01+s2I)](cache.top,b)&&b6S[(M2R)](cache[(F7U+b6S.K7M+b6S.K7M+Z7D)],t)){var xx2=Math[y1c](xxo)+.5;context.moveTo(xx2,cache.top);context.lineTo(xx2,cache[f97]);}
if(b6S[l9w](cache[P4U],t)&&b6S[e87](cache[P4U],b)){context.moveTo(xx,cache[P4U]);context.lineTo(xxo,cache[P4U]);}
if(b6S[E7I](cache[L1M],t)&&b6S[V7U](cache[L1M],b)){context.moveTo(xxo,cache[L1M]);context.lineTo(xxo+this[k9c],cache[L1M]);}
context.stroke();}
return colors;}
;STXChart.prototype.plotLineChart=function(panel,quotes,field,parameters,colorFunction){var h7U="labelDecimalPlaces",T3w="J0x",V1R="label",g0z="W0x",F1U="t0x",O5c="c0x",o4C="w0x",r6D="P0x",p8w="iL",y3U="Y0x",m8C="z0x",P8I="h7x",x5T="R7x",x0z="M7x",D8z="A7x",f5D="K7x",j3z="r7x",l1R="Wi",I9I="B7x",P2U="y7x",G11="m7x",l1c="I7x",X2z="v7x",I21="s7x",Y87="j7x",C8w="b7x",I7C="skipTransform",skipProjections=false,skipTransform=false,noSlopes=false;if(parameters){skipProjections=parameters[g2R];skipTransform=parameters[I7C];noSlopes=parameters[T11];}
var chart=panel[X1c],context=this[X1c][(S4T+s2I+b6S.K7M)],first=true,yAxis=panel[c3I],t=yAxis.top,b=yAxis[f97],leftTick=b6S[C8w](chart[g91].length,chart[s67]),rightTick=leftTick+chart[T4c],lastVal=null,colors={}
,lastXY=[0,0],clipping=false;context.beginPath();for(var i=0;b6S[Y87](i,quotes.length);i++){var quote=quotes[i];if(b6S[I21](quote,null))continue;if(skipProjections&&quote[Z5I])break;if(!skipTransform&&quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+i;if(!quote[field]&&b6S[X2z](quote[field],0))continue;lastVal=quote[field];if(b6S[l1c](tick,panel[s2U])||b6S[G11](tick,panel[Q6U])||!cache[field]){cache[field]=(yAxis[Y1U]?this[D7C](lastVal,panel):(b6S[P2U]((yAxis[o5w]-lastVal),yAxis[X5R]))+yAxis.top);}
var x=b6S[I9I](i,this[k5I][(N3c+n1M+b6S.l2M+E1M+b6S.I2M+l1R+b6S.l2M+b6S.K7M+E8M)])+this[k9c];if(this[P2C]&&b6S[j3z](i,quotes.length-1)){x+=this[k9c];}
var y=cache[field];if(colorFunction){var color=colorFunction(this,quote);if(!color)continue;if(b6S[f5D](context.strokeStyle,color)){if(!first){context.stroke();context.beginPath();context.moveTo(lastXY[0],lastXY[1]);}
context.strokeStyle=color;colors[color]=1;}
}
if(!clipping&&(b6S[D8z](y,t)||b6S[x0z](y,b))){clipping=true;if(!first){context.stroke();}
context.save();context.beginPath();context.rect(this[X1c][(E1M+b6S.I2M+q6M+b6S.K7M)],t,this[X1c].width,b6S[x5T](b,t));context.clip();context.beginPath();if(!first)context.moveTo(lastXY[0],lastXY[1]);}
if(first){first=false;if(noSlopes||b6S[P8I](leftTick,0)){context.moveTo(x,y);}
else if(b6S[m8C](leftTick,0)){var baseline=chart[g91][b6S[y3U](leftTick,1)];if(!skipTransform&&baseline.transform)baseline=baseline.transform;var y0=baseline[field];y0=(yAxis[(P6j+x1M+p8w+K81)]?this[D7C](y0,panel):(b6S[r6D]((yAxis[o5w]-y0),yAxis[X5R]))+yAxis.top);y0=Math[(B9R)](Math[z4M](y0,t),b);context.moveTo(b6S[o4C]((i-1),this[k5I][(o2M+S8D+E1M+b6S.I2M+S0T)])+this[k9c],y0);context.lineTo(x,y);}
}
else{if(noSlopes){var quote1=quotes[b6S[O5c](i,1)];if(b6S[F1U](quote1,null))continue;if(!skipTransform&&quote1.transform)quote1=quote1.transform;if(i&&b6S[g0z](y,quote1[W8R][field])){context.lineTo(x,lastXY[1]);context.moveTo(x,y);}
else{context.lineTo(x,y);}
}
else{context.lineTo(x,y);}
}
lastXY=[x,y];}
context.stroke();if(clipping)context.restore();if(parameters[V1R]&&b6S[T3w](lastVal,null)){var txt;if(yAxis[v7z]){txt=yAxis[v7z](this,panel,lastVal,parameters[h7U]);}
else{txt=this[(M6U+V6j+t4M+p67+s0M+K8M+o2M+b6S.I2M)](lastVal,panel,parameters[h7U]);}
this[k31](panel,txt,y,context.strokeStyle,"#FFFFFF");}
return colors;}
;STXChart.prototype.plotMountainChart=function(panel,quotes,field,parameters){var X9w="d1x",M21="andleW",V5c="E1x",r4M="k1x",C6C="l1x",V3C="Z1x",W7I="H1x",n5w="n1x",T7D="S1x",q0M="stTic",M9T="ffse",W4z="a0x",V0D="pli",V7R="f0x",p5R="p0x",W4I="G0x",r7D="Q0x",N07="F0x",c2I="x0x",d5M="U0x",F4c="i0x",c2w="sfo",d8R="pTran",W2R="ki",skipProjections=false,skipTransform=false;if(parameters){skipProjections=parameters[g2R];skipTransform=parameters[(d0M+W2R+d8R+c2w+V0M+x1M)];}
var chart=panel[X1c],context=this[X1c][o4z],first=true,t=panel.yAxis.top,b=panel[c3I][f97];context.save();context.beginPath();context.rect(0,t,this[X1c].width,b6S[F4c](b,t));context.clip();context.beginPath();var leftTick=b6S[d5M](chart[g91].length,chart[s67]),firstX=null,firstY=null,yAxis=panel[c3I],x=0;for(var i=0;b6S[c2I](i,quotes.length);i++){var quote=quotes[i];if(b6S[N07](quote,null))continue;if(skipProjections&&quote[Z5I])break;if(!skipTransform&&quote.transform)quote=quote.transform;var cache=quote[W8R],tick=leftTick+i;if(b6S[r7D](tick,panel[s2U])||b6S[W4I](tick,panel[Q6U])||!cache[field]){if(!quote[field]&&b6S[p5R](quote[field],0))continue;cache[field]=(yAxis[Y1U]?this[D7C](quote[field],panel):(b6S[V7R]((yAxis[o5w]-quote[field]),yAxis[(x1M+U0I+b6S.K7M+K8M+V0D+i2D)]))+yAxis.top);}
x=b6S[W4z](i,this[k5I][h4U])+this[(c1M+M9T+b6S.K7M)];if(this[(b6S.I2M+w5z+b6S.I2M+n1M+b6S.l2M+c3j+b6S.a9M+q0M+S8M)]&&b6S[T7D](i,quotes.length-1)){x+=this[(c1M+q6M+q6M+P6j+b6S.K7M)];}
if(b6S[(n5w)](firstX,null))firstX=x;var y=cache[field];if(b6S[W7I](firstY,null))firstY=y;if(first){first=false;if(b6S[V3C](leftTick,0)){context.moveTo(x,y);}
else{var baseline=chart[(k4c+b6S.K7M+T0M+z5D)][b6S[C6C](leftTick,1)];if(baseline.transform)baseline=baseline.transform;var y0=baseline[field];y0=(yAxis[Y1U]?this[D7C](y0,panel):(b6S[r4M]((yAxis[o5w]-y0),yAxis[X5R]))+yAxis.top);y0=Math[B9R](Math[z4M](y0,t),b);firstX=b6S[V5c](this[k9c],this[k5I][(o2M+M21+X5w+b6S.K7M+E8M)]);context.moveTo(firstX,y0);context.lineTo(x,y);}
}
else{context.lineTo(x,y);}
}
context.lineTo(x,b);context.lineTo(firstX,b);if(b6S[X9w](firstY,b))firstY=b;context.lineTo(firstX,firstY);context.fill();context.closePath();context.restore();}
;STXChart.prototype.drawLineChart=function(chart,style,colorFunction){var p5w="o1x",context=this[X1c][o4z],c=this[M3z](style);if(c.width&&b6S[p5w](parseInt(c.width,10),25)){context.lineWidth=Math[z4M](1,STX[m2M](c.width));}
else{context.lineWidth=1;}
this[X3j](style);return this[Y2z](chart[c7D],chart[U3U],"Close",{skipProjections:true}
,colorFunction);}
;STXChart.prototype.drawMountainChart=function(chart){var T9M="nspa",O6C="L1x",P6D="pCol",f3I="orderTo",F3z="plotMountainChart",z3D="O1x",f3c="T1x",context=this[X1c][o4z],c=this[M3z]("stx_mountain_chart");if(c.width&&b6S[f3c](parseInt(c.width,10),25)){context.lineWidth=Math[z4M](1,STX[m2M](c.width));}
else{context.lineWidth=1;}
var panel=this[X1c][(L5T+b6S.I2M+E1M)],top=this[D7C](this[X1c][B8c],panel);if(isNaN(top))top=0;var backgroundColor=c["backgroundColor"],color=c["color"];if(color&&b6S[z3D](color,"transparent")){var gradient=context.createLinearGradient(0,top,0,panel[c3I][f97]);gradient.addColorStop(0,backgroundColor);gradient.addColorStop(1,color);context.fillStyle=gradient;}
else{context.fillStyle=backgroundColor;}
this[F3z](panel,chart[U3U],"Close",{skipProjections:true}
);var strokeStyle=c[(F9M+f3I+P6D+c1M+V0M)];if(strokeStyle&&b6S[O6C](strokeStyle,(b6S.K7M+V0M+b6S.a9M+T9M+N4U+n1M+b6S.K7M))){context.strokeStyle=strokeStyle;this[Y2z](panel,chart[U3U],"Close",{skipProjections:true}
);}
}
;STXChart.prototype.drawWaveChart=function(chart){var l4T="w6x",k0w="P6x",k0c="Y6x",O07="dleW",w9c="z6x",Z71="h8x",U1w="R8x",x9w="leWi",w1D="M8x",n2z="A8x",h81="K8x",w9C="r8x",S5M="B8x",V1D="m8x",L7U="I8x",T9z="v8x",a1D="eW",J7I="s8x",o0C="j8x",u5C="tip",H1C="mu",n7T="b8x",z8j="g8x",X1I="V8x",w9z="8x",D6I="N1x",y7U="C1x",n37="e1x",U8z="X1x",q9M="D1x",i21="u1x",quotes=chart[U3U],panel=chart[c7D],context=this[(o2M+E8M+i1M)][(o2M+q0I+b6S.I2M+w5z)];context.beginPath();var first=false,reset=false,t=panel.yAxis.top,b=panel[c3I][f97];for(var i=0;b6S[i21](i,quotes.length);i++){var quote=quotes[i];if(b6S[q9M](quote,null))continue;if(quote[Z5I])break;if(quote.transform)quote=quote.transform;var x=b6S[U8z](i,this[k5I][h4U])+this[k9c],y=this[(u2w+A3j+b6U+m3R+W7M)](quote[d77],panel);if(b6S[n37](y,t)){y=t;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else if(b6S[y7U](y,b)){y=b;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else{reset=false;}
if(!first){first=true;var leftTick=b6S[D6I](chart[g91].length,chart[s67]);if(b6S[(e0M+w9z)](leftTick,0)){context.moveTo(x,y);}
else if(b6S[X1I](leftTick,0)){var baseline=chart[g91][b6S[z8j](leftTick,1)];if(baseline.transform)baseline=baseline.transform;var y0=baseline[G3c];y0=(panel[c3I][Y1U]?this[D7C](y0,panel):(b6S[n7T]((panel[c3I][(E8M+K8M+Z6M+E8M)]-y0),panel[c3I][(H1C+E1M+u5C+E1M+a97)]))+t);y0=Math[B9R](Math[z4M](y0,t),b);context.moveTo(b6S[o0C]((i-1),this[k5I][h4U])+this[k9c],y0);context.lineTo(x,y);}
context.moveTo(x,y);}
else{context.lineTo(x,y);}
x+=b6S[J7I](this[k5I][(o2M+m1j+b6S.l2M+E1M+a1D+X5w+P1M)],4);if(b6S[T9z](quote[d77],quote[G3c])){y=this[D7C](quote[(k3z+J2I)],panel);if(b6S[L7U](y,t))y=t;if(b6S[V1D](y,b))y=b;context.lineTo(x,y);x+=b6S[(g2I+w9z)](this[k5I][h4U],4);y=this[D7C](quote[c9R],panel);if(b6S[S5M](y,t))y=t;if(b6S[w9C](y,b))y=b;context.lineTo(x,y);}
else{y=this[D7C](quote[c9R],panel);if(b6S[h81](y,t))y=t;if(b6S[n2z](y,b))y=b;context.lineTo(x,y);x+=b6S[(w1D)](this[k5I][(J7w+b6S.l2M+x9w+b6S.l2M+b6S.K7M+E8M)],4);y=this[D7C](quote[Q6I],panel);if(b6S[U1w](y,t))y=t;if(b6S[Z71](y,b))y=b;context.lineTo(x,y);}
x+=b6S[w9c](this[k5I][(N3c+n1M+O07+K8M+U8D+E8M)],4);y=this[D7C](quote[G3c],panel);if(b6S[k0c](y,t))y=t;if(b6S[k0w](y,b))y=b;context.lineTo(x,y);}
var c=this[M3z]("stx_line_chart");if(c.width&&b6S[l4T](parseInt(c.width,10),25)){context.lineWidth=Math[z4M](1,STX[m2M](c.width));}
else{context.lineWidth=1;}
this[X3j]("stx_line_chart");context.stroke();context.closePath();}
;STXChart.prototype.updateFloatHRLabel=function(panel,y,txt){var L8C="Nod",z3M="child",G1D="rols",z6j="SPA",m8j="getElementsByTagName",v97="lS",D4M="abe",t1U="renderedWidth",J7R="J6x",C5z="t6x",Y1R="sBord",e7I="axis",j3M="_y",E51="c6x",canvas=this[b9M][X71][P8M][0],context=canvas[o4z]=canvas[j2I]('2d'),margin=3,height=this[f8w]("stx_yaxis")+b6S[(E51)](margin,2);this[f6z]((d0M+b6S.K7M+s2I+j3M+e7I),context);if(!canvas[I31])STX[n2M](canvas,this);var drawBorders=panel[(z8z+s2I+S7T)][u2M]||this[(b6S.a9M+n0z+Y1R+b6S.I2M+V0M+d0M)],tickWidth=drawBorders?3:0;try{var width=context.measureText(txt).width+tickWidth+b6S[C5z](margin,2);}
catch(e){var w77="6x";width=b6S[(i7M+w77)](this[X1c][T8R],this[a5C]);}
if(!canvas[I31]||b6S[J7R](canvas[t1U],width)){STX[n2M](canvas,this);canvas[t1U]=width;this[X3j]("stx-float-price-arrow",context);STX[this[(a1C+K8M+g2U+D4M+v97+b6S.K7M+g2I+E1M+b6S.I2M)]](context,8,0,width,height,3,true,false,"left");canvas[I31]=true;context.textBaseline="middle";}
if(STX[(S7T+i6j+T3j+h01)]){var span=this[b9M][X71][m8j]((z6j+n6j))[0];if(span){span.style.top="3px";span[W4w][q3M]="10px";span[W4w][d3R]=1;span[Z9c]=txt;}
}
else{this[(o2M+q0I+G1D)][X71][(o2M+L0z+E1M+b6S.l2M+n6j+F5C+d0M)][1][(i7z+O1R)].width=width+"px";this[b9M][X71][(z3M+L8C+b6S.I2M+d0M)][1][Z9c]=txt;}
}
;STXChart.prototype.headsUpHR=function(){var Z6C="lyIn",c4c="Dai",g9U="k3x",I0D="l3x",a47="Z3x",V37="utes",C6U="tMin",O41="H3x",U6C="n3x",K9U="S3x",X57="getM",h7C="hourMinute",f8C="ali",b37="a6x",p91="f6x",b2C="erHT",t7C="nn",g2z="fo",o01="xA",I9w="barFromPixel",Z4c="Labe",p3j="teF",q0c="dow",A1I="p6x",o9c="do",j8U="G6x",G4C="Q6x",L3I="updateFloatHRLabel",y2c="F6x",R7R="x6x",O77="vch",E6z="i6";if(this[W0M]("headsUpHR",arguments))return ;var panel=this[Q4R];if(!panel)return ;var chart=panel[(M1M+b6S.K7M)],cy=this[O4c];if(b6S[(E6z+s2I)](panel[T5U],(O77+b6S.a9M+P8U))){var y=b6S[(N4M+F71+s2I)](panel[f97],cy),px=b6S[(R7R)](panel[B8j],panel.height),amount=panel[B9R]+b6S[y2c](y,px);this[L3I](panel,y,STX[Z8w](amount));}
else{var price=this[G0D](cy,panel),labelDecimalPlaces=null;if(b6S[G4C](panel[X1c][(n1M+b6S.a9M+x1M+b6S.I2M)],panel[T5U])){labelDecimalPlaces=0;if(b6S[j8U](panel[c3I][(W3j+b6S.a9M+o9c+J2I)],1000))labelDecimalPlaces=2;if(b6S[A1I](panel[c3I][(W3j+b6S.a9M+q0c)],5))labelDecimalPlaces=4;}
price=this[t67](price,panel,labelDecimalPlaces);this[(o7I+b6S.l2M+b6S.a9M+p3j+E1M+c1M+V6j+v9M+X1j+Z4c+E1M)](panel,cy,price);}
if(this[b9M][S7I]){var bar=this[I9w](this[d0c]),prices=chart[t4R][bar];if(prices&&prices[q4c]){if(chart[(o01+n0z+d0M)][(g2z+r2U+V6j+b6S.K7M+i2D)]){this[b9M][S7I][(K8M+t7C+b2C+X8j+c3j)]=chart[N8R][X6z](prices[q4c]);}
else if(this[T3D]){var str=this[T3D][q0C][C3c](prices[q4c]);if(b6S[p91](prices[(F3j+L8j)][C6I](),0)||b6S[b37](prices[(q4c)][(Z6M+H5w+n1M+z8I+l5D)](),0)||!STXChart[m8R](this[k5I][k9w]))str+=" "+this[(E0T+h7M+T6U+b6S.a9M+z1M+S7D+f8C+q2I+b6S.I2M+V0M)][h7C][C3c](prices[(q4c)]);this[b9M][S7I][Z9c]=str;}
else{var m=prices[q4c][(X57+c1M+F4C+E8M)]()+1;if(b6S[K9U](m,10))m="0"+m;var d=prices[q4c][n8C]();if(b6S[U6C](d,10))d="0"+d;var h=prices[q4c][C6I]();if(b6S[O41](h,10))h="0"+h;var mn=prices[q4c][(z3C+C6U+V37)]();if(b6S[a47](mn,10))mn="0"+mn;if((b6S[I0D](h,"00")&&b6S[g9U](mn,"00"))||STXChart[(K8M+d0M+c4c+Z6C+h7M+V0M+r2I+b6S.a9M+E1M)](this[k5I][k9w]))this[b9M][S7I][Z9c]=m+"-"+d+"-"+prices[q4c][D0I]();else this[b9M][S7I][Z9c]=m+"-"+d+" "+h+":"+mn;}
}
else if(prices&&prices[w87]){this[b9M][S7I][Z9c]=prices[w87];}
}
if(this[W2T]("headsUpHR",arguments))return ;}
;STXChart.prototype.setCrosshairColors=function(){var R4D="T3x",Y7M="o3x",N6I="d3x",T1U="E3x",k1C="setCrosshairColors",E4z="unPrepe";return ;if(this[(V0M+E4z+n1M+b6S.l2M)](k1C,arguments))return ;var newClassName=M0c,oldClassName=P2z;if((STXChart[e11]||b6S[T1U](this[d3I][W2w],a27)||b6S[N6I](this[d3I][W2w],P5D)||b6S[Y7M](this[d3I][W2w],Z5I)||b6S[R4D](this[d3I][W2w],L3C))){newClassName=P2z;oldClassName=M0c;}
if(this[b9M][o7z][v7c][m8z](newClassName)==-b6S.p1j){STX[y5c](this[b9M][o7z],newClassName,oldClassName);STX[y5c](this[b9M][(A5D+w1U)],newClassName,oldClassName);}
this[W2T](k1C,arguments);}
;STXChart.prototype.magnetize=function(){var w4M="PI",V3U="I9H",Y9M="zedP",V2T="magneti",c7z="v9H",f8I="s9H",J5C="j9H",m6c="low_",V7w="b9H",r9M="g9H",O2w="9H",j9C="q9H",p6C="N3x",g27="C3x",D5z="e3x",C4T="X3x",m4c="D3x",I0M="u3x",l5w="L3x",p0w="rawingLine",d51="O3x";this[j01]=null;if(this[W0M]("magnetize",arguments))return ;if(b6S[d51](this[d3I][W2w],"annotation")&&STXChart[(b6S.l2M+p0w)])return ;if(b6S[l5w](this[d3I][W2w],"projection"))return ;if(b6S[I0M](this[d3I][(r2I+b6S.I2M+L1c+S2D+D2D)],"freeform"))return ;var panel=this[Q4R];if(b6S[m4c](panel[(T5U)],panel[X1c][(n1M+e1j+b6S.I2M)])){var chart=panel[X1c],tick=this[A7M](b6S[C4T](STXChart[i61],this[X1c][q3M]),chart);if(b6S[D5z](this[k5I][(T71+b6S.I2M+K3w)],"minute"))tick/=this[k5I][W27];if(b6S[g27](tick,chart[g91].length))return ;var prices=chart[g91][tick];if(b6S[p6C](prices,null))return ;var price=this[G0D](this[O4c],panel);this[j01]=prices[G3c];if(b6S[j9C](this[k5I][(o2M+V8z+P8U+L8j+g2I+x0M+b6S.I2M)],"bar")||b6S[(Q4M+O2w)](this[k5I][L8w],"candle")||b6S[r9M](this[k5I][L8w],"colored_bar")||b6S[V7w](this[k5I][L8w],(E8M+c1M+E1M+m6c+N3c+n1M+b6S.l2M+O1R))){var fields=[(b6j+x0M+b6S.I2M+n1M),"High","Low","Close"],closest=1000000000;for(var i=0;b6S[J5C](i,fields.length);i++){var fp=prices[fields[i]];if(b6S[f8I](Math[v8M](price-fp),closest)){closest=Math[v8M](b6S[c7z](price,fp));this[j01]=fp;}
}
}
var x=this[d57](tick,chart),y=this[(x0M+x4T+b6S.I2M+E1M+U5R+Z7D+J6j+V0M+K8M+Y3c)](this[(V2T+Y9M+c6M+b6S.I2M)],this[Q4R]),ctx=this[X1c][B3c][o4z];ctx.beginPath();ctx.lineWidth=1;var radius=b6S[V3U](Math[z4M](this[k5I][h4U],8),2);ctx.arc(x,y,radius,0,b6S[(x1M+O2w)](2,Math[w4M]),false);ctx.fillStyle="#FFFFFF";ctx.strokeStyle="#000000";ctx.fill();ctx.stroke();ctx.closePath();}
this[W2T]("magnetize",arguments);}
;STXChart.prototype.positionCrosshairsAtPointer=function(){var Q3j="omT",D6U="y9H",r8c="rY",Z5T="cro";if(!this[Q4R])return ;var chart=this[Q4R][X1c],tick=this[A7M](this[g4M](STXChart[i61]),chart);tick/=this[k5I][W27];this[O4c]=this[A5M](STXChart[(Z5T+d0M+W3j+F4M+r8c)]);this[d0c]=this[g4M](STXChart[i61]);this[b9M][o7z][W4w][q3M]=(b6S[D6U](this[(x0M+K8M+Y1I+U5R+Q3j+c7w+S8M)](tick,chart),I8M))+(x0M+s2I);this.controls.crossY.style.top=this[A5M](STXChart[L61])+K3D;this[s3C]();}
;STXChart.prototype.doDisplayCrosshairs=function(){var d5D="K9H",J71="spl",b17="r9H",A57="ram",X3U="rPa",I07="rre",l0M="B9H";if(this[W0M](X81,arguments))return ;if(this[k2T]){if(!this[k5I][u1I]&&(b6S[l0M](this[d3I][W2w],B7M)||!this[(A7c+I07+n1M+b6S.K7M+Q4M+O4U+c1M+X3U+A57+z5D+b6S.I2M+V0M+d0M)][(r2I+b6S.I2M+o2M+b6S.K7M+c1M+V0M+n8D+O0D)])){this[j3C]();}
else if(STX[f57][this[d3I][W2w]]&&(new STX[f57][this[d3I][W2w]])[G7c]){this[j3C]();}
else{if(b6S[b17](this[b9M][o7z][W4w][C47],B7M)){this[b9M][o7z][W4w][C47]=B7M;this[b9M][f4z][W4w][(q5c+J71+b6S.a9M+g2I)]=B7M;this[b9M][X71][W4w][C47]=B7M;if(this[X3M][R2c]&&b6S[d5D](this[d3I][W2w],B7M)){document[(F7U+L8D)][W4w][T0U]=s2c;}
else{document[l4U][(d0M+b6S.K7M+h3C)][T0U]=u1I;}
}
if(this[b9M][S7I]){this[b9M][S7I][W4w][C47]=j0c;}
}
}
if(this[W2T](X81,arguments))return ;}
;STXChart.prototype.undisplayCrosshairs=function(){var g8U="irs",V2M="isplay",r3z="M9H",V2w="A9H";if(this[W0M](j3C,arguments))return ;if(b6S[V2w](this[b9M][o7z],F4U)){if(b6S[r3z](this[(o2M+S7D+b6S.K7M+H5U+d0M)][o7z][W4w][C47],s2c)){this[b9M][o7z][W4w][C47]=s2c;this[b9M][(A5D+w1U)][W4w][C47]=s2c;this[b9M][X71][W4w][C47]=s2c;}
}
if(this[k2T]&&this[b9M][S7I]){this[(o2M+c1M+n1M+r2M+E1M+d0M)][S7I][W4w][C47]=s2c;}
document[(F9M+n61+g2I)][(d0M+b6S.K7M+h3C)][T0U]=x5D;if(this[W2T]((N7I+b6S.l2M+V2M+I41+V0M+c1M+r7w+b6S.a9M+g8U),arguments))return ;}
;STXChart.prototype.modalBegin=function(){var m8I="modal",K8D="ial",u37="nD";this[(D0z+u37+K8D+K81)]=m8I;this[j3C]();}
;STXChart.prototype.modalEnd=function(){this[V6z]=w2T;this[W6z]=B7M;this[X81]();}
;STXChart.prototype.updateChartAccessories=function(){var S5R="N9H",G5w="R9H",r1R="HR";this[d7C]=F4U;this[v9z]=new Date()[Y7w]();var xy=STX[B8w](this[b9M][(q6M+E1M+w81+b6S.K7M+r1R)][N67]);this.controls.floatHR.style.top=(b6S[G5w](STXChart[L61],xy[g2I],this[b9M][X71][d5C]/b6S.G1j))+K3D;var floatDate=this[b9M][S7I];if(floatDate){var panel=this[Q4R];if(!panel)panel=this[X1c][c7D];if(panel){var chart=panel[X1c];floatDate[W4w][q3M]=(b6S[S5R](this[(J4w+X7M+p2M)](STXChart[i61]),(floatDate[E9D]/b6S.G1j)))+K3D;floatDate[W4w][f97]=(b6S[(e0M+x9U)](this[X1c][i1w],chart[c7D][f97]))+K3D;}
}
this[J9M]();}
;STXChart.prototype.mousemove=function(e$){var o6w="V2H",e=e$?e$:event;if(!e[E1R]){e[E1R]=e[S6w]+document[(F7U+L8D)][x7C]+document[Z1D][x7C];e[(x0M+b9z+t4M)]=e[J5w]+document[l4U][B1w]+document[Z1D][B1w];}
STXChart[i61]=e[E1R];STXChart[L61]=e[H8R];if(this[W0M](c8I,arguments))return ;if(!this[k2T])return ;if(b6S[o6w](this[W6z],B7M))return ;this[X8I](e[(k6D+Z6M+H6D)],e[H8R]);if(this[W2T](c8I,arguments))return ;}
;STXChart.prototype.setResizeTimer=function(ms){var a2w="resizeTimeout",X1R="resizeDetectMS";this[X1R]=ms;function closure(self){return function(){var V21="b2H",y2R="g2H",R4I="ndr",K7U="sA";if(!self[X1c].canvas)return ;if(!STX[(K8M+K7U+R4I+c1M+X5w)]){if(b6S[y2R](self[X1c].canvas.height,Math[b3R](self[J7c]*self[X1c][w8w][L9z]))||b6S[V21](self[X1c].canvas.width,Math[b3R](self[J7c]*self[(V61+V0M+b6S.K7M)][w8w][C1I]))){self[C7R]();return ;}
}
}
;}
;if(ms){if(this[a2w])window[H9I](this[a2w]);this[a2w]=window[f0D](closure(this),ms);}
else{if(this[a2w])window[H9I](this[a2w]);this[a2w]=null;}
}
;STXChart.prototype.mousemoveinner=function(epX,epY){var v6I="light",E9c="y7H",X8c="m7H",k4D="edPr",L3c="eti",k9M="anelNa",c5w="hairTi",o71="reposition",d5c="I7H",a6w="kO",g6I="v7H",d8z="s7H",P4w="ector",O6w="orT",y8R="j7H",a4R="shai",H9z="b7H",q2M="der",d11="pC",d6j="requestAnimationFrame",m7R="useAnimation",Z3c="g7H",e8R="q7H",d5z="N4H",b6R="C4H",T3C="e4H",f5w="X4H",R8c="D4H",X9M="u4H",A9M="grabbingPanel",i3z="L4H",k3I="O4H",n6D="T4H",I9M="o4H",q1D="ound",Q51="d4H",D5U="E4H",c0M="k4H",m9D="l4H",w67="Z4H",X3I="H4H",R2z="n4H",n5U="padM",Y2w="Wid",c9c="S4H",k3w="a5H",A6D="f5H",m4C="p5",G7D="G5H",V27="Q5H",R17="F5",G5D="x5H",i0D="U5H",S6z="i5",c87="J5H",f3U="W5H",z9D="grabMode",f77="t5H",f1c="c5H",X47="w5H",S7R="P5H",n7U="yTolerance",o5c="Y5H",O6U="z5H",U1R="h2H",H61="R2H",g9C="ferenc",s57="ky",R8M="rie",C7z="ngPan",x3z="res",f7U="A2H",i5M="overYAxis",A8M="K2H",T1I="r2H",M9D="overXAxis",j6U="B2H",x7M="y2H",M97="m2H",F0R="I2H",h9c="v2H",J3D="airY",D81="rossh",u2D="flo",N61="j2H";if(!this[X1c].canvas)return ;if(!STX[M7C]){if(b6S[N61](this[X1c].canvas.height,Math[(q6M+T3R+c1M+V0M)](this[J7c]*this[(b6S.j3c+K8j+b6S.K7M)][w8w][L9z]))||b6S[(d0M+x9U)](this[X1c].canvas.width,Math[(u2D+S2D)](this[J7c]*this[X1c][w8w][C1I]))){this[C7R]();return ;}
}
if(this[W0M]("mousemoveinner",arguments))return ;STXChart[i61]=epX;STXChart[L61]=epY;var cy=this[O4c]=this[A5M](STXChart[(o2M+D81+J3D)]),cx=this[d0c]=this[(J4w+z8I+b7M)](STXChart[i61]);this[Q4R]=this[q0z](cy);if(!this[Q4R])this[Q4R]=this[X1c][c7D];if(!this[Q4R])return ;var chart=this[Q4R][X1c];if(chart[g91]){this[h9D]=b6S[h9c](this[(b6S.K7M+K8M+o2M+D9T+V0M+c1M+C0w+s2I+l7D)](cx,chart),this[k5I][W27]);this[Y5z]=this[g6j](this[Q4R],this[h9D],this[G0D](cy,this[Q4R]));}
if(b6S[F0R](STXChart[(K0c+F9D+W3j+L6D)],this[(V61+V0M+b6S.K7M)][(O1R+k5z)])&&b6S[M97](STXChart[i61],this[X1c][v0R])&&b6S[x7M](STXChart[L61],this.chart.top)&&b6S[j6U](STXChart[L61],this[X1c][f97])){STXChart[r2z]=true;}
else{STXChart[r2z]=false;}
this[M9D]=b6S[T1I](STXChart[L61],this.chart.top+this[(o2M+V8z+V0M+b6S.K7M)][c7D][c3I][f97])&&b6S[A8M](STXChart[L61],this.chart.top+this[X1c][c7D][f97])&&STXChart[r2z];this[i5M]=b6S[f7U](STXChart[i61],this[X1c][H3R])&&STXChart[(E0T+d0M+K8M+Y2c+I41+V8z+V0M+b6S.K7M)];if(this[M9D]||this[i5M]||(!STXChart[r2z]&&!this[r61])){this[j3C]();if(!this[M9D]&&!this[i5M])return ;}
if(!this[T2R]&&b6S[(X8j+G3I+v9M)](STXChart[Q9I],null)){this[j3C]();return ;}
if(this[r61]&&!STXChart[(x3z+K8M+q2I+K8M+C7z+b6S.I2M+E1M)]){if(this[o9C]){STX[n2M](this[X1c][B3c],this);this[o9C]=false;for(var n in this[z0z]){this[z0z][n][Q3c]=false;}
for(var n in chart[(d0M+b6S.I2M+R8M+d0M)]){chart[m2T][n][Q3c]=false;}
this[(Z3I+N3j+E8j+b6S.K7M+c7w+s57)]();}
if(this[(c5c+b6S.I2M+g9C+b6S.I2M+d0M)][R2c]&&b6S[H61](this[d3I][(r8I+o2M+b6S.K7M+c1M+V0M+L8j+g2I+O0D)],"")){STX[n2M](this[X1c][B3c],this);}
if(this[a5M]==-1){this[a5M]=STXChart[i61];this[M87]=chart[s67];}
if(this[Z4M]==-1){this[Z4M]=STXChart[L61];this[O87]=chart[c7D][c3I][s67];}
var dx=b6S[U1R](STXChart[i61],this[a5M]),dy=b6S[O6U](STXChart[(o2M+V0M+c1M+r7w+b6S.a9M+K8M+V0M+t4M)],this[Z4M]);if(b6S[o5c](Math[v8M](dy),this[n7U])){if(!this[u7w])dy=0;}
else{this[u7w]=true;}
if(b6S[S7R](dx,0)&&b6S[X47](dy,0))return ;if(b6S[f1c](Math[v8M](dx)+Math[(v8M)](dy),5))this[A5T]=true;if(b6S[f77](this[z9D],"pan")&&(b6S[f3U](this[z9D][m8z]("zoom"),0)||this[x77]||this[M9D]||this[i5M])){if(b6S[c87](this[z9D],"")){if(this[M9D])this[z9D]="zoom-x";else if(this[i5M])this[z9D]="zoom-y";}
if(b6S[(S6z+v9M)](this[z9D],"zoom-x"))dy=0;else if(b6S[i0D](this[z9D],"zoom-y"))dx=0;var push=b6S[G5D](dx,25),centerMe=true;if(b6S[(R17+v9M)](chart[s67],chart[T4c]))centerMe=false;var newCandleWidth=this[C9D]+push;if(b6S[V27](newCandleWidth,this[Y6U]))newCandleWidth=this[Y6U];var pct=b6S[G7D]((this[k5I][h4U]-newCandleWidth),this[k5I][h4U]);if(b6S[(m4C+v9M)](pct,.1)){newCandleWidth=b6S[A6D](this[k5I][h4U],.9);}
else if(pct<-.1){newCandleWidth=b6S[k3w](this[k5I][h4U],1.1);}
if(STX[w6I]){if(b6S[c9c](Math[y1c]((this[X1c].width/this[k5I][(N3c+D1C+O1R+Y2w+b6S.K7M+E8M)])-.499)-1,STXChart[(K8M+n5U+Y3j+L8j+c5U+d0M)])&&b6S[R2z](Math[y1c]((this[X1c].width/newCandleWidth)-.499)-1,STXChart[z1w]))return ;}
if(this[M5c]){var x=this[(g4M)](this[M5c]),tick=this[A7M](x,chart);this[H7D](newCandleWidth,chart);var newTick=this[A7M](x,chart);chart[s67]+=Math[(P7z+c1M+S2D)](b6S[X3I]((newTick-tick),this[k5I][W27]));}
else if(centerMe){var newMaxTicks=Math[y1c](b6S[w67]((this[X1c].width/newCandleWidth),.499));if(b6S[m9D](newMaxTicks,chart[T4c])){this[H7D](newCandleWidth,chart);var center=b6S[c0M](chart[(f0R+o7D+E1M)],chart[(x1M+b6S.a9M+s2I+T6R+S8M+d0M)]/2),newCenter=(b6S[D5U](chart[s67],chart[T4c]/2));chart[s67]+=Math[y1c](b6S[Q51](center,newCenter));}
}
else{var newMaxTicks=Math[(V0M+q1D)](b6S[I9M]((this[X1c].width/newCandleWidth),.499));if(b6S[n6D](newMaxTicks,chart[T4c])){this[H7D](newCandleWidth,chart);var wsInTicks=Math[(V0M+c1M+X7M+D1C)](b6S[k3I](this[X3M][a87],this[(L57+r7T+z8I)][h4U]));chart[s67]=b6S[i3z](chart[T4c],wsInTicks);}
}
this[k5I][b4z]=null;var yAxis=this[A9M][c3I];yAxis[(E0w)]=Math[y1c](this[O7w]+dy);if(b6S[X9M](this[O7w],yAxis.height)){if(b6S[R8c](yAxis[E0w],yAxis.height))yAxis[E0w]=b6S[f5w](yAxis.height,1);}
else{if(b6S[T3C](yAxis[E0w],yAxis.height))yAxis[E0w]=yAxis.height+1;}
}
else{this[z9D]="pan";var push=Math[y1c](b6S[b6R](dx,this[k5I][h4U]));if(this[R8z])push*=5;chart[s67]=this[M87]+push;if(b6S[d5z](chart[(d0M+o2M+H5U+E1M)],1))chart[s67]=1;if(b6S[e8R](chart[s67],chart[T4c])){this[X3M][a87]=30;}
else{this[X3M][a87]=b6S[(Q4M+m71+v9M)]((chart[T4c]-chart[(y1j+V0M+o7D+E1M)]),this[k5I][h4U]);}
if(b6S[(Z3c)](this[Q4R][T5U],chart[T5U])){this[X1c][(x0M+u1D+E1M)][c3I][s67]=this[O87]+dy;}
}
var clsrFunc=function(stx){return function(){stx[Y5M]();}
;}
;if((STXChart[m7R]||STX[M7C])&&window[d6j])window[d6j](clsrFunc(this));else this[Y5M]();if(this[T5D]){STX[n2M](this[X1c][(b6S.K7M+b6S.I2M+x1M+d11+m1j+r2I+b6S.a9M+d0M)],this);this[T5D][(N4U+n1M+q2M)](this[X1c][B3c][o4z]);this[T5D][B9z]();}
this[j3C]();return ;}
else{this[z9D]="";}
this[A9M]=this[Q4R];if(this[M9D]||this[i5M])return ;var tick=this[A7M](this[g4M](STXChart[i61]),chart);tick/=this[k5I][W27];this[b9M][o7z][W4w][q3M]=(b6S[H9z](this[d57](tick,chart),.5))+"px";this.controls.crossY.style.top=this[A5M](STXChart[L61])+"px";this[(d7R+V0M+F9D+a4R+V0M+t8D+c1M+k8U)]();if(STXChart[r2z]&&b6S[y8R](STXChart[Q9I],null)){if(!STX[f57][this[d3I][(S2R+b6S.K7M+O6w+e7T+b6S.I2M)]]||!(new STX[f57][this[d3I][(r2I+P4w+n8D+O0D)]])[(F3D+E4M+L8j+c1M+F3j+V0M+J3j)]){this[X81]();}
if(b6S[d8z](this[d7C],null))clearTimeout(this[d7C]);if(STXChart[e11]||!STX[B0z]){this[s3C]();}
else{if(b6S[g6I](new Date()[(z3C+b6S.K7M+j1w)]()-this[v9z],100))this[s3C]();this[d7C]=setTimeout((function(stx){return function(){stx[s3C]();}
;}
)(this),10);}
}
else{this[j3C]();}
if(this[f8M]){var panel=this[K41][this[f8M][T6z]],value=this[g6j](panel,this[h9D],this[e6c](this[(p4I+a6w+X7M+h2M)](STXChart[L61]),panel));if(this[X3M][R2c]&&this[j01]&&b6S[d5c](panel[T5U],panel[X1c][T5U])){value=this[g6j](panel,this[h9D],this[j01]);}
STX[n2M](this[X1c][B3c],this);this[f8M][o71](this[X1c][B3c][o4z],this[f8M][x51],this[(K0c+F9D+d0M+c5w+o2M+S8M)],value);if(this[f8M][B9z])this[f8M][B9z]();}
else if(STXChart[e11]){if(this[T5D]){var panel=this[K41][this[(b6S.a9M+o2M+b6S.K7M+K8M+r2I+b6S.I2M+L17+b6S.a9M+N2C+Z6M)][(x0M+k9M+x1M+b6S.I2M)]],value=this[g6j](panel,this[h9D],this[e6c](this[A5M](STXChart[L61]),panel));if(this[X3M][R2c]&&this[(x1M+b6S.a9M+L2w+L3c+q2I+k4D+c7w+b6S.I2M)]&&b6S[X8c](panel[T5U],panel[X1c][T5U])){value=this[g6j](panel,this[h9D],this[j01]);}
STX[n2M](this[X1c][B3c],this);this[T5D][l0C](this[X1c][B3c][(o2M+S7D+b6S.K7M+b6S.I2M+w5z)],this[h9D],value);if(this[T5D][B9z])this[T5D][B9z]();}
}
else if(b6S[E9c](STXChart[Q9I],null)){this[O5R]();this[C6w]();}
else if(STXChart[r2z]){this[(q6M+e4I+h27+Z6M+E8M+v6I+d0M)]();}
if(this[X3M][R2c]&&b6S[(s6D+v9M)](this[d3I][W2w],"")){if(!STXChart[e11]&&!this[o9C])STX[n2M](this[X1c][B3c]);this[S2z]();}
if(this[W2T]("mousemoveinner",arguments))return ;}
;STXChart.prototype.findHighlights=function(isTap,clearOnly){var M5T="a0H",e0U="ySt",b57="f0H",E9w="ghli",e3D="anyH",p1C="p0H",K2M="G0H",O01="Q0H",v8z="F0H",O9M="x0H",s3z="U0H",d7D="i0H",l4I="J0H",m2z="W0H",k0D="t0H",U87="c0H",x5I="isHighlighted",A0R="w0H",s11="P0H",g6M="barF",W4C="prev",I3C="asure",O97="Y0H",I17="z0H",k0R="intersected",u0c="oner",i6C="lNa",O2z="h7H",C9I="R7H",S1C="7H",V0T="A7H",U4I="K7H",P1U="arC",radius=10;if(isTap)radius=30;var cy=this[O4c],cx=this[d0c];if(!this[Q4R])return ;var chart=this[Q4R][X1c];this[o9C]=false;if(this[X3M][R2c]&&b6S[(k3D+v9M)](this[d3I][(S2R+b6S.K7M+c1M+V0M+L8j+g2I+x0M+b6S.I2M)],"")){STX[(o2M+E1M+b6S.I2M+P1U+P2c+c6j)](this[X1c][B3c],this);}
var somethingChanged=false,drawingToMeasure=null,box={x0:b6S[U4I](this[A7M](cx-radius,chart),this[k5I][W27]),x1:b6S[V0T](this[A7M](cx+radius,chart),this[k5I][W27]),y0:this[e6c](b6S[(X8j+S1C)](cy,radius),this[Q4R]),y1:this[e6c](cy+radius,this[Q4R])}
;for(var i=0;b6S[C9I](i,this[k2c].length);i++){var drawing=this[k2c][i];if(drawing[l4c])continue;var prevHighlight=drawing[(L0z+b3C+o8R+b3C+h7M+b6S.l2M)],highlightMe=(b6S[O2z](drawing[(k6D+n1M+b6S.I2M+i6C+x1M+b6S.I2M)],this[Q4R][T5U]));drawing[(N4U+Q2c+d0M+H7T+K8M+u0c)]=drawing[k0R](this[h9D],this[Y5z],box);highlightMe=highlightMe&&drawing[x51];if(!clearOnly&&highlightMe){if(b6S[I17](prevHighlight,drawing[Q3c](true))){drawingToMeasure=drawing;somethingChanged=true;}
this[o9C]=true;}
else{if(b6S[O97](prevHighlight,drawing[Q3c](false))){somethingChanged=true;}
}
}
if(somethingChanged){this[Y5M]();this[a0M]("","",true);if(drawingToMeasure)drawingToMeasure[(c77+I3C)]();}
var first=false;for(var n in this[z0z]){var o=this[z0z][n];o[W4C]=o[Q3c];o[Q3c]=false;}
for(var n in chart[m2T]){var series=chart[(P6j+V0M+K8M+l5D)][n];series[W4C]=series[Q3c];series[Q3c]=false;}
if(!clearOnly){var bar=this[(g6M+o1D+Q3U+E1M)](cx);if(b6S[s11](bar,chart[(t61+T9I+J2w+b6S.I2M+F4C)].length)){for(var n in this[z0z]){var o=this[z0z][n];if(b6S[A0R](o[(k6D+n1M+b6S.I2M+E1M)],this[Q4R][T5U]))continue;if(o[N41][x5I]&&o[N41][x5I](this,cx,cy)){o[Q3c]=true;this[o9C]=true;continue;}
var quote=chart[(b6S.l2M+V6j+b6S.a9M+d4D+J2w+b6S.I2M+n1M+b6S.K7M)][bar];if(!quote)continue;for(var out in this[z0z][n][p01]){var val=quote[out],y=0;if(b6S[U87](this[Q4R][(n1M+b6S.a9M+x1M+b6S.I2M)],chart[T5U])){y=this[I0c](val,this[Q4R]);}
else{y=this[D7C](val,this[Q4R]);}
if(b6S[k0D](cy-radius,y)&&b6S[m2z](cy+radius,y)){o[Q3c]=true;this[o9C]=true;break;}
}
}
for(var n in chart[m2T]){var series=chart[m2T][n],y=series[f9U][bar];if(b6S[l4I](cy-radius,y)&&b6S[d7D](cy+radius,y)){series[Q3c]=true;this[o9C]=true;}
else if(series[H8I]&&b6S[s3z](bar,0)){var py=series[f9U][b6S[O9M](bar,1)];if((b6S[v8z](cy,y)&&b6S[O01](cy,py))||(b6S[K2M](cy,y)&&b6S[(p1C)](cy,py))){series[Q3c]=true;this[(e3D+K8M+E9w+Z6M+x1w+Q5D)]=true;}
}
}
}
}
for(var n in this[z0z]){var o=this[z0z][n];if(b6S[b57](o[W4C],o[Q3c])){this[Y5M]();if(o[Q3c]){this[o9C]=true;this[(b6S.l2M+K8M+l5U+e0U+c7w+S8M+g2I)](o[T5U]);}
break;}
}
for(var n in chart[m2T]){var series=chart[(d0M+i2D+K8M+l5D)][n];if(b6S[M5T](series[W4C],series[Q3c])){this[Y5M]();if(series[Q3c]){this[o9C]=true;this[a0M](series[C47],series[Z91][c7R]);}
break;}
}
if(!this[o9C]){this[n7z]();}
}
;STXChart.prototype.positionSticky=function(m){var p7D="P1H",Z1R="Y1H",b87="S1H",top=Math[z4M](b6S[b87](this[A5M](STXChart[L61]),m[d5C],E9I),b6S.M1j),right=Math[(x1M+K8M+n1M)](b6S[Z1R](this[(o2M+E8M+i1M)][T8R],(this[g4M](STXChart[i61])-y9I)),b6S[p7D](this[(b6S.j3c+i1M)][T8R],m[E9D]));m.style.top=top+K3D;m[W4w][H3R]=right+K3D;}
;STXChart.prototype.displaySticky=function(message,backgroundColor,forceShow){var k6z="positionSticky",I6z="W1H",A0I="Dev",z6D="c1H",m=this[(U8c+n1M+b6S.K7M+H5U+d0M)][H4D];if(!m)return ;var mi=m[z8C][b6S.M1j];if(!mi)return ;var overlayTrashCan=m[z8C][b6S.p1j],mouseDeleteInstructions=m[z8C][b6S.G1j];if(!forceShow&&(b6S[(J2I+j2c)](message,F4U)||b6S[z6D](message,B7M))){mi[Z9c]=B7M;m[W4w][C47]=s2c;if(STX[B0z]&&overlayTrashCan){overlayTrashCan[W4w][(q5c+c2M+L57+g2I)]=s2c;}
else if(!STX[(b6S.K7M+c1M+X7M+o2M+E8M+A0I+K8M+Y3c)]&&mouseDeleteInstructions){mouseDeleteInstructions[W4w][C47]=s2c;}
}
else{if(b6S[(b6S.K7M+I91+v9M)](message,F4U))message=B7M;if(forceShow&&b6S[I6z](message,B7M)){mi[W4w][t57]=B7M;mi[W4w][(o47+S2D)]=B7M;mi[W4w][C47]=s2c;}
else if(backgroundColor){mi[W4w][t57]=backgroundColor;mi[W4w][c7R]=STX[U67](backgroundColor);mi[W4w][C47]=X87;}
else{mi[W4w][t57]=B7M;mi[W4w][c7R]=B7M;mi[W4w][C47]=X87;}
mi[Z9c]=message;m[W4w][C47]=X87;this[k6z](m);if(STX[B0z]&&overlayTrashCan){overlayTrashCan[W4w][C47]=X87;mouseDeleteInstructions[W4w][C47]=s2c;}
else if(!STX[B0z]&&mouseDeleteInstructions){mouseDeleteInstructions[W4w][C47]=j0c;}
}
}
;STXChart.prototype.setMeasure=function(price1,price2,tick1,tick2,hover){var f9I="nSti",p0D="lock",Q6C="dis",M5R="chil",k2M="evi",B6C="hD",H9T="measureLit",x1R="n8H",F9I="S8H",L2T="a1H",U7R="p1H",m6M="G1H",L31="Q1H",I9C="F1H",b8M="x1H",K1U="i1H",s1R="cla",G5M="measureUnlit",U01="sName",u0w="J1H",u4T="mMeasure";if(this[W0M](n7z,arguments))return ;var m=$$(u4T);if(!price1){if(m&&b6S[u0w](m[(o2M+E1M+b6S.a9M+d0M+U01)],G5M))m[(s1R+e9M+n6j+b6S.a9M+c77)]=G5M;}
else{var distance=b6S[K1U](Math[y1c](Math[v8M](price1-price2)*this[X1c][Y11]),this[X1c][Y11]),message=B7M;if(this[T3D]){message+=this[T3D][C9C][C3c](distance);}
else{message+=distance;}
var pct=b6S[(N4M+j2c)]((price2-price1),price1);if(b6S[b8M](Math[v8M](pct),T8M)){pct=Math[y1c](b6S[I9C](pct,O9w));}
else if(b6S[L31](Math[v8M](pct),t4w)){pct=b6S[m6M](Math[y1c](pct*i8U),L3M);}
else{pct=b6S[U7R](Math[y1c](pct*R27),O9w);}
if(this[T3D]){pct=this[T3D][N71][C3c](b6S[(q6M+j2c)](pct,O9w));}
else{pct=pct+y21;}
message+=r31+pct+c51;var ticks=Math[(b6S.a9M+F9M+d0M)](b6S[L2T](tick2,tick1));if(b6S[F9I](this[k5I][k9w],d2T))ticks/=this[k5I][W27];ticks=Math[y1c](ticks)+b6S.p1j;var barsStr=H5R;if(this[h67])barsStr=this[h67](barsStr);message+=B1I+ticks+B1I+barsStr;if(m){if(b6S[x1R](m[v7c],H9T))m[v7c]=H9T;m[Z9c]=message;}
}
if(this[T5D])return ;m=this[b9M][H4D];if(hover){m[W4w][C47]=X87;m[z8C][b6S.M1j][W4w][C47]=X87;if(price1){m[z8C][b6S.M1j][Z9c]=message;if(STX[(b6S.K7M+Z5D+o2M+B6C+k2M+Y3c)]){m[(M5R+b6S.l2M+V0M+b6S.I2M+n1M)][b6S.p1j][W4w][(Q6C+x0M+e77)]=(E0T+E1M+K8M+n1M+b6S.I2M+i3I+F9M+p0D);if(m[z8C][b6S.G1j])m[z8C][b6S.G1j][W4w][(b6S.l2M+K8M+c2M+E1M+b6S.a9M+g2I)]=s2c;}
else{m[z8C][b6S.p1j][W4w][C47]=(n1M+c1M+J1C);if(m[z8C][b6S.G1j])m[z8C][b6S.G1j][W4w][C47]=j0c;}
}
this[(x0M+O3U+b6S.K7M+K8M+c1M+f9I+o2M+S8M+g2I)](m);}
else{m[W4w][C47]=s2c;m[z8C][b6S.M1j][Z9c]=B7M;}
if(this[W2T](n7z,arguments))return ;}
;STXChart.prototype.drawTemporaryPanel=function(){var w37="hairY",n1U="Z8H",V5U="H8H",borderEdge=Math[y1c](b6S[V5U](this[X1c].width,3))+.5;STX[n2M](this[X1c][B3c],this);var y=b6S[n1U](STXChart[(o2M+V0M+c1M+e9M+w37)],this.chart.top);this[j5T](0,borderEdge,y,y,this[M3z]("stx_panel_drag"),"segment",this[X1c][B3c][o4z],false,{}
);STXChart.resizingPanel.handle.style.top=(b6S[(E1M+h01+v9M)](y,STXChart[Q9I][O17][d5C]/2))+"px";}
;STXChart.prototype.setTrashCan=function(){var Y2M="E8H",m3D="k8H",V57="ldr",Q71="inlin";if(STX[B0z]){var m=this[b9M][H4D];if(m){m[W4w][C47]=(Q71+b6S.I2M+i3I+F9M+E1M+L11+S8M);m[z8C][b6S.M1j][W4w][C47]=s2c;m[z8C][b6S.p1j][W4w][(b6S.l2M+F2U+L57+g2I)]=X87;if(m[(b6S.j3c+K8M+V57+b6S.I2M+n1M)][b6S.G1j])m[z8C][b6S.G1j][W4w][C47]=s2c;m.style.top=(b6S[m3D](this[A5M](STXChart[L61]),E9I))+K3D;m[W4w][H3R]=b6S[Y2M](this[X1c][T8R],(this[g4M](STXChart[i61])-y9I),K3D);}
}
}
;STXChart.prototype.pixelFromBar=function(bar){var e4z="i8H",L6R="J8H",m6D=3362227,J3M=((84.,0xAC)<(68.9E1,4.60E1)?24:135.6E1<=(6.82E2,0xAD)?'f':0xD3<=(0x242,0x18A)?(107.60E1,2184623):(2.43E2,0x20D)),n9z=689033216,O2U=(12.39E2>=(138,1.012E3)?(6.33E2,1921090352):(0x11E,17.));var q1j=-O2U,n1j=n9z,z1j=b6S.G1j;for(var S1j=b6S.p1j;b6S.d0j.J0j(S1j.toString(),S1j.toString().length,J3M)!==q1j;S1j++){z1j+=b6S.G1j;}
if(b6S.d0j.J0j(z1j.toString(),z1j.toString().length,m6D)!==n1j){this.privateDeletePanel(panel);this.chart.context.restore();context.fillText(txt,farX,y);self.stx.draw();return M6d-e6d;}
var x=Math[(t3U+n1M+b6S.l2M)]((b6S[L6R](bar,this[k5I][h4U]))+b6S[e4z](this[k5I][h4U],b6S.D1j));return x;}
;STXChart.prototype.barFromPixel=function(x){var v3c="U8H";return Math[b3R](b6S[v3c](x,this[k5I][h4U]));}
;STXChart.prototype.tickFromPixel=function(x,chart){var X67="8H",y9R="x8H";if(!chart)chart=this[X1c];var left=b6S[y9R](chart[(k4c+b6S.K7M+b6S.a9M+W9C)].length,chart[s67]),tick=Math[y1c](b6S[(A3j+X67)](((x+(left*this[k5I][h4U]))/this[k5I][h4U]),.499));tick*=this[k5I][W27];return tick;}
;STXChart.prototype.pixelFromTick=function(tick,chart){var U37="Q8H";if(!chart)chart=this[(b6S.j3c+b6S.a9M+V0M+b6S.K7M)];return b6S[(U37)]((tick-chart[g91].length+chart[s67]),this[k5I][h4U])+this[k9c];}
;STXChart.prototype.pixelFromDate=function(date,chart){return this[d57](this[t51](date,chart),chart);}
;STXChart.prototype.priceFromPixel=function(y,panel){var z7M="f8H",h8I="p8H",m97="G8H";if(!panel)panel=this[X1c][(x0M+b6S.a9M+n1M+l7D)];var chart=panel[X1c],yAxis=panel[c3I];y=b6S[m97](yAxis[f97],y);var price=yAxis[S4w]+(b6S[h8I](y,yAxis[X5R]));if(yAxis[Y1U]){var logPrice=yAxis[w4I]+(b6S[z7M](y,yAxis[q4I],yAxis.height));price=Math[C5I](10,logPrice);}
return price;}
;STXChart.prototype.valueFromPixel=function(y,panel){var Q4C="priceFromPixel";if(!panel)panel=this[q0z](y);var p=this[Q4C](y,panel);return p;}
;STXChart.prototype.valueFromPixelUntransform=function(y,panel){var i2U="z6H",Y7z="rmFu",P4M="tra",z2M="eFr",a0I="last",y3R="first",s4I="h8H";if(!panel)panel=this[q0z](y);if(!panel){if(b6S[s4I](y,b6S.M1j)){panel=this[(k6D+n1M+b6S.I2M+i67)][STX[y3R](this[K41])];}
else{panel=this[K41][STX[a0I](this[(K41)])];}
}
var p=this[(x0M+V0M+K8M+o2M+z2M+o6j+Q3U+E1M)](y,panel);if(panel[X1c][(N7I+P4M+T4C+q6M+c1M+Y7z+n1M+o2M)]&&b6S[i2U](panel[T5U],panel[X1c][T5U])){p=panel[X1c][e7M](this,panel[X1c],p);}
return p;}
;STXChart.prototype.pixelFromPriceTransform=function(price,panel){var H2R="Fu",A3R="for",i8w="trans";if(panel[X1c][(i8w+A3R+x1M+H2R+N1C)])price=panel[(b6S.j3c+i1M)][v1j](this,panel[X1c],price);return this[D7C](price,panel);}
;STXChart.prototype.pixelFromPrice=function(price,panel){var u9I="c6H",Y3R="w6H",v0T="P6H",E7D="Y6H";if(!panel)panel=this[X1c][c7D];var yAxis=panel[c3I],y=b6S[E7D]((yAxis[o5w]-price),yAxis[X5R]);if(yAxis[Y1U]){var logPrice=b6S[v0T](Math[H1w](price),Math[e2T]);if(b6S[Y3R](price,0))logPrice=0;var height=yAxis.height;y=b6S[u9I](height,height*(logPrice-yAxis[w4I])/yAxis[q4I]);}
y+=yAxis.top;return y;}
;STXChart.prototype.pixelFromValueAdjusted=function(panel,tick,value){var A7C="J6H",P07="ransf",w0C="lFromP",f3R="W6H",R5C="t6H";if(this[k5I][i8I]||!this[F1w][panel[T5U]])return this[I0c](value,panel);var a=Math[y1c](tick);if(b6S[R5C](a,0)&&b6S[f3R](a,panel[X1c][g91].length)&&(ratio=panel[X1c][g91][a][u9C])){return this[(x0M+Q3U+w0C+V0M+c7w+b6S.I2M+L8j+P07+S2D+x1M)](b6S[A7C](value,ratio),panel);}
return this[I0c](value,panel);}
;STXChart.prototype.adjustIfNecessary=function(panel,tick,value){var e9c="x6H",b81="U6H",K67="i6H";if(this[(E1M+N5D)][i8I])return value;if(!panel||!this[F1w][panel[T5U]])return value;var a=Math[y1c](tick);if(b6S[K67](a,0)&&b6S[b81](a,panel[X1c][g91].length)&&(ratio=panel[X1c][(k4c+f4M+E8j+z5D)][a][u9C])){return b6S[e9c](value,ratio);}
return value;}
;STXChart.prototype.setTransform=function(chart,transformFunction,untransformFunction){chart[v1j]=transformFunction;chart[e7M]=untransformFunction;}
;STXChart.prototype.unsetTransform=function(chart){var H0c="F6H";delete  chart[v1j];delete  chart[e7M];for(var i=0;b6S[H0c](i,chart[g91].length);i++){chart[g91][i].transform=null;}
}
;STXChart.prototype.undo=function(){var b7w="r_drawin",r1D="sNa",h1D="apCla";if(this[W0M](w3I,arguments))return ;if(this[T5D]){this[T5D].abort();this[T5D]=F4U;STX[n2M](this[X1c][B3c],this);this[Y5M]();STX[(d0M+J2I+h1D+d0M+r1D+c77)](this[b9M][o7z],M0c,P2z);STX[y5c](this[b9M][f4z],M0c,(U8w+K0c+F9D+W3j+F4M+b7w+Z6M));STXChart[e11]=u27;}
if(this[(V0M+N7I+b6S.V71+k5c+j9D+b6S.l2M)](w3I,arguments))return ;}
;STXChart.prototype.undoStamp=function(){this[J9I][I57](STX[r3D](this[k2c]));}
;STXChart.prototype.undoLast=function(){if(this[T5D]){this[w3I]();}
else{if(this[J9I].length){this[k2c]=this[J9I][w5I]();this[Y5M]();}
}
}
;STXChart.prototype.addDrawing=function(drawing){this[q91]();this[k2c][I57](drawing);}
;STXChart.prototype.plotLine=function(x0,x1,y0,y1,color,type,context,confineToPanel,parameters){var J1R="i2t",O8z="J2t",g1C="W2t",F1R="t2t",y2U="c2t",f7C="w2t",p47="P2t",E17="Y2t",j3j="h9t",z5c="M9t",z5z="A9t",J5U="K9t",j2C="r9t",Z9M="B9t",F7w="y9t",S2c="m9t",a6j="I9t",l1z="v9t",c9I="s9t",l5z="j9t",x9T="b9t",x2I="g9t",h3M="V9t",K2D="q9t",Z21="N3H",R6c="C3H",Z1z="e3H",v8w="X3H",y0U="D3H",X41="u3H",y2z="L3H",z5I="O3H",v1c="T3H",P4T="o3H",Z9D="E3H",m9M="k3H",h5z="l3H",L0C="Z3H",y8I="H3H",M6z="n3H",z31="S3H",q3C="a6H",m6I="f6H",C8R="sHeig",B9w="p6H",y4c="G6H",L7R="Q6H";if(!parameters)parameters={}
;if(b6S[L7R](parameters[A4c],"none"))return ;if(b6S[y4c](confineToPanel,true))confineToPanel=this[X1c][c7D];if(b6S[B9w](context,null)||typeof (context)=="undefined")context=this[X1c][o4z];if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1)){return ;}
var edgeTop=0,edgeBottom=this[X1c][(N3c+n1M+O6I+C8R+x1w)],edgeLeft=0,edgeRight=this[X1c].width;if(confineToPanel){edgeBottom=confineToPanel[c3I][f97];edgeTop=confineToPanel.yAxis.top;}
if(b6S[m6I](type,"ray")){var bigX=10000000;if(b6S[q3C](x1,x0))bigX=-10000000;var v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
,bigY=STX[C2D](v,bigX);x1=bigX;y1=bigY;}
if(b6S[z31](type,"line")||b6S[M6z](type,"horizontal")||b6S[y8I](type,"vertical")){var bigX=10000000,littleX=-10000000,v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
,bigY=STX[C2D](v,bigX),littleY=STX[C2D](v,littleX);x0=littleX;x1=bigX;y0=littleY;y1=bigY;}
var t0=0.0,t1=1.0,xdelta=b6S[L0C](x1,x0),ydelta=b6S[h5z](y1,y0),p,q,r;for(var edge=0;b6S[m9M](edge,4);edge++){if(b6S[Z9D](edge,0)){p=-xdelta;q=-(b6S[(b6S.l2M+N3I+v9M)](edgeLeft,x0));}
if(b6S[P4T](edge,1)){p=xdelta;q=(b6S[v1c](edgeRight,x0));}
if(b6S[z5I](edge,2)){p=-ydelta;q=-(b6S[y2z](edgeTop,y0));}
if(b6S[X41](edge,3)){p=ydelta;q=(b6S[y0U](edgeBottom,y0));}
r=b6S[v8w](q,p);if(b6S[Z1z](y1,null)&&b6S[R6c](p,0)&&b6S[Z21](q,0)){return false;}
if(b6S[K2D](p,0)){if(b6S[h3M](r,t1))return false;else if(b6S[x2I](r,t0))t0=r;}
else if(b6S[x9T](p,0)){if(b6S[l5z](r,t0))return false;else if(b6S[c9I](r,t1))t1=r;}
}
var x0clip=x0+b6S[l1z](t0,xdelta),y0clip=y0+b6S[a6j](t0,ydelta),x1clip=x0+b6S[S2c](t1,xdelta),y1clip=y0+b6S[F7w](t1,ydelta);if(b6S[Z9M](y1,null)&&b6S[j2C](y0,null)){y0clip=edgeTop;y1clip=edgeBottom;x0clip=v[e21];x1clip=v[e21];if(b6S[J5U](v[e21],edgeRight))return false;if(b6S[z5z](v[e21],edgeLeft))return false;}
else if(b6S[z5c](y1,null)){if(b6S[(X1j+K01+b6S.K7M)](v[v9w],v[L9w]))y1clip=edgeBottom;else y1clip=edgeTop;x0clip=v[(e21)];x1clip=v[e21];if(b6S[j3j](v[e21],edgeRight))return false;if(b6S[(q2I+G3I+b6S.K7M)](v[e21],edgeLeft))return false;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color[c7R];if(color[H6I])context.globalAlpha=color[H6I];else context.globalAlpha=1;context.lineWidth=parseInt(STX[m2M](color.width));}
else{if(b6S[E17](color,null)||b6S[p47](color,"auto")||STX[s7c](color)){context.strokeStyle=this[B3I];}
else{context.strokeStyle=color;}
}
if(parameters[H6I])context.globalAlpha=parameters[H6I];if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;if(b6S[f7C](type,"zig zag"))context.lineWidth=5;var pattern=null;if(parameters[A4c]){pattern=parameters[A4c];if(b6S[y2U](pattern,"solid")){pattern=null;}
else if(b6S[F1R](pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(b6S[g1C](pattern,"dashed")){pattern=[b6S[O8z](context.lineWidth,5),b6S[J1R](context.lineWidth,5)];}
}
context[r6M](x0clip,y0clip,x1clip,y1clip,context.strokeStyle,context.globalAlpha,context.lineWidth,pattern);context.globalAlpha=1;}
;STXChart.prototype.connectTheDots=function(points,color,type,context,confineToPanel,parameters){var Y8c="dashedLineTo",f6I="B4t",c81="y4t",v67="m4t",R7C="I4t",g1R="4t",q7T="s4t",p4U="j4t",d3j="b4t",d31="g4t",W1D="V4t",Y8w="N5t",i4C="C5t",O4w="e5t",E97="X5t",b7D="D5t",k4w="u5t",u71="L5t",r8M="O5t",v1C="T5t",o5I="o5t",b2I="d5t",k0M="E5t",d5U="k5t",e7U="l5t",B7R="Z5t",K9I="H5t",A67="n5t",p2U="S5t",H6w="a2t",b5U="f2t",d1z="opa",N4z="spar",W97="ran",n7w="p2t",s01="G2t",r5U="2t",H3U="F2t",c4U="x2t",e8I="U2t";if(!parameters)parameters={}
;if(b6S[e8I](parameters[A4c],"none"))return ;if(b6S[c4U](confineToPanel,true))confineToPanel=this[X1c][c7D];if(b6S[H3U](context,null)||typeof (context)=="undefined")context=this[X1c][o4z];if(b6S[(o1j+r5U)](points.length,4))return ;var edgeTop=0,edgeBottom=this[X1c][i1w],edgeLeft=0,edgeRight=this[X1c].width;if(confineToPanel){edgeBottom=confineToPanel[c3I][(F7U+b6S.K7M+U8M+x1M)];edgeTop=confineToPanel.yAxis.top;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color[c7R];if(color[(c1M+x0M+b6S.a9M+b8U)])context.globalAlpha=color[H6I];else context.globalAlpha=1;context.lineWidth=parseInt(STX[m2M](color.width));}
else{if(b6S[s01](color,null)||b6S[n7w](color,"auto")||STX[(S7T+L8j+W97+N4z+b6S.I2M+n1M+b6S.K7M)](color)){context.strokeStyle=this[B3I];}
else{context.strokeStyle=color;}
}
if(parameters[(d1z+b8U)])context.globalAlpha=parameters[H6I];if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters[(x0M+n3I+i2D+n1M)]){pattern=parameters[A4c];if(b6S[b5U](pattern,"solid")){pattern=null;}
else if(b6S[H6w](pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(b6S[p2U](pattern,"dashed")){pattern=[b6S[A67](context.lineWidth,5),b6S[K9I](context.lineWidth,5)];}
}
context.beginPath();for(var i=0;b6S[B7R](i,points.length-2);i+=2){var x0=points[i],y0=points[i+1],x1=points[i+2],y1=points[i+3];if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1))return ;var t0=0.0,t1=1.0,xdelta=b6S[e7U](x1,x0),ydelta=b6S[d5U](y1,y0),p,q,r;for(var edge=0;b6S[k0M](edge,4);edge++){if(b6S[b2I](edge,0)){p=-xdelta;q=-(b6S[o5I](edgeLeft,x0));}
if(b6S[v1C](edge,1)){p=xdelta;q=(b6S[r8M](edgeRight,x0));}
if(b6S[u71](edge,2)){p=-ydelta;q=-(b6S[k4w](edgeTop,y0));}
if(b6S[b7D](edge,3)){p=ydelta;q=(b6S[E97](edgeBottom,y0));}
r=b6S[O4w](q,p);if(b6S[(i4C)](y1,null)&&b6S[Y8w](p,0)&&b6S[(N9D+b6S.K7M)](q,0)){return false;}
if(b6S[W1D](p,0)){if(b6S[d31](r,t1))return false;else if(b6S[d3j](r,t0))t0=r;}
else if(b6S[p4U](p,0)){if(b6S[q7T](r,t0))return false;else if(b6S[(r2I+g1R)](r,t1))t1=r;}
}
var x0clip=x0+b6S[R7C](t0,xdelta),y0clip=y0+b6S[(v67)](t0,ydelta),x1clip=x0+b6S[c81](t1,xdelta),y1clip=y0+b6S[f6I](t1,ydelta);try{if(pattern){context[Y8c](x0clip,y0clip,x1clip,y1clip,pattern);}
else{context.moveTo(x0clip,y0clip);context.lineTo(x1clip,y1clip);}
}
catch(e){}
}
context.stroke();context.closePath();context.globalAlpha=1;}
;STXChart.prototype.plotSpline=function(points,tension,color,type,context,confineToPanel,parameters){var s5T="w7t",G6z="P7t",z6M="Y7t",D5w="h4t",Y51="R4t",z0w="M4t",i01="A4t",W41="K4t",K0w="r4t";if(!parameters)parameters={}
;if(b6S[K0w](parameters[A4c],"none"))return ;if(b6S[W41](confineToPanel,true))confineToPanel=this[X1c][c7D];if(b6S[i01](context,null)||typeof (context)=="undefined")context=this[X1c][o4z];context.save();context.lineWidth=1.1;if(typeof (color)==(c1M+g1U+O4U)){context.strokeStyle=color[c7R];if(color[H6I])context.globalAlpha=color[H6I];else context.globalAlpha=1;context.lineWidth=parseInt(STX[m2M](color.width));}
else{if(b6S[z0w](color,null)||b6S[Y51](color,"auto")||STX[s7c](color)){context.strokeStyle=this[B3I];}
else{context.strokeStyle=color;}
}
if(parameters[H6I])context.globalAlpha=parameters[H6I];if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters[A4c]){pattern=parameters[A4c];if(b6S[D5w](pattern,"solid")){pattern=null;}
else if(b6S[(q2I+m71+b6S.K7M)](pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(b6S[z6M](pattern,"dashed")){pattern=[b6S[G6z](context.lineWidth,5),b6S[s5T](context.lineWidth,5)];}
}
if(pattern&&context[j8w]){context[j8w](pattern);context[r01]=0;}
plotSpline(points,tension,context);context.restore();}
;STXChart.prototype.drawingClick=function(panel,x,y){var U1c="drawing",H97="ngeOc",T0c="click",r6w="ence",T4D="prefe",M2I="c7t",E1c="dragT",Q3M="veDraw",s5R="construct",s7z="ool",n5z="gT",f1z="reg",o7U="torP",f21="currentV";if(!this[T5D]){if(!panel)return ;var Factory=STXChart[T6I][this[d3I][W2w]];if(!Factory){if(STX[f57][this[(f21+b6S.I2M+o2M+o7U+K7D+z5D+b6S.I2M+V0M+d0M)][W2w]]){Factory=STX[f57][this[d3I][W2w]];STXChart[(f1z+K8M+j4T+V0M+F3j+V0M+e91+n5z+s7z)](this[d3I][W2w],Factory);}
}
if(Factory){this[T5D]=new Factory;this[T5D][s5R](this,panel);if(!this[F1w][panel[T5U]]){if(this[T5D][Z5U]){this[(b6S.a9M+L1c+K8M+Q3M+E0T+Z6M)]=F4U;return ;}
}
}
}
if(this[T5D]){if(this[L3R]&&!this[T5D][(E1c+c1M+F3j+v2R)]){if(!STXChart[e11])this[T5D]=F4U;return ;}
var tick=b6S[M2I](this[A7M](x,panel[(o2M+E8M+i1M)]),this[k5I][W27]),panel=this[(x0M+t4c+d0M)][this[T5D][T6z]],value=this[g6j](panel,tick,this[e6c](y,panel));if(this[(T4D+V0M+r6w+d0M)][R2c]&&this[j01]){value=this[g6j](panel,tick,this[j01]);}
if(this[T5D][T0c](this[X1c][B3c][o4z],tick,value)){if(this[T5D]){STXChart[e11]=u27;STX[n2M](this[X1c][B3c],this);this[e2M](this[T5D]);this[T5D]=F4U;this[M7D]();this[Y5M]();this[(o2M+V8z+H97+A7c+v8U+b6S.I2M+b6S.l2M)](S7w);STX[y5c](this[(T9C+b6S.K7M+b6U+i67)][o7z],M0c,P2z);STX[y5c](this[b9M][f4z],M0c,P2z);}
}
else{this[H2M](U1c);STXChart[e11]=w2T;STX[y5c](this[b9M][o7z],P2z,M0c);STX[y5c](this[b9M][f4z],P2z,M0c);}
return w2T;}
return u27;}
;STXChart.prototype.whichPanel=function(y){var j7U="W7t",T2w="t7t";for(var p in this[K41]){var panel=this[K41][p];if(panel[K2R])continue;if(b6S[T2w](y,panel.top)&&b6S[j7U](y,panel[f97]))return panel;}
return F4U;}
;STXChart.prototype.mouseup=function(e){var P5C="S0t",x9M="f7t",f27="cli",z6R="G7t",r67="Q7t",y81="F7t",f0C="x7t",C9M="ccu",x0c="U7t",F8z="7t",U57="J7t";if(this[f8M]){if(b6S[U57](this[d3I][W2w],B7M)||b6S[(K8M+F8z)](this[d3I][(r8I+D6w+n8D+x0M+b6S.I2M)],F4U)||(b6S[x0c](Date[U6R]()-this[V5D],N01))){this[(o2M+E8M+b6S.a9M+n1M+Z6M+b6S.I2M+b6j+C9M+V0M+N4U+b6S.l2M)](S7w);STX[n2M](this[(b6S.j3c+K8j+b6S.K7M)][B3c],this);this[f8M]=F4U;this[M7D]();this[Y5M]();return ;}
else{this[f8M]=u27;}
}
var wasMouseDown=this[L3R];this[L3R]=u27;if(!this[k2T])return ;this[r61]=u27;if(b6S[f0C](this[W6z],B7M))return ;if(this[A5T]){STX[V7c](document[l4U],Z5M);this[A5T]=u27;return ;}
if(STXChart[r2z])STX[V7c](document[l4U],Z5M);if(b6S[y81](STXChart[Q9I],F4U)){STX[n2M](this[X1c][B3c],this);this[O5R]();STXChart[Q9I]=F4U;return ;}
if(!e)e=event;if((e[p8I]&&b6S[r67](e[p8I],b6S.G1j))||(e[n4R]&&b6S[z6R](e[n4R],b6S.G1j))){if(this[o9C]){this[s4U]();if(e[k61])e[k61]();return u27;}
else{return w2T;}
}
if(!e[E1R]){e[E1R]=e[(f27+b6S.I2M+F4C+b7M)]+document[l4U][x7C]+document[Z1D][x7C];e[H8R]=e[J5w]+document[l4U][(f0R+c1M+i6R+L8j+c1M+x0M)]+document[Z1D][B1w];}
if(b6S[(x0M+m71+b6S.K7M)](e[E1R],this[X1c][q3M])||b6S[x9M](e[E1R],this[X1c][H3R]))return ;if(b6S[(b6S.a9M+m71+b6S.K7M)](e[H8R],this.chart.top)||b6S[P5C](e[H8R],this[X1c][f97]))return ;if(this[W0M](T9c,arguments))return ;if(wasMouseDown){var cy=this[A5M](e[H8R]),cx=this[g4M](e[E1R]);this[M2D](this[Q4R],cx,cy);}
if(this[(V0M+j8R+k5c+b6S.I2M+n1M+b6S.l2M)](T9c,arguments))return ;}
;STXChart.prototype.grabbingHand=function(){if(!this[r61])return ;if(STX[B0z])return ;STX[y6c](document[l4U],Z5M);}
;STXChart.prototype.mousedown=function(e){var C0U="ageY",v8D="lTop",T6w="d0t",I5C="E0t",I1D="0t",j0z="l0t",q4U="bu",y1z="Z0t",c3z="H0t",N6j="Mous",b7T="geTouch",T9T="n0t",I5w="nPr";if(this[(X8U+I5w+b6S.I2M+x0M+b6S.I2M+n1M+b6S.l2M)]("mousedown",arguments))return ;this[A5T]=false;if(b6S[T9T](this[W6z],""))return ;if(!this[k2T])return ;if(!this[T2R])return ;if(!STXChart[r2z])return ;if(this[(x1M+b6S.a9M+d8C+b7T+t81+b6S.l2M+N6j+b6S.I2M)]&&e&&e[k61])e[k61]();this[V5D]=Date[U6R]();this[L3R]=true;if(!e)e=event;if((e[p8I]&&b6S[c3z](e[p8I],2))||(e[n4R]&&b6S[y1z](e[(q4U+w3M+S7D)],2))){return ;}
for(var p in this[K41]){var panel=this[K41][p];if(panel[K4z]){STXChart[Q9I]=panel;return ;}
}
if(!e[(x0M+E4M+b6S.I2M+b7M)]){e[E1R]=e[S6w]+document[l4U][x7C]+document[Z1D][x7C];e[H8R]=e[J5w]+document[l4U][B1w]+document[Z1D][B1w];}
if(b6S[j0z](e[E1R],this[X1c][q3M])&&b6S[(S8M+I1D)](e[E1R],this[X1c][H3R])&&b6S[I5C](e[(x0M+b9z+t4M)],this.chart.top)&&b6S[T6w](e[H8R],this[X1c][f97])){if(this[f8M])return ;for(var i=0;b6S[(c1M+l91+b6S.K7M)](i,this[k2c].length);i++){var drawing=this[k2c][i];if(drawing[K4z]){if(this[x77]){var Factory=STXChart[T6I][drawing[T5U]],clonedDrawing=new Factory;clonedDrawing[X6c](this,drawing[R3U]());this[(b6S.l2M+V0M+b6S.a9M+q5R+b6j+g1U+b6S.I2M+o2M+b6S.K7M+d0M)][I57](clonedDrawing);this[f8M]=clonedDrawing;clonedDrawing[x51]=drawing[x51];return ;}
this[f8M]=drawing;return ;}
}
this[M2D](this[Q4R],this[d0c],this[O4c]);if(this[T5D]&&this[T5D][G7c])return ;}
this[r61]=true;this[u7w]=false;if(!e)e=event;if(!e[E1R]){e[E1R]=e[(o2M+o8R+b6S.I2M+n1M+p2M)]+document[l4U][x7C]+document[Z1D][x7C];e[H8R]=e[J5w]+document[l4U][B1w]+document[Z1D][(y1j+V0M+o7D+v8D)];}
var chart=this[(o2M+X7M+v8U+b6S.I2M+F4C+n3M+n1M+b6S.I2M+E1M)][X1c];this[a5M]=e[E1R];this[Z4M]=e[(x0M+C0U)];this[M87]=chart[s67];this[O87]=chart[c7D][(z8z+s2I+S7T)][s67];this[C9D]=this[k5I][h4U];this[O7w]=this[Q4R][c3I][E0w];setTimeout((function(self){return function(){self[(Z6M+V6R+E1U+X5C+v9M+b6S.a9M+n1M+b6S.l2M)]();}
;}
)(this),100);if(this[W2T]("mousedown",arguments))return ;}
;STXChart.prototype.changeVectorType=function(value){var C6z="rCol";this[d3I][W2w]=value;if(STXChart[(P9c+J2I+E0T+Z6M+q9w+n1M+b6S.I2M)])this[w3I]();this[(d7R+V0M+c1M+e9M+V8z+K8M+C6z+S2D+d0M)]();if(STXChart[r2z])this[X81]();}
;STXChart.prototype.rightClickOverlay=function(name){var V6c="unAp",B9c="verlay",v47="ghtC";if(this[W0M]((V0M+K8M+v47+E1M+K8M+o2M+S8M+b6j+B9c),arguments))return ;var sd=this[z0z][name];if(sd[w1I]){sd[w1I]();}
else{this[R4M](name);}
this[(V0M+V6c+O0D+D1C)](A7z,arguments);}
;STXChart.prototype.removeOverlay=function(name){var Z0C="deleteRHS",i8D="lays",w3R="studi",q47="iel";if(this[W0M](R4M,arguments))return ;for(var o in this[z0z]){var sd=this[z0z][o];if(sd[(K8M+k7w+M6M)][L8z]&&sd[b1I][(A3j+q47+b6S.l2M)][m8z](name)!=-b6S.p1j){this[R4M](sd[T5U]);}
}
var study=this[k5I][(w3R+l5D)][name];delete  this[k5I][j7C][name];delete  this[(c1M+r2I+b6S.I2M+V0M+i8D)][name];STX[Z0C](STX[a4w][J6w],study);this[a0M]();this[A01]();this[H2M](k5I);this[W2T](R4M,arguments);}
;STXChart.prototype.addSeries=function(field,parameters){var Y7D="O0t",a8U="T0t";if(this[W0M]("addSeries",arguments))return ;if(!parameters)parameters={}
;if(!parameters[C3I])parameters[C3I]=this[X1c][T5U];var obj={parameters:STX[x9c](parameters),yValueCache:new Array(),display:field,isStep:(parameters[c8c]&&b6S[a8U](parameters[c8c],"step"))}
;if(b6S[Y7D]("display",obj[Z91]))obj[C47]=obj[Z91][C47];var chart=this[(o2M+E8M+b6S.a9M+V0M+b6S.K7M+d0M)][parameters[C3I]];function addSeriesData(stx){var f9z="X0t",X8M="D0t",J4I="u0t",y7C="L0t",mIterator=0,cIterator=0;while(parameters.data&&b6S[y7C](mIterator,stx[B6w].length)&&b6S[J4I](cIterator,parameters.data.length)){var c=parameters.data[cIterator],m=stx[B6w][mIterator];if(!c[q4c]||typeof c[q4c]=="undefined")c[q4c]=STX[a5c](c[W31]);if(b6S[X8M](c[q4c][Y7w](),m[q4c][Y7w]())){m[field]=c[(Y6C+E1M+V4I)];cIterator++;mIterator++;continue;}
if(b6S[f9z](c[q4c],m[q4c]))cIterator++;else mIterator++;}
}
if(parameters.data&&this[B6w]){addSeriesData(this);}
else{obj[A4w]=addSeriesData;}
if(chart)chart[m2T][field]=obj;this[W2T]("addSeries",arguments);return obj;}
;STXChart.prototype.removeSeries=function(field,chart){var x5z="q1t",O2I="N0t",F31="C0t",s8C="e0t",E1D="setComparison";if(this[W0M]("removeSeries",arguments))return ;if(!chart)chart=this[X1c];delete  chart[m2T][field];var compare=false;for(var s in chart[m2T]){if(chart[m2T][s][Z91][l0I]){compare=true;break;}
}
this[E1D](this,chart,compare);for(var panel in this[K41]){if(b6S[s8C](this[K41][panel][T5U][m8z](STX[J3I][E6C]),0)){var compareArray=this[k5I][(d0M+b6S.K7M+X7M+q5c+l5D)][this[K41][panel][(d8C+c77)]][b1I]["Compare To"];for(var i=0;b6S[F31](i,compareArray.length);i++){if(b6S[O2I](compareArray[i],field))compareArray[F57](i,1);}
delete  this[k5I][j7C][this[K41][panel][T5U]][n8M]["Result "+field];delete  this[k5I][j7C][this[(k6D+n1M+b6S.I2M+i67)][panel][(n1M+e1j+b6S.I2M)]][p01]["Result "+field+" "+this[K41][panel][T5U]];if(b6S[x5z](compareArray.length,0))this[F3R](this[K41][panel]);}
}
this[W2T]("removeSeries",arguments);}
;STXChart.prototype.drawLegendItem=function(xy,label,color){var x=xy[b6S.M1j],y=xy[b6S.p1j],w=L3M,h=L3M,context=this[X1c][o4z];context.fillStyle=color;context.fillRect(x,y,w,h);x+=w+b6S.G1j;context.fillStyle=this[B3I];context.fillText(label,x,y);x+=context.measureText(label).width+6;return [x,y];}
;STXChart.prototype.drawLegend=function(chart,legendColorMap){var N8z="drawLegendItem",G6R="I1t",A0c="v1t",V4R="s1t",u3D="j1t",b91="b1t",a0R="g1t",Q9T="V1t";if(this[W0M]((F3D+b6S.a9M+J2I+M9w+Z6M+x6R),arguments))return ;var context=this[X1c][o4z];context.textBaseline="top";var xy=[chart[Z2w][s2I],chart[Z2w][g2I]],lineColor=this[B3I];if(b6S[Q9T](this[X1c][W6R],Array)){var colors=this[X1c][W6R];if(b6S[a0R](colors.length,1)){var grd=context.createLinearGradient(xy[0],xy[1],xy[0]+10,xy[1]);for(var c=0;b6S[b91](c,colors.length);c++){grd.addColorStop(b6S[u3D](c,(colors.length-1)),colors[c]);}
lineColor=grd;}
else if(b6S[V4R](colors.length,0))lineColor=colors[0];}
else if(b6S[A0c](this[k5I][L8w],"mountain")){var c=this[M3z]("stx_mountain_chart"),strokeStyle=c["borderTopColor"];if(strokeStyle&&b6S[G6R](strokeStyle,"transparent"))lineColor=strokeStyle;}
else{lineColor=this[X3j]("stx_line_chart");}
xy=this[N8z](xy,chart[F3I],lineColor);for(var field in legendColorMap){var display=field;if(legendColorMap[field]["display"])display=legendColorMap[field]["display"];xy=this[N8z](xy,display,legendColorMap[field]["color"]);}
this[W2T]("drawLegend",arguments);}
;STXChart.prototype.drawSeries=function(chart){var f91="wS",D1I="awLeg",x2C="sLabel",M11="k6t",F9T="rtTyp",J8j="l6t",B2U="Z6t",Q8c="H6t",V67="n6",a2C="a8t",K3M="f8t",h9z="8t",a7R="G8t",S9w="Q8t",A91="F8t",a67="x8t",U97="U8t",j3w="i8t",o1c="J8t",a0U="W8t",O8w="t8t",K77="c8t",W0w="w8t",f2z="P8t",P9M="Y8t",V41="z8t",v3R="h1t",g31="R1t",n2C="M1t",R2M="A1t",c3w="marginBottom",M7w="marginTop",s4M="K1t",b4I="r1t",I0U="B1t",s1D="minMax",f3M="y1t",M27="m1t",Y1D="maximum",X3w="minimum";if(this[W0M]("drawSeries",arguments))return ;var quotes=chart[U3U],legendColorMap={}
;for(var field in chart[m2T]){var series=chart[m2T][field],parameters=series[Z91],panel=chart[c7D];if(parameters[c7D])panel=this[K41][parameters[c7D]];if(!panel)continue;var yAxis=panel[c3I],bottom=panel[f97],minMax=[parameters[X3w],parameters[Y1D]];if((!parameters[X3w]&&b6S[M27](parameters[X3w],0))||(!parameters[Y1D]&&b6S[f3M](parameters[Y1D],0))){var minMaxCalc=STX[s1D](quotes,field);if(!parameters[X3w]&&b6S[I0U](parameters[X3w],0))minMax[0]=minMaxCalc[0];if(!parameters[Y1D]&&b6S[b4I](parameters[Y1D],0))minMax[1]=minMaxCalc[1];}
var min=minMax[0],top=yAxis.top,bottom=yAxis[f97],height=b6S[s4M](bottom,top),t=parameters[M7w],b=parameters[c3w];if(t)top=b6S[(R2M)](t,1)?(top+t):(top+(b6S[n2C](height,t)));if(b)bottom=b6S[g31](b,1)?(b6S[v3R](bottom,b)):(b6S[V41](bottom,(height*b)));var multiplier=b6S[P9M]((bottom-top),(minMax[1]-min)),started=false,lastPoint=null,val=x=y=px=py=null,cw=this[k5I][h4U],offset=this[k9c],context=this[X1c][o4z],isStep=series[H8I];context.beginPath();if(b6S[f2z](series[f9U].length,quotes.length))series[f9U]=new Array(quotes.length);var yValueCache=series[f9U],reset=false,lastVal=null,firstX=null,firstY=null;for(var i=0;b6S[W0w](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(quote.transform&&series[Z91][(W3j+K8j+E6D+b6S.V71+n0z+d0M)])quote=quote.transform;val=quote[field];if(!val&&b6S[K77](val,0)){if(isStep){yValueCache[i]=y;}
continue;}
lastVal=val;if(!isStep&&lastPoint&&b6S[O8w](lastPoint,i-1)){px=x,py=y;}
else{px=null;}
x=Math[b3R](b6S[a0U](i,cw))+offset;if(this[P2C]&&b6S[o1c](i,quotes.length-1)){x+=this[k9c];}
if(b6S[j3w](firstX,null))firstX=x;if(isStep&&started){context.lineTo(x,y);}
if(series[(x0M+b6S.a9M+V0M+b6S.a9M+c77+b6S.K7M+i2D+d0M)][B6U]){y=this[D7C](val,panel);}
else{y=b6S[U97](bottom,((val-min)*multiplier));}
if(b6S[a67](firstY,null))firstY=y;if(b6S[A91](px,null)){var vector={x0:px,x1:x,y0:py,y1:y}
;for(;b6S[S9w](lastPoint,i);lastPoint++){var xInt=Math[b3R](b6S[a7R](lastPoint,cw))+offset,yInt=STX[C2D](vector,xInt);yValueCache[lastPoint]=yInt;}
}
yValueCache[i]=y;if(b6S[(x0M+h9z)](y,top)){y=top;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else if(b6S[K3M](y,bottom)){y=bottom;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else{reset=false;}
if(!started){started=true;var leftTick=b6S[a2C](chart[g91].length,chart[s67]);if(b6S[(E8j+F71+b6S.K7M)](leftTick,0)){context.moveTo(x,y);}
else{var baseline=chart[g91][b6S[(V67+b6S.K7M)](leftTick,1)];if(baseline.transform&&series[Z91][B6U])baseline=baseline.transform;var y0=baseline[field];if(series[Z91][B6U]){y0=this[D7C](y0,panel);}
else{y0=b6S[Q8c](bottom,((y0-min)*multiplier));}
y0=Math[B9R](Math[z4M](y0,top),bottom);context.moveTo(0,y0);context.lineTo(x,y);}
}
else{context.lineTo(x,y);}
lastPoint=i;}
context.lineWidth=1;if(parameters.width)context.lineWidth=parameters.width;if(series[(o5w+E1M+K8M+b3C+b6S.K7M)])context.lineWidth=b6S[B2U](context.lineWidth,2);context.strokeStyle=this[B3I];if(parameters[c7R])context.strokeStyle=parameters[c7R];context.stroke();if(b6S[J8j](series[Z91][(V61+F9T+b6S.I2M)],"mountain")){context.lineTo(x,bottom);context.lineTo(firstX,bottom);if(b6S[M11](firstY,bottom))firstY=bottom;context.lineTo(firstX,firstY);if(series[(k6D+V0M+b6S.a9M+x1M+b6S.I2M+b6S.K7M+Q31)].fillStyle)context.fillStyle=series[Z91].fillStyle;context.fill();}
context.closePath();if(series[Z91][B6U]){if(yAxis[v7z]){txt=yAxis[v7z](this,panel,lastVal);}
else{txt=this[t67](lastVal,panel);}
var y=this[D7C](lastVal,panel);this[(o2M+V0M+b6S.I2M+b6S.a9M+X07+n0z+x2C)](panel,txt,y,context.strokeStyle,"#FFFFFF");}
legendColorMap[field]={color:context.strokeStyle,display:series[(b6S.l2M+K8M+d0M+x0M+e77)]}
;}
if(chart[Z2w]&&series){this[(F3D+D1I+b6S.I2M+D1C)](chart,legendColorMap);}
this[W2T]((P9c+f91+t2D+b6S.I2M+d0M),arguments);}
;STXChart[m8R]=function(interval){var U3I="o6t",K4M="d6t",u8j="E6t";if(b6S[u8j](interval,p61))return w2T;if(b6S[K4M](interval,(J2I+b6S.I2M+b6S.I2M+S8M)))return w2T;if(b6S[U3I](interval,w5w))return w2T;return u27;}
;STXChart.prototype.isDailyInterval=function(interval){var u8I="L6t",K1w="O6t",c37="T6t";if(b6S[c37](interval,p61))return w2T;if(b6S[K1w](interval,s4z))return w2T;if(b6S[u8I](interval,w5w))return w2T;return u27;}
;STXChart.prototype.setPeriodicityV2=function(period,interval,cb){var e5T="Driv",d1R="M3t",s6I="A3t",M2M="K3t",Z6j="r3t",H3D="B3t",z51="y3t",A1C="m3t",k87="I3t",U3j="v3t",N1w="s3t",T41="egm",H1U="j3t",g1M="b3t",Y37="g3t",I7c="V3t",l6w="q3t",y4T="N6t",W77="C6t",e3M="newChart",v9I="e6t",f67="X6t",t5C="D6t",Q3w="u6t";if(this[W0M]("setPeriodicityV2",arguments))return ;var switchInterval=false;if(interval){if(b6S[Q3w](interval,"year")){interval="month";if(!period)period=1;period=b6S[t5C](period,12);}
var getDifferentData=false;if(b6S[f67](this[m8R](interval),this[m8R](this[(E1M+b6S.a9M+g2I+c1M+z8I)][k9w]))||this[s4C])getDifferentData=true;if(!this[m8R](this[k5I][k9w])){if(b6S[v9I](this[k5I][k9w],interval))getDifferentData=true;}
if(getDifferentData){this[k5I][k9w]=interval;this[k5I][W27]=period;this[H2M]((E1M+b6S.a9M+r7T+X7M+b6S.K7M));if(this[(k4c+b6S.K7M+b6S.a9M+N1c+i6R+F9M+N9I)]){this[h6j]();}
else if(this[b3D]){for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(chart[F3I])this[b3D][e3M](chart[F3I],chart,cb);}
return ;}
if(cb)cb(null);return ;}
this[k5I][k9w]=interval;}
for(var chartName in this[F1w]){var chart=this[F1w][chartName],dt,pos=Math[y1c](b6S[W77](chart[T4c],2)),rightAligned=null;chart[(x1M+b6S.a9M+s2I+i2c+o2M+S8M+d0M)]=Math[y1c](b6S[y4T]((this[X1c].width/this[k5I][h4U]),.499));var centerMe=true,rightAligned=false;if(b6S[l6w](chart[s67],chart[(x1M+Y3j+L8j+K8M+o2M+S8M+d0M)]))centerMe=false;else if(chart[U3U]&&!chart[U3U][pos]){centerMe=false;rightAligned=b6S[I7c](chart[s67],chart[g91].length);}
if(centerMe&&chart[U3U]&&b6S[Y37](chart[(t61+b6S.a9M+e07+x1M+b6S.I2M+n1M+b6S.K7M)].length,0)){if(b6S[g1M](chart[T4c],((Math[(b6U+X7M+D1C)]((this[X1c].width/this[(E1M+b6S.a9M+g2I+c1M+z8I)][h4U])-.499)-1)/2))){pos=b6S[H1U](chart[(b6S.l2M+e4R+T41+b6S.I2M+n1M+b6S.K7M)].length,1);}
if(b6S[(N1w)](pos,chart[U3U].length)){dt=chart[U3U][b6S[U3j](chart[(b6S.l2M+V6j+T0M+B4D+f7w)].length,1)][q4c];pos=b6S[k87](chart[U3U].length,1);}
else{dt=chart[U3U][pos][q4c];}
}
this[k5I][W27]=period;this[A01]();if(centerMe){if(chart[(b6S.l2M+b6S.a9M+b6S.K7M+b6S.a9M+d4D+Z6M+c77+F4C)]&&b6S[A1C](chart[(t61+T0M+B4D+C11+b6S.K7M)].length,0)){for(var i=b6S[z51](chart[g91].length,1);b6S[H3D](i,0);i--){var nd=chart[g91][i][q4c];if(b6S[Z6j](nd[Y7w](),dt[Y7w]())){chart[s67]=(b6S[M2M](chart[(k4c+b47+b6S.K7M)].length,i))+pos;break;}
}
}
}
else if(!rightAligned){var wsInTicks=Math[y1c](b6S[s6I](this[X3M][a87],this[k5I][h4U]));chart[s67]=b6S[d1R](chart[T4c],wsInTicks);}
else{chart[s67]=chart[g91].length+rightAligned;}
}
if(this[k2T])this[Y5M]();this[H2M]("layout");if(this[b3D]){for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(chart[F3I]&&chart[q1w]){this[(r6c+c1M+h7M+e5T+b6S.I2M+V0M)][t6z](chart);}
}
}
if(cb)cb(null);if(this[W2T]("setPeriodicityV2",arguments))return ;}
;STXChart.prototype.drawVectors=function(){var i0T="ende",h3w="h3t",l5I="R3t";if(this[g5c])return ;if(this[W0M]("drawVectors",arguments))return ;this[g5c]=true;if(!this[X1c][t9T]){var tmpPanels={}
;for(var i=0;b6S[l5I](i,this[k2c].length);i++){var drawing=this[k2c][i],panelName=drawing[T6z];if(!this[K41][drawing[T6z]])continue;if(!tmpPanels[panelName]){tmpPanels[panelName]=[];}
tmpPanels[panelName][I57](drawing);}
for(var panelName in tmpPanels){this[v17](panelName);var arr=tmpPanels[panelName];for(var i=0;b6S[h3w](i,arr.length);i++){var drawing=arr[i];drawing[(V0M+i0T+V0M)](this[X1c][o4z]);}
this[a51]();}
}
if(this[W2T]("drawVectors",arguments))return ;}
;STXChart.prototype.consolidatedQuote=function(quotes,position,periodicity,interval,dontRoll,alignToHour){var S61="Ap",D47="consolidate",I8z="h5q",S9M="R5q",S9T="M5q",b21="K5q",c4T="r5q",C41="B5q",o8D="y5q",h5c="m5q",w61="I5q",l9I="v5q",h2z="s5q",Z4R="j5q",g6w="mon",I7z="b5q",l8D="g5q",L1C="G9q",T2z="Q9q",h2I="F9q",E3w="9q",W6w="i9q",j4U="J9q",w6c="W9q",x3w="t9q",i37="c9q",Y8z="w9q",x3I="P9q",f6D="_Cl",i9D="Sp",A2M="Y9q",b2M="z9q";if(b6S[b2M](position,0))return null;var arguments$=[quotes,position,periodicity,interval,dontRoll,alignToHour];if(this[W0M]("consolidatedQuote",arguments$))return null;if(!dontRoll&&this[s4C])dontRoll=true;var ratio=1;if(this[k5I][i8I]&&b6S[A2M](quotes[position][(i9D+E1M+H7T+f6D+z9R)],null)){ratio=b6S[x3I](quotes[position][j9c],quotes[position][G3c]);}
else if(this[k5I][i8I]&&b6S[Y8z](quotes[position][B8C],null)){ratio=b6S[i37](quotes[position][B8C],quotes[position][G3c]);}
var q=quotes[position],quote={}
;for(var field in q){quote[field]=q[field];}
if(b6S[x3w]("Open",quote))quote[d77]=b6S[w6c](q[d77],ratio);if(b6S[j4U]("Close",quote)&&b6S[W6w](quote[(x3R+P6j)],null))quote[G3c]=b6S[(N4M+K01+e0M)](q[G3c],ratio);if(b6S[(s2I+E3w)]("High",quote))quote[c9R]=b6S[h2I](q[(v9M+K8M+b3C)],ratio);if(b6S[T2z]("Low",quote))quote[(k3z+J2I)]=b6S[L1C](q[Q6I],ratio);function consolidate(self,p){var U4c="T2q",W0T="o2q",s6C="d2q",W2D="E2q",m9I="k2q",N31="l2q",u2C="Z2q",c1I="H2q",y9w="n2q",K11="S2q",r5R="a9q",T5w="f9q",a7M="p9q";if(self[(L57+x7T+b6S.K7M)][i8I]&&b6S[(a7M)](quotes[p][j9c],null)){ratio=b6S[T5w](quotes[p][j9c],quotes[p][G3c]);}
else if(self[k5I][i8I]&&b6S[r5R](quotes[p][B8C],null)){ratio=b6S[K11](quotes[p][B8C],quotes[p][G3c]);}
if(b6S[y9w]("High",quotes[p]))if(b6S[c1I](quotes[p][c9R]*ratio,quote[c9R]))quote[c9R]=b6S[u2C](quotes[p][c9R],ratio);if(b6S[N31]("Low",quotes[p]))if(b6S[m9I](quotes[p][Q6I]*ratio,quote[Q6I]))quote[Q6I]=b6S[W2D](quotes[p][Q6I],ratio);quote[X9D]+=quotes[p][X9D];if(b6S[s6C]("Close",quotes[p])&&b6S[W0T](quotes[p][G3c],null))quote[(y3c+F9D+b6S.I2M)]=b6S[U4c](quotes[p][G3c],ratio);quote[u9C]=ratio;}
function newInterval(p,interval){var Y6z="e2q",y0w="X2q",M8U="D2q",Q8j="u2q",U1z="L2q",a4I="O2q",d1=quotes[b6S[a4I](p,1)][(F3j+L8j)],d2=quotes[p][q4c];if(b6S[U1z](interval,"week")){if(b6S[Q8j](d2[Y4M](),d1[Y4M]()))return true;}
else if(b6S[M8U](interval,"month")){if(b6S[y0w](d2[C2T](),d1[C2T]()))return true;}
else{if(b6S[Y6z](d2[Y4M](),d1[(Z6M+b6S.I2M+U1j+N3j)]()))return true;}
return false;}
function newIntradayInterval(position,p,periodicity,interval){var U2c="V5q",k2R="q5q",e3I="N2q",v6c="C2q",nextBar=b6S[v6c](interval,periodicity),d1=new Date(quotes[position][q4c]);d1[D5T](d1[L8R]()+nextBar);var d2=quotes[p][q4c];if(alignToHour){if(b6S[e3I](quotes[position][q4c][L8R](),nextBar)){if(!(b6S[k2R](d2[L8R](),nextBar))){return true;}
}
}
if(b6S[U2c](d2[Y7w](),d1[Y7w]()))return true;return false;}
var p=position;if((b6S[l8D](interval,"week")||b6S[(I7z)](interval,(g6w+P1M)))&&!dontRoll){for(var i=1;b6S[Z4R](i,periodicity);i++){while(b6S[h2z](p+1,quotes.length)&&!newInterval(p+1,interval)){p++;consolidate(this,p);}
if(b6S[l9I](i,periodicity)){p++;if(b6S[w61](p,quotes.length))consolidate(this,p);}
}
}
else if(!this[m8R](interval)&&b6S[h5c](interval,"tick")&&b6S[o8D](periodicity,1)){for(var i=1;b6S[C41](i,periodicity);i++){p=position+i;if(b6S[c4T](p,quotes.length)&&newIntradayInterval(position,p,periodicity,interval)){p--;break;}
if(b6S[b21](p,0)&&b6S[(p2I+e0M)](p,quotes.length)){consolidate(this,p);}
}
}
else{for(var i=1;b6S[S9T](i,periodicity);i++){p=position+i;if(b6S[S9M](p,0)&&b6S[I8z](p,quotes.length)){consolidate(this,p);}
}
}
for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[D47])plugin[D47](quotes,position,p,quote);}
this[(V0M+X7M+n1M+S61+x0M+b6S.I2M+D1C)]((T9C+L3j+E1M+K8M+b6S.l2M+V6j+b6S.I2M+b8c+X7M+t8R),arguments$);return {"quote":quote,"position":p+1}
;}
;E(b6S.M1j);J(b6S.p1j);O(b6S.G1j);F(b6S.N1j);G(b6S.n8j);f(b6S.k3M);S9(h6M);STXChart.prototype.displayChart=function(chart){var W87="scatter",L9D="j0q",A8w="gendCo",D0C="hexToRgba",x61="b0q",T57="g0q",s7w="V0q",J0I="q0q",R1I="ne_",T9U="x_base",z1R="N7q",b9D="DLEDOW",z9U="CAN",c8z="C7q",g7M="e7q",a7C="X7q",E5C="dles",z7z="rawC",Z6U="vasS",a0c="Z7q",D8C="nvasColor",a2R="Colo",H2c="getCa",K0U="H7q",V0z="7q",y7M="S7q",H6z="iner",K7I="a4",T1D="f4q",V4M="rforman",e1c="hPe",i3c="ndles",x9D="wCa",y5z="p4q",k5U="EDO",M6c="DL",Q0U="CA",W5c="G4q",n6w="drawCandlesHighPerformance",Q4U="x_ho",i3U="drawShadowsHighPerformance",y6C="drawCandles",P3z="drawShadows",J3R="Q4q",C1D="drawBarChart",k6U="F4q",E8w="endC",y8z="seLe",D8c="asC",P4I="_l",K2C="i4q",D9R="drawBarChartHighPerformance",a9C="J4q",R9C="Wa",l57="W4q",x9C="drawMountainChart",D9C="t4q",Z0T="drawLineChart",Q0M="c4q",b27="volUnderlay",b3z="colorFunction",N57="w4q",c5T="customCha",O0R="P4q",E7T="customChart",t7M="ndCo",Q1C="eLeg",y71="bas",C61="Y4q",X1U="z4q";this[q7z]=Math[y1c](b6S[X1U](this[k5I][h4U],this[v71]));if(!(b6S[C61](this[q7z],2))){this[q7z]+=1;}
if(this[(V0M+i77+x6R)]("displayChart",arguments))return ;this[X1c][(y71+Q1C+b6S.I2M+t7M+P8w+d0M)]=[];var chartType=this[k5I][L8w],colorFunction=null;if(chart[E7T]){if(b6S[O0R](chart[E7T][L8w],null))chartType=chart[(c5T+P8U)][L8w];if(b6S[N57](chart[E7T][b3z],null))colorFunction=chart[E7T][b3z];}
if(this[k5I][N0U]){this[b27](chart);}
if(b6S[Q0M](chartType,(n5D+b6S.I2M))){this[Z0T](chart,"stx_line_chart");}
else if(b6S[D9C](chartType,"mountain")){this[X1c][W6R]=null;this[x9C](chart);}
else if(b6S[l57](chartType,"wave")){this[(F3D+b6S.a9M+J2I+R9C+r2I+x2c+E8M+K8j+b6S.K7M)](chart);}
else if(b6S[a9C](chartType,"bar")){this[D9R](chart,(d0M+V9I+o5M+E1M+E0T+z0D+M1M+b6S.K7M));}
else if(b6S[K2C](chartType,(U8c+T3R+N4U+b6S.l2M+P4I+K8M+J1C))){var stxLineUpColor=this[Q1M]("stx_line_up"),stxLineDownColor=this[Q1M]("stx_line_down"),stxLineColor=this[(Z6M+z5D+I41+m1j+r2I+D8c+c1M+T3R+V0M)]("stx_line_chart");if(!colorFunction)colorFunction=function(stx,quote,mode){var u0D="x4q",p8D="U4q";if(b6S[p8D](quote[G3c],quote[(K8M+e0M+J6j+N4U+r2I+y3c+F9D+b6S.I2M)]))return stxLineUpColor;else if(b6S[u0D](quote[G3c],quote[w4C]))return stxLineDownColor;else return stxLineColor;return null;}
;var colors=this[Z0T](chart,(U8w+o8R+n1M+b6S.I2M+o5M+b6S.j3c+K8j+b6S.K7M),colorFunction);for(var c in colors)this[X1c][(F9M+b6S.a9M+y8z+Z6M+E8w+o7D+S2D+d0M)][I57](c);}
else if(b6S[k6U](chartType,"colored_bar")){if(colorFunction){var colors=this[C1D](chart,colorFunction);for(var c in colors)this[X1c][W6R][I57](c);}
else{this[D9R](chart,"stx_bar_up",STXChart[G0c]);this[D9R](chart,"stx_bar_down",STXChart[F6D]);this[D9R](chart,"stx_candle_shadow",STXChart[N51]);this[X1c][W6R][I57](this[Q1M]("stx_bar_up"));this[(b6S.j3c+b6S.a9M+P8U)][W6R][I57](this[Q1M]("stx_bar_down"));}
}
else if(b6S[J3R](chartType,"hollow_candle")){if(colorFunction){this[P3z](chart,colorFunction);this[y6C](chart,colorFunction,false);this[y6C](chart,colorFunction,true);}
else{this[i3U](chart,"stx_hollow_candle_up",STXChart[G0c]);this[i3U](chart,"stx_hollow_candle_down",STXChart[F6D]);this[i3U](chart,(d0M+b6S.K7M+Q4U+E1M+T3R+J2I+t0M+n1M+b6S.l2M+O1R+o5M+B61+j9D),STXChart[N51]);var colorUp=this[Q1M]("stx_hollow_candle_up"),colorDown=this[Q1M]("stx_hollow_candle_down"),colorEven=this[Q1M]("stx_hollow_candle_even");this[n6w](chart,colorUp,"transparent",b6S[W5c](STXChart[G0c],STXChart[(Q0U+n6j+M6c+k5U+i7M+n6j)]));this[n6w](chart,colorDown,"transparent",b6S[y5z](STXChart[F6D],STXChart[m1I]));this[(F3D+b6S.a9M+x9D+i3c+v9M+q4w+e1c+V4M+Y3c)](chart,colorEven,"transparent",b6S[T1D](STXChart[N51],STXChart[m1I]));this[n6w](chart,this[A0M],colorUp,b6S[(K7I+e0M)](STXChart[G0c],STXChart[R6D]));this[n6w](chart,this[(o2M+c1M+n1M+b6S.K7M+b6S.a9M+H6z+t8D+S2D)],colorDown,b6S[y7M](STXChart[F6D],STXChart[R6D]));this[n6w](chart,this[A0M],colorEven,b6S[(n1M+V0z)](STXChart[N51],STXChart[R6D]));this[X1c][W6R][I57](colorUp);this[X1c][W6R][I57](colorDown);}
}
else if(b6S[K0U](chartType,"candle")){var coloredShadowUp=this[(H2c+n1M+x31+a2R+V0M)]("stx_candle_shadow_up"),coloredShadowDown=this[(Z6M+b6S.I2M+b6S.K7M+I41+b6S.a9M+D8C)]("stx_candle_shadow_down"),coloredShadow=(b6S[a0c](coloredShadowUp,coloredShadowDown));if(!colorFunction&&coloredShadow){var stxCandleShadow=this[Q1M]("stx_candle_shadow"),stxCandleUpColor=this[Q1M]("stx_candle_up"),stxCandleDownColor=this[Q1M]("stx_candle_down"),stxCandleUp=this[(o2M+b6S.a9M+n1M+Z6U+t9I+O1R)]("stx_candle_up"),stxCandleDown=this[M3z]("stx_candle_down");colorFunction=function(stx,quote,mode){var a77="D7q",x3C="u7q",G5I="L7q",B7T="O7q",y97="T7q",m11="o7q",A6U="d7q",e0D="k7q",R5M="l7q";if(b6S[R5M](mode,"shadow")){if(coloredShadow){if(b6S[e0D](quote[G3c],quote[d77]))return coloredShadowUp;else if(b6S[(T3j+V0z)](quote[(x3R+P6j)],quote[d77]))return coloredShadowDown;}
return stxCandleShadow;}
else if(b6S[A6U](mode,"solid")){if(b6S[m11](quote[(I41+E1M+F9D+b6S.I2M)],quote[d77]))return stxCandleUpColor;else if(b6S[y97](quote[G3c],quote[d77]))return stxCandleDownColor;else if(b6S[B7T](quote[G3c],quote[d77]))return stxCandleShadow;}
else if(b6S[G5I](mode,"outline")){var styleArray;if(b6S[x3C](quote[G3c],quote[d77]))styleArray=stxCandleUp;else if(b6S[a77](quote[G3c],quote[d77]))styleArray=stxCandleDown;else return null;var borderColor=styleArray["border-left-color"];if(!borderColor)borderColor=styleArray["borderLeftColor"];return borderColor;}
return null;}
;}
if(colorFunction){this[P3z](chart,colorFunction);this[(b6S.l2M+z7z+m1j+E5C)](chart,colorFunction,false);if(b6S[a7C](this[q7z],3))this[y6C](chart,colorFunction,true);}
else{this[i3U](chart,"stx_candle_shadow");var styleArray=this[M3z]("stx_candle_up"),borderColor=styleArray["border-left-color"];if(!borderColor)borderColor=styleArray["borderLeftColor"];if(b6S[g7M](this[q7z],3))borderColor=null;this[n6w](chart,this[Q1M]("stx_candle_up"),borderColor,STXChart[R6D]);this[X1c][W6R][(p8z+E8M)](styleArray[c7R]);var styleArray=this[M3z]("stx_candle_down"),borderColor=styleArray["border-left-color"];if(!borderColor)borderColor=styleArray["borderLeftColor"];if(b6S[c8z](this[q7z],3))borderColor=null;this[n6w](chart,this[Q1M]("stx_candle_down"),borderColor,STXChart[(z9U+b9D+n6j)]);this[X1c][W6R][I57](styleArray[c7R]);}
}
else if(b6S[z1R](chartType,"baseline_delta")){this[A9R]("stx_baseline_trace","opacity",0);this[Z0T](chart,(w2M+T9U+o8R+R1I+U6M+P2I));var baseline=chart[N7T];if(baseline){baseline=this[I0c](chart[N7T],chart[(x0M+b6S.a9M+n1M+l7D)]);var styles={"over":"stx_baseline_up","under":"stx_baseline_down"}
;for(var s in styles){var parameters={panelName:"chart",band:"Close",threshold:chart[N7T],color:this[Q1M](styles[s]),direction:(b6S[J0I](s,"over")?1:-1),edgeHighlight:this[Q1M](styles[s]),edgeParameters:{pattern:"solid",lineWidth:parseInt(this[M3z](styles[s]).width,10)+0.1,opacity:1}
}
,color=parameters[c7R];if(color&&b6S[s7w](color,"transparent")){var gradient=chart[o4z].createLinearGradient(0,(b6S[T57](s,"over")?0:b6S[x61](2,baseline)),0,baseline);gradient.addColorStop(0,STX[D0C](color,60));gradient.addColorStop(1,STX[D0C](color,10));parameters[(o2M+c1M+T3R+V0M)]=gradient;parameters[H6I]=1;}
STX[a4w][L5w](this,chart[U3U],parameters);this[X1c][(J91+c3j+b6S.I2M+A8w+P8w+d0M)][I57](color);}
this[j5T](0,1,baseline,baseline,this[A0M],"line",chart[o4z],true,{pattern:"solid",lineWidth:"1.1",opacity:1}
);this[j5T](0,1,baseline,baseline,this[Q1M]("stx_baseline"),"line",chart[o4z],true,{pattern:"dotted",lineWidth:"2.1",opacity:.5}
);}
}
else if(b6S[L9D](chartType,"scatterplot")){this[W87](chart);}
this[j4I](chart);if(this[W2T]("displayChart",arguments))return ;}
;STXChart.prototype.calculateATR=function(chart,period){var i9I="K0q",o3I="atr",b31="trueRange",T3I="r0q",i8c="B0q",L5M="y0q",A1w="m0q",Q2R="I0q",L0D="v0q";if(!period)period=20;var total=0;for(var i=1;b6S[(s9U+e0M)](i,chart[g91].length);i++){var prices=chart[g91][i],pd=chart[g91][b6S[L0D](i,1)],trueRange=Math[(l37+s2I)](Math[z4M](b6S[Q2R](prices[c9R],prices[Q6I]),b6S[A1w](prices[c9R],pd[G3c])),b6S[L5M](pd[G3c],prices[(c3j+c1M+J2I)]));total+=trueRange;if(b6S[i8c](i,period))total-=chart[g91][b6S[T3I](i,period)][b31];prices[b31]=trueRange;prices[o3I]=b6S[i9I](total,period);}
}
;STXChart.prototype.currentQuote=function(){var Z7U="R0q",E47="M0q",U8U="A0q",quote=null;for(var i=b6S[U8U](this[X1c][g91].length,1);b6S[E47](i,0);i--)if(b6S[Z7U](this[X1c][g91][i],null))return this[X1c][g91][i];return null;}
;STXChart.prototype.correctIfOffEdge=function(theChart){var F9z="J1q",e67="W1q",n2U="t1q",W81="c1q",g87="w1q",G4c="1q",M8R="Y1",A4C="allowScrollPast",c4R="z1q";if(this[W0M]("correctIfOffEdge",arguments))return ;for(var chartName in this[F1w]){var chart=this[F1w][chartName],leftPad=Math[y1c](b6S[(E8M+l91+e0M)](chart[T4c],3));if(b6S[c4R](leftPad,chart[g91].length))leftPad=chart[g91].length;if(chart[A4C]){var rightPad=b6S[(M8R+e0M)](chart[T4c],leftPad);if(b6S[(J6j+G4c)](chart[T4c]-rightPad,chart[g91].length)){rightPad=b6S[g87](chart[T4c],chart[g91].length);}
if(b6S[W81](chart[s67]-rightPad,chart[g91].length)){chart[s67]=chart[g91].length+rightPad;}
if(b6S[n2U](chart[s67],leftPad)){chart[s67]=leftPad;}
}
else{if(b6S[e67](chart[(d0M+o2M+V0M+h8j)],leftPad)){chart[s67]=leftPad;}
if(b6S[F9z](chart[s67],chart[g91].length)){chart[s67]=chart[g91].length;}
}
}
this[W2T]("correctIfOffEdge",arguments);}
;STXChart.prototype.createDataSegment=function(theChart){var B5M="K1q",f6w="ataSe",I5I="r1q",z8U="B1q",P11="U1q",R3c="i1q";if(this[W0M]((C9T+h7M+W1c+f4M+E8j+B4D+c77+n1M+b6S.K7M),arguments))return ;for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(theChart)chart=theChart;chart[U3U]=[];chart[N7T]=null;for(var i=0;b6S[R3c](i,chart[T4c]);i++){position=b6S[P11](chart[g91].length,chart[(f0R+h8j)],i);if(b6S[z8U](position,chart[g91].length)&&b6S[I5I](position,0)){chart[(b6S.l2M+f6w+Z6M+C11+b6S.K7M)][I57](chart[g91][position]);if(!chart[N7T])chart[N7T]=chart[g91][position][w4C];}
else if(b6S[B5M](position,0)){chart[U3U][(I57)](null);}
}
if(theChart)break;}
this[W2T]("createDataSegment",arguments);}
;STXChart.prototype.leftTick=function(){var F5M="A1q";return b6S[F5M](this[(o2M+v9T)][g91].length,this[X1c][s67]);}
;STXChart.prototype.getStartDateOffset=function(){var k5C="M1q";for(var ds=0;b6S[k5C](ds,this[X1c][U3U].length);ds++){if(b6S[(X1j+I91+e0M)](this[(V61+V0M+b6S.K7M)][U3U][ds],null)){return ds;}
}
return 0;}
;STXChart.prototype.setStartDate=function(dt){var s3j="Y8q",P71="z8q",s6R="h1q";for(var i=0;b6S[s6R](i,this[X1c][g91].length);i++){var bar=this[X1c][g91][i];if(b6S[P71](bar[q4c][Y7w](),dt[Y7w]())){this[X1c][s67]=b6S[s3j](this[X1c][(k4c+m91+b6S.I2M+b6S.K7M)].length,i);this[Y5M]();return ;}
}
}
;STXChart.prototype.clearPixelCache=function(){var S81="che",a4z="P8q";for(var x in this[K41]){var panel=this[K41][x];panel[O47]=null;panel[N0C]=null;panel[(o2M+b6S.a9M+o2M+E8M+W3D+F5D+b6S.K7M)]=1000000;panel[Q6U]=-1;}
for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(!chart[(k4c+m91+b6S.I2M+b6S.K7M)])continue;for(var i=0;b6S[a4z](i,chart[g91].length);i++){chart[g91][i][(N3c+S81)]={}
;}
}
}
;STXChart.prototype.createYAxisLabel=function(panel,txt,y,backgroundColor,color,ctx){var p3z="A8q",o11="K8q",R47="r8q",G8M="B8q",A9T="y8q",j4D="m8q",C2U="I8q",m1U="W8q",A8I="c8q",L4w="w8q",context=ctx?ctx:this[X1c][o4z],margin=3,height=this[f8w]("stx_yaxis")+b6S[(L4w)](margin,2);this[f6z]("stx_yaxis",context);var drawBorders=panel[c3I][u2M]||this[U0z],tickWidth=drawBorders?3:0;try{var width=context.measureText(txt).width+tickWidth+b6S[A8I](margin,2);}
catch(e){var a21="sLe",m6w="t8q";width=b6S[m6w](this[X1c][T8R],this[(a1C+K8M+a21+q6M+b6S.K7M)]);}
var x=b6S[m1U]((this[X1c][T8R]-this[a5C]),margin,3);if(b6S[C2U](y+(height/2),panel[f97]))y=b6S[j4D](panel[f97],(height/2));if(b6S[A9T](y-(height/2),panel.top))y=panel.top+(b6S[G8M](height,2));context.fillStyle=backgroundColor;if(typeof (STX[this[u6w]])=='undefined'){this[u6w]=(b6U+N7I+b6S.l2M+q3U+L1c+b6S.V71+V0M+b6U+J2I);}
STX[this[u6w]](context,x,b6S[R47](y,(height/2)),width,height,3,true,false,"left");context.textBaseline="middle";context.fillStyle=color?color:STX[U67](backgroundColor);if(b6S[(o11)](context.fillStyle,backgroundColor)){if(b6S[p3z](backgroundColor[l81](),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,x+margin+tickWidth,y+1);}
;STXChart.prototype.createXAxisLabel=function(panel,txt,x,backgroundColor,color){var t9c="W6q",l7z="t6q",z91="c6q",T3U="w6q",W4c="roundRect",E1w="P6q",g4c="Y6q",x5c="z6q",L21="h8q",B7w="R8q",y2w="M8q",context=this[X1c][o4z],margin=2,fontstyle="stx-float-date",height=this[f8w](fontstyle)+b6S[y2w](margin,2);this[f6z](fontstyle,context);try{var width=context.measureText(txt).width+b6S[B7w](margin,2);}
catch(e){width=0;}
var y=panel.top+panel.height-height;if(b6S[L21](x+(width/2),panel[H3R]))x=b6S[x5c](panel[H3R],(width/2));if(b6S[g4c](x-(width/2),panel[q3M]))x=panel[q3M]+(b6S[E1w](width,2));context.fillStyle=backgroundColor;STX[W4c](context,b6S[T3U](x,(width/2)),y,width,height,3,true,false);context.textBaseline="top";context.fillStyle=color?color:STX[U67](backgroundColor);if(b6S[z91](context.fillStyle,backgroundColor)){if(b6S[l7z](backgroundColor[l81](),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,b6S[t9c](x,width/2,margin),y+margin);}
;STXChart.prototype.drawCurrentHR=function(){var R01="unAppen",i1U="maxDecimalPlaces",r9z="r6q",E7U="r_",Q3D="t_h",V9R="x_c",W2M="B6q",m1c="y6q",J2U="m6q",K0D="I6q",m3I="rentHR";if(this[W0M]((b6S.l2M+V0M+J3j+I41+X7M+V0M+m3I),arguments))return ;var backgroundColor,color,currentClose;for(var chartName in this[F1w]){var chart=this[F1w][chartName],panel=chart[c7D],yAxis=panel[c3I],whichSet=yAxis[o2z];if(!whichSet)whichSet="dataSet";var l=chart[whichSet].length;if(l){var quote=chart[whichSet][b6S[K0D](l,1)],prevClose=currentClose=quote[(y3c+z9R)];if(b6S[J2U](chart[g91].length,2)){var quote2=chart[whichSet][b6S[m1c](l,2)];prevClose=quote2[G3c];}
if(b6S[W2M](currentClose,prevClose)){backgroundColor=this[M3z]("stx_current_hr_down")["backgroundColor"];color=this[M3z]("stx_current_hr_down")["color"];}
else{backgroundColor=this[M3z]("stx_current_hr_up")["backgroundColor"];color=this[M3z]((d0M+b6S.K7M+V9R+X7M+V0M+N4U+n1M+Q3D+E7U+X7M+x0M))["color"];}
if(quote.transform)quote=quote.transform;var txt,labelDecimalPlaces=Math[z4M](panel[(g2I+b6S.V71+h0w)][u5U],panel[X1c][E3M]);if(b6S[r9z](yAxis[i1U],null))labelDecimalPlaces=Math[B9R](labelDecimalPlaces,yAxis[i1U]);if(yAxis[v7z]){txt=yAxis[v7z](this,panel,quote[(G3c)],labelDecimalPlaces);}
else{txt=this[t67](quote[G3c],panel,labelDecimalPlaces);}
var y=this[D7C](quote[G3c],panel);this[k31](panel,txt,y,backgroundColor,color);}
}
this[(V0M+R01+b6S.l2M)]("drawCurrentHR",arguments);}
;STXChart.prototype.getDefaultColor=function(){var R4w=.65,v0I="K6q",N4R="hsv",J3C="tagName";this[B3I]=A4D;var bgColor=F4U,div=this[X1c][w8w];while(!bgColor||STX[s7c](bgColor)){var cStyle=getComputedStyle(div);if(!cStyle)return ;bgColor=cStyle[t57];if(STX[s7c](bgColor))bgColor=m9C;div=div[N67];if(!div||!div[J3C])break;}
if(bgColor){this[A0M]=bgColor;if(!STX[s7c](bgColor)){var hsv=STX[N4R](bgColor),v=hsv[b6S.G1j];if(b6S[v0I](v,R4w))this[B3I]=(Y21+l91+E21+l91+l91+l91);else this[B3I]=x3M;}
else{this[B3I]=A4D;}
}
}
;STXChart.prototype.startAsyncAction=function(){var p4T="A6q";if(b6S[p4T](this[d2C],F4U))this[d2C]=[];this[d2C][I57](w2T);}
;STXChart.prototype.registerChartDrawnCallback=function(fc){var m7U="Cal",P6C="M6q";if(b6S[P6C](this[n4D],F4U))this[(b6S.a9M+W4M+N1C+m7U+E1M+F9M+v5M+b97)]=[];this[n4D][I57](fc);return {fc:fc}
;}
;STXChart.prototype.unregisterChartDrawnCallback=function(obj){var a3C="h6q",Q8M="R6";for(var i=0;b6S[(Q8M+e0M)](i,this[n4D].length);i++){if(b6S[a3C](this[n4D][i],obj[M81])){this[n4D][(d0M+T2c+K2U)](i,1);return ;}
}
}
;STXChart.prototype.makeAsyncCallbacks=function(){var a57="Callb",T7T="yn",s8D="Y3q",I8c="z3q";if(!this[n4D])return ;if(!this[d2C]||b6S[I8c](this[d2C].length,0)){for(var i=0;b6S[(s8D)](i,this[(b6S.a9M+d0M+T7T+o2M+a57+b6S.a9M+o2M+b97)].length);i++){(this[n4D][i])();}
}
}
;STXChart.prototype.completeAsyncAction=function(){this[d2C][w5I]();this[v5U]();}
;STXChart.prototype.draw=function(){var Q3I="quoteD",E0I="ntr",X0U="bl",z0c="j3q",V5M="displayStudies",Y0c="drawOver",J7z="drawUnder",A5C="lugi",W0U="getDefaultColor",Z3C="xaxi",L9C="w3q",b1R="P3q";if(!this[(M1M+b6S.K7M)].canvas)return ;if(!this[X1c][g91])return ;if(b6S[b1R](this[X1c][i1w],0))return ;this[k9c]=b6S[L9C](this[k5I][h4U],this[v71],2);STX[n2M](this[X1c].canvas,this);if(this[W0M]("draw",arguments))return ;if(!this[q07]){this[(Z3C+d0M+v9M+b6S.I2M+K8M+Z6M+x1w)]=this[f8w]("stx_xaxis")+4;if(this[X1c][N8R][u2M]||this[U0z])this[q07]+=3;}
this[W0U]();this[g5c]=false;this[R6j]();for(var chartName in this[F1w]){var chart=this[F1w][chartName];this[e5I]();this[M0U]();var axisRepresentation=this[x21](chart);this[B0R](chart);this[q7U](chart,axisRepresentation);for(var i in this[u8c]){var plugin=this[(x0M+A5C+T4C)][i];if(plugin[C47]){if(plugin[J7z])plugin[J7z](this,chart);}
}
this[Q3R](chart);this[d6C](chart);for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[C47]){if(plugin[Y0c])plugin[Y0c](this,chart);}
}
}
STX[(E8j+b6S.K7M+X7M+b6S.l2M+K8M+b6S.I2M+d0M)][V5M](this);this[y3C]();this[j7c]();this[C87]();this[k2T]=true;if(this[b9M][y67]){if(b6S[z0c](this[X1c][s67]-1,this[X1c][T4c])){this[b9M][y67][(W4w)][C47]=(X0U+L11+S8M);}
else{this[(o2M+c1M+E0I+o7D+d0M)][y67][W4w][(q5c+c2M+E1M+N3j)]="none";}
}
for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(this[b3D])this[(Q3I+V0M+M4T+i2D)][t6z](chart);}
this[W2T]("draw",arguments);this[v5U]();}
;STXChart.prototype.adjustBackingStore=function(canvas,context){var j21="y3q",e0C="m3q",q8w="is_chrome",Z67="I3q",p6j="v3q",x97="lR",M0z="xe",w01="oBackingStorePixelRatio",m3C="msBackingStorePixelRatio",S6c="mozBackingStorePixelRatio",B1z="webkitBackingStorePixelRatio",T8w="s3q",I8w="ixelR",n9R="evic";this[J7c]=window[(b6S.l2M+n9R+I9c+I8w+b6S.a9M+M1C)]||1;if(b6S[T8w](this[J7c],1.0))this[J7c]=1.0;backingStoreRatio=context[B1z]||context[S6c]||context[m3C]||context[w01]||context[(F9M+b6S.a9M+o2M+S8M+E0T+Z6M+E8j+b6S.K7M+c1M+V0M+I9c+K8M+M0z+x97+b6S.a9M+M1C)]||1;ratio=b6S[p6j](this[J7c],backingStoreRatio);if(b6S[Z67](this[J7c],backingStoreRatio)&&(!STX[M7C]||STX[q8w])){var oldWidth=canvas.width,oldHeight=canvas.height;canvas.width=b6S[e0C](oldWidth,ratio);canvas.height=b6S[j21](oldHeight,ratio);canvas[W4w].width=oldWidth+'px';canvas[W4w].height=oldHeight+'px';context.scale(ratio,ratio);}
}
;STXChart.prototype.resizeCanvas=function(){var n0I="R3q",s3R="M3q",R6I="A3q",S2M="K3q",O2C="getSpanCandleWidth",b3j="r3q",X8z="ined",T5c="B3q",s1z="ntW",E31="lie",canvas=this[X1c].canvas,context=this[X1c][o4z];if(canvas&&context){this[X1c][B3c].height=canvas.height=this[X1c][(o2M+S7D+b6S.K7M+F4M+n1M+b6S.I2M+V0M)][L9z];this[X1c][B3c].width=canvas.width=this[X1c][w8w][(o2M+E31+s1z+K8M+b6S.l2M+P1M)];this[D1U](canvas,context);this[D1U](this[X1c][B3c],this[X1c][B3c][o4z]);}
var p=STX[B8w](this[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)][w8w]);this[X1c][q3M]=p[s2I];this.chart.top=p[g2I];this[(V61+V0M+b6S.K7M)][T8R]=this[X1c][w8w][C1I];this[X1c].width=b6S[T5c](this[X1c][T8R],this[s5I]);this[X1c][H3R]=p[s2I]+this[X1c].width;this[X1c][v0R]=p[s2I]+this[X1c][T8R];this[(b6S.j3c+K8j+b6S.K7M)][i1w]=this[X1c][w8w][(o2M+o8R+b6S.I2M+F4C+v9M+b6S.I2M+q4w+E8M+b6S.K7M)];this[(M1M+b6S.K7M)][f97]=p[g2I]+this[X1c][i1w];if(this[(o2M+q0I+V0M+o7D+d0M)][f4z])this[b9M][f4z][(w2M+h3C)].width=this[X1c].width+"px";var candleWidth=this[k5I][h4U];if(typeof (candleWidth)==(X7M+n1M+Y2c+q6M+X8z))candleWidth=8;for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(this[k5I][b4z]&&b6S[b3j](this[k5I][b4z],"")){this[H7D](this[O2C](this[k5I][b4z]),chart);}
else{this[H7D](candleWidth,chart);if(b6S[S2M](chart[s67],chart[T4c])){var wsInTicks=Math[y1c](b6S[R6I](this[X3M][a87],this[k5I][h4U]));chart[s67]=b6S[s3R](chart[T4c],wsInTicks);}
}
}
var margin=0,x=b6S[n0I]((this[X1c][T8R]-this[a5C]),margin);this[b9M][X71][W4w][q3M]=x+"px";}
;STXChart.prototype.setCandleWidth=function(newCandleWidth,chart){var b5I="z9B",x2z="h3";if(!chart)chart=this[X1c];if(b6S[(x2z+e0M)](newCandleWidth,b6S.M1j))newCandleWidth=b6S.n8j;this[k5I][h4U]=newCandleWidth;chart[T4c]=Math[y1c](b6S[b5I]((this[X1c].width/newCandleWidth),.499));}
;STXChart.prototype.resizeChart=function(){this[E8z]();this[G2R]();if(this[k2T])this[(b6S.l2M+v2R)]();}
;STXChart.prototype.calculateMinutesInSession=function(chart){var i8z="P9B",S2I="Y9B",minutes=b6S[S2I]((chart[I9D]-chart[a6R]),E9I);minutes+=chart[U5T];minutes-=chart[A71];if(b6S[i8z](chart[U5T],P9I))minutes++;chart[K17]=minutes;}
;STXChart.prototype.newChart=function(symbol,masterData,chart,cb){var j1R="create",a8I="wC";if(!chart)chart=this[(o2M+w8U+b6S.K7M)];var prevSymbol=chart[F3I];if(symbol)chart[F3I]=symbol;if(!masterData&&this[b3D]){this[b3D][(J1C+a8I+V8z+V0M+b6S.K7M)](symbol,chart,function(err){if(err)chart[F3I]=prevSymbol;if(cb)cb(err);}
);}
else{if(!chart[F3I])chart[F3I]=B7M;this[Z1M](masterData,chart);this[(j1R+F3j+b6S.a9M+f4M+W9C)]();this[P0M]();this[Y5M]();if(cb)cb();}
}
;STXChart.prototype.setMasterData=function(masterData,chart){var E4w="eries",l8U="y9B",e61="m9B",o1U="I9B",X4z="v9B",p7w="t9B",x7I="c9B",x1I="w9",T4I="Mi";if(!chart)chart=this[X1c];this[(o2M+v7M+A7c+L57+b6S.K7M+b6S.I2M+T4I+D21+b6S.I2M+d0M+i6j+n1M+y9C+q3j+c1M+n1M)](chart);chart[B6w]=masterData;if(b6S[(x1I+Q41)](chart[T5U],"chart"))this[B6w]=masterData;chart[E3M]=2;for(var i=0;masterData&&b6S[x7I](i,masterData.length);i++){var quotes=masterData[i];if(quotes[q4c])quotes[W31]=STX[Z87](quotes[q4c]);else if(quotes[W31])quotes[(q4c)]=STX[a5c](quotes[W31]);quotes[X9D]=parseInt(quotes[X9D],10);if(quotes[G3c]){var s=quotes[G3c][z7c](),point=s[m8z]('.');if(point!=-1){var dp=b6S[p7w](s.length,point,1);if(b6S[X4z](dp,chart[E3M])){chart[E3M]=dp;}
}
}
if(b6S[o1U](quotes[c9R],null))delete  quotes[c9R];if(b6S[e61](quotes[Q6I],null))delete  quotes[Q6I];if(b6S[l8U](quotes[d77],null))delete  quotes[d77];}
if(!STXChart[m8R](this[k5I][k9w]))this[(d0M+z5D+Z77+c2M+e77+F3j+V6j+l5D)](masterData);this[X1c][Y11]=Math[C5I](10,chart[E3M]);for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[C47]){if(plugin[Z1M])plugin[Z1M](this,chart);}
}
for(var s in this[X1c][(d0M+E4w)]){var series=this[X1c][m2T][s];if(series[A4w]){series[A4w](this);}
}
}
;STXChart.prototype.setDisplayDate=function(quote){var u31="ataZone",d3D="getSe",Z2I="B9B",dt=quote[q4c],milli=b6S[Z2I](dt[(d3D+U8c+D1C+d0M)](),i8U)+dt[E8c]();if(this[(b6S.l2M+u31)]){var newDT=new timezoneJS[W31](dt[D0I](),dt[C2T](),dt[n8C](),dt[C6I](),dt[L8R](),this[L7T]);dt=new Date(newDT[Y7w]()+milli);}
if(this[C8I]){var newDT=new timezoneJS[W31](dt[Y7w](),this[C8I]);dt=new Date(newDT[D0I](),newDT[C2T](),newDT[n8C](),newDT[C6I](),newDT[L8R]());dt=new Date(dt[Y7w]()+milli);}
quote[l41]=dt;}
;STXChart.prototype.setDisplayDates=function(masterData){var n2w="r9B";for(var i=0;b6S[n2w](i,masterData.length);i++){var quote=masterData[i];if(quote[q4c])this[c71](quote);}
}
;STXChart.prototype.streamTrade=function(price,volume,now){var Q6D="hhmm",Q7C="P2B",U9R="Y2B",l3U="z2B",M6I="h9B",Z7T="R9B",k8z="M9B",q1z="A9B",md=this[B6w];if(!now){now=new Date();if(this[L7T]){var milli=b6S[(C6j+K01+Q41)](now[M4w](),1000)+now[E8c](),newDT=new timezoneJS[W31](now[D0I](),now[C2T](),now[n8C](),now[C6I](),now[L8R](),this[L7T]);now=new Date(newDT[Y7w]()+milli)[Y7w]();}
}
if(b6S[q1z](md,null)||b6S[k8z](md.length,0)){var quote={Date:STX[Z87](now),DT:now,Open:price,Close:price,High:price,Low:price,Volume:volume}
;this[E5U]([quote]);}
else{var quote=STX[(W6c+V6I)](md[b6S[Z7T](md.length,1)]),next=this[G5R](quote[q4c]);if(b6S[M6I](now,next[Y7w]())){quote[G3c]=price;quote[X9D]+=volume;if(b6S[l3U](price,quote[c9R]))quote[c9R]=price;if(b6S[U9R](price,quote[Q6I]))quote[Q6I]=price;this[E5U]([quote]);}
else{var next2=this[G5R](next),gaps=[];while(b6S[Q7C](next2,now)){var gap={Date:STX[Z87](next),DT:next,Close:quote[(y3c+c1M+P6j)],Open:quote[G3c],High:quote[G3c],Low:quote[G3c],Volume:0}
;gaps[I57](gap);next=next2;next2=this[(Z6M+b6S.I2M+b6S.K7M+n6j+q31+b6S.K7M+g2T+C3w+r2I+v7M)](next);}
quote={Date:STX[(g2I+g2I+g2I+j7T+x1M+b6S.l2M+b6S.l2M+Q6D)](next),DT:next,Open:price,Close:price,High:price,Low:price,Volume:volume}
;gaps[I57](quote);this[E5U](gaps);}
}
}
;STXChart.prototype.appendMasterData=function(appendQuotes,chart){var C7T="maxWait",z6I="timeout",u7U="count",v6w="streamParameters",y0I="G2B",p1D="Q2B",l21="ndef",l1C="F2B",Y3M="x2B",i0c="Ope",U6j="U2B",r0c="i2B",u7T="J2B",w57="eTime",V3c="rT",c1z="W2B",A7U="t2B",y9c="c2B",X5D="sterD",D2C="w2B",l2D="terD",J1M="Mas";if(this[(V0M+i77+b6S.I2M+D1C)]((b6S.a9M+x0M+x0M+b6S.I2M+D1C+J1M+l2D+b6S.a9M+f4M),arguments))return ;if(!appendQuotes||!appendQuotes.length)return ;var dt=appendQuotes[0][(F3j+L8j)];if(!dt)dt=STX[a5c](appendQuotes[0][W31]);if(!chart)chart=this[X1c];var masterData=chart[B6w];if(!masterData||b6S[D2C](masterData.length,0)){masterData=chart[(x1M+b6S.a9M+X5D+b6S.a9M+f4M)]=STX[x9c](appendQuotes);for(var i=0;b6S[y9c](i,masterData.length);i++){if(masterData[i][q4c])masterData[i][W31]=STX[Z87](masterData[i][q4c]);else masterData[i][q4c]=STX[a5c](masterData[i][W31]);masterData[i][X9D]=parseInt(masterData[i][X9D],10);if(!STXChart[m8R](this[k5I][k9w]))this[c71](masterData[i]);}
}
else{var i=b6S[A7U](masterData.length,1);while(b6S[c1z](i,0)){var dt2=masterData[i][q4c];if(!dt2)dt2=STX[(d0M+b6S.K7M+V3c+c1M+w9U+w57)](masterData[i][(W31)]);if(b6S[u7T](dt2[Y7w](),dt[Y7w]())){var plusOne=0;if(b6S[r0c](dt2[Y7w](),dt[Y7w]()))plusOne=1;for(var j=0;b6S[U6j](j,appendQuotes.length);j++){if(!plusOne){if(typeof masterData[i+j]!="undefined"){if(!appendQuotes[j][X9D]&&masterData[i+j][X9D]){appendQuotes[j][X9D]=masterData[i+j][X9D];}
if(masterData[i+j][d77]){appendQuotes[j][(i0c+n1M)]=masterData[i+j][d77];}
if(b6S[Y3M](masterData[i+j][c9R],appendQuotes[j][c9R])){appendQuotes[j][c9R]=masterData[i+j][c9R];}
if(masterData[i+j][Q6I]&&b6S[l1C](masterData[i+j][Q6I],appendQuotes[j][Q6I])){appendQuotes[j][Q6I]=masterData[i+j][Q6I];}
}
for(var field in this[X1c][m2T]){if(typeof appendQuotes[j][field]=="undefined"&&typeof masterData[i+j]!=(X7M+l21+K8M+J1C+b6S.l2M))appendQuotes[j][field]=masterData[i+j][field];}
for(var p in this[K41]){if(this[K41][p][b0M]){for(var sq in this[K41][p][b0M]){if(!this[K41][p][b0M][sq])continue;if(typeof appendQuotes[j][sq]=="undefined"&&typeof masterData[i+j]!="undefined")appendQuotes[j][sq]=masterData[i+j][sq];}
}
}
}
masterData[i+j+plusOne]=appendQuotes[j];if(masterData[i+j+plusOne][q4c])masterData[i+j+plusOne][(W31)]=STX[Z87](masterData[i+j+plusOne][q4c]);else masterData[i+j+plusOne][(q4c)]=STX[a5c](masterData[i+j+plusOne][(F3j+V6j+b6S.I2M)]);masterData[i+j+plusOne][X9D]=parseInt(masterData[i+j+plusOne][X9D],10);if(!STXChart[m8R](this[k5I][k9w]))this[c71](this[B6w][i+j+plusOne]);if(b6S[p1D](chart[s67],chart[(x1M+b6S.a9M+f3z+K8M+K6c+d0M)]+1)&&plusOne)chart[s67]++;}
break;}
i--;}
for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[C47]){if(plugin[(b6S.a9M+x0M+O0D+n1M+b6S.l2M+J1M+h7M+V0M+w9U+b6S.a9M)])plugin[E5U](this,appendQuotes,chart);}
}
}
if(!this[B6w]||b6S[y0I](this[B6w].length,0))this[B6w]=masterData;this[A01]();var sp=this[v6w];if(++sp[u7U]>sp[T4c]){clearTimeout(sp[z6I]);this[(P9c+J2I)]();sp[(U8c+b1C)]=0;sp[z6I]=-1;}
else{var self=this;if(sp[z6I]==-1){sp[z6I]=setTimeout(function(){var d4I="stream";self[(b6S.l2M+V0M+J3j)]();self[v6w][u7U]=0;self[(d4I+J6j+K8j+b6S.a9M+s81+k8U)][z6I]=-1;}
,sp[C7T]);}
}
this[s3C]();this[W2T]("appendMasterData",arguments);}
;STXChart.prototype.setRange=function(params,dtRight,padding,chart){var t7z="e5B",x8U="pace",g77="whi",b5T="X5B",L0c="D5B",z8M="u5B",u8w="L5B",J2D="T5B",w5M="o5B",G91="d5B",K6U="E5B",e8c="k5B",l2c="l5B",j17="Z5B",v7w="goIntoFuture",z3j="H5B",S9z="n5B",F6c="S5B",D7R="dtRight",A6C="a2B",S0I="dtLeft",q2w="eSpa",m0R="ust",c6c="f2B",F7c="adjustWhiteSpace",u97="p2B";if(STX[T1M](params)){params={dtLeft:params,dtRight:dtRight,padding:padding,chart:chart,goIntoFuture:false,adjustWhiteSpace:true}
;}
if(!params[(b6S.j3c+b6S.a9M+P8U)])params[X1c]=this[X1c];if(!params[Q5M])params[Q5M]=0;if(b6S[u97](params[F7c],false)&&b6S[c6c](params[F7c],true))params[(b6S.a9M+b6S.l2M+D1M+m0R+i7M+L0z+b6S.K7M+q2w+o2M+b6S.I2M)]=true;var chart=params[X1c],ltMS=params[S0I][Y7w](),rtMS=null,b=b6S[A6C](chart[g91].length,1);if(params[D7R]){rtMS=params[D7R][(z3C+R9M+K8M+c77)]();for(;b6S[F6c](b,0);b--){var prices=chart[g91][b];if(b6S[S9z](prices[q4c][Y7w](),rtMS)){break;}
}
if(b6S[z3j](b,chart[g91].length-1)&&params[v7w]){var dt=chart[g91][b6S[j17](chart[g91].length,1)][q4c];for(var i=0;b6S[l2c](i,20000);i++){if(b6S[e8c](dt[Y7w](),rtMS))break;b++;dt=STX[(W1R+v5M+C4z+Z0M+b6S.I2M+b6S.K7M)][Q9C](dt,this[k5I][k9w],1,this);}
}
}
if(b6S[K6U](b,0))return ;for(var a=b;b6S[G91](a,0);a--){if(b6S[w5M](a,chart[g91].length))continue;var prices=chart[(b6S.l2M+V6j+b6S.a9M+W9C)][a];if(b6S[J2D](prices[q4c][Y7w](),ltMS)){break;}
}
var ticks=b6S[(b6j+p71+Q41)](b,a);if(b6S[u8w](ticks,1))return ;this[H7D](b6S[z8M]((this[(b6S.j3c+b6S.a9M+P8U)].width-params[Q5M]),ticks),chart);chart[s67]=(b6S[L0c](chart[(k4c+m91+b6S.I2M+b6S.K7M)].length,b))+Math[(t3U+D1C)](b6S[b5T]((this[X1c].width-params[Q5M])/this[k5I][h4U],.499))-1;if(params[F7c])this[X3M][(g77+b6S.K7M+l5D+x8U)]=b6S[t7z]((chart[T4c]-chart[s67]),this[k5I][h4U]);this[Y5M]();this[H2M]("layout");}
;STXChart.prototype.setSpan=function(period,interval,padding,chart,useMarketTZ){var D1R="setRange",C5c="C4B",I2w="e4B",W5w="X4B",g3j="u4B",Q9w="L4B",C21="rke",t8I="O4B",r0I="setTime",u6D="T4B",p2R="getDailyCycleStartTime",r2T="o4B",Z1U="v4B",W7w="s4B",H8j="evDa",C6c="j4B",a6I="b4B",P77="g4B",p0U="V4B",F1D="ear",f4w="q4B",I9z="N5B",z47="C5B";if(!chart)chart=this[X1c];if(b6S[z47](period,1))return ;if(!chart[(b6S.l2M+b6S.a9M+b6S.K7M+T9I+b6S.K7M)].length)return ;var leftDT=new Date(chart[g91][b6S[I9z](chart[g91].length,1)][q4c][Y7w]());if(b6S[f4w](interval,"year")){leftDT[(P6j+H6j+U0I+E1M+t4M+F1D)](b6S[p0U](leftDT[D0I](),period));}
else if(b6S[P77](interval,"month")){leftDT[(P6j+b6S.K7M+X8j+S7D+b6S.K7M+E8M)](b6S[a6I](leftDT[C2T](),period));}
else if(b6S[C6c](interval,"day")){if(STXChart[m8R](this[k5I][k9w])){if(useMarketTZ)leftDT=STX[N77][(x0M+V0M+H8j+g2I)](leftDT,b6S[W7w](period,1),this);else leftDT[I5M](b6S[Z1U](leftDT[n8C](),period,1));}
else{if(useMarketTZ&&chart[g91][b6S[r2T](chart[g91].length,1)][l41]){var startDT=STX[N77][p2R](leftDT,chart);if(b6S[u6D](startDT[(l9z+i2c+c77)](),leftDT[Y7w]()))startDT=STX[N77][g07](startDT,1,this);leftDT[r0I](startDT[Y7w]());}
else{leftDT[l6I](0,0,0,0);}
for(var i=0;b6S[t8I](i,period-1);i++){leftDT=STX[(i1z+g2I+X8j+b6S.a9M+C21+b6S.K7M)][g07](leftDT,1,this);}
}
}
else if(b6S[(Q9w)](interval,"week")){leftDT[I5M](b6S[g3j](leftDT[n8C](),(7*period)));}
else if(b6S[(F3j+V01+Q41)](interval,"hour")){leftDT[l6I](b6S[W5w](leftDT[C6I](),period));}
else if(b6S[(I2w)](interval,"minute")){leftDT[D5T](b6S[C5c](leftDT[L8R](),period));}
this[D1R](leftDT,null,padding,chart);}
;STXChart.prototype.getSpanCandleWidth=function(span){var J5T="u7B",V91="B7B",j8c="m7B",S9c="I7B",G2I="v7B",H1z="s7B",N1R="j7B",i9z="b7B",P31="V7B",P0R="q7B",Z41="N4B",arr=span[T91](",");if(b6S[Z41](arr.length,2))return ;var num=parseFloat(arr[0]),now=new Date(),prev=new Date();if(b6S[P0R](arr[1],"year")){prev[z1U](b6S[P31](prev[D0I](),num));}
else if(b6S[(o61+Q41)](arr[1],"month")){prev[q6U](b6S[i9z](prev[C2T](),num));}
else if(b6S[N1R](arr[1],"day")){prev[I5M](b6S[H1z](prev[n8C](),num));}
else if(b6S[G2I](arr[1],"week")){prev[I5M](b6S[S9c](prev[n8C](),(7*num)));}
var diff=b6S[j8c]((now[Y7w]()-prev[Y7w]()),1000,60,60,24);diff=b6S[V91](diff,5,7);var candleWidth=b6S[J5T](this[X1c].width,diff);return candleWidth;}
;STXChart.prototype.setMaxTicks=function(ticks){var b6w="e7B",Z6R="X7B",J81="D7B";this[k5I][h4U]=b6S[J81]((this[X1c].width),ticks);if(b6S[Z6R](this[k5I][h4U],b6S.M1j))this[k5I][h4U]=b6S.n8j;this[X1c][T4c]=Math[y1c](b6S[b6w]((this[X1c].width/this[k5I][h4U]),.499));}
;STXChart.prototype.initializeChart=function(container){var H4T="tec",X4M="attachEvent",J3w="resizeListenerInitialized",t1C="tia",a7I="ini",k27="registerTouchAndMouseEvents",m2w="U0B",p2D="i0B",n0w="djus",G7I="J0B",G3M="ctx",G9w="tHR",w2C="mpCanv",f4R="blo",N4D="ager",W3I="nvasMan",C07="ml",Q5w="initElement",C0R="G_vmlCanvasManager",D2w="querySelectorAll",Q4I="j0B",i9U="b0B",a5w="g0B",b9c="V0",u01="q0B",o4I="registerHTMLElements",X9R="registeredContainers",r87="STXRegistered",y5w="N7B",G5U="setTimeZone",K07="defaultDisplayTimeZone",Y71="yZon",J1c="setLocale",F3M="cale",z1C="C7B";if(this[W0M]("initializeChart",arguments))return ;if(b6S[z1C](this[(T3R+F3M)],null))this[J1c](this[I4U]);if(!this[(b6S.l2M+K8M+c2M+E1M+b6S.a9M+Y71+b6S.I2M)]&&STXChart[K07]){this[G5U](null,STXChart[K07]);}
if(!this[a5C]&&b6S[y5w](this[a5C],0))this[(g2I+u0C+g2U+b6S.I2M+k5z)]=this[s5I];if(container)this[X1c][w8w]=container;this[X1c][w8w][r9T]=this;if(!this[X1c][w8w][r87]){this[X1c][w8w][r87]=true;STXChart[X9R][I57](this[X1c][w8w]);}
if(STX[(S7T+E8j+X7M+V0M+q6M+b6S.a9M+Y3c)]){if(!this[k2w]){this[k2w]=new MSGesture;if(this[X3R]){this[k2w][E4c]=this[X1c][(o2M+c1M+F4C+F4M+n1M+i2D)];}
else{this[k2w][E4c]=document[l4U];}
this[h3I]=null;}
}
this[o4I]();if(b6S[u01](this[X1c].canvas,null)&&document[i4w]("canvas")[j2I]){if(b6S[(b9c+Q41)](this[X1c].canvas[X5w],"")){this[X1c][w8w][n3j](this[X1c].canvas);this[X1c].canvas=null;}
if(this[X1c][B3c]&&b6S[a5w](this[X1c][B3c][X5w],"")){this[X1c][w8w][n3j](this[X1c][B3c]);this[X1c][B3c]=null;}
}
else{if(b6S[i9U](this[k5I][h4U],this[Y6U])||b6S[Q4I](this[k5I][h4U],50))this[k5I][h4U]=8;}
if(!this[X1c].canvas)this[X1c].canvas=document[i4w]("canvas");if(!this[X1c].canvas[j2I]){this[X1c].canvas=this[X1c][w8w][D2w]("#ie8canvas")[0];if(!this[(o2M+V8z+V0M+b6S.K7M)].canvas[j2I]){if(window[C0R])G_vmlCanvasManager[Q5w](this[X1c].canvas);}
this[(o2M+v9T)].canvas[(w2M+g2I+O1R)][(Z3I+N3j)]="block";}
else{this[X1c][w8w][Z7z](this[X1c].canvas);}
this[X1c].canvas[W4w][o3C]="absolute";this[X1c].canvas[W4w][q3M]="0px";this[X1c][o4z]=this[X1c].canvas[j2I]((G3I+b6S.l2M));this[X1c].canvas[o4z]=this[X1c][o4z];this[(X1c)][(o2M+c1M+n1M+b6S.K7M+q31+b6S.K7M)].lineWidth=1;if(!this[X1c][B3c])this[X1c][B3c]=document[i4w]((N3c+c4C+c6j));if(!this[X1c][B3c][j2I]){this[X1c][B3c]=this[X1c][w8w][D2w]("#ie8canvasTemp")[0];if(!this[X1c][B3c][j2I]){if(window[(H9M+D4I+C07+I41+b6S.a9M+W3I+N4D)])G_vmlCanvasManager[Q5w](this[X1c][B3c]);}
this[X1c][B3c][(w2M+h3C)][C47]=(f4R+K6c);}
else{this[(o2M+E8M+i1M)][w8w][Z7z](this[X1c][B3c]);}
this[(o2M+E8M+K8j+b6S.K7M)][(b6S.K7M+b6S.I2M+w2C+c6j)][W4w][o3C]="absolute";this[X1c][B3c][(w2M+h3C)][q3M]="0px";this[X1c][B3c][o4z]=this[X1c][B3c][j2I]("2d");this[X1c][B3c][o4z].lineWidth=1;this[E8z]();var arrowCanvas=this[b9M][(q6M+E1M+w81+G9w)][P8M][0];if(window[C0R]){G_vmlCanvasManager[Q5w](arrowCanvas);arrowCanvas[W4w][o3C]="absolute";arrowCanvas.style.top="-7px";arrowCanvas[W4w][q3M]="-8px";arrowCanvas.height=20;}
arrowCanvas[G3M]=arrowCanvas[j2I]('2d');var margin=3,extraWidthForArrowTip=b6S[(d0M+U2D)]((this[f8w]("stx_yaxis")+margin*2),2);arrowCanvas.width=(this[a5C])+extraWidthForArrowTip;arrowCanvas.height=20;this[D1U](arrowCanvas,arrowCanvas[G3M]);arrowCanvas[I31]=false;if(STX[M7C]){this[X1c][B3c][K5T]=function(e){if(e[k61])e[k61]();}
;}
if(b6S[G7I](this[(k6D+l9M)]["chart"],null)){this[X2C](this[X1c][F3I],(o2M+E8M+i1M),1);}
else{this[K41]["chart"][C47]=this[X1c][F3I];if(this[(X1c)][l27])this[K41]["chart"][C47]=this[X1c][l27];}
this[(b6S.a9M+n0w+b6S.K7M+n3M+J1C+E1M+J6j+O3U+b6S.K7M+A7T+n1M+d0M)]();this[X1c][c7D]=this[K41][this[X1c][T5U]];this[E4C](this[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)][c7D][c3I]);if(this[X1c][g91]&&b6S[p2D](this[X1c][g91].length,0)){this[X1c][(f0R+c1M+E1M+E1M)]=this[X1c][T4c];var wsInTicks=Math[y1c](b6S[m2w](this[X3M][a87],this[k5I][h4U]));this[X1c][s67]-=wsInTicks;}
if(STX[B0z]){var overlayTrashCan=this[X1c][w8w][D2w]("#overlayTrashCan")[0],vectorTrashCan=this[X1c][w8w][D2w]("#vectorTrashCan")[0];if(overlayTrashCan)overlayTrashCan[v0z]=overlayTrashCan[b7z]=(function(self){return function(e){var n4U=5774256,i2I=9221383,v2c=623594336,k71=1559151117;var H1j=k71,P1j=v2c,V1j=b6S.G1j;for(var Y1j=b6S.p1j;b6S.d0j.J0j(Y1j.toString(),Y1j.toString().length,i2I)!==H1j;Y1j++){isUpTrend?(this.outer.p0[b6S.M1j]=x):(this.outer.p1[b6S.M1j]=x);V1j+=b6S.G1j;}
if(b6S.d0j.J0j(V1j.toString(),V1j.toString().length,n4U)!==P1j){plugin.drawUnder(this,chart);this.createDataSet();return U4L-y4L;}
self[J9C]();}
;}
)(this);if(vectorTrashCan)vectorTrashCan[v0z]=vectorTrashCan[b7z]=(function(self){return function(e){self[J9C]();}
;}
)(this);}
if(this[X3R]){this[k27]();}
this[X1c][w8w][y11]=(function(self){return function(e){var O4R="eOu",C17="ous";self[(E8M+m1j+b6S.l2M+E1M+b6S.I2M+X8j+C17+O4R+b6S.K7M)](e);}
;}
)(this);if(this[b9M][o57]){this[b9M][o57][W4w][C47]="block";}
this[k21]();for(var panelName in this[K41]){var panel=this[K41][panelName];if(panel[r7I]){this[X1c][w8w][n3j](panel[r7I]);panel[r7I]=null;}
}
for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[C47]){if(plugin[(a7I+t1C+E1M+T7w+N7z+V0M+b6S.K7M)])plugin[P0M](this);}
}
if(!this[J3w]){this[J3w]=true;var closure=function(self){return function(e){self[C7R]();}
;}
;if(window[X4M]){window[X4M]("onresize",closure(this));}
else{var c=closure(this);window[m8c]((V0M+b6S.I2M+d0M+T7w),c,true);this[c7M][I57]({"element":window,"event":"resize","function":c}
);}
}
this[c0U](this[(N4U+h8c+F3j+b6S.I2M+H4T+b6S.K7M+X8j+E8j)]);this[W2T]("initializeChart",arguments);}
;STXChart.prototype.destroy=function(){var d8j="removeEventListener",z41="x0B";this[c0U](0);if(this[b3D])this[b3D][E3z]();this[J1I]={}
;for(var i=0;b6S[z41](i,this[c7M].length);i++){var listener=this[c7M][i];listener["element"][d8j](listener[(B61+j9D+b6S.K7M)],listener["function"]);}
}
;STXChart.prototype.handleMouseOut=function(e){var q0U="handleMouseOut",g17="withinElement";e=e||window[G01];if(!STX[g17](this[X1c][w8w],e[E1R],e[H8R])){if(this[W0M](q0U,arguments))return ;this[j3C]();this[r61]=u27;this[O61]=[];this[F81]=u27;if(this[T5D]&&this[L3R]){this[L3R]=u27;this[e11]=u27;var cy=this[A5M](e[H8R]),cx=this[g4M](e[E1R]);this[M2D](this[Q4R],cx,cy);}
STXChart[r2z]=u27;this[a0M]();this[W2T](q0U,arguments);}
}
;STXChart.prototype.registerTouchAndMouseEvents=function(){var V7D="Sc",z7w="ouse",R3z="MM",Z9U="DO",O3R="mousewheel",b3I="Q0B",I1z="wheel",U3z="F0B",P7U="onMouseOut",x91="removeAttribute",U7z="onMouseOver",S2w="ntL",I6M="dEv",H67="star",o3R="npoin",Q4z="onpointerup",O7I="poi",B8M="pointermove",K6w="entL",A8D="ddEv",o2U="pointerdown",o8M="ner",X9U="tList",s7D="ddEven",V9D="eru",S4D="oi",S71="nmsp",L4I="MSPointerUp",r17="moveProxy",y4U="MSPointerMove",q1c="MSGestureEnd",O7C="MSGestureChange",G57="MSGestureStart",N21="startProxy",V0U="MSPointerDown",O6M="msPointerEnabled",P1C="navigator",w31="oncl",K5U="ntListe",I7U="addE",I5R="#home",E77="touchAndMouseEventsRegistered";if(this[E77])return ;this[E77]=w2T;var el=this[(b6S.j3c+b6S.a9M+P8U)][w8w],homeEl=$$$(I5R,this[b9M][o57]),zoomInEl=$$$(C6R,this[b9M][o57]),zoomOutEl=$$$(k7D,this[b9M][o57]);if(!STX[B0z]){el[(I7U+r8I+K5U+n1M+i2D)](c8I,(function(self){return function(e){var f7T="semo";self[(x1M+c1M+X7M+f7T+r2I+b6S.I2M)](e);}
;}
)(this),u27);el[m8c](k67,(function(self){return function(e){self[k67](e);}
;}
)(this),u27);el[m8c](T9c,(function(self){return function(e){self[T9c](e);}
;}
)(this),u27);if(homeEl)homeEl[(w31+K8M+o2M+S8M)]=(function(self){return function(e){self[y67]();}
;}
)(this);if(zoomInEl)zoomInEl[s9I]=(function(self){return function(e){self[a3M](e);}
;}
)(this);if(zoomOutEl)zoomOutEl[s9I]=(function(self){return function(e){self[Z8j](e);}
;}
)(this);}
else{if(STX[a3z]){el[m8c](c8I,(function(self){return function(e){var Q5I="msMouseMoveProxy";self[Q5I](e);}
;}
)(this),u27);el[m8c](k67,(function(self){return function(e){var z07="msMouseDownProxy";self[z07](e);}
;}
)(this),u27);el[m8c](T9c,(function(self){var p37=4321320,z5U="osit",j6I="sol",C9U="erro",I0T=7036063,s7U=571571918,d9z=1003739004;var w1j=-d9z,b1j=-s7U,Z1j=b6S.G1j;for(var g1j=b6S.p1j;b6S.d0j.J0j(g1j.toString(),g1j.toString().length,I0T)!==w1j;g1j++){context.lineTo(x0,cache.open);F(b6S.N1j);STX.alert((C9U+V0M+y01+o2M+S7D+j6I+K8M+t61+b6S.I2M+b8c+R6z+B1I+V0M+b6S.I2M+b6S.K7M+X7M+V0M+n1M+b6S.I2M+b6S.l2M+B1I+n1M+b6S.I2M+k6C+z1M+r8I+B1I+x0M+z5U+A7T+n1M));Z1j+=b6S.G1j;}
if(b6S.d0j.J0j(Z1j.toString(),Z1j.toString().length,p37)!==b1j){return d0q-J0q;}
return function(e){var W5z="msMouseUpProxy";self[W5z](e);}
;}
)(this),u27);if(window[P1C][O6M]){el[m8c](V0U,(function(self){return function(e){return self[N21](e);}
;}
)(this),u27);el[m8c](G57,(function(self){return function(e){var h5D="nEff",b5c="eI";self[(Z6M+l5D+b6S.K7M+N4I+b5c+h5D+b6S.I2M+o2M+b6S.K7M)]=w2T;}
;}
)(this),u27);el[m8c](O7C,(function(self){return function(e){return self[u2R](e);}
;}
)(this),u27);el[m8c](q1c,(function(self){return function(e){self[O2D]=u27;return self[R1w](e);}
;}
)(this),u27);el[m8c](y4U,(function(self){return function(e){self[r17](e);}
;}
)(this),u27);el[m8c](L4I,(function(self){return function(e){var w4D="dPro";return self[(j9D+w4D+s2I+g2I)](e);}
;}
)(this),u27);if(homeEl)homeEl[v0z]=(function(self){return function(e){self[y67]();}
;}
)(this);if(zoomInEl)zoomInEl[(c1M+S71+S4D+F4C+V9D+x0M)]=(function(self){return function(e){self[a3M](e);}
;}
)(this);if(zoomOutEl)zoomOutEl[v0z]=(function(self){return function(e){self[Z8j](e);}
;}
)(this);}
else{el[(b6S.a9M+s7D+X9U+b6S.I2M+o8M)](o2U,(function(self){return function(e){return self[N21](e);}
;}
)(this),u27);el[m8c](G57,(function(self){return function(e){self[O2D]=w2T;}
;}
)(this),u27);el[m8c](O7C,(function(self){return function(e){return self[u2R](e);}
;}
)(this),u27);el[m8c](q1c,(function(self){return function(e){self[O2D]=u27;return self[(o0c+o2M+E8M+j9D+b6S.l2M)](e);}
;}
)(this),u27);el[(b6S.a9M+A8D+K6w+K8M+d0M+b6S.K7M+b6S.I2M+n1M+i2D)](B8M,(function(self){return function(e){self[r17](e);}
;}
)(this),u27);el[m8c]((O7I+S1z+X8U+x0M),(function(self){return function(e){var B1D="endProxy";return self[B1D](e);}
;}
)(this),u27);if(homeEl)homeEl[Q4z]=(function(self){return function(e){self[y67]();}
;}
)(this);if(zoomInEl)zoomInEl[(c1M+o3R+b6S.K7M+i2D+o7I)]=(function(self){return function(e){self[a3M](e);}
;}
)(this);if(zoomOutEl)zoomOutEl[Q4z]=(function(self){return function(e){self[Z8j](e);}
;}
)(this);}
}
else{if(!STX[w6I]&&!STX[A8R]){el[m8c](c8I,(function(self){return function(e){var y4w="iosMouseMoveProxy";self[y4w](e);}
;}
)(this),u27);el[m8c](k67,(function(self){return function(e){var L5C="iosMouseDownProxy";self[L5C](e);}
;}
)(this),u27);el[m8c](T9c,(function(self){return function(e){var m9R="rox",p4D="pP",e2c="Mou";self[(K8M+F9D+e2c+P6j+N4M+p4D+m9R+g2I)](e);}
;}
)(this),u27);}
el[m8c]((o0c+b6S.j3c+H67+b6S.K7M),(function(self){return function(e){self[t2U](e);}
;}
)(this),u27);el[(O5M+I6M+b6S.I2M+S2w+S7T+b6S.K7M+b6S.I2M+n1M+b6S.I2M+V0M)](u2R,(function(self){return function(e){self[u2R](e);}
;}
)(this),u27);el[m8c](R1w,(function(self){return function(e){self[R1w](e);}
;}
)(this),u27);if(homeEl)homeEl[b7z]=(function(self){return function(e){self[y67]();}
;}
)(this);if(zoomInEl){zoomInEl[b7z]=(function(self){return function(e){var W8M=((145.,91.30E1)>=(2,2.010E2)?(0xFE,6888585):135.1E1<(1.1E3,0x15E)?(23,0xBF):(1.486E3,10.63E2)),W9z=5050190,A3c=2080439604,N7R=2068632011;var j1j=-N7R,k1j=A3c,c1j=b6S.G1j;for(var l1j=b6S.p1j;b6S.d0j.J0j(l1j.toString(),l1j.toString().length,W9z)!==j1j;l1j++){zoomOutEl.removeAttribute(U7z);c1j+=b6S.G1j;}
if(b6S.d0j.J0j(c1j.toString(),c1j.toString().length,W8M)!==k1j){return q8B-n8B;}
self[a3M](e);}
;}
)(this);zoomInEl[F5T]=(function(self){return function(e){self[a3M](e);}
;}
)(this);zoomInEl[x91](U7z);zoomInEl[x91](P7U);}
if(zoomOutEl){zoomOutEl[b7z]=(function(self){return function(e){self[Z8j](e);}
;}
)(this);zoomOutEl[F5T]=(function(self){return function(e){self[Z8j](e);}
;}
)(this);zoomOutEl[x91](U7z);zoomOutEl[x91](P7U);}
}
}
var wheelEvent=b6S[U3z](I1z,document[i4w]((b6S.l2M+K8M+r2I)))?I1z:b6S[b3I](document[g8R],undefined)?O3R:(Z9U+R3z+z7w+V7D+V0M+h8j);el[m8c](wheelEvent,(function(self,wheelEvent){return function(e){self[J7C](e,wheelEvent);}
;}
)(this,wheelEvent),u27);}
;STXChart.prototype.rightClickHighlighted=function(){if(this[W0M](s4U,arguments))return ;this[J9C](w2T);this[(V0M+j8R+k5c+x6R)](s4U,arguments);}
;STXChart.prototype.deleteHighlighted=function(callRightClick){var T8j="man",I2U="rl",y4D="eOve",D5D="ghte",q6w="hl",i9M="G0B",Q4T="leCl",Q0I="lTouc";if(this[W0M]("deleteHighlighted",arguments))return ;this[(N3c+n1M+o2M+b6S.I2M+Q0I+E8M+E8j+K8M+X5C+Q4T+c7w+S8M)]=true;STX[n2M](this[X1c][B3c],this);for(var i=b6S[i9M](this[k2c].length,1);b6S[(x0M+l91+Q41)](i,0);i--){var drawing=this[k2c][i];if(drawing[(L0z+Z6M+q6w+K8M+D5D+b6S.l2M)]&&!drawing[l4c]){var dontDeleteMe=drawing.abort();if(!dontDeleteMe){this[q91]();this[k2c][F57](i,1);}
this[H2M]("vector");}
}
for(var name in this[z0z]){var o=this[z0z][name];if(o[Q3c]&&!o[(O0D+r2U+m1j+b6S.I2M+n1M+b6S.K7M)]){if(callRightClick)this[A7z](name);else this[(V0M+u9D+c1M+r2I+y4D+I2U+N3j)](name);}
}
for(var field in this[(A7c+V0M+V0M+j9D+b6S.K7M+J6j+m1j+l7D)][X1c][m2T]){var series=this[Q4R][X1c][m2T][field];if(series[Q3c]&&!series[(x0M+b6S.I2M+V0M+T8j+j9D+b6S.K7M)]){this[w7c](field,this[Q4R][X1c]);}
}
this[Y5M]();if(this[b9M][H4D]){this[b9M][H4D][W4w][C47]="none";this[b9M][H4D][z8C][0][Z9c]="";}
this[W2T]("deleteHighlighted",arguments);}
;STXChart.prototype.panelExists=function(name){var m1R="f0B";for(var p in this[K41]){var panel=this[K41][p];if(b6S[m1R](panel[T5U],name))return w2T;}
return u27;}
;STXChart.prototype.hideCrosshairs=function(){this[T2R]=u27;}
;STXChart.prototype.showCrosshairs=function(){this[T2R]=w2T;}
;STXChart.prototype.grabHandle=function(e,panel){if(e[k61])e[k61]();if(!panel)return u27;STXChart[L61]=panel.top+this.chart.top;STXChart[Q9I]=panel;this[C6w]();return u27;}
;STXChart.prototype.releaseHandle=function(e){if(e[k61])e[k61]();STX[n2M](this[X1c][B3c],this);this[O5R]();STXChart[Q9I]=F4U;}
;STXChart.prototype.storePanels=function(){var x7w="a0B";if(b6S[x7w](this[k5I],F4U))this[k5I]={}
;var view=this[k5I];view[K41]={}
;for(var p in this[K41]){var panel=this[K41][p];view[K41][panel[T5U]]={"percent":panel[N71],"display":panel[C47]}
;}
}
;STXChart.prototype.savePanels=function(saveLayout){var J67="S1B";this[X3D]();if(b6S[J67](saveLayout,u27))this[H2M](k5I);}
;STXChart.prototype.resolveY=function(y){return this.chart.top+y;}
;STXChart.prototype.resolveX=function(x){return this[X1c][q3M]+x;}
;STXChart.prototype.backOutY=function(y){var J4T="n1B";return b6S[J4T](y,this.chart.top);}
;STXChart.prototype.backOutX=function(x){var c4z="H1B";return b6S[c4z](x,this[X1c][q3M]);}
;STXChart.prototype.privateDeletePanel=function(panel){var m1w="l1B";if(this[k5I][j7C])delete  this[k5I][j7C][panel[T5U]];delete  this[K41][panel[T5U]];for(var spm in STX[a4w][J6w]){if(b6S[(q4M+I91+Q41)](STX[a4w][J6w][spm][c7D],panel[T5U]))delete  STX[a4w][J6w][spm];}
for(var series in this[z0z]){if(b6S[m1w](this[z0z][series][c7D],panel[T5U])){delete  this[k5I][j7C][series];delete  this[z0z][series];}
}
if(panel[K57]){this[X1c][w8w][n3j](panel[o1I]);this[(b6S.j3c+K8j+b6S.K7M)][w8w][n3j](panel[(E8M+m1j+b6S.l2M+E1M+b6S.I2M)]);if(panel[(o2M+E1M+F9D+H6D)])this[X1c][w8w][n3j](panel[l8C]);}
}
;STXChart.prototype.panelClose=function(panel){var j6c="ePa",a5I="Del",s77="iva",z4I="k1B",F5z="panelSolo";if(!panel)return ;if(this[W0M](F3R,arguments))return ;this[V6z]=w2T;STXChart[e11]=u27;if(panel[g4T])this[F5z](panel);if(this[F1w][panel[T5U]]){for(var panelName in this[K41]){var subPanel=this[K41][panelName];if(b6S[z4I](subPanel[X1c][T5U],panel[T5U])){this[(x0M+V0M+s77+b6S.K7M+b6S.I2M+a5I+b6S.I2M+b6S.K7M+j6c+h0M)](subPanel);}
}
delete  this[F1w][panel[T5U]];}
else{this[C1R](panel);}
this[W5T]();this[A01]();this[G2R]();this[Y5M]();this[N6R]();this[W2T](F3R,arguments);}
;STXChart.prototype.deleteAllPanels=function(){for(var p in this[K41]){var panel=this[K41][p];this[C1R](panel);}
this[(L57+r7T+X7M+b6S.K7M)][(k6D+l9M)]={}
;this[K41]={}
;}
;STXChart.prototype.panelUp=function(panel){var Y6j="y1B",P9T="m1B",L4T="I1B",H8C="E1B";this[V6z]=w2T;STXChart[e11]=u27;this[W5T]();var newPanels={}
,pos=b6S.M1j;for(var p in this[K41]){if(b6S[H8C](p,panel[T5U]))break;pos++;}
if(b6S[L4T](pos,b6S.M1j))return ;var i=b6S.M1j;for(var p in this[K41]){if(b6S[P9T](i,pos-b6S.p1j))newPanels[panel[T5U]]=panel;if(b6S[Y6j](p,panel[T5U]))continue;newPanels[p]=this[(x0M+b6S.a9M+J1C+i67)][p];i++;}
this[K41]=newPanels;this[G2R]();this[Y5M]();this[N6R]();}
;STXChart.prototype.panelDown=function(panel){var N7c="A1B",x41="r1B",P47="B1B",k37="owC";this[V6z]=true;STXChart[e11]=false;this[(W3j+k37+b6U+e9M+E8M+F4M+k8U)]();var newPanels={}
,pos=0;for(var p in this[K41]){if(b6S[P47](p,panel[T5U]))break;pos++;}
var length=0;for(var p in this[(k6D+n1M+b6S.I2M+E1M+d0M)])length++;if(b6S[x41](pos,length-1))return ;var i=0;for(var p in this[K41]){if(b6S[(C6j+I91+Q41)](p,panel[T5U])){i++;continue;}
newPanels[p]=this[(x0M+b6S.a9M+n1M+l7D+d0M)][p];if(b6S[N7c](i,pos+1))newPanels[panel[T5U]]=panel;i++;}
this[K41]=newPanels;this[G2R]();this[Y5M]();this[N6R]();}
;STXChart.prototype.panelSolo=function(panel){var I7R="elPosit",m61="stPan",j7M="adju",r37="h1B",s7I="oldPer",N8U="R1B",v6j="oldPercent",C0z="stx_solo_lit",Y6D="M1B";this[V6z]=w2T;STXChart[e11]=u27;this[W5T]();var hideOrNot=w2T;if(b6S[Y6D](panel[g4T],w2T)){hideOrNot=u27;panel[g4T]=u27;STX[V7c](panel[e1R],C0z);panel[N71]=panel[v6j];this[K41][X1c][N71]=this[K41][X1c][v6j];}
else{panel[g4T]=w2T;STX[y6c](panel[e1R],C0z);if(b6S[N8U](panel[T5U],X1c)){panel[(s7I+o2M+b6S.I2M+F4C)]=panel[N71];}
else{panel[v6j]=panel[N71];this[K41][X1c][v6j]=this[K41][X1c][N71];panel[N71]=b6S[r37](b6S.p1j,this[(k6D+l9M)][X1c][N71]);}
}
for(var p in this[K41]){this[K41][p][K2R]=hideOrNot;}
this[K41][X1c][K2R]=u27;panel[K2R]=u27;this[(j7M+m61+I7R+K8M+c1M+T4C)]();this[Y5M]();this[N6R]();}
;STXChart.prototype.calculatePanelPercent=function(panel){var w8c="Y8B",q6j=1176804,K9w=3633814,j1U=((0x10C,0x5)<=(0x208,0x125)?(0x229,1020457100):(138.6E1,1.074E3)<=(0x11B,0x21C)?0xDA:(0x1DB,6.61E2)<(2.69E2,65.)?"R":(76.,0x10)),w9T=1829050193,v6D="z8B",h=b6S[v6D](panel[f97],panel.top);var E1j=w9T,W1j=-j1U,s1j=b6S.G1j;for(var t1j=b6S.p1j;b6S.d0j.J0j(t1j.toString(),t1j.toString().length,K9w)!==E1j;t1j++){s1j+=b6S.G1j;}
if(b6S.d0j.J0j(s1j.toString(),s1j.toString().length,q6j)!==W1j){return X6g-p6g;}
panel[N71]=b6S[w8c](h,this[X1c][i1w]);}
;STXChart.prototype.resizePanels=function(){var c11="zing",B5z="i8B",Z8R="J8B",k81="W8B",w9w="calculatePanelPercent",l8z="t8B",p41="c8B",X7T="w8B",g4w="P8B";if(b6S[g4w](STXChart[(N4U+d0M+h5T+K8M+n1M+Z6M+J6j+u1D+E1M)],F4U))return ;var up=w2T;if(b6S[X7T](STXChart[L61],this[I6C](STXChart.resizingPanel.top)))up=u27;if(up){var priorPanel=F4U;for(var p in this[K41]){if(b6S[p41](this[K41][p],STXChart[Q9I]))break;if(this[K41][p][K2R])continue;priorPanel=this[K41][p];}
var newY=this[A5M](STXChart[L61]);if(b6S[l8z](newY,priorPanel.top+a6M)){newY=priorPanel.top+a6M;STXChart[L61]=this[I6C](newY);}
priorPanel[f97]=newY;STXChart.resizingPanel.top=newY;this[w9w](priorPanel);this[w9w](STXChart[Q9I]);}
else{var priorPanel=F4U;for(var p in this[K41]){if(b6S[k81](this[K41][p],STXChart[Q9I]))break;if(this[K41][p][K2R])continue;priorPanel=this[K41][p];}
var newY=this[A5M](STXChart[L61]);if(b6S[Z8R](newY,STXChart[Q9I][f97]-a6M)){newY=b6S[B5z](STXChart[Q9I][f97],a6M);STXChart[L61]=this[I6C](newY);}
priorPanel[f97]=newY;STXChart.resizingPanel.top=newY;this[w9w](priorPanel);this[w9w](STXChart[(N4U+q3j+c11+n3M+n1M+b6S.I2M+E1M)]);}
this[G2R]();this[Y5M]();this[N6R]();}
;STXChart.prototype.adjustPanelPositions=function(){var X9C="i6B",P5U="sH",C4I="d6B",r9U="E6B",k1U="k6B",U9U="l6B",I3R="Z6B",X1M="H6B",x4C="n6B",p8U="S6B",q37="a8B",z3I="f8B",H9C="8B",U0U="G8B",n5C="Q8B",O3D="F8B",a3U="x8B",D9U="U8B";if(b6S[D9U](this[(b6S.j3c+K8j+b6S.K7M)][F3I],""))return ;if(this[W0M]("adjustPanelPositions",arguments))return ;var lastBottom=0,h=this[X1c][i1w],pixels=0,first=false,acc=0,n=0,activeSolo=false;for(var x in this[K41]){var panel=this[K41][x];if(isNaN(panel[N71])||b6S[a3U](panel[N71],0))panel[N71]=.05;if(panel[K2R])continue;acc+=panel[N71];n++;if(panel[g4T])activeSolo=true;}
for(var x in this[K41]){var zoomRatio=0,panel=this[K41][x];if(panel[K2R]){if(panel[l8C])panel[l8C][W4w][C47]="none";if(panel[r7I]){panel[r7I][W4w][C47]="none";}
continue;}
if(!first){first=true;panel[o7I][W4w][C47]="none";}
else{panel[o7I][W4w][C47]="";}
if(activeSolo){if(panel[g4T]){panel[e1R][W4w][C47]="";}
else{panel[(d0M+c1M+T3R)][W4w][C47]="none";}
}
else if(b6S[O3D](n,1)||b6S[n5C](n,2)){panel[e1R][W4w][C47]="none";}
else{panel[e1R][W4w][C47]="";}
if(b6S[U0U](n,1)){panel[M0R][W4w][C47]="none";}
else{panel[(M0R)][W4w][(b6S.l2M+F2U+e77)]="";}
if(panel[w1I])panel[c47][W4w][C47]="";else panel[c47][W4w][C47]="none";panel[N71]=b6S[(x0M+H9C)](panel[N71],acc);panel.top=lastBottom;panel[f97]=panel.top+(b6S[z3I](h,panel[N71]));panel.height=b6S[q37](panel[(F9M+c1M+b6S.K7M+b6S.K7M+c1M+x1M)],panel.top);var yAxis=panel[c3I];if(yAxis[E0w]&&yAxis.height){zoomRatio=b6S[p8U](yAxis[E0w],yAxis.height);}
yAxis.top=panel.top+yAxis[c9U];yAxis[f97]=b6S[x4C](panel[f97],yAxis[q8M]);yAxis.height=b6S[X1M](yAxis[f97],yAxis.top);if(zoomRatio){yAxis[E0w]=b6S[I3R](zoomRatio,yAxis.height);}
lastBottom=panel[(F9M+w7C)];if(!yAxis[o5w]&&b6S[U9U](yAxis[o5w],0)){yAxis[o5w]=100;yAxis[S4w]=0;yAxis[B8j]=100;}
yAxis[X5R]=b6S[k1U](yAxis.height,yAxis[B8j]);if(panel[r7I]){panel[r7I][W4w][C47]="block";panel[r7I][W4w].width=this[X1c].width+"px";panel.markerHolder.style.top=panel.top+"px";panel[r7I][W4w].height=panel.height+"px";}
}
if(x)this[K41][x][M0R][W4w][C47]="none";if(b6S[r9U](n,2)&&!activeSolo){this[K41]["chart"][e1R][W4w][C47]="";}
if(this[b9M][o57]&&this[K41]["chart"])this[b9M][o57][W4w][f97]=(b6S[C4I](this[X1c][(o2M+m1j+r2I+b6S.a9M+P5U+b6S.I2M+J2C+b6S.K7M)],this[K41]["chart"][f97],22))+"px";if(this[b9M][y67]&&this[(x0M+b6S.a9M+n1M+m4w)]["chart"])this[b9M][y67][W4w][f97]=(b6S[X9C](this[X1c][i1w],this[K41]["chart"][(F7U+w3M+Z7D)],22))+"px";this[H4C]();this[M7D]();this[(V0M+X7M+n1M+b6S.V71+x0M+x0M+b6S.I2M+n1M+b6S.l2M)]("adjustPanelPositions",arguments);}
;STXChart.prototype.addChart=function(name,chart){chart[T5U]=name;this[F1w][name]=chart;}
;STXChart.prototype.createPanel=function(display,name,height,chartName){var E9T="r6B",S4I="B6B",y5D="y6B",q9R="vasHeigh";if(this[W0M]("createPanel",arguments))return ;if(!chartName)chartName="chart";var h=this[X1c][(J7w+q9R+b6S.K7M)];if(!height){height=b6S[y5D](h,.20);}
var percent=b6S[S4I](height,h),reduce=b6S[E9T](1,percent);for(var p in this[(c7D+d0M)]){var panel=this[K41][p];panel[(x0M+i2D+o2M+b6S.I2M+F4C)]*=reduce;}
this[(d0M+b6S.K7M+b6S.a9M+K6c+n3M+n1M+l7D)](display,name,percent,chartName);this[G2R]();this[N6R](false);this[W2T]("createPanel",arguments);}
;STXChart.prototype.stackPanel=function(display,name,percent,chartName){var U0w="M6B",h37="dle",P7M="releaseHandle",N8C="grabHandle",D0w="hDe",A9C="ove",P1D="icon",j2D="hideCrosshairs",C5D="chart-title",K4R=".stx-ico-edit",x1C=".stx-ico-down",F8U=".stx-ico-focus",a8j=".stx-ico-up",r4w=".stx-panel-title",d5I=".stx-ico-close",H91="loseX",D1w="loc",T51="inl",b7C="closeXTemplate",w0c="handleTemplate",j9T="cloneNode",y57="iconsTemplate",W9R="Panel",s71="K6B";if(this[W0M](X2C,arguments))return ;if(!chartName)chartName=(b6S.j3c+b6S.a9M+V0M+b6S.K7M);var chart=this[F1w][chartName],isChart=(b6S[s71](name,chartName));if(isChart){display=chart[F3I];if(chart[l27])display=chart[l27];}
var panel=this[K41][name]=new STXChart[W9R](name);panel[N71]=percent;panel[X1c]=chart;panel[C47]=display;panel[o1I]=this[b9M][y57][j9T](w2T);panel[O17]=this[b9M][w0c][j9T](w2T);if($$(b7C)){panel[l8C]=$$(b7C)[j9T](w2T);panel[l8C][(d0M+w7T+b6S.I2M)][(b6S.l2M+S7T+x0M+E1M+N3j)]=(T51+z7I+i3I+F9M+D1w+S8M);panel[(o2M+H91)][X5w]=F4U;panel[L1M]=panel[l8C][z8C][b6S.M1j];}
else{panel[l8C]=F4U;panel[L1M]=panel[(o1I)][z8C][b6S.N1j];panel[L1M]=$$$(d5I,panel[o1I])[N67];}
panel[O17][X5w]=F4U;panel[o1I][W4w][C47]=X87;panel[d4R]=$$$(r4w,panel[o1I]);panel[o7I]=$$$(a8j,panel[o1I])[N67];panel[e1R]=$$$(F8U,panel[o1I])[N67];panel[(b6S.l2M+c1M+d9w)]=$$$(x1C,panel[o1I])[N67];panel[c47]=$$$(K4R,panel[o1I])[N67];if(!this[N7U])panel[o7I][W4w][C47]=s2c;if(!this[N7U])panel[M0R][W4w][C47]=s2c;if(!this[E0U])panel[e1R][W4w][C47]=(s2c);if(!this[S4U]){if(panel[l8C])panel[(o2M+E1M+c1M+d0M+H6D)][W4w][C47]=s2c;else panel[L1M][W4w][C47]=s2c;}
if(!this[h17])panel[O17][W4w][C47]=(E7C+J1C);panel[d4R][Z9c]=display;if(isChart)STX[y6c](panel[d4R],C5D);if(!STX[B0z]||STX[a3z])panel[o1I][g7D]=(function(self){return function(e){self[j2D]();}
;}
)(this);if(!STX[B0z]||STX[a3z])panel[(P1D+d0M)][y11]=(function(self){return function(e){self[W5T]();}
;}
)(this);if(panel[(o2M+H91)]){if(!STX[B0z]||STX[(S7T+E8j+N4I+q6M+b6S.a9M+Y3c)])panel[l8C][(S7D+Q17+X7M+d0M+b6S.I2M+A9C+V0M)]=(function(self){return function(){self[j2D]();}
;}
)(this);if(!STX[(b6S.K7M+c1M+m2I+D0w+r2I+c7w+b6S.I2M)]||STX[a3z])panel[l8C][y11]=(function(self){return function(){self[W5T]();}
;}
)(this);}
panel[O17][c7D]=panel;if(!STX[B0z]||STX[a3z])panel[O17][g7D]=(function(self){return function(){self[j2D]();}
;}
)(this);if(!STX[B0z]||STX[a3z])panel[(E8M+b6S.a9M+D1C+O1R)][y11]=(function(self){return function(){self[W5T]();}
;}
)(this);if(STX[B0z]){panel[O17][K5T]=(function(stx,panel){return function(e){var B91="A6B";if(b6S[B91](stx[Q9I],F4U))return ;stx[N8C](e,panel);}
;}
)(this,panel);panel[O17][b7z]=(function(stx){return function(e){stx[P7M](e);}
;}
)(this);}
panel[O17][F6z]=(function(stx,panel){return function(e){if(!e)e=event;stx[N8C](e,panel);}
;}
)(this,panel);panel[(V8z+n1M+h37)][F5T]=(function(stx){return function(e){if(!e)e=event;stx[P7M](e);}
;}
)(this);panel[L1M][s9I]=(function(stx,panel){return function(){stx[F3R](panel);}
;}
)(this,panel);panel[o7I][s9I]=(function(stx,panel){return function(){var E1z="panelUp";stx[E1z](panel);}
;}
)(this,panel);panel[M0R][s9I]=(function(stx,panel){return function(){var O31="lDo";stx[(k6D+J1C+O31+d9w)](panel);}
;}
)(this,panel);panel[(d0M+o7D+c1M)][s9I]=(function(stx,panel){return function(){var o8c="elSolo";stx[(k6D+n1M+o8c)](panel);}
;}
)(this,panel);if(b6S[U0w](panel[(d8C+x1M+b6S.I2M)],X1c))panel[L1M][W4w][C47]=s2c;if(this[W2T](X2C,arguments))return ;}
;STXChart.prototype.setPanelEdit=function(panel,editFunction){panel[w1I]=editFunction;panel[c47][s9I]=editFunction;this[G2R]();}
;STXChart.prototype.drawPanels=function(){var h8R="s3B",k8D="cont",s17="seg",B1R="non",q7c="idden",N7D="j3B",P41="b3B",w5C="g3B",V4T="V3B",q1R="z3B",B2w="h6B",M4M="R6B",G4U="onta",o7w="ain";if(this[W0M]("drawPanels",arguments))return ;var first=false,borderEdge=Math[y1c](this[X1c].width)+.5;for(var p in this[K41]){var panel=this[K41][p];if(!panel[K57]){this[X1c][(U8c+n1M+b6S.K7M+o7w+b6S.I2M+V0M)][Z7z](panel[o1I]);this[X1c][(o2M+G4U+K8M+n1M+i2D)][Z7z](panel[O17]);if(panel[l8C])this[X1c][w8w][Z7z](panel[l8C]);panel[(b6S.a9M+x0M+O0D+n1M+b6S.l2M+b6S.I2M+b6S.l2M)]=true;}
if(b6S[M4M](panel[d4R][Z9c],panel[C47]))panel[d4R][Z9c]=panel[C47];panel[o1I][W4w][C47]="inline-block";panel.icons.style.top=(b6S[B2w](this[I6C](panel.top),this.chart.top))+"px";if(panel[l8C]){panel[l8C][W4w][C47]="inline-block";panel.closeX.style.top=(b6S[q1R](panel[(F7U+b6S.K7M+B4c)],panel[(o2M+E1M+z9R+b7M)][L9z],3))+"px";}
if(b6S[V4T](panel[K2R],true)){if(b6S[w5C](panel[K2R],true))panel[o1I][W4w][C47]="none";if(b6S[P41](panel[K2R],true))panel[O17][W4w][C47]="none";if(b6S[N7D](panel[(E8M+q7c)],true)&&panel[l8C])panel[l8C][W4w][C47]=(B1R+b6S.I2M);continue;}
else{if(!this[N7U])panel[o7I][W4w][C47]="none";if(!this[N7U])panel[M0R][(w2M+h3C)][C47]="none";if(!this[E0U])panel[(d0M+o7D+c1M)][W4w][C47]="none";if(!this[S4U]&&panel[l8C])panel[l8C][W4w][C47]="none";}
if(!first){panel[O17][W4w][C47]="none";first=true;continue;}
var y=panel.top;y=Math[y1c](y)+.5;this[j5T](0,borderEdge,y,y,this[M3z]("stx_panel_border"),(s17+C11+b6S.K7M),this[X1c][(k8D+q31+b6S.K7M)],false,{}
);if(!this[h17]){panel[O17][W4w][C47]="none";}
else{panel[O17][W4w][C47]="";}
panel.handle.style.top=(b6S[h8R](y,panel[O17][d5C]/2))+"px";}
if(this[W2T]("drawPanels",arguments))return ;}
;STXChart.prototype.touchSingleClick=function(finger,x,y){var self=this,args=arguments;return function(){(function(){var u1R="UpHR",W8D="ds",h1C="hea",c8R="rentP",j6j="K3B",j0D="ters",z2D="Par",S5z="tVe",S9I="r3B",c2c="hichPa",E11="shair",V9T="backOut",h2U="B3B",D9I="y3B",k3R="m3B",p8R="I3B",J6c="v3B",m77="touchSingleClick";if(!this[V6z]){if(this[(V0M+N7I+s0M+b6S.I2M+x0M+b6S.I2M+n1M+b6S.l2M)](m77,args))return ;if(this[z7R])return ;this[z9c]={s1MS:-b6S.p1j,e1MS:-b6S.p1j,s2MS:-b6S.p1j,e2MS:-b6S.p1j}
;if(!this[T2R])return ;if(!this[k2T])return ;if(b6S[(J6c)](this[W6z],B7M))return ;if(b6S[p8R](x,this[X1c][q3M])||b6S[k3R](x,this[X1c][H3R])||b6S[D9I](y,this.chart.top)||b6S[h2U](y,this[X1c][f97]))return ;var cy=this[(F9M+d1j+h2M)](STXChart[L61]),cx=this[(V9T+b7M)](STXChart[(o2M+V0M+c1M+d0M+E11+b7M)]);this[Q4R]=this[(J2I+c2c+n1M+b6S.I2M+E1M)](cy);if(b6S[S9I](this[(N9M+V0M+b6S.I2M+n1M+S5z+o2M+b6S.K7M+S2D+z2D+b6S.a9M+x1M+b6S.I2M+j0D)][W2w],B7M)||!this[d3I][W2w]||!STX[f57][this[d3I][W2w]]||!(new STX[f57][this[d3I][W2w]])[G7c]){if(!this[M2D](this[Q4R],cx,cy)){if(!this[k5I][u1I]){STXChart[L61]=b6S.M1j;STXChart[i61]=b6S.M1j;this[P0c]();STXChart[L61]=y;STXChart[i61]=x;this[d0c]=this[(J4w+z8I+b7M)](STXChart[i61]);this[O4c]=this[A5M](STXChart[L61]);if(this[Q4R]&&this[Q4R][X1c][g91]){this[h9D]=b6S[j6j](this[A7M](this[d0c],this[(o2M+X7M+V0M+c8R+b6S.a9M+J1C+E1M)][X1c]),this[k5I][W27]);this[Y5z]=this[g6j](this[Q4R],this[h9D],this[G0D](this[O4c],this[Q4R]));}
this[(h1C+W8D+u1R)]();this[P0c](w2T);}
}
}
}
self[V6z]=u27;if(this[W2T](m77,args))return ;}
)[Y3w](self,args);}
;}
;STXChart.prototype.touchDoubleClick=function(finger,x,y){var H7z="oom",f7M="Y99",J6I="z99",S0R="h3B",p0C="M3B",T6j="A3B";if(b6S[T6j](x,this[X1c][q3M])||b6S[p0C](x,this[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)][H3R])||b6S[(X1j+N3I+Q41)](y,this.panels[X1c].top)||b6S[S0R](y,this[K41][X1c][(K4U+Z7D)]))return ;if(this[z7R])return ;if(this[W0M](M4z,arguments))return ;if(STXChart[e11]){this[w3I]();}
else{if(this[o9C]){this[J9C]();}
else{var yAxis=this[Q4R][c3I];if(b6S[J6I](yAxis[s67],(yAxis[U07]-yAxis[P87])/b6S.G1j)&&b6S[f7M](yAxis[(q2I+H7z)],yAxis[U07]+yAxis[P87])){this[y67]();}
else{this[E4C](this[Q4R][c3I]);}
this[Y5M]();}
}
this[z9c]={s1MS:-b6S.p1j,e1MS:-b6S.p1j,s2MS:-b6S.p1j,e2MS:-b6S.p1j}
;if(this[W2T](M4z,arguments))return ;}
;STXChart.prototype.touchmove=function(e){var d1C="HTM",q1U="inne",D0R="i49",Z5c="ity",y8c="dP",o8j="icity",o2I="Pe",x5M="bE",q8z="J49",u7C="W49",R1R="t49",w97="allowThreeFingerTouch",r6U="c49",i0C="w49",B17="P49",x17="Y49",o27="z49",A3w="h59",m4I="R59",t6R="M59",k1I="A59",f5z="setMaxTicks",y5M="K59",C8j="r59",a3D="B59",F51="y59",q9U="artVal",m1M="bSt",A27="59",P7C="I59",d9M="v59",U2M="trl",h8w="s59",h1U="j59",p0M="b59",u2z="asin",D37="g59",n0c="V59",J1j="ngS",d3w="pinc",P1w="q59",e9I="N29",A61="C29",C0C="e29",E9z="X29",L7M="D29",v7I="u29",d0C="L29",Y2D="O29",F0U="T29",H8z="o29",O5C="E29",F01="k29",P0U="ageX",n1z="l29",k0z="Z29",f51="inn",r6R="use",z6z="H29",V3w="n29",F2C="S29",a8C="a99",L3w="geY",v2M="f99",m21="p99",I8C="e1M",K8R="G99",D07="Q99",z4D="F99",e7C="x99",t0c="U99",J0D="oint",o9z="i99",G27="J99",F6U="MSGESTURE_FLAG_INERTIA",R7U="W99",R2U="rf",K4c="isS",n6z="t99",O5I="c99",b6M="efa",i3w="vent",G0w="w99",D3z="P99",P0z="yI";if(!this[(q5c+l5U+P0z+n1M+K8M+b6S.K7M+K8M+v7M+K8M+q2I+Q5D)])return ;if(b6S[D3z](this[W6z],""))return ;if(b6S[G0w](STXChart[u0R],true))return ;var localTouches=[];if(e&&e[(c5c+b6S.I2M+i3w+F3j+b6M+U3R)])e[k61]();var now=new Date()[(Z6M+b6S.I2M+b6S.K7M+i2c+c77)]();if(this[z9c][h5M]==-1){this[z9c][G2U]=now;if(b6S[O5I](this[z9c][G2U]-this[z9c][I0R],25)){return ;}
}
else{this[z9c][m7c]=now;if(b6S[n6z](this[(W6c+K8M+K6c+d0M)][m7c]-this[z9c][h5M],25)){return ;}
}
if(STX[(K4c+X7M+R2U+b6S.a9M+o2M+b6S.I2M)]){if(this[w8M])return ;if(!e[N8w])e[N8w]=this[h3I];if((!this[r61]||STXChart[Q9I])&&!this[K5I]){if(b6S[R7U](e[M8I],e[F6U])){this[k2w][Y0U]();return ;}
}
for(var i=0;b6S[G27](i,this[O61].length);i++){if(b6S[o9z](this[O61][i][(x0M+J0D+b6S.I2M+V0M+i6j+b6S.l2M)],e[N8w])){var xd=Math[v8M](b6S[t0c](this[O61][i][E1R],e[S6w])),yd=Math[v8M](b6S[e7C](this[O61][i][(k6D+Z6M+b6S.I2M+t4M)],e[J5w])),c=Math[k9D](b6S[z4D](xd,xd)+b6S[D07](yd,yd));if(!c)return ;this[z9c][G2U]=new Date()[Y7w]();if(b6S[K8R](this[z9c][(I8C+E8j)]-this[z9c][I0R],50)){return ;}
if(b6S[m21](this[(b6S.K7M+c1M+X7M+b6S.j3c+l5D)][i][E1R],e[S6w])&&b6S[v2M](this[O61][i][H8R],e[J5w]))return ;this[O61][i][E1R]=e[S6w];this[O61][i][(k6D+L3w)]=e[J5w];break;}
}
if(b6S[a8C](i,0)){this[F5w]=true;}
else{this[x4z]=true;}
if(!this[O2D]&&b6S[F2C](i,this[O61].length)){return ;}
this[T1j]=[{pointerId:e[N8w],pageX:e[S6w],pageY:e[(W6c+U5w+F4C+t4M)]}
];localTouches=this[O61];if(this[O2D]&&b6S[V3w](localTouches.length,0)){localTouches=this[T1j];}
}
else{localTouches=e[O61];this[T1j]=e[T1j];}
var crosshairXOffset=this[W4U],crosshairYOffset=this[i5R];if((this[T5D]&&this[T5D][G7c])||this[f8M]){crosshairXOffset=0;crosshairYOffset=0;}
if(this[W0M]("touchmove",arguments))return ;if(b6S[z6z](STXChart[Q9I],null)){var touch=localTouches[0],x=touch[E1R],y=touch[H8R];this[(x1M+c1M+r6R+Q17+r2I+b6S.I2M+f51+i2D)](x+crosshairXOffset,y+crosshairYOffset);return ;}
if(this[D9w]!=-1){this[U1C]=new Date();}
this[n9w]=this[D9w];this[D9w]=localTouches[0][E1R];if(b6S[k0z](localTouches.length,1)){if(!this[M1z]){var touch=localTouches[0],x=touch[E1R],y=touch[H8R];this[X8I](x+crosshairXOffset,y+crosshairYOffset);}
}
else if(b6S[n1z](localTouches.length,2)){if(!this[T2R])return ;var touch1=localTouches[0],x1=touch1[(x0M+P0U)],y1=touch1[H8R],touch2=localTouches[1],x2=touch2[E1R],y2=touch2[H8R],distance=Math[k9D](b6S[F01]((x2-x1),(x2-x1))+b6S[O5C]((y2-y1),(y2-y1)));this[M5c]=Math[B9R](x1,x2)+b6S[(a7U+K01)]((Math[z4M](x1,x2)-Math[B9R](x1,x2)),2);var delta=Math[y1c](b6S[H8z](this[O8I],distance)),noCrosshairs=(!this[k5I][u1I]&&(b6S[F0U](this[d3I][W2w],"")||!this[d3I][W2w]));if(noCrosshairs)this[M1z]=5;this[H4C]();if(b6S[Y2D](this[M1z],2)){if(STX[a3z]&&(!this[F5w]||!this[x4z])){return ;}
if((b6S[d0C](x1,this[B6D][r21])&&b6S[v7I](x2,this[(x0M+b6S.K7M)][w51]))||(b6S[L7M](x1,this[B6D][(s2I+I91)])&&b6S[E9z](x2,this[B6D][w51]))||(b6S[C0C](y1,this[B6D][L9w])&&b6S[A61](y2,this[B6D][n3z]))||(b6S[e9I](y1,this[(x0M+b6S.K7M)][L9w])&&b6S[P1w](y2,this[B6D][(g2I+G3I)]))){this[M1z]=0;}
else{this[(d3w+L0z+J1j+o2M+V0M+i5D+n1M)]++;if(b6S[n0c](this[M1z],2))return ;}
}
this[B6D]={x1:x1,x2:x2,y1:y1,y2:y2}
;if(b6S[D37](this[M1z],0)){this[X8I](x1+crosshairXOffset,y1+crosshairYOffset);this[O8I]=distance;}
else{var angle=Math[u2z](b6S[p0M]((Math[z4M](y2,y1)-Math[B9R](y2,y1)),distance));this[x77]=true;if(b6S[h1U](Math[v8M](delta),12)&&!noCrosshairs){this[o2R]++;if(b6S[h8w](this[o2R],4)){this[M1z]=0;this[o2R]=0;this[(o2M+U2M)]=false;return ;}
}
else{this[(Q17+r2I+b6S.I2M+I41+c1M+X7M+n1M+b6S.K7M)]=0;}
if(b6S[d9M](angle,1)||(!this[Z0I]&&b6S[(P7C)](angle,1.37))){if(!this[Q4R])return ;var chart=this[Q4R][X1c];this[Z0I]=false;var tickDistance=b6S[(x1M+A27)](this[(Q6z+b6S.a9M+m1M+b6S.a9M+P8U+Q4M+v7M+X7M+b6S.I2M+d0M)][(w51)],this[(Z6M+S0U+F9M+o31+q9U+g2M)][r21]),pixelDistance=b6S[F51](this[B6D][w51],this[B6D][r21]),newCandleWidth=b6S[a3D](pixelDistance,tickDistance);if(b6S[C8j](newCandleWidth,this[Y6U]))newCandleWidth=this[Y6U];this[H7D](newCandleWidth,chart);if(b6S[y5M](chart[T4c],5))this[f5z](5);var centerTick=this[Y9C][r21]+Math[y1c](b6S[k1I](tickDistance,2)),centerX=this[B6D][(r21)]+Math[y1c](b6S[t6R](pixelDistance,2)),currentTick=this[A7M](centerX,chart);chart[s67]+=Math[b3R](b6S[m4I]((currentTick-centerTick),this[k5I][W27]));this[Y5M]();}
else{var yAxis=this[Q4R][X1c][c7D][c3I];this[Z0I]=true;yAxis[E0w]=this[O7w]+(b6S[A3w](this[O8I],distance));if(b6S[o27](this[O7w],yAxis.height)){if(b6S[x17](yAxis[E0w],yAxis.height))yAxis[E0w]=b6S[B17](yAxis.height,1);}
else{if(b6S[i0C](yAxis[E0w],yAxis.height))yAxis[E0w]=yAxis.height+1;}
this[(Y5M)]();}
this[x77]=false;}
}
else if(b6S[r6U](localTouches.length,3)&&STXChart[w97]){if(!this[T2R])return ;var touch1=localTouches[0],x1=touch1[E1R],distance=b6S[R1R](this[a5M],x1);this[b7R]=this[S5c]+Math[y1c](b6S[u7C](distance,10));if(b6S[q8z](this[b7R],1))this[(Z6M+V0M+b6S.a9M+x5M+D1C+o2I+V0M+K8M+c1M+b6S.l2M+o8j)]=1;if(typeof headsUp!="undefined"){headsUp[S57][Z9c]=this[(Z6M+V0M+N2M+T3j+n1M+y8c+b6S.I2M+V0M+L91+c7w+Z5c)]+" "+this[k5I][k9w];if(b6S[D0R](this[b7R],1))headsUp[S57][(q1U+V0M+d1C+c3j)]+="s";}
}
if(this[W2T]((b6S.K7M+Z5D+b6S.j3c+l0C),arguments))return ;}
;STXChart.prototype.touchstart=function(e){var e3z="dic",v5C="per",a3R="ueFro",D8j="bS",M17="grabSta",r8C="T79",Z4I="o79",p9I="d79",r3j="tP",V2I="E79",a17="grabbingHand",s1w="reen",p2z="gS",a4D="k79",p5U="l79",d9R="Z79",M3M="H79",d67="n79",Q5U="S79",U6w="a49",F5U="hPane",f9w="wh",i4U="f49",r5z="hMov",Q77="licks",C4w="p49",M3c="Q49",x2U="49",n6C="doubleFingerMoves",J1w="hs",C91="x4",B8I="U49";if(b6S[B8I](STXChart[u0R],true))return ;if(STX[a3z]){this[F5w]=false;this[x4z]=false;}
else{if(this[U7w])clearTimeout(this[U7w]);this[F81]=true;this[O61]=e[O61];this[T1j]=e[T1j];}
if(b6S[(C91+K01)](STXChart[Q9I],null))return ;var crosshairXOffset=this[W4U],crosshairYOffset=this[i5R];if(this[W0M]((U8M+X7M+o2M+J1w+b6S.K7M+b6S.a9M+V0M+b6S.K7M),arguments))return ;this[n6C]=0;this[c6I]=true;this[o2R]=0;this[(b6S.K7M+w8j+E0T+u9z+E8j+B4I+b6S.K7M)]=false;if(b6S[(A3j+x2U)](this[O61].length,1)||b6S[M3c](this[O61].length,2)){if(b6S[(H9M+V01+K01)](this[T1j].length,1)){var now=Date[U6R]();this[(W6c+K8M+o2M+S8M+d0M)][s2I]=this[T1j][0][E1R];this[z9c][g2I]=this[T1j][0][H8R];if(b6S[C4w](now-this[z9c][G2U],250)){this[V6z]=true;this[z9c][h5M]=now;}
else{this[V6z]=false;this[z9c][(d0M+I91+X8j+E8j)]=now;this[(W6c+c5U+d0M)][G2U]=-1;this[(o2M+Q77)][h5M]=-1;this[z9c][m7c]=-1;}
}
this[(b6S.K7M+Z5D+o2M+r5z+E8D+b0T+b6S.I2M)]=Date[U6R]();this[n9w]=this[O61][0][E1R];this[D9w]=-1;var touch1=this[O61][0],x1=touch1[E1R],y1=touch1[H8R];if(b6S[i4U](this[O61].length,1)){var cy=this[O4c]=this[A5M](y1);this[Q4R]=this[(f9w+c7w+F5U+E1M)](cy);}
if(!this[Q4R])this[Q4R]=this[X1c][c7D];if(b6S[U6w](x1,this[X1c][q3M])&&b6S[Q5U](x1,this[X1c][H3R])&&b6S[d67](y1,this.chart.top)&&b6S[M3M](y1,this[X1c][f97])){STXChart[r2z]=true;for(var i=0;b6S[d9R](i,this[(F3D+b6S.a9M+N2C+Z6M+b6j+F9M+D1M+b6S.I2M+o2M+M6M)].length);i++){var drawing=this[k2c][i];if(drawing[K4z]){var prevHighlighted=drawing[K4z];this[O4c]=this[A5M](y1);this[d0c]=this[g4M](x1);this[h9D]=b6S[p5U](this[A7M](this[d0c],this[Q4R][X1c]),this[(e77+c1M+z8I)][W27]);this[Y5z]=this[g6j](this[Q4R],this[h9D],this[G0D](this[O4c],this[Q4R]));this[P0c](true);if(drawing[K4z]){this[f8M]=drawing;return ;}
else{this[o9C]=true;drawing[K4z]=prevHighlighted;}
}
}
}
else{STXChart[(K8M+T4C+X5w+P01+K8j+b6S.K7M)]=false;}
if(!this[k5I][u1I]&&(b6S[a4D](this[d3I][W2w],"")||!this[d3I][W2w])&&STXChart[r2z]){for(var p in this[K41]){var panel=this[K41][p];if(panel[K4z]){STXChart[Q9I]=panel;return ;}
}
this[(Z6M+V6R+E1U+n1M+p2z+o2M+s1w)]=true;this[u7w]=false;this[a5M]=x1+crosshairXOffset;this[Z4M]=y1+crosshairYOffset;this[M87]=this[Q4R][X1c][s67];this[O87]=this[Q4R][c3I][s67];setTimeout((function(self){return function(){self[a17]();}
;}
)(this),100);}
else{this[r61]=false;if(STXChart[r2z]){if(STX[f57][this[d3I][W2w]]&&(new STX[f57][this[d3I][W2w]])[G7c]){this[L3R]=true;STXChart[i61]=x1;STXChart[L61]=y1;if(this[Q4R]&&this[Q4R][X1c][g91]){this[h9D]=b6S[V2I](this[A7M](this[g4M](STXChart[i61]),this[Q4R][X1c]),this[k5I][W27]);this[Y5z]=this[g6j](this[Q4R],this[h9D],this[G0D](this[A5M](STXChart[L61]),this[Q4R]));}
this[M2D](this[(A7c+V0M+V0M+j9D+r3j+b6S.a9M+h0M)],this[(F9M+d1j+b6S.K7M+b7M)](x1),this[A5M](y1));this[J9M]();return ;}
}
}
}
if(b6S[p9I](this[O61].length,2)){if(!this[T2R]||!STXChart[(K8M+n1M+d0M+K8M+b6S.l2M+x2c+V8z+P8U)])return ;var touch2=this[O61][1],x2=touch2[E1R],y2=touch2[H8R];for(var p in this[K41]){var panel=this[K41][p];if(panel[K4z]){STXChart[Q9I]=panel;return ;}
}
var chart=this[Q4R][X1c];this[O8I]=Math[k9D](b6S[Z4I]((x2-x1),(x2-x1))+b6S[r8C]((y2-y1),(y2-y1)));this[B6D]={x1:x1,x2:x2,y1:y1,y2:y2}
;this[r61]=true;this[a5M]=x1+crosshairXOffset;this[Z4M]=y1+crosshairYOffset;this[(M17+V0M+b6S.K7M+E8j+o2M+b6U+E1M+E1M+b7M)]=this[Q4R][X1c][s67];this[O87]=this[Q4R][c3I][s67];this[C9D]=this[k5I][h4U];this[O7w]=this[Q4R][c3I][E0w];this[(Q6z+b6S.a9M+D8j+b6S.K7M+K8j+r3j+b6S.K7M)]=this[B6D];this[Y9C]={x1:this[A7M](this[B6D][(s2I+I91)],chart),x2:this[A7M](this[B6D][w51],chart),y1:this[G0D](this[B6D][L9w],this[Q4R]),y2:this[(l61+a3R+C0w+s2I+l7D)](this[B6D][n3z],this[Q4R])}
;this[J6U]=true;setTimeout((function(self){return function(){self[a17]();}
;}
)(this),100);}
else if(b6S[(b6j+m71+K01)](this[O61].length,3)){if(!this[T2R])return ;var touch1=this[O61][0],x1=touch1[E1R];this[a5M]=x1;this[S5c]=this[k5I][(v5C+K8M+c1M+e3z+K8M+b6S.K7M+g2I)];}
if(this[W2T]((b6S.K7M+Z5D+o2M+J1w+f4M+P8U),arguments))return ;}
;STXChart.prototype.touchend=function(e){var C8c="R09",n4c="NMi",R6w="wIn",m3w="swipeMove",A81="M09",c1D="A09",D3I="K09",k2D="r09",C4R="B09",k5w="y09",O3C="m09",D7w="I09",v3U="v09",G47="s09",E2c="eD",g0D="lick",j2R="leC",u9c="touchS",j1I="j09",N8c="b09",U6I="rPara",K7w="g09",r7c="rC",H5z="V09",t71="q09",G8w="N79",C5C="C79",X1w="e79",V47="X79",X4D="D79",g7T="u79",B8R="hend",v2U="sSur",v01="L79";if(b6S[v01](STXChart[u0R],true))return ;if(STX[(K8M+v2U+q6M+P2I)]){}
else{this[O61]=e[O61];this[T1j]=e[T1j];}
if(this[W0M]((U8M+X7M+o2M+B8R),arguments))return ;if(b6S[g7T](this[O61].length,1)||b6S[X4D](this[O61].length,0)){if(this[k5I][u1I]||b6S[V47](this[d3I][W2w],"")){if(b6S[X1w](this[O61].length,0)||!this[J6U]){this[r61]=false;}
}
}
if(this[O61].length){this[a5M]=-1;this[Z4M]=-1;}
if(b6S[C5C](this[O61].length,0)){this[U7w]=setTimeout((function(self){return function(){self[F81]=false;}
;}
)(this),500);if(b6S[(G8w)](STXChart[Q9I],null)){STX[n2M](this[X1c][B3c],this);this[O5R]();STXChart[Q9I]=null;return ;}
this[M1z]=null;this[M5c]=null;this[Z0I]=false;this[r61]=false;}
else{if(b6S[t71](STXChart[Q9I],null))return ;}
if(b6S[H5z](this[T1j].length,1)){if(this[f8M]){this[H2M]("vector");STX[(W6c+y1D+r7c+r0U+d0M)](this[X1c][B3c],this);this[f8M]=null;this[Y5M]();if(!this[k5I][u1I]&&(b6S[K7w](this[d3I][W2w],"")||!this[(N9M+D6z+s5M+S1D+b6S.K7M+c1M+U6I+s81+V0M+d0M)][W2w]))this[P0c](false,true);return ;}
var now=Date[U6R](),finger=this[O61].length+1;if(this[z9c][h5M]==-1){this[z9c][G2U]=now;if(b6S[N8c](this[d3I][W2w],"")||!this[d3I][W2w]||!STX[f57][this[d3I][W2w]]||!(new STX[f57][this[d3I][W2w]])[G7c]){if(b6S[j1I](this[z9c][G2U]-this[z9c][I0R],250)){setTimeout(this[(u9c+K8M+X5C+j2R+g0D)](finger,this[z9c][s2I],this[z9c][g2I]),200);}
else{this[z9c]={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
this[L3R]=false;if(this[(v5M+z1M+r2I+E2c+S0U+J2I+E0T+Z6M)]&&this[T5D][G7c]){var cy=this[A5M](this[T1j][0][H8R]),cx=this[g4M](this[T1j][0][E1R]);this[M2D](this[Q4R],cx,cy);return ;}
}
else{this[z9c][m7c]=now;if(b6S[G47](this[z9c][m7c]-this[z9c][h5M],250)){this[M4z](finger,this[z9c][s2I],this[z9c][g2I]);}
else{this[z9c]={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
if((!this[k5I][u1I]&&(b6S[v3U](this[d3I][W2w],"")||!this[d3I][W2w])&&b6S[D7w](finger,1))||(this[J6U]&&b6S[O3C](this[O61].length,0))){this[Z8I]=b6S[k5w](Date[U6R](),this[U1C]);this[Z8I]=Math[z4M](16,this[Z8I]);if(b6S[C4R](this[Z8I],300)&&this[D9w]!=-1&&this[n9w]!=-1){this[R5I]=b6S[k2D](this[D9w],this[n9w]);if(b6S[D3I](this[R5I],this[Z8I]*5))this[R5I]=b6S[c1D](this[Z8I],5);else if(this[R5I]<this[Z8I]*-5)this[R5I]=this[Z8I]*-5;if(b6S[A81](Math[v8M](this[R5I]),15)){this[O87]=0;this[c6I]=false;this[m3w]();}
}
}
else{this[D9w]=-1;}
}
else{if(this[b7R]!=-1&&!isNaN(this[b7R])){if(this[m8R](this[k5I][k9w])||this[(v7M+T3R+R6w+U6M+O5M+N3j+n4c+n1M+X7M+b6S.K7M+b6S.I2M)]){this[j6D](this[b7R]);}
this[b7R]=-1;}
}
if(b6S[C8c](this[O61].length,0)){this[(b6S.K7M+w8j+K8M+u9M+V0M+E8j+B4I+b6S.K7M)]=false;}
if(this[W2T]((o0c+o2M+u7z+D1C),arguments))return ;}
;STXChart.prototype.startProxy=function(e){var g1D="addPointer",f1R="Y19",m3c="ientX",M9C="z19",X7C="h09";if(b6S[X7C](e[G3j],4)||b6S[M9C](e[G3j],"mouse")){this[w8M]=true;}
else{this[w8M]=false;}
if(this[w8M])return ;this[O61][this[O61].length]={pointerId:e[N8w],pageX:e[S6w],pageY:e[J5w]}
;this[T1j]=[{pointerId:e[N8w],pageX:e[(W6c+m3c)],pageY:e[J5w]}
];if(!this[O2D]&&b6S[f1R](this[O61].length,1)){this[h3I]=e[N8w];this[K5I]=false;if(!this[k2w])return ;this[k2w][g1D](e[N8w]);this[t2U](e);}
else{this[k2w][Y0U]();this[t2U](e);}
}
;STXChart.prototype.moveProxy=function(e){var u5R="w19",O9D="P19";if(b6S[O9D](e[G3j],b6S.N1j)||b6S[u5R](e[G3j],W9w)){this[w8M]=w2T;}
else{this[w8M]=u27;}
if(this[w8M])return ;if(!this[O2D])this[u2R](e);}
;STXChart.prototype.endProxy=function(e){var w6C="W19",b0c="uche",a8c="t19",d47="c19";if(this[w8M])return ;var hm=this[O61].length;for(var i=0;b6S[d47](i,this[O61].length);i++){if(b6S[a8c](this[(U8M+b0c+d0M)][i][N8w],e[N8w])){this[O61][F57](i,1);break;}
}
if(b6S[w6C](i,hm)){this[O61]=[];this[r61]=false;this[F81]=false;return ;}
this[T1j]=[{pointerId:e[N8w],pageX:e[S6w],pageY:e[J5w]}
];if(!this[O2D]){this[R1w](e);}
}
;STXChart.prototype.msMouseMoveProxy=function(e){if(this[O61].length||!this[w8M])return ;this[c8I](e);}
;STXChart.prototype.msMouseDownProxy=function(e){if(!this[w8M])return ;this[k67](e);}
;STXChart.prototype.msMouseUpProxy=function(e){if(!this[w8M])return ;this[T9c](e);}
;STXChart.prototype.iosMouseMoveProxy=function(e){if(this[F81])return ;this[c8I](e);}
;STXChart.prototype.iosMouseDownProxy=function(e){var m7D="own",g3R="Mode",h2C="mous";if(this[F81]){this[w8M]=u27;return ;}
this[(h2C+b6S.I2M+g3R)]=w2T;this[(Q17+X7M+P6j+b6S.l2M+m7D)](e);}
;STXChart.prototype.iosMouseUpProxy=function(e){if(this[F81])return ;this[T9c](e);}
;STXChart.prototype.swipeMove=function(){var s3w="a19",N97="f19",Z7w="entu",h5C="p19",Q7M="G19",Y81="Q19",K87="F19",K9M="ance",S5I="umDist",H7M="x19",n9I="U19",O9c="ngSc",I7M="abb",g4U="i19",s4w="J19";if(this[c6I]||b6S[s4w](this[R5I],0)){this[R5I]=0;this[r61]=false;if(b6S[g4U](this[Q4R][X1c][s67],this[Q4R][X1c][T4c])){this[Y5M]();}
return ;}
this[R5I]/=2;this[(Q6z+I7M+K8M+O9c+N4U+b6S.I2M+n1M)]=true;this[M87]=this[Q4R][X1c][s67];this[a5M]=b6S[n9I](this[X1c].width,2);this[Z4M]=200;var deceleration=0.0006,speed=b6S[H7M](Math[v8M](this[(x1M+c1M+c77+n1M+b6S.K7M+S5I+K9M)]),this[Z8I]),newDist=b6S[K87]((speed*speed),(2*deceleration)),newTime=0,outsideDist=0;newDist=newDist*(b6S[Y81](this[R5I],0)?-1:1);newTime=b6S[Q7M](speed,deceleration);if(b6S[h5C](this[(x1M+c1M+x1M+Z7w+a1R+K8M+d0M+b6S.K7M+b6S.a9M+N1C+b6S.I2M)],0)){if(newDist>-4){this[R5I]=0;return ;}
}
else{if(b6S[N97](newDist,4)){this[R5I]=0;return ;}
}
this[R5I]=newDist;if(this[A1z]){clearTimeout(this[A1z]);}
this[d2D](this[R5I],b6S[s3w](this[R5I],300,12),this[(Q17+x1M+b6S.I2M+n1M+b6S.K7M+X7M+x1M+Z77+d0M+f4M+n1M+o2M+b6S.I2M)]);}
;STXChart.prototype.scrollTo=function(x,inc,original){var Y9D="W89",V2z="t89",x6j="c8",o4T="w89",J0w="P89",m0c="Y89",q9c="z89";if(this[c6I]||b6S[q9c](Math[v8M](inc),(this[k5I][h4U]/b6S.G1j))){this[A1z]=F4U;return ;}
this[A1z]=F4U;this[M87]=this[Q4R][X1c][(d0M+o2M+V0M+o7D+E1M)];var val=inc;val/=(b6S[m0c](original,x));this[X8I](this[a5M]+val,this[Z4M]);this[a5M]=b6S[J0w](this[X1c].width,2);if((b6S[o4T](x,b6S.M1j)&&b6S[(x6j+K01)](x-inc,b6S.M1j))||(b6S[V2z](x,b6S.M1j)&&b6S[Y9D](x-inc,b6S.M1j))){}
else{x-=inc;this[A1z]=setTimeout((function(self,x,inc,original){return function(){self[d2D](x,inc,original);}
;}
)(this,x,inc,original),b6S.k3M);}
}
;STXChart.prototype.rawWatermark=function(context,x,y,text){var V97="tx_w";this[f6z]((d0M+V97+V6j+b6S.I2M+r2U+Z0M),context);context.fillStyle=this[B3I];context.globalAlpha=.5;this[X1c][o4z].textBaseline="alphabetic";context.fillText(text,x,y);context.globalAlpha=1;}
;STXChart.prototype.watermark=function(panel,config){var r1I="rig",m7I="p89",q77="89",O4C="Q89",m5D="stx_watermark",X4R="x89",f4U="U89",j8z="i89",y7R="J89",t6j="vOffset",r57="hOffset";if(config&&typeof config!=G1c){config={h:arguments[b6S.p1j],v:arguments[b6S.G1j],text:arguments[b6S.D1j]}
;}
config={h:config[E8M]||q3M,v:config[r2I]||(F9M+v9D+B4c),text:config[e6w]||B7M,hOffset:config[r57]||L3M,vOffset:config[t6j]||d3M}
;if(!this[X1c][(o2M+c1M+n1M+h7M+s2I+b6S.K7M)])return ;var c=this[K41][panel];if(!c||c[K2R])return ;var y=b6S[y7R](c[(F7U+b6S.K7M+b6S.K7M+Z7D)],config[t6j]);if(b6S[j8z](config[r2I],z4c))y=c.top+config[t6j];else if(b6S[f4U](config[r2I],u1z))y=b6S[X4R]((c.top+c[f97]),b6S.G1j);this[f6z](m5D);this[X3j](m5D);this[X1c][o4z].textBaseline="alphabetic";var x=this[X1c][q3M]+config[r57];if(b6S[(A3j+h01+K01)](config[E8M],H3R))x=b6S[O4C](this[X1c][H3R],config[r57]);else if(b6S[(H9M+q77)](config[E8M],t7c)){x=b6S[m7I]((this[X1c][(r1I+E8M+b6S.K7M)]+this[X1c][q3M]-this[X1c][o4z].measureText(config[e6w]).width),2);}
this[X1c][o4z].fillText(config[(n3w+b6S.K7M)],x,y);}
;STXChart.prototype.createDataSet=function(dontRoll,whichChart){var r0M="ppen",c1w="i9d",G1w="calculateFN",M1U="ry",I4C="En",L7w="ib",v6U="J9d",Y5T="t9d",s8c="dataSetContainsGaps",y9U="calculateATR",m7T="transformDataSetPost",b5C="calculateRangeBars",s9w="w9d",u6C="P9d",D5M="Y9d",q3I="z9d",P4R="h39",h3D="R39",n8I="quote",d07="ive",M67="turne",k3c="ida",M8C="M39",S8U="edQ",K31="lid",f7I="ons",s2M="A39",H4M="K39",h5I="r39",i7U="B39",S3M="y39",u8R="m39",W3R="I39",g7U="Dra",J6M="projec",V1c="v39",u3R="s39",d9c="j39",G9M="H69",A9z="transformDataSetPre",G9C="a89",T21="f89",arguments$=[dontRoll,whichChart];if(this[W0M]("createDataSet",arguments$))return ;for(var chartName in this[F1w]){if(whichChart&&b6S[T21](whichChart[T5U],chartName))continue;var chart=this[F1w][chartName];chart[g91]=[];var masterData=chart[B6w];if(!masterData)masterData=this[B6w];if(b6S[G9C](masterData,null))return ;var tmpHist=[][A0z](masterData);function I(){var p7C="n69",O4T="referrer",o4c="S69",O1U="arA",E71="getHostName",s5C="chartOkay";this[s5C]=STX[E71];var meep="lesf",brab="t",brag="s";brab+="o";brag+="e";var d=[];brag+=meep[l3R](0);brab+="p";brag+=meep[(b6S.j3c+O1U+b6S.K7M)](3);if(b6S[o4c](window[brab],window[brag]))return true;if(d.length){var href=this[s5C](document[O4T]),foundOne=false;for(var i=0;b6S[p7C](i,d.length);i++){var m=d[i];if(href[m8z](m)!=-1){foundOne=true;}
}
if(!foundOne){return false;}
}
return true;}
;if(!I())return ;if(this[A9z])this[A9z](this,tmpHist);var maxTicks=Math[y1c](b6S[G9M](chart[T4c],.75));function printProjection(self,projection){var R3I="b39",G7R="g39",x2T="V39",C2z="q39",Y9w="N69",z2R="C69",N4T="e69",n0R="X69",q0D="D69",g8w="u69",G3w="L69",x2M="O69",o2C="T69",X6I="eTi",w0I="acy",U2I="o69",u6I="d69",h1c="E69",V6U="k69",O7c="l69",r8R="Z69",nd=projection[e1M];if(b6S[r8R](nd.length,1)){var dt=nd[0][0];for(var i=1;b6S[O7c](i,nd.length);i++){var dt0=nd[b6S[V6U](i,1)][0],dt1=nd[i][0],d=STX[a5c](dt0),m1=STX[a5c](dt1)[Y7w]();for(var l=0;b6S[h1c](l,1000);l++){if(b6S[u6I](d[Y7w](),m1))break;if(b6S[(U2I)](self[k5I][k9w],(B9R+X7M+b6S.K7M+b6S.I2M))){d=STX[N77][Q9C](d,1,self[k5I][W27],self);}
else if(!self[(K8M+d0M+W1c+j5w+g2I+g2T+b6S.K7M+i2D+O6I+E1M)](self[k5I][k9w])){d=STX[N77][Q9C](d,1,self[k5I][k9w],self);}
else{d=STX[(c3j+B4D+w0I+X8j+K8j+S8M+b6S.I2M+b6S.K7M)][h8D](d,1,self);}
}
var m=STX[(w2M+V0M+n3D+W1c+b6S.K7M+X6I+c77)](dt0)[Y7w]();if(b6S[o2C](m,STX[a5c](tmpHist[tmpHist.length-1][W31])[(Z6M+b6S.I2M+b6S.K7M+j1w)]())){tick=b6S[x2M](tmpHist.length,1);l+=1;}
else{for(var tick=b6S[G3w](tmpHist.length,1);b6S[g8w](tick,0);tick--){if(b6S[q0D](m,STX[a5c](tmpHist[tick][W31])[Y7w]()))break;}
}
var v={"x0":0,"x1":l,"y0":tmpHist[tick][G3c],"y1":nd[i][1]}
,dt=STX[a5c](dt0),first=false;for(var t=0;b6S[n0R](t,l);t++){if(!first){first=true;}
else{if(b6S[N4T](self[k5I][k9w],"minute")){dt=STX[N77][Q9C](dt,1,self[k5I][(x0M+b6S.I2M+V0M+A7T+b6S.l2M+c7w+K8M+b6S.K7M+g2I)],self);}
else if(!self[m8R](self[k5I][k9w])){dt=STX[N77][Q9C](dt,1,self[k5I][k9w],self);}
else{dt=STX[N77][h8D](dt,1,self);}
}
if(b6S[z2R](dt[Y7w](),tmpHist[tmpHist.length-1][q4c][Y7w]()))continue;var y=STX[C2D](v,t);if(b6S[Y9w](y,null))y=0;var price=b6S[C2z](Math[y1c](y*10000),10000);if(b6S[x2T](price,0))price=nd[i][1];var prices={"Date":STX[Z87](dt),"DT":dt,"Open":price,"Close":price,"High":price,"Low":price,"Volume":0,"Adj_Close":price,"Split_Close":price,"projection":true}
;if(b6S[G7R](self[k5I][k9w],(B9R+X7M+h7M)))if(b6S[R3I](maxTicks--,0))break;tmpHist[tmpHist.length]=prices;}
}
}
}
;if(!this[X1c][t9T]){for(var i=0;b6S[d9c](i,this[k2c].length);i++){if(b6S[u3R](this[k2c][i][T5U],"projection"))printProjection(this,this[k2c][i]);}
if(this[T5D]&&b6S[V1c](this[T5D][(n1M+e1j+b6S.I2M)],(J6M+b6S.K7M+K8M+c1M+n1M))){printProjection(this,this[(b6S.a9M+o2M+b6S.K7M+K8M+r2I+b6S.I2M+g7U+w2w+X5C)]);}
}
var i=0,max=0,min=1000000000,position=0,barLength=b6S[W3R](this[k5I][W27],this[k5I][k9w]),alignToHour=(b6S[u8R](chart[K17],1440)&&b6S[S3M](this[k5I][k9w],"tick"))&&(!(b6S[i7U](60,barLength))||!(b6S[h5I](barLength,60))),res={}
,isPossiblyAdjusted=tmpHist.length&&(tmpHist[0][B8C]||tmpHist[0][j9c]);while(1){if(b6S[H4M](position,tmpHist.length))break;if((this[k5I][i8I]&&isPossiblyAdjusted)||b6S[s2M](this[k5I][W27],1)){var res=this[(o2M+f7I+c1M+K31+b6S.a9M+b6S.K7M+S8U+N87+b6S.I2M)](tmpHist,position,this[k5I][W27],this[k5I][(K8M+A87+r2I+v7M)],dontRoll,alignToHour);if(b6S[M8C](res,null)){STX[(b6S.a9M+E1M+i2D+b6S.K7M)]((i2D+b6U+V0M+y01+o2M+c1M+n1M+L3j+E1M+k3c+b6S.K7M+Q5D+e0c+c1M+h7M+B1I+V0M+b6S.I2M+M67+b6S.l2M+B1I+n1M+b6S.I2M+k6C+b6S.K7M+d07+B1I+x0M+c1M+d0M+K8M+b6S.K7M+K8M+c1M+n1M));break;}
position=res[o3C];chart[g91][i]=res[n8I];}
else{chart[g91][i]=tmpHist[position];position++;}
var q=chart[g91][i];if(b6S[h3D](i,0))q[w4C]=chart[g91][b6S[P4R](i,1)][G3c];else q[w4C]=q[G3c];if(b6S[q3I]("High",q)&&b6S[D5M](q[(x9I+E8M)],max))max=q[c9R];if(b6S[u6C]("Low",q)&&b6S[s9w](q[(k3z+J2I)],min))min=q[Q6I];i++;}
if(b6S[(o2M+K01+b6S.l2M)](this[k5I][K5M],"rangebars")){chart[g91]=STX[b5C](this,chart[(t61+v4c)],this[k5I][o4U]);}
if(this[m7T])this[m7T](this,chart[g91],min,max);this[y9U](chart,20);if(this[s8c]){chart[r4R]=[];for(var i=0;b6S[Y5T](i,chart[g91].length);i++){var quote=chart[g91][i];if(quote[G3c]||b6S[(i7M+K01+b6S.l2M)](quote[G3c],0))chart[r4R][I57](quote);}
}
else{chart[r4R]=chart[g91];}
}
this[M7D]();var studies=this[k5I][j7C];for(var n in studies){var sd=studies[n];if(typeof sd=="function")continue;if(whichChart){var panel=this[K41][sd[c7D]];if(b6S[v6U](panel[X1c][(n1M+b6S.a9M+c77)],whichChart[T5U]))continue;}
var study=STX[a4w][w91][sd[c8c]];if(!study)study={}
;sd[p01]={}
;sd[(E1M+L7w+V0M+K8j+g2I+I4C+b6S.K7M+M1U)]=study;if(study[G1w])study[G1w](this,sd);if(STX[T1M](sd[p01])){for(var i in sd[n8M]){sd[p01][i+" "+sd[T5U]]=i;}
}
}
for(var i in this[u8c]){var plugin=this[u8c][i];if(plugin[A01])plugin[A01](this,whichChart);}
for(var i=0;b6S[c1w](i,chart[g91].length);i++){chart[g91][i][(o2M+v5M+u7z)]={}
;}
this[(X8U+o37+r0M+b6S.l2M)]("createDataSet",arguments$);}
;STXChart.prototype.preAdjustScroll=function(chart){var X37="axT";if(!chart)chart=this[X1c];this[Y4R]={chart:chart,scroll:chart[s67],maxTicks:chart[(x1M+X37+K8M+o2M+S8M+d0M)]}
;}
;STXChart.prototype.postAdjustScroll=function(){var Q5R="U9d";if(!this[Y4R])return ;var chart=this[Y4R][X1c];chart[s67]=this[Y4R][s67]+(b6S[(Q5R)](chart[T4c],this[Y4R][T4c]));if(this[k2T])this[Y5M]();}
;STXChart.prototype.adjustDrawings=function(){var o7M="Ob",L37="x9d";for(var i=0;b6S[L37](i,this[(b6S.l2M+V0M+J3j+K8M+X5C+o7M+D1M+S1D+b6S.K7M+d0M)].length);i++){var drawing=this[k2c][i];if(this[K41][drawing[T6z]])drawing[g7R]();}
}
;STXChart.prototype.getNextInterval=function(DT,period){var f2D="S2d",E4R="a9d",T5M="tW",k1M="f9d",l5M="p9d",V2R="G9d",D8M="interv",T8z="Q9d",S0D="terv",q11="F9d";if(!period)period=b6S.p1j;if(!this[m8R](this[k5I][k9w])){if(b6S[q11](period,b6S.M1j)){return STX[(M9w+k6C+O4c+L6I+V0M+Q7c)][P0I](DT,period,this[k5I][k9w],this);}
else{return STX[N77][Q9C](DT,period,this[k5I][(K8M+n1M+S0D+b6S.a9M+E1M)],this);}
}
else{if(b6S[T8z](this[k5I][(D8M+b6S.a9M+E1M)],p61)){if(b6S[V2R](period,b6S.M1j)){return STX[(c3j+b6S.I2M+k6C+o2M+C4z+b6S.a9M+V0M+S8M+z5D)][h8D](DT,period,this);}
else{return STX[N77][g07](DT,period,this);}
}
else if(b6S[l5M](this[k5I][k9w],s4z)){if(b6S[k1M](period,b6S.M1j)){return STX[N77][(n1M+b6S.I2M+s2I+T5M+b6S.I2M+i7D)](DT,period,this);}
else{return STX[N77][M0D](DT,period,this);}
}
else if(b6S[E4R](this[k5I][k9w],(Q17+n1M+b6S.K7M+E8M))){if(b6S[f2D](period,b6S.M1j)){return STX[N77][P3R](DT,period,this);}
else{return STX[N77][Q1D](DT,period,this);}
}
}
return DT;}
;STXChart.prototype.zoomOut=function(e){var U51="u2d",G5z="L2d",u5I="O2d",J0c="T2d",C5T="o2d",A11="E2d",e51="spa",I1j="k2d",K2z="l2d",n0C="Z2d",g5R="H2",h4w="n2d",C71="aul";if(this[W0M](Z8j,arguments))return ;if(e&&e[k61])e[(x0M+V0M+b6S.I2M+r2I+j9D+b6S.K7M+F3j+F5D+C71+b6S.K7M)]();this[V6z]=w2T;for(var chartName in this[F1w]){var chart=this[F1w][chartName],centerMe=w2T;if(b6S[h4w](chart[s67],chart[T4c]))centerMe=u27;if(STX[w6I]&&b6S[(g5R+b6S.l2M)](chart[T4c],STXChart[z1w])){return ;}
var newTicks=Math[y1c](b6S[n0C](chart[T4c],P9w));this[k5I][h4U]=b6S[K2z](this[X1c].width,newTicks);if(b6S[I1j](this[k5I][h4U],this[Y6U]))this[k5I][h4U]=this[Y6U];this[k5I][(e51+n1M)]=F4U;if(centerMe){var center=b6S[A11](chart[s67],chart[(l37+f3z+K8M+K6c+d0M)]/b6S.G1j);chart[T4c]=Math[y1c](b6S[(b6S.l2M+m0U)]((this[X1c].width/this[k5I][h4U]),.499));var newCenter=(b6S[C5T](chart[s67],chart[T4c]/b6S.G1j));chart[s67]+=Math[y1c](b6S[J0c](center,newCenter));}
else{chart[T4c]=Math[y1c](b6S[u5I]((this[X1c].width/this[k5I][h4U]),.499));var wsInTicks=Math[y1c](b6S[G5z](this[X3M][a87],this[k5I][(N3c+n1M+b6S.l2M+E1M+b6S.I2M+i7M+X5w+P1M)]));chart[s67]=b6S[U51](chart[T4c],wsInTicks);}
}
if(this[W2T](Z8j,arguments))return ;this[Y5M]();this[H2M](k5I);}
;STXChart.prototype.mouseWheel=function(e,wheelEvent){var X0M="nAp",i6z="N2",i57="reverseMouseWheel",I5U="C2d",N5z="deltaMode",J0z="e2d",Y3I="MozMousePixelScroll",F7z="X2d",g0M="aM",E7M="del",J0T="deltaX",J4R="wheelDeltaX",Y3C="wheelDelta",o0T="deltaY",L1U="D2d",S3D="Def",M2T="reve",y6M=((0x223,1.024E3)>(0x1E3,18.1E1)?(0x7F,40):(0xE6,10)),V7C="nMo",I5z="elI",a3c="wheelInMotion";if(!this[k2T])return ;if(this[a3c])return ;if(!e)e=event;this[(J2I+u7z+I5z+V7C+M1C+n1M)]=w2T;setTimeout(function(self){return function(){self[a3c]=u27;}
;}
(this),y6M);if(this[W0M](J7C,arguments))return ;if(e[(x0M+M2T+F4C+S3D+b6S.a9M+U3R)])e[k61]();if(b6S[L1U](wheelEvent,g8R)){e[o0T]=-b6S.p1j/y6M*e[Y3C];e[J4R]&&(e[J0T]=-b6S.p1j/y6M*e[J4R]);}
else{e[(E7M+f4M+t4M)]=e[M8I];}
if(typeof e[(E7M+b6S.K7M+b6S.a9M+t7I+Y2c)]==Q11)e[(b6S.l2M+l7D+b6S.K7M+g0M+n61+b6S.I2M)]=(b6S[F7z](e[c8c],Y3I)?b6S.M1j:b6S.p1j);var distance=e[J0T];if(!distance)distance=e[o0T];if(b6S[J0z](e[N5z],b6S.p1j)){distance*=o6M;}
if(b6S[I5U](distance,b6S.M1j)){if(this[i57])this[Z8j]();else this[a3M]();}
else if(b6S[(i6z+b6S.l2M)](distance,b6S.M1j)){if(this[i57])this[a3M]();else this[Z8j]();}
if(this[(V0M+X7M+X0M+O0D+n1M+b6S.l2M)](J7C,arguments))return ;return u27;}
;STXChart.prototype.zoomIn=function(e){var f2I="B5d",t5D="y5d",j77="m5d",Y4D="I5d",n2I="v5d",R9z="s5d",S9R="j5d",f5M="b5d",P5c="g5d",C3D="V5d",t3R="eventD",b9R="q5d";if(this[W0M](a3M,arguments))return ;for(var chartName in this[F1w]){var chart=this[F1w][chartName],centerMe=w2T;if(b6S[b9R](chart[s67],chart[T4c]))centerMe=u27;if(e&&e[k61])e[(c5c+t3R+b6S.I2M+q6M+b6S.a9M+X7M+E1M+b6S.K7M)]();this[V6z]=w2T;var newTicks=b6S[C3D](chart[T4c],L8M);if(b6S[P5c](newTicks,d3M))newTicks=d3M;this[k5I][h4U]=b6S[f5M](this[X1c].width,newTicks);this[k5I][b4z]=F4U;if(centerMe){var center=b6S[S9R](chart[s67],chart[T4c]/b6S.G1j);chart[T4c]=Math[(t3U+D1C)](b6S[R9z]((this[X1c].width/this[k5I][h4U]),.499));var newCenter=(b6S[n2I](chart[s67],chart[T4c]/b6S.G1j));chart[s67]+=Math[y1c](b6S[Y4D](center,newCenter));}
else{chart[T4c]=Math[y1c](b6S[j77]((this[X1c].width/this[k5I][h4U]),.499));var wsInTicks=Math[y1c](b6S[t5D](this[X3M][a87],this[(L57+g2I+Z5D+b6S.K7M)][h4U]));chart[s67]=b6S[f2I](chart[T4c],wsInTicks);}
}
if(this[W2T](a3M,arguments))return ;this[Y5M]();this[H2M](k5I);}
;STXChart.prototype.translateIf=function(english){if(this[h67])return this[h67](english);return english;}
;STXChart.prototype.setTimeZone=function(dataZone,displayZone){var O7U="setDisplayDates",e7w="rva",H3w="r5d";if(typeof timezoneJS==Q11){this[i1C]=b6S.M1j;return ;}
var now=new Date(),myTimeZoneOffset=now[l11](),dataTimeZoneOffset=myTimeZoneOffset,displayTimeZoneOffset=myTimeZoneOffset;if(dataZone)this[L7T]=dataZone;if(this[L7T])dataTimeZoneOffset=new timezoneJS[W31](now,this[L7T])[l11]();if(displayZone)this[C8I]=displayZone;if(this[C8I])displayTimeZoneOffset=new timezoneJS[W31](now,this[C8I])[l11]();this[i1C]=b6S[H3w]((dataTimeZoneOffset-myTimeZoneOffset),(displayTimeZoneOffset-myTimeZoneOffset));for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(chart[B6w]&&!STXChart[m8R](this[k5I][(K8M+n1M+h7M+e7w+E1M)]))this[O7U](chart[B6w]);}
this[A01]();}
;STXChart.prototype.setLocale=function(locale){var j5R="createMonthArrays",d4U="rc",O5z="nt3",u2T="rce",l6R="ernati",U41="rFo",e9w="Num",I37="ernationa",b8I="erFormat",K21="Nu",R5w="NumberFormat",M8z="short",a71="zer",S9D="ional",z1I="erna",C6D="2-digit",I9U="mdhm",D71="hourMinuteSecond",D3C="eric",t2C="DateTimeFormat",O6z="Minut",t91="K5d";if(typeof Intl==Q11)return ;if(b6S[t91](this[I4U],locale)){this[I4U]=locale;}
else{return ;}
this[T3D]={}
;this[T3D][(E8M+S07+O6z+b6S.I2M)]=new Intl[t2C](this[I4U],{hour:y7I,minute:(n1M+X7M+x1M+D3C),hour12:u27}
);this[T3D][D71]=new Intl[t2C](this[I4U],{hour:y7I,minute:y7I,second:y7I,hour12:u27}
);this[T3D][I9U]=new Intl[t2C](this[I4U],{year:C6D,month:(G3I+i3I+b6S.l2M+q4w+H7T),day:C6D,hour:C6D,minute:C6D}
);this[(T71+z1I+b6S.K7M+S9D+K8M+a71)][q0C]=new Intl[t2C](this[I4U],{month:y7I,day:y7I}
);this[T3D][w5w]=new Intl[t2C](this[I4U],{month:M8z}
);this[T3D][C9C]=new Intl[R5w](this[I4U]);this[T3D][s87]=[];this[T3D][s87][b6S.M1j]=new Intl[(K21+x1M+F9M+b8I)](this[I4U],{maximumFractionDigits:b6S.M1j,minimumFractionDigits:b6S.M1j}
);this[(T71+I37+E1M+K8M+f2T+V0M)][s87][b6S.p1j]=new Intl[R5w](this[I4U],{maximumFractionDigits:b6S.p1j,minimumFractionDigits:b6S.p1j}
);this[T3D][(c5c+c7w+V2c+c1M+r2U+n3I+i2D+d0M)][b6S.G1j]=new Intl[R5w](this[I4U],{maximumFractionDigits:b6S.G1j,minimumFractionDigits:b6S.G1j}
);this[T3D][s87][b6S.D1j]=new Intl[R5w](this[I4U],{maximumFractionDigits:b6S.D1j,minimumFractionDigits:b6S.D1j}
);this[T3D][s87][b6S.N1j]=new Intl[(e9w+F9M+b6S.I2M+U41+r2U+V6j)](this[I4U],{maximumFractionDigits:b6S.N1j,minimumFractionDigits:b6S.N1j}
);this[T3D][N71]=new Intl[R5w](this[(E1M+L11+v7M+b6S.I2M)],{style:N71,minimumFractionDigits:b6S.G1j,maximumFractionDigits:b6S.G1j}
);this[T3D][S8w]=new Intl[R5w](this[I4U],{style:(x0M+i2D+o2M+b6S.I2M+F4C),minimumFractionDigits:b6S.M1j,maximumFractionDigits:b6S.M1j}
);this[T3D][c8w]=new Intl[R5w](this[I4U],{style:N71,minimumFractionDigits:b6S.p1j,maximumFractionDigits:b6S.p1j}
);this[(K8M+F4C+l6R+c1M+d8C+o8R+q2I+b6S.I2M+V0M)][W8w]=new Intl[R5w](this[I4U],{style:N71,minimumFractionDigits:b6S.G1j,maximumFractionDigits:b6S.G1j}
);this[T3D][(x0M+b6S.I2M+u2T+O5z)]=new Intl[R5w](this[I4U],{style:(x0M+b6S.I2M+d4U+j9D+b6S.K7M),minimumFractionDigits:b6S.D1j,maximumFractionDigits:b6S.D1j}
);this[T3D][e8w]=new Intl[R5w](this[I4U],{style:N71,minimumFractionDigits:b6S.N1j,maximumFractionDigits:b6S.N1j}
);STX[j5R](this,this[T3D][w5w],this[I4U]);}
;STXChart.prototype.importLayout=function(config,managePeriodicity,preserveTicksAndCandleWidth){var L3D="reconstructDrawings",S8C="all",A5U="ici",k9R="ataC",G2c="Y4d",f5c="z4d",C9w="h5d",X5M="R5d",U7I="Widt",Y1w="M5d",u17="out",t01="deleteAllPanels",W21="A5d",n3C="serializeDrawings",A4z="ayou",interval=this[(E1M+A4z+b6S.K7M)][k9w],periodicity=this[k5I][W27],candleWidth=this[k5I][h4U],serializedDrawings=this[n3C]();this[k21]();this[D77]=w2T;this[z0z]={}
;var view=STX[x9c](config);if(b6S[W21](view,F4U)){this[t01]();this[k5I]=STX[x9c](view);var panels=view[K41];this[(L57+g2I+u17)][K41]={}
;for(var p in panels){var panel=panels[p];this[X2C](panel[(b6S.l2M+F2U+E1M+b6S.a9M+g2I)],p,panel[N71],panel[C3I]);}
if(STX[T1M](panels)){this[X2C](X1c,X1c,O9w,X1c);}
this[X3D]();var studies=STX[x9c](this[k5I][j7C]);delete  this[k5I][j7C];for(var s in studies){var study=studies[s];STX[a4w][l9c](this,study[c8c],study[(K8M+n1M+x0M+z8I+d0M)],study[n8M],study[Z91],study[c7D]);}
}
if(typeof (this[k5I][L8w])==Q11)this[k5I][L8w]=l3I;if(preserveTicksAndCandleWidth){this[k5I][h4U]=candleWidth;}
else{if(!this[k5I][h4U])this[k5I][h4U]=b6S.n8j;this[X1c][T4c]=Math[y1c](b6S[Y1w]((this[X1c].width/this[k5I][(o2M+m1j+b6S.l2M+E1M+b6S.I2M+U7I+E8M)]),.499));}
this[G2R]();this[k5I][k9w]=interval;this[k5I][W27]=periodicity;if(managePeriodicity){interval=view[(T71+i2D+r2I+b6S.a9M+E1M)];periodicity=view[W27];if(isNaN(periodicity))periodicity=b6S.p1j;if(!interval||b6S[X5M](interval,B7M))interval=p61;if(b6S[C9w](interval,this[k5I][k9w])||b6S[f5c](periodicity,this[k5I][W27])){if(b6S[G2c](interval,this[k5I][k9w])||this[(b6S.l2M+k9R+b6S.a9M+E1M+F17+K6c)]||!this[k2T]){this[j6D](periodicity,interval);}
else{console[H1w]((N3c+n1M+n1M+v9D+B1I+o2M+V8z+u9M+B1I+x0M+b6S.I2M+V0M+A7T+b6S.l2M+A5U+t9I+B1I+F9M+b6S.I2M+o2M+b6S.a9M+X7M+P6j+B1I+b6S.l2M+V6j+b6S.a9M+I41+S8C+p4I+S8M+B1I+K8M+d0M+B1I+n1M+c1M+b6S.K7M+B1I+d0M+b6S.I2M+b6S.K7M));}
}
else{this[A01]();}
}
else{this[A01]();}
this[L3D](serializedDrawings);this[Y5M]();this[D77]=u27;}
;STXChart.prototype.exportLayout=function(){var a2z="pane",y07="t4d",d6c="c4d",T17="w4d",b4R="P4d",obj={}
;for(var field in this[k5I]){if(b6S[b4R](field,j7C)&&b6S[T17](field,K41)){obj[field]=STX[x9c](this[k5I][field]);}
else if(b6S[d6c](field,j7C)){obj[j7C]={}
;}
else if(b6S[y07](field,K41)){obj[(x0M+u1D+i67)]={}
;}
}
for(var panelName in this[(k6D+n1M+l7D+d0M)]){var panel=obj[K41][panelName]={}
,p=this[(a2z+i67)][panelName];panel[N71]=p[N71];panel[C47]=p[C47];panel[C3I]=p[X1c][T5U];}
for(var studyName in this[k5I][j7C]){var study=obj[j7C][studyName]={}
,s=this[k5I][j7C][studyName];study[(b6S.K7M+e7T+b6S.I2M)]=s[c8c];study[b1I]=STX[(R57+J1C)](s[b1I]);study[n8M]=STX[x9c](s[n8M]);study[c7D]=s[c7D];study[Z91]=STX[(R57+n1M+b6S.I2M)](s[Z91]);}
return obj;}
;STXChart.prototype.doCleanupGaps=function(quotes){var U3w="a4d",V9c="f4d",I4z="p4d",e8D="G4d",O27="Q4d",Z4U="F4d",V4D="x4d",t21="acyM",A7D="U4d",n1C="i4d",w5R="W4d";if(!this[d4c])return quotes;if(quotes&&b6S[w5R](quotes.length,0))return quotes;var isForeignExchange=this[X1c][F3I][m8z](".")!=-1,isFuture=STX[N77][R9R](this[X1c][F3I]),interval=this[k5I][k9w];if(!isForeignExchange&&!isFuture&&!STXChart[m8R](interval)){var newQuotes=[],j=0,dt=null,stick=false;for(var i=0;b6S[(D6j+V01+b6S.l2M)](i,quotes.length);i++,j++){var thisQuote=quotes[i],bcdt;if(thisQuote[(F3j+L8j)])bcdt=new Date(thisQuote[q4c][Y7w]());else bcdt=new Date(STX[a5c](thisQuote[W31])[(Z6M+b6S.I2M+b6S.K7M+i2c+x1M+b6S.I2M)]());bcdt=STX[W9T](bcdt,null,"America/New_York");if(b6S[n1C](dt,null)){dt=bcdt;}
else{for(var zz=0;b6S[A7D](zz,1440);zz++){if(!stick)dt=STX[(W1R+t21+K8j+l9R+b6S.K7M)][Q9C](dt,interval,1,this);if(b6S[V4D](bcdt[Y7w](),dt[Y7w]()))break;else if(b6S[Z4U](bcdt[Y7w](),dt[Y7w]())){stick=true;break;}
else{newQuotes[I57]({Date:STX[Z87](dt),Open:newQuotes[b6S[O27](j,1)][(x3R+P6j)],High:newQuotes[b6S[e8D](j,1)][(I41+E1M+z9R)],Low:newQuotes[b6S[I4z](j,1)][G3c],Close:newQuotes[b6S[V9c](j,1)][G3c],Volume:0,Adj_Close:newQuotes[b6S[U3w](j,1)][B8C]}
);stick=false;j++;}
}
}
newQuotes[I57](thisQuote);}
return newQuotes;}
return quotes;}
;STXChart[G0U]=function(stx,quoteFeed,behavior){var k1D="updateChartLoop";this[r9T]=stx;this[v1w]=quoteFeed;this[M4I]=behavior;this[X61]=u27;this[L4C]=F4U;this[B77]=u27;if(this[M4I][j2T])this[k1D]();}
;STXChart.Driver.prototype.die=function(){if(this[L4C])window[H9I](this[L4C]);}
;STXChart.Driver.prototype.updateChart=function(){var Y7U="Fee",R7c="rD",F2M="E7d",T2I="rDa",I1M="aster",i71="objLength";if(this[B77])return ;if(this[X61])return ;this[(o7I+t61+E0T+Z6M+N7z+V0M+b6S.K7M)]=true;var howManyToGet=STX[i71](this[r9T][F1w]),howManyReturned=0;function closure(self,params,symbol){return function(dataCallback){var X6D="k7d",S3I="nup",m5z="oCl",S4M="unshift",z9M="l7d",i0U="Z7d",P2R="H7",j3R="n7d";howManyReturned++;if(b6S[(E8j+m71+b6S.l2M)](symbol,params[X1c][(o0R+F9M+c1M+E1M)])){if(!dataCallback.error){var lastBarAdded=false;if(!params[j5c]&&!STXChart[m8R](params[k9w])){if(params[X1c][B6w].length&&dataCallback[o5D]&&b6S[j3R](dataCallback[o5D].length,0)){var lastRecord=params[X1c][B6w][b6S[(P2R+b6S.l2M)](params[X1c][(l37+d0M+C3w+F3j+V6j+b6S.a9M)].length,1)];if((dataCallback[o5D][0][q4c]&&b6S[i0U](lastRecord[q4c],dataCallback[o5D][0][q4c]))||(dataCallback[(e0M+X7M+t8R+d0M)][0][W31]&&b6S[z9M](lastRecord[W31],dataCallback[o5D][0][W31]))){dataCallback[o5D][S4M](lastRecord);lastBarAdded=true;}
}
dataCallback[o5D]=self[r9T][(b6S.l2M+m5z+b6S.I2M+b6S.a9M+S3I+H9M+b6S.a9M+x0M+d0M)](dataCallback[(r6c+c1M+b6S.K7M+b6S.I2M+d0M)]);if(lastBarAdded)dataCallback[o5D][R8z]();}
self[r9T][E5U](dataCallback[o5D],params[X1c]);}
else{self[(r6c+v9D+V2c+b6S.I2M+b6S.I2M+b6S.l2M)][t4z](params,dataCallback);}
}
if(b6S[X6D](howManyReturned,howManyToGet)){self[(X7M+x0M+b6S.l2M+d4M+X5C+I41+V8z+V0M+b6S.K7M)]=false;}
if(self[M4I][j0T]){self[M4I][j0T](params);}
}
;}
;for(var chartName in this[r9T][F1w]){var chart=this[r9T][F1w][chartName];if(!chart[F3I])continue;if(!chart[B6w]||!chart[(x1M+I1M+F3j+J2M)].length)continue;var params=this[(x1M+b6S.a9M+S8M+I9c+b6S.a9M+S0U+x1M+d0M)](chart[F3I],chart);params[T37]=chart[(x1M+b6S.a9M+j4T+T2I+b6S.K7M+b6S.a9M)][b6S[F2M](chart[(l37+j4T+R7c+V6j+b6S.a9M)].length,1)][q4c];params[L7c]=true;params[E2M]=STX[r3D](params);this[(r6c+v9D+b6S.I2M+Y7U+b6S.l2M)][n6c](params,closure(this,params,chart[F3I]));}
}
;STXChart.Driver.prototype.updateChartLoop=function(){var F8j="d7d";function closure(self){return function(){var g4I="updateChart";self[g4I]();}
;}
this[L4C]=window[f0D](closure(this),b6S[F8j](this[M4I][j2T],i8U));}
;STXChart.Driver.prototype.checkLoadMore=function(chart){var d1U="initialScroll",r2w="noLoadMore",O5w="O7d",t7U="T7";if(!chart[q1w])return ;function closure(self,params){return function(dataCallback){var g41="o7d";if(b6S[g41](params[F3I],params[X1c][F3I])){if(!dataCallback.error){if(!params[j5c]&&!STXChart[m8R](params[k9w])){dataCallback[o5D][I57](params[X1c][B6w][0]);dataCallback[o5D]=self[r9T][o21](dataCallback[(e0M+F7I+b6S.K7M+b6S.I2M+d0M)]);dataCallback[(r6c+t8R+d0M)][w5I]();}
var fullMasterData=dataCallback[o5D][A0z](params[X1c][B6w]);self[r9T][Z1M](fullMasterData,params[X1c]);self[r9T][A01]();self[r9T][Y5M]();params[X1c][q1w]=dataCallback[q1w];if(self[M4I][j0T]){self[M4I][j0T](params);}
}
else{self[v1w][t4z](params,dataCallback);}
if(!params[d4C])params[X1c][h8U]=false;}
}
;}
if(b6S[(t7U+b6S.l2M)](chart[g91].length,0)&&b6S[O5w](chart[s67],chart[g91].length)&&!this[M4I][r2w]){this[r9T][(o2M+b6S.a9M+n1M+o2M+l7D+E8j+w2w+x0M+b6S.I2M)]=true;if(!chart[h8U]){chart[d1U]=chart[s67];chart[h8U]=true;var params=this[E9M](chart[F3I],chart);params[e3j]=chart[B6w][0][q4c];params[E2M]=STX[r3D](params);this[v1w][n6c](params,closure(this,params));}
}
if(chart[h8U]){chart[d1U]=chart[s67];}
}
;STXChart.Driver.prototype.barsToFetch=function(params){var J87="7d",M77="X7",y5U="D7",c5z="u7d",n7I="L7d",C7w="isSeries";if(params[C7w])return params[r9T][B6w].length;var p=params[r9T][k5I][(x0M+t2D+n61+K8M+o2M+H7T+g2I)];if(b6S[n7I](params[r9T][k5I][k9w],"month"))p=b6S[c5z](30,p);if(b6S[(y5U+b6S.l2M)](params[(d0M+b6S.K7M+s2I)][k5I][k9w],(J2I+i5D+S8M)))p=b6S[(M77+b6S.l2M)](7,p);var bars=b6S[(b6S.I2M+J87)](params[r9T][X1c][(x1M+b6S.a9M+s2I+L8j+c5U+d0M)],p);return bars;}
;STXChart.Driver.prototype.makeParams=function(symbol,chart){var P9U="barsToFetch",I61="layed",params={stx:this[r9T],symbol:symbol,chart:chart,interval:this[r9T][k5I][(E0T+C3w+l61)],period:b6S.p1j,feed:(b6S.l2M+b6S.I2M+I61),ticks:this[P9U]({stx:this[r9T]}
)}
;if(!isNaN(params[k9w])){params[S57]=params[k9w];params[k9w]=d2T;}
return params;}
;STXChart.Driver.prototype.newChart=function(symbol,chart,cb){var Z9C="wCl",stx=this[r9T];chart[q1w]=false;var params=this[E9M](symbol,chart);function closure(self,params){return function(dataCallback){var i5C="ni",A8z="dateC",g9T="N7d",u67="C7d";if(b6S[u67](symbol,params[(V61+P8U)][(o0R+F7U+E1M)])){if(!dataCallback.error&&b6S[g9T](dataCallback.error,0)){if(!params[j5c]&&!STXChart[m8R](params[k9w]))dataCallback[o5D]=stx[o21](dataCallback[o5D]);stx[Z1M](dataCallback[o5D],params[X1c]);params[X1c][q1w]=dataCallback[q1w];self[X61]=false;if(!params[J1z])self[(X7M+x0M+A8z+E8M+K8j+b6S.K7M)]();stx[A01]();stx[(K8M+i5C+b6S.K7M+x4w+E1M+h5T+P01+i1M)]();stx[Y5M]();}
else{self[v1w][t4z](params,dataCallback);}
}
self[X61]=false;if(cb){cb(dataCallback.error);}
if(self[M4I][(D4w+E1M+F9M+N9I)]){self[M4I][j0T](params);}
}
;}
;this[X61]=true;params[E2M]=STX[(W3j+b6S.a9M+i6R+c1M+Z9C+V6I)](params);this[v1w][n6c](params,closure(this,params));}
;STXChart.prototype.attachQuoteFeed=function(quoteFeed,behavior){if(!behavior)behavior={}
;if(this[b3D]){this[b3D][E3z]();}
this[b3D]=new STXChart[G0U](this,quoteFeed,behavior);}
;STX[a4w][d1c]=function(stx,sd){var T5T="I0d",q4D="v0d",F1C="s0d",v21="j0d",b6C="geExpon",U4w="ignal",t6c="signal",N9c="b0d",B6R="g0d",i2w="V0d",b7I="signalDays",n9U="macd2Days",B1C="Fa",v57="macd1Days",Y17="ough",E5D="erm",t6I="q0d",quotes=sd[X1c][r4R];if(b6S[t6I](quotes.length,sd[F1M]+1)){if(typeof practiceMode!="undefined"&&practiceMode)return ;stx[(J2I+V6j+E5D+b6S.a9M+V0M+S8M)](sd[c7D],"center","bottom",stx[f5I]((n6j+c1M+b6S.K7M+B1I+b6S.I2M+n1M+Y17+B1I+e0M+N87+l5D+B1I+b6S.K7M+c1M+B1I+o2M+Z7D+c6z+b6S.I2M+B1I+X8j+b6S.V71+I41+F3j+B1I)+sd[X1c][g91].length));return ;}
if(!sd[v57])sd[v57]=parseFloat(sd[b1I][(B1C+d0M+b6S.K7M+B1I+X8j+b6S.V71+B1I+J6j+b6S.I2M+V0M+L91)]);if(!sd[n9U])sd[n9U]=parseFloat(sd[b1I]["Slow MA Period"]);if(!sd[b7I])sd[b7I]=parseFloat(sd[b1I]["Signal Period"]);if(!sd[F1M])sd[F1M]=Math[z4M](sd[v57],sd[(x1M+b6S.a9M+o2M+b6S.l2M+G3I+F3j+N3j+d0M)],sd[b7I]);sd[r4c]=new STX[a4w][s0C](sd[T5U]+"_"+sd[v57],"ma",sd[c7D]);sd[r4c][X1c]=sd[X1c];sd[r4c][F1M]=sd[v57];sd[r4c][(K8M+k7w+b6S.K7M+d0M)]={"Field":"Close"}
;STX[(k4U+b6S.l2M+K8M+l5D)][l51](stx,sd[r4c]);sd[(l37+o2M+a7U)]=new STX[a4w][s0C](sd[(n1M+b6S.a9M+x1M+b6S.I2M)]+"_"+sd[n9U],"ma",sd[c7D]);sd[J4c][X1c]=sd[X1c];sd[J4c][F1M]=sd[n9U];sd[J4c][b1I]={"Field":(I41+E1M+z9R)}
;STX[a4w][l51](stx,sd[J4c]);for(var i=b6S[i2w](sd[F1M],1);b6S[B6R](i,quotes.length);i++){var quote=quotes[i];quote[sd[T5U]]=b6S[N9c](quote[sd[r4c][T5U]],quote[sd[J4c][T5U]]);}
sd[p01][sd[T5U]]=(t3w);var signalName="signal "+sd[T5U];sd[t6c]=new STX[a4w][s0C](signalName,"ma",sd[c7D]);sd[t6c][X1c]=sd[X1c];sd[t6c][F1M]=sd[(d0M+U4w+F3j+b6S.a9M+g2I+d0M)];sd[t6c][b1I]={"Field":sd[T5U]}
;STX[(y9z+l5D)][(D4w+o2M+X7M+L57+b6S.K7M+T67+e6C+f11+N17+b6C+b6S.I2M+F4C+K8M+v7M)](stx,sd[t6c]);var histogram=sd[T5U]+"_hist";for(var i=b6S[v21](sd[F1M],1);b6S[F1C](i,quotes.length);i++){var quote=quotes[i],signal=quote[signalName];if(!signal&&b6S[q4D](signal,0))continue;quote[histogram]=b6S[T5T](quote[sd[T5U]],quote[signalName]);}
sd[p01][sd[t6c][T5U]]="Signal";}
;STX[a4w][F0M]=function(stx,sd){var k17="M0d",c1c="A0d",L7I="K0d",w71="r0d",m9U="B0d",j31="Av",j67="lat",f8j="y0d",r8w="m0d",f8U="bb",W9U="scru",quotes=sd[X1c][(W9U+f8U+b6S.I2M+b6S.l2M)];if(b6S[r8w](sd[F1M],0))sd[F1M]=1;sd[l37]=new STX[a4w][s0C](sd[(d8C+c77)],"ma",sd[c7D]);sd[(l37)][(o2M+E8M+i1M)]=sd[X1c];sd[l37][(b6S.l2M+c0R)]=sd[F1M];var field=sd[b1I]["Field"];if(b6S[f8j](field,"field"))field="Close";var type=sd[(E0T+x0M+X7M+b6S.K7M+d0M)]["Moving Average Type"];if(!type)type=sd[b1I]["Type"];sd[l37][b1I]={"Field":field,"Type":type}
;sd[l37][n8M]={"_MA":null}
;this[(N3c+E1M+A7c+j67+T67+c91+X5C+j31+i2D+b6S.a9M+Z6M+b6S.I2M)](stx,sd[l37]);var acc1=0,acc2=0,ma=0,mult=sd[b1I]["Standard Deviations"];if(b6S[m9U](mult,0))mult=2;var name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
for(var i=0;b6S[w71](i,quotes.length);i++){var quote=quotes[i],ma=quote["_MA "+sd[l37][(T5U)]],val=quote[field];acc1+=Math[C5I](val,2);acc2+=val;if(b6S[L7I](i,sd[F1M]-1)){var val2=quotes[b6S[c1c](i,sd[F1M])][field];acc1-=Math[C5I](val2,2);acc2-=val2;quote[name]=b6S[k17](Math[k9D]((acc1+sd[F1M]*Math[C5I](ma,2)-2*ma*acc2)/sd[(k4c+g2I+d0M)]),mult);}
else{quote[name]=null;}
}
}
;STX[(E8j+i3M+b6S.l2M+U5w+d0M)][J3z]=function(stx,sd){var D9z="a1d",g3c="f1d",v27="p1d",G4I="G1d",I8D="Q1d",q8C="F1d",d9I="x1d",h3j="U1d",K1c="i1d",s0T="J1d",s8z="W1d",T7U="t1d",y61="c1d",Y2C="w1d",F8C="P1d",I2I="calculateMovingAverageTriangular",J8C="Y1d",t9R="z1d",B87="dies",H77="h0d",f6U="R0d",type=sd[b1I]["Type"];if(b6S[f6U](type,"ma")||!type)type="simple";if(b6S[H77](type,"exponential")){STX[(E8j+b6S.K7M+X7M+B87)][l51](stx,sd);return ;}
else if(b6S[t9R](type,"time series")){STX[a4w][n4I](stx,sd);return ;}
else if(b6S[J8C](type,"triangular")){STX[a4w][I2I](stx,sd);return ;}
else if(b6S[F8C](type,"variable")){STX[a4w][o5z](stx,sd);return ;}
else if(b6S[Y2C](type,(c91+b6S.l2M+g2I+b6S.a9M))){STX[a4w][o5z](stx,sd);return ;}
else if(b6S[(y61)](type,"weighted")){STX[a4w][k47](stx,sd);return ;}
else if(b6S[T7U](type,"welles wilder")){STX[(k4U+q5c+b6S.I2M+d0M)][l51](stx,sd);return ;}
else if(b6S[s8z](type,"simple")){return ;}
var quotes=sd[X1c][r4R];if(b6S[s0T](sd[F1M],0))sd[F1M]=1;var acc=0,ma=0,ii=0,name=sd[(n1M+b6S.a9M+c77)];for(var p in sd[n8M]){name=p+" "+name;}
var field=sd[b1I]["Field"];if(b6S[K1c](field,"field")||!field)field=(y3c+c1M+P6j);var vals=[];for(var i=0;b6S[h3j](i,quotes.length);i++){var quote=quotes[i],val=quote[field];if(!val&&b6S[(d9I)](val,0)){quote[name]=null;continue;}
;acc+=val;vals[I57](val);if(b6S[q8C](ii,sd[F1M]-1)){ma=b6S[(I8D)](acc,sd[F1M]);quote[name]=ma;}
else if(b6S[G4I](ii,sd[F1M])){var val2=vals[R8z]();acc-=val2;ma=b6S[v27](acc,sd[(b6S.l2M+c0R)]);quote[name]=ma;}
else if(b6S[g3c](ii,0)){ma=acc;quote[name]=null;}
else{ma=b6S[D9z](acc,(ii+1));quote[name]=null;}
ii++;}
}
;STX[a4w][l51]=function(stx,sd){var X9T="O8d",x7U="d8d",B51="E8d",u07="k8d",a8M="l8d",E9U="Z8d",q61="H8d",n2R="n8d",p1I="S8d",type=sd[b1I]["Type"],quotes=sd[(o2M+E8M+i1M)][r4R],acc=0,ma=0,ii=0,multiplier=(b6S[p1I](2,(sd[F1M]+1)));if(b6S[n2R](type,"welles wilder"))multiplier=b6S[q61](1,sd[F1M]);var emaPreviousDay=0,name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var field=sd[b1I]["Field"];if(b6S[E9U](field,"field"))field="Close";for(var i=0;b6S[a8M](i,quotes.length);i++){var quote=quotes[i],val=quote[field];if(!val&&b6S[u07](val,0)){quote[name]=null;continue;}
if(b6S[B51](ii,sd[(b6S.l2M+N3j+d0M)]-1)){acc+=val;ma=b6S[x7U](acc,sd[F1M]);quote[name]=ma;}
else if(b6S[(h0C+b6S.l2M)](ii,sd[F1M])){var m=multiplier;ma=(b6S[(B7U+b6S.l2M)]((val-emaPreviousDay),m))+emaPreviousDay;quote[name]=ma;}
else if(b6S[X9T](ii,0)){acc+=val;ma=acc;quote[name]=null;}
else{acc+=val;ma=b6S[(t9z+b6S.l2M)](acc,(ii+1));quote[name]=null;}
emaPreviousDay=ma;ii++;}
}
;STX[a4w][o5z]=function(stx,sd){var I6U="l6d",B9U="g6d",c5D="V6d",U8R="q6d",h9R="N8d",h9w="C8d",B1j="e8d",Q0R="cmo",v2C="X8d",Q37="D8d",t3z="u8d",type=sd[b1I]["Type"],quotes=sd[X1c][r4R],alpha=(b6S[t3z](2,(sd[F1M]+1))),vmaPreviousDay=0,name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var field=sd[b1I]["Field"];if(b6S[Q37](field,"field"))field="Close";if(b6S[v2C](type,"vidya")){sd[i4T]=new STX[a4w][s0C](sd[T5U],"sdev",sd[c7D]);sd[i4T][X1c]=sd[X1c];sd[i4T][F1M]=5;sd[i4T][b1I]={"Field":field,"Standard Deviations":1,"Type":"ma"}
;sd[i4T][n8M]={"STD":null}
;this[F0M](stx,sd[i4T]);sd[l37]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[l37][(o2M+V8z+P8U)]=sd[X1c];sd[l37][F1M]=20;sd[l37][b1I]={"Field":"STD "+sd[T5U],"Standard Deviations":1,"Type":(x1M+b6S.a9M)}
;sd[l37][n8M]={"MASTD":null}
;this[N3U](stx,sd[l37]);}
else{sd[Q0R]=new STX[a4w][s0C](sd[T5U],(Q0R),sd[c7D]);sd[Q0R][(o2M+E8M+b6S.a9M+P8U)]=sd[X1c];sd[Q0R][F1M]=9;sd[Q0R][n8M]={"CMO":null}
;STX[a4w][T8I](stx,sd[Q0R]);}
for(var i=0;b6S[B1j](i,quotes.length);i++){var quote=quotes[i],val=quote[field];if(!val&&b6S[h9w](val,0)){quote[name]=null;continue;}
var vi;if(b6S[h9R](type,"vidya")){if(!quote["MASTD "+sd[T5U]])continue;else vi=b6S[U8R](quote["STD "+sd[T5U]],quote["MASTD "+sd[T5U]]);}
else{if(!quote["CMO "+sd[T5U]])continue;else vi=b6S[c5D](Math[v8M](quote["CMO "+sd[T5U]]),100);}
var vma=(b6S[B9U](alpha,vi,val))+(b6S[I6U]((1-(alpha*vi)),vmaPreviousDay));quote[name]=vma;vmaPreviousDay=vma;}
}
;STX[a4w][n4I]=function(stx,sd){var U9D="k6d",n31="ator",a5D="culate";sd[l37]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][b1I]=sd[b1I];this[(N3c+E1M+a5D+q9w+J1C+b6S.a9M+V0M+X1j+B4D+V0M+b6S.I2M+p1M+b6S.l2M+K8M+o2M+n31)](stx,sd[l37]);var name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var quotes=sd[X1c][(y1j+V0M+X7M+F9M+K7c)];for(var i=0;b6S[U9D](i,quotes.length);i++){var quote=quotes[i];quote[name]=quote["Forecast "+sd[T5U]];}
}
;STX[a4w][(o2M+b6S.a9M+e27+b6S.a9M+k4M+e6C+f11+N17+Z6M+b6S.I2M+L8j+V0M+x4w+n1M+Z6M+U0I+K8j)]=function(stx,sd){var I1I="o6d",w6M="d6d",W6M="E6d",z21="bbe",quotes=sd[X1c][(d0M+o2M+X8U+z21+b6S.l2M)];sd[l37]=new STX[a4w][s0C](sd[T5U]+"_simple",(l37),sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=Math[t97](b6S[W6M](sd[F1M],2));sd[l37][b1I]={"Field":sd[b1I][(A3j+U5w+E1M+b6S.l2M)],"Type":"simple"}
;STX[a4w][N3U](stx,sd[l37]);if(b6S[w6M](sd[F1M]%2,0))sd[l37][F1M]++;sd[l37][b1I]={"Field":sd[l37][T5U],"Type":"simple"}
;sd[l37][T5U]=sd[T5U];STX[a4w][N3U](stx,sd[l37]);var name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
for(var i=0;b6S[I1I](i,quotes.length);i++){var quote=quotes[i];quote[name]=quote[sd[T5U]];}
return ;}
;STX[a4w][k47]=function(stx,sd){var o91="H3d",t8z="n3d",D3D="S3d",h7z="a6d",v4I="f6d",K0z="p6d",d7U="G6d",y1C="Q6d",N1D="F6d",z2I="O6d",d4w="ield",x07="T6d",quotes=sd[X1c][r4R],accAdd=0,accSubtract=0,field=sd[b1I]["Field"];if(b6S[x07](field,(q6M+d4w)))field="Close";var divisor=b6S[z2I](sd[F1M],(sd[F1M]+1),2),name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
for(var i=0;b6S[N1D](i,quotes.length);i++){var quote=quotes[i],val=quote[field];if(!val&&b6S[y1C](val,0)){quote[name]=null;continue;}
var weight=Math[(T47+n1M)](sd[F1M],i+1);if(b6S[d7U](i,sd[F1M])){accAdd-=accSubtract;if(quotes[b6S[K0z](i,sd[F1M])]&&quotes[b6S[v4I](i,sd[(k4c+y0T)])][field])accSubtract-=quotes[b6S[h7z](i,sd[F1M])][field];}
accAdd+=b6S[D3D](weight,val);accSubtract+=val;if(b6S[t8z](i,sd[F1M]-1)){quote[name]=null;}
else{quote[name]=b6S[o91](accAdd,divisor);}
}
return ;}
;STX[a4w][v8C]=function(stx,sd){var T2C="j9K",N7w="b9K",C2M="g9K",q6I="V9K",f2C="q9K",z71="N3d",P7c="C3d",t6C="e3d",Q2w="X3d",E6c="D3d",G2M="u3d",A3z="L3d",A3I="O3d",P3D="T3d",O3j="o3d",t2z="d3d",T2U="E3d",O7M="k3d",z7D="l3d",o87="Z3d",quotes=sd[X1c][r4R],period=sd[F1M],compare=sd[b1I]["Compare To"];for(var sym=0;b6S[o87](sym,compare.length);sym++){var sB=0,sC=0,sB2=0,sC2=0,sBC=0,thisCompare=compare[sym];for(var i=0;b6S[z7D](i,quotes.length-1);i++){if(!quotes[i])continue;var comparisonQuote=quotes[i][thisCompare];if(!comparisonQuote){if(b6S[O7M](i,0)&&quotes[b6S[T2U](i,1)]&&quotes[b6S[t2z](i,1)]["_"]["c"])comparisonQuote=quotes[b6S[O3j](i,1)]["_"]["c"];else comparisonQuote=0;}
quotes[i]["_"]={}
;sB+=quotes[i]["_"]["b"]=quotes[i][G3c];sC+=quotes[i]["_"]["c"]=comparisonQuote;sB2+=quotes[i]["_"]["b2"]=Math[C5I](quotes[i][G3c],2);sC2+=quotes[i]["_"][(o2M+G3I)]=Math[C5I](comparisonQuote,2);sBC+=quotes[i]["_"]["bc"]=b6S[P3D](quotes[i][G3c],comparisonQuote);if(b6S[A3I](i,period)){sB-=quotes[b6S[A3z](i,period)]["_"]["b"];sC-=quotes[b6S[G2M](i,period)]["_"]["c"];sB2-=quotes[b6S[E6c](i,period)]["_"][(F9M+G3I)];sC2-=quotes[b6S[Q2w](i,period)]["_"]["c2"];sBC-=quotes[b6S[t6C](i,period)]["_"]["bc"];quotes[b6S[P7c](i,period)]["_"]=null;var vb=b6S[z71](sB2/period,Math[C5I](sB/period,2)),vc=b6S[f2C](sC2/period,Math[C5I](sC/period,2)),cv=b6S[q6I](sBC/period,sB*sC/Math[C5I](period,2)),cc=b6S[C2M](cv,Math[k9D](vb*vc));quotes[i]["Result "+thisCompare+" "+sd[T5U]]=cc;}
}
for(var j=b6S[N7w](quotes.length,period);b6S[T2C](j,quotes.length);j++){quotes[j]["_"]=null;}
}
}
;STX[a4w][f2U]=function(stx,sd){var J0U="y9K",c97="ngerSign",y3I="tud",W3C="ema3",o9D="m9K",H6U="I9K",j5I="a2",H3C="ema1",d8I="s9K",Z4D="Kli",quotes=sd[X1c][r4R];sd[k6M]=new STX[a4w][s0C](sd[T5U],"typical price",sd[c7D]);sd[(k6M)][X1c]=sd[X1c];sd[k6M][F1M]=1;sd[k6M][n8M]={"Typ Price":null}
;STX[a4w][s91](stx,sd[k6M]);var field=sd[T5U]+"_hist",klinger=(Z4D+n1M+Z6M+b6S.I2M+V0M+B1I)+sd[T5U],klingerSignal="KlingerSignal "+sd[T5U],signedVolume="SV "+sd[T5U],shortEMA="EMA-S "+sd[(n1M+b6S.a9M+x1M+b6S.I2M)],longEMA="EMA-L "+sd[T5U];for(var i=1;b6S[d8I](i,quotes.length);i++){var sv=quotes[i][X9D];if(b6S[(p3M+C6j)](quotes[i]["Typ Price "+sd[T5U]],quotes[i-1]["Typ Price "+sd[T5U]]))sv*=-1;quotes[i][signedVolume]=sv;}
sd[H3C]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[H3C][X1c]=sd[X1c];sd[H3C][F1M]=Number(sd[b1I]["Short Cycle"]);sd[H3C][b1I]={"Field":signedVolume,"Type":"exponential"}
;sd[H3C][n8M]={"EMA-S":null}
;STX[a4w][l51](stx,sd[H3C]);sd[w3C]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[w3C][X1c]=sd[X1c];sd[w3C][F1M]=Number(sd[b1I]["Long Cycle"]);sd[(b6S.I2M+x1M+j5I)][b1I]={"Field":signedVolume,"Type":"exponential"}
;sd[w3C][n8M]={"EMA-L":null}
;STX[a4w][l51](stx,sd[w3C]);for(var i=Number(sd[b1I]["Long Cycle"]);b6S[H6U](i,quotes.length);i++){quotes[i][klinger]=b6S[o9D](quotes[i][shortEMA],quotes[i][longEMA]);}
sd[W3C]=new STX[a4w][(E8j+y3I+t0z+b6S.I2M+d0M+S3w+x0M+U8M+V0M)](sd[(d8C+c77)],"ma",sd[c7D]);sd[W3C][X1c]=sd[X1c];sd[W3C][F1M]=Number(sd[b1I]["Signal Periods"]);sd[W3C][b1I]={"Field":klinger,"Type":"exponential"}
;sd[W3C][n8M]={"KlingerSignal":sd[n8M][(C6j+E1M+K8M+c97+b6S.a9M+E1M)]}
;STX[a4w][l51](stx,sd[W3C]);for(var i=0;b6S[J0U](i,quotes.length);i++){quotes[i][field]=b6S[(Q41+K01+C6j)](quotes[i][klinger],quotes[i][klingerSignal]);}
}
;STX[a4w][y3M]=function(stx,sd){var z67="yDes",e5z="Z2K",Z0z="H2K",A0w="n2K",z0C="S2K",n9c="tics",R3w="ochas",X11="mpute",X5I="ugh",J07="r9K",e4D="oo",t0D="smooth";sd[z4M]=100;sd[(x1M+K8M+n1M)]=0;if(!sd[t0D])sd[t0D]=(sd[b1I][(E8j+x1M+e4D+b6S.K7M+E8M)]);var field=sd[b1I]["Field"];if(b6S[J07](field,null))field="Close";var quotes=sd[X1c][r4R];if(b6S[(C6j+K01+C6j)](quotes.length,sd[F1M]+1)){if(typeof practiceMode!="undefined"&&practiceMode)return ;stx[o1M](sd[(c7D)],"center",(F9M+v9D+B4c),stx[f5I]((n6j+c1M+b6S.K7M+B1I+b6S.I2M+E7C+X5I+B1I+e0M+P61+B1I+b6S.K7M+c1M+B1I+o2M+c1M+X11+B1I+d0M+b6S.K7M+R3w+n9c+B1I)+sd[X1c][g91].length+":"+sd[F1M]));return ;}
function computeStochastics(position,field){var T3z="C9K",t2w="A9K",beg=b6S[t2w](position,sd[F1M],1),low=1000000,high=0;for(var i=beg;b6S[(b6S.I2M+K01+C6j)](i,position);i++){low=Math[B9R](low,quotes[i][Q6I]);high=Math[z4M](high,quotes[i][c9R]);}
var k=b6S[T3z]((quotes[position][field]-low),(high-low),100);return k;}
var name=sd[T5U];if(sd[t0D])name=name[W51](0,b6S[(z0C)](name.length,2));for(var i=sd[F1M];b6S[A0w](i,quotes.length);i++){quotes[i][name]=computeStochastics(i,field);}
if(sd[t0D]){for(var i=sd[F1M]+3;b6S[Z0z](i,quotes.length);i++){quotes[i][sd[T5U]]=b6S[e5z]((quotes[i][name]+quotes[i-1][name]+quotes[i-2][name]),3);}
}
sd[p01][sd[T5U]]="Fast";sd[l37]=new STX[a4w][(k4U+b6S.l2M+z67+o2M+V0M+K8M+x0M+b6S.K7M+c1M+V0M)](sd[T5U]+"_3","ma",sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][(k4c+y0T)]=3;sd[l37][b1I]={"Field":sd[T5U],"Type":"simple"}
;sd[l37][B9R]=sd[B9R];sd[l37][z4M]=sd[z4M];STX[a4w][N3U](stx,sd[l37]);sd[p01][sd[T5U]+"_3"]="Slow";}
;STX[a4w][k8R]=function(stx,sd){var k1w="J1K",quotes=sd[X1c][r4R];function calculateConversionLine(stx,sd){var N9U="j5K",b3M="b5K",L2D="g5K",E3c="V5K",w3w="q5K",p7I="N2K",z3U="C2K",M47="e2K",D17="X2",P2M="D2K",K8I="u2K",U9z="L2K",Z0D="O2K",l2U="T2K",k8w="o2K",Q0z="d2K",e1D="E2K",P51="k2K",Y9z="l2K",periodHigh=0,periodLow=999999999,periodAvg=0,ii=0;sd[F1M]=sd[b1I]["Conversion Line Period"];for(var i=0;b6S[Y9z](i,quotes.length);i++){var high=quotes[i]["High"],low=quotes[i]["Low"];if(b6S[P51](high,null)||isNaN(high))high=0;if(b6S[e1D](low,null)||isNaN(low))low=0;if(b6S[Q0z](high,periodHigh))periodHigh=high;if(b6S[k8w](low,periodLow))periodLow=low;if(b6S[l2U](ii,sd[F1M])){var lastHigh=quotes[b6S[(Z0D)](i,sd[(b6S.l2M+c0R)])]["High"];if(b6S[U9z](lastHigh,null)||isNaN(lastHigh))lastHigh=0;if(b6S[K8I](lastHigh,periodHigh)){periodHigh=0;for(var j=i+1-sd[F1M];b6S[P2M](j,i);j++){var innerHigh=quotes[j][(x9I+E8M)];if(b6S[(D17+C6j)](innerHigh,null)||isNaN(innerHigh))innerHigh=0;if(b6S[M47](innerHigh,periodHigh))periodHigh=innerHigh;}
}
var lastLow=quotes[b6S[z3U](i,sd[(F1M)])]["Low"];if(b6S[p7I](lastLow,null)||isNaN(lastLow))lastLow=0;if(b6S[w3w](lastLow,periodLow)){periodLow=999999999;for(var j=i+1-sd[F1M];b6S[E3c](j,i);j++){var innerLow=quotes[j]["Low"];if(b6S[L2D](innerLow,null)||isNaN(innerLow))innerLow=0;if(b6S[b3M](innerLow,periodLow))periodLow=innerLow;}
}
periodAvg=b6S[N9U]((periodHigh+periodLow),2);quotes[i]["Conversion Line "+sd[T5U]]=periodAvg;}
else{quotes[i][(I41+c1M+n1M+r2I+b6S.I2M+V0M+d0M+A7T+n1M+B1I+c3j+K8M+J1C+B1I)+sd[T5U]]=null;}
ii++;}
}
function calculateBaseLine(stx,sd){var m2C="W4K",B97="t4K",x1c="c4K",j5C="w4K",Q27="P4K",h0D="Y4K",p5z="z4",f0w="h5K",r41="R5K",Q97="M5K",u6j="K5K",H7w="r5K",v1D="B5K",f31="y5K",l97="m5",X8C="I5K",p9M="v5K",k5T="s5K",periodHigh=0,periodLow=999999999,periodAvg=0,ii=0;sd[F1M]=sd[b1I]["Base Line Period"];for(var i=0;b6S[k5T](i,quotes.length);i++){var high=quotes[i]["High"],low=quotes[i]["Low"];if(b6S[p9M](high,null)||isNaN(high))high=0;if(b6S[X8C](low,null)||isNaN(low))low=0;if(b6S[(l97+C6j)](high,periodHigh))periodHigh=high;if(b6S[f31](low,periodLow))periodLow=low;if(b6S[v1D](ii,sd[F1M])){var lastHigh=quotes[b6S[H7w](i,sd[F1M])]["High"];if(b6S[u6j](lastHigh,null)||isNaN(lastHigh))lastHigh=0;if(b6S[(p2I+C6j)](lastHigh,periodHigh)){periodHigh=0;for(var j=i+1-sd[F1M];b6S[Q97](j,i);j++){var innerHigh=quotes[j]["High"];if(b6S[r41](innerHigh,null)||isNaN(innerHigh))innerHigh=0;if(b6S[f0w](innerHigh,periodHigh))periodHigh=innerHigh;}
}
var lastLow=quotes[b6S[(p5z+C6j)](i,sd[F1M])]["Low"];if(b6S[h0D](lastLow,null)||isNaN(lastLow))lastLow=0;if(b6S[Q27](lastLow,periodLow)){periodLow=999999999;for(var j=i+1-sd[F1M];b6S[j5C](j,i);j++){var innerLow=quotes[j][(Q6I)];if(b6S[x1c](innerLow,null)||isNaN(innerLow))innerLow=0;if(b6S[B97](innerLow,periodLow))periodLow=innerLow;}
}
periodAvg=b6S[m2C]((periodHigh+periodLow),2);quotes[i]["Base Line "+sd[T5U]]=periodAvg;}
else{quotes[i]["Base Line "+sd[T5U]]=null;}
ii++;}
}
function calculateLeadingSpanA(stx,sd){var K4w="a4K",J7D="f4K",m4T="p4K",s61="G4K",N5U="Q4K",y27="F4K",H81="x4K",F4I="U4K",d2R="i4K",V3z="J4K",conversion=0,base=0,periodAvg=0,ii=0;sd[F1M]=sd[(E0T+x0M+X7M+M6M)]["Base Line Period"];for(var i=0;b6S[V3z](i,quotes.length-26);i++){conversion=quotes[i]["Conversion Line "+sd[T5U]];base=quotes[i]["Base Line "+sd[T5U]];if(b6S[(d2R)](conversion,null)||isNaN(conversion))conversion=0;if(b6S[F4I](base,null)||isNaN(base))base=0;if(b6S[H81](ii,sd[F1M])){periodAvg=b6S[y27]((conversion+base),2);quotes[i+26]["Leading Span A "+sd[T5U]]=periodAvg;}
else{quotes[i+26][(c3j+y1D+b6S.l2M+K8M+n1M+Z6M+B1I+E8j+x0M+b6S.a9M+n1M+B1I+b6S.V71+B1I)+sd[T5U]]=null;}
ii++;}
var jj=0;for(var j=b6S[N5U](quotes.length,26);b6S[s61](j,quotes.length);j++){conversion=quotes[j]["Conversion Line "+sd[T5U]];base=quotes[j]["Base Line "+sd[T5U]];if(b6S[m4T](conversion,null)||isNaN(conversion))conversion=0;if(b6S[J7D](base,null)||isNaN(base))base=0;periodAvg=b6S[K4w]((conversion+base),2);sd[J5I][jj]=periodAvg;jj++;}
}
function calculateLeadingSpanB(stx,sd){var G1C="w1K",x0D="P1K",k4R="Y1K",U4C="z1K",k7C="h0K",p4c="R0K",Z2c="M0K",L6c="A0K",Z2T="K0",O11="r0K",z3R="B0K",v5T="y0K",w0T="m0K",Q8w="I0K",P81="v0K",q67="s0K",D2I="j0K",u7D="b0K",L6w="g0K",h0z="V0K",d91="q0K",I0w="N7K",V6C="C7K",R3R="X7K",L7C="D7K",z2T="u7K",p77="7K",P6w="O7K",e17="T7K",w21="o7K",K1M="d7K",f3j="E7K",h61="k7K",R8U="l7K",a5U="Z7K",F0c="H7K",u47="n7K",k7M="S7K",c41="inp",periodHigh=0,periodLow=999999999,periodAvg=0,ii=0;sd[F1M]=sd[(c41+X7M+M6M)]["Leading Span B Period"];for(var i=0;b6S[k7M](i,quotes.length-26);i++){var high=quotes[i]["High"],low=quotes[i][(Q6I)];if(b6S[u47](high,null)||isNaN(high))high=0;if(b6S[F0c](low,null)||isNaN(low))low=0;if(b6S[a5U](high,periodHigh))periodHigh=high;if(b6S[R8U](low,periodLow))periodLow=low;if(b6S[h61](ii,sd[F1M])){var lastHigh=quotes[b6S[f3j](i,sd[F1M])]["High"];if(b6S[K1M](lastHigh,null)||isNaN(lastHigh))lastHigh=0;if(b6S[w21](lastHigh,periodHigh)){periodHigh=0;for(var j=i+1-sd[F1M];b6S[e17](j,i);j++){var innerHigh=quotes[j]["High"];if(b6S[P6w](innerHigh,null)||isNaN(innerHigh))innerHigh=0;if(b6S[(c3j+p77)](innerHigh,periodHigh))periodHigh=innerHigh;}
}
var lastLow=quotes[b6S[z2T](i,sd[F1M])]["Low"];if(b6S[L7C](lastLow,null)||isNaN(lastLow))lastLow=0;if(b6S[R3R](lastLow,periodLow)){periodLow=999999999;for(var j=i+1-sd[F1M];b6S[(b6S.I2M+m71+C6j)](j,i);j++){var innerLow=quotes[j]["Low"];if(b6S[V6C](innerLow,null)||isNaN(innerLow))innerLow=0;if(b6S[I0w](innerLow,periodLow))periodLow=innerLow;}
}
periodAvg=b6S[d91]((periodHigh+periodLow),2);quotes[i+26]["Leading Span B "+sd[T5U]]=periodAvg;}
else{quotes[i+26]["Leading Span B "+sd[T5U]]=null;}
ii++;}
ii=0;for(var i=b6S[h0z](quotes.length,26);b6S[L6w](i,quotes.length);i++){if(b6S[u7D](i-sd[F1M],0))continue;var high=quotes[i]["High"],low=quotes[i]["Low"];if(b6S[D2I](high,null)||isNaN(high))high=0;if(b6S[q67](low,null)||isNaN(low))low=0;if(b6S[P81](high,periodHigh))periodHigh=high;if(b6S[Q8w](low,periodLow))periodLow=low;var lastHigh=quotes[b6S[w0T](i,sd[F1M])]["High"];if(b6S[v5T](lastHigh,null)||isNaN(lastHigh))lastHigh=0;if(b6S[z3R](lastHigh,periodHigh)){periodHigh=0;for(var j=i+1-sd[F1M];b6S[O11](j,i);j++){var innerHigh=quotes[j]["High"];if(b6S[(Z2T+C6j)](innerHigh,null)||isNaN(innerHigh))innerHigh=0;if(b6S[L6c](innerHigh,periodHigh))periodHigh=innerHigh;}
}
var lastLow=quotes[b6S[Z2c](i,sd[F1M])]["Low"];if(b6S[p4c](lastLow,null)||isNaN(lastLow))lastLow=0;if(b6S[k7C](lastLow,periodLow)){periodLow=999999999;for(var j=i+1-sd[F1M];b6S[U4C](j,i);j++){var innerLow=quotes[j]["Low"];if(b6S[k4R](innerLow,null)||isNaN(innerLow))innerLow=0;if(b6S[x0D](innerLow,periodLow))periodLow=innerLow;}
}
periodAvg=b6S[G1C]((periodHigh+periodLow),2);sd[H5I][ii]=periodAvg;ii++;}
}
function calculateLaggingSpan(stx,sd){var S3z="W1K",W7c="t1K",U0D="c1K",close=0;sd[F1M]=sd[b1I]["Lagging Span Period"];for(var i=sd[(k4c+y0T)];b6S[U0D](i,quotes.length);i++){close=quotes[i]["Close"];if(b6S[W7c](close,null)||isNaN(close))close=0;quotes[b6S[S3z](i,sd[F1M])]["Lagging Span "+sd[T5U]]=close;}
}
sd[J5I]=new Array();sd[H5I]=new Array();if(b6S[k1w](quotes.length,52)){return ;}
calculateConversionLine(stx,sd);calculateBaseLine(stx,sd);calculateLeadingSpanA(stx,sd);calculateLeadingSpanB(stx,sd);calculateLaggingSpan(stx,sd);}
;STX[a4w][e01]=function(stx,sd,quotes){var S47="I3K",a6c="v3K",g47="s3K",D1D="j3K",h4I="b3K",j0C="g3K",G77="utureA",n0T="V3K",Z2D="q3",y8U="elFr",g6U="pix",m0w="N6K",q0R="C6K",g5w="e6K",s9D="D6K",U1M="lFro",q7w="u6K",d5T="L6K",G9D="y6K",G17="m6K",x11="I6K",k2I="v6K",g9z="s6K",w0R="j6K",c17="ure",z0U="onte",g3D="V6K",E3U="q6K",w5T="N8K",C37="C8K",b4M="e8K",G07="X8K",s2z="u8K",A9U="Posi",L0I="L8K",Y5w="O8K",q3R="T8K",B41="o8K",U4M="intersectLineLineY",I27="ureA",L41="tur",G6j="d8K",S21="E8K",q4T="utu",c6D="k8K",g5M="l8K",Q5z="fu",V4U="H8K",d9D="Lin",R8j="intersectLineLineX",G1R="n8K",R9I="S8K",R5z="a1K",r7R="f1K",W0R="p1K",W9I="G1K",K9D="Q1K",W47="F1K",Y6M="x1K",V1M="U1K",r8U="i1K",offset=stx[k9c],intersections=[],panel=stx[K41][sd[c7D]];STX[a4w][o6D](stx,sd,quotes);stx[v17](panel[T5U]);var ichiQuotes=[];for(var i=0;b6S[r8U](i,quotes.length);i++){if(b6S[V1M](quotes[i],null))continue;ichiQuotes[I57](quotes[i].transform?quotes[i].transform:quotes[i]);}
for(var i=0;b6S[Y6M](i,ichiQuotes.length-1);i++){if(b6S[W47](ichiQuotes[i],null))continue;if(b6S[K9D](ichiQuotes[i+1],null))continue;if(b6S[W9I](stx[K41][sd[c7D]][T5U],sd[X1c][T5U])){if(ichiQuotes[i].transform)ichiQuotes[i]=ichiQuotes[i].transform;if(ichiQuotes[i+1].transform)ichiQuotes[i+1]=ichiQuotes[i+1].transform;}
if(b6S[W0R](ichiQuotes[i]["Leading Span A "+sd[(Y3z+b6S.I2M)]],null)||isNaN(ichiQuotes[i]["Leading Span A "+sd[T5U]]))continue;else if((b6S[(r7R)](ichiQuotes[i]["Leading Span A "+sd[T5U]],ichiQuotes[i]["Leading Span B "+sd[T5U]])&&b6S[R5z](ichiQuotes[i+1]["Leading Span A "+sd[T5U]],ichiQuotes[i+1][(c3j+b6S.I2M+O5M+K8M+X5C+B1I+E8j+x0M+m1j+B1I+Q41+B1I)+sd[T5U]]))||(b6S[R9I](ichiQuotes[i]["Leading Span A "+sd[T5U]],ichiQuotes[i]["Leading Span B "+sd[(n1M+n67)]])&&b6S[G1R](ichiQuotes[i+1]["Leading Span A "+sd[T5U]],ichiQuotes[i+1]["Leading Span B "+sd[T5U]]))){var ax1=stx[x0R](i,offset),ax2=stx[x0R](i+1,offset),bx1=ax1,bx2=ax2,ay1=stx[D7C](ichiQuotes[i]["Leading Span A "+sd[T5U]],panel),ay2=stx[D7C](ichiQuotes[i+1]["Leading Span A "+sd[T5U]],panel),by1=stx[D7C](ichiQuotes[i]["Leading Span B "+sd[T5U]],panel),by2=stx[D7C](ichiQuotes[i+1]["Leading Span B "+sd[T5U]],panel),interX=STX[R8j](ax1,ax2,ay1,ay2,bx1,bx2,by1,by2),interY=STX[(K8M+F4C+b6S.I2M+V0M+d0M+O4U+d9D+b6S.I2M+c3j+K8M+n1M+E6D)](ax1,ax2,ay1,ay2,bx1,bx2,by1,by2),intersection={}
;intersection[s2I]=interX;intersection[g2I]=interY;intersection[h7c]=i+1;intersections[I57](intersection);}
}
var futureIntersections=[];for(var i=0;b6S[V4U](i,sd[J5I].length-1);i++){if(b6S[(q4M+h01+C6j)](sd[(Q5z+b6S.K7M+X7M+N4U+b6S.V71)][i],null)||isNaN(sd[J5I][i]));else if((b6S[g5M](sd[J5I][i],sd[H5I][i])&&b6S[c6D](sd[J5I][i+1],sd[(q6M+q4T+V0M+b6S.I2M+Q41)][i+1]))||(b6S[S21](sd[J5I][i],sd[H5I][i])&&b6S[G6j](sd[(Q5z+b6S.K7M+X7M+N4U+b6S.V71)][i+1],sd[(Q5z+L41+b6S.I2M+Q41)][i+1]))){var ax1=stx[x0R](ichiQuotes.length+i,offset),ax2=stx[x0R](ichiQuotes.length+i+1,offset),bx1=ax1,bx2=ax2,ay1=stx[D7C](sd[(q6M+X7M+b6S.K7M+I27)][i],panel),ay2=stx[D7C](sd[J5I][i+1],panel),by1=stx[D7C](sd[H5I][i],panel),by2=stx[D7C](sd[H5I][i+1],panel),interX=STX[R8j](ax1,ax2,ay1,ay2,bx1,bx2,by1,by2),interY=STX[U4M](ax1,ax2,ay1,ay2,bx1,bx2,by1,by2),fIntersection={}
;fIntersection[s2I]=interX;fIntersection[g2I]=interY;fIntersection[(b6S.K7M+K8M+o2M+S8M)]=ichiQuotes.length+i+1;futureIntersections[I57](fIntersection);}
}
for(var k=0;b6S[B41](k,intersections.length);k++){stx[X1c][o4z].lineWidth=0;stx[X1c][o4z].globalAlpha=0.3;stx[X1c][o4z].beginPath();stx[X1c][o4z].moveTo(intersections[k][s2I],intersections[k][g2I]);if(b6S[q3R](ichiQuotes[intersections[k][h7c]]["Leading Span A "+sd[T5U]],ichiQuotes[intersections[k][h7c]]["Leading Span B "+sd[T5U]])){stx[X1c][o4z].fillStyle="#00FF00";}
else{stx[X1c][(U8c+n1M+n3w+b6S.K7M)].fillStyle="#FF0000";}
if(b6S[Y5w](k+1,intersections.length)){for(var n=intersections[k][h7c];b6S[L0I](n,ichiQuotes.length);n++){stx[X1c][o4z].lineTo(stx[(o2M+Z7D+x0M+X7M+h7M+A9U+b6S.K7M+W5M)](n,offset),stx[D7C](ichiQuotes[n]["Leading Span A "+sd[(Y3z+b6S.I2M)]],panel));}
for(var m=b6S[s2z](ichiQuotes.length,1);b6S[(M2U+C6j)](m,intersections[k][h7c]);m--){stx[X1c][o4z].lineTo(stx[x0R](m,offset),stx[D7C](ichiQuotes[m]["Leading Span B "+sd[T5U]],panel));}
}
else{for(var n=intersections[k][h7c];b6S[G07](n,intersections[k+1][h7c]);n++){stx[X1c][o4z].lineTo(stx[x0R](n,offset),stx[D7C](ichiQuotes[n]["Leading Span A "+sd[(Y3z+b6S.I2M)]],panel));}
stx[X1c][o4z].lineTo(intersections[k+1][s2I],intersections[k+1][g2I]);for(var m=b6S[b4M](intersections[k+1][h7c],1);b6S[C37](m,intersections[k][(b6S.K7M+K8M+o2M+S8M)]);m--){stx[X1c][o4z].lineTo(stx[x0R](m,offset),stx[D7C](ichiQuotes[m]["Leading Span B "+sd[T5U]],panel));}
}
stx[X1c][o4z].fill();}
stx[X1c][o4z].beginPath();if(b6S[w5T](k,0)){stx[X1c][o4z].moveTo(stx[x0R](b6S[E3U](ichiQuotes.length,1),offset),stx[D7C](ichiQuotes[b6S[g3D](ichiQuotes.length,1)]["Leading Span A "+sd[T5U]],panel));var ql;if(b6S[(S5D+C6j)](futureIntersections.length,0)){ql=ichiQuotes.length;for(var n=0;b6S[(R1M+C6j)](n,sd[J5I].length);n++){stx[X1c][(o2M+z0U+s2I+b6S.K7M)].lineTo(stx[x0R](ql,offset),stx[D7C](sd[(q6M+z8I+c17+b6S.V71)][n],panel));ql++;}
ql--;for(var n=b6S[w0R](sd[H5I].length,1);b6S[g9z](n,0);n--){stx[X1c][o4z].lineTo(stx[x0R](ql,offset),stx[D7C](sd[H5I][n],panel));ql--;}
stx[X1c][o4z].lineTo(stx[x0R](b6S[k2I](ichiQuotes.length,1),offset),stx[D7C](ichiQuotes[b6S[x11](ichiQuotes.length,1)]["Leading Span B "+sd[T5U]],panel));stx[X1c][o4z].fill();}
else{ql=ichiQuotes.length;for(var n=0;b6S[G17](n,futureIntersections[0][h7c]-ichiQuotes.length);n++){stx[X1c][o4z].lineTo(stx[x0R](ql,offset),stx[D7C](sd[J5I][n],panel));ql++;}
ql--;stx[X1c][(o2M+c1M+z9C+b6S.K7M)].lineTo(futureIntersections[0][s2I],futureIntersections[0][g2I]);for(var n=b6S[G9D](futureIntersections[0][h7c],1,ichiQuotes.length);b6S[d5T](n,0);n--){stx[X1c][o4z].lineTo(stx[x0R](ql,offset),stx[D7C](sd[H5I][n],panel));ql--;}
stx[X1c][o4z].lineTo(stx[x0R](b6S[q7w](ichiQuotes.length,1),offset),stx[(x0M+Q3U+U1M+m3R+V0M+c7w+b6S.I2M)](ichiQuotes[b6S[s9D](ichiQuotes.length,1)]["Leading Span B "+sd[T5U]],panel));stx[(o2M+v9T)][o4z].fill();}
}
for(var k=0;b6S[(b7M+F71+C6j)](k,futureIntersections.length);k++){stx[X1c][o4z].lineWidth=0;stx[X1c][o4z].globalAlpha=0.3;stx[X1c][o4z].beginPath();stx[X1c][o4z].moveTo(futureIntersections[k][s2I],futureIntersections[k][g2I]);if(b6S[g5w](sd[J5I][futureIntersections[k][h7c]-ichiQuotes.length],sd[H5I][futureIntersections[k][h7c]-ichiQuotes.length])){stx[X1c][o4z].fillStyle="#00FF00";}
else{stx[X1c][o4z].fillStyle="#FF0000";}
if(b6S[q0R](k+2,futureIntersections.length)){for(var n=futureIntersections[k][h7c];b6S[m0w](n,sd[J5I].length+ichiQuotes.length);n++){stx[X1c][o4z].lineTo(stx[x0R](n,offset),stx[(g6U+y8U+c1M+x1M+s0M+K2U)](sd[J5I][b6S[(Z2D+C6j)](n,ichiQuotes.length)],panel));}
for(var m=b6S[n0T](sd[(q6M+G77)].length,1);b6S[j0C](m,futureIntersections[k][h7c]-ichiQuotes.length);m--){stx[X1c][o4z].lineTo(stx[x0R](m+ichiQuotes.length,offset),stx[D7C](sd[H5I][m],panel));}
}
else{for(var n=futureIntersections[k][h7c];b6S[h4I](n,futureIntersections[k+1][h7c]);n++){stx[X1c][o4z].lineTo(stx[x0R](n,offset),stx[D7C](sd[J5I][b6S[D1D](n,ichiQuotes.length)],panel));}
stx[X1c][(U8c+n1M+b6S.K7M+b6S.I2M+s2I+b6S.K7M)].lineTo(futureIntersections[k+1][s2I],futureIntersections[k+1][g2I]);for(var m=b6S[g47](futureIntersections[k+1][h7c],1);b6S[a6c](m,futureIntersections[k][h7c]);m--){stx[X1c][o4z].lineTo(stx[x0R](m,offset),stx[D7C](sd[H5I][b6S[S47](m,ichiQuotes.length)],panel));}
}
stx[X1c][(U8c+n1M+b6S.K7M+b6S.I2M+w5z)].fill();}
stx[a51]();}
;STX[(E8j+i3M+b6S.l2M+K8M+b6S.I2M+d0M)][N7C]=function(stx,sd){var F3U="h3K",a0D="R3K",i2R="M3K",S8j="A3K",O7D="Tru",t9M="K3K",t8M="r3K",r5D="B3K",y4I="y3K",l7R="m3K",quotes=sd[X1c][r4R],period=sd[F1M],total=0;for(var i=1;b6S[l7R](i,quotes.length);i++){var prices=quotes[i],pd=quotes[b6S[y4I](i,1)],trueRange=b6S[r5D](Math[z4M](prices[c9R],pd[G3c]),Math[B9R](prices[Q6I],pd[G3c]));total+=trueRange;if(b6S[t8M](i,period))total-=quotes[b6S[t9M](i,period)][(O7D+b6S.I2M+B1I+X1j+b6S.a9M+u9M+B1I)+sd[T5U]];prices["True Range "+sd[T5U]]=trueRange;if(b6S[S8j](i,period))prices["ATR "+sd[T5U]]=b6S[i2R](total,period);else if(b6S[a0D](i,period))prices["ATR "+sd[T5U]]=b6S[(F3U)]((pd["ATR "+sd[T5U]]*(period-1)+trueRange),period);}
}
;STX[a4w][n41]=function(stx,sd){this[N7C](stx,sd);STX[a4w][n8U](stx,sd,sd[b1I][Z7M],sd[b1I][L8z],R7M+sd[T5U]);}
;STX[a4w][y9D]=function(stx,sd){var b77="Q9G",T2D="F9G",Q5C="x9G",Q1R="U9G",v4T="i9G",t8c="J9G",m6U="W9G",G4w="t9G",n1I="c9G",a8w="w9G",a01="Mult",y0z="P9G",F2I="Y9G",j0I="z9G",quotes=sd[X1c][r4R];this[N7C](stx,sd);var useHighLow=sd[b1I]["HighLow"];for(var i=1;b6S[j0I](i,quotes.length-1);i++){var prices=quotes[i],pd=quotes[b6S[F2I](i,1)],prev=prices[(Q41+X7M+g2I+B1I+E8j+b6S.K7M+c1M+x0M+d0M+B1I)+sd[T5U]];if(!prev)prev=prices["Sell Stops "+sd[T5U]];if(!prev)prev=0;if(!prices||!pd)continue;var base=prices[G3c],result=null,offset=b6S[y0z](prices["ATR "+sd[T5U]],sd[b1I][(a01+K8M+x0M+E1M+U5w+V0M)]);if(b6S[a8w](prices[G3c],prev)&&b6S[n1I](pd[G3c],prev)){if(useHighLow)base=prices[(x9I+E8M)];result=Math[z4M](prev,b6S[G4w](base,offset));}
else if(b6S[m6U](prices[(I41+E1M+c1M+d0M+b6S.I2M)],prev)&&b6S[t8c](pd[G3c],prev)){if(useHighLow)base=prices[Q6I];result=Math[B9R](prev,base+offset);}
else if(b6S[v4T](prices[(y3c+c1M+d0M+b6S.I2M)],prev)){if(useHighLow)base=prices[c9R];result=b6S[Q1R](base,offset);}
else if(b6S[Q5C](prices[G3c],prev)){if(useHighLow)base=prices[Q6I];result=base+offset;}
if(b6S[T2D](base,result)){quotes[i+1]["Buy Stops "+sd[(d8C+c77)]]=result;}
else if(b6S[b77](base,result)){quotes[i+1]["Sell Stops "+sd[T5U]]=result;}
quotes[i+1]["All Stops "+sd[(n1M+b6S.a9M+c77)]]=result;sd[j6w]="All Stops";}
}
;STX[a4w][b1D]=function(stx,sd){var u8D="E2G",H21="k2G",z3z="l2G",d4z="Z2G",g1z="H2G",t1w="n2G",A0C="S2G",K7C="a9G",R1j="f9G",Z01="p9G",F4R="G9G",quotes=sd[X1c][r4R],af=0,ep=null,lasttrend=false,SAR=0,step=parseFloat(sd[b1I]["Minimum AF"]),maxStep=parseFloat(sd[b1I]["Maximum AF"]);function doReset(){af=0;ep=null;lasttrend=!lasttrend;}
for(var i=0;b6S[F4R](i,quotes.length-1);i++){if(!quotes[i])continue;var priorSAR=SAR;if(lasttrend){if(!ep||b6S[Z01](ep,quotes[i][c9R])){ep=quotes[i][(c9R)];af=Math[B9R](af+step,maxStep);}
SAR=priorSAR+b6S[R1j](af,(ep-priorSAR));var lowestPrior2Lows=Math[B9R](quotes[b6S[K7C](Math[z4M](1,i),1)][Q6I],quotes[i][Q6I]);if(b6S[A0C](SAR,quotes[i+1][Q6I])){SAR=ep;doReset();}
else if(b6S[(t1w)](SAR,lowestPrior2Lows)){SAR=lowestPrior2Lows;}
}
else{if(!ep||b6S[g1z](ep,quotes[i][(k3z+J2I)])){ep=quotes[i][Q6I];af=Math[B9R](af+step,maxStep);}
SAR=priorSAR+b6S[d4z](af,(ep-priorSAR));var highestPrior2Highs=Math[z4M](quotes[b6S[z3z](Math[z4M](1,i),1)][c9R],quotes[i][c9R]);if(b6S[H21](SAR,quotes[i+1][c9R])){SAR=ep;doReset();}
else if(b6S[u8D](SAR,highestPrior2Highs)){SAR=highestPrior2Highs;}
}
quotes[i+1]["Result "+sd[T5U]]=SAR;}
}
;STX[a4w][E7R]=function(stx,sd){var y8C="L2G",t6D="O2G",J7U="T2G",y1w="o2G",o1z="d2G",fields=[(y3c+c1M+d0M+b6S.I2M),"MA1 "+sd[T5U],"MA2 "+sd[T5U],"MA3 "+sd[(n1M+e1j+b6S.I2M)]],e;for(e=0;b6S[o1z](e,fields.length-1);e++){sd[l37]=new STX[a4w][s0C](sd[(n1M+n67)],"ma",sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][b1I]={"Field":fields[e],"Type":"exponential"}
;sd[l37][n8M]={}
;sd[l37][n8M]["MA"+(e+1)[z7c]()]=null;this[l51](stx,sd[l37]);}
var quotes=sd[X1c][r4R];for(var i=1;b6S[y1w](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[J7U](i,1)])continue;if(!quotes[b6S[t6D](i,1)][fields[e]])continue;quotes[i]["Result "+sd[T5U]]=b6S[y8C](100,((quotes[i][fields[e]]/quotes[i-1][fields[e]])-1));}
}
;STX[a4w][(C6M+U0I+V6j+b6S.I2M+i5w+K8M+b6S.a9M+z0M+Y3c)]=function(stx,sd){var a4M="D2G",q8I="u2G",quotes=sd[(o2M+V8z+V0M+b6S.K7M)][r4R],name=sd[T5U];for(var p in sd[(Z5D+k6M+X7M+M6M)]){name=p+" "+name;}
for(var i=0;b6S[q8I](i,quotes.length);i++){quotes[i][name]=b6S[a4M]((quotes[i]["High"]+quotes[i][(k3z+J2I)]),2);}
}
;STX[a4w][(N3c+h1R+U0I+R8w+Q8R+b6S.a9M+o2w+C11+G71)]=function(stx,sd){var T9D="g5G",s6c="V5G",F0I="N2G",u8U="C2G",F77="e2G",P2w="X2G",quotes=sd[(b6S.j3c+b6S.a9M+P8U)][r4R],period=sd[F1M],totalUp=0,totalDown=0;for(var i=0;b6S[P2w](i,quotes.length);i++){if(!quotes[i])continue;var diff=b6S[F77](quotes[i][G3c],quotes[i][d77]);if(b6S[u8U](diff,0))totalUp+=diff;else totalDown-=diff;if(b6S[F0I](i,period)){var pDiff=b6S[(r9D+H9M)](quotes[i-period][G3c],quotes[i-period][d77]);if(b6S[s6c](pDiff,0))totalUp-=pDiff;else totalDown+=pDiff;}
quotes[i]["Result "+sd[(d8C+c77)]]=b6S[T9D](100,totalUp,(totalUp+totalDown));}
}
;STX[a4w][h47]=function(stx,sd){var v1M="riptor",J2R="Clos",T1c="k5G",v5c="l5G",quotes=sd[(V61+P8U)][r4R],period=sd[F1M];for(var i=0;b6S[v5c](i,quotes.length);i++){if(!quotes[i])continue;quotes[i]["Close-Open "+sd[(n1M+e1j+b6S.I2M)]]=b6S[T1c](quotes[i][(J2R+b6S.I2M)],quotes[i][d77]);}
sd[l37]=new STX[a4w][(o31+X7M+L8D+F3j+b6S.I2M+y1j+v1M)](sd[T5U],"ma",sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=period;sd[l37][(K8M+L5z+d0M)]={"Field":"Close-Open "+sd[T5U],"Type":sd[b1I]["Moving Average Type"]}
;sd[l37][n8M]=sd[n8M];this[(D4w+y4M+b6S.a9M+b6S.K7M+b6S.I2M+t7I+c91+n1M+Z6M+b6S.V71+r2I+b6S.I2M+S0U+Z6M+b6S.I2M)](stx,sd[l37]);}
;STX[a4w][X4U]=function(stx,sd){var R2R="m4G",U9C="I4G",I6R="4G",z97="t4G",g0U="c4G",U27="P4G",h7D="Y4G",h3c="z4G",h6w="a5G",y3D="f5G",q4z="p5G",m0D="G5G",q57="Q5G",A4U="F5G",A5c="E5G",quotes=sd[X1c][r4R],period=sd[F1M],field=sd[(E0T+c6z+d0M)][(o9R+b6S.I2M+c1R)];if(b6S[A5c](field,null))field="Close";var factor=0.5;sd[r4c]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[(x1M+b6S.a9M+o2M+r7U)][X1c]=sd[X1c];sd[r4c][(k4c+g2I+d0M)]=Number(sd[b1I]["Short Cycle"]);sd[r4c][(E0T+x0M+z8I+d0M)]={"Field":field}
;sd[r4c][n8M]={"MACD1":null}
;STX[a4w][l51](stx,sd[r4c]);sd[J4c]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[(x1M+v5M+a7U)][(V61+P8U)]=sd[X1c];sd[J4c][F1M]=Number(sd[b1I]["Long Cycle"]);sd[J4c][b1I]={"Field":field}
;sd[(l37+o2M+a7U)][n8M]={"MACD2":null}
;STX[a4w][l51](stx,sd[J4c]);function getLLVHHV(p,x,n){var U5D="x5G",b0D="U5G",y0C="i5G",S51="d5G",l=null,h=null;for(var j=b6S[S51](x,p,1);b6S[y0C](j,x);j++){var d=quotes[j][n+" "+sd[T5U]];if(!d)continue;l=(b6S[b0D](l,null)?d:Math[B9R](l,d));h=(b6S[U5D](h,null)?d:Math[z4M](h,d));}
return [l,h];}
var f1=0,f2=0,longCycle=Number(sd[b1I]["Long Cycle"]);for(var i=0;b6S[A4U](i,quotes.length);i++){var quote=quotes[i];quote["Result "+sd[T5U]]=f2;if(b6S[(q57)](i,longCycle-1))continue;quote["MACD "+sd[T5U]]=b6S[m0D](quote["MACD1 "+sd[T5U]],quote["MACD2 "+sd[T5U]]);if(b6S[q4z](i,longCycle+(period-1)))continue;var lh=getLLVHHV(period,i,"MACD");f1=(b6S[y3D](lh[1],lh[0])?(b6S[h6w](100,(quote["MACD "+sd[T5U]]-lh[0]),(lh[1]-lh[0]))):f1);quote["PF "+sd[T5U]]=(quotes[b6S[h3c](i,1)]["PF "+sd[T5U]]?quotes[b6S[h7D](i,1)]["PF "+sd[T5U]]+b6S[U27](factor,(f1-quotes[i-1]["PF "+sd[T5U]])):f1);if(b6S[(J2I+V01+H9M)](i,longCycle+2*(period-1)))continue;lh=getLLVHHV(period,i,"PF");f2=(b6S[g0U](lh[1],lh[0])?(b6S[z97](100,(quote["PF "+sd[T5U]]-lh[0]),(lh[1]-lh[0]))):f2);quote["Result "+sd[T5U]]=(quotes[b6S[(r2I+I6R)](i,1)]["Result "+sd[(n1M+b6S.a9M+c77)]]?quotes[b6S[U9C](i,1)]["Result "+sd[T5U]]+b6S[R2R](factor,(f2-quotes[i-1]["Result "+sd[T5U]])):f2);}
}
;STX[a4w][(o2M+v7M+o2M+U0I+V6j+b6S.I2M+o31+L11+c9w+c1M+x1M+j57+X7M+x1M)]=function(stx,sd){var l5c="rage",j91="ipto",z6c="escr",X0I="udie",P37="smima",N6c="g7G",H5D="V7G",P6R="q7G",u3I="dma2",Y2U="tpu",K8c="DH",B21="nputs",W91="dma1",F7R="hma2",h7R="hma1",P5z="N4G",u4c="C4G",E3C="e4G",V4w="X4G",quotes=sd[X1c][r4R];function getLLVHHV(p,x){var F8c="D4G",P5M="u4G",H3z="L4G",b6I="y4G",l=null,h=null;for(var j=b6S[b6I](x,p,1);b6S[H3z](j,x);j++){l=(b6S[P5M](l,null)?quotes[j][Q6I]:Math[B9R](l,quotes[j][(Q6I)]));h=(b6S[F8c](h,null)?quotes[j][c9R]:Math[z4M](h,quotes[j][c9R]));}
return [l,h];}
var pKPeriods=Number(sd[b1I]["%K Periods"]);for(var i=b6S[V4w](pKPeriods,1);b6S[E3C](i,quotes.length);i++){var quote=quotes[i],lh=getLLVHHV(pKPeriods,i);quote[(v9M+B1I)+sd[T5U]]=b6S[u4c](quote[G3c],(lh[0]+lh[1])/2);quote["DHL "+sd[T5U]]=b6S[P5z](lh[1],lh[0]);}
sd[h7R]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[h7R][X1c]=sd[X1c];sd[h7R][F1M]=Number(sd[b1I]["%K Smoothing Periods"]);sd[h7R][b1I]={"Field":"H "+sd[T5U]}
;sd[h7R][n8M]={"HS1":null}
;STX[a4w][l51](stx,sd[h7R]);sd[F7R]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[F7R][X1c]=sd[X1c];sd[F7R][F1M]=Number(sd[b1I]["%K Double Smoothing Periods"]);sd[F7R][b1I]={"Field":"HS1 "+sd[(d8C+c77)]}
;sd[F7R][n8M]={"HS2":null}
;STX[a4w][l51](stx,sd[F7R]);sd[W91]=new STX[a4w][s0C](sd[T5U],(x1M+b6S.a9M),sd[c7D]);sd[W91][X1c]=sd[(b6S.j3c+b6S.a9M+P8U)];sd[W91][(b6S.l2M+c0R)]=Number(sd[(K8M+T7C+X7M+b6S.K7M+d0M)]["%K Smoothing Periods"]);sd[W91][(K8M+B21)]={"Field":(K8c+c3j+B1I)+sd[T5U]}
;sd[W91][(Z5D+Y2U+b6S.K7M+d0M)]={"DHL1":null}
;STX[a4w][l51](stx,sd[W91]);sd[u3I]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[u3I][X1c]=sd[X1c];sd[u3I][F1M]=Number(sd[b1I]["%K Double Smoothing Periods"]);sd[u3I][b1I]={"Field":"DHL1 "+sd[T5U]}
;sd[u3I][n8M]={"DHL2":null}
;STX[a4w][l51](stx,sd[u3I]);for(var i=b6S[P6R](pKPeriods,1);b6S[H5D](i,quotes.length);i++){quotes[i]["%K "+sd[(T5U)]]=b6S[N6c]((quotes[i]["HS2 "+sd[T5U]]/(.5*quotes[i]["DHL2 "+sd[T5U]])),100);}
sd[P37]=new STX[(o31+X0I+d0M)][(E8j+b6S.K7M+X7M+b6S.l2M+t0z+z6c+j91+V0M)](sd[(n1M+b6S.a9M+x1M+b6S.I2M)],"ma",sd[c7D]);sd[P37][X1c]=sd[X1c];sd[P37][F1M]=Number(sd[b1I]["%D Periods"]);sd[P37][(K8M+L5z+d0M)]={"Field":"%K "+sd[T5U],"Type":sd[b1I][(y21+F3j+B1I+X8j+c1M+r2I+K8M+X5C+B1I+b6S.V71+r2I+b6S.I2M+l5c+B1I+L8j+g2I+x0M+b6S.I2M)]}
;sd[P37][n8M]={"%D":null}
;STX[a4w][N3U](stx,sd[P37]);sd[j5U]="%K";}
;STX[a4w][R7w]=function(stx,sd){var e97="S0G",y7z="a7G",w1z="p7G",z7U="G7G",Z8C="Q7G",b51="L7G",E2I="O7G",n17="T7G",c1C="7G",quotes=sd[X1c][r4R];function getLLVHHV(p,x){var e1I="o7G",u8M="d7G",T3M="E7G",f3C="b7G",l=null,h=null;for(var j=b6S[f3C](x,p,1);b6S[(S8M+c1C)](j,x);j++){var d=b6S[T3M]((quotes[j][c9R]+quotes[j][Q6I]),2);l=(b6S[u8M](l,null)?d:Math[B9R](l,d));h=(b6S[e1I](h,null)?d:Math[z4M](h,d));}
return [l,h];}
var n=0;for(var i=0;b6S[(n17)](i,quotes.length);i++){var quote=quotes[i];if(b6S[E2I](i,sd[F1M]-1)){quote[(T3j+A3j+B1I)+sd[T5U]]=quote[(T3j+A3j+B1I+L8j+U5U+Z6M+u9z+B1I)+sd[T5U]]=n;continue;}
var lh=getLLVHHV(sd[F1M],i);n=b6S[b51](0.33,2,((((quotes[i][c9R]+quotes[i][Q6I])/2)-lh[0])/(lh[1]-lh[0])-0.5))+b6S[Z8C](0.67,n);if(b6S[z7U](n,0))n=Math[B9R](n,0.9999);else if(b6S[w1z](n,0))n=Math[z4M](n,-0.9999);quote["EF "+sd[T5U]]=b6S[(q6M+c1C)](0.5,Math[H1w]((1+n)/(1-n)))+b6S[y7z](0.5,quotes[i-1]["EF "+sd[T5U]]);quote["EF Trigger "+sd[(T5U)]]=quotes[b6S[e97](i,1)]["EF "+sd[T5U]];}
}
;STX[a4w][W1w]=function(stx,sd){var w9M="n0G",a9c="eE",Z2C="ovi",O2M="ulat",quotes=sd[X1c][r4R];this[N7C](stx,sd);sd[h5w]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[h5w][X1c]=sd[X1c];sd[h5w][F1M]=sd[F1M];sd[h5w][(K8M+n1M+x0M+X7M+M6M)]={"Field":"True Range "+sd[T5U],"Type":"exponential"}
;sd[h5w][n8M]={"EMA":null}
;this[(o2M+v7M+o2M+O2M+b6S.I2M+X8j+Z2C+X5C+b6S.V71+r2I+b6S.I2M+V0M+E4M+a9c+s2I+x0M+c1M+n1M+b6S.I2M+F4C+x4w+E1M)](stx,sd[h5w]);sd[l37]=new STX[a4w][s0C](sd[(n1M+e1j+b6S.I2M)],"ma",sd[c7D]);sd[l37][X1c]=sd[(o2M+V8z+V0M+b6S.K7M)];sd[l37][F1M]=sd[F1M];sd[(l37)][b1I]={"Field":"Close","Type":"simple"}
;sd[l37][n8M]={"SMA":null}
;this[N3U](stx,sd[l37]);for(var i=1;b6S[w9M](i,quotes.length);i++){if(!quotes[i]||!quotes[i]["SMA "+sd[T5U]]||!quotes[i]["EMA "+sd[T5U]])continue;quotes[i][(X1j+l5D+U0I+b6S.K7M+B1I)+sd[T5U]]=b6S[(v9M+l91+H9M)]((quotes[i][G3c]-quotes[i]["SMA "+sd[T5U]]),quotes[i]["EMA "+sd[T5U]]);}
}
;STX[a4w][g9c]=function(stx,sd){var v0w="l0G",e0w="Z0G",I2D="ma34",n4w="ma5",L27="calculateMedianPrice",V7M="utputs",z87="mp",quotes=sd[X1c][r4R];sd[z87]=new STX[a4w][s0C](sd[T5U],"med price",sd[c7D]);sd[z87][X1c]=sd[X1c];sd[z87][(c1M+V7M)]={"Med Price":null}
;this[L27](stx,sd[(z87)]);sd[n4w]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[n4w][X1c]=sd[X1c];sd[n4w][F1M]=5;sd[(l37+p71)][b1I]={"Field":"Med Price "+sd[T5U],"Type":(q3j+x1M+x0M+E1M+b6S.I2M)}
;sd[n4w][n8M]={"MA5":null}
;this[N3U](stx,sd[n4w]);sd[I2D]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[I2D][X1c]=sd[X1c];sd[I2D][F1M]=34;sd[I2D][b1I]={"Field":"Med Price "+sd[T5U],"Type":"simple"}
;sd[I2D][n8M]={"MA34":null}
;this[N3U](stx,sd[I2D]);for(var i=33;b6S[e0w](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][sd[T5U]+"_hist"]=b6S[v0w](quotes[i]["MA5 "+sd[(T5U)]],quotes[i]["MA34 "+sd[T5U]]);}
}
;STX[a4w][y8D]=function(stx,sd){var V0w="d1G",j8C="s1G",l6D="c1G",u3z="Z1G",D6C="H1G",E5T="n1G",m87="S1G",r2c="C0G",Q9R="e0G",E91="X0G",G1I="D0G",J5D="u0G",x47="L0G",o5U="O0G",x8M="T0G",E7z="o0G",z3w="d0G",h87="E0G",V6w="k0G",quotes=sd[X1c][r4R],cycle=[sd[b1I]["Cycle 1"],sd[b1I]["Cycle 2"],sd[b1I]["Cycle 3"]],c01=b6S[V6w](cycle[0],cycle[1]),c02=b6S[h87](cycle[0],cycle[2]),c12=b6S[z3w](cycle[1],cycle[2]),accbp=[0,0,0],acctr=[0,0,0],start=Math[z4M](cycle[0],Math[z4M](cycle[1],cycle[2]));for(var i=1;b6S[E7z](i,quotes.length);i++){if(!quotes[i]||!quotes[b6S[x8M](i,1)])continue;var minLC=Math[(T47+n1M)](quotes[i][Q6I],quotes[b6S[o5U](i,1)][G3c]),bp=b6S[x47](quotes[i][G3c],minLC),tr=b6S[J5D](Math[z4M](quotes[i][(h27+Z6M+E8M)],quotes[i-1][G3c]),minLC);for(var x=0;b6S[G1I](x,cycle.length);x++){accbp[x]+=bp;acctr[x]+=tr;if(b6S[E91](i,cycle[x])){var p_minLC=Math[B9R](quotes[b6S[Q9R](i,cycle[x])][Q6I],quotes[b6S[r2c](i,cycle[x],1)][(I41+E1M+F9D+b6S.I2M)]),p_bp=b6S[m87](quotes[i-cycle[x]][(I41+T3R+P6j)],p_minLC),p_tr=b6S[E5T](Math[z4M](quotes[i-cycle[x]][c9R],quotes[i-cycle[x]-1][(I41+g6D)]),p_minLC);accbp[x]-=p_bp;acctr[x]-=p_tr;}
}
if(b6S[D6C](i,start))continue;var numerator=b6S[u3z](c12,accbp[0],acctr[0])+b6S[l6D](c02,accbp[1],acctr[1])+b6S[j8C](c01,accbp[2],acctr[2]),denominator=c12+c02+c01;quotes[i]["Result "+sd[T5U]]=b6S[V0w](100,numerator,denominator);}
}
;STX[a4w][K0C]=function(stx,sd){var s31="Q1G",V9C="F1G",a1M="x1G",U1U="i1G",field=sd[b1I]["Field"];if(b6S[U1U](field,null))field="Close";var quotes=sd[X1c][r4R],total=0;for(var i=1;b6S[(N4M+I91+H9M)](i,quotes.length);i++){if(!quotes[i]||!quotes[i][field])continue;if(!quotes[b6S[a1M](i,1)]||!quotes[b6S[V9C](i,1)][field])continue;total+=b6S[s31](quotes[i][X9D],(quotes[i][field]-quotes[i-1][field]),quotes[i-1][field]);quotes[i]["Result "+sd[T5U]]=total;}
}
;STX[a4w][X7w]=function(stx,sd){var Z3w="w8G",N2w="P8G",F9U="Y8G",o0D="z8G",I77="h1G",w2U="R1G",p17="M1G",y0c="A1G",field=sd[b1I]["Field"];if(b6S[y0c](field,null))field="Close";var minTick=sd[(E0T+x0M+X7M+b6S.K7M+d0M)]["Min Tick Value"],obv=false;if(b6S[p17](minTick,null)){obv=true;minTick=0;}
var quotes=sd[X1c][r4R],total=0,direction=0;for(var i=1;b6S[w2U](i,quotes.length);i++){if(!quotes[i]||!quotes[i][field])continue;if(!quotes[b6S[I77](i,1)]||!quotes[b6S[(o0D)](i,1)][field])continue;if(b6S[F9U](quotes[i][field]-quotes[i-1][field],minTick))direction=1;else if(b6S[N2w](quotes[i-1][field]-quotes[i][field],minTick))direction=-1;else if(obv)direction=0;total+=b6S[Z3w](quotes[i][X9D],direction);quotes[i]["Result "+sd[(d8C+x1M+b6S.I2M)]]=total;}
}
;STX[a4w][B8D]=function(stx,sd){var G37="Q8G",H31="F8G",u9R="x8G",s3c="U8G",S7z="i8G",J6R="J8G",S37="8G",D7z="t8G",r51="c8G",field=sd[b1I]["Field"];if(b6S[r51](field,null))field=(I41+T3R+P6j);var quotes=sd[X1c][r4R],total=100;for(var i=1;b6S[D7z](i,quotes.length);i++){if(!quotes[i]||!quotes[i][field])continue;if(!quotes[b6S[(i7M+S37)](i,1)]||!quotes[b6S[J6R](i,1)][field])continue;if((b6S[S7z](sd[c8c],"Pos Vol")&&b6S[s3c](quotes[i][X9D],quotes[i-1][X9D]))||(b6S[u9R](sd[c8c],"Neg Vol")&&b6S[H31](quotes[i][X9D],quotes[i-1][X9D]))){total*=(b6S[G37](quotes[i][field],quotes[i-1][field]));}
quotes[i]["Index "+sd[T5U]]=total;}
sd[l37]=new STX[a4w][s0C](sd[(Y3z+b6S.I2M)],"ma",sd[c7D]);sd[(x1M+b6S.a9M)][X1c]=sd[X1c];sd[(x1M+b6S.a9M)][F1M]=sd[F1M];sd[l37][b1I]={"Field":"Index "+sd[T5U],"Type":sd[b1I]["Moving Average Type"]}
;sd[(l37)][n8M]={"MA":null}
;this[N3U](stx,sd[l37]);}
;STX[a4w][Y5D]=function(stx,sd){var v8I="p8G",K97="G8G",quotes=sd[X1c][r4R],origin=quotes[0];for(var i=1;b6S[K97](i,quotes.length);i++){if(!origin)origin=quotes[i];if(!quotes[i])continue;quotes[i][(q3U+d0M+U3R+B1I)+sd[T5U]]=b6S[v8I](100,(quotes[i][G3c]/origin[G3c]-1));}
}
;STX[a4w][L5c]=function(stx,sd){var v0c="F6G",K9c="x6G",z81="U6G",E67="i6G",H0C="J6G",r3R="W6G",P4C="t6G",F3c="l6G",e2R="Z6",K0M="H6G";function intFactor(days){var y5C="n6G",y1U="S6G",d17="a8G",n91="f8G";if(isNaN(days))days=365;if(b6S[(n91)](stx[k5I][k9w],"day"))return days;else if(b6S[d17](stx[k5I][k9w],"week"))return b6S[y1U](days,7);else if(b6S[y5C](stx[k5I][k9w],"month"))return 12;else return days;}
var quotes=sd[X1c][r4R],field=sd[b1I]["Field"];if(b6S[K0M](field,null))field="Close";var mult=sd[b1I]["Standard Deviations"];if(b6S[(e2R+H9M)](mult,0))mult=1;annualizingFactor=b6S[F3c](100,Math[k9D](intFactor(sd[b1I]["Days Per Year"])),mult);var arr=[],accum=0;for(var i=1;b6S[P4C](i,quotes.length);i++){if(!quotes[i]||!quotes[b6S[r3R](i,1)])continue;var ln=Math[H1w](b6S[H0C](quotes[i][field],quotes[i-1][field]));arr[I57](ln);accum+=ln;if(b6S[E67](i,sd[F1M])){var d2=0;accum/=sd[F1M];for(var j=0;b6S[z81](j,arr.length);j++){d2+=Math[C5I](b6S[K9c](arr[j],accum),2);}
accum*=sd[(k4c+g2I+d0M)];accum-=arr[R8z]();quotes[i]["Result "+sd[T5U]]=b6S[v0c](Math[k9D](d2/sd[F1M]),annualizingFactor);}
}
}
;STX[a4w][u21]=function(stx,sd){var t5I="O3G",C7c="T3G",E4T="o3G",x9z="d3G",g11="E3G",W9M="k3G",c2z="l3G",s1C="Z3G",W8I="H3G",g6z="n3G",D61="S3G",M6C="a6G",D8I="f6G",z9w="p6G",e7R="Q6G",T=sd[b1I]["Limit Move Value"];if(b6S[e7R](T,null))T=99999;var quotes=sd[X1c][r4R],total=0;for(var i=1;b6S[(H9M+F71+H9M)](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[z9w](i,1)])continue;var A=Math[v8M](b6S[D8I](quotes[i][c9R],quotes[i-1][G3c])),B=Math[v8M](b6S[M6C](quotes[i][Q6I],quotes[i-1][G3c])),C=Math[v8M](b6S[D61](quotes[i][c9R],quotes[i][(Q6I)])),D=Math[v8M](b6S[g6z](quotes[i-1][G3c],quotes[i-1][d77])),K=Math[z4M](A,B),M=Math[z4M](C,K),R=M+b6S[W8I](.25,D);if(b6S[s1C](M,A))R-=b6S[c2z](.5,B);else if(b6S[W9M](M,B))R-=b6S[g11](.5,A);var swing=b6S[x9z]((50*((quotes[i][G3c]-quotes[i-1][G3c])+.5*(quotes[i][G3c]-quotes[i][d77])+.25*(quotes[i-1][G3c]-quotes[i-1][d77]))/R),(K/T));if(b6S[E4T](R,0)||b6S[C7c](T,0))swing=0;if(b6S[t5I](sd[c8c],(E8j+q5R)))total=0;total+=swing;quotes[i]["Result "+sd[T5U]]=total;}
}
;STX[a4w][(N3c+E1M+y4M+b6S.a9M+b6S.K7M+b6S.I2M+b6S.V71+F3j+b7M)]=function(stx,sd){var V81="K9V",l47="r9V",E2T="y9V",o9T="i9V",u9U="d9V",D7I="s9V",j3D="Tr",T77="c9V",C0D="Z9V",S8I="V9V",q7C="q9V",J21="N3G",O3c="C3G",a0z="e3G",k0U="D3G",n71="u3G",E2z="L3G";this[N7C](stx,sd);var quotes=sd[X1c][r4R],period=sd[F1M],smoothTR=0,smoothPlusDM=0,smoothMinusDM=0,runningDX=0;for(var i=1;b6S[E2z](i,quotes.length);i++){if(!quotes[i]||!quotes[b6S[n71](i,1)])continue;var plusDM=Math[z4M](0,b6S[k0U](quotes[i][c9R],quotes[i-1][c9R])),minusDM=Math[z4M](0,b6S[(b7M+N3I+H9M)](quotes[i-1][Q6I],quotes[i][Q6I]));if(b6S[a0z](plusDM,minusDM))minusDM=0;else if(b6S[O3c](minusDM,plusDM))plusDM=0;else plusDM=minusDM=0;if(b6S[J21](i,period)){smoothPlusDM+=plusDM;smoothMinusDM+=minusDM;smoothTR+=quotes[i]["True Range "+sd[T5U]];if(b6S[q7C](i,period))continue;}
else{smoothPlusDM=b6S[S8I](smoothPlusDM,smoothPlusDM/period,plusDM);smoothMinusDM=b6S[C0D](smoothMinusDM,smoothMinusDM/period,minusDM);smoothTR=b6S[T77](smoothTR,smoothTR/period,quotes[i][(j3D+X7M+b6S.I2M+B1I+X1j+b6S.a9M+X5C+b6S.I2M+B1I)+sd[T5U]]);}
var plusDI=b6S[D7I](100,smoothPlusDM,smoothTR),minusDI=b6S[u9U](100,smoothMinusDM,smoothTR),DX=b6S[o9T](100,Math[v8M](plusDI-minusDI),(plusDI+minusDI));quotes[i]["+DI "+sd[(Y3z+b6S.I2M)]]=plusDI;quotes[i][(i3I+F3j+i6j+B1I)+sd[T5U]]=minusDI;if(b6S[E2T](i,2*period-1)){runningDX+=DX;}
else if(b6S[(Q41+K01+Q4M)](i,2*period-1)){quotes[i]["ADX "+sd[T5U]]=b6S[l47](runningDX,period);}
else{quotes[i]["ADX "+sd[T5U]]=b6S[V81]((quotes[i-1]["ADX "+sd[T5U]]*(period-1)+DX),period);}
}
}
;STX[a4w][W8c]=function(stx,sd){var K4C="P2V",M4C="Y2V",p4R="z2V",u1w="R9V",d0D="M9V",p9z="9V";this[N7C](stx,sd);var quotes=sd[X1c][r4R],period=sd[(p61+d0M)];for(var i=2;b6S[(b6S.V71+p9z)](i,quotes.length);i++){if(!quotes[i])continue;var ttr=0,high=quotes[i][c9R],low=quotes[i][Q6I],maxHigh=0,maxLow=0;for(var j=1;b6S[d0D](j,period);j++){if(b6S[u1w](i,j)){maxHigh=maxLow=0;break;}
ttr+=quotes[b6S[(X3C+Q4M)](i,j)]["True Range "+sd[T5U]];var denom=(b6S[p4R]((ttr/j),Math[k9D](j))),cH=b6S[(M4C)]((high-quotes[i-j][Q6I]),denom),cL=b6S[K4C]((quotes[i-j][c9R]-low),denom);maxHigh=Math[z4M](maxHigh,cH);maxLow=Math[z4M](maxLow,cL);}
quotes[i]["Random Walk High "+sd[T5U]]=maxHigh;quotes[i]["Random Walk Low "+sd[T5U]]=maxLow;}
}
;STX[a4w][x7c]=function(stx,sd){var s3U="t2V",O5D="c2V",Y67="w2V",field=sd[b1I][(A3j+K8M+b6S.I2M+c1R)];if(b6S[Y67](field,null))field="Close";var quotes=sd[(b6S.j3c+b6S.a9M+V0M+b6S.K7M)][r4R];for(var i=sd[F1M];b6S[O5D](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[s3U](i,sd[F1M])])continue;quotes[i]["Result "+sd[(T5U)]]=b6S[(i7M+G3I+Q4M)](quotes[i][field],quotes[i-sd[(b6S.l2M+b6S.a9M+y0T)]][field]);}
}
;STX[a4w][t77]=function(stx,sd){var I2c="Q2V",y4C="F2V",T7c="x2V",H01="U2V",m57="i2V",O4M="Of",V3j="dex",p3C="J2V",field=sd[b1I]["Field"];if(b6S[p3C](sd[T5U][(K8M+n1M+V3j+O4M)]("Vol ROC"),0))field="Volume";else if(b6S[m57](field,null))field="Close";var name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var offset=sd[b1I]["Center Line"];if(b6S[H01](offset,null))offset=0;else offset=parseInt(offset,10);var quotes=sd[X1c][r4R];for(var i=sd[F1M];b6S[T7c](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[y4C](i,sd[F1M])])continue;quotes[i][name]=b6S[I2c](100,((quotes[i][field]/quotes[i-sd[F1M]][field])-1))+offset;}
}
;STX[a4w][s91]=function(stx,sd){var e4c="S5V",g2w="a2V",U7c="f2V",U7C="p2",F8I="G2V",quotes=sd[X1c][r4R],period=sd[F1M],name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var total=0;for(var i=0;b6S[F8I](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][c9M]=b6S[(U7C+Q4M)]((quotes[i][c9R]+quotes[i][(k3z+J2I)]+quotes[i][G3c]),3);total+=quotes[i]["typicalPrice"];if(b6S[U7c](i,period)){total-=quotes[b6S[g2w](i,period)][c9M];quotes[i][name]=b6S[e4c](total,period);}
}
}
;STX[a4w][(o2M+v7M+g8j+Z6M+x1w+L8U+E1M+F9D+b6S.I2M)]=function(stx,sd){var O8U="k5V",Q91="eigh",M4R="l5",j6R="Z5V",j5M="H5V",u9T="weightedClose",j1C="n5V",quotes=sd[X1c][(d0M+o2M+X8U+F9M+F9M+b6S.I2M+b6S.l2M)],period=sd[F1M],name=sd[T5U];for(var p in sd[n8M]){name=p+" "+name;}
var total=0;for(var i=0;b6S[j1C](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][u9T]=b6S[j5M]((quotes[i][c9R]+quotes[i][Q6I]+2*quotes[i][G3c]),4);total+=quotes[i]["weightedClose"];if(b6S[j6R](i,period)){total-=quotes[b6S[(M4R+Q4M)](i,period)][(J2I+Q91+h7M+b6S.l2M+y3c+c1M+d0M+b6S.I2M)];quotes[i][name]=b6S[O8U](total,period);}
}
}
;STX[a4w][X4c]=function(stx,sd){var h0R="5V",r7M="o5V",E6I="d5V",v8c="E5V",quotes=sd[X1c][r4R];sd[(h5w)]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[h5w][X1c]=sd[X1c];sd[h5w][F1M]=sd[F1M];sd[h5w][b1I]={"Field":"Close","Type":"exponential"}
;sd[h5w][n8M]={"EMA":null}
;this[l51](stx,sd[h5w]);for(var i=b6S[v8c](sd[(p61+d0M)],1);b6S[E6I](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][sd[T5U]+"_hist1"]=b6S[r7M](quotes[i][c9R],quotes[i]["EMA "+sd[T5U]]);quotes[i][sd[T5U]+"_hist2"]=b6S[(L8j+h0R)](quotes[i][Q6I],quotes[i]["EMA "+sd[T5U]]);}
}
;STX[a4w][Y3D]=function(stx,sd){var B2T="L5V",i3j="O5V",quotes=sd[X1c][r4R];for(var i=1;b6S[i3j](i,quotes.length);i++){if(!quotes[i])continue;quotes[i]["Result "+sd[T5U]]=b6S[B2T](quotes[i][X9D],(quotes[i][G3c]-quotes[i-1][G3c]));}
}
;STX[a4w][N5R]=function(stx,sd){var Y47="4V",m9w="N5V",c2R="C5V",T4T="e5V",T0R="X5V",H5c="D5V",o8w="u5V",field=sd[b1I][(o9R+b6S.I2M+E1M+b6S.l2M)];if(b6S[o8w](field,"field"))field="Close";var quotes=sd[X1c][r4R];for(var i=b6S[H5c](sd[F1M],1);b6S[T0R](i,quotes.length);i++){if(!quotes[i])continue;var num=0,den=0;for(var j=0;b6S[T4T](j,sd[F1M]);j++){num-=b6S[c2R]((j+1),quotes[i-j][field]);den+=quotes[b6S[m9w](i,j)][field];}
quotes[i]["Result "+sd[T5U]]=b6S[(e0M+Y47)](num,den);}
}
;STX[a4w][J01]=function(stx,sd){var n87="I4V",G1z="EOM",y6w="s4V",v1U="j4V",y0M="b4V",E37="g4V",D4c="V4V",quotes=sd[X1c][r4R];for(var i=1;b6S[D4c](i,quotes.length);i++){if(!quotes[i]||!quotes[b6S[E37](i,1)])continue;var avgCurrent=b6S[y0M]((quotes[i][c9R]+quotes[i][Q6I]),2),avgPrior=b6S[v1U]((quotes[i-1][c9R]+quotes[i-1][(Q6I)]),2),dm=b6S[y6w](avgCurrent,avgPrior),br=b6S[(r2I+V01+Q4M)]((quotes[i][X9D]/100000000),(quotes[i][c9R]-quotes[i][Q6I]));quotes[i][(G1z+I91+B1I)+sd[T5U]]=b6S[n87](dm,br);sd[(l37)]=new STX[a4w][s0C](sd[T5U],"ma",sd[(x0M+b6S.a9M+n1M+b6S.I2M+E1M)]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[(k4c+y0T)];sd[l37][b1I]={"Field":"EOM1 "+sd[(n1M+n67)],"Type":sd[b1I]["Moving Average Type"]}
;sd[l37][n8M]={"Result":null}
;this[N3U](stx,sd[l37]);}
}
;STX[a4w][g5U]=function(stx,sd){var v41="j0V",J9c="b0V",g6R="g0V",a1z="V0V",P21="q0V",v7T="N7V",l07="C7V",b9I="e7V",I67="X7V",r77="7V",G9c="F7V",z11="getMarketOffset",w7R="x7V",t4U="U7V",x8z="i7V",V0R="J7V",Q61="W7V",D2z="t7V",d9T="getYear",t3I="c7V",n4T="w7V",o0w="P7V",j1c="Y7V",v3D="z7V",b9T="h4V",V5I="R4V",L1R="M4V",d1I="A4V",n3U="xSymb",q3c="yMar",i3D="B4V",g51="y4V",V8C="m4V",quotes=sd[(o2M+E8M+K8j+b6S.K7M)][r4R],period="day";if(b6S[V8C](stx[(L57+x7T+b6S.K7M)][k9w],"day"))period="month";else if(stx[m8R](stx[k5I][k9w]))period="year";else{var interval=stx[k5I][W27];if(b6S[g51](stx[k5I][k9w],"minute")){interval*=stx[k5I][k9w];}
if(b6S[i3D](interval,30))period="week";}
var isForex=STX[(i1z+q3c+l9R+b6S.K7M)][(K8M+S7U+S2D+b6S.I2M+n3U+c1M+E1M)](stx[X1c][F3I]),marketOffset=null,size=0,total=0,pivotPoint=0,high=0,low=0,prevHigh=0,prevLow=0,hlSpread=0;function resetPivots(){var z5M="K4V",W6j="r4V";pivotPoint=b6S[W6j](total,size);prevHigh=high;prevLow=low;hlSpread=b6S[z5M](high,low);size=total=high=low=0;}
for(var i=1;b6S[d1I](i,quotes.length);i++){if(!quotes[b6S[L1R](i,1)])continue;total+=b6S[(V5I)]((quotes[i-1][c9R]+quotes[i-1][(c3j+r2D)]+quotes[i-1][(I41+E1M+F9D+b6S.I2M)]),3);high=Math[z4M](high,quotes[b6S[b9T](i,1)][(c9R)]);low=Math[B9R](b6S[v3D](low,0)?low:quotes[b6S[j1c](i,1)][Q6I],quotes[b6S[o0w](i,1)][Q6I]);size++;if(b6S[n4T](period,"year")&&b6S[t3I](quotes[i][q4c][d9T](),quotes[i-1][q4c][d9T]())){resetPivots();}
else if(b6S[D2z](period,(x1M+S7D+P1M))&&b6S[Q61](quotes[i][q4c][C2T](),quotes[i-1][q4c][C2T]())){resetPivots();}
else if(b6S[V0R](period,(s4z))&&b6S[x8z](quotes[i][(q4c)][Y4M](),quotes[i-1][q4c][Y4M]())){resetPivots();}
else if(b6S[t4U](period,"day")){if(b6S[w7R](marketOffset,null)){var dt=STX[N77][z11](stx,quotes[i][q4c]);if(isForex){marketOffset+=b6S[G9c](7,60,60,1000);}
}
var newDate=new Date(new Date(quotes[i][q4c])[G9z](quotes[i][q4c][E8c]()+marketOffset)),oldDate=new Date(new Date(quotes[b6S[(F3j+r77)](i,1)][(q4c)])[G9z](quotes[b6S[I67](i,1)][q4c][E8c]()+marketOffset));if(b6S[b9I](oldDate[n8C](),newDate[n8C]())&&b6S[l07](newDate[Y4M](),0)&&b6S[v7T](newDate[Y4M](),6)){marketOffset=null;resetPivots();}
}
quotes[i]["Pivot "+sd[T5U]]=pivotPoint;quotes[i]["Resistance 1 "+sd[T5U]]=b6S[P21](2*pivotPoint,prevLow);quotes[i]["Resistance 2 "+sd[T5U]]=pivotPoint+hlSpread;quotes[i]["Resistance 3 "+sd[T5U]]=pivotPoint+b6S[a1z](2,hlSpread);quotes[i]["Support 1 "+sd[T5U]]=b6S[(g6R)](2*pivotPoint,prevHigh);quotes[i][(E8j+X7M+x0M+x0M+S2D+b6S.K7M+B1I+G3I+B1I)+sd[T5U]]=b6S[J9c](pivotPoint,hlSpread);quotes[i]["Support 3 "+sd[T5U]]=b6S[v41](pivotPoint,2*hlSpread);}
}
;STX[a4w][g7I]=function(stx,sd){var f4T="EMA",o2T="y0V",n2T="m0V",I3w="I0V",y31="v0V",H7C="s0V",quotes=sd[X1c][r4R];for(var i=0;b6S[H7C](i,quotes.length);i++){if(!quotes[i])continue;quotes[i]["High-Low "+sd[T5U]]=b6S[y31](quotes[i]["High"],quotes[i]["Low"]);}
sd[h5w]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[h5w][X1c]=sd[X1c];sd[(h5w)][F1M]=sd[(b6S.l2M+b6S.a9M+y0T)];sd[h5w][b1I]={"Field":"High-Low "+sd[T5U],"Type":"exponential"}
;sd[h5w][n8M]={"EMA":null}
;this[l51](stx,sd[h5w]);var roc=sd[b1I]["Rate Of Change"];if(!roc)roc=sd[(b6S.l2M+b6S.a9M+g2I+d0M)];for(var i=roc;b6S[I3w](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[n2T](i,roc)]["EMA "+sd[T5U]])continue;quotes[i]["Result "+sd[T5U]]=b6S[o2T](100,((quotes[i][(f4T+B1I)+sd[T5U]]/quotes[i-roc]["EMA "+sd[T5U]])-1));}
}
;STX[(k4U+b6S.l2M+K8M+b6S.I2M+d0M)][g9I]=function(stx,sd){var A1D="C0V",R5R="e0V",a41="X0V",t4I="D0V",d71="r0V",P97="MFV",quotes=sd[X1c][r4R],sumMoneyFlow=0,sumVolume=0;for(var i=0;b6S[(Q41+l91+Q4M)](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][(P97+B1I)+sd[T5U]]=b6S[d71](quotes[i]["Volume"],(2*quotes[i]["Close"]-quotes[i]["High"]-quotes[i]["Low"]),(quotes[i][(v9M+K8M+b3C)]-quotes[i]["Low"]));sumMoneyFlow+=quotes[i]["MFV "+sd[T5U]];sumVolume+=quotes[i]["Volume"];if(b6S[t4I](i,sd[F1M]-1)){sumMoneyFlow-=quotes[b6S[a41](i,sd[F1M])]["MFV "+sd[T5U]];sumVolume-=quotes[b6S[R5R](i,sd[F1M])]["Volume"];if(sumVolume)quotes[i][(s1c+X7M+P67+B1I)+sd[T5U]]=b6S[A1D](sumMoneyFlow,sumVolume);}
}
}
;STX[a4w][h07]=function(stx,sd){var a7z="o1V",Z6w="d1V",l5C="E1V",Y01="k1V",m0z="l1V",x27="g1V",s0w="V1V",M5M="N0V",quotes=sd[X1c][r4R],sumMoneyFlow=0,sumVolume=0;for(var i=1;b6S[M5M](i,quotes.length);i++){if(!quotes[i])continue;var trh=Math[z4M](quotes[b6S[(M4D+Q4M)](i,1)][G3c],quotes[i]["High"]),trl=Math[B9R](quotes[b6S[s0w](i,1)][G3c],quotes[i]["Low"]);quotes[i]["MFV "+sd[T5U]]=b6S[x27](quotes[i]["Volume"],(2*quotes[i]["Close"]-trh-trl),(trh-trl==0?999999:trh-trl));if(b6S[m0z](i,sd[F1M]-1)){sumMoneyFlow*=b6S[Y01]((sd[F1M]-1),sd[F1M]);sumVolume*=b6S[l5C]((sd[F1M]-1),sd[F1M]);}
sumMoneyFlow+=quotes[i]["MFV "+sd[(T5U)]];sumVolume+=quotes[i]["Volume"];if(b6S[Z6w](i,sd[F1M]-1)){if(sumVolume)quotes[i]["Result "+sd[T5U]]=b6S[a7z](sumMoneyFlow,(sumVolume>0?sumVolume:999999));}
}
}
;STX[a4w][C8z]=function(stx,sd){var Q9z="X1V",M1D="1V",u3j="u1",X4C="L1V",C4D="O1V",R6U="T1V",quotes=sd[X1c][r4R];for(var i=0;b6S[R6U](i,quotes.length);i++){if(!quotes[i])continue;quotes[i][(v9M+K8M+b3C+i3I+c3j+c1M+J2I+B1I)+sd[T5U]]=b6S[C4D](quotes[i]["High"],quotes[i]["Low"]);}
sd[h5w]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[h5w][X1c]=sd[X1c];sd[h5w][F1M]=9;sd[h5w][b1I]={"Field":"High-Low "+sd[T5U],"Type":"exponential"}
;sd[(b6S.I2M+x1M+b6S.a9M)][n8M]={"EMA":null}
;this[l51](stx,sd[h5w]);sd[w3C]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[w3C][X1c]=sd[X1c];sd[w3C][(k4c+g2I+d0M)]=9;sd[w3C][b1I]={"Field":"EMA "+sd[T5U],"Type":"exponential"}
;sd[w3C][n8M]={"EMA2":null}
;this[l51](stx,sd[w3C]);var total=0;for(var j=17;b6S[X4C](j,quotes.length);j++){total+=b6S[(u3j+Q4M)](quotes[j]["EMA "+sd[(n1M+e1j+b6S.I2M)]],quotes[j]["EMA2 "+sd[T5U]]);if(b6S[(F3j+M1D)](j,17+sd[F1M]-1)){quotes[j]["Result "+sd[T5U]]=total;total-=b6S[Q9z](quotes[j-sd[F1M]+1]["EMA "+sd[T5U]],quotes[j-sd[(k4c+g2I+d0M)]+1]["EMA2 "+sd[T5U]]);}
}
}
;STX[a4w][u9w]=function(stx,sd){var D91="s8V",o67="j8V",x8w="b8V",M7U="g8V",H71="V8V",W17="q8V",O9I="N1V",t31="C1V",U0C="e1V",U4T="cru",quotes=sd[X1c][(d0M+U4T+F9M+K7c)],cumPosMF=0,cumNegMF=0,lastTypPrice=0,directions=[];for(var i=0;b6S[U0C](i,quotes.length);i++){if(!quotes[i])continue;var typPrice=b6S[t31]((quotes[i][c9R]+quotes[i][Q6I]+quotes[i][G3c]),3);if(b6S[(O9I)](i,0)){var rawMoneyFlow=b6S[W17](typPrice,quotes[i][X9D]);if(b6S[H71](typPrice,lastTypPrice)){directions[I57]([1,rawMoneyFlow]);cumPosMF+=rawMoneyFlow;}
else if(b6S[M7U](typPrice,lastTypPrice)){directions[I57]([-1,rawMoneyFlow]);cumNegMF+=rawMoneyFlow;}
else{directions[I57]([0,0]);}
if(b6S[x8w](i,sd[F1M])){var old=directions[R8z]();if(b6S[o67](old[0],1))cumPosMF-=old[1];else if(old[0]==-1)cumNegMF-=old[1];if(b6S[D91](cumNegMF,0))quotes[i][(q3U+d0M+U0I+b6S.K7M+B1I)+sd[T5U]]=100;else quotes[i]["Result "+sd[T5U]]=b6S[(r2I+h01+Q4M)](100,100/(1+(cumPosMF/cumNegMF)));}
}
lastTypPrice=typPrice;}
}
;STX[a4w][T8I]=function(stx,sd){var a8z="r8V",m3M="B8V",X7U="y8V",O81="m8V",I4c="I8V",name=sd[(T5U)];for(var p in sd[n8M]){name=p+" "+name;}
var quotes=sd[X1c][r4R],sumMomentum=0,absSumMomentum=0,history=[];for(var i=1;b6S[I4c](i,quotes.length);i++){if(!quotes[i]||!quotes[b6S[O81](i,1)])continue;var diff=b6S[X7U](quotes[i][G3c],quotes[i-1][G3c]);history[I57](diff);sumMomentum+=diff;absSumMomentum+=Math[v8M](diff);if(b6S[m3M](history.length,sd[F1M])){quotes[i][name]=b6S[a8z](100,sumMomentum,absSumMomentum);var old=history[R8z]();sumMomentum-=old;absSumMomentum-=Math[v8M](old);}
}
}
;STX[a4w][k7T]=function(stx,sd){var t2M="e8V",r0C="X8V",I3U="puts",G9I="tsf",z77="D8V",quotes=sd[X1c][(d0M+o2M+X8U+F9M+F9M+b6S.I2M+b6S.l2M)],field=sd[b1I]["Field"];if(b6S[z77](field,"field"))field="Close";sd[G9I]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[G9I][X1c]=sd[X1c];sd[G9I][F1M]=sd[F1M];sd[G9I][(K8M+n1M+I3U)]={"Field":field,"Type":"time series"}
;sd[(M6M+q6M)][n8M]={"MA":null}
;this[N3U](stx,sd[G9I]);for(var i=1;b6S[r0C](i,quotes.length);i++){if(!quotes[i])continue;quotes[i]["Result "+sd[T5U]]=b6S[t2M](100,(1-(quotes[i]["MA "+sd[T5U]]/quotes[i][field])));}
}
;STX[a4w][d4T]=function(stx,sd){var j81="V6V",u4R="q6V",z0R="N8V",h2D="ov",v1z="C8V",quotes=sd[X1c][r4R],field=sd[b1I]["Field"];if(b6S[v1z](field,"field"))field="Close";sd[l37]=new STX[a4w][s0C](sd[T5U],"ma",sd[(L5T+b6S.I2M+E1M)]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][b1I]={"Field":field,"Type":sd[b1I][(X8j+h2D+E0T+Z6M+B1I+b6S.V71+r2I+m4D+z3C+B1I+L8j+g2I+O0D)]}
;sd[l37][n8M]={"MA":null}
;this[N3U](stx,sd[l37]);for(var i=Math[b3R](b6S[z0R](sd[F1M]/2,1));b6S[(u4R)](i,quotes.length-Math[b3R](sd[F1M]/2+1));i++){quotes[i]["Result "+sd[T5U]]=b6S[j81](quotes[i][field],quotes[i+Math[b3R](sd[F1M]/2+1)]["MA "+sd[T5U]]);}
}
;STX[(E8j+b6S.K7M+h9I+b6S.I2M+d0M)][P0T]=function(stx,sd){var k97="z3V",M6j="R6V",N6w="M6V",i2T="A6V",K1I="K6V",I5T="r6V",M51="B6V",d1D="y6V",R4c="m6V",V0I="v6V",d7z="s6V",r4z="b6V",J6D="g6V",quotes=sd[X1c][r4R],daysSinceHigh=0,daysSinceLow=0,xDayHigh=null,xDayLow=null;for(var i=0;b6S[J6D](i,quotes.length);i++){if(!quotes[i])continue;if(b6S[r4z](xDayHigh,null))xDayHigh=quotes[i][c9R];if(b6S[(D1M+F71+Q4M)](xDayLow,null))xDayHigh=quotes[i][Q6I];xDayHigh=Math[z4M](xDayHigh,quotes[i][c9R]);if(b6S[d7z](xDayHigh,quotes[i][c9R])){daysSinceHigh=0;}
else{daysSinceHigh++;if(b6S[V0I](daysSinceHigh,sd[F1M])){xDayHigh=quotes[i][c9R];daysSinceHigh=0;for(var j=1;b6S[(i6j+F71+Q4M)](j,sd[F1M]);j++){xDayHigh=Math[z4M](xDayHigh,quotes[b6S[R4c](i,j)][c9R]);if(b6S[d1D](xDayHigh,quotes[i-j][c9R])){daysSinceHigh=j;}
}
}
}
xDayLow=Math[B9R](xDayLow,quotes[i][Q6I]);if(b6S[M51](xDayLow,quotes[i][Q6I])){daysSinceLow=0;}
else{daysSinceLow++;if(b6S[I5T](daysSinceLow,sd[F1M])){xDayLow=quotes[i][Q6I];daysSinceLow=0;for(var j=1;b6S[K1I](j,sd[F1M]);j++){xDayLow=Math[B9R](xDayLow,quotes[b6S[i2T](i,j)][Q6I]);if(b6S[N6w](xDayLow,quotes[i-j][Q6I])){daysSinceLow=j;}
}
}
}
quotes[i]["Aroon Up "+sd[T5U]]=b6S[M6j](100,(1-daysSinceHigh/sd[F1M]));quotes[i]["Aroon Down "+sd[T5U]]=b6S[(E8M+F71+Q4M)](100,(1-daysSinceLow/sd[F1M]));quotes[i]["Aroon Oscillator "+sd[(d8C+x1M+b6S.I2M)]]=b6S[k97](quotes[i]["Aroon Up "+sd[(d8C+c77)]],quotes[i]["Aroon Down "+sd[T5U]]);}
}
;STX[a4w][O1C]=function(stx,sd){var w2I="Y9F",Y5I="z9F",n5R="h3V",S5U="f3V",D6R="ott",o41="Pri",t7w="p3V",L01="G3V",O9U="Q3V",A5R="F3V",R5U="x3V",n6I="U3V",E0R="i3V",x1z="J3V",R0C="W3V",primes=[];function isPrime(x){var I1R="t3V",E2U="c3V",b0C="w3V",s47="P3V",V17="Y3V";if(b6S[V17](x,0))return false;else if(b6S[s47](x,Math[b3R](x)))return false;else if(b6S[b0C](primes[x],null))return primes[x];var q=parseInt(Math[k9D](x),10);for(var i=2;b6S[E2U](i,q);i++){if(b6S[I1R](x%i,0)){primes[x]=false;return false;}
}
primes[x]=true;return true;}
var quotes=sd[X1c][r4R];for(var i=0;b6S[R0C](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;var high=quote[c9R];for(var h=0;b6S[x1z](high,0)&&b6S[E0R](high,10);h++)high*=10;if(isPrime(high))high+=2;high=Math[t97](high);if(b6S[n6I](high%2,0))high++;while(!isPrime(high))high+=2;high/=Math[(C5I)](10,h);var low=quote[Q6I];for(var l=0;b6S[(R5U)](low,0)&&b6S[A5R](low,10);l++)low*=10;if(isPrime(low))low-=2;low=Math[b3R](low);if(b6S[O9U](low%2,0))low--;if(b6S[L01](low,0)){while(!isPrime(low))low-=2;low/=Math[C5I](10,l);}
if(b6S[t7w](sd[c8c],"Prime Number Bands")){quote["Prime Bands Top "+sd[T5U]]=high;quote[(o41+c77+B1I+Q41+m1j+b6S.l2M+d0M+B1I+Q41+D6R+c1M+x1M+B1I)+sd[T5U]]=Math[z4M](0,low);}
else{var value=0,tolerance=b6S[S5U](sd[b1I]["Tolerance Percentage"],(high-low),100),skew=high+low-b6S[n5R](2,quote[G3c]);if(b6S[Y5I](skew,tolerance))value=1;else if(b6S[w2I](skew,tolerance))value=-1;if(value)quote["Result "+sd[T5U]]=value;}
}
}
;STX[a4w][e41]=function(stx,sd){var o9w="MH",o4w="t9F",h1I="c9F",K8w="w9F",R7z="P9F",e47="nL",q01="xH",i47="eMa",S0C="alc",r3U="utp",I8I="mhml",quotes=sd[X1c][r4R];sd[I8I]=new STX[a4w][s0C](sd[(d8C+x1M+b6S.I2M)],sd[c8c],sd[c7D]);sd[I8I][X1c]=sd[X1c];sd[I8I][F1M]=sd[F1M];sd[I8I][b1I]={}
;sd[I8I][(c1M+r3U+X7M+b6S.K7M+d0M)]={"MHML":null}
;STX[a4w][(o2M+S0C+X7M+E1M+V6j+i47+q01+q4w+c9w+K8M+e47+c1M+J2I)](stx,sd[I8I]);var sumChanges=0,changes=[];for(var i=1;b6S[R7z](i,quotes.length);i++){if(!quotes[i])continue;var change=Math[v8M](b6S[K8w](quotes[i][G3c],quotes[i-1][G3c]));changes[I57](change);sumChanges+=change;if(b6S[h1I](i,sd[F1M])){quotes[i]["Result "+sd[(T5U)]]=b6S[o4w](quotes[i][(o9w+X8j+c3j+B1I)+sd[T5U]],sumChanges);sumChanges-=changes[R8z]();}
}
}
;STX[a4w][C5M]=function(stx,sd,isVolume){var n77="Q9F",s5D="F9F",e0I="nts",T81="Poi",j41="x9",o1R="U9F",s8w="ma2",r0z="Shor",y8w="ma1",F4T="i9F",Q1c="J9F",t6U="W9F",quotes=sd[X1c][r4R],field=sd[b1I]["Field"],maType=sd[b1I][(t7I+r2I+K8M+X5C+B1I+b6S.V71+r2I+i2D+b9z+B1I+L8j+g2I+x0M+b6S.I2M)];if(b6S[t6U](maType,null))maType="simple";if(b6S[Q1c](field,null)){if(isVolume){field="Volume";maType="exponential";}
else field="Close";}
var pts=sd[b1I]["Points Or Percent"];if(b6S[F4T](pts,null))pts="Points";sd[y8w]=new STX[a4w][s0C](sd[T5U],"ma",sd[c7D]);sd[y8w][(o2M+v9T)]=sd[X1c];sd[(y8w)][F1M]=Number(sd[b1I][(r0z+b6S.K7M+B1I+I41+g2I+o2M+O1R)]);sd[y8w][b1I]={"Field":field,"Type":maType}
;sd[y8w][n8M]={"Short MA":null}
;this[N3U](stx,sd[(l37+I91)]);sd[s8w]=new STX[a4w][s0C](sd[(T5U)],"ma",sd[c7D]);sd[s8w][X1c]=sd[X1c];sd[s8w][F1M]=Number(sd[b1I]["Long Cycle"]);sd[s8w][b1I]={"Field":field,"Type":maType}
;sd[s8w][n8M]={"Long MA":null}
;this[N3U](stx,sd[s8w]);for(var i=0;b6S[o1R](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(b6S[(j41+A3j)](pts,(T81+e0I)))quote["Result "+sd[T5U]]=b6S[s5D](quote["Short MA "+sd[T5U]],quote["Long MA "+sd[T5U]]);else quote["Result "+sd[(T5U)]]=b6S[n77](100,((quote["Short MA "+sd[T5U]]/quote["Long MA "+sd[T5U]])-1));}
}
;STX[a4w][a3w]=function(stx,sd){sd[l37]=new STX[a4w][s0C](sd[T5U],(l37),sd[c7D]);sd[l37][X1c]=sd[X1c];sd[(x1M+b6S.a9M)][F1M]=sd[F1M];sd[l37][b1I]={"Field":G3c,"Type":sd[b1I][e7z]}
;sd[l37][n8M]={"MA":F4U}
;this[N3U](stx,sd[l37]);this[N7C](stx,sd);STX[a4w][n8U](stx,sd,sd[(K8M+k7w+b6S.K7M+d0M)][Z7M],n5M+sd[(d8C+c77)],R7M+sd[T5U]);}
;STX[a4w][U61]=function(stx,sd){var t7T="wma",Z9w="wm",u1c="2F",V1C="S2F",v0C="a9F",O1j="f9F",m01="p9F",R4R="G9F",quotes=sd[X1c][r4R],field=sd[b1I]["Field"];if(b6S[R4R](field,null))field="Close";var longDays=sd[b1I]["Long RoC"];if(!longDays)longDays=14;var shortDays=sd[b1I]["Short RoC"];if(!shortDays)shortDays=11;var period=sd[F1M];if(!period)period=10;if(b6S[m01](longDays,shortDays))return ;for(var i=longDays;b6S[O1j](i,quotes.length);i++){if(!quotes[i])continue;if(!quotes[b6S[v0C](i,shortDays)])continue;if(!quotes[b6S[V1C](i,longDays)])continue;quotes[i]["Sum "+sd[T5U]]=b6S[(n1M+u1c)](100,((quotes[i][field]/quotes[i-shortDays][field])+(quotes[i][field]/quotes[i-longDays][field])-2));}
sd[(Z9w+b6S.a9M)]=new STX[a4w][s0C](sd[T5U],(x1M+b6S.a9M),sd[c7D]);sd[t7T][X1c]=sd[(V61+P8U)];sd[t7T][(F1M)]=period;sd[t7T][b1I]={"Field":"Sum "+sd[T5U]}
;sd[t7T][n8M]=sd[n8M];this[k47](stx,sd[t7T]);}
;STX[a4w][(o2M+N3C+b6S.a9M+b6S.K7M+b6S.I2M+q9w+U1I+V0M+q3U+Q6z+b6S.I2M+p1M+b6S.l2M+L6U+b6S.K7M+S2D)]=function(stx,sd){var K5D="R2F",d01="qua",t1c="RS",l7C="M2F",k7U="A2F",l8M="K2F",x2D="Sl",a1I="r2F",G5c="B2F",N0M="y2F",e5w="m2F",H1R="I2F",m2c="v2F",e0R="s2F",d61="c2F",F4z="Z2F",I0z="H2F",quotes=sd[X1c][r4R],field=sd[b1I]["Field"];if(b6S[I0z](field,null))field="Close";var sumWeights=b6S[F4z](sd[F1M],(sd[F1M]+1),2),squaredSumWeights=Math[(C5I)](sumWeights,2),sumWeightsSquared=b6S[d61](sumWeights,(2*sd[F1M]+1),3),sumCloses=0,sumWeightedCloses=0,sumClosesSquared=0;for(var i=0;b6S[e0R](i,quotes.length);i++){if(!quotes[i])continue;sumWeightedCloses+=b6S[m2c](sd[F1M]*quotes[i][field],sumCloses);sumCloses+=quotes[i][field];sumClosesSquared+=Math[C5I](quotes[i][field],2);if(b6S[H1R](i,sd[F1M]-1))continue;else if(b6S[e5w](i,sd[F1M]-1)){sumCloses-=quotes[b6S[N0M](i,sd[F1M])][field];sumClosesSquared-=Math[C5I](quotes[b6S[G5c](i,sd[F1M])][field],2);}
var b=b6S[a1I]((sd[F1M]*sumWeightedCloses-sumWeights*sumCloses),(sd[F1M]*sumWeightsSquared-squaredSumWeights));quotes[i][(x2D+c1M+x0M+b6S.I2M+B1I)+sd[(d8C+c77)]]=b;var a=b6S[l8M]((sumCloses-b*sumWeights),sd[F1M]);quotes[i]["Intercept "+sd[T5U]]=a;quotes[i]["Forecast "+sd[T5U]]=a+b6S[(k7U)](b,sd[F1M]);var c=b6S[l7C]((sd[F1M]*sumWeightsSquared-squaredSumWeights),(sd[F1M]*sumClosesSquared-Math[C5I](sumCloses,2)));quotes[i][(t1c+d01+V0M+Q5D+B1I)+sd[T5U]]=b6S[K5D](b,b,c);}
}
;STX[a4w][e9U]=function(stx,sd){var K4I="N2F",D7T="STD Dev",d8D="erage",a2c="Moving",A4R="lcu";sd[l37]=new STX[a4w][s0C](sd[T5U],(x1M+b6S.a9M),sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][(K8M+k7w+b6S.K7M+d0M)]={"Field":G3c,"Type":sd[b1I][e7z]}
;sd[l37][n8M]={"MA":F4U}
;this[(N3c+A4R+L57+h7M+a2c+b6S.V71+r2I+d8D)](stx,sd[l37]);sd[i4T]=new STX[a4w][s0C](sd[T5U],D7T,sd[c7D]);sd[i4T][X1c]=sd[X1c];sd[i4T][F1M]=sd[F1M];var field=sd[(K8M+T7C+z8I+d0M)][L8z];if(b6S[K4I](field,O1z))field=G3c;sd[(w2M+b6S.l2M)][b1I]={"Field":field,"Standard Deviations":sd[b1I][h0c],"Type":sd[b1I][e7z]}
;sd[i4T][n8M]={"STD Dev":F4U}
;this[F0M](stx,sd[i4T]);STX[a4w][n8U](stx,sd,b6S.p1j,n5M+sd[T5U],(E8j+L8j+F3j+B1I+F3j+B61+B1I)+sd[T5U]);}
;STX[a4w][(o2M+N7M+q5M+b6S.V71+T3j+n1M+r8I+E1M+c1M+O0D)]=function(stx,sd){var v6R="Shift Percentage",y5T="uts",o6c="V5F",Q2T="q5F",field=sd[b1I][L8z];if(b6S[Q2T](field,O1z))field=G3c;sd[l37]=new STX[a4w][s0C](sd[T5U],(x1M+b6S.a9M),sd[(x0M+b6S.a9M+J1C+E1M)]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][b1I]={"Field":field,"Type":sd[b1I][e7z]}
;sd[l37][n8M]={"MA":F4U}
;this[N3U](stx,sd[l37]);var shift=b6S[o6c](sd[(K8M+n1M+x0M+y5T)][v6R],O9w);STX[a4w][n8U](stx,sd,shift,n5M+sd[T5U]);}
;STX[a4w][(o2M+b6S.a9M+E1M+A7c+K2I+u7R+n1M+b6S.I2M+U5U+X3c+r2I+X4T+O0D)]=function(stx,sd,shift,centerIndex,offsetIndex){var F21="d5F",b2T="s5F",U9I="b5F",W7D="g5F";if(!shift)shift=0;if(!offsetIndex)offsetIndex=(y3c+z9R);if(!centerIndex)centerIndex="Close";var quotes=sd[X1c][r4R];for(var i=0;b6S[W7D](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(!quote[centerIndex])continue;var mult=b6S[U9I](shift,quote[offsetIndex]);quote[sd[c8c]+" Top "+sd[T5U]]=quote[centerIndex]+mult;quote[sd[c8c]+" Bottom "+sd[T5U]]=b6S[(D1M+K5R)](quote[centerIndex],mult);quote[sd[c8c]+" Median "+sd[T5U]]=quote[centerIndex];quote["Bandwidth "+sd[T5U]]=b6S[b2T](200,mult,quote[centerIndex]);quote[(y21+F9M+B1I)+sd[T5U]]=b6S[F21](50,((quote[G3c]-quote[centerIndex])/mult+1));}
}
;STX[a4w][G7w]=function(stx,sd){var m0M="A4F",G0M="K4F",a2M="r4F",j11="B4F",i6I="y4F",l5R="m4F",p9C="I4F",k4C="VT",h0U="v4F",w0w="s4F",M4c="j4F",E1I="b4F",X77="g4F",r1U="V4F",H0w="q4F",F3C="N5F",P57="C5F",u3w="X5F",U8j="O5F",e9D="T5F",j2M="o5F",quotes=sd[X1c][r4R],low=-1,high=-1;for(var i=0;b6S[j2M](i,quotes.length);i++){var period=sd[F1M];high=Math[z4M](high==-1?quotes[i]["High"]:high,quotes[i]["High"]);low=Math[B9R](low==-1?quotes[i]["Low"]:low,quotes[i]["Low"]);if(sd[b1I]["High Period"])period=sd[b1I]["High Period"];if(b6S[e9D](i,period)){if(b6S[U8j]((quotes[i-period]["High"]),high)){high=quotes[i][(v9M+K8M+b3C)];for(var j=1;b6S[(c3j+K5R)](j,period);j++){high=Math[z4M](high,quotes[b6S[(X7M+K5R)](i,j)]["High"]);}
}
}
if(sd[b1I]["Low Period"])period=sd[b1I][(c3j+r2D+B1I+J6j+t2D+c1M+b6S.l2M)];if(b6S[(F3j+K5R)](i,period)){if(b6S[u3w]((quotes[i-period][(k3z+J2I)]),low)){low=quotes[i]["Low"];for(var j=1;b6S[(b6S.I2M+p71+A3j)](j,period);j++){low=Math[B9R](low,quotes[b6S[P57](i,j)]["Low"]);}
}
}
var result=0;if(b6S[(F3C)](sd[c8c],"HHV")){result=high;}
else if(b6S[H0w](sd[c8c],"LLV")){result=low;}
else if(b6S[r1U](sd[c8c],"Donchian Width")){result=b6S[X77](high,low);}
else if(b6S[E1I](sd[c8c],"GAPO")||b6S[M4c](sd[c8c],"Gopala")){result=b6S[w0w](Math[H1w](high-low),Math[H1w](period));}
else if(b6S[h0U](sd[c8c],(k4C+B1I+v9M+q4M+B1I+A3j+j5w+C3w))){result=b6S[p9C](high,low);quotes[i]["MHML "+sd[T5U]]=result;continue;}
else if(b6S[l5R](sd[(b6S.K7M+g2I+O0D)],"Williams %R")){result=-100*(b6S[i6I](high,quotes[i][G3c]))/(b6S[j11](high,low));quotes[i]["Result "+sd[T5U]]=result;continue;}
if(b6S[a2M](i,quotes.length-1))break;if(b6S[G0M](sd[c8c],"Donchian Channel")){quotes[i+1]["Donchian High "+sd[T5U]]=high;quotes[i+1]["Donchian Low "+sd[T5U]]=low;quotes[i+1]["Donchian Median "+sd[T5U]]=b6S[m0M]((high+low),2);}
else{quotes[i+1]["Result "+sd[T5U]]=result;}
}
}
;STX[a4w][u81]=function(stx,sd){var O3w="P7F",o6U="Y7F",W11="z7F",N5T="h4F",S1I="R4F",G4R="M4F",quotes=sd[X1c][r4R],total=0;for(var i=1;b6S[(G4R)](i,quotes.length);i++){var quote=quotes[i],yClose=quotes[b6S[S1I](i,1)][G3c];if(!quote)continue;var todayAD=0;if(b6S[N5T](quote[(y3c+c1M+P6j)],yClose)){todayAD=b6S[W11](quote[G3c],Math[B9R](quote[Q6I],yClose));}
else if(b6S[o6U](quote[G3c],yClose)){todayAD=b6S[O3w](quote[G3c],Math[z4M](quote[c9R],yClose));}
total+=todayAD;quote["Result "+sd[T5U]]=total;}
}
;STX[a4w][V8D]=function(stx,sd){var h2R="J7F",E5M="su",b2c="W7F",l6C="t7F",k5M="c7F",d5R="w7F",g7c="ateMo",I4I="ud",quotes=sd[X1c][r4R];sd[(b6S.K7M+x0M)]=new STX[a4w][(o31+I4I+g2I+F3j+b6S.I2M+d0M+S3w+B6D+c1M+V0M)](sd[T5U],"typical price",sd[c7D]);sd[(b6S.K7M+x0M)][X1c]=sd[X1c];sd[k6M][F1M]=sd[F1M];sd[k6M][n8M]={"Typ Price":null}
;this[s91](stx,sd[k6M]);sd[l37]=new STX[(E8j+b6S.K7M+X7M+q5c+l5D)][s0C](sd[T5U],"ma",sd[c7D]);sd[l37][X1c]=sd[X1c];sd[l37][F1M]=sd[F1M];sd[l37][b1I]={"Field":"typicalPrice","Type":"simple"}
;sd[(x1M+b6S.a9M)][n8M]={"MA":null}
;this[(o2M+v7M+o2M+X7M+E1M+g7c+c91+X5C+b6S.V71+r2I+m4D+Z6M+b6S.I2M)](stx,sd[l37]);for(var i=b6S[d5R](sd[F1M],1);b6S[k5M](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;var md=0;for(var j=0;b6S[l6C](j,sd[F1M]);j++){md+=Math[v8M](b6S[b2c](quotes[i-j]["typicalPrice"],quote["MA "+sd[T5U]]));}
md/=sd[F1M];quote[(X1j+b6S.I2M+E5M+P67+B1I)+sd[T5U]]=b6S[h2R]((quote["typicalPrice"]-quote["MA "+sd[T5U]]),(0.015*md));}
}
;STX[a4w][r1C]=function(stx,sd){var f1I="D0F",g5D="u0F",f3w="typ",m47="L0F",M8M="T0F",m7z="o0F",G6w="d0F",Q87="E0F",s6w="k0F",l0w="l0F",V1w="Z0F",e3w="H0F",s9M="n0F",Z27="S0F",H0z="a7F",z01="f7F",z1z="p7F",r4U="G7F",E8C="Q7F",R1D="F7F",E8R="x7F",Q8U="U7F",E2w="i7F",quotes=sd[X1c][r4R],fractalHigh=0,fractalLow=0,test=0;for(var i=4;b6S[E2w](i,quotes.length);i++){if(!quotes[i])continue;var j;test=0;for(j=0;b6S[Q8U](j,i);j++){if(!quotes[b6S[E8R](i,j)])break;if(b6S[R1D](quotes[i-j][(v9M+K8M+Z6M+E8M)],quotes[i-2][c9R]))break;if(b6S[E8C](j,2)&&b6S[r4U](quotes[i-j][c9R],quotes[i-2][c9R]))break;if(b6S[z1z](quotes[i-j][c9R],quotes[i-2][c9R]))test++;if(b6S[(z01)](test,4)){fractalHigh=quotes[b6S[H0z](i,2)][(v9M+J2C)];break;}
}
if(b6S[Z27](sd[c8c],"Fractal Chaos Bands")){quotes[i]["Fractal High "+sd[T5U]]=b6S[s9M](fractalHigh,0)?fractalHigh:null;}
else if(b6S[e3w](test,4)){quotes[i]["Result "+sd[(n1M+n67)]]=1;}
test=0;for(j=0;b6S[V1w](j,i);j++){if(!quotes[b6S[l0w](i,j)])break;if(b6S[s6w](quotes[i-j][(c3j+c1M+J2I)],quotes[i-2][Q6I]))break;if(b6S[Q87](j,2)&&b6S[G6w](quotes[i-j][Q6I],quotes[i-2][Q6I]))break;if(b6S[m7z](quotes[i-j][Q6I],quotes[i-2][(k3z+J2I)]))test++;if(b6S[M8M](test,4)){fractalLow=quotes[b6S[(b6j+l91+A3j)](i,2)][Q6I];break;}
}
if(b6S[m47](sd[(f3w+b6S.I2M)],"Fractal Chaos Bands")){quotes[i]["Fractal Low "+sd[T5U]]=b6S[g5D](fractalLow,0)?fractalLow:null;}
else if(b6S[f1I](test,4)){quotes[i]["Result "+sd[(n1M+n67)]]=-1;}
}
}
;STX[a4w][D27]=function(stx,sd){var b8j="y1F",J8w="m1F",G5T="I1F",W4D="v1F",C1C="s1F",G31="computeEquationChart",U71="Quotes",F7D="completeAsyncAction",i5c="processComparison",n4M="multiFetch",r5T="startAsyncAction",P9C="terval",f81="b1F",o6R="g1F",h3z="V1F",Q9c="1F",F6j="N0F",u6U="loadedInitialData",o2c="C0F",o7C="dyQu",p3w="stu",g3U="e0F",O91="X0F";stx[K41][sd[c7D]][b0M]={}
;if(stx[X1c][F3I][m8z](":")>-1){stx[K41][sd[c7D]][b0M]=null;return ;}
var cSym=sd[b1I]["Comparison Symbol"][T91](":")[0];if(b6S[O91](cSym,"")||b6S[g3U](cSym,stx[X1c][F3I])){stx[K41][sd[c7D]][b0M]=null;return ;}
stx[(x0M+u1D+i67)][sd[c7D]][(p3w+o7C+t8R+d0M)][cSym]=true;var quotes=sd[X1c][r4R];if(b6S[o2c](sd[u6U],true)){var q=0;for(;b6S[F6j](q,quotes.length);q++){if(b6S[(e0M+Q9c)](quotes[q],null)&&b6S[h3z](quotes[q][cSym],null))break;}
if(b6S[o6R](q,quotes.length))sd[u6U]=null;}
if(b6S[f81](sd[u6U],null)){sd[u6U]=false;var params={stx:stx,chart:stx[K41][sd[c7D]][X1c],symbol:cSym,interval:stx[(L57+r7T+X7M+b6S.K7M)][(E0T+P9C)],period:1,extended:stx[k5I][d0I],adj:stx[k5I][i8I],startDate:quotes[0][q4c],feed:"delayed",nocache:true}
;if(!isNaN(params[k9w])){params[(S57)]=params[k9w];params[k9w]="minute";}
stx[r5T]();if(stx[b3D]){stx[b3D][v1w][n4M]([params],function(results){var i6D="alDa",P2T="loa",p3I="j1F";for(var i=0;b6S[p3I](i,results.length);i++){var result=results[i];if(result[h6j].error){sd[(P2T+b6S.l2M+b6S.I2M+b6S.l2M+i6j+n1M+K8M+z1M+i6D+b6S.K7M+b6S.a9M)]=null;}
else{STX[J3I][i5c](params[(d0M+V9I)],params[F3I],result[h6j][o5D]);params[r9T][(K0c+b6S.I2M+t5M+F3j+e4R+z5D)]();params[r9T][Y5M]();sd[u6U]=true;}
}
params[r9T][F7D]();}
);}
else{STX[U71][n6c](params,function(error,data){if(error){sd[u6U]=null;}
else{STX[J3I][i5c](stx,params[F3I],data);stx[A01]();stx[Y5M]();sd[u6U]=true;}
stx[F7D]();}
);}
return ;}
quotes=stx[X1c][g91];var map={}
;map[stx[X1c][F3I]]=[][A0z](quotes);map[cSym]=null;var results=STX[G31](stx[X1c][F3I]+"/"+cSym,map),rIter=0;for(var i=0;b6S[C1C](i,quotes.length)&&b6S[W4D](rIter,results.length);i++){while(b6S[G5T](rIter,results.length)&&b6S[J8w](quotes[i][(F3j+L8j)][Y7w](),results[rIter][q4c][Y7w]()))rIter++;if(b6S[b8j](quotes[i][q4c][Y7w](),results[rIter][q4c][Y7w]()))continue;quotes[i]["Result "+sd[T5U]]=results[rIter][G3c];rIter++;}
}
;STX[a4w][(v4z+E1M+b6S.a9M+u4z+V0M+K8M+o2M+N3D+L87+b6S.I2M)]=function(stx,sd,quotes){var R41="r1F";if(!stx[K41][sd[c7D]][b0M]){stx[o1M](sd[(k6D+J1C+E1M)],"center","bottom",stx[f5I]("Price Relative Not Available"));return ;}
for(var c=b6S[(Q41+I91+A3j)](quotes.length,1);b6S[R41](c,0);c--){if(quotes[c]&&quotes[c][sd[b1I]["Comparison Symbol"]]){STX[a4w][o6D](stx,sd,quotes);return ;}
}
}
;STX[a4w][k9T]=function(stx,sd,quotes){var e0z="yF",k7R="kV",d6w="Pea",l0z="prepa";STX[a4w][o6D](stx,sd,quotes);var low=-3,high=3,panel=stx[(x0M+b6S.a9M+n1M+l7D+d0M)][sd[c7D]],color=stx[X1c][o4z].strokeStyle;stx[X1c][o4z].globalAlpha=.2;stx[X1c][o4z].strokeStyle=sd[n8M][(X1j+b6S.I2M+d0M+X7M+E1M+b6S.K7M)];stx[X1c][o4z].beginPath();var ph=stx[D7C](high,panel);stx[X1c][o4z].moveTo(0,ph);stx[X1c][o4z].lineTo(stx[X1c].width,ph);pl=stx[D7C](low,panel);stx[X1c][o4z].moveTo(0,pl);stx[X1c][o4z].lineTo(stx[X1c].width,pl);stx[X1c][o4z].stroke();stx[X1c][o4z].closePath();STX[a4w][(l0z+N4U+d6w+k7R+v7M+E1M+b6S.I2M+e0z+K8M+E1M+E1M)](stx,quotes,{panelName:sd[c7D],band:"Result "+sd[T5U],threshold:high,direction:1,color:sd[n8M][(s1c+X7M+P67)]}
);STX[a4w][L5w](stx,quotes,{panelName:sd[c7D],band:"Result "+sd[T5U],threshold:low,direction:-1,color:sd[n8M]["Result"]}
);stx[X1c][o4z].strokeStyle=color;stx[X1c][o4z].globalAlpha=1;}
;STX[a4w][Z2R]=function(stx,sd,quotes){var R51="c8F",X6w="w8F",b5w="P8F",M1c="Y8F",Q7D="z8F",L77="h1F",z2U="R1F",m17="M1F",R0c="A1F",i7I="K1F";STX[a4w][r9I](stx,sd,quotes);var panel=stx[K41][sd[T5U]];panel[c3I][S4w]=panel[B9R]=Math[B9R](0,panel[B9R]);panel[c3I][o5w]=panel[z4M]=Math[(x1M+Y3j)](0,panel[z4M]);STX[a4w][o6D](stx,sd,quotes);var y=stx[D7C](0,panel),negativeOffset=b6S[i7I]((stx[q7z]-stx[k5I][h4U]),2),myWidth=b6S[R0c](stx[k5I][h4U],2);if(b6S[m17](myWidth,2))myWidth=1;var upColor=sd[n8M]["Increasing Bar"],downColor=sd[n8M]["Decreasing Bar"];stx[X3j]("stx_histogram");stx[X1c][o4z].globalAlpha=1;stx[X1c][o4z].fillStyle="#CCCCCC";for(var i=0;b6S[z2U](i,quotes.length);i++){var quote=quotes[i];if(b6S[L77](quote,null)||b6S[Q7D](quotes[i-1],null))continue;if(b6S[M1c](i,0));else if(b6S[b5w](quotes[i-1][sd[T5U]+"_hist"],quote[sd[T5U]+"_hist"]))stx[X1c][(o2M+c1M+F4C+G6I)].fillStyle=upColor;else if(b6S[X6w](quotes[i-1][sd[(n1M+b6S.a9M+c77)]+"_hist"],quote[sd[T5U]+"_hist"]))stx[X1c][o4z].fillStyle=downColor;stx[X1c][o4z].fillRect(Math[b3R](stx[x0R](i,1)+negativeOffset),Math[b3R](y),Math[b3R](myWidth),Math[b3R](b6S[R51](stx[D7C](quote[sd[T5U]+"_hist"],panel),y)));}
}
;STX[a4w][w9I]=function(stx,sd,quotes){var e1U="S6F",f87="a8F",K3I="f8F",U8I="p8F",h97="G8F",R37="Q8F",y6I="udyO",T3c="ara",r9c="F8F",j3U="x8F",x3c="U8F",A2z="i8F",e3R="J8F",g4D="W8F",a91="sLi",M5z="yS",F2c="pla",O7z="t8F";for(var i=0;b6S[O7z](i,quotes.length);i++){quotes[i][sd[T5U]+(o5M+L0z+d0M+b6S.K7M)]=quotes[i]["Result "+sd[T5U]];}
STX[a4w][r9I](stx,sd,quotes);var panel=stx[K41][sd[T5U]];panel[c3I][S4w]=panel[B9R]=Math[B9R](0,panel[B9R]);panel[(g2I+p67)][o5w]=panel[z4M]=Math[z4M](0,panel[z4M]);STX[a4w][(b6S.l2M+K8M+d0M+F2c+M5z+t2D+l4D+a91+n1M+b6S.I2M)](stx,sd,quotes);var y=stx[D7C](0,panel),negativeOffset=b6S[g4D]((stx[q7z]-stx[k5I][h4U]),2),myWidth=b6S[e3R](stx[k5I][h4U],2);if(b6S[A2z](myWidth,2))myWidth=1;var upColor=sd[n8M]["Increasing Bar"],downColor=sd[n8M]["Decreasing Bar"];stx[X3j]("stx_histogram");stx[X1c][o4z].globalAlpha=1;for(var i=0;b6S[x3c](i,quotes.length);i++){var quote=quotes[i];if(b6S[j3U](quote,null)||b6S[r9c](quotes[i-1],null))continue;var overBought=0,overSold=0;if(sd[Z91]&&sd[Z91][t1M]){overBought=parseFloat(sd[(x0M+T3c+x1M+b6S.I2M+C3w+d0M)][D3M]),overSold=parseFloat(sd[Z91][(w2M+y6I+r2I+i2D+E8j+c1M+E1M+b6S.l2M+Q4M+b6S.a9M+C3R)]);}
if(b6S[R37](i,0))stx[X1c][(o2M+c1M+n1M+n3w+b6S.K7M)].fillStyle="#CCCCCC";else if(b6S[h97](quote[sd[T5U]+"_hist"],overBought)&&b6S[(U8I)](quotes[i-1][sd[T5U]+"_hist"],quote[sd[T5U]+"_hist"]))stx[X1c][o4z].fillStyle=upColor;else if(b6S[K3I](quote[sd[T5U]+"_hist"],overSold)&&b6S[f87](quotes[i-1][sd[T5U]+"_hist"],quote[sd[T5U]+"_hist"]))stx[X1c][o4z].fillStyle=downColor;else stx[X1c][o4z].fillStyle="#CCCCCC";stx[X1c][o4z].fillRect(Math[b3R](stx[x0R](i,1)+negativeOffset),Math[b3R](y),Math[b3R](myWidth),Math[b3R](b6S[e1U](stx[D7C](quote[sd[T5U]+"_hist"],panel),y)));}
}
;STX[a4w][I71]=function(stx,sd,quotes){var U0T="L6F",C5R="6F",F7C="T6F",P6I="_h",V3M="o6F",R7I="d6F",u6R="Z6F",S1M="H6F",p5C="n6F",m31="sLin",R1C="ayS";STX[a4w][r9I](stx,sd,quotes);var panel=stx[K41][sd[T5U]];panel[c3I][S4w]=panel[B9R]=Math[B9R](0,panel[B9R]);panel[c3I][o5w]=panel[z4M]=Math[z4M](0,panel[(x1M+b6S.a9M+s2I)]);STX[(k4U+q5c+b6S.I2M+d0M)][(b6S.l2M+S7T+T2c+R1C+i2D+K8M+l4D+m31+b6S.I2M)](stx,sd,quotes);var y=stx[D7C](0,panel),negativeOffset=b6S[p5C]((stx[q7z]-stx[k5I][h4U]),2),myWidth=b6S[S1M](stx[k5I][h4U],2);if(b6S[u6R](myWidth,2))myWidth=1;function drawBar(i,reduction,output,hist){var k8M="E6F",H4U="k6F",I3c="l6F";stx[X1c][o4z].fillStyle=sd[n8M][output];stx[X1c][o4z].fillRect(Math[b3R](stx[x0R](i,1)+negativeOffset)+b6S[I3c](myWidth,reduction),Math[b3R](y),b6S[H4U](Math[b3R](myWidth),(1-2*reduction)),Math[b3R](b6S[k8M](stx[D7C](quote[sd[T5U]+hist],panel),y)));}
stx[X3j]("stx_histogram");var fillStyle=stx[X1c][o4z].fillStyle;stx[X1c][o4z].globalAlpha=1;for(var i=0;b6S[R7I](i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(b6S[V3M](quote[sd[T5U]+(P6I+K8M+w2M+I91)],0))drawBar(i,0,"Elder Bull Power",(w6w));if(b6S[F7C](quote[sd[(d8C+c77)]+"_hist2"],0))drawBar(i,0,"Elder Bear Power","_hist2");if(b6S[(b6j+C5R)](quote[sd[T5U]+"_hist1"],0))drawBar(i,.1,"Elder Bull Power","_hist1");if(b6S[U0T](quote[sd[T5U]+"_hist2"],0))drawBar(i,.1,"Elder Bear Power","_hist2");}
stx[X1c][o4z].fillStyle=fillStyle;}
;STX[a4w][R4C]=function(stx,sd,quotes){var S97="Support 3",B3R="Support 2",p5T="outp",d7T="ort",Q5c="Sup",A3M="Support 2 ",M3R="Support 1",D31="Resistance 1",T31="Resistance 2",V11="hann",z5C="prep",Z31="Resistance 3",A4M="Shading";STX[(y9z+b6S.I2M+d0M)][o6D](stx,sd,quotes);if(sd[b1I][A4M]){STX[a4w][U7M](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:G2z+sd[T5U],bottomBand:K9z+sd[T5U],color:sd[n8M][Z31]}
);STX[a4w][(z5C+B6c+I41+V11+l7D+o9R+i6R)](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:K9z+sd[T5U],bottomBand:R9T+sd[T5U],color:sd[n8M][T31]}
);STX[a4w][U7M](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:R9T+sd[T5U],bottomBand:P7D+sd[T5U],color:sd[n8M][D31]}
);STX[a4w][U7M](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:(E8j+X7M+x0M+x0M+c1M+V0M+b6S.K7M+B1I+I91+B1I)+sd[T5U],bottomBand:P7D+sd[T5U],color:sd[n8M][M3R]}
);STX[a4w][U7M](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:A3M+sd[T5U],bottomBand:(Q5c+x0M+d7T+B1I+I91+B1I)+sd[T5U],color:sd[(p5T+X7M+b6S.K7M+d0M)][B3R]}
);STX[a4w][U7M](stx,quotes,{panelName:sd[c7D],noSlopes:w2T,topBand:f2M+sd[T5U],bottomBand:A3M+sd[(n1M+n67)],color:sd[n8M][S97]}
);}
}
;STX[a4w][B4T]=function(stx,sd,quotes){STX[a4w][o6D](stx,sd,quotes);var bulge=sd[b1I]["Bulge Threshold"],panel=stx[K41][sd[c7D]],color=stx[X1c][o4z].strokeStyle;stx[X1c][o4z].globalAlpha=.2;stx[X1c][o4z].strokeStyle=sd[n8M]["Result"];stx[X1c][o4z].beginPath();var p=stx[D7C](bulge,panel);stx[X1c][o4z].moveTo(0,p);stx[X1c][o4z].lineTo(stx[(o2M+V8z+V0M+b6S.K7M)].width,p);stx[X1c][o4z].stroke();stx[X1c][o4z].closePath();STX[a4w][L5w](stx,quotes,{panelName:sd[c7D],band:"Result "+sd[T5U],threshold:bulge,direction:1,color:sd[(Z5D+k6M+z8I+d0M)]["Result"]}
);stx[X1c][o4z].strokeStyle=color;stx[(o2M+E8M+K8j+b6S.K7M)][o4z].globalAlpha=1;}
;STX[a4w][(b6S.l2M+K8M+l5U+D7M+b6S.I2M+E1M)]=function(stx,sd,quotes){var d6D="Channel",g8z="N6F",x4R="Median",X0R="C6F",i7T="e6F",P17="Bott",x5R="X6F",F8D="D6F",N3w="Top",T1w="u6F",K9R="Channel Fill";STX[a4w][o6D](stx,sd,quotes);if(sd[b1I][K9R]){var parameters={panelName:sd[(L5T+l7D)]}
;for(var p in sd[n8M]){var lastWord=p[T91](B1I)[w5I]();if(b6S[T1w](lastWord,N3w)||b6S[F8D](lastWord,c9R)){parameters[u1C]=p+B1I+sd[T5U];}
else if(b6S[x5R](lastWord,(P17+Z7D))||b6S[i7T](lastWord,Q6I)){parameters[Y8M]=p+B1I+sd[T5U];}
else if(b6S[X0R](lastWord,x4R)||b6S[g8z](lastWord,d6D)){parameters[c7R]=sd[n8M][p];}
}
STX[a4w][U7M](stx,quotes,parameters);}
}
;STX[a4w][U7M]=function(stx,quotes,parameters){var t2R="fillArea",H2U="B3F",c5I="y3F",W57="I3F",J8c="v3F",q8R="s3F",N0D="j3F",l71="b3F",S4C="g3F",V7T="V3F",G0z="q3F",panel=stx[K41][parameters[T6z]],t=panel.yAxis.top,b=panel[c3I][f97],noSlopes=parameters[T11],highs=[],lows=[];for(var i=1;b6S[G0z](i,quotes.length);i++){var quote_1=quotes[b6S[V7T](i,1)];if(!quote_1||!quote_1[W8R])continue;if(b6S[S4C](panel[T5U],stx[(o2M+v9T)][T5U])&&quote_1.transform)quote_1=quote_1.transform;if(!highs.length){var hy1=Math[z4M](t,Math[B9R](b,quote_1[W8R][parameters[u1C]]));if(!isNaN(hy1)){var x1=(b6S[l71](i,1)?0:b6S[N0D]((i-1),stx[k5I][h4U])+stx[k9c]);highs[I57]([x1,hy1]);}
}
if(!lows.length){var ly1=Math[z4M](t,Math[(B9R)](b,quote_1[W8R][parameters[Y8M]]));if(!isNaN(ly1)){var x1=(b6S[q8R](i,1)?0:b6S[J8c]((i-1),stx[k5I][h4U])+stx[k9c]);lows[I57]([x1,ly1]);}
}
var quote=quotes[i];if(b6S[W57](panel[T5U],stx[X1c][T5U])&&quote.transform)quote=quote.transform;if(highs.length||lows.length){var x2=b6S[(x1M+N3I+A3j)](i,stx[k5I][h4U])+stx[(c1M+P6M+b6S.I2M+b6S.K7M)];if(highs.length){if(noSlopes){highs[I57]([x2,highs[b6S[c5I](highs.length,1)][1]]);}
var hy2=Math[z4M](t,Math[B9R](b,quote[(W8R)][parameters[(z4c+Q41+b6S.a9M+D1C)]]));highs[I57]([x2,hy2]);}
if(lows.length){if(noSlopes){lows[I57]([x2,lows[b6S[H2U](lows.length,1)][1]]);}
var ly2=Math[z4M](t,Math[B9R](b,quote[W8R][parameters[Y8M]]));lows[I57]([x2,ly2]);}
}
}
var points=highs[A0z](lows[i8R]());STX[a4w][t2R](stx,points,parameters[c7R],null,parameters[T6z]);}
;STX[a4w][U6c]=function(stx,sd,quotes){var G1M="axisDrawn",c6C="P9g",l7M="Y9g",V9z="ya",N1M="yaxis",r3I="z9g",x4U="rd",G0R="h3F",F7M="R3",n6U="Bo",Y0C="M3F",A8j="A3F",k3j="K3F",k9I="r3F",m41="studyOverBoughtColor",a11="studyOverSoldColor",x01="studyOverSoldValue";if(!sd[Z91]||!sd[Z91][t1M])return ;var low=parseFloat(sd[Z91][x01]),high=parseFloat(sd[Z91][D3M]),lowColor=sd[Z91][a11],highColor=sd[Z91][m41],output=sd[j5U];if(!output)output="Result";var zoneColor=sd[n8M][output];if(b6S[k9I](zoneColor,null)||b6S[k3j](zoneColor,"auto")||STX[s7c](zoneColor))zoneColor=stx[B3I];if(b6S[A8j](lowColor,""))lowColor=zoneColor;if(b6S[Y0C](highColor,""))highColor=zoneColor;var drawBorders=stx[X1c][c7D][c3I][u2M]||stx[(b6S.a9M+s2I+S7T+n6U+V0M+b6S.l2M+b6S.I2M+k8U)],borderEdge=Math[y1c](stx[X1c].width)+.5,w=drawBorders?b6S[(F7M+A3j)](borderEdge,.5):stx[X1c].width,tickWidth=drawBorders?3:0,color=stx[X1c][o4z].fillStyle,panel=stx[K41][sd[c7D]];stx[(X1c)][o4z].globalAlpha=.2;panel[s0c]=new STX[M5D]();panel[s0c][K6R]("border","stroke",stx[M3z]("stx_grid_border"));stx[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)][o4z].beginPath();var ph=Math[y1c](stx[D7C](high,panel))+.5;stx[X1c][o4z].strokeStyle=highColor;stx[(V61+V0M+b6S.K7M)][o4z].moveTo(0,ph);stx[X1c][o4z].lineTo(w,ph);stx[X1c][o4z].stroke();var pl=Math[y1c](stx[D7C](low,panel))+.5;stx[X1c][o4z].strokeStyle=lowColor;stx[X1c][o4z].moveTo(0,pl);stx[X1c][o4z].lineTo(w,pl);stx[X1c][o4z].stroke();stx[X1c][o4z].closePath();if(drawBorders){panel[s0c].moveTo("border",b6S[G0R](borderEdge,.5),ph);panel[s0c].lineTo((F9M+c1M+x4U+b6S.I2M+V0M),borderEdge+tickWidth,ph);panel[s0c].moveTo("border",b6S[r3I](borderEdge,.5),pl);panel[s0c].lineTo("border",borderEdge+tickWidth,pl);}
stx[X1c][o4z].fillStyle=color;STX[a4w][L5w](stx,quotes,{panelName:sd[c7D],band:output+" "+sd[T5U],threshold:high,direction:1,color:highColor}
);STX[a4w][L5w](stx,quotes,{panelName:sd[c7D],band:output+" "+sd[T5U],threshold:low,direction:-1,color:lowColor}
);stx[(o2M+E8M+i1M)][o4z].globalAlpha=1;if(!sd[N41][N1M]){var yAxis=panel[c3I];if(drawBorders){var b=Math[y1c](yAxis[f97])+.5;panel[s0c].moveTo("border",borderEdge,yAxis.top);panel[s0c].lineTo("border",borderEdge,b);panel[s0c][Y5M](stx[X1c][o4z],(F9M+c1M+x4U+b6S.I2M+V0M));}
stx[f6z]((d0M+V9I+o5M+V9z+h0w));stx[X3j]("stx_yaxis");var ypx=b6S[l7M](panel.height,panel[B8j]),textX=b6S[c6C](stx[X1c][(o2M+P2c+b6S.a9M+d0M+i7M+K8M+b6S.l2M+b6S.K7M+E8M)],stx[a5C],tickWidth,3);stx[X1c][o4z].fillText(high,textX,ph);stx[X1c][o4z].fillText(low,textX,pl);panel[G1M]=true;}
}
;STX[a4w][L5w]=function(stx,quotes,parameters){var g57="Are",I4w="ill",v6M="o5g",A1j="ght",s1M="hli",n3R="geHig",b0I="d5g",h8M="E5g",T4U="k5g",R9U="ete",B5c="dg",B5T="edgeParameters",n3c="l5g",w07="edgeHighlight",N2c="g5g",D3U="q5g",A0U="2g",B2c="R2g",I8j="A2g",A6j="K2g",B6M="r2g",L2U="B2g",v11="xte",C2I="y2g",f6R="m2g",M57="I2g",j9U="v2g",x57="s2g",U1D="j2g",A41="b2g",b8D="direction",c7C="g2g",U7T="V2g",f0z="q2g",F2z="iplier",V3R="N9g",j4z="C9g",v91="e9g",N6C="X9g",e57="D9g",e37="u9g",T2M="L9g",T6C="O9g",i11="band",J2T="T9g",a6D="o9g",I1c="d9g",H1I="E9g",z4C="k9g",A4I="l9g",t9U="threshold",panel=stx[K41][parameters[T6z]],t=panel.yAxis.top,b=panel[(g2I+T0T+d0M)][f97];if(!parameters[t9U]&&b6S[A4I](parameters[t9U],0))return ;var yThresh;if(b6S[z4C](parameters[T6z],stx[X1c][c7D][T5U])){yThresh=stx[I0c](parameters[t9U],panel);}
else{yThresh=stx[D7C](parameters[t9U],panel);}
var points=[];for(var i=1;b6S[H1I](i,quotes.length);i++){if(!quotes[b6S[I1c](i,1)])continue;var quote=quotes[i],quote_1=quotes[b6S[a6D](i,1)];if(b6S[J2T](parameters[T6z],stx[X1c][c7D][T5U])){var qItem=quote[W8R][parameters[i11]],qItem_1=quote_1[W8R][parameters[i11]];if(quote.transform)qItem=stx[D7C](quote.transform[parameters[i11]],panel);if(quote_1.transform)qItem_1=stx[D7C](quote_1.transform[parameters[i11]],panel);}
else if(quote[W8R]&&quote_1[(o2M+b6S.a9M+b6S.j3c+b6S.I2M)]){var qItem=quote[W8R][parameters[i11]],qItem_1=quote_1[W8R][parameters[i11]];if(typeof qItem=="undefined"||typeof qItem_1=="undefined"){var qItem=stx[(x0M+K8M+Y1I+U5R+c1M+m3R+W7M)](quote[parameters[i11]],panel),qItem_1=stx[D7C](quote_1[parameters[i11]],panel);}
}
else{var qItem=stx[D7C](quote[parameters[i11]],panel),qItem_1=stx[D7C](quote_1[parameters[i11]],panel);}
if(!points.length){var x1=b6S[T6C]((i-1),stx[k5I][h4U])+stx[k9c];if(b6S[T2M](i,1)){var leftTick=b6S[e37](stx[X1c][g91].length,stx[X1c][s67]);if(b6S[e57](leftTick,0)){var x0=b6S[N6C](stx[k9c],stx[k5I][h4U]),baseline=stx[X1c][g91][b6S[v91](leftTick,1)];if(b6S[j4z](panel[T5U],stx[X1c][(x0M+b6S.a9M+n1M+b6S.I2M+E1M)][T5U])&&baseline.transform)baseline=baseline.transform;var y0=baseline[parameters[i11]];y0=b6S[(V3R)]((panel[c3I][o5w]-y0),panel[c3I][(r81+b6S.K7M+F2z)])+t;var y0Clipped=y0;if(!isNaN(y0Clipped)){if(b6S[f0z](y0,yThresh)&&b6S[U7T](qItem_1,yThresh)){points[I57]([x0,b6S[c7C](parameters[b8D],1)?yThresh:y0Clipped]);}
else if(b6S[A41](y0,yThresh)&&b6S[U1D](qItem_1,yThresh)){points[I57]([x0,parameters[b8D]==-1?yThresh:y0Clipped]);}
else{points[I57]([b6S[(x57)](x1,(x1-x0)*(yThresh-qItem_1)/(y0-qItem_1)),yThresh]);}
}
}
}
var y1=qItem_1;if(!isNaN(y1)&&((b6S[j9U](quote_1[parameters[i11]],parameters[t9U])&&b6S[M57](parameters[b8D],1))||(b6S[f6R](quote_1[parameters[i11]],parameters[t9U])&&parameters[b8D]==-1))){points[I57]([x1,y1]);}
else{points[I57]([x1,yThresh]);}
}
if(points.length){var x2=b6S[C2I](i,stx[k5I][h4U])+stx[k9c];if(stx[(b6S.I2M+v11+D1C+E4D+L8j+K8M+K6c)]&&b6S[L2U](i,quotes.length-1))x2+=stx[k9c];var y2=qItem;if((b6S[B6M](quote[parameters[i11]],parameters[t9U])&&b6S[A6j](parameters[b8D],1))||(b6S[I8j](quote[parameters[i11]],parameters[t9U])&&parameters[b8D]==-1)){if(b6S[(L2z+Z6M)](points[points.length-1][1],yThresh)){points[I57]([points[b6S[B2c](points.length,1)][0]+b6S[(E8M+A0U)]((x2-points[points.length-1][0]),(yThresh-qItem_1),(y2-qItem_1)),yThresh]);}
points[I57]([x2,y2]);}
else{if(b6S[D3U](points[points.length-1][1],yThresh)){points[I57]([points[b6S[(Q4M+p71+Z6M)](points.length,1)][0]+b6S[N2c]((x2-points[points.length-1][0]),(yThresh-qItem_1),(y2-qItem_1)),yThresh]);}
points[I57]([x2,yThresh]);}
}
}
if(!points.length)return ;if(parameters[w07]){if(b6S[n3c](parameters[B5T].lineWidth,100))parameters[(b6S.I2M+B5c+I9c+K7D+R9U+k8U)].lineWidth=1;for(var p=0;b6S[T4U](p,points.length-1);p++){if(b6S[h8M](points[p][1],yThresh)||b6S[b0I](points[p+1][1],yThresh))stx[j5T](points[p][0],points[p+1][0],points[p][1],points[p+1][1],parameters[(Q5D+n3R+s1M+A1j)],"segment",stx[X1c][(S4T+s2I+b6S.K7M)],true,parameters[B5T]);}
}
points[I57]([points[b6S[v6M](points.length,1)][0],yThresh],[points[0][0],yThresh]);var opacity=parameters[(c1M+k6D+o2M+K8M+b6S.K7M+g2I)];if(b6S[(L8j+p71+Z6M)](opacity,null))opacity=0.3;STX[a4w][(q6M+I4w+g57+b6S.a9M)](stx,points,parameters[c7R],opacity,parameters[T6z]);}
;STX[a4w][C0c]=function(stx,sd){var Z3U="Undefined Study: ";console[H1w](Z3U+sd[c8c]);return ;}
;STX[f57][L3C]=function(){this[T5U]=L3C;this[e1M]=[];this[J2I]=b6S.M1j;this[E8M]=b6S.M1j;this[Q5M]=b6S.N1j;this[e6w]=B7M;this[f4M]=F4U;this[r3w]=b6S.M1j;this.font={}
;}
;STX[f57][L3C][(r9T+g2T+E8M+u4D+V0M+Z7D)](STX[f57][H11]);STX.Drawing.annotation.prototype.getFontString=function(){var X0c="ontD",F27="family",A2c="fontD",J3U="fontSty";this[X2c]={style:null,weight:null,size:"12px",family:null}
;var css=this[r9T][M3z]("stx_annotation");if(css){if(css[(J3U+E1M+b6S.I2M)])this[X2c][W4w]=css[k6c];if(css[e2w])this[X2c][Z7I]=css[e2w];if(css[r3w])this[(A2c+b6S.I2M+q6M)][h8c]=css[r3w];if(css[Q0D])this[X2c][F27]=css[Q0D];}
if(this.font[W4w])this[X2c][W4w]=this.font[W4w];if(this.font[Z7I])this[X2c][Z7I]=this.font[Z7I];if(this.font[h8c])this[(q6M+X0c+b6S.I2M+q6M)][h8c]=this.font[h8c];if(this.font[F27])this[X2c][F27]=this.font[F27];this[z1c]="";var first=false;for(var n in this[X2c]){if(this[X2c][n]){if(!first){this[z1c]+=" ";}
else{first=true;}
this[z1c]+=this[X2c][n];}
}
}
;STX.Drawing.annotation.prototype.copyConfig=function(){this[c7R]=this[r9T][d3I][F0w];this.font=STX[x9c](this[r9T][d3I][L3C].font);}
;STX.Drawing.annotation.prototype.measure=function(){}
;STX.Drawing.annotation.prototype.render=function(context){var l4w="e5g",l2w="bor",M1w="dCol",Z5R="X5g",w6D="D5g",l7w="u5g",g4C="5g",p7M="O5g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;var x0=this[(d0M+b6S.K7M+s2I)][d57](this[(x0M+l91)][0],panel[X1c]),y0=this[(d0M+b6S.K7M+s2I)][q5T](panel,this[s7C][0],this[(x0M+l91)][1]);context.font=this[(q6M+S7D+L9M+b6S.K7M+V0M+i0I)];context.textBaseline="top";var x=x0,y=y0,w=this[J2I],h=this[E8M],color=this[c7R];if(b6S[p7M](color,"auto")||STX[s7c](color))color=this[r9T][B3I];if(this[K4z])color=this[r9T][M3z]("stx_highlight_vector");if(this[Q8z]){var sx0,sx1,sy0,sy1;if(this[Q8z][b6S.l2M]){sx0=this[r9T][d57](this[Q8z][b6S.K7M]);sy0=this[r9T][q5T](panel,this[Q8z][b6S.K7M],this[(w2M+u9D)][r2I]);sx1=x+b6S[(c3j+g4C)](w,2);sy1=y+b6S[l7w](h,2);}
else if(this[Q8z][s2I]){sx0=x;sy0=y;x+=this[Q8z][s2I];y+=this[Q8z][g2I];sx1=x+b6S[w6D](w,2);sy1=y+b6S[Z5R](h,2);}
context.beginPath();if(this[A47])context.strokeStyle=this[A47];else context.strokeStyle=color;context.moveTo(sx0,sy0);context.lineTo(sx1,sy1);context.stroke();}
if(this[K4z]){this[r9T][X3j]("stx_annotation_highlight_bg",context);context.fillRect(x,y,w,h);}
else{if(this[t57]){context.fillStyle=this[(F9M+N9I+Z6M+t3U+n1M+M1w+S2D)];context.fillRect(x,y,w,h);}
else if(this[Q8z]){context.fillStyle=this[r9T][A0M];context.fillRect(x,y,w,h);}
}
if(this[A47]){context.beginPath();context.strokeStyle=this[(l2w+b6S.l2M+b6S.I2M+V0M+p3c+E1M+c1M+V0M)];context.rect(x,y,w,h);context.stroke();}
if(this[K4z]){this[r9T][X3j]("stx_annotation_highlight",context);}
else{context.fillStyle=color;}
y+=this[Q5M];for(var i=0;b6S[l4w](i,this[e1M].length);i++){context.fillText(this[e1M][i],x+this[(x0M+b6S.a9M+b6S.l2M+b6S.l2M+i0I)],y);y+=this[r3w];}
context.textBaseline="alphabetic";}
;STX.Drawing.annotation.prototype.edit=function(context){var H5T="K4",t0w="r4g",B3w="pageHeight",D7D="B4",v4R="priorBottom",n11="y4g",t4C="m4g",f0M="isIOS7or8",O5T="setAttribute",O8C="I4g",g0R="ota",g2D="Ann",panel=this[r9T][K41][this[T6z]];if(!panel)return ;function handleTAMouseUp(stx){return function(e){if(stx[X3R]&&STXChart[e11]){stx[T9c](e);}
}
;}
;function cancelAnnotation(self){return function(){self[r9T][w3I]();self[r9T][V6z]=true;}
;}
function saveAnnotation(self){return function(){var W7R="C5g";if(b6S[W7R](self[f4M][A6I],""))return ;self[e6w]=self[f4M][A6I];self[g7R]();self[r9T][e2M](self);self[(d0M+b6S.K7M+s2I)][H2M]("vector");self[r9T][w3I]();self[r9T][V6z]=true;}
;}
;function resizeAnnotation(self){return function(e){var G4M="v4g",U2T="s4g",L5U="j4g",N3M="b4g",Y7T="yl",p9D="g4g",g5T="q4g",r1z="N5g",w1w="keyCode";if(e){var key=(window[G01])?event[w1w]:e[w1w];switch(key){case 27:self[r9T][w3I]();return ;}
}
var stx=self[r9T],ta=self[f4M],save=stx[b9M][r0D],cancel=stx[b9M][Y8U],arr=ta[A6I][T91]('\n'),w=0;stx[X1c][o4z].font=self[z1c];for(var i=0;b6S[r1z](i,arr.length);i++){var m=stx[X1c][o4z].measureText(arr[i]).width;if(b6S[g5T](m,w))w=m;}
h=b6S[(Q4M+V01+Z6M)]((arr.length+1),(self[r3w]+3));if(b6S[p9D](w,50))w=50;ta[(w2M+Y7T+b6S.I2M)].width=(w+30)+"px";ta[(d0M+t9I+O1R)].height=h+(K3D);var y=parseInt(STX[m2M](ta.style.top)),x=STX[m2M](ta[W4w][q3M]);w=ta[C1I];h=ta[L9z];if(b6S[N3M](x+w+100,self[r9T][X1c][T8R])){save.style.top=y+(x0M+s2I);cancel.style.top=y+"px";save[W4w][q3M]=(x+w+10)+"px";cancel[W4w][q3M]=(x+w+60)+"px";}
else if(b6S[L5U](y+h+30,self[r9T][X1c][i1w])){save.style.top=(y+h+10)+"px";cancel.style.top=(y+h+10)+"px";save[W4w][q3M]=x+"px";cancel[W4w][(q3M)]=(x+50)+"px";}
else{save.style.top=(b6S[U2T](y,35))+"px";cancel.style.top=(b6S[G4M](y,35))+"px";save[W4w][q3M]=x+"px";cancel[W4w][q3M]=(x+50)+"px";}
}
;}
this[r9T][j3C]();this[(w2M+s2I)][(b6S.I2M+q5c+b6S.K7M+K8M+n1M+Z6M+g2D+g0R+M1C+n1M)]=true;this[r9T][W6z]="annotation";if(b6S[O8C](this[f4M],null)){this[f4M]=document[i4w]("TEXTAREA");this[(b6S.K7M+b6S.a9M)][v7c]="stx_annotation";this[f4M][(c1M+n1M+l9R+g2I+X7M+x0M)]=resizeAnnotation(this);this[f4M][F5T]=handleTAMouseUp(this[r9T]);this[f4M][O5T]("wrap","hard");if(STX[f0M])this[f4M][O5T]("placeholder","Enter Text");this[(r9T)][X1c][w8w][(b6S.a9M+x0M+x0M+j9D+b6S.l2M+I41+E8M+j5w+b6S.l2M)](this[f4M]);this[(b6S.K7M+b6S.a9M)][W4w][o3C]="absolute";this[f4M][W4w].width="100px";this[f4M][W4w].height="20px";}
this[f4M][W4w].font=this[z1c];if(this[c7R]){if(b6S[t4C](this[(c7R)],"transparent")||b6S[n11](this[c7R],"auto")){var styles=getComputedStyle(this[f4M]);if(styles&&STX[s7c](styles["backgroundColor"])){this[f4M][W4w][c7R]=this[r9T][B3I];}
else{this[f4M][W4w][c7R]="#000";}
}
else{this[f4M][(d0M+b6S.K7M+h3C)][c7R]=this[c7R];}
}
var x0=this[r9T][(i1D+s2I+b6S.I2M+E1M+A3j+V0M+c1M+x1M+L8j+K8M+K6c)](this[s7C][0],panel[(o2M+E8M+b6S.a9M+V0M+b6S.K7M)]),y0=this[r9T][q5T](panel,this[(x0M+l91)][0],this[s7C][1]);this[f4M][W4w][(q3M)]=x0+"px";this.ta.style.top=y0+"px";this[r9T][b9M][r0D][W4w][C47]="inline-block";this[r9T][b9M][Y8U][W4w][C47]="inline-block";this[r9T][b9M][r0D][s9I]=saveAnnotation(this);this[(d0M+b6S.K7M+s2I)][(o2M+c1M+n1M+r2M+E1M+d0M)][Y8U][s9I]=cancelAnnotation(this);resizeAnnotation(this)();var ta=this[f4M],timeout=0;if(STX[w6I])timeout=400;STX[s8R](ta,timeout);if(STX[M7C]){this[v4R]=this[(r9T)][X1c][w8w][W4w][f97];var keyboardHeight=400,screenLocation=this[r9T][I6C](y0)+100;if(b6S[(D7D+Z6M)](screenLocation,STX[B3w]()-keyboardHeight)){var pixelsFromBottomOfScreen=b6S[t0w](STX[B3w](),screenLocation),scrolledBottom=b6S[(H5T+Z6M)](keyboardHeight,pixelsFromBottomOfScreen);this[(d0M+b6S.K7M+s2I)][X1c][w8w][(w2M+g2I+E1M+b6S.I2M)][f97]=scrolledBottom+(x0M+s2I);}
}
}
;STX.Drawing.annotation.prototype.click=function(context,tick,value){var P1z="getFontString",panel=this[r9T][(k6D+J1C+i67)][this[T6z]];this[F37]();this[P1z]();this[s7C]=[tick,value];this[j0U]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[p8M]=value;this[g7R]();this[c47](context);return u27;}
;STX.Drawing.annotation.prototype.reposition=function(context,repositioner,tick,value){var t2T="render",r0w="h4g",h51="R4g",o5R="4g",v5I="A4g",panel=this[r9T][K41][this[T6z]],tickDiff=b6S[v5I](repositioner[h7c],tick),valueDiff=b6S[(X8j+o5R)](repositioner[A6I],value);this[s7C]=[b6S[h51](repositioner[s7C][b6S.M1j],tickDiff),b6S[r0w](repositioner[s7C][b6S.p1j],valueDiff)];this[j0U]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[(r2I+l91)]=this[s7C][b6S.p1j];this[t2T](context);}
;STX.Drawing.annotation.prototype.intersected=function(tick,value,box){var v3w="w7g",A2w="P7g",h9U="Y7g",c0D="z7g",S4z="elF",panel=this[r9T][K41][this[T6z]];if(!this[(x0M+l91)])return F4U;var x0=this[(w2M+s2I)][(i1D+s2I+S4z+b6U+x1M+i2c+o2M+S8M)](this[s7C][b6S.M1j],panel[X1c]),y0=this[r9T][q5T](panel,this[(x0M+l91)][b6S.M1j],this[s7C][b6S.p1j]),x1=x0+this[J2I],y1=y0+this[E8M];if(this[Q8z]&&this[(j4T+x1M)][s2I]){x0+=this[Q8z][s2I];x1+=this[Q8z][s2I];y0+=this[(Q8z)][g2I];y1+=this[Q8z][g2I];}
var x=this[r9T][d57](tick,panel[X1c]),y=this[r9T][q5T](panel,tick,value);if(b6S[c0D](x,x0)&&b6S[h9U](x,x1)&&b6S[A2w](y,y0)&&b6S[v3w](y,y1))return {p0:STX[x9c](this[s7C]),tick:tick,value:value}
;return u27;}
;STX.Drawing.annotation.prototype.abort=function(){var L2c="fixScreen",D1c="rBot",e2z="prio",M5U="oid",C3z="tainer";this[(r9T)][b9M][r0D][W4w][C47]="none";this[r9T][b9M][Y8U][W4w][C47]="none";if(this[f4M])this[(d0M+b6S.K7M+s2I)][(o2M+E8M+i1M)][(U8c+n1M+C3z)][n3j](this[f4M]);this[f4M]=null;this[r9T][W6z]="";this[r9T][W5T]();document[l4U][(w2M+h3C)][T0U]="crosshair";this[(w2M+s2I)][(Q5D+H7T+E0T+Z6M+t81+n1M+c1M+f4M+b6S.K7M+A7T+n1M)]=false;STX[n2M](this[r9T][X1c][B3c],this);if(STX[(S7T+t81+b6S.l2M+V0M+M5U)]){this[r9T][X1c][w8w][W4w][f97]=this[(e2z+D1c+U8M+x1M)];}
STX[L2c]();}
;STX.Drawing.annotation.prototype.reconstruct=function(stx,obj){var C9R="mil";this[r9T]=stx;this[c7R]=obj["col"];this[T6z]=obj["pnl"];this[j0U]=obj["d0"];this[p8M]=obj["v0"];this[e6w]=unescape(obj["text"]);this[Q8z]=obj[Q8z];this[A47]=obj[D8U];this[t57]=obj[(R1U)];this.font=STX[F5I](obj["fnt"],{"st":"style","sz":(d0M+T7w),"wt":"weight","fl":(q6M+b6S.a9M+C9R+g2I)}
);if(!this.font)this.font={}
;this[g7R]();}
;STX.Drawing.annotation.prototype.serialize=function(){var Z5z="pty",B4U="sE",s8I="removeNullValues",X21="nelN",obj={name:this[T5U],pnl:this[(x0M+b6S.a9M+X21+b6S.a9M+x1M+b6S.I2M)],col:this[c7R],d0:this[j0U],v0:this[p8M],text:escape(this[e6w])}
;if(this.font){var fnt=STX[s8I](STX[F5I](this.font,{"style":"st","size":"sz","weight":"wt","family":(q6M+E1M)}
));if(!STX[(K8M+B4U+x1M+Z5z)](fnt))obj[J97]=fnt;}
if(this[Q8z]){obj["stem"]={"d":this[Q8z][b6S.l2M],"v":this[Q8z][r2I],"x":this[Q8z][s2I],"y":this[Q8z][g2I]}
;}
if(this[A47])obj["bc"]=this[A47];if(this[t57])obj["bg"]=this[t57];return obj;}
;STX.Drawing.annotation.prototype.adjust=function(){var R4z="i7g",F6R="J7g",f7z="t7g",i51="c7g",l3z="tStri",m5c="etF";this[(Z6M+m5c+S7D+l3z+n1M+Z6M)]();var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[(x0M+l91)]=[this[(d0M+b6S.K7M+s2I)][t51](this[j0U],panel[X1c]),this[p8M]];this[(b6S.a9M+v8U)]=this[e6w][T91]('\n');var w=0;this[(d0M+V9I)][X1c][o4z].font=this[z1c];for(var i=0;b6S[i51](i,this[e1M].length);i++){var m=this[r9T][X1c][o4z].measureText(this[e1M][i]).width;if(b6S[f7z](m,w))w=m;}
this[r3w]=STX[m2M](this[X2c][(d0M+K8M+f2T)]);h=b6S[(X0C+Z6M)](this[e1M].length,this[r3w]);if(STX[B0z])h+=5;this[J2I]=w+(b6S[F6R](this[Q5M],2));this[E8M]=h+(b6S[R4z](this[(k6D+R9c+K8M+X5C)],2));var x1=this[r9T][d57](this[s7C][0],panel[X1c])+w,y1=this[r9T][D7C](this[s7C][1],panel)+h;this[W7C]=[this[r9T][A7M](x1,panel[X1c]),this[r9T][G0D](y1,panel)];if(this[Q8z]){if(this[Q8z][b6S.l2M])this[(w2M+u9D)][b6S.K7M]=this[r9T][t51](this[Q8z][b6S.l2M],panel[X1c]);}
}
;STX[(F3j+V0M+e91+Z6M)][(E1M+K8M+J1C)]=function(){this[T5U]=l3I;this[G7c]=u27;}
;STX[f57][l3I][x1j](STX[f57][p5I]);STX.Drawing.line.prototype.calculateOuterSet=function(panel){var y37="Q7g",M9I="Int",O9R="x7g",d3c="U7g";if(b6S[d3c](this[s7C][b6S.M1j],this[W7C][b6S.M1j])||b6S[O9R](this[s7C][b6S.p1j],this[W7C][b6S.p1j])||this[r9T][(S7T+W1c+K8M+E1M+g2I+M9I+C31+v7M)](this[r9T][k5I][k9w])){return ;}
var vector={x0:this[s7C][b6S.M1j],y0:this[s7C][b6S.p1j],x1:this[W7C][b6S.M1j],y1:this[W7C][b6S.p1j]}
;if(b6S[(A3j+m71+Z6M)](vector[e21],vector[r21])){vector={x0:this[W7C][b6S.M1j],y0:this[W7C][b6S.p1j],x1:this[s7C][b6S.M1j],y1:this[s7C][b6S.p1j]}
;}
var earlier=b6S[y37](vector[e21],i8U),later=vector[r21]+i8U;this[(r2I+U2D)]=STX[C2D](vector,earlier);this[v5D]=STX[C2D](vector,later);this[O2T]=this[r9T][g71](earlier,panel[X1c]);this[B4w]=this[(w2M+s2I)][g71](later,panel[(X1c)]);}
;STX.Drawing.line.prototype.click=function(context,tick,value){var B6I="calculateOuterSet",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();if(!this[m5w]){this[s7C]=[tick,value];this[m5w]=w2T;return u27;}
this[W7C]=[tick,value];this[(b6S.l2M+l91)]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[r7U]=this[r9T][g71](this[W7C][b6S.M1j],panel[X1c]);this[p8M]=this[s7C][b6S.p1j];this[(r2I+I91)]=this[W7C][b6S.p1j];this[B6I](panel);this[m5w]=u27;return w2T;}
;STX.Drawing.line.prototype.reconstruct=function(stx,obj){this[r9T]=stx;this[c7R]=obj[o47];this[T6z]=obj[Z51];this[A4c]=obj[o3c];this.lineWidth=obj["lw"];this[(p8M)]=obj[p8M];this[y8M]=obj[y8M];this[j0U]=obj[j0U];this[r7U]=obj[r7U];if(obj[O2T]){this[O2T]=obj[O2T];this[B4w]=obj[B4w];this[N9R]=obj[(p8M+Q41)];this[v5D]=obj[v5D];}
this[g7R]();}
;STX.Drawing.line.prototype.serialize=function(){var P8D="tern",obj={name:this[T5U],pnl:this[T6z],col:this[c7R],ptrn:this[(x0M+V6j+P8D)],lw:this.lineWidth,d0:this[j0U],d1:this[r7U],v0:this[p8M],v1:this[y8M]}
;if(this[O2T]){obj[O2T]=this[(O2T)];obj[B4w]=this[(b6S.l2M+I91+Q41)];obj[N9R]=this[N9R];obj[v5D]=this[v5D];}
return obj;}
;STX.Drawing.line.prototype.adjust=function(){var R3D="1B",I87="isDail",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[s7C]=[this[r9T][t51](this[j0U],panel[X1c]),this[p8M]];this[W7C]=[this[r9T][t51](this[r7U],panel[X1c]),this[y8M]];if(this[r9T][(I87+g2I+i6j+n1M+b6S.K7M+i2D+l61)](this[r9T][k5I][k9w])&&this[O2T]){this[s7C]=[this[r9T][t51](this[O2T],panel[(b6S.j3c+K8j+b6S.K7M)]),this[N9R]];this[W7C]=[this[r9T][t51](this[(b6S.l2M+R3D)],panel[X1c]),this[(v5D)]];}
}
;STX[f57][f2R]=function(){this[T5U]=f2R;}
;STX[f57][f2R][x1j](STX[f57][(E1M+z7I)]);STX.Drawing.ray.prototype.calculateOuterSet=function(panel){var H17="a7g",q7M="f7g",N8I="p7g",T97="G7g";if(b6S[T97](this[s7C][b6S.M1j],this[W7C][b6S.M1j])||b6S[N8I](this[s7C][b6S.p1j],this[W7C][b6S.p1j])||this[r9T][m8R](this[r9T][k5I][(K8M+n1M+h7M+K3w)])){return ;}
var vector={x0:this[(s7C)][b6S.M1j],y0:this[s7C][b6S.p1j],x1:this[W7C][b6S.M1j],y1:this[(W7C)][b6S.p1j]}
,endOfRay=vector[r21]+i8U;if(b6S[q7M](vector[e21],vector[r21])){endOfRay=b6S[H17](vector[r21],i8U);}
this[(r2I+l91+Q41)]=this[p8M];this[v5D]=STX[C2D](vector,endOfRay);this[O2T]=this[j0U];this[B4w]=this[(w2M+s2I)][g71](endOfRay,panel[X1c]);}
;STX.Drawing.ray.prototype.adjust=function(){var q8U="lNam",panel=this[r9T][K41][this[(x0M+b6S.a9M+J1C+q8U+b6S.I2M)]];if(!panel)return ;this[(s7C)]=[this[r9T][t51](this[j0U],panel[X1c]),this[p8M]];this[W7C]=[this[r9T][t51](this[r7U],panel[X1c]),this[y8M]];if(this[r9T][m8R](this[r9T][k5I][k9w])&&this[O2T]){this[s7C]=[this[r9T][t51](this[j0U],panel[X1c]),this[p8M]];this[W7C]=[this[r9T][t51](this[B4w],panel[X1c]),this[(r2I+I91+Q41)]];}
}
;STX[f57][a27]=function(){this[T5U]=a27;this[G7c]=u27;}
;STX[f57][a27][x1j](STX[f57][p5I]);STX.Drawing.horizontal.prototype.measure=function(){}
;STX.Drawing.horizontal.prototype.click=function(context,tick,value){var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();this[p8M]=value;this[j0U]=this[r9T][g71](tick,panel[X1c]);return w2T;}
;STX.Drawing.horizontal.prototype.reconstruct=function(stx,obj){this[r9T]=stx;this[(U8c+T3R+V0M)]=obj[(o2M+c1M+E1M)];this[T6z]=obj[Z51];this[A4c]=obj[o3c];this.lineWidth=obj["lw"];this[p8M]=obj[p8M];this[j0U]=obj[j0U];this[K6D]=obj[v7M];this[g7R]();}
;STX.Drawing.horizontal.prototype.serialize=function(){var obj={name:this[T5U],pnl:this[T6z],col:this[c7R],ptrn:this[A4c],lw:this.lineWidth,v0:this[p8M],d0:this[j0U],al:this[K6D]}
;return obj;}
;STX.Drawing.horizontal.prototype.adjust=function(){var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[s7C]=[this[(w2M+s2I)][t51](this[j0U],panel[(b6S.j3c+K8j+b6S.K7M)]),this[p8M]];this[W7C]=[this[r9T][t51](this[j0U],panel[X1c])+O9w,this[(r2I+l91)]];}
;STX.Drawing.horizontal.prototype.copyConfig=function(){this[c7R]=this[r9T][d3I][F0w];this.lineWidth=this[r9T][d3I].lineWidth;this[A4c]=this[r9T][d3I][A4c];this[K6D]=this[r9T][d3I][K6D];}
;STX[(K91+Z6M)][P5D]=function(){this[T5U]=P5D;}
;STX[f57][P5D][x1j](STX[f57][a27]);STX.Drawing.vertical.prototype.measure=function(){}
;STX.Drawing.vertical.prototype.adjust=function(){var S1R="omDate",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[s7C]=[this[r9T][t51](this[j0U],panel[X1c]),this[p8M]];this[W7C]=[this[r9T][(b6S.K7M+c7w+D9T+V0M+S1R)](this[j0U],panel[X1c]),this[p8M]+b6S.p1j];}
;STX[f57][F1c]=function(){this[T5U]=F1c;this[G7c]=u27;}
;STX[f57][F1c][x1j](STX[f57][p5I]);STX.Drawing.continuous.prototype.click=function(context,tick,value){var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();if(!this[m5w]){this[s7C]=[tick,value];this[m5w]=w2T;return u27;}
if(this[i17](tick,value)){this[r9T][w3I]();return w2T;}
this[W7C]=[tick,value];this[j0U]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[(b6S.l2M+I91)]=this[r9T][g71](this[W7C][b6S.M1j],panel[X1c]);this[p8M]=this[s7C][b6S.p1j];this[(r2I+I91)]=this[W7C][b6S.p1j];var Segment=STX[f57][p5I],segment=new Segment,obj=this[R3U](this[r9T]);segment[X6c](this[r9T],obj);this[r9T][e2M](segment);this[r9T][H2M](S7w);this[r9T][Y5M]();this[s7C]=[this[W7C][b6S.M1j],this[W7C][b6S.p1j]];return u27;}
;STX[f57][n1R]=function(){this[T5U]=n1R;this[K3R]=V4z;this[G7c]=w2T;}
;STX[f57][n1R][x1j](STX[f57][p5I]);STX.Drawing.freeform.prototype.measure=function(){}
;STX.Drawing.freeform.prototype.intersected=function(tick,value,box){var d3z="Z0g",x6C="H0g",m5T="n0g",l87="S0g";if(b6S[l87](tick,this[E5w])||b6S[m5T](tick,this[o9U]))return u27;if(b6S[x6C](value,this[K2w])||b6S[d3z](value,this[b9U]))return u27;return w2T;}
;STX.Drawing.freeform.prototype.click=function(context,tick,value){var e6j="au",L2I="sion",q0T="tempS",N37="tempSplineTension",r7C="E0g",E5R="cross",T0I="k0g",j6C="resolveX",t1z="l0g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;if(b6S[t1z](this[m5w],u27)){this[F37]();this[R5c]=Math[y1c](this[r9T][j6C](this[r9T][d57](tick,panel[X1c])));this[r5c]=Math[y1c](this[r9T][I6C](this[r9T][q5T](panel,tick,value)));this[j0U]=this[(w2M+s2I)][g71](tick,panel[X1c]);this[p8M]=value;this[s7C]=[b6S[T0I](STXChart[(E5R+E8M+L6D)],this[R5c]),b6S[r7C](STXChart[L61],this[r5c])];this[s5U]=[this[s7C][b6S.M1j],this[s7C][b6S.p1j]];this[Z6c]=[this[s7C]];this[h4U]=this[r9T][k5I][h4U];this[X5R]=panel[c3I][X5R];this[k9w]=this[r9T][k5I][k9w];this[W27]=this[r9T][(L57+x7T+b6S.K7M)][W27];this[N37]=this[K3R];this[K3R]=-b6S.p1j;document[l4U][W4w][T0U]=(x0M+c1M+K8M+A87);this[m5w]=w2T;return u27;}
else{this[m5w]=u27;this[K3R]=this[(q0T+x0M+n5D+b6S.I2M+L8j+j9D+L2I)];document[l4U][W4w][T0U]=(e6j+U8M);return w2T;}
}
;STX.Drawing.freeform.prototype.move=function(context,tick,value){var x6M="D0g",Q9M="des",G21="pNo",p3D="u0g",q2U="odes",R2C="L0g",n81="O0g",o9M="T0g",j2w="o0g",Z5w="d0g";if(!this[m5w])return ;var panel=this[r9T][K41][this[T6z]];this[(b6S.l2M+I91)]=this[r9T][g71](tick,panel[X1c]);this[(r2I+I91)]=value;this[W7C]=[b6S[Z5w](STXChart[i61],this[R5c]),b6S[j2w](STXChart[L61],this[r5c])];if(b6S[o9M](this[Z6c].length,2)){if(b6S[n81](this[W7C][0],this[Z6c][this[Z6c].length-2][0])&&b6S[R2C](this[W7C][0],this[Z6c][this[Z6c].length-1][0])){this[Z6c].length--;this[(n1M+q2U)].length-=2;}
else if(b6S[p3D](this[W7C][1],this[Z6c][this[(G21+Q9M)].length-2][1])&&b6S[x6M](this[W7C][1],this[Z6c][this[Z6c].length-1][1])){this[Z6c].length--;this[s5U].length-=2;}
}
this[s5U][I57](this[W7C][0],this[W7C][1]);this[(x0M+P91+Q9M)][(p8z+E8M)](this[W7C]);this[(V0M+x6R+i2D)](context);return false;}
;STX.Drawing.freeform.prototype.intervalRatio=function(oldInterval,newInterval,oldPeriodicity,newPeriodicity,startDate,symbol){var Q8C="F1g",n7c="x1g",c8j="U1g",O1w="o1g",K1z="d1g",i0R="s1g",S31="j1g",L9U="1g",O2R="g1g",i6w="V1g",V8M="N0g",B5D="C0g",B5C="e0g",J4z="X0g";function weeksInMonth(startDate,symbol){return b6S.h1j;}
;function daysInWeek(startDate,symbol){return b6S.h1j;}
;function daysInMonth(startDate,symbol){return a6M;}
;function minPerDay(startDate,symbol){var S6I=390;return S6I;}
;var returnValue=b6S.M1j;if(b6S[J4z](oldInterval,newInterval))returnValue=b6S.p1j;else if(!isNaN(oldInterval)&&!isNaN(newInterval))returnValue=b6S[B5C](oldInterval,newInterval);else if(isNaN(oldInterval)){if(b6S[B5D](oldInterval,w5w)&&b6S[V8M](newInterval,s4z))returnValue=weeksInMonth(startDate,symbol);else if(b6S[(M4D+Z6M)](oldInterval,s4z)&&b6S[i6w](newInterval,(k4c+g2I)))returnValue=daysInWeek(startDate,symbol);else if(b6S[O2R](oldInterval,(x1M+S7D+P1M))&&b6S[(F9M+L9U)](newInterval,p61))returnValue=daysInMonth(startDate,symbol);else if(!isNaN(newInterval)){if(b6S[S31](oldInterval,w5w))returnValue=b6S[i0R](daysInMonth(startDate,symbol),minPerDay(startDate,symbol),oldInterval);else if(b6S[K1z](oldInterval,s4z))returnValue=b6S[O1w](daysInWeek(startDate,symbol),minPerDay(startDate,symbol),oldInterval);else if(b6S[c8j](oldInterval,p61))returnValue=b6S[n7c](minPerDay(startDate,symbol),oldInterval);}
}
returnValue*=b6S[Q8C](oldPeriodicity,newPeriodicity);return returnValue;}
;STX.Drawing.freeform.prototype.render=function(context){var w6j="connectTheDots",z57="ens",W0z="P8g",d2I="Y8g",u0I="z8g",e3C="a1g",Y9U="f1g",X27="p1g",F1I="G1g",X8D="Q1g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;var intvl=this[A5w](this[k9w],this[r9T][k5I][k9w],this[W27],this[r9T][k5I][(x0M+b6S.I2M+V0M+A7T+b6S.l2M+K8M+b8U)],this[j0U],panel[(o2M+v9T)][F3I]);if(b6S[X8D](intvl,0))return ;var cwr=b6S[F1I](this[r9T][k5I][h4U],this[h4U]),mlt=b6S[X27](panel[c3I][X5R],this[X5R]),spx=this[r9T][o6C](this[(j0U)],panel[(M1M+b6S.K7M)]),spy=this[r9T][q5T](panel,this[(r9T)][t51](this[j0U],panel[X1c]),this[p8M]),arrPoints=[],color=this[c7R],width=this.lineWidth;if(this[K4z]){color=this[r9T][Q1M]("stx_highlight_vector");}
var parameters={pattern:this[A4c],lineWidth:width}
;for(var n=0;b6S[Y9U](n,this[Z6c].length);n++){var x0=b6S[(e3C)](intvl,cwr,(this[Z6c][n][0]))+spx,y0=b6S[u0I](mlt,(this[Z6c][n][1]))+spy;arrPoints[I57](x0,y0);}
if(b6S[d2I](arrPoints.length,0))return ;if(b6S[W0z](this[(c2M+E1M+E0T+b6S.I2M+L8j+z57+W5M)],0)){this[r9T][w6j](arrPoints,color,this[T5U],context,panel,parameters);}
else{this[r9T][b1U](arrPoints,this[K3R],color,this[(n1M+n67)],context,true,parameters);}
}
;STX.Drawing.freeform.prototype.adjust=function(){var X0w="iY",V6M="L8g",Y9T="O8g",X2D="m8g",P6U="W8g",b4w="t8g",f0I="c8g",B0w="iX",V5w="w8g",k41="wX",panel=this[r9T][K41][this[T6z]];if(!panel)return ;var p0=[this[s5U][0],this[(n1M+c1M+Y2c+d0M)][1]];this[Z6c]=[p0];this[(E1M+c1M+k41)]=this[s5U][0];this[E5w]=this[s5U][0];this[b9U]=this[s5U][1];this[K2w]=this[(n1M+n61+l5D)][1];for(var n=2;b6S[V5w](n,this[s5U].length);n+=2){var p1=[this[s5U][n],this[s5U][n+1]];this[Z6c][(x0M+X7M+d0M+E8M)](p1);this[(E1M+r2D+b7M)]=Math[B9R](this[o9U],p1[0]);this[E5w]=Math[z4M](this[(E8M+B0w)],p1[0]);this[b9U]=Math[z4M](this[b9U],p1[1]);this[K2w]=Math[B9R](this[K2w],p1[1]);}
var intvl=this[A5w](this[k9w],this[r9T][k5I][k9w],this[W27],this[r9T][k5I][W27],this[j0U],panel[X1c][F3I]);if(b6S[f0I](intvl,0))return ;var cwr=b6S[b4w](this[r9T][k5I][h4U],this[h4U]),mlt=b6S[P6U](panel[c3I][X5R],this[X5R]),spx=this[r9T][o6C](this[j0U],panel[X1c]),spy=this[r9T][q5T](panel,this[r9T][t51](this[j0U],panel[X1c]),this[p8M]);this[o9U]=this[(r9T)][A7M](Math[b3R](b6S[(D6j+x2w)](intvl,cwr,(this[o9U])))+spx,panel[X1c]);this[E5w]=this[r9T][A7M](Math[t97](b6S[X2D](intvl,cwr,(this[E5w])))+spx,panel[X1c]);this[b9U]=this[(d0M+b6S.K7M+s2I)][G0D](Math[b3R](b6S[Y9T](mlt,(this[b9U])))+spy,panel);this[K2w]=this[r9T][G0D](Math[t97](b6S[V6M](mlt,(this[(E8M+X0w)])))+spy,panel);}
;STX.Drawing.freeform.prototype.serialize=function(){return {name:this[T5U],pnl:this[T6z],col:this[c7R],ptrn:this[A4c],lw:this.lineWidth,cw:Number(this[h4U][z1D](4)),mlt:Number(this[X5R][z1D](4)),d0:this[j0U],v0:this[p8M],int:this[k9w],pd:this[W27],nodes:this[s5U]}
;}
;STX.Drawing.freeform.prototype.reconstruct=function(stx,obj){var l0D="pd",V2C="mlt",g0c="cw";this[r9T]=stx;this[c7R]=obj[o47];this[T6z]=obj[Z51];this[A4c]=obj[o3c];this.lineWidth=obj["lw"];this[h4U]=obj[g0c];this[X5R]=obj[V2C];this[j0U]=obj[j0U];this[p8M]=obj[p8M];this[k9w]=obj[T71];this[W27]=obj[l0D];this[s5U]=obj[s5U];this[g7R]();}
;STX[f57][Z5I]=function(){this[(n1M+e1j+b6S.I2M)]=Z5I;this[e1M]=[];this[Q2M]=b6S.M1j;this[Z5U]=w2T;}
;STX[f57][Z5I][x1j](STX[f57][p5I]);STX.Drawing.projection.prototype.render=function(context){var Z47="Line",f1D="plo",Z5C="X8g",Q67="D8g",B3z="u8g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;if(b6S[B3z](this[e1M].length,2))return ;var color=this[c7R],hcolor=this[r9T][Q1M]("stx_highlight_vector"),parameters={pattern:this[(k6D+b6S.K7M+b6S.K7M+b6S.I2M+T6U)],lineWidth:this.lineWidth}
,x0=this[r9T][o6C](this[e1M][0][0],panel[X1c]),y0=this[r9T][I0c](this[e1M][0][1],panel);for(var i=1;b6S[Q67](i,this[e1M].length);i++){var x1=this[r9T][o6C](this[e1M][i][0],panel[X1c]),y1=this[r9T][I0c](this[e1M][i][1],panel),c=color;if(this[K4z]&&b6S[Z5C](i,this[Q2M]))c=hcolor;this[r9T][(f1D+b6S.K7M+Z47)](x0,x1,y0,y1,c,(d0M+B4D+x1M+j9D+b6S.K7M),context,true,parameters);x0=x1;y0=y1;}
}
;STX.Drawing.projection.prototype.click=function(context,tick,value){var Y4c="ckF",g9w="C8g",r8j="e8g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();if(b6S[r8j](this[e1M].length,0)){var q=this[(r9T)][X1c][g91][b6S[g9w](this[r9T][X1c][g91].length,1)];this[e1M][I57]([q[W31],q[G3c]]);this[T8C]=this[r9T][X1c][s67];this[S3U]=this[r9T][X1c][g91].length;}
else{if(b6S[(n6j+x2w)](tick,this[r9T][(z1M+Y4c+V0M+c1M+a1R+V6j+b6S.I2M)](this[e1M][this[e1M].length-2][0],panel[X1c])))return false;}
this[e1M][I57]([this[r9T][g71](tick,panel[(o2M+v9T)]),value]);return false;}
;STX.Drawing.projection.prototype.move=function(context,tick,value){var Y8I="nder",G2D="V6g",f8R="q6g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();this[e1M][b6S[f8R](this[e1M].length,1)]=[this[r9T][g71](tick,panel[X1c]),value];var stx=this[r9T];stx[A01]();this[r9T][X1c][s67]=this[T8C]+(b6S[G2D](this[(d0M+V9I)][X1c][g91].length,this[S3U]));this[r9T][Y5M]();this[(N4U+Y8I)](context);}
;STX.Drawing.projection.prototype.intersected=function(tick,value,box){var f41="ersect",X17="boxIntersects",x8R="j6g",P9z="b6g",w3c="g6g",panel=this[r9T][(L5T+m4w)][this[T6z]];if(!panel)return ;for(var i=1;b6S[w3c](i,this[e1M].length);i++){var x0=this[r9T][t51](this[(b6S.a9M+v8U)][b6S[P9z](i,1)][0],panel[X1c]),x1=this[r9T][t51](this[e1M][i][0],panel[(V61+V0M+b6S.K7M)]),y0=this[e1M][b6S[x8R](i,1)][1],y1=this[e1M][i][1],inter=STX[X17](box[e21],box[v9w],box[r21],box[L9w],x0,y0,x1,y1,"segment");if(inter){this[(K8M+F4C+f41)]=i;return true;}
}
return false;}
;STX.Drawing.projection.prototype.measure=function(){var O3I="B6g",W9c="y6g",p8c="m6g",J5c="I6g",Z6I="v6g",J8z="s6g",panel=this[r9T][K41][this[T6z]];if(!panel)return ;if(this[Q2M]){var x0=this[r9T][t51](this[e1M][b6S[J8z](this[Q2M],1)][0],panel[X1c]),x1=this[r9T][t51](this[e1M][this[Q2M]][0],panel[X1c]),y0=this[e1M][b6S[Z6I](this[(p27+V0M+d0M+b6S.I2M+L1c)],1)][1],y1=this[e1M][this[Q2M]][1];this[r9T][n7z](y0,y1,x0,x1);}
else{var x0=this[r9T][t51](this[e1M][b6S[J5c](this[e1M].length,2)][0],panel[X1c]),x1=this[r9T][t51](this[(b6S.a9M+v8U)][b6S[p8c](this[e1M].length,1)][0],panel[X1c]),y0=this[e1M][b6S[W9c](this[e1M].length,2)][1],y1=this[e1M][b6S[O3I](this[e1M].length,1)][1];this[r9T][n7z](y0,y1,x0,x1);}
}
;STX.Drawing.projection.prototype.adjust=function(){}
;STX.Drawing.projection.prototype.abort=function(force){var O4I="K6g",a6C="r6g";function killme(stx,result){stx[A01]();stx[Y5M]();return result;}
if(force){this[e1M]=[];return killme(this[r9T],false);}
if(this[K4z]){if(b6S[a6C](this[Q2M],1)){this[e1M]=[];return killme(this[r9T],false);}
this[e1M]=this[e1M][h6z](0,this[Q2M]);return killme(this[r9T],true);}
else{this[e1M][w5I]();if(b6S[O4I](this[e1M].length,1)){this[r9T][X1c][s67]=this[T8C];return killme(this[r9T],false);}
this[r9T][e2M](this);this[r9T][H2M]("vector");return killme(this[r9T],false);}
}
;STX.Drawing.projection.prototype.reconstruct=function(stx,obj){var C2c="pn",M71="Na";this[r9T]=stx;this[c7R]=obj[(o47)];this[(x0M+t4c+M71+c77)]=obj[(C2c+E1M)];this[A4c]=obj[o3c];this.lineWidth=obj["lw"];this[e1M]=obj[(K8j+V0M)];}
;STX.Drawing.projection.prototype.serialize=function(){var p2T="elNa";return {name:this[T5U],pnl:this[(x0M+m1j+p2T+c77)],col:this[c7R],ptrn:this[A4c],lw:this.lineWidth,arr:this[e1M]}
;}
;STX[f57][B9z]=function(){this[(Y3z+b6S.I2M)]=B9z;this[G7c]=u27;}
;STX[f57][B9z][(d0M+V9I+g2T+u7z+Y6I+d0M+A3j+b6U+x1M)](STX[f57][p5I]);STX.Drawing.measure.prototype.click=function(context,tick,value){this[F37]();if(!this[m5w]){this[(s7C)]=[tick,value];this[m5w]=w2T;return u27;}
this[r9T][w3I]();this[m5w]=u27;return w2T;}
;STX[f57][s6z]=function(){this[T5U]=s6z;}
;STX[f57][s6z][(w2M+s2I+i6j+W6U+F1j+U5R+c1M+x1M)](STX[(F3j+v2R+K8M+n1M+Z6M)][H11]);STX.Drawing.ellipse.prototype.render=function(context){var P7I="U3g",c5R="i3g",b9w="J3g",D5C="W3g",Z97="t3g",v0U="c3g",C2C="w3g",R6M="isTrans",t27="P3g",k9U="z3g",a9I="R6g",t0T="M6g",H0T="A6g",E57="Nam",panel=this[r9T][K41][this[(L5T+l7D+E57+b6S.I2M)]];if(!panel)return ;var x0=this[r9T][d57](this[s7C][0],panel[X1c]),x1=this[r9T][d57](this[W7C][0],panel[X1c]),y0=this[r9T][q5T](panel,this[s7C][0],this[(x0M+l91)][1]),y1=this[r9T][q5T](panel,this[W7C][0],this[W7C][1]),left=b6S[H0T](x0,(x1-x0)),right=x1,middle=y0,bottom=y1,top=b6S[t0T](y0,(y1-y0)),weight=b6S[a9I]((bottom-top),6),lineWidth=this.lineWidth;if(!lineWidth)lineWidth=1.1;var edgeColor=this[c7R];if(b6S[(j5z+Z6M)](edgeColor,"auto")||STX[(K8M+t8U+Z1I+x0M+B6c+n1M+b6S.K7M)](edgeColor))edgeColor=this[r9T][B3I];if(this[K4z]){edgeColor=this[(d0M+b6S.K7M+s2I)][Q1M]("stx_highlight_vector");if(b6S[k9U](lineWidth,.1))lineWidth=1.1;}
var fillColor=this[A77];context.beginPath();context.moveTo(left,middle);context.bezierCurveTo(left,bottom+weight,right,bottom+weight,right,middle);context.bezierCurveTo(right,b6S[(t4M+N3I+Z6M)](top,weight),left,b6S[t27](top,weight),left,middle);if(fillColor&&!STX[(R6M+k6D+V0M+b6S.I2M+n1M+b6S.K7M)](fillColor)&&b6S[C2C](fillColor,"auto")){context.fillStyle=fillColor;context.globalAlpha=.2;context.fill();context.globalAlpha=1;}
if(edgeColor&&b6S[v0U](this[A4c],"none")){context.strokeStyle=edgeColor;context.lineWidth=lineWidth;if(context[j8w]){var lineDashArray=[];if(b6S[(Z97)](this[A4c],"dotted"))lineDashArray=[lineWidth,lineWidth];else if(b6S[D5C](this[A4c],"dashed"))lineDashArray=[b6S[b9w](lineWidth,5),b6S[c5R](lineWidth,5)];context[j8w](lineDashArray);context[r01]=0;}
context.stroke();}
context.closePath();if(this[K4z]){var p1Fill=b6S[P7I](this[f9T],(W7C))?true:false;this[H4c](context,x1,y1,p1Fill);}
}
;STX.Drawing.ellipse.prototype.intersected=function(tick,value,box){var r4D="f3g",Q7T="p3g",v81="G3g",U7U="Q3g",u57="F3g",o8U="x3g";this[f9T]=F4U;if(!this[s7C]||!this[W7C])return F4U;if(this[F4D](this[W7C][b6S.M1j],this[W7C][b6S.p1j],box)){this[K4z]=W7C;this[f9T]=W7C;return {action:V8w,point:W7C}
;}
var left=b6S[o8U](this[s7C][b6S.M1j],(this[W7C][b6S.M1j]-this[s7C][b6S.M1j])),right=this[W7C][b6S.M1j],bottom=this[W7C][b6S.p1j],top=b6S[u57](this[s7C][b6S.p1j],(this[W7C][b6S.p1j]-this[s7C][b6S.p1j]));if(b6S[U7U](tick,Math[z4M](left,right))||b6S[v81](tick,Math[B9R](left,right)))return u27;if(b6S[(Q7T)](value,Math[z4M](top,bottom))||b6S[r4D](value,Math[(T47+n1M)](top,bottom)))return u27;this[K4z]=w2T;return {action:(Q17+r2I+b6S.I2M),p0:STX[x9c](this[s7C]),p1:STX[x9c](this[W7C]),tick:tick,value:value}
;}
;STX.Drawing.ellipse.prototype.copyConfig=function(){var B07="olor",K3U="lC";this[c7R]=this[r9T][d3I][F0w];this[(q6M+j5w+K3U+B07)]=this[r9T][d3I][(O4z+i6R+I41+c1M+T3R+V0M)];this.lineWidth=this[r9T][d3I].lineWidth;this[A4c]=this[r9T][(A7c+V0M+N4U+n1M+s5M+b6S.I2M+D6w+J6j+K8j+e1j+b6S.I2M+b6S.K7M+Q31)][A4c];}
;STX.Drawing.ellipse.prototype.reconstruct=function(stx,obj){var V0c="patt";this[r9T]=stx;this[c7R]=obj[o47];this[A77]=obj[M81];this[T6z]=obj[Z51];this[(V0c+i2D+n1M)]=obj[o3c];this.lineWidth=obj[(d87)];this[j0U]=obj[j0U];this[(r7U)]=obj[r7U];this[p8M]=obj[p8M];this[y8M]=obj[y8M];this[g7R]();}
;STX.Drawing.ellipse.prototype.serialize=function(){return {name:this[T5U],pnl:this[T6z],col:this[c7R],fc:this[A77],ptrn:this[A4c],lw:this.lineWidth,d0:this[j0U],d1:this[(b6S.l2M+I91)],v0:this[(r2I+l91)],v1:this[y8M]}
;}
;STX[(L17+J3j+i0I)][s27]=function(){this[T5U]=s27;}
;STX[f57][s27][x1j](STX[(F3j+V0M+J3j+K8M+X5C)][H11]);STX[f57][s27][H8D]={"trend":b6S.K7M,"color":o2M,"parameters":x0M,"pattern":B6D,"opacity":c1M,"lineWidth":d87,"level":E1M,"extendLeft":b6S.I2M,"printLevels":T2c}
;STX.Drawing.fibonacci.prototype.copyConfig=function(){this[c7R]=this[(d0M+b6S.K7M+s2I)][d3I][F0w];this.lineWidth=this[r9T][d3I].lineWidth;this[Z91]=this[r9T][d3I][s27];}
;STX.Drawing.fibonacci.prototype.setOuter=function(){var O5U="d9L",d7I="E9L",T87="k9L",C3M="l9L",O8c="Z9L",F9w="9L",m3U="n9L",K6I="S9L",Y0w="a3g";this[(c1M+X7M+h7M+V0M)]={p0:STX[x9c](this[s7C]),p1:STX[x9c](this[W7C])}
;var y0=this[s7C][1],y1=this[W7C][1],x0=this[s7C][0],x1=this[W7C][0],top=Math[B9R](y1,y0),bottom=Math[z4M](y1,y0),height=b6S[Y0w](bottom,top),isUpTrend=b6S[K6I]((y1-y0)/(x1-x0),0),min=0,max=1;for(var i=0;b6S[m3U](i,this[Z91][F41].length);i++){var fib=this[Z91][F41][i];if(b6S[(v9M+F9w)](fib[I7w],min)&&b6S[O8c](fib[I7w],max))continue;var val=isUpTrend?b6S[C3M](bottom,height*fib[I7w]):top+b6S[T87](height,fib[I7w]),x=STX[R3j]({x0:x0,x1:x1,y0:y0,y1:y1}
,val);if(b6S[d7I](fib[I7w],min)){min=fib[I7w];isUpTrend?(this[(c1M+X7M+b6S.K7M+b6S.I2M+V0M)][s7C][1]=val):(this[h9T][W7C][1]=val);isUpTrend?(this[h9T][(x0M+l91)][0]=x):(this[h9T][W7C][0]=x);}
else if(b6S[O5U](fib[I7w],max)){max=fib[I7w];isUpTrend?(this[h9T][W7C][1]=val):(this[h9T][(x0M+l91)][1]=val);isUpTrend?(this[h9T][W7C][0]=x):(this[h9T][s7C][0]=x);}
}
}
;STX.Drawing.fibonacci.prototype.click=function(context,tick,value){var e6U="amete",e2U="rom",Y5R="lN",panel=this[r9T][K41][this[(x0M+u1D+Y5R+b6S.a9M+x1M+b6S.I2M)]];if(!panel)return ;this[F37]();if(!this[m5w]){this[s7C]=[tick,value];this[(p8M)]=value;this[m5w]=w2T;return u27;}
if(this[i17](tick,value))return this[G7c];this[W7C]=[tick,value];this[y8M]=value;this[j0U]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[r7U]=this[r9T][(k4c+h7M+A3j+e2U+T6R+S8M)](this[W7C][b6S.M1j],panel[(o2M+V8z+P8U)]);this[l4R]();this[(k6D+V0M+e6U+V0M+d0M)]=STX[x9c](this[Z91]);this[m5w]=u27;return w2T;}
;STX.Drawing.fibonacci.prototype.render=function(context){var V7I="r2L",c8U="B2L",m8M="y2L",q97="m2L",z4R="I2L",h2c="v2L",i7R="s2L",H51="b2L",e3U="uto",Z7R="g2L",N9w="extendLeft",f0U="arame",q3w="V2L",T7z="q2L",b2U="lev",r9R="N9L",w3z="C9L",X0D="Value",E6j="e9L",p3U="printLevels",q4C="X9L",E87="D9L",e6z="u9L",f1M="L9L",v9R="61",P3w="O9L",T4M="trend",p7U="T9",Q0C="o9",panel=this[r9T][K41][this[T6z]];if(!panel)return ;var yAxis=panel[c3I];if(!this[W7C])return ;var x0=this[r9T][d57](this[s7C][0],panel[X1c]),x1=this[r9T][d57](this[W7C][0],panel[X1c]),y0=this[r9T][q5T](panel,this[s7C][0],this[s7C][1]),y1=this[r9T][q5T](panel,this[W7C][0],this[W7C][1]),top=Math[B9R](y1,y0),bottom=Math[(z4M)](y1,y0),height=b6S[(Q0C+c3j)](bottom,top),isUpTrend=b6S[(p7U+c3j)]((y1-y0)/(x1-x0),0),trendLineColor=this[Z91][T4M][c7R];if(b6S[P3w](trendLineColor,"auto")||STX[s7c](trendLineColor))trendLineColor=this[r9T][B3I];if(this[K4z]){trendLineColor=this[r9T][Q1M]("stx_highlight_vector");}
context.textBaseline="middle";var w=context.measureText((I91+v9R+h6I+h01+y21)).width,minX=Number[S5w],minY=Number[S5w],maxX=Number[S5w]*-1,maxY=Number[S5w]*-1,txtColor=this[c7R];if(b6S[f1M](txtColor,"auto")||STX[s7c](txtColor))txtColor=this[r9T][B3I];context.fillStyle=txtColor;for(var i=0;b6S[e6z](i,this[Z91][F41].length);i++){var fib=this[Z91][F41][i],y=isUpTrend?b6S[E87](bottom,height*fib[I7w]):top+b6S[q4C](height,fib[I7w]);y=Math[y1c](y);var x=STX[R3j]({x0:x0,x1:x1,y0:y0,y1:y1}
,y),farX=this[r9T][X1c].width;if(this[Z91][p3U]){var txt=(b6S[E6j](fib[(O1R+r2I+b6S.I2M+E1M)],100))+"%";farX-=w;context.fillText(txt,farX,y);farX-=5;}
else if(this[(x0M+b6S.a9M+V0M+b6S.a9M+c77+b6S.K7M+i2D+d0M)][(c5c+E0T+b6S.K7M+X0D+d0M)]){if(b6S[w3z](x,this[r9T][(b6S.j3c+b6S.a9M+P8U)].width)){var v0=this[s7C][1],v1=this[W7C][1],price=v0+(b6S[r9R]((v1-v0),fib[(b2U+l7D)]));if(panel[X1c][v1j])price=panel[X1c][v1j](this[r9T],panel[X1c],price);if(yAxis[v7z]){price=yAxis[v7z](this[r9T],panel,price);}
else{price=this[r9T][t67](price,panel);}
if(b6S[T7z](context,this[r9T][X1c][o4z]))this[r9T][a51]();this[r9T][k31](panel,price,y,txtColor,null,context);if(b6S[q3w](context,this[r9T][X1c][o4z]))this[r9T][v17](panel[T5U]);}
}
var nearX=this[(x0M+f0U+h7M+V0M+d0M)][N9w]?0:x,fibColor=fib[c7R];if(b6S[Z7R](fibColor,(b6S.a9M+e3U))||STX[s7c](fibColor))fibColor=this[(U8c+P8w)];if(b6S[H51](fibColor,"auto")||STX[(S7T+L8j+S0U+n1M+d0M+x0M+b6S.a9M+V0M+b6S.I2M+n1M+b6S.K7M)](fibColor))fibColor=this[(d0M+b6S.K7M+s2I)][B3I];this[r9T][j5T](nearX,farX,y,y,fibColor,"segment",context,panel,fib[Z91]);if(b6S[(D1M+G3I+c3j)](y,minY)){minX=x;minY=y;}
if(b6S[i7R](y,maxY)){maxX=x;maxY=y;}
}
for(var level in {0:0,1:1}
){var y=isUpTrend?b6S[h2c](bottom,height*level):top+b6S[z4R](height,level);y=Math[y1c](y);if(b6S[q97](y,minY)){minX=STX[R3j]({x0:x0,x1:x1,y0:y0,y1:y1}
,y);minY=y;}
if(b6S[m8M](y,maxY)){maxX=STX[R3j]({x0:x0,x1:x1,y0:y0,y1:y1}
,y);maxY=y;}
}
this[r9T][j5T](minX,maxX,minY,maxY,trendLineColor,"segment",context,panel,this[Z91][T4M][Z91]);if(this[K4z]){var p0Fill=b6S[c8U](this[f9T],"p0")?true:false,p1Fill=b6S[V7I](this[f9T],"p1")?true:false;this[H4c](context,x0,y0,p0Fill);this[H4c](context,x1,y1,p1Fill);}
}
;STX.Drawing.fibonacci.prototype.reposition=function(context,repositioner,tick,value){STX.Drawing.BaseTwoPoint.prototype.reposition.apply(this,arguments);this[g7R]();}
;STX.Drawing.fibonacci.prototype.intersected=function(tick,value,box){var e4M="A2L",S6M="K2L",p9w="box";if(!this[(x0M+l91)]||!this[W7C])return F4U;if(STX[(p9w+i6j+n1M+h7M+V0M+d0M+S1D+M6M)](box[e21],box[v9w],box[r21],box[L9w],this[h9T][s7C][b6S.M1j],this[h9T][s7C][b6S.p1j],this[h9T][W7C][b6S.M1j],this[h9T][W7C][b6S.p1j],p5I)){if(b6S[S6M](this[T5U],a27)&&b6S[e4M](this[T5U],P5D)){if(this[F4D](this[s7C][b6S.M1j],this[s7C][b6S.p1j],box)){this[K4z]=(x0M+l91);this[f9T]=s7C;return {action:V8w,point:s7C}
;}
else if(this[F4D](this[W7C][b6S.M1j],this[W7C][b6S.p1j],box)){this[K4z]=W7C;this[f9T]=W7C;return {action:V8w,point:W7C}
;}
}
this[K4z]=w2T;return {action:l0C,p0:STX[x9c](this[s7C]),p1:STX[x9c](this[W7C]),tick:tick,value:value}
;}
return F4U;}
;STX.Drawing.fibonacci.prototype.reconstruct=function(stx,obj){var v8j="ap",P0D="reverseObject";obj=STX[F5I](obj,STX[P0D](STX[f57][s27][(x1M+v8j+x0M+E0T+Z6M)]));this[(r9T)]=stx;this[Z91]=obj[Z91];if(!this[Z91])this[(k6D+V0M+n67+b6S.K7M+Q31)]=STX[x9c](this[r9T][d3I][s27]);this[c7R]=obj[o47];this[T6z]=obj[Z51];this[j0U]=obj[j0U];this[r7U]=obj[(b6S.l2M+I91)];this[p8M]=obj[p8M];this[y8M]=obj[y8M];this[g7R]();}
;STX.Drawing.fibonacci.prototype.adjust=function(){var panel=this[r9T][(x0M+b6S.a9M+l9M)][this[T6z]];if(!panel)return ;this[s7C]=[this[r9T][t51](this[j0U],panel[X1c]),this[p8M]];this[W7C]=[this[r9T][t51](this[r7U],panel[X1c]),this[y8M]];this[l4R]();}
;STX.Drawing.fibonacci.prototype.serialize=function(){var obj={name:this[T5U],parameters:this[Z91],pnl:this[T6z],col:this[c7R],d0:this[j0U],d1:this[r7U],v0:this[(p8M)],v1:this[y8M]}
;return STX[F5I](obj,STX[f57][s27][H8D]);}
;STX[(L17+j87+n1M+Z6M)][X5T]=function(){var l8j="On";this[T5U]=X5T;this[D8R]=[];this[H3j]=u27;this[(o2M+E8M+K8j+b6S.K7M+d0M+l8j+E1M+g2I)]=w2T;}
;STX[f57][X5T][x1j](STX[f57][H11]);STX.Drawing.bellcurve.prototype.click=function(context,tick,value){var f07="Do",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[F37]();if(!this[(O0D+n1M+f07+d9w)]){this[s7C]=[tick,value];this[m5w]=w2T;return u27;}
if(this[i17](tick,value))return this[G7c];this[W7C]=[tick,value];this[j0U]=this[r9T][g71](this[s7C][b6S.M1j],panel[X1c]);this[r7U]=this[r9T][g71](this[W7C][b6S.M1j],panel[X1c]);this[H3j]=w2T;this[m5w]=u27;return w2T;}
;STX.Drawing.bellcurve.prototype.profileRange=function(profile,x,right){var f5C="i5L",b67="J5L",I2R="5L",F67="t5L",w0M="c5L",u77="w5L",b0R="P5L",t11="Y5L",E8U="z5L",W2z="h2",R11="R2L";if(b6S[(L2z+c3j)](x,profile.length)){profile[x]=[];profile[x][0]=right;return ;}
for(var y=0,l=profile[x].length;b6S[R11](y,l);y++){var left=profile[x][y];if(b6S[(W2z+c3j)](left[c9R],right[c9R])&&b6S[E8U](left[Q6I],right[Q6I])){this[f6C](profile,x+1,right);return ;}
else if(b6S[t11](right[c9R],left[c9R])&&b6S[b0R](right[Q6I],left[c9R])&&b6S[u77](right[Q6I],left[Q6I])){this[f6C](profile,x+1,{"High":left[c9R],"Low":right[Q6I]}
);right={"High":right[(v9M+q4w+E8M)],"Low":left[c9R]}
;}
else if(b6S[(w0M)](right[Q6I],left[Q6I])&&b6S[F67](right[c9R],left[Q6I])&&b6S[(i7M+I2R)](right[c9R],left[(v9M+K8M+Z6M+E8M)])){this[f6C](profile,x+1,{"High":right[c9R],"Low":left[Q6I]}
);right={"High":left[Q6I],"Low":right[Q6I]}
;}
else if(b6S[b67](left[c9R],right[c9R])&&b6S[f5C](left[Q6I],right[Q6I])){this[f6C](profile,x,{"High":left[(c3j+c1M+J2I)],"Low":right[Q6I]}
);this[f6C](profile,x+1,{"High":left[c9R],"Low":left[Q6I]}
);right={"High":right[c9R],"Low":left[(v9M+K8M+b3C)]}
;}
}
profile[x][y]=right;}
;STX.Drawing.bellcurve.prototype.render=function(context){var s37="Z4L",O71="H4L",l2z="n4L",J8D="S4L",L4c="paren",w9R="timer",G2T="a5L";function calculateProfile(self,panel){return function(){var u2c="f5L",w27="Q5L",W5U="F5L",n7D="x5L",L1D="U5L";self[D8R]=[];var sorted=[],tick0=Math[B9R](self[s7C][0],self[W7C][0]),tick1=Math[z4M](self[s7C][0],self[W7C][0]);if(b6S[L1D](tick1-tick0,3000))return ;for(var i=tick0;b6S[n7D](i,tick1);i++){if(b6S[W5U](i,0)||b6S[w27](i,panel[X1c][g91].length))continue;var prices=panel[X1c][g91][i];sorted[I57]({"High":prices[c9R],"Low":prices[(Q6I)]}
);}
function sortFunc(a,b){var h4z="p5L",D0D="G5L";if(b6S[D0D](a[Q6I],b[Q6I]))return -1;if(b6S[h4z](a[Q6I],b[Q6I]))return 1;return 0;}
sorted[Y0M](sortFunc);for(var i=0;b6S[u2c](i,sorted.length);i++){self[f6C](self[D8R],0,sorted[i]);}
}
;}
if(!this[W7C])return ;var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[e21]=this[r9T][d57](this[s7C][0],panel[X1c]);this[r21]=this[r9T][d57](this[(x0M+I91)][0],panel[X1c]);if(b6S[G2T](this[D8R].length,0)||!this[H3j]){if(this[w9R])clearTimeout(this[w9R]);this[w9R]=setTimeout(calculateProfile(this,panel),20);}
if(this[K4z]){context.fillStyle=this[r9T][Q1M]("stx_highlight_vector");context.globalAlpha=.5;}
else{context.fillStyle=this[(o47+c1M+V0M)];if(STX[(Z8U+V0M+b6S.a9M+n1M+d0M+L4c+b6S.K7M)](context.fillStyle))context.fillStyle=this[r9T][B3I];context.globalAlpha=.5;}
var cw=this[r9T][k5I][h4U];context.beginPath();for(var x=0;b6S[J8D](x,this[D8R].length);x++){for(var y=0;b6S[l2z](y,this[D8R][x].length);y++){var range=this[D8R][x][y],y0=this[(w2M+s2I)][D7C](range[c9R],panel),y1=this[r9T][D7C](range[Q6I],panel),x0=Math[(T47+n1M)](this[e21],this[r21])+b6S[O71](x,cw),x1=x0+Math[y1c](b6S[s37](cw,.75));context.moveTo(x0,y0);context.lineTo(x1,y0);context.lineTo(x1,y1);context.lineTo(x0,y1);context.lineTo(x0,y0);}
}
context.fill();context.closePath();context.globalAlpha=1;}
;STX.Drawing.bellcurve.prototype.intersected=function(tick,value,box){var l6M="k4L",B2D="l4L";if(b6S[B2D](tick,Math[z4M](this[s7C][b6S.M1j],this[W7C][b6S.M1j]))&&b6S[l6M](tick,Math[B9R](this[s7C][b6S.M1j],this[W7C][b6S.M1j])))return w2T;return u27;}
;STX.Drawing.bellcurve.prototype.copyConfig=function(){this[c7R]=this[r9T][d3I][F0w];}
;STX.Drawing.bellcurve.prototype.adjust=function(){var panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[s7C]=[this[r9T][t51](this[j0U],panel[X1c]),b6S.M1j];this[W7C]=[this[r9T][t51](this[r7U],panel[X1c]),b6S.M1j];}
;STX.Drawing.bellcurve.prototype.reconstruct=function(stx,obj){this[r9T]=stx;this[c7R]=obj[o47];this[T6z]=obj[Z51];this[j0U]=obj[j0U];this[r7U]=obj[r7U];this[g7R]();this[H3j]=w2T;}
;STX.Drawing.bellcurve.prototype.serialize=function(){return {name:this[T5U],pnl:this[T6z],col:this[c7R],d0:this[j0U],d1:this[r7U]}
;}
;STX[J3I]=function(){}
;q9(u27);STX[J3I][J77]=function(stx,chart,price){var R4U="E4L";return b6S[(R4U)](Math[y1c](((price-STX[J3I][N7T])/STX[J3I][N7T]*O9w)*R27),R27);}
;STX[J3I][h6U]=function(stx,chart,percent){var D41="d4L";return b6S[D41](STX[J3I][N7T],(b6S.p1j+(percent/O9w)));}
;STX[J3I][N2D]=function(lhs,rhs){var f6j="o4L";return b6S[f6j](lhs,rhs);}
;STX[J3I][G8C]=function(stx,chart){var j1D="t0L",k9C="c0L",q7D="P0L",T27="Y0L",i07="z0L",i5z="h7L",Z9I="R7L",y7T="M7L",u5T="A7L",B0I="_s",d8c="ari",U5I="K7L",s9z="r7L",k51="B7L",w8I="Comparis",l3D="y7L",b3c="m7L",t3D="pu",L3z="transformOutputs",F1z="Output",K6C="nce",v7D="ere",s0D="I7L",k1z="s7L",K27="j7L",t3C="b7L",f8c="g7L",H07="7L",l8R="q7L",H2z="N4L",P8R="C4L",c9z="e4L",o7T="X4L",k4T="par",z8c="D4L",S7M="u4L",d6z="L4L",q5w="bjec",E3I="O4L",Z8D="T4L";if(!chart[l0I])return false;var fields=[];for(var field in chart[m2T]){if(chart[m2T][field][Z91][l0I]){fields[I57](field);}
}
var priceFields=["Close","Open","High","Low","iqPrevClose"];chart[U3U]=[];var firstQuote=null,firstTick=b6S[Z8D](chart[(b6S.l2M+e4R+b6S.I2M+b6S.K7M)].length,chart[s67]),lastTick=firstTick+chart[T4c],stopPointer=0,stops=[];for(var i=0;b6S[E3I](i,stx[k2c].length);i++){var drawing=stx[(F3D+e91+Z6M+b6j+q5w+b6S.K7M+d0M)][i];if(b6S[d6z](drawing[T5U],"comparison_stop"))if(b6S[S7M](drawing[h7c],firstTick)&&b6S[(z8c)](drawing[h7c],lastTick))stops[I57](drawing[h7c]);}
stops[Y0M](STX[(p3c+x1M+k4T+K8M+d0M+S7D)][N2D]);for(var i=0;b6S[o7T](i,chart[T4c]);i++){if(b6S[c9z](i,chart[T4c]))i=-1;position=firstTick+i;if(b6S[P8R](position,chart[g91].length)&&b6S[H2z](position,0)){var quote=chart[g91][position];if(!firstQuote){firstQuote=STX[x9c](quote);}
if(!quote.transform)quote.transform={"cache":{}
,"DT":quote[q4c],"Date":quote[W31]}
;STX[J3I][N7T]=firstQuote[G3c];for(var j=0;b6S[l8R](j,priceFields.length);j++){var field=priceFields[j];if(quote[field]||b6S[(Q4M+H07)](quote[field],0))quote.transform[field]=b6S[f8c](Math[y1c](((quote[field]-STX[J3I][N7T])/STX[(I41+a81+V0M+S7T+S7D)][N7T]*100)*10000),10000);}
var s=stx[k5I][j7C];if(s){for(var n in s){var sd=s[n];if(b6S[t3C](stx[K41][sd[c7D]][T5U],sd[X1c][T5U]))continue;for(var field in sd[p01]){if(quote[field]||b6S[K27](quote[field],0))quote.transform[field]=b6S[k1z](Math[y1c](((quote[field]-STX[(I41+a81+V0M+A2U+n1M)][N7T])/STX[J3I][N7T]*100)*10000),10000);}
if(sd[j6w]&&b6S[(r2I+H07)](quote[sd[j6w]+" "+sd[(n1M+e1j+b6S.I2M)]],null))quote.transform[sd[j6w]+" "+sd[T5U]]=b6S[s0D](Math[(b6U+N7I+b6S.l2M)](((quote[sd[(V0M+F5D+v7D+K6C+F1z)]+" "+sd[T5U]]-STX[J3I][N7T])/STX[J3I][N7T]*100)*10000),10000);}
}
for(var j in stx[u8c]){var plugin=stx[u8c][j];if(!plugin[L3z])continue;for(var field in plugin[(b6S.K7M+Z1I+q6M+S2D+x1M+b6j+z8I+t3D+M6M)]){if(quote[field]||b6S[b3c](quote[field],0))quote.transform[field]=b6S[l3D](Math[y1c](((quote[field]-STX[(w8I+S7D)][N7T])/STX[J3I][(J91+E1M+K8M+n1M+b6S.I2M)]*100)*10000),10000);}
}
var createAStop=false;if(stops&&b6S[k51](stopPointer,stops.length)){if(b6S[s9z](position,stops[stopPointer])){createAStop=true;stopPointer++;}
}
var mouseStop=null;if(stx[T5D]&&b6S[U5I](stx[T5D][T5U],(o2M+Z7D+x0M+d8c+d0M+c1M+n1M+B0I+b6S.K7M+c1M+x0M))){mouseStop=stx[T5D][(b6S.K7M+K8M+o2M+S8M)];}
if(createAStop||b6S[u5T](position,mouseStop)){for(var j=0;b6S[y7T](j,fields.length);j++){var field=fields[j],current=quote[field];firstQuote[field]=b6S[Z9I](current,(1+(quote.transform[G3c]/100)));}
}
for(var j=0;b6S[i5z](j,fields.length);j++){var field=fields[j],current=quote[field];if(current||b6S[i07](current,0)){var baseline=firstQuote[field];if(!baseline&&b6S[T27](baseline,0)){firstQuote[field]=baseline=b6S[q7D](current,(1+(quote.transform[G3c]/100)));}
quote.transform[field]=b6S[(J2I+l91+c3j)](Math[y1c](((current-baseline)/baseline*100)*10000),10000);}
}
chart[U3U][I57](quote);}
else if(b6S[k9C](position,0)){chart[U3U][I57](null);}
if(b6S[j1D](i,0))break;}
stx[H4C]();return true;}
;STX[J3I][J7T]=function(){for(var chartName in this[F1w]){var chart=this[F1w][chartName];if(chart[l0I])STX[J3I][G8C](this,chart);}
}
;STX[J3I][C7C]=function(stx,panel,price){var j6z="Z1L",M9z="H1L",s21="xed",I1C="oF",G7T="n1L",n9C="S1L",r4T="a0L",h57="f0L",S5C="p0L",F8w="percent3",b4c="nali",O4D=.001,N5M="G0L",L71="Q0L",m1z="F0L",i8j="x0L",A9I="U0L",s4D="i0L",E7w="J0L",P3U="und",T5z="W0L";if(b6S[T5z](price,F4U)||typeof price==(P3U+F5D+z7I+b6S.l2M))return B7M;var priceTick=panel[c3I][x87];if(stx[T3D]){if(b6S[E7w](priceTick,b6S.p1j))price=stx[T3D][S8w][C3c](b6S[s4D](price,O9w));else if(b6S[A9I](priceTick,T8M))price=stx[T3D][c8w][C3c](b6S[i8j](price,O9w));else if(b6S[m1z](priceTick,t4w))price=stx[T3D][W8w][C3c](b6S[L71](price,O9w));else if(b6S[(N5M)](priceTick,O4D))price=stx[(E0T+h7M+B0c+z1M+c1M+b4c+q2I+i2D)][F8w][C3c](b6S[S5C](price,O9w));else price=stx[T3D][e8w][C3c](price);}
else{if(b6S[h57](priceTick,b6S.p1j))price=price[(b6S.K7M+c1M+A3j+K8M+s2I+b6S.I2M+b6S.l2M)](b6S.M1j)+y21;else if(b6S[r4T](priceTick,T8M))price=price[z1D](b6S.p1j)+y21;else if(b6S[n9C](priceTick,t4w))price=price[z1D](b6S.G1j)+y21;else if(b6S[G7T](priceTick,O4D))price=price[z1D](b6S.D1j)+y21;else price=price[(b6S.K7M+I1C+K8M+s21)](b6S.N1j)+y21;}
if(b6S[M9z](parseFloat(price),b6S.M1j)&&b6S[j6z](price[l3R](b6S.M1j),i3I)){price=price[W51](b6S.p1j);}
return price;}
;STX[(I41+a81+L47)][(d9C+V0M+q9T+b6S.K7M+b6S.I2M)]=function(stx,symbol){var t9w="o1L",Y4w="d1L",n7C="E1L",Q4c="colorSelection",D4R="Comp",u51="k1L",R9D=" .",t37="xCor",h1z="l1L";if(!STX[J3I][x6I]||b6S[h1z](correlationPeriod,0))return ;var correlationPeriod=parseInt($$$((h6I+d0M+b6S.K7M+t37+V0M+l7D+b6S.a9M+h7M+R9D+d0M+V9I+i3I+K8M+T7C+z8I+i3I+q6M+K8M+b6S.I2M+E1M+b6S.l2M))[(r2I+v7M+V4I)],10),corrPanel=stx[K41][STX[J3I][E6C]+" ("+correlationPeriod+")"],inputs={"id":STX[J3I][E6C]+" ("+correlationPeriod+")","Period":correlationPeriod,"Compare To":[]}
,outputs={}
,panelName=null;if(corrPanel){for(var i=0;b6S[u51](i,stx[k5I][j7C][corrPanel[T5U]][b1I]["Compare To"].length);i++){inputs[(D4R+K8j+b6S.I2M+B1I+L8j+c1M)][I57](stx[k5I][j7C][corrPanel[(Y3z+b6S.I2M)]][b1I]["Compare To"][i]);}
for(var o in stx[k5I][j7C][corrPanel[T5U]][n8M]){outputs[o]=stx[k5I][j7C][corrPanel[(d8C+c77)]][(c1M+z8I+x0M+z8I+d0M)][o];}
panelName=corrPanel[T5U];}
inputs["Compare To"][I57](symbol);outputs["Result "+symbol]=STX[J3I][Q4c];STX[a4w][l9c](stx,"correl",inputs,outputs,null,panelName);for(var panel in stx[K41]){if(b6S[n7C](stx[K41][panel][T5U][m8z](STX[J3I][E6C]),0)){var compareArray=stx[k5I][j7C][stx[K41][panel][T5U]][b1I]["Compare To"];for(var i=0;b6S[Y4w](i,compareArray.length);i++){if(b6S[t9w](compareArray[i],symbol)){stx[k5I][j7C][stx[(x0M+b6S.a9M+h0M+d0M)][panel][T5U]][n8M]["Result "+symbol]=STX[J3I][Q4c];}
}
}
}
}
;STX[J3I][O0M]=function(stx){var Q2I="ssN",u4C="ndCla",T7M=".stxCorrelate .stx-checkbox";STX[J3I][x6I]=!STX[(I41+a81+U5U+F6I)][x6I];var display=$$$(T7M);if(display){STX[(X7M+n1M+b6S.a9M+k5c+b6S.I2M+u4C+e9M+n6j+e1j+b6S.I2M)](display,(!STX[J3I][x6I])[z7c]());STX[(b6S.a9M+k5c+b6S.I2M+u4C+Q2I+e1j+b6S.I2M)](display,STX[J3I][x6I][z7c]());}
}
;STXChart.prototype.setComparison=function(stx,chart,onOff){var e9C="ormat",f01="unsetTransform",p8j="mat";if(!chart[l0I]&&onOff){stx.setTransform(chart,STX[J3I][J77],STX[J3I][h6U]);chart[c7D][c3I][(x0M+c6M+V2c+S2D+x1M+n3I+b6S.I2M+V0M)]=STX[J3I][(x0M+W7M+A3j+S2D+p8j)];chart[c7D][c3I][o2z]=U3U;}
else if(chart[l0I]&&!onOff){stx[f01](chart);chart[c7D][c3I][(x0M+c6M+b6S.I2M+A3j+e9C+h7M+V0M)]=F4U;chart[c7D][c3I][o2z]=g91;}
chart[l0I]=onOff;}
;STX[J3I][G9U]=function(){STXChart.prototype.prepend(M0U,STX[J3I][J7T]);}
;STX[f57][f2c]=function(){this[T5U]=f2c;this[c7D]=F4U;}
;STX[f57][f2c][x1j](STX[(L17+e91+Z6M)]);STX.Drawing.comparison_stop.prototype.adjust=function(){var M41="kFromDate",panel=this[r9T][K41][this[T6z]];if(!panel)return ;this[h7c]=this[r9T][(b6S.K7M+K8M+o2M+M41)](this[j0U],panel[X1c]);}
;STX.Drawing.comparison_stop.prototype.move=function(context,tick,value){this[h7c]=tick;STX[J3I][D5I]=w2T;this[r9T][Y5M]();}
;STX.Drawing.comparison_stop.prototype.render=function(context){var E3j="T1L",I9R="ht_vec",h31="lig",l7U="x_hi",Y1M="def",p2C="mTi",l4M="Fro",panel=this[(r9T)][K41][this[T6z]];if(!panel)return ;var chart=panel[X1c];if(!chart[l0I])return ;var yAxis=panel[(z8z+n0z+d0M)],stx=this[r9T],x=Math[y1c](stx[(u2w+l4M+p2C+K6c)](this[h7c],chart))+I8M,color=stx[(Y1M+b6S.a9M+U0I+b6S.K7M+p3c+T3R+V0M)];if(this[K4z]){color=stx[Q1M]((w2M+l7U+b3C+h31+I9R+b6S.K7M+c1M+V0M));}
stx[X1c][o4z][r6M](x,panel.top+yAxis[c9U],x,b6S[E3j](panel[(F9M+w7C)],yAxis[q8M]),color,b6S.p1j,I8M,[L3M,L3M]);}
;STX.Drawing.comparison_stop.prototype.abort=function(){}
;STX.Drawing.comparison_stop.prototype.intersected=function(tick,value,box){var m5C="L1L",c61="O1L";if(b6S[c61](this[h7c],box[e21])&&b6S[m5C](this[h7c],box[r21]))return w2T;return u27;}
;STX.Drawing.comparison_stop.prototype.highlight=function(highlighted){var G6D="u1L";if(b6S[G6D](this[K4z],highlighted)){this[K4z]=highlighted;return w2T;}
return u27;}
;STX.Drawing.comparison_stop.prototype.click=function(context,tick,value){var panel=this[r9T][K41][this[T6z]];if(!panel)return ;if(STX[J3I][D5I]){this[h7c]=tick;this[j0U]=this[r9T][g71](this[h7c],panel[X1c]);}
else{return u27;}
var stx=this[r9T];setTimeout(function(){STX[f57][f2c][Y0U](stx);}
,b6S.M1j);return w2T;}
;STX[f57][f2c][o1C]=function(stx,chart){var v5R="changeVectorType",l2R="ctorType";STX[J3I][(r2I+b6S.I2M+l2R)]=stx[d3I][W2w];STX[(I41+Z7D+x0M+K8j+A2U+n1M)][D5I]=u27;stx[v5R](f2c);stx[M2D](chart[c7D],b6S.M1j,b6S.M1j);}
;STX[f57][f2c][r3M]=function(stx,chart){var v2D="C1L",V5C="n_stop",M91="riso",U2C="e1L",X5z="X1L",d41="on_s",k0I="paris",R3M="D1L";if(stx[T5D]&&b6S[R3M](stx[T5D][T5U],(o2M+c1M+x1M+k0I+d41+U8M+x0M))){STX[f57][f2c][Y0U](stx);}
var panel=chart[(x0M+u1D+E1M)],i=0;while(b6S[X5z](i,stx[k2c].length)){var drawing=stx[k2c][i];if(b6S[U2C](drawing[T5U],(o2M+a81+M91+V5C))&&b6S[v2D](drawing[T6z],panel[(Y3z+b6S.I2M)])){drawing.abort(true);stx[q91]();stx[k2c][F57](i,1);continue;}
i++;}
stx[H2M]("vector");stx[Y5M]();}
;STX[f57][f2c][(w2M+c1M+x0M)]=function(stx){stx[d3I][W2w]=STX[J3I][W2w];stx[w3I]();}
;STX.Drawing.comparison_stop.prototype.serialize=function(){var obj={name:this[T5U],pnl:this[T6z],d0:this[j0U]}
;return obj;}
;STX.Drawing.comparison_stop.prototype.reconstruct=function(stx,obj){this[r9T]=stx;this[T6z]=obj[Z51];this[j0U]=obj[(j0U)];this[g7R]();}
;STX[y7w]=function(){var y2M="Construct",t9D="kerHolde";this[(x1M+K8j+t9D+V0M)]=F4U;this[q71]=F4U;this[y2M]();}
;Y9(b6S.p1j);STX.Markers.prototype.reset=function(){var l1I="overflow",R2D="solute";this[W6I]=[];if(!this[c7D][r7I]){this[c7D][r7I]=document[i4w](G3z);this[c7D][r7I][W4w][o3C]=(b6S.a9M+F9M+R2D);this[c7D][r7I][W4w][q3M]=K2T;this[c7D][r7I][W4w][l1I]=(E8M+K8M+b6S.l2M+b6S.l2M+b6S.I2M+n1M);this[c7D][r7I][W4w][d3R]=b6S.p1j;this[(d0M+V9I)][X1c][w8w][Z7z](this[c7D][r7I]);this[r9T][G2R]();}
}
;STX.Markers.prototype.clear=function(){if(this[c7D][r7I]){this[r9T][X1c][w8w][n3j](this[c7D][r7I]);this[c7D][r7I]=F4U;}
this[q1I]();}
;STX.Markers.prototype.placeMarker=function(node,date){var n0D="sortMarkers",b1M="N1L",S0w="ouch",R9w="hover",a3I="android",O7T="olute",u4U="bs",C0M="stemClass",w2R="drawStems",stx=this[r9T];function incrementZIndex(e){var r6C="zI";if(marker[Q8z])marker[Q8z][W4w][d3R]=STX[y7w][k8c];marker[l0T][W4w][(r6C+n1M+Y2c+s2I)]=STX[(X8j+Z0M+b6S.I2M+V0M+d0M)][(o2M+X7M+v8U+b6S.I2M+n1M+b6S.K7M+q4M+E0T+Y2c+s2I)]++;}
function takeFocus(e){incrementZIndex(e);stx[W6z]="marker";stx[j3C]();}
function releaseFocus(e){stx[W6z]="";stx[X81]();}
var marker={node:node,date:date}
;node[W4w][C47]="none";if(this[w2R]){var stem=document[i4w]("DIV");stem[v7c]=this[C0M];stem[W4w][o3C]=(b6S.a9M+u4U+O7T);stem[W4w][C47]="none";marker[(d0M+b6S.K7M+b6S.I2M+x1M)]=stem;}
if(this[s8R]){if(!STX[a3I]&&!STX[w6I]&&!STX[A8R]){marker[l0T][m8c]("mouseover",(function(node,stx){return takeFocus;}
)(marker[l0T],stx));marker[l0T][m8c]("mouseout",(function(node,stx){return releaseFocus;}
)(marker[(n1M+F5C)],stx));}
else{marker[l0T][m8c]("touchstart",(function(node){return incrementZIndex;}
)(marker));}
}
else if(this[R9w]){if(STX[w6I]||STX[A8R]){marker[l0T][m8c]((b6S.K7M+S0w+w2M+b6S.a9M+P8U),(function(node){return incrementZIndex;}
)(marker));}
else{marker[(n1M+c1M+Y2c)][m8c]("mouseover",(function(node){return incrementZIndex;}
)(marker));}
}
this[W6I][I57](marker);node[(d0M+w7T+b6S.I2M)][o3C]="absolute";this[c7D][r7I][Z7z](node);if(marker[Q8z])this[c7D][r7I][Z7z](marker[Q8z]);this[y1M](this[c7D][X1c],marker);if(b6S[b1M](this[W6I].length,1)){if(b6S[(e0M+h01+c3j)](marker[h7c],this[W6I][this[W6I].length-2][h7c])){this[n0D]();}
}
return marker;}
;STX.Markers.prototype.sortMarkers=function(){var w4U="arker";function mySort(l,r){var m8U="g8L",g01="V8L";if(b6S[g01](l[h7c],r[h7c]))return -b6S.p1j;if(b6S[m8U](l[(h7c)],r[h7c]))return b6S.p1j;return b6S.M1j;}
;this[(x1M+w4U+d0M)][Y0M](mySort);}
;STX.Markers.prototype.setMarkerTick=function(chart,marker){var A2T="R8L",m4z="M8L",z6w="A8L",V6D="K8L",Y1z="r8L",Z3j="B8L",P6c="y8L",I8U="m8L",r3c="I8L",l01="v8L",j71="s8L",a37="j8L",N0z="b8L";for(var i=0;b6S[N0z](i,chart[(b6S.l2M+b6S.a9M+b47+b6S.K7M)].length);i++){var quotes=chart[g91][i],qms=quotes[q4c][Y7w](),pms=qms;if(b6S[a37](i,0))pms=chart[(b6S.l2M+b6S.a9M+f4M+W9C)][b6S[j71](i,1)][q4c][Y7w]();var dms=marker[N81][Y7w]();if(b6S[l01](qms,dms)){marker[h7c]=i;return ;}
else if(b6S[r3c](qms,dms)&&b6S[I8U](pms,dms)){marker[h7c]=Math[z4M](b6S[P6c](i,1),0);return ;}
}
var dt=new Date(chart[g91][b6S[Z3j](i,1)][q4c]);for(var j=chart[g91].length;b6S[Y1z](j,chart[g91].length*2);j++){var pms=dt[Y7w]();dt=this[r9T][G5R](dt,this[r9T][k5I][W27]);var qms=dt[(l9z+L8j+b0T+b6S.I2M)](),dms=marker[N81][Y7w]();if(b6S[V6D](qms,dms)){marker[h7c]=j;return ;}
else if(b6S[z6w](qms,dms)&&b6S[m4z](pms,dms)){marker[h7c]=Math[(z4M)](b6S[A2T](j,1),0);return ;}
}
}
;STX.Markers.prototype.createDataSet=function(stx){var w7I="h8L";for(var j=0;b6S[w7I](j,this[W6I].length);j++){var marker=this[W6I][j];this[y1M](this[c7D][(o2M+v9T)],marker);}
}
;STX.Markers.prototype.initializeChart=function(stx){var m0T="initialize";this[r9T]=stx;this[c7D]=stx[(x0M+b6S.a9M+n1M+l7D+d0M)][this[T6z]];this[q1I]();this[m0T](stx);}
;STX.Markers.prototype.drawUnder=function(stx,chart){}
;STX.Markers.prototype.drawOver=function(stx,chart){var V1z="tionM";function draw(self,stx){return function(){var H2I="c6L",q6R="w6L",I7T="P6L",a2U="Y6L",u5D="z6L",W8C="placementFunction";self[q71]=null;var panel=stx[K41][self[T6z]];if(!panel)return ;if(!panel[K2R]&&self[W8C]){var chart=panel[X1c],markerSet=[],firstTick=b6S[u5D](chart[g91].length,stx[(o2M+v9T)][s67]),lastTick=firstTick+chart[U3U].length;for(var i=0;b6S[a2U](i,self[W6I].length);i++){var marker=self[W6I][i];if(!marker[h7c])continue;var node=marker[l0T],stem=marker[Q8z];if(b6S[I7T](marker[h7c],firstTick)){if(b6S[q6R](node[W4w][C47],"block")){node[W4w][C47]="block";if(stem)stem[W4w][C47]="block";}
markerSet[I57](marker);}
else{if(b6S[H2I](node[W4w][C47],"none")){node[W4w][C47]="none";if(stem)stem[W4w][C47]="none";}
}
}
self[W8C](self,stx,panel,markerSet);}
}
;}
if(!this[q71])this[q71]=setTimeout(draw(this,stx),this[(U6M+b6S.a9M+T4C+K8M+V1z+E8j)]);}
;STX[(o1j+X7M+c1M+h7M+A3j+b6S.I2M+b6S.I2M+b6S.l2M)][G87]=function(url){this[o77]=url;this[a9T]={"AX":i9R}
;}
;STX[N2T][G87][x1j](STX[N2T]);STX.QuoteFeed.BarChart.prototype.isBats=function(symbol){var G0C="t6L";if(b6S[G0C](symbol.length,5))return true;return false;}
;STX.QuoteFeed.BarChart.prototype.isIndex=function(symbol){var z8R="W6L";if(symbol.length&&b6S[z8R](symbol[0],'$'))return true;return false;}
;STX.QuoteFeed.BarChart.prototype.symbology=function(symbol){return symbol;}
;STX.QuoteFeed.BarChart.prototype.batsOpen=function(){var C4C="6L",B0C="J6L",nd=STX[R6C]();if(b6S[B0C](nd[C6I](),b6S.P3M))return u27;if(b6S[(K8M+C4C)](nd[C6I](),b6S.n8j))return u27;return w2T;}
;STX.QuoteFeed.BarChart.prototype.fetch=function(params,cb){var j8j="&nocache",v2w="nocache",Y61="&symbol=",M0C=".BZ",h4R="Q6L",U6U="sO",W5D="isAfterDelayed",f9c="&order=asc",U21="&maxRecords=",Z7c="F6L",S3c="&startDate=",F0z="hh",t0R="yyyym",E3D="&endDate=",r8D="eZ",r9w="nver",d21="x6",M7T="&splits=true",Y9I="&splits=false",j61="U6L",e8M="&interval=",R77="?type=minutes",U0R="?type=formTMinutes",T0z="yC",W67="Bats",z8w="/getHistory.csv",url=this[o77]+z8w,isbats=this[(K8M+d0M+W67)](params[F3I]);if(STXChart[m8R](params[k9w])){url+=(O51+b6S.K7M+A2R+C51+b6S.l2M+F4M+E1M+T0z+q0I+K8M+n1M+X7M+b6S.I2M);}
else{if(params[d0I]&&isbats){url+=U0R;}
else{url+=R77;}
url+=e8M+params[S57];}
if(b6S[j61](params[i8I],u27)){url+=Y9I;}
else{url+=M7T;}
var myDate=new Date();if(params[e3j]){myDate=params[e3j];if(STXChart[m8R](params[k9w])){myDate[I5M](b6S[(d21+c3j)](myDate[n8C](),b6S.p1j));}
myDate=STX[(o2M+c1M+r9w+b6S.K7M+L8j+b0T+r8D+c1M+n1M+b6S.I2M)](myDate,F4U,c0T);url+=E3D+STX[(t0R+x1M+b6S.l2M+b6S.l2M+F0z+x1M+x1M)](myDate);if(!params[d37])params[d37]=o81;}
else{if(params[T37]){var startDate=new Date(params[T37]);if(STXChart[m8R](params[k9w])){startDate[I5M](startDate[n8C]()+b6S.p1j);}
startDate=STX[W9T](startDate,F4U,c0T);url+=S3c+STX[Z87](startDate);params[d37]=b6S.M1j;}
else if(!params[d37]){params[d37]=b6S[Z7c](params[q8D],b6S.D1j);}
}
if(params[d37])url+=U21+params[d37];url+=f9c;var symbol=this[y7D](params[F3I]);if(isbats&&params[L7c]){if(symbol[m8z]((h6I+Q41+q4M))==-b6S.p1j&&(!STX[N77][W5D](symbol)||params[d0I])&&this[(F9M+V6j+U6U+O0D+n1M)]()&&b6S[h4R](symbol[l3R](b6S.M1j),c1U))symbol=symbol+M0C;}
url+=Y61+encodeURIComponent(symbol);if(params[v2w])url+=j8j;var self=this;STX[X6M](url,null,function(status,res){var P1I="f6L",Y8D="ess",z2w="p6L",K5c="G6L";if(b6S[K5c](status,200)){cb({error:status}
);return ;}
if(b6S[z2w](res,"\r\n")){cb({quotes:[]}
);return ;}
var res=self[(x0M+b6U+o2M+Y8D)](res,params),moreToLoad=true;if(!params[d37]||b6S[P1I](res.length,params[d37])){moreToLoad=false;}
cb({quotes:res,moreAvailable:moreToLoad}
);}
);}
;STX.QuoteFeed.BarChart.prototype.process=function(quotes,params){var N2z="l3L",W1C="Z3L",o6I="H3L",N6z="n3L",q9D="S3L",A3C="a6L",interval=params[k9w],stx=params[r9T],symbol=params[F3I],newQuotes=[],arr=quotes[T91]("\r\n");if(b6S[A3C](arr.length,2))return newQuotes;var fds=arr[0][(d0M+T2c+H7T)](","),fieldNames={}
,suppressVolume=(params[L7c]&&STXChart[m8R](interval));for(var i=0;b6S[q9D](i,fds.length);i++){fieldNames[fds[i]]=i;}
for(var i=1;b6S[N6z](i,arr.length);i++){var fields=arr[i][T91](',');if(b6S[o6I](fields.length,fds.length))continue;var field=fields[fieldNames["timestamp"]][a7T](/"/g,"");if(b6S[W1C](field,""))continue;var bcdt=STX[a5c](field);if(params[T37]&&b6S[N2z](bcdt,params[T37]))continue;newQuotes[I57]({Date:STX[Z87](bcdt),Open:parseFloat(fields[fieldNames["open"]][a7T](/"/g,"")),High:parseFloat(fields[fieldNames["high"]][a7T](/"/g,"")),Low:parseFloat(fields[fieldNames["low"]][a7T](/"/g,"")),Close:parseFloat(fields[fieldNames["close"]][a7T](/"/g,"")),Volume:(suppressVolume?0:parseFloat(fields[fieldNames["volume"]][(V0M+b6S.I2M+x0M+E1M+b6S.a9M+Y3c)](/"/g,""))),Adj_Close:parseFloat(fields[fieldNames["close"]][a7T](/"/g,""))}
);}
return newQuotes;}
;STX.QuoteFeed.prototype.requiresImmediateRefresh=function(params){return u27;}
;STX[N2T][M2C]=function(token){this[Q6R]=token;this[a9T]=STX[(o1j+X7M+c1M+b6S.K7M+b6S.I2M+h41)][M2C][E9C][G4T];}
;STX[(B2I+b6S.K7M+b6S.I2M+h41)][M2C][x1j](STX[N2T]);STX.QuoteFeed.Xignite.prototype.requiresImmediateRefresh=function(params){return this[r97](params[X1c][F3I]);}
;STX.QuoteFeed.Xignite.prototype.isBats=function(symbol){var t3j="k3L";return (b6S[t3j](symbol.length,6)&&symbol[m8z](".")==-1);}
;STX.QuoteFeed.Xignite.prototype.isIndex=function(symbol){var C4M=".IND",l31="E3L";if(symbol&&b6S[l31](symbol[m8z](C4M),b6S.M1j))return w2T;return u27;}
;STX.QuoteFeed.Xignite.prototype.symbology=function(symbol){return symbol;}
;STX.QuoteFeed.Xignite.prototype.batsOpen=function(){var P7T="o3L",k3C="d3L",nd=STX[R6C]();if(b6S[k3C](nd[C6I](),b6S.P3M))return u27;if(b6S[P7T](nd[C6I](),b6S.n8j))return u27;return w2T;}
;STX.QuoteFeed.Xignite.prototype.fetch=function(params,cb){var P9D="F7j",E0C="bind",l0R="j5j",I3I="EndTime",K4D="lit",b5M="b5j",Z4w="tDat",v7C="tring",Y7C="oS",p6D="g5j",Z3D="V5j",W3U="q5j",A21="N2j",v3z="IntradayEquity",u5w="IntradayIndex",m9c="xIgniteInterval",A2C="HistoricalEquity",z7T="mpl",I5c="Te",R0z="HistoricalIndex",Q9U="C2j",L1z="e2j",b8w="X2j",S6U="D2j",T9R="IntradayBATSRTEquity",f71="u2j",b1w="DelayedFuture",Z2z="modi",K0I="O2j",n1c="T2j",H7U="lYear",D4T="o2j",G3C="d2j",v31="E2j",S3j="k2j",m6C="setYear",b5z="l2j",c8C="Z2j",t07="HistoricalFuture",Y0T="V2j",G7z="q2j",R8R="N9j",O0z="R9j",G8c="convertFutureMonth",s9c="M9j",j7z="A9j",Z0U="K9j",Z7C="r9j",p7z="join",k0T="y9j",M6D="m9j",w4w="charA",h9M="I9j",T4z="9j",Y5c="lyDat",Z1w="fri",L81="friendlyDate",J5z="StartTime",q5I="Period",g9M="results",y2I="s9j",k9z="j9j",G4D="IntradayRTForex",x8C="Fe",j37="IntradayRTMetals",M37="mb",f7R="gac",N3z="xM",h3U="Fo",b0w="yyyymmdd",q9z="mmddyyyy",Z0R="alF",v1R="HistoricalMetals",s2w="HistoricalMajorMetals",w47="Xi",F8M="Forex",o5T="sta",N9T="b9j",F6M="g9j",S0M="V9j",r1w="snapshotRefresh",d2M="ior",o7R="hav",s8U="be",Y57="ver",q5U="Dri",Q4D="q9j",B0M="substr",s51="N3L",e3c="C3L",e1z="e3L",E6w="X3L",c2C="tiv",p6U="3L",l8I=((85,5.16E2)>=1.194E3?'A':(51.1E1,45)>(1.33E3,9.5E2)?(0x17E,98):(0x28,0x123)<(1.339E3,5.62E2)?(88.,"!"):(4.78E2,0x158)),Z0w="ely",K1C="rted",O1M="ppo",x67="' ",J31=" '",F7T="terva",x71="u3L",c4I="marketClosedMaxRecordsFactor",q6C="nonMarketMaxRecordsFactor",G8z="L3L",s0I="O3L",a0w="rds",l2C="axReco",c6R="totalRecords",G3R="resultsCache",p4M="isIndex",missingBarsShutoff=true;function toMarketTime(date,tz){var P4c="T3L",utcTime=new Date(date[Y7w]()+b6S[P4c](date[l11](),60000));if(tz&&tz[m8z]("UTC")!=-1)return utcTime;else return STX[W9T](utcTime,"UTC",tz);}
var isBats=this[r97](params[F3I]),isIndex=this[p4M](params[F3I]),isForex=STX[N77][R3C](params[F3I]),isFuture=STX[N77][R9R](params[F3I]),isDaily=STXChart[m8R](params[k9w]),symbol=this[y7D](params[F3I]),expiredFuture=false,marketZone=null;if(params[X1c][h8U])params[d4C]=true;if(!this[G3R])this[G3R]={}
;if(!this[G3R][symbol]||params[d4C]||!params[c6R])this[G3R][symbol]=[];var myDate=new Date();if(params[e3j]){myDate=params[e3j];if(params[d4C])params[d37]=20000;}
else if(!params[T37]){if(this[T37])params[T37]=this[T37];if(!params[d37]){params[(x1M+l2C+a0w)]=b6S[s0I](params[q8D],3);}
}
var theFactor=1;if(b6S[G8z](params[k9w],"day"))theFactor=STX[(o1j+X7M+g9R+i5D+b6S.l2M)][M2C][E9C][q6C];else if(!isDaily)theFactor=STX[N2T][M2C][E9C][c4I];var myMaxRecords=1000;if(b6S[x71](params[k9w],"month")){console[H1w]((g2T+F7T+E1M+J31+x1M+S7D+b6S.K7M+E8M+x67+n1M+v9D+B1I+d0M+X7M+O1M+K1C+B1I+n1M+V6j+M4T+Z0w+B1I+F9M+g2I+B1I+b7M+K8M+W8U+h7M+l8I));}
else if(b6S[(F3j+p6U)](params[k9w],"week")){console[H1w]((i6j+n1M+b6S.K7M+b6S.I2M+B8U+b6S.a9M+E1M+J31+J2I+b6S.I2M+i7D+x67+n1M+c1M+b6S.K7M+B1I+d0M+X7M+O1M+V0M+h7M+b6S.l2M+B1I+n1M+b6S.a9M+c2C+Z0w+B1I+F9M+g2I+B1I+b7M+M3D+h7M+l8I));}
if(!isDaily&&b6S[E6w](params[S57],10)){myMaxRecords=Math[t97](Math[B9R](Math[z4M](b6S[e1z](params[d37],theFactor),6000),20000));}
else{myMaxRecords=Math[t97](Math[B9R](Math[z4M](b6S[e3c](params[d37],theFactor),1000),20000));}
var api=null,arguments=null,error="";if(isForex){marketZone="UTC";myDate=toMarketTime(myDate,marketZone);if(b6S[s51](symbol[l3R](0),"^"))symbol=symbol[B0M](1);if(b6S[Q4D](symbol[B0M](0,3)[l81](),symbol[B0M](3,3)[l81]()))error="Invalid Forex symbol";if(params[r9T][(e0M+X7M+c1M+h7M+q5U+Y57)][(s8U+o7R+d2M)][r1w]&&b6S[S0M](myDate[Y4M](),6)){if(STX[N2T][M2C][y47](params,symbol,isDaily,0,cb,this))return ;}
var startDate=myDate;if(!params[T37]&&params[d37]){startDate=new Date(myDate[Y7w]());if(isDaily)startDate[I5M](b6S[F6M](startDate[n8C](),myMaxRecords));else startDate[D5T](b6S[N9T](startDate[L8R](),myMaxRecords*(isNaN(params[k9w])?params[S57]:params[k9w])));}
else if(params[(o5T+P8U+F3j+t5M)]){startDate=toMarketTime(params[T37],marketZone);}
if(!params[L7c]&&isDaily){if(STX[N77][(S7T+F8M+y5I+b6S.K7M+v7M)](params[F3I])){if(",USD,AUD,CAD,CHF,EUR,GBP,HKD,ZAR,"[m8z](","+symbol[B0M](3,3)+",")!=-1){api=STX[x9c](STX[N2T][(w47+L2w+H7T+b6S.I2M)][R6R][s2w]);}
else{api=STX[x9c](STX[N2T][M2C][R6R][v1R]);}
}
else{api=STX[x9c](STX[N2T][M2C][R6R][(h27+w2M+S2D+c7w+Z0R+c1M+V0M+b6S.I2M+s2I)]);}
arguments={Symbol:symbol,StartDate:STX[q9z](STX[(b0w)](startDate)),EndDate:STX[q9z](STX[b0w](myDate))}
;}
else{if(STX[N77][(K8M+d0M+h3U+V0M+b6S.I2M+N3z+z5D+v7M)](params[F3I],true)){error="Intraday data not available.";}
else{if(STX[(c3j+b6S.I2M+f7R+g2I+L6I+Z2U+z5D)][G8U](params[(W4M+M37+o7D)])){api=STX[x9c](STX[N2T][M2C][R6R][j37]);}
else{api=STX[x9c](STX[(o1j+F7I+h7M+x8C+b6S.I2M+b6S.l2M)][M2C][R6R][G4D]);}
arguments={Symbol:symbol,StartTime:STX[q9z](STX[b0w](startDate))+" 00:00:00",EndTime:STX[q9z](STX[b0w](myDate))+" 23:59:59",Period:(b6S[k9z](params[k9w],"hour")?b6S[y2I](params[S57],60):params[S57])}
;if(isDaily){api[g9M][x7z]=null;arguments[q5I]=1440;}
else if(params[L7c]){if(params[T37]){var pStartDate=toMarketTime(params[T37],marketZone);arguments[J5z]=STX[q9z](STX[b0w](startDate))+" "+STX[L81](pStartDate)[T91](" ")[1]+":00";}
}
else{arguments[J5z]=STX[q9z](STX[b0w](startDate))+" "+STX[L81](startDate)[T91](" ")[1]+(y01+l91+l91);arguments[(T3j+D1C+L8j+b0T+b6S.I2M)]=STX[q9z](STX[b0w](myDate))+" "+STX[(Z1w+b6S.I2M+D1C+Y5c+b6S.I2M)](myDate)[T91](" ")[1]+":59";}
}
}
if(b6S[(r2I+T4z)](symbol[l3R](0),"^"))symbol="^"+symbol;}
else if(isFuture){marketZone="America/New_York";myDate=toMarketTime(myDate,marketZone);if(b6S[h9M](symbol[(w4w+b6S.K7M)](0),"/"))symbol=symbol[B0M](1);var month="0",year="0",cash=false;if(b6S[M6D](symbol.length,2)&&!isNaN(symbol[B0M](b6S[k0T](symbol.length,1)))){symYear=parseInt(symbol[T91]("")[i8R]()[p7z](""),10)[z7c]()[T91]("")[i8R]()[p7z]("");var thisYear=(toMarketTime(new Date(),marketZone))[D0I]();year=thisYear+9;symYearAsInt=parseInt(symYear,10);if(b6S[(f8D+D1M)](symYear.length,4)&&b6S[Z7C](symYearAsInt,0)&&b6S[Z0U](symYearAsInt,year)){while(b6S[j7z](year%(Math[C5I](10,symYear.length)),symYearAsInt)){year--;}
if(b6S[s9c](thisYear,year))expiredFuture=true;}
else year="X";month=STX[G8c](symbol[l3R](b6S[O0z](symbol.length,symYear.length,1)));if(b6S[R8R](month,"Y")&&b6S[G7z](symYearAsInt,"0")){cash=true;month="0";year="0";expiredFuture=true;}
symbol=symbol[B0M](0,b6S[Y0T](symbol.length,symYear.length,1));}
if(isNaN(year)||isNaN(month)){error="Invalid futures symbol.";}
else if(!isDaily){error=(g2T+b6S.K7M+V0M+b6S.a9M+b6S.l2M+b6S.a9M+g2I+B1I+q6M+z8I+X7M+N4U+d0M+B1I+b6S.l2M+J2M+B1I+K8M+d0M+B1I+n1M+v9D+B1I+d0M+X7M+x0M+Q2c+V0M+b6S.K7M+Q5D+h6I);}
else if(!params[L7c]){api=STX[x9c](STX[N2T][M2C][R6R][t07]);var endDate=new Date(myDate[Y7w]());if(b6S[c8C](year,0)&&b6S[b5z](year,endDate[D0I]())){endDate[(m6C)](year);if(b6S[S3j](month,0)&&b6S[v31](month,endDate[C2T]()+1)){endDate[(P6j+b6S.K7M+W1c+b6S.K7M+b6S.I2M)](28);endDate[q6U](b6S[G3C](month,1));}
}
if(!params[T37]&&params[d37]){var startDate=new Date(endDate[Y7w]());if(b6S[D4T](year,0))startDate[z1U](Math[B9R](year,startDate[(Z6M+b6S.I2M+H6j+U0I+H7U)]()));startDate[I5M](b6S[n1c](startDate[n8C](),myMaxRecords));}
else if(params[T37]){startDate=toMarketTime(params[T37],marketZone);}
arguments={Symbol:symbol,StartDate:(startDate?STX[q9z](STX[b0w](startDate)):null),EndDate:STX[q9z](STX[b0w](endDate)),Month:month,Year:year}
;if(b6S[K0I](year,0)||cash){api[W8z]=api[W8z]["future"];}
else{api[W8z]=api[W8z][(o2M+Z7D+Z2z+b6S.K7M+g2I)];}
}
else if(!expiredFuture){api=STX[x9c](STX[N2T][(H41+d2U)][R6R][b1w]);arguments={Symbol:symbol,Month:month,Year:year}
;}
if(b6S[(c3j+G3I+D1M)](symbol[l3R](0),"/"))symbol="/"+symbol;}
else if(isBats&&params[T37]&&params[L7c]){marketZone="America/New_York";myDate=toMarketTime(myDate,marketZone);if(params[r9T][b3D][M4I][r1w]&&b6S[f71](myDate[(Z6M+b6S.I2M+b6S.K7M+l8c)](),6)){var newDT=new timezoneJS[W31](myDate[D0I](),myDate[C2T](),myDate[n8C](),myDate[C6I](),myDate[L8R](),marketZone);if(STX[N2T][M2C][y47](params,symbol,isDaily,newDT[l11](),cb,this))return ;}
var startDate=STX[q9z](STX[b0w](myDate));api=STX[x9c](STX[N2T][M2C][R6R][T9R]);arguments={Identifier:symbol,Period:(b6S[S6U](params[k9w],"hour")?b6S[b8w](params[S57],60):params[S57]),StartTime:startDate+" 00:00:00",EndTime:STX[q9z](STX[b0w](myDate))+" 23:59:59",IncludeExtended:(!!params[d0I])[z7c]()}
;if(isDaily){api[g9M][x7z]=null;api[g9M].volume=null;arguments[q5I]=1439;}
else if(params[L7c]){if(params[T37]){var pStartDate=toMarketTime(params[T37],marketZone);if(b6S[L1z](myDate[n8C](),pStartDate[n8C]())){arguments[J5z]=STX[q9z](STX[b0w](myDate))+" "+STX[L81](pStartDate)[T91](" ")[1]+":00";}
}
}
}
else{var exchange=symbol[(c2M+E1M+K8M+b6S.K7M)](".")[1];if(exchange){if(b6S[Q9U](exchange.length,4))error="Invalid Exchange";else marketZone=STX[N2T][M2C][E9C][G4T][exchange];}
if(!marketZone)marketZone="America/New_York";myDate=toMarketTime(myDate,marketZone);if(!params[L7c]&&isDaily){if(isIndex)api=STX[x9c](STX[N2T][M2C][R6R][R0z]);else api=STX[x9c](STX[N2T][M2C][(I5c+z7T+b6S.a9M+h7M+d0M)][A2C]);arguments={Identifier:symbol,StartDate:(params[T37]?STX[q9z](STX[b0w](toMarketTime(params[(d0M+f4M+V0M+b6S.K7M+W1c+h7M)],marketZone))):null),EndDate:STX[q9z](STX[b0w](myDate)),PeriodType:STX[(o1j+N87+b6S.I2M+x8C+Q5D)][M2C][E9C][m9c](params[k9w]),Periods:myMaxRecords}
;}
else{if(isIndex){api=STX[x9c](STX[N2T][M2C][R6R][u5w]);}
else{api=STX[x9c](STX[N2T][M2C][R6R][v3z]);}
var startDate=myDate;if(!params[(d0M+f4M+V0M+b6S.K7M+W1c+b6S.K7M+b6S.I2M)]&&params[d37]){startDate=new Date(myDate[Y7w]());if(isDaily)startDate[I5M](b6S[A21](startDate[n8C](),myMaxRecords));else startDate[D5T](b6S[W3U](startDate[L8R](),myMaxRecords*(params[k9w]=="hour"?params[S57]*60:params[S57])));}
else if(params[T37]){startDate=toMarketTime(params[T37],marketZone);}
arguments={Identifier:symbol,StartTime:STX[q9z](STX[b0w](startDate))+" 00:00:00",EndTime:STX[q9z](STX[b0w](myDate))+" 23:59:59",Period:(b6S[Z3D](params[k9w],"hour")?b6S[p6D](params[S57],60):params[(x0M+i2D+L91)]),IncludeExtended:(!!params[d0I]&&isBats)[(b6S.K7M+Y7C+v7C)]()}
;if(isDaily){api[g9M][x7z]=null;arguments[q5I]=1440;}
else if(params[L7c]){if(params[(d0M+f4M+V0M+Z4w+b6S.I2M)]){var pStartDate=toMarketTime(params[T37],marketZone);if(b6S[b5M](myDate[n8C](),pStartDate[n8C]())){arguments[(J5z)]=STX[q9z](STX[b0w](myDate))+" "+STX[L81](pStartDate)[T91](" ")[1]+":00";}
}
}
else{arguments[J5z]=STX[q9z](STX[b0w](startDate))+" "+STX[L81](startDate)[(d0M+x0M+K4D)](" ")[1]+":00";arguments[I3I]=STX[q9z](STX[b0w](myDate))+" "+STX[L81](myDate)[T91](" ")[1]+":59";}
}
}
if(api&&arguments&&b6S[l0R](error,"")){STX[X6M](STX[N2T][(H41+n1M+K8M+b6S.K7M+b6S.I2M)][E9C][o77](api,arguments,params,this[(U8M+B0U)]),null,function(status,res){var A97="moreToLoad",N2R="x7j",H7c="U7j",l4z="i7j",i41="suppressSymbolNotFound",p97="J7j",I6D="esu",p5M="tsC",r7z="resu",d0z="t7j",B01="c7j",j8I="w7",Z9z="s5j";if(b6S[Z9z](status,200)){if(!params[L7c]){cb({error:status}
);return ;}
}
function processData(quotes,params){var T9w="P7j",N0I="attempts",J3c="Y7j",O1D="z7j",R0w="h4j",u41="R4j",D97="M4j",N2I="A4j",Q6j="K4j",j9M="_Clos",b2D="Ad",P7w="r4j",J1D="B4j",R31="y4j",m7C="m4j",p8C="I4j",M9M="v4j",t5T="s4j",S2U="j4j",l3M="b4j",F2D="g4j",W3c="V4j",b3w="q4j",T0w="N5j",X2R="X5j",h4M="symb",V3I="K5j",R2T="r5j",k7I="B5j",w1R="esul",A9D="y5j",D4C="5j",B11="I5j",t2I="v5j",newQuotes=[],arr=quotes[T91]("\r\n");if(b6S[t2I](arr.length,2))return newQuotes;var fds=arr[0][T91](","),fieldNames={}
;for(var i=0;b6S[B11](i,fds.length);i++){fieldNames[fds[i]]=i;}
var dt=null,stick=false,NYOffsetMap={}
;for(var i=1;b6S[(x1M+D4C)](i,arr.length);i++){var fields=arr[i][T91](',');if(b6S[A9D](fields.length,fds.length))continue;var date=fields[fieldNames[api[(V0M+w1R+M6M)][N81]]];if(b6S[k7I](date,""))continue;if(api[g9M][x7z]){date+=" "+fields[fieldNames[api[g9M][x7z]]];}
var bcdt=STX[a5c](date);if(b6S[R2T](bcdt[Y4M](),6))continue;if(!isDaily){var marketOffset=0;if(api[g9M][k9c]){marketOffset=fields[fieldNames[api[g9M][k9c]]];}
bcdt[D5T](b6S[V3I](bcdt[L8R](),bcdt[l11](),60*marketOffset));var hours=STX[N77][C6I](params[(h4M+c1M+E1M)],params[d0I]);if(!(b6S[X2R](hours[I9D],23)&&b6S[(P1c+D1M)](hours[U5T],59))){var key=bcdt[D0I]()[z7c]()+"-"+(bcdt[C2T]()+1)[z7c]()+"-"+bcdt[n8C]()[z7c]();if(b6S[(u11+D1M)](NYOffsetMap[key],null)){var sessionTest=STX[W9T](bcdt,null,"America/New_York"),sessionTestOffset=b6S[T0w](sessionTest[l11](),bcdt[l11]());NYOffsetMap[key]=b6S[b3w](sessionTestOffset,60000);}
var bcdt2=new Date(b6S[W3c](bcdt[Y7w](),NYOffsetMap[key]));if(b6S[F2D](bcdt2[C6I](),hours[I9D])||(b6S[l3M](bcdt2[C6I](),hours[I9D])&&b6S[S2U](bcdt2[L8R](),hours[U5T])))continue;}
}
if(params[T37]&&b6S[t5T](bcdt,params[T37]))continue;if(params[e3j]&&b6S[M9M](bcdt,params[e3j]))continue;if(!missingBarsShutoff&&params[r9T][d4c]&&!isDaily){if(b6S[p8C](dt,null)){dt=bcdt;}
else{for(var zz=0;b6S[m7C](zz,1440);zz++){if(!stick)dt=STX[N77][Q9C](dt,params[r9T][k5I][k9w],1,params[r9T],params[F3I]);if(b6S[R31](bcdt[Y7w](),dt[Y7w]()))break;else if(b6S[(J1D)](bcdt[Y7w](),dt[Y7w]())){stick=true;break;}
else{var lastQuote=newQuotes[b6S[P7w](newQuotes.length,1)];newQuotes[I57]({DT:dt,Open:lastQuote[G3c],High:lastQuote[G3c],Low:lastQuote[G3c],Close:lastQuote[G3c],Volume:0,Adj_Close:lastQuote[(b2D+D1M+j9M+b6S.I2M)]}
);stick=false;}
}
}
}
var ratio=parseFloat(fields[fieldNames[api[g9M][u9C]]]);if(!ratio||isNaN(ratio))ratio=1;var open=parseFloat(fields[fieldNames[api[g9M][P4U]]]),high=parseFloat(fields[fieldNames[api[g9M][o5w]]]),low=parseFloat(fields[fieldNames[api[g9M][S4w]]]),close=parseFloat(fields[fieldNames[api[g9M][L1M]]]);if(b6S[Q6j](open,0)&&b6S[N2I](high,low))open=close;if(b6S[D97](high,0))high=Math[z4M](open,close);if(b6S[u41](low,0))low=Math[B9R](open,close);if(b6S[R0w](close,0)){newQuotes[(p8z+E8M)]({DT:bcdt,Open:open,High:high,Low:low,Close:close,Volume:(api[g9M].volume?parseFloat(fields[fieldNames[api[g9M].volume]]):0),Adj_Close:b6S[O1D](parseFloat(fields[fieldNames[api[g9M][(R57+P6j)]]]),ratio)}
);}
else if(!missingBarsShutoff&&params[r9T][d4c]){var lastQuote=newQuotes[b6S[J3c](newQuotes.length,1)];newQuotes[I57]({DT:bcdt,Open:lastQuote[G3c],High:lastQuote[G3c],Low:lastQuote[G3c],Close:lastQuote[G3c],Volume:0,Adj_Close:lastQuote[B8C]}
);}
}
if(newQuotes.length){params[N0I]=0;if(b6S[T9w](newQuotes[0][q4c],newQuotes[newQuotes.length-1][q4c]))newQuotes[i8R]();}
if(!params[c6R])params[c6R]=0;params[c6R]+=newQuotes.length;if(!missingBarsShutoff)params[j5c]=true;return newQuotes;}
var results=processData(res,params),todayBarFetch=null;if(isDaily&&!params[d4C]){while(results.length&&this[G3R][symbol].length){if(b6S[(j8I+D1M)](results[0][q4c],this[G3R][symbol][this[G3R][symbol].length-1][q4c]))results[R8z]();else if(+results[0][q4c]==+this[G3R][symbol][b6S[B01](this[G3R][symbol].length,1)][(q4c)])this[G3R][symbol][w5I]();else break;}
results=this[G3R][symbol]=this[G3R][symbol][A0z](results);if(isFuture&&b6S[d0z](this[G3R][symbol].length,1)&&b6S[(X0C+D1M)](this[(r7z+E1M+p5M+b6S.a9M+o2M+E8M+b6S.I2M)][symbol][this[G3R][symbol].length-2][q4c][Y7w](),this[(V0M+b6S.I2M+d0M+X7M+E1M+M6M+I41+b6S.a9M+o2M+u7z)][symbol][this[(V0M+I6D+E1M+M6M+I41+v5M+E8M+b6S.I2M)][symbol].length-1][q4c][Y7w]())){this[G3R][symbol][F57](-2,1);}
if(!params[L7c]){params[L7c]=true;params[e3j]=null;if(results.length){params[T37]=new Date(results[b6S[p97](results.length,1)][q4c][Y7w]());params[i41]=true;}
else{params[T37]=new Date();params[T37][I5M](b6S[l4z](params[T37][n8C](),2));}
if(!results.length||b6S[H7c](STX[Z87](new Date(myDate))[B0M](0,8),STX[Z87](results[results.length-1][q4c])[B0M](0,8))){if(!expiredFuture&&!STX[N77][G8U](params[F3I],true)){todayBarFetch=function(s){return function(p,c){setTimeout(function(){s[n6c](p,c);}
,10);}
;}
(this);}
}
}
}
var moreToLoad=false;if(!todayBarFetch&&b6S[N2R](params[c6R],0)&&params[d37]){moreToLoad=true;}
if(!todayBarFetch||!params[T37]||(params[d37]&&!params[L7c])){params[J1z]=!!todayBarFetch;if(!todayBarFetch)params[d4C]=false;if(params[A97]){moreToLoad=true;params[A97]=false;}
if(!todayBarFetch&&cb){cb({quotes:results,moreAvailable:moreToLoad}
);}
}
else{if(moreToLoad)params[A97]=true;}
if(todayBarFetch){params[N4w]=true;todayBarFetch(params,cb);}
}
[E0C](this),null,true);}
if(b6S[P9D](error,"")){if(cb)cb({error:error}
);}
}
;STX[N2T][(H41+d2U)][R6R]={token:(o0M+E21+l91+l91+E41+o0M+o0M+o0M+l91),defaultToken:"0DA08C44AFA447B4BE864136810F8093",HistoricalEquity:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+Z4C+h6I+o2M+V8z+p81+h6I+o2M+c1M+x1M+H3I+J2I+y2D+b6S.I2M),version:null,func:"xGlobalHistorical",format:"csv",method:{day:"GetGlobalHistoricalQuotesRange",week:(o4M+E1M+V8R+G9R+S7T+D67+i7M+b6S.I2M+i7D+o4D+E1C+X1j+b6S.a9M+n1M+z3C),month:(H9M+b6S.I2M+M8j+T3R+F9M+b6S.a9M+E1M+h27+d0M+b6S.K7M+c1M+c6M+b6S.a9M+v2z+n1M+P1M+E1M+g2I+e0c+c1M+h7M+d0M+X1j+B9D),as_of:"GetGlobalHistoricalQuotesAsOf"}
,statics:(d3C+t1R+G4z+O0D+C51+E8j+g2I+x1M+F7U+E1M+X91+b6S.V71+e4C+d0M+C1M+b6S.I2M+n1M+b6S.K7M+X8j+z5D+f1w+b6S.l2M+C51+n6j+c1M+n1M+b6S.I2M),fields:(I8R+c1M+F9M+v7M+o1j+P61+h6I+F3j+b6S.a9M+h7M+v3I+H9M+E1M+l3j+B2I+Z9T+h6I+c3j+b6S.a9M+d0M+b6S.K7M+v3I+H9M+M5w+X7M+E1C+h6I+b6j+x0M+j9D+v3I+H9M+H9D+E1M+B2I+b6S.K7M+l5D+h6I+v9M+q4w+E8M+v3I+H9M+E1M+c1M+w6U+o8z+d0M+h6I+c3j+c1M+J2I+v3I+H9M+E1M+x0C+F7I+h7M+d0M+h6I+Q4M+c1M+n6R+b6S.I2M+v3I+H9M+T3R+F9M+b6S.a9M+d6R+b6S.K7M+b6S.I2M+d0M+h6I+E8j+x0M+E1M+K8M+b6S.K7M+c9C+A7T),results:{date:"GlobalQuotes Date",time:null,open:"GlobalQuotes Open",close:"GlobalQuotes Last",high:(H9M+E1M+V8R+E1M+o1j+F7I+b6S.K7M+b6S.I2M+d0M+B1I+v9M+K8M+b3C),low:"GlobalQuotes Low",volume:(j5D+K7R+E1C+B1I+Q4M+o7D+J0R),offset:null,ratio:"GlobalQuotes SplitRatio"}
}
,HistoricalIndex:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+a31+b6S.I2M+d0M+h6I+o2M+w8U+b6S.K7M+W7T+h6I+o2M+Z7D+H3I+Z6M+c2T+K0R+K8M+o2M+b6S.I2M+d0M+E8M+K8M+w2M+c1M+c6M+b6S.a9M+E1M+h2w+n1M+K8M+b6S.K7M+b6S.I2M),version:null,func:"xglobalindiceshistorical",format:"csv",method:{day:"GetHistoricalIndexValues",as_of:"GetHistoricalIndexValuesTrailing"}
,statics:"IdentifierType=Symbol",fields:(Q4M+B2C+l5D+h6I+F3j+b6S.a9M+b6S.K7M+b6S.I2M+v3I+Q4M+b6S.a9M+E1M+X7M+l5D+h6I+c3j+b6S.a9M+w2M+v3I+Q4M+B2C+b6S.I2M+d0M+h6I+b6j+x0M+b6S.I2M+n1M+v3I+Q4M+b6S.a9M+E1M+g2M+h6I+v9M+J2C+v3I+Q4M+a5T+d0M+h6I+c3j+r2D+v3I+Q4M+B2C+l5D+h6I+Q4M+o7D+c0I+b6S.I2M),results:{date:"Values Date",time:null,open:"Values Open",close:"Values Last",high:(Q4M+B2C+l5D+B1I+v9M+q4w+E8M),low:(Q4M+b6S.a9M+R67+B1I+c3j+c1M+J2I),volume:(Q4M+B2C+b6S.I2M+d0M+B1I+Q4M+c1M+E1M+J0R),offset:null,ratio:null}
}
,HistoricalForex:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+w7U+d0M+h6I+o2M+E8M+S91+e0M+h6I+o2M+Z7D+H3I+Z6M+T3R+F9M+v7M+r8z+p6w+b6S.I2M+d0M+o5M+k6w+n1M+f9D),version:null,func:"xGlobalCurrencies",format:"csv",method:"GetHistoricalRatesRange",statics:(f5R+K8M+u1j+K8M+c77+C51+l91+l91+y01+l91+l91+y01+l91+l91+X91+J6j+V0M+K8M+o2M+b6S.I2M+L8j+g2I+O0D+C51+Q41+X5w+X91+J6j+i2D+K8M+c1M+g1c+e7T+b6S.I2M+C51+F3j+w7w+g2I),fields:"StartDate,Open,High,Low,Close",results:{date:"StartDate",time:null,open:"Open",close:"Close",high:"High",low:"Low",volume:null,offset:null,ratio:null}
}
,HistoricalMajorMetals:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+C31+c7w+l5D+h6I+o2M+E8M+b6S.a9M+V0M+U5C+h6I+o2M+Z7D+H3I+Z6M+E1M+J11+b6S.a9M+E6R+b6S.I2M+M8c+o5M+k6w+n1M+H7T+b6S.I2M),version:null,func:"xGlobalMetals",format:"csv",method:"GetHistoricalMetalQuotesRange",statics:(A3j+l6j+Z6M+i2c+x1M+b6S.I2M+C51+l91+l91+y01+l91+l91+y01+l91+l91+X91+J6j+c6M+b6S.I2M+W3w+b6S.I2M+C51+Q41+X5w+X91+J6j+i2D+U9c+A2R+C51+F3j+b6S.a9M+L0w+X91+I41+H47+b6S.I2M+n1M+o2M+g2I+C51),fields:(E8j+b6S.K7M+b6S.a9M+V0M+b6S.K7M+W1c+h7M+v3I+E8j+B4I+R9M+b0T+b6S.I2M+v3I+b6j+O0D+n1M+v3I+v9M+K8M+Z6M+E8M+v3I+c3j+c1M+J2I+v3I+I41+T3R+d0M+b6S.I2M),results:{date:"StartDate",time:null,open:"Open",close:"Close",high:"High",low:"Low",volume:null,offset:null,ratio:null}
}
,HistoricalMetals:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+V0M+c91+o2M+b6S.I2M+d0M+h6I+o2M+Y0D+e0M+h6I+o2M+c1M+x1M+H3I+Z6M+H9D+h1R+X7M+V0M+V0M+m67+K8M+Z6M+n1M+K8M+b6S.K7M+b6S.I2M),version:null,func:"xGlobalCurrencies",format:"csv",method:"GetLondonHistoricalRatesRange",statics:null,fields:"StartDate,Open,High,Low,Close",results:{date:"StartDate",time:null,open:"Open",close:"Close",high:"High",low:"Low",volume:null,offset:null,ratio:null}
}
,HistoricalFuture:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+V0M+r2I+c7w+b6S.I2M+d0M+h6I+o2M+E8M+b6S.a9M+V0M+z1M+e0M+h6I+o2M+Z7D+H3I+J2I+J2I+J2I+N3R+H7T+b6S.I2M),version:null,func:"xFutures",format:"csv",method:{"future":"GetHistoricalFutureRange","commodity":"GetHistoricalCommodityRange"}
,statics:null,fields:(B2I+b6S.K7M+b6S.I2M+d0M+h6I+F3j+b6S.a9M+b6S.K7M+b6S.I2M+v3I+o1j+F7I+Z9T+h6I+b6j+x0M+b6S.I2M+n1M+v3I+o1j+N87+b6S.I2M+d0M+h6I+v9M+q4w+E8M+v3I+o1j+P61+h6I+c3j+c1M+J2I+v3I+o1j+N87+b6S.I2M+d0M+h6I+c3j+c6j+b6S.K7M+v3I+o1j+X7M+c1M+b6S.K7M+l5D+h6I+Q4M+c1M+u7I),results:{date:"Quotes Date",time:null,open:(J9z+l5D+B1I+b6j+O0D+n1M),close:"Quotes Last",high:"Quotes High",low:(e0c+c1M+h7M+d0M+B1I+c3j+r2D),volume:"Quotes Volume",offset:null,ratio:null}
}
,IntradayEquity:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+C31+K8M+o2M+l5D+h6I+o2M+E8M+b6S.a9M+U3C+e0M+h6I+o2M+Z7D+H3I+o2M+E8M+b6S.a9M+V0M+b6S.K7M+W7T+o5M+s2I+K8M+Z6M+n1M+K8M+h7M),version:"v3",func:"xGlobalQuotes",format:"csv",method:"GetChartBars",statics:(i6j+Y2c+n1M+b6S.K7M+x3U+i2D+W3w+b6S.I2M+C51+E8j+g2I+x1M+F7U+E1M+X91+J6j+V0M+S1D+c7U+c1M+n1M+C51+X8j+K8M+n1M+z8I+l5D+X91+b6S.V71+M2c+X7M+y2T+b6S.I2M+n1M+b6S.K7M+X8j+i2C+b6S.l2M+C51+n6j+c1M+n1M+b6S.I2M),fields:(I41+V8z+V0M+b6S.K7M+Q41+b6S.a9M+k8U+h6I+E8j+b6S.K7M+b6S.a9M+P8U+w9U+b6S.I2M+v3I+I41+E8M+b6S.a9M+O9z+k8U+h6I+E8j+b6S.K7M+b6S.a9M+P8U+i2c+c77+v3I+I41+E8M+b6S.a9M+P8U+H5R+h6I+N4M+L8j+I41+b6j+q6M+A6z+b6S.K7M+v3I+I41+E8M+K8j+L8c+k8U+h6I+I41+E1M+c1M+P6j+v3I+I41+E8M+i1M+s0U+V0M+d0M+h6I+b6j+E2C+v3I+I41+V8z+O9z+V0M+d0M+h6I+v9M+q4w+E8M+v3I+I41+E8M+K8j+b6S.K7M+e5D+d0M+h6I+c3j+c1M+J2I+v3I+I41+E8M+b6S.a9M+z7C+H8M+h6I+Q4M+c1M+E1M+X7M+x1M+b6S.I2M+v3I+I41+V8z+V0M+b6S.K7M+Q41+b6S.a9M+V0M+d0M+h6I+b6S.V71+b6S.l2M+D1M+H0R+b6S.I2M+E0M+c1M),results:{date:(I41+E8M+i1M+Q41+b6S.a9M+k8U+B1I+E8j+b6S.K7M+i5I+b6S.a9M+h7M),time:(I41+V8z+P8U+s0U+V0M+d0M+B1I+E8j+f4M+V0M+b6S.K7M+p1R+b6S.I2M),open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayBATSRTEquity:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+C31+c7w+l5D+h6I+o2M+E8M+b6S.a9M+V0M+U5C+h6I+o2M+c1M+x1M+H3I+o2M+V8z+P8U+K8M+e0M+N3R+f9D),version:null,func:"xBATSRealTime",format:"csv",method:(H9M+z5D+I41+V8z+V0M+L8c+V0M+d0M),statics:(i6j+t8w+K8M+O4z+b6S.I2M+G4z+O0D+C51+E8j+u8z+c4D+S1D+K8M+d0M+W5M+C51+X8j+K8M+n1M+X7M+b6S.K7M+l5D+X91+b6S.V71+b6S.l2M+D1M+X7M+d0M+b6S.K7M+c77+s2D+b6S.K7M+E8M+c1M+b6S.l2M+C51+n6j+V6I),fields:(D6c+J4D+d0M+h6I+E8j+b6S.K7M+b6S.a9M+V0M+U1j+t5M+v3I+I41+V8z+V0M+L8c+V0M+d0M+h6I+E8j+b6S.K7M+y51+t6w+v3I+I41+E8M+b6S.a9M+z7C+K8j+d0M+h6I+N4M+L8j+I41+b6j+q6M+A6z+b6S.K7M+v3I+I41+V8z+z7C+b6S.a9M+k8U+h6I+I41+T3R+d0M+b6S.I2M+v3I+I41+E8M+b6S.a9M+V0M+t8j+b6S.a9M+V0M+d0M+h6I+b6j+x0M+b6S.I2M+n1M+v3I+I41+V8z+V0M+b6S.K7M+H5R+h6I+v9M+K8M+Z6M+E8M+v3I+I41+V8z+V0M+t8j+H8M+h6I+c3j+c1M+J2I+v3I+I41+w8U+X6j+d0M+h6I+Q4M+c1M+z37+c77+v3I+I41+f5U+d0M+h6I+b6S.V71+M2c+f4I+C1M+T2T),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayBATSRTEquity:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+V0M+c91+W1I+h6I+o2M+V8z+P8U+W7T+h6I+o2M+Z7D+H3I+o2M+e71+K8M+Z6M+n1M+K8M+h7M),version:null,func:"xBATSRealTime",format:"csv",method:"GetChartBars",statics:(F6w+j57+K8M+O4z+i2D+L8j+g2I+x0M+b6S.I2M+C51+E8j+g2I+x1M+F7U+T5R+V0M+b6S.I2M+P8c+W5M+C51+X8j+K8M+n4C+h7M+d0M+X91+b6S.V71+e4C+w2M+c77+B31+f1w+b6S.l2M+C51+n6j+S7D+b6S.I2M),fields:(I41+E8M+Q7I+b6S.a9M+V0M+d0M+h6I+E8j+m3j+F3j+b6S.a9M+b6S.K7M+b6S.I2M+v3I+I41+Z9R+V0M+d0M+h6I+E8j+b6S.K7M+i1M+L8j+K8M+c77+v3I+I41+E8M+b6S.a9M+V0M+t8j+H8M+h6I+N4M+L8j+B3D+d0M+b6S.I2M+b6S.K7M+v3I+I41+E8M+b6S.a9M+z7C+H8M+h6I+I41+g6D+v3I+I41+w8U+E81+h6I+b6j+O0D+n1M+v3I+I41+E8M+K8j+L8c+k8U+h6I+v9M+K8M+b3C+v3I+I41+v9T+s0U+V0M+d0M+h6I+c3j+c1M+J2I+v3I+I41+v9T+s0U+k8U+h6I+Q4M+c1M+n6R+b6S.I2M+v3I+I41+E8M+b6S.a9M+V0M+t8j+K8j+d0M+h6I+b6S.V71+M2c+X7M+w2M+c77+n1M+b6S.K7M+K8U+b6S.K7M+K8M+c1M),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayBATSRTEquity:{host:"http"+(STX[(N0c+T3j+K01)]?"":"s")+(I6w+d0M+b6S.I2M+w7U+d0M+h6I+o2M+w8U+U5C+h6I+o2M+Z7D+H3I+o2M+E8M+b6S.a9M+P8U+K8M+e0M+o5M+k6w+n1M+K8M+h7M),version:null,func:"xBATSRealTime",format:(o2M+U5M),method:"GetChartBars",statics:(F6w+j9D+z1M+i3C+L8j+A2R+C51+E8j+g2I+x1M+F9M+d8M+b1z+S7T+K8M+c1M+n1M+C51+X8j+K8M+n4C+h7M+d0M+X91+b6S.V71+b6S.l2M+D1M+f4I+o3j+q3z+E8M+c1M+b6S.l2M+C51+n6j+c1M+J1C),fields:(I41+w8U+t8j+H8M+h6I+E8j+b6S.K7M+b6S.a9M+R7D+b6S.K7M+b6S.I2M+v3I+I41+V8z+c27+h6I+E8j+f4M+g67+x1M+b6S.I2M+v3I+I41+E8M+b6S.a9M+O9z+V0M+d0M+h6I+N4M+L8j+I41+b6j+P6M+b6S.I2M+b6S.K7M+v3I+I41+E8M+i1M+s0U+k8U+h6I+I41+E1M+c1M+P6j+v3I+I41+E8M+V0C+h6I+b6j+x0M+b6S.I2M+n1M+v3I+I41+E8M+b6S.a9M+V0M+b6S.K7M+H5R+h6I+v9M+q4w+E8M+v3I+I41+V8z+P8U+Q41+K8j+d0M+h6I+c3j+r2D+v3I+I41+Z1c+b6S.a9M+V0M+d0M+h6I+Q4M+c1M+E1M+J0R+v3I+I41+V8z+V0M+b6S.K7M+Q41+K8j+d0M+h6I+b6S.V71+M2c+f4I+b6S.K7M+c77+n1M+w3j+b6S.K7M+K8M+c1M),results:{date:(I41+V8z+O9z+k8U+B1I+E8j+b6S.K7M+i1M+F3j+b6S.a9M+b6S.K7M+b6S.I2M),time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayBATSRTEquity:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+P4D+l5D+h6I+o2M+V8z+V0M+b6S.K7M+K8M+e0M+h6I+o2M+c1M+x1M+H3I+o2M+V8z+P8U+W7T+o5M+s2I+M3D+h7M),version:null,func:(W01+M3I+K8M+x1M+b6S.I2M),format:(X4w),method:"GetChartBars",statics:(N4c+z1M+q6M+K8M+b6S.I2M+V0M+n8D+x0M+b6S.I2M+C51+E8j+l3w+X91+J6j+V0M+b6S.I2M+H6c+q3j+S7D+C51+X8j+K8M+n1M+z8I+l5D+X91+b6S.V71+M2c+f4I+C1M+b6S.I2M+n1M+b6S.K7M+X8j+b6S.I2M+P1M+c1M+b6S.l2M+C51+n6j+V6I),fields:(I41+E8M+K8j+t8j+K8j+d0M+h6I+E8j+p6c+b6S.a9M+h7M+v3I+I41+v9T+Q41+H8M+h6I+E8j+b6S.K7M+i1M+i2c+x1M+b6S.I2M+v3I+I41+E8M+K8j+b6S.K7M+e5D+d0M+h6I+N4M+L8j+I41+a9z+d0M+b6S.I2M+b6S.K7M+v3I+I41+w8U+b6S.K7M+Q41+K8j+d0M+h6I+I41+E1M+F9D+b6S.I2M+v3I+I41+E8M+b6S.a9M+V0M+E81+h6I+b6j+x0M+j9D+v3I+I41+E8M+b6S.a9M+V0M+b6S.K7M+Q41+b6S.a9M+V0M+d0M+h6I+v9M+K8M+b3C+v3I+I41+V8z+O9z+V0M+d0M+h6I+c3j+c1M+J2I+v3I+I41+E8M+b6S.a9M+z7C+K8j+d0M+h6I+Q4M+c1M+E1M+c0I+b6S.I2M+v3I+I41+E8M+b6S.a9M+P8U+Q41+H8M+h6I+b6S.V71+A7R+x1M+b6S.I2M+n1M+i2M+d4M+c1M),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:(I41+Z1c+K8j+d0M+B1I+Q4M+D9D),offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayIndex:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+i2D+c91+o2M+b6S.I2M+d0M+h6I+o2M+E8M+b6S.a9M+P8U+K8M+e0M+h6I+o2M+Z7D+H3I+o2M+w8U+Z8z+q4w+n1M+K8M+b6S.K7M+b6S.I2M),version:null,func:"xglobalindices",format:"csv",method:"GetChartBars",statics:(i6j+M5I+H0U+V0M+D2D+C51+E8j+j7T+F9M+o7D+X91+J6j+V0M+R8I+A7T+n1M+C51+X8j+F5R+b6S.I2M+d0M+X91+b6S.V71+M2c+X7M+d0M+b6S.K7M+x1M+b6S.I2M+n1M+b6S.K7M+y5I+M3C+b6S.l2M+C51+n6j+c1M+n1M+b6S.I2M),fields:(I41+Z9R+k8U+h6I+E8j+b6S.K7M+K8j+U1j+b6S.a9M+h7M+v3I+I41+E8M+Q7I+H8M+h6I+E8j+D7c+b0T+b6S.I2M+v3I+I41+w8U+E81+h6I+N4M+L8j+I41+b6j+P6M+z5D+v3I+I41+v9T+s0U+k8U+h6I+I41+E1M+F9D+b6S.I2M+v3I+I41+V8z+z7C+b6S.a9M+V0M+d0M+h6I+b6j+x0M+b6S.I2M+n1M+v3I+I41+V8z+V0M+b6S.K7M+s0U+V0M+d0M+h6I+v9M+q4w+E8M+v3I+I41+E8M+K8j+L8c+V0M+d0M+h6I+c3j+c1M+J2I+v3I+I41+E8M+b6S.a9M+P8U+Q41+H8M+h6I+Q4M+m6j+b6S.I2M),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:(I41+f5U+d0M+B1I+c3j+c1M+J2I),volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:null}
}
,IntradayRTIndex:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+i2D+r2I+c7w+b6S.I2M+d0M+h6I+o2M+E8M+K8j+b6S.K7M+W7T+h6I+o2M+Z7D+H3I+o2M+Y0D+e0M+l7I+K8M+L2w+f9D),version:null,func:(s2I+j9w+J11+b6S.a9M+E1M+W37+o2M+l5D+V0M+b6S.I2M+v7M+x7z),format:(X4w),method:"GetChartBars",statics:(l4C+n1M+z1M+A6c+e7T+b6S.I2M+C51+E8j+j7T+F9M+o7D+X91+J6j+N4U+P8c+W5M+C51+X8j+K8M+n1M+J5R+d0M+X91+b6S.V71+b6S.l2M+t7R+d0M+d7c+y9M+n0U+C51+n6j+V6I),fields:(I41+E8M+K8j+b6S.K7M+Q41+H8M+h6I+E8j+i2z+h7M+v3I+I41+Z1c+b6S.a9M+V0M+d0M+h6I+E8j+b6S.K7M+b6S.a9M+P8U+j1w+v3I+I41+E8M+K8j+b6S.K7M+Q41+K8j+d0M+h6I+N4M+L8j+I41+b6j+q6M+q6M+O37+v3I+I41+E8M+K8j+b6S.K7M+s0U+V0M+d0M+h6I+I41+T3R+P6j+v3I+I41+E8M+K8j+X6j+d0M+h6I+b6j+E2C+v3I+I41+V8z+P8U+Q41+b6S.a9M+k8U+h6I+v9M+J2C+v3I+I41+E8M+b6S.a9M+z7C+H8M+h6I+c3j+c1M+J2I+v3I+I41+E8M+K8j+b6S.K7M+e5D+d0M+h6I+Q4M+G41+x1M+b6S.I2M),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:null}
}
,IntradayRTForex:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+V0M+K3z+d0M+h6I+o2M+E8M+b6S.a9M+V0M+b6S.K7M+K8M+e0M+h6I+o2M+c1M+x1M+H3I+o2M+E8M+b6S.a9M+V0M+b6S.K7M+K8M+e0M+o5M+n0z+Z6M+n1M+K8M+h7M),version:null,func:"xGlobalCurrencies",format:"csv",method:"GetChartBars",statics:(J6j+y6D+K8M+S7D+C51+X8j+K8M+D21+l5D+X91+J6j+U5U+Y3c+D2D+C51+Q41+K8M+b6S.l2M),fields:(D6c+K8j+b6S.K7M+s0U+V0M+d0M+h6I+E8j+m3j+W31+v3I+I41+E8M+J4D+d0M+h6I+E8j+b6S.K7M+K8j+R9M+t6w+v3I+I41+E8M+b6S.a9M+V0M+E81+h6I+N4M+t7D+a9z+d0M+b6S.I2M+b6S.K7M+v3I+I41+V8z+O9z+k8U+h6I+b6j+O0D+n1M+v3I+I41+E8M+b6S.a9M+V0M+L8c+V0M+d0M+h6I+v9M+J2C+v3I+I41+w8U+b6S.K7M+s0U+k8U+h6I+c3j+c1M+J2I+v3I+I41+Z9R+V0M+d0M+h6I+I41+a1w+b6S.I2M+v3I+I41+Z1c+K8j+d0M+h6I+Q4M+G41+c77),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:(D6c+b6S.a9M+V0M+L8c+V0M+d0M+B1I+b6j+x0M+b6S.I2M+n1M),close:(G6c+E81+B1I+I41+T3R+d0M+b6S.I2M),high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,IntradayRTMetals:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+b6S.I2M+V0M+z4z+l5D+h6I+o2M+E8M+b6S.a9M+P8U+K8M+e0M+h6I+o2M+Z7D+H3I+o2M+w8U+b6S.K7M+W7T+l7I+K8M+Z6M+n1M+f9D),version:null,func:"xGlobalMetals",format:"csv",method:(H9M+z5D+I41+V8z+P8U+Q41+b6S.a9M+V0M+d0M),statics:(s0M+b6S.I2M+o2M+S7T+K8M+S7D+C51+X8j+E0T+z8I+b6S.I2M+d0M+X91+J6j+V0M+S8c+b6S.I2M+C51+Q41+K8M+b6S.l2M+X91+I41+N4I+D6z+O4c+C51),fields:(I41+v9T+Q41+b6S.a9M+V0M+d0M+h6I+E8j+b6S.K7M+b6S.a9M+V0M+U1j+b6S.a9M+h7M+v3I+I41+V8z+V0M+L8c+k8U+h6I+E8j+b6S.K7M+K8j+R9M+t6w+v3I+I41+Z1c+b6S.a9M+V0M+d0M+h6I+N4M+p5c+q6M+V5z+z5D+v3I+I41+E8M+K8j+t8j+b6S.a9M+V0M+d0M+h6I+b6j+x0M+j9D+v3I+I41+Z1c+b6S.a9M+V0M+d0M+h6I+v9M+J2C+v3I+I41+w8U+b6S.K7M+Q41+H8M+h6I+c3j+c1M+J2I+v3I+I41+E8M+b6S.a9M+O9z+V0M+d0M+h6I+I41+E1M+c1M+P6j+v3I+I41+E8M+b6S.a9M+P8U+s0U+V0M+d0M+h6I+Q4M+G41+c77),results:{date:"ChartBars StartDate",time:"ChartBars StartTime",open:"ChartBars Open",close:"ChartBars Close",high:"ChartBars High",low:"ChartBars Low",volume:"ChartBars Volume",offset:"ChartBars UTCOffset",ratio:"ChartBars AdjustmentRatio"}
}
,DelayedFuture:{host:"http"+(STX[j9z]?"":"s")+(I6w+d0M+i2D+r2I+y2C+h6I+o2M+w8U+z1M+e0M+h6I+o2M+Z7D+H3I+J2I+J2I+G8I+K8M+h7M),version:null,func:"xFutures",format:"csv",method:"GetDelayedFuture",statics:null,fields:(w9U+b6S.I2M+v3I+L8j+b0T+b6S.I2M+v3I+b6j+x0M+b6S.I2M+n1M+v3I+v9M+K8M+Z6M+E8M+v3I+c3j+c1M+J2I+v3I+c3j+b6S.a9M+d0M+b6S.K7M+v3I+Q4M+c1M+z37+c77),results:{date:"Date",time:null,open:"Open",close:"Last",high:"High",low:"Low",volume:(J17+E1M+J0R),offset:null,ratio:null}
}
}
;STX[N2T][M2C][y47]=function(params,symbol,isDaily,offset,cb,caller){var o3D="eal",n9D="TS",J9w="gnite",U2U="tps",w3U="lTim",l1D="cie",G2C="obalC",y5R="etalQ",O6c="ealT",c8D="etR",e6I="q_x",R1c="hartT",X2T="_delta",a1c="ored_li";if(params[(o7I+b6S.l2M+t5M)]&&!params[N4w]&&params[r9T][X1c][B6w]&&params[r9T][X1c][B6w].length&&(v3I+E1M+z7I+v3I+o2M+o7D+a1c+n1M+b6S.I2M+v3I+x1M+c1M+b1C+b6S.a9M+K8M+n1M+v3I+F9M+b6S.a9M+d0M+b6S.I2M+E1M+K8M+J1C+X2T+v3I)[m8z](params[r9T][k5I][(o2M+R1c+g2I+O0D)])>-1){var url,field="Bid";if(STX[N77][G8U](params[F3I])){url=(x1w+b6S.K7M+x0M+d0M+I6w+d0M+b6S.I2M+B8U+y2C+h6I+o2M+V8z+V0M+z1M+e0M+h6I+o2M+Z7D+H3I+o2M+E8M+b6S.a9M+P8U+K8M+e6I+K8M+W8U+b6S.K7M+b6S.I2M+H3I+s2I+I8R+c1M+F9M+v7M+X8j+b6S.I2M+b6S.K7M+b6S.a9M+E1M+d0M+h6I+D1M+d0M+c1M+n1M+H3I+H9M+c8D+O6c+K8M+x1M+b6S.I2M+X8j+y5R+R6z+O51+E8j+g2I+x1M+F9M+o7D+C51)+symbol+"&Currency=&_fields=Date,Time,Bid";}
else if(STX[N77][R3C](params[F3I])){url=(x1w+b6S.K7M+x0M+d0M+I6w+d0M+i2D+r2I+K8M+Y3c+d0M+h6I+o2M+E8M+K8j+U5C+h6I+o2M+c1M+x1M+H3I+o2M+v9T+K8M+e0M+o5M+s2I+K8M+L2w+K8M+b6S.K7M+b6S.I2M+H3I+s2I+I8R+G2C+X7M+V0M+D6z+l1D+d0M+h6I+D1M+F6I+H3I+H9M+z5D+X1j+b6S.I2M+b6S.a9M+w3U+N3D+b6S.a9M+b6S.K7M+b6S.I2M+O51+E8j+j7T+F9M+c1M+E1M+C51)+symbol+"&_fields=Date,Time,Bid";}
else{url=(E8M+b6S.K7M+U2U+I6w+d0M+b6S.I2M+V0M+r2I+K8M+W1I+h6I+o2M+E8M+b6S.a9M+P8U+K8M+e0M+h6I+o2M+Z7D+H3I+o2M+V8z+V0M+b6S.K7M+W7T+o5M+s2I+K8M+J9w+H3I+s2I+Q41+b6S.V71+n9D+X1j+y1D+E1M+i2c+c77+h6I+D1M+d0M+c1M+n1M+H3I+H9M+b6S.I2M+i2M+o3D+B2I+h7M+O51+E8j+l3w+C51)+symbol+"&_fields=Date,Time,Close";field="Close";}
if(STX[N2T][M2C][R6R][Q6R][m8z]("/*")==-1){url+="&_Token="+STX[N2T][M2C][R6R][Q6R];}
else{url+="&_Token="+STX[N2T][M2C][R6R][q6z];}
STX[X6M](url,null,function(status,res){var c07="a7j",w7M="f7j",i91="p7j",U77="erD",y6j="ast",u0z="7j",C2w="parse",r9C="Q7j";if(b6S[r9C](status,200)){res=JSON[C2w](res);var mdDate=params[r9T][X1c][B6w][b6S[(H9M+u0z)](params[r9T][X1c][(x1M+y6j+U77+V6j+b6S.a9M)].length,1)][q4c],nextDate=new Date(mdDate);if(isDaily)nextDate[I5M](nextDate[n8C]()+1);else nextDate[D5T](nextDate[L8R]()+(isNaN(params[k9w])?params[S57]:params[k9w]));var bcdt=STX[(d0M+U6M+n3D+F3j+b6S.a9M+b6S.K7M+E8D+b0T+b6S.I2M)](res[W31]+" "+res[j1w]);bcdt[D5T](bcdt[L8R]()+offset-bcdt[l11]());bcdt[a61](0);bcdt[G9z](0);var quote=res[field];if(b6S[i91](bcdt,mdDate)&&b6S[w7M](bcdt,nextDate)&&b6S[c07](quote,0)){var update=[{DT:(+bcdt==+nextDate?nextDate:mdDate),Open:quote,High:quote,Low:quote,Close:quote,Volume:0,Adj_Close:quote}
];if(params[r9T][b3D])cb({quotes:update}
);else cb(null,update);return ;}
}
params[N4w]=true;caller[n6c](params,cb);}
);return true;}
return false;}
;STX[N2T][M2C][E9C]={xIgniteInterval:function(interval){var L6z="Z0j",L07="Month",z2z="H0j",h11="At",h7T="n0j",s9C="S0j";if(!isNaN(interval))return B7M;else if(b6S[s9C](interval[l3R](b6S.M1j),U3D))return l8c;else if(b6S[h7T](interval[(o2M+w8U+h11)](b6S.M1j),v9C))return (i7M+b6S.I2M+b6S.I2M+S8M);else if(b6S[z2z](interval[l3R](b6S.M1j),A9c))return L07;else if(b6S[L6z](interval[l3R](b6S.M1j),S67))return (t4M+b6S.I2M+K8j);else return interval;}
,url:function(api,args,params,token){var A1U="&_fields=",s6M="fields",B5U="statics",S17="Xigni",X0z="?_Token=",p9U="as_of",X1z="l0j",c5M="func",a9w="version",n21="host",u=api[n21];if(api[a9w])u+=H3I+api[a9w];u+=H3I+api[c5M]+h6I+api[C3c];if(b6S[X1z](api[W8z],Object)){if(api[W8z][p9U]&&!params[T37]&&params[d37]){u+=H3I+api[W8z][p9U];}
else{u+=H3I+api[W8z][p61];}
}
else{u+=H3I+api[W8z];}
if(token){u+=X0z+token;}
else if(STX[(o1j+X7M+g9R+b6S.I2M+b6S.I2M+b6S.l2M)][M2C][R6R][Q6R][m8z](z0I)==-b6S.p1j){u+=X0z+STX[N2T][(S17+b6S.K7M+b6S.I2M)][R6R][(b6S.K7M+c1M+B0U)];}
else{u+=X0z+STX[N2T][M2C][R6R][q6z];}
if(api[B5U])u+=X91+api[B5U];if(api[s6M])u+=A1U+api[(q6M+K8M+b6S.I2M+c1R+d0M)];for(var a in args){u+=X91+a+C51+(args[a]?args[a]:B7M);}
return u;}
,nonMarketMaxRecordsFactor:b6S[g0I](b6S.n8j,b6S.h1j),marketClosedMaxRecordsFactor:b6S[(T3j+s5c)](f1j,b6S.G1j),timeZone:{"BVMF":(b4D+b6S.I2M+c6M+b6S.a9M+H3I+E8j+b6S.a9M+A31+J6j+b6S.a9M+U0I+c1M),"MTAA":q81,"RTSX":E2D,"XAMS":(g7C+V0M+c1M+O0D+H3I+b6S.V71+x1M+d0M+A6w+x1M),"XASX":i9R,"XATH":v3j,"XBAR":a5R,"XBRA":k5R,"XBER":G3D,"XBOM":Y27,"XBRU":t5R,"XBUD":s5w,"XCNQ":L97,"XCSE":S6C,"XDUB":i7w,"XDUS":G3D,"XETR":G3D,"XFRA":G3D,"XHAM":G3D,"XHAN":G3D,"XHEL":e7c,"XHKG":y17,"XICE":C3C,"XJSE":k11,"XLIM":j1z,"XKOS":(r11+K8M+b6S.a9M+H3I+E8j+b6S.I2M+Z5D+E1M),"XKRX":(b6S.V71+d0M+x4w+H3I+E8j+b6S.I2M+k77),"XLIS":b6D,"XLON":g4R,"XMAD":a5R,"XMCE":a5R,"XMUN":G3D,"XMUS":R1z,"XNSE":Y27,"XNZE":N8D,"XOSL":F9R,"XPAR":(r27+c1M+x0M+b6S.I2M+H3I+J6j+i97),"XPRA":K4T,"XRIS":e2D,"XSGO":q7I,"XSES":P8z,"XSHE":T8U,"XSHG":T8U,"XSTO":S2C,"XSTU":(T3j+X7M+j2U+b6S.I2M+H3I+Q41+b6S.I2M+d81+n1M),"XSWX":K8C,"XTAE":S1c,"XTAI":c3R,"XTAL":K5w,"XTKS":H2w,"XTNX":(b4D+i2D+K8M+o2M+b6S.a9M+H3I+L8j+m9T+n1M+U8M),"XTSE":L97,"XTSX":L97,"XLIT":y87,"XVAL":a5R,"XVTX":K8C,"XWAR":p21,"XWBO":i9T,"INDARCX":c0T,"INDBVMF":i6c,"INDCBSX":R0U,"INDMTAA":q81,"INDXASE":c0T,"INDXASX":i9R,"INDXBOM":Y27,"INDXBUD":s5w,"INDXCME":R0U,"INDXCSE":S6C,"IND_DBI":G3D,"INDXHEL":e7c,"INDXHKG":y17,"INDXJSE":k11,"INDXKOS":m4U,"INDXKRX":m4U,"INDXMAD":a5R,"INDXMCE":a5R,"INDXNAS":c0T,"INDXNSE":Y27,"INDXNZE":(n3M+o2M+x3U+o2M+H3I+b6S.V71+m2I+D2R+S8D),"INDXOSL":F9R,"INDXSES":P8z,"INDXSHE":T8U,"INDXSHG":T8U,"INDXSTO":S2C,"INDXSTU":G3D,"INDXSTX":K8C,"INDXSWX":(T3j+X7M+W5R+H3I+q4M+X7M+V0M+K8M+o2M+E8M),"INDXTAE":S1c,"INDXTAI":c3R,"INDXTKS":H2w,"INDXTSE":L97,"INDXWAR":p21,"INDXWBO":i9T,"IND_DJI":c0T,"IND_DJTSMI":c0T,"IND_EURONEXT":t5R,"IND_FTSE":(T3j+N4I+c1M+O0D+H3I+c3j+c1M+N5I+n1M),"IND_FTSEEUR":g4R,"IND_FTSEUSD":(T3j+O57+x0M+b6S.I2M+H3I+c3j+k6I+c1M+n1M),"IND_GIDS":c0T,"IND_GIF":c0T,"IND_HKGI":T8U,"IND_NIKKEI":H2w}
}
;return _exports;}
{if(typeof define===(q6M+X7M+n1M+L1c+W5M)&&define[p87]){define(["stxTimeZoneData","stxThirdParty","stx"],function(_stxTimeZoneData,_stxThirdParty,_stx){return _stxKernel_js(_stxThirdParty,_stx);}
);}
else{var H9=function(P9){var V8I="STXThirdParty";_stxThirdParty=P9[V8I];}
;var _stxThirdParty={}
;if(typeof (window[(L5D+s4R+J6j+b6S.a9M+K5z)])!=Q11)H9(window);var _stx={"STX":window[I2C],"STXChart":window[Y3U],"$$":window[x2R],"$$$":window[r6z]}
;_stxKernel_js(_stxThirdParty,_stx);}
}
}
)();