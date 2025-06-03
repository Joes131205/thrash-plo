import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
    size?: "small" | "medium" | "large";
    color?: "primary" | "white";
}

const LoadingSpinner = ({
    size = "medium",
    color = "primary",
}: LoadingSpinnerProps) => {
    const sizeClass = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large,
    }[size];

    const colorClass = {
        primary: styles.primary,
        white: styles.white,
    }[color];

    return (
        <div className={`${styles.spinnerContainer}`}>
            <div
                className={`${styles.spinner} ${sizeClass} ${colorClass}`}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
