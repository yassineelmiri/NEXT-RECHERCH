import Link from "next/link";
import {Actor} from "next/font/google"

const font =Actor({subsets:["latin"],weight:'400'});
export default function CustomLink({children,...props}) {
    return <Link {...props} legacyBehavior passHref>
        <NavigationMenuLink className={NavigationMenuTriggerStyle()}>
            {children}
        </NavigationMenuLink>
    </Link>
}