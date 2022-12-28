roots :: Float->Float->Float->(Float,Float)

roots a b c = (x1,x2)
    where
        x1 = (-b + sqrt (b^2 - 4*a*c)) / (2*a)
        x2 = (-b - sqrt (b^2 - 4*a*c)) / (2*a)