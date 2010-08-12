function Point2D(x,y)
{
    this.x = x;
    this.y = y;
}

var Transform = {
    rotate: function(deg) {
        var rad = parseFloat(deg) * (Math.PI/180),
            costheta = Math.cos(rad),
            sintheta = Math.sin(rad);

        var a = costheta,
            b = sintheta,
            c = -sintheta,
            d = costheta;

        return $M([
          [a, c, 0],
          [b, d, 0],
          [0, 0, 1]
        ]);
    },
    scale: function (sx, sy) {
        sx = sx || sx === 0 ? sx : 1;
        sy = sy || sy === 0 ? sy : 1;
        return $M([
          [sx, 0,  0],
          [0,  sy, 0],
          [0,  0,  1]
        ]);
    },

    translate: function (tx, ty) {
        tx = tx ? tx : 0;
        ty = ty ? ty : 0;
        
        return $M([
          [1, 0, tx],
          [0, 1, ty],
          [0, 0, 1]
        ]);
    },
};

function getCoordMatrix(point) {
   return $M([ [point.x], [point.y], [1] ]);
}

function rotate2D(point,angle) { 
    var coord = getCoordMatrix(point);
    var t = Transform.rotate(angle);
    var coord = t.x(coord);
    return Point2d(coord.e(1, 1),  coord.e(2, 1));     
}

function translate2D(point,dx,dy) { 
    var coord = getCoordMatrix(point);
    var t = Transform.translate(dx , dy );
    var coord = t.x(coord);
    return new Point2D(coord.e(1, 1),  coord.e(2, 1));     
}