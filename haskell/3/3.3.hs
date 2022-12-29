roots::Float->Float->Float->(Float,Float)
roots a b c = let x1 = (-b + sqrt (b^2 - 4*a*c)) / (2*a)
                  x2 = (-b - sqrt (b^2 - 4*a*c)) / (2*a)
              in (x1,x2)
case_roots::Float->Float->Float->(Float,Float)
case_roots a b c = case (b^2 - 4*a*c) >= 0 of
    True -> let x1 = (-b + sqrt (b^2 - 4*a*c)) / (2*a)
                x2 = (-b - sqrt (b^2 - 4*a*c)) / (2*a)
            in (x1,x2)
    False -> error "no roots"

main = do
    print(roots 1 3 2) -- (-1.0,-2.0)
    print(case_roots 1 (-1) (1))  -- no roots