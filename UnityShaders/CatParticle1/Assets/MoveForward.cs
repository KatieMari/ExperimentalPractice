using UnityEngine;

public class MoveForward : MonoBehaviour
{
    public float speed = 1.5f;   // metres per second

    void Update()
    {
        // move along the cat's own forward direction, every frame
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
    }
}