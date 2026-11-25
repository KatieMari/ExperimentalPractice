using UnityEngine;
using UnityEngine.VFX;

public class CatCuddle : MonoBehaviour
{
    [SerializeField]
    private Material loveMaterial;        // the cat's CuddleFur material
    [SerializeField]
    private VisualEffect heartsEffect;    // the CatHearts object

    bool activated = false;               // is the cat being cuddled?
    private float loveCounter = 0;        // counts between 0 and 1

    void Start()
    {
        loveMaterial.SetFloat("_Love", 0);
        heartsEffect.SetBool("Enable", false);
    }

    void Update()
    {
        // 1. Space just flips the state
        if (Input.GetKeyDown(KeyCode.Space))
        {
            activated = !activated;
        }

        // 2. fade Love up or down a little every frame
        if (activated && loveMaterial.GetFloat("_Love") < 1)
        {
            loveMaterial.SetFloat("_Love", Mathf.Clamp(loveCounter += Time.deltaTime, 0, 1));
            Debug.Log("LoveTurningOn");
        }
        else if (!activated && loveMaterial.GetFloat("_Love") > 0)
        {
            loveMaterial.SetFloat("_Love", Mathf.Clamp(loveCounter -= Time.deltaTime, 0, 1));
            Debug.Log("LoveTurningOff");
        }

        // 3. hearts follow the shader
        if (loveMaterial.GetFloat("_Love") >= 1)
        {
            heartsEffect.SetBool("Enable", true);
        }
        else
        {
            heartsEffect.SetBool("Enable", false);
        }
    }
}