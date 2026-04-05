import useAuth from "../Hooks/useAuth";
import "./LogoutButton.scss";

export default function LogoutButton() {

    const { logoutHandler, protectedHandler } = useAuth();

    function handleClick() {
        logoutHandler();
        protectedHandler();
    }

    return (

        <button
            onClick={handleClick}
            className="btn btn-outline logout-btn"
        >

            <span className="logout-icon">

                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                        d="M16 17l5-5-5-5M21 12H9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M13 21H5a2 2 0 01-2-2V5a2 2 0 012-2h8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                    />

                </svg>

            </span>

            Logout

        </button>

    );

}